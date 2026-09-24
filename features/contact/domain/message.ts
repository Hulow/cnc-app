import { FirstName } from "./first-name";
import { InvalidFirstNameError } from "./first-name-error";
import { LastName } from "./last-name";
import { InvalidLastNameError } from "./last-name-error";
import { EmailAddress } from "./email-address";
import { InvalidEmailAddressError } from "./email-address-error";
import { PhoneNumber } from "./phone-number";
import { MessageBody } from "./message-body";
import { ValidatedAttachment, type Attachment } from "./validated-attachment";
import type { MessageFieldError } from "./message-errors";

export type { Attachment } from "./validated-attachment";
export type { MessageFieldError } from "./message-errors";

export type MessageResult =
  | { ok: true; value: Message }
  | { ok: false; errors: MessageFieldError[] };

export interface MessageInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

  static create(input: MessageInput): MessageResult {
    let firstName: FirstName | undefined;
    let firstNameError: MessageFieldError | undefined;
    try {
      firstName = FirstName.create(input.firstName);
    } catch (error) {
      if (!(error instanceof InvalidFirstNameError)) throw error;
      firstNameError = { field: "firstName", code: error.code };
    }

    let lastName: LastName | undefined;
    let lastNameError: MessageFieldError | undefined;
    try {
      lastName = LastName.create(input.lastName);
    } catch (error) {
      if (!(error instanceof InvalidLastNameError)) throw error;
      lastNameError = { field: "lastName", code: error.code };
    }

    let email: EmailAddress | undefined;
    let emailError: MessageFieldError | undefined;
    try {
      email = EmailAddress.create(input.email);
    } catch (error) {
      if (!(error instanceof InvalidEmailAddressError)) throw error;
      emailError = { field: "email", code: error.code };
    }

    const phone = PhoneNumber.create(input.phone);
    const body = MessageBody.create(input.message);
    const attachment = input.attachment ? ValidatedAttachment.create(input.attachment) : undefined;

    const errors = [
      firstNameError,
      lastNameError,
      emailError,
      phone.error,
      body.error,
      attachment?.error,
    ].filter((error): error is MessageFieldError => error !== undefined);

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      value: new Message(
        crypto.randomUUID(),
        firstName!,
        lastName!,
        email!,
        phone.value!,
        body.value!,
        attachment?.value,
      ),
    };
  }

  get firstName(): string {
    return this.firstNameVO.value;
  }

  get lastName(): string {
    return this.lastNameVO.value;
  }

  get email(): string {
    return this.emailVO.value;
  }

  get phone(): string {
    return this.phoneVO.value;
  }

  get message(): string {
    return this.bodyVO.value;
  }

  get attachment(): Attachment | undefined {
    return this.attachmentVO?.toProps();
  }

  equals(other: Message): boolean {
    const sameAttachment =
      (this.attachmentVO === undefined && other.attachmentVO === undefined) ||
      (this.attachmentVO !== undefined &&
        other.attachmentVO !== undefined &&
        this.attachmentVO.equals(other.attachmentVO));

    return (
      this.firstNameVO.value === other.firstNameVO.value &&
      this.lastNameVO.value === other.lastNameVO.value &&
      this.emailVO.value === other.emailVO.value &&
      this.phoneVO.equals(other.phoneVO) &&
      this.bodyVO.equals(other.bodyVO) &&
      sameAttachment
    );
  }
}
