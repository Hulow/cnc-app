import { Resend } from "resend";
import type { ContactMailer } from "../application/contact-mailer";
import type { Message } from "../domain/message";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Infrastructure adapter: sends a validated contact message via Resend.
 * Reads its own configuration from process.env (constructor throws
 * immediately if anything is missing) so the application layer never
 * needs to know about environment variables or the Resend SDK.
 */
export class ResendContactMailer implements ContactMailer {
  private readonly client: Resend;
  private readonly toEmail: string;
  private readonly fromEmail: string;

  constructor() {
    const apiKey = requireEnv("RESEND_API_KEY");
    this.toEmail = requireEnv("CONTACT_EMAIL");
    this.fromEmail = requireEnv("CONTACT_FROM_EMAIL");
    this.client = new Resend(apiKey);
  }

  async send(message: Message): Promise<void> {
    const attachment = message.attachment;

    const { error } = await this.client.emails.send({
      to: this.toEmail,
      from: this.fromEmail,
      replyTo: message.email,
      subject: `Website contact request from ${message.firstName} ${message.lastName}`,
      text: [
        `Name: ${message.firstName} ${message.lastName}`,
        `Email: ${message.email}`,
        "",
        message.message,
      ].join("\n"),
      attachments: attachment
        ? [
            {
              filename: attachment.filename,
              content: Buffer.from(attachment.content).toString("base64"),
            },
          ]
        : undefined,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}
