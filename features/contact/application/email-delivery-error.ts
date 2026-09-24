/**
 * Application error: raised by a `ContactMailer` implementation when the
 * underlying email provider fails to send. Wraps the provider's own
 * error message so callers don't need to know which provider is in use.
 */
export class EmailDeliveryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "EmailDeliveryError";
  }
}
