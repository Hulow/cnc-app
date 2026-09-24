import { FirstName } from "./first-name";
import { LastName } from "./last-name";
import { EmailAddress } from "./email-address";
import { PhoneNumber } from "./phone-number";
import { MessageBody } from "./message-body";
import { ValidatedAttachment, type Attachment } from "./validated-attachment";

export type { Attachment } from "./validated-attachment";
export type { MessageFieldError } from "./errors/message-errors";

export interface MessageInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  attachment?: Attachment;
}

export interface MessagePrimitives {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  attachment?: Attachment;
}

/**
 * Aggregate root of the contact feature's domain.
 *
 * Modeled as a Value Object rather than an Entity: a submitted contact
 * message is never mutated after creation — it is validated once, handed
 * to the mailer, and discarded. All invariants are enforced by the
 * constituent value objects
 * (`FirstName`, `LastName`, `EmailAddress`, `PhoneNumber`, `MessageBody`, `ValidatedAttachment`);
 * there is no way to obtain a `Message` instance that violates them.
 *
 * `create` throws the first violated value object's domain error rather
 * than collecting every violation — callers that need the {field, code}
 * shape map it with `toMessageFieldError`.
 *
 * `id` is a UUID generated at creation time purely for tracing a
 * submission across logs and the outbound email — it is not a
 * persistence identity.
 */
export class Message {
  readonly id: string;

  private constructor(
    id: string,
    private readonly firstNameVO: FirstName,
    private readonly lastNameVO: LastName,
    private readonly emailVO: EmailAddress,
    private readonly phoneVO: PhoneNumber,
    private readonly bodyVO: MessageBody,
    private readonly attachmentVO: ValidatedAttachment | undefined,
  ) {
    this.id = id;
  }

  static create(input: MessageInput): Message {
    const firstName = FirstName.create(input.firstName);
    const lastName = LastName.create(input.lastName);
    const email = EmailAddress.create(input.email);
    const phone = PhoneNumber.create(input.phone);
    const body = MessageBody.create(input.message);
    const attachment = input.attachment ? ValidatedAttachment.create(input.attachment).value : undefined;

    return new Message(crypto.randomUUID(), firstName, lastName, email, phone, body, attachment);
  }

  toPrimitives(): MessagePrimitives {
    return {
      firstName: this.firstNameVO.value,
      lastName: this.lastNameVO.value,
      email: this.emailVO.value,
      phone: this.phoneVO.value,
      message: this.bodyVO.value,
      attachment: this.attachmentVO?.value,
    };
  }
}
