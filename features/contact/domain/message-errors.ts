export type MessageFieldError =
  | { field: "firstName"; code: "required" | "too_long" }
  | { field: "lastName"; code: "required" | "too_long" }
  | { field: "email"; code: "required" | "too_long" | "invalid_format" }
  | { field: "message"; code: "required" | "too_long" }
  | { field: "attachment"; code: "unsupported_type" | "too_large" };

/**
 * Result of constructing a single value object: either the constructed
 * value, or the field error that rejected the raw input. Never both.
 */
export interface FieldResult<T> {
  readonly value?: T;
  readonly error?: MessageFieldError;
}
