import type { FieldResult } from "./message-errors";

export interface Attachment {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  content: Uint8Array;
}

/**
 * Value object wrapping an attachment. Immutable; equality by value.
 */
export class ValidatedAttachment {
  private constructor(private readonly props: Attachment) {}

  static create(props: Attachment): FieldResult<ValidatedAttachment> {
    return { value: new ValidatedAttachment(props) };
  }

  toProps(): Attachment {
    return { ...this.props };
  }

  equals(other: ValidatedAttachment): boolean {
    return (
      this.props.filename === other.props.filename &&
      this.props.mimeType === other.props.mimeType &&
      this.props.sizeBytes === other.props.sizeBytes
    );
  }
}
