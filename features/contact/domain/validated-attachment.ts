import type { FieldResult } from "./message-errors";

export interface Attachment {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  content: Uint8Array;
}

/**
 * Value object wrapping an attachment. Immutable.
 */
export class ValidatedAttachment {
  private constructor(readonly value: Attachment) {}

  static create(props: Attachment): FieldResult<ValidatedAttachment> {
    return { value: new ValidatedAttachment(props) };
  }
}
