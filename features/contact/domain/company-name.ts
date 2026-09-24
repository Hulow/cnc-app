/**
 * Value object: the visitor's company name. Optional — raw input may be
 * null or blank, in which case the value is null. No format is enforced.
 * Immutable.
 */
export class CompanyName {
  private constructor(readonly value: string | null) {}

  static create(raw: string | null): CompanyName {
    const trimmed = raw?.trim() ?? "";
    return new CompanyName(trimmed.length === 0 ? null : trimmed);
  }
}
