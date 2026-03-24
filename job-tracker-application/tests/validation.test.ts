import { describe, expect, test } from "vitest";

import { jobSchema } from "@/lib/validation";

describe("job validation", () => {
  test("requires title and company", () => {
    const result = jobSchema.safeParse({
      title: "",
      company: "",
      status: "applied"
    });

    expect(result.success).toBe(false);
  });

  test("accepts a valid payload", () => {
    const result = jobSchema.safeParse({
      title: "Staff Engineer",
      company: "Acme",
      status: "interviewing",
      sourceUrl: "https://example.com",
      appliedAt: "2026-03-23"
    });

    expect(result.success).toBe(true);
  });
});