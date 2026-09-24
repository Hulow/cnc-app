export type InvalidMessageBodyCode = "too_long";

/**
 * Domain error: raised when raw input cannot become a valid `MessageBody`.
 */
export class InvalidMessageBodyError extends Error {
  constructor(readonly code: InvalidMessageBodyCode) {
    super(`Invalid message body: ${code}`);
    this.name = "InvalidMessageBodyError";
  }
}
