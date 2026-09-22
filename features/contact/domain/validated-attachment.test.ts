import { describe, expect, it } from "vitest";
import { ValidatedAttachment, type Attachment } from "./validated-attachment";

function validAttachment(overrides: Partial<Attachment> = {}): Attachment {
  return {
    filename: "part.step",
    mimeType: "application/step",
    sizeBytes: 1024,
    content: new Uint8Array([1, 2, 3]),
    ...overrides,
  };
}

describe("Given a supported attachment", () => {
  describe("When a validated attachment is created", () => {
    it("Then it is accepted", () => {
      const result = ValidatedAttachment.create(validAttachment());

      expect(result.value).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it("Then its properties are exposed", () => {
      const attachment = validAttachment({ filename: "part.pdf", mimeType: "application/pdf" });
      const result = ValidatedAttachment.create(attachment);

      expect(result.value?.toProps()).toEqual(attachment);
    });
  });
});

describe("Given an attachment with an unsupported extension", () => {
  describe("When a validated attachment is created", () => {
    it("Then it is accepted", () => {
      const result = ValidatedAttachment.create(
        validAttachment({ filename: "part.exe", mimeType: "application/octet-stream" }),
      );

      expect(result.value).toBeDefined();
      expect(result.error).toBeUndefined();
    });
  });
});

describe("Given an attachment over any size limit", () => {
  describe("When a validated attachment is created", () => {
    it("Then it is accepted", () => {
      const result = ValidatedAttachment.create(
        validAttachment({ sizeBytes: 10 * 1024 * 1024 + 1 }),
      );

      expect(result.value).toBeDefined();
      expect(result.error).toBeUndefined();
    });
  });
});

describe("Given two validated attachments with the same properties", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = ValidatedAttachment.create(validAttachment()).value!;
      const second = ValidatedAttachment.create(validAttachment()).value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
