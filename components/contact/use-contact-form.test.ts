import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, type RenderHookResult } from "@testing-library/react";
import type { FormEvent } from "react";
import { useContactForm } from "./use-contact-form";

type Hook = RenderHookResult<ReturnType<typeof useContactForm>, unknown>;

function renderContactForm(onSuccessChange?: (success: boolean) => void) {
  return renderHook(() => useContactForm({ onSuccessChange }));
}

function oversizedFile(sizeBytes: number): File {
  const file = new File(["content"], "big.pdf", { type: "application/pdf" });
  Object.defineProperty(file, "size", { value: sizeBytes });
  return file;
}

// The hook reads fields off a real FormData(form), so submission is
// exercised through an actual (unattached) <form> element rather than a
// hand-rolled event object.
function submitEvent(fields: Record<string, string>): FormEvent<HTMLFormElement> {
  const form = document.createElement("form");
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  return { preventDefault: () => {}, currentTarget: form } as unknown as FormEvent<HTMLFormElement>;
}

async function submit(result: Hook["result"], fields: Record<string, string>) {
  await act(async () => {
    await result.current.handleSubmit(submitEvent(fields));
  });
}

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, status: ok ? 200 : 400, json: async () => body } as Response;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Given the hook has just been rendered", () => {
  describe("When no action has been taken", () => {
    it("Then it starts idle with no errors or attachment", () => {
      const { result } = renderContactForm();

      expect(result.current.status).toBe("idle");
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.formErrorMessage).toBeNull();
      expect(result.current.fieldErrors).toEqual({});
      expect(result.current.attachmentName).toBeNull();
      expect(result.current.oversizedAttachmentMb).toBeNull();
    });

    it("Then onSuccessChange is called with false", () => {
      const onSuccessChange = vi.fn();
      renderContactForm(onSuccessChange);

      expect(onSuccessChange).toHaveBeenCalledWith(false);
    });
  });
});

describe("Given a required field is left empty", () => {
  describe("When the form is submitted", () => {
    it("Then that field's error is set and no request is sent", async () => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      const { result } = renderContactForm();

      await submit(result, { firstName: "", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.fieldErrors).toEqual({ firstName: "Enter your first name." });
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given the email field has an invalid format", () => {
  describe("When the form is submitted", () => {
    it("Then the email error is set and no request is sent", async () => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "not-an-email" });

      expect(result.current.fieldErrors).toEqual({ email: "Enter a valid email address." });
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given valid, complete fields", () => {
  describe("When the form is submitted and the API accepts it", () => {
    it("Then status becomes success", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: true })));
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.status).toBe("success");
    });

    it("Then onSuccessChange is called with true", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: true })));
      const onSuccessChange = vi.fn();
      const { result } = renderContactForm(onSuccessChange);

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(onSuccessChange).toHaveBeenLastCalledWith(true);
    });
  });

  describe("When the API rejects with a field error", () => {
    it("Then the matching field's message is set", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.fieldErrors).toEqual({ email: "Enter a valid email address." });
      expect(result.current.status).toBe("error");
    });
  });

  describe("When the API rejects with a generic string error", () => {
    it("Then formErrorMessage is set", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(jsonResponse({ ok: false, error: "Delivery failed." }, false)),
      );
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.formErrorMessage).toBe("Delivery failed.");
    });
  });

  describe("When the response status is 413", () => {
    it("Then the attachment-too-large message is set", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 413, json: async () => ({}) } as Response));
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.formErrorMessage).toBe("The attachment is too large.");
      expect(result.current.status).toBe("error");
    });
  });

  describe("When the request itself fails", () => {
    it("Then a generic error message is set", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));
      const { result } = renderContactForm();

      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      expect(result.current.formErrorMessage).toBe("Please check the form and try again.");
      expect(result.current.status).toBe("error");
    });
  });
});

describe("Given a submission is already in flight", () => {
  describe("When handleSubmit is called again before it resolves", () => {
    it("Then only one request is sent", async () => {
      let resolveFetch!: (response: Response) => void;
      const pending = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
      const fetchMock = vi.fn().mockReturnValue(pending);
      vi.stubGlobal("fetch", fetchMock);
      const { result } = renderContactForm();
      const event = submitEvent({ firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });

      // Each call is flushed through its own sync act() so the resulting
      // "submitting" state update lands before the next call reads it.
      act(() => {
        void result.current.handleSubmit(event);
      });
      act(() => {
        void result.current.handleSubmit(event);
      });

      expect(result.current.status).toBe("submitting");
      expect(fetchMock).toHaveBeenCalledTimes(1);

      await act(async () => {
        resolveFetch(jsonResponse({ ok: true }));
        await pending;
      });

      expect(result.current.status).toBe("success");
    });
  });
});

describe("Given a selected attachment is within the size limit", () => {
  describe("When handleAttachmentSelected is called", () => {
    it("Then the attachment name is set and the file is accepted", () => {
      const { result } = renderContactForm();
      const file = new File(["content"], "bracket.pdf", { type: "application/pdf" });

      let accepted!: boolean;
      act(() => {
        accepted = result.current.handleAttachmentSelected(file);
      });

      expect(accepted).toBe(true);
      expect(result.current.attachmentName).toBe("bracket.pdf");
      expect(result.current.oversizedAttachmentMb).toBeNull();
    });
  });
});

describe("Given a selected attachment is over the size limit", () => {
  describe("When handleAttachmentSelected is called", () => {
    it("Then it is rejected and no attachment name is kept", () => {
      const { result } = renderContactForm();
      const file = oversizedFile(6 * 1024 * 1024);

      let accepted!: boolean;
      act(() => {
        accepted = result.current.handleAttachmentSelected(file);
      });

      expect(accepted).toBe(false);
      expect(result.current.attachmentName).toBeNull();
      expect(result.current.oversizedAttachmentMb).toBe("6.0");
    });
  });
});

describe("Given an attachment has been selected", () => {
  describe("When clearAttachment is called", () => {
    it("Then the attachment state is cleared", () => {
      const { result } = renderContactForm();
      const file = new File(["content"], "bracket.pdf", { type: "application/pdf" });

      act(() => {
        result.current.handleAttachmentSelected(file);
      });
      act(() => {
        result.current.clearAttachment();
      });

      expect(result.current.attachmentName).toBeNull();
      expect(result.current.oversizedAttachmentMb).toBeNull();
    });
  });
});

describe("Given a field has a validation error", () => {
  describe("When clearFieldError is called for that field", () => {
    it("Then only that field's error is removed", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      const { result } = renderContactForm();
      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });
      expect(result.current.fieldErrors.email).toBeDefined();

      act(() => {
        result.current.clearFieldError("email");
      });

      expect(result.current.fieldErrors).toEqual({});
    });
  });
});

describe("Given status, errors, and an attachment are all set", () => {
  describe("When reset is called", () => {
    it("Then everything returns to its idle defaults", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      const { result } = renderContactForm();
      await submit(result, { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" });
      act(() => {
        result.current.handleAttachmentSelected(new File(["content"], "bracket.pdf"));
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.status).toBe("idle");
      expect(result.current.formErrorMessage).toBeNull();
      expect(result.current.fieldErrors).toEqual({});
      expect(result.current.attachmentName).toBeNull();
      expect(result.current.oversizedAttachmentMb).toBeNull();
    });
  });
});

describe("Given the email field is blurred", () => {
  describe("When it is left empty", () => {
    it("Then no error is set", () => {
      const { result } = renderContactForm();

      act(() => {
        result.current.validateEmailOnBlur("");
      });

      expect(result.current.fieldErrors.email).toBeUndefined();
    });
  });

  describe("When it has an invalid format", () => {
    it("Then an email error is set", () => {
      const { result } = renderContactForm();

      act(() => {
        result.current.validateEmailOnBlur("not-an-email");
      });

      expect(result.current.fieldErrors.email).toBe("Enter a valid email address.");
    });
  });

  describe("When it is a valid address", () => {
    it("Then no error is set", () => {
      const { result } = renderContactForm();

      act(() => {
        result.current.validateEmailOnBlur("ada@example.com");
      });

      expect(result.current.fieldErrors.email).toBeUndefined();
    });
  });
});
