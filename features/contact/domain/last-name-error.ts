export type InvalidLastNameCode = "required" | "too_long";

/**
 * Domain error: raised when raw input cannot become a valid `LastName`.
 */
export class InvalidLastNameError extends Error {
  constructor(readonly code: InvalidLastNameCode) {
    super(`Invalid last name: ${code}`);
    this.name = "InvalidLastNameError";
  }
}
