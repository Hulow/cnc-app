import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./contact-form";

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "I'd like a quote for a milled aluminum bracket." },
  });
}

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Given every required field is left empty", () => {
  describe("When the visitor submits", () => {
    it("Then the first empty field's message is shown and no request is sent", () => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(screen.getByText("Enter your first name.")).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given only the email field is left empty", () => {
  describe("When the visitor submits", () => {
    it("Then the email field's message is shown and no request is sent", () => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Ada" } });
      fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Lovelace" } });
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given a valid submission", () => {
  describe("When the visitor submits and the API accepts it", () => {
    it("Then a success confirmation is shown", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: true })));
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByText(/your message has been sent/i)).toBeInTheDocument();
    });

    it("Then the request is a POST to /api/contact", async () => {
      const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
      vi.stubGlobal("fetch", fetchMock);
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      await screen.findByText(/your message has been sent/i);
      expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
    });
  });
});

describe("Given the API rejects the submission with a field error", () => {
  describe("When the visitor submits", () => {
    it("Then the matching field's validation message is shown", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    });

    it("Then the entered values are preserved", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      await screen.findByText("Enter a valid email address.");
      expect(screen.getByLabelText("First name")).toHaveValue("Ada");
    });
  });
});

describe("Given the API rejects the submission with a phone field error", () => {
  describe("When the visitor submits", () => {
    it("Then the phone field's validation message is shown", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "phone", code: "invalid_format" } }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByText("Enter a valid phone number.")).toBeInTheDocument();
    });
  });
});

describe("Given the API reports a delivery failure", () => {
  describe("When the visitor submits", () => {
    it("Then the server's generic error message is shown", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: "We couldn't send your message. Please try again." }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(
        await screen.findByText("We couldn't send your message. Please try again."),
      ).toBeInTheDocument();
    });
  });
});

describe("Given the API responds with the obsolete plural errors shape", () => {
  describe("When the visitor submits", () => {
    it("Then it is not specially handled and a generic message is shown instead", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, errors: [{ field: "email", code: "invalid_format" }] }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByText("Please check the form and try again.")).toBeInTheDocument();
      expect(screen.queryByText("Enter a valid email address.")).not.toBeInTheDocument();
    });
  });
});

describe("Given the request itself fails (e.g. offline)", () => {
  describe("When the visitor submits", () => {
    it("Then a generic error message is shown", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByText("Please check the form and try again.")).toBeInTheDocument();
    });
  });
});

describe("Given a submission is already in flight", () => {
  describe("When the submit control is activated again before it resolves", () => {
    it("Then only one request is sent", async () => {
      let resolveFetch!: (response: Response) => void;
      const pending = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
      const fetchMock = vi.fn().mockReturnValue(pending);
      vi.stubGlobal("fetch", fetchMock);
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      const submitButton = screen.getByRole("button", { name: "Send message" });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      resolveFetch(jsonResponse({ ok: true }));
      await screen.findByText(/your message has been sent/i);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("Then the submit button is disabled while pending", async () => {
      const pending = new Promise<Response>(() => {});
      vi.stubGlobal("fetch", vi.fn().mockReturnValue(pending));
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));

      expect(await screen.findByRole("button", { name: "Sending…" })).toBeDisabled();
    });
  });
});

describe("Given the visitor has filled in the form", () => {
  describe("When they click Cancel", () => {
    it("Then the form stays open and its fields are cleared", () => {
      vi.stubGlobal("fetch", vi.fn());
      const onClose = vi.fn();
      render(<ContactForm formId="contact-form" onClose={onClose} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByLabelText("First name")).toHaveValue("");
      expect(screen.getByLabelText("Last name")).toHaveValue("");
      expect(screen.getByLabelText("Email")).toHaveValue("");
      expect(screen.getByLabelText("Message")).toHaveValue("");
    });

    it("Then a shown validation error is cleared", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse({ ok: false, error: { field: "email", code: "invalid_format" } }, false),
        ),
      );
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      fillRequiredFields();
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));
      await screen.findByText("Enter a valid email address.");

      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

      expect(screen.queryByText("Enter a valid email address.")).not.toBeInTheDocument();
    });

    it("Then a selected attachment is cleared", () => {
      vi.stubGlobal("fetch", vi.fn());
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      const fileInput = screen.getByLabelText("Attachment") as HTMLInputElement;
      const file = new File(["content"], "bracket.pdf", { type: "application/pdf" });
      fireEvent.change(fileInput, { target: { files: [file] } });
      expect(screen.getByRole("button", { name: "Remove attachment" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

      expect(screen.queryByRole("button", { name: "Remove attachment" })).not.toBeInTheDocument();
    });
  });
});

describe("Given no attachment has been selected", () => {
  describe("When the form is rendered", () => {
    it("Then no remove-attachment control is shown", () => {
      vi.stubGlobal("fetch", vi.fn());
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      expect(screen.queryByRole("button", { name: "Remove attachment" })).not.toBeInTheDocument();
    });
  });
});

describe("Given the visitor has selected an attachment", () => {
  describe("When they click Remove attachment", () => {
    it("Then the file is cleared and the control disappears", () => {
      vi.stubGlobal("fetch", vi.fn());
      render(<ContactForm formId="contact-form" onClose={() => {}} />);

      const fileInput = screen.getByLabelText("Attachment") as HTMLInputElement;
      const file = new File(["content"], "bracket.pdf", { type: "application/pdf" });
      fireEvent.change(fileInput, { target: { files: [file] } });

      expect(screen.getByRole("button", { name: "Remove attachment" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Remove attachment" }));

      expect(screen.queryByRole("button", { name: "Remove attachment" })).not.toBeInTheDocument();
    });
  });
});
