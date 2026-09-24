export type InvalidEmailAddressCode = "required" | "invalid_format";

/**
 * Domain error: raised when raw input cannot become a valid `EmailAddress`.
 */
export class InvalidEmailAddressError extends Error {
  constructor(readonly code: InvalidEmailAddressCode) {
    super(`Invalid email address: ${code}`);
    this.name = "InvalidEmailAddressError";
  }
}
