import { Message, type Attachment, type MessageInput } from "@/features/contact/domain/message";
import { SubmitContact } from "@/features/contact/application/submit-contact";
import { ResendContactMailer } from "@/features/contact/infrastructure/resend-contact-mailer";

// Hidden form field: real visitors never fill it in, bots typically do.
// A non-empty value is treated as spam and silently dropped so as not
// to signal detection back to the bot.
const HONEYPOT_FIELD = "company";

const GENERIC_DELIVERY_ERROR_MESSAGE = "We couldn't send your message. Please try again.";

function readString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
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
    phone: readString(formData, "phone"),
    message: readString(formData, "message"),
    attachment: await readAttachment(formData),
  };
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();

  if (readString(formData, HONEYPOT_FIELD).trim().length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const result = Message.create(await readMessageInput(formData));

  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    const submitContact = new SubmitContact(new ResendContactMailer());
    const submitResult = await submitContact.execute(result.value);

    if (!submitResult.ok) {
      return Response.json({ ok: false, error: GENERIC_DELIVERY_ERROR_MESSAGE }, { status: 500 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: GENERIC_DELIVERY_ERROR_MESSAGE }, { status: 500 });
  }
}
