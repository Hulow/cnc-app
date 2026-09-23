import { afterEach, describe, expect, it, vi } from "vitest";

const { sendMock, ResendContactMailerMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  ResendContactMailerMock: vi.fn(),
}));

vi.mock("@/features/contact/infrastructure/resend-contact-mailer", () => ({
  ResendContactMailer: ResendContactMailerMock.mockImplementation(function () {
    return { send: sendMock };
  }),
}));

const { POST } = await import("./route");

function validFormData(overrides: Record<string, string> = {}): FormData {
  const formData = new FormData();
  formData.set("firstName", overrides.firstName ?? "Ada");
  formData.set("lastName", overrides.lastName ?? "Lovelace");
  formData.set("email", overrides.email ?? "ada@example.com");
  formData.set("phone", overrides.phone ?? "030 1234567");
  formData.set("message", overrides.message ?? "I'd like a quote for a milled aluminum bracket.");
  return formData;
}

function postRequest(formData: FormData): Request {
  return new Request("http://localhost/api/contact", { method: "POST", body: formData });
}

afterEach(() => {
  sendMock.mockReset();
  ResendContactMailerMock.mockClear();
});

describe("Given a valid submission", () => {
  describe("When it is posted", () => {
    it("Then it succeeds and the mailer is invoked", async () => {
      sendMock.mockResolvedValue(undefined);

      const response = await POST(postRequest(validFormData()));
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({ ok: true });
      expect(sendMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given an invalid email address", () => {
  describe("When it is posted", () => {
    it("Then it is rejected with a 400 and the mailer is never invoked", async () => {
      const response = await POST(postRequest(validFormData({ email: "not-an-email" })));
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({ ok: false, errors: [{ field: "email", code: "invalid_format" }] });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given an invalid phone number", () => {
  describe("When it is posted", () => {
    it("Then it is rejected with a 400 and the mailer is never invoked", async () => {
      const response = await POST(postRequest(validFormData({ phone: "call me" })));
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({ ok: false, errors: [{ field: "phone", code: "invalid_format" }] });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given no phone number", () => {
  describe("When it is posted", () => {
    it("Then it succeeds", async () => {
      sendMock.mockResolvedValue(undefined);

      const response = await POST(postRequest(validFormData({ phone: "" })));
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({ ok: true });
    });
  });
});

describe("Given a missing first name", () => {
  describe("When it is posted", () => {
    it("Then it is rejected with a 400 and the mailer is never invoked", async () => {
      const response = await POST(postRequest(validFormData({ firstName: "" })));
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({ ok: false, errors: [{ field: "firstName", code: "required" }] });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given the honeypot field is filled in", () => {
  describe("When it is posted", () => {
    it("Then it reports success without invoking the mailer", async () => {
      const formData = validFormData();
      formData.set("company", "Acme Bots Inc.");

      const response = await POST(postRequest(formData));
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({ ok: true });
      expect(sendMock).not.toHaveBeenCalled();
      expect(ResendContactMailerMock).not.toHaveBeenCalled();
    });
  });
});

describe("Given the mailer fails to deliver", () => {
  describe("When a valid submission is posted", () => {
    it("Then it reports a safe generic error with no leaked details", async () => {
      sendMock.mockRejectedValue(new Error("Resend API key invalid: sk_live_xxx"));

      const response = await POST(postRequest(validFormData()));
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({
        ok: false,
        error: "We couldn't send your message. Please try again.",
      });
      expect(JSON.stringify(body)).not.toContain("sk_live_xxx");
    });
  });
});

describe("Given the mailer cannot even be constructed (e.g. missing env vars)", () => {
  describe("When a valid submission is posted", () => {
    it("Then it reports a safe generic error instead of throwing", async () => {
      ResendContactMailerMock.mockImplementationOnce(function () {
        throw new Error("Missing required environment variable: RESEND_API_KEY");
      });

      const response = await POST(postRequest(validFormData()));
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({
        ok: false,
        error: "We couldn't send your message. Please try again.",
      });
    });
  });
});
