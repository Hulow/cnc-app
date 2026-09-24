export type InvalidFirstNameCode = "required" | "too_long";

/**
 * Domain error: raised when raw input cannot become a valid `FirstName`.
 */
export class InvalidFirstNameError extends Error {
  constructor(readonly code: InvalidFirstNameCode) {
    super(`Invalid first name: ${code}`);
    this.name = "InvalidFirstNameError";
  }
}
