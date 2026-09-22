import { afterEach, describe, expect, it, vi } from "vitest";
import { Message } from "../domain/message";

const { sendMock, ResendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  ResendMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: ResendMock.mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

const { ResendContactMailer } = await import("./resend-contact-mailer");

function validMessage(): Message {
  const result = Message.create({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    message: "I'd like a quote for a milled aluminum bracket.",
  });

  if (!result.ok) throw new Error("expected a valid message");
  return result.value;
}

function stubValidEnv() {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_EMAIL", "owner@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "no-reply@example.com");
}

afterEach(() => {
  vi.unstubAllEnvs();
  sendMock.mockReset();
  ResendMock.mockClear();
});

describe("Given all required environment variables are set", () => {
  describe("When the mailer is constructed", () => {
    it("Then it authenticates with the Resend API key", () => {
      stubValidEnv();

      new ResendContactMailer();

      expect(ResendMock).toHaveBeenCalledWith("re_test_key");
    });
  });
});

describe.each(["RESEND_API_KEY", "CONTACT_EMAIL", "CONTACT_FROM_EMAIL"])(
  "Given %s is missing",
  (missingVar) => {
    describe("When the mailer is constructed", () => {
      it("Then it throws immediately", () => {
        stubValidEnv();
        vi.stubEnv(missingVar, "");

        expect(() => new ResendContactMailer()).toThrow(missingVar);
      });
    });
  },
);

describe("Given a message with no attachment", () => {
  describe("When it is sent", () => {
    it("Then the destination, sender and reply-to are mapped correctly", async () => {
      stubValidEnv();
      sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
      const mailer = new ResendContactMailer();

      await mailer.send(validMessage());

      expect(sendMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "owner@example.com",
          from: "no-reply@example.com",
          replyTo: "ada@example.com",
          subject: expect.stringContaining("Ada Lovelace"),
          attachments: undefined,
        }),
      );
    });
  });
});

describe("Given a message with an attachment", () => {
  describe("When it is sent", () => {
    it("Then the attachment is mapped to base64 content and filename", async () => {
      stubValidEnv();
      sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
      const mailer = new ResendContactMailer();
      const messageResult = Message.create({
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        message: "See attached.",
        attachment: {
          filename: "part.step",
          mimeType: "application/step",
          sizeBytes: 3,
          content: new Uint8Array([1, 2, 3]),
        },
      });
      if (!messageResult.ok) throw new Error("expected a valid message");

      await mailer.send(messageResult.value);

      expect(sendMock).toHaveBeenCalledWith(
        expect.objectContaining({
          attachments: [
            {
              filename: "part.step",
              content: Buffer.from([1, 2, 3]).toString("base64"),
            },
          ],
        }),
      );
    });
  });
});

describe("Given the Resend API reports an error", () => {
  describe("When a message is sent", () => {
    it("Then the mailer throws instead of resolving silently", async () => {
      stubValidEnv();
      sendMock.mockResolvedValue({
        data: null,
        error: { message: "invalid API key", statusCode: 401, name: "invalid_api_key" },
      });
      const mailer = new ResendContactMailer();

      await expect(mailer.send(validMessage())).rejects.toThrow("invalid API key");
    });
  });
});
