import type { Attachment, MessageInput } from "@/features/contact/domain/message";
import { InvalidFirstNameError } from "@/features/contact/domain/errors/first-name-error";
import { InvalidLastNameError } from "@/features/contact/domain/errors/last-name-error";
import { InvalidEmailAddressError } from "@/features/contact/domain/errors/email-address-error";
import { InvalidMessageBodyError } from "@/features/contact/domain/errors/message-body-error";
import { SubmitContact } from "@/features/contact/application/submit-contact";
import { ResendContactMailer } from "@/features/contact/infrastructure/resend-contact-mailer";
import { EmailDeliveryError } from "@/features/contact/application/email-delivery-error";

// Hidden form field: real visitors never fill it in, bots typically do.
// A non-empty value is treated as spam and silently dropped so as not
// to signal detection back to the bot.
const HONEYPOT_FIELD = "company";

function isHoneypotTriggered(formData: FormData): boolean {
  return readString(formData, HONEYPOT_FIELD).trim().length > 0;
}

function readString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function readOptionalString(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  if (typeof value !== "string" || value.trim().length === 0) return null;
  return value;
}

async function readAttachment(formData: FormData): Promise<Attachment | undefined> {
  const value = formData.get("attachment");
  if (!(value instanceof File) || value.size === 0) return undefined;

  return {
    filename: value.name,
    mimeType: value.type,
    sizeBytes: value.size,
    content: new Uint8Array(await value.arrayBuffer()),
  };
}

async function readMessageInput(formData: FormData): Promise<MessageInput> {
  return {
    firstName: readString(formData, "firstName"),
    lastName: readString(formData, "lastName"),
    email: readString(formData, "email"),
    phone: readOptionalString(formData, "phone"),
    companyName: readOptionalString(formData, "companyName"),
    message: readString(formData, "message"),
    attachment: await readAttachment(formData),
  };
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();

  if (isHoneypotTriggered(formData)) {
    return Response.json({ ok: true }, { status: 200 });
  }

  try {
    const submitContact = new SubmitContact(new ResendContactMailer());
    const message = await readMessageInput(formData);
    await submitContact.execute(message);

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof InvalidFirstNameError) {
      return Response.json(
        { ok: false, error: { field: "firstName", code: error.code } },
        { status: 400 }
      );
    }

    if (error instanceof InvalidLastNameError) {
      return Response.json(
        { ok: false, error: { field: "lastName", code: error.code } },
        { status: 400 }
      );
    }

    if (error instanceof InvalidEmailAddressError) {
      return Response.json(
        { ok: false, error: { field: "email", code: error.code } },
        { status: 400 }
      );
    }

    if (error instanceof InvalidMessageBodyError) {
      return Response.json(
        { ok: false, error: { field: "message", code: error.code } },
        { status: 400 }
      );
    }

    if (error instanceof EmailDeliveryError) {
      return Response.json(
        { ok: false, error: 'Something went wrong with my Email delivery provider' },
        { status: 500 }
      );
    }

    return Response.json({ ok: false, error: 'Something went wrong' }, { status: 500 });
  }
}
