import { InvalidFirstNameError } from "./first-name-error";
import { InvalidLastNameError } from "./last-name-error";
import { InvalidEmailAddressError } from "./email-address-error";
import { InvalidMessageBodyError } from "./message-body-error";
import type { MessageFieldError } from "./message-errors";

/**
 * Maps a thrown value-object domain error to the {field, code} shape the
 * application/API layers speak. Returns undefined for anything else, so
 * callers know to let the error propagate instead of swallowing it.
 */
export function toMessageFieldError(error: unknown): MessageFieldError | undefined {
  if (error instanceof InvalidFirstNameError) return { field: "firstName", code: error.code };
  if (error instanceof InvalidLastNameError) return { field: "lastName", code: error.code };
  if (error instanceof InvalidEmailAddressError) return { field: "email", code: error.code };
  if (error instanceof InvalidMessageBodyError) return { field: "message", code: error.code };
  return undefined;
}
