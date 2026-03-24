import { describe, expect, test } from "vitest";

import { buildCalendarMatrix } from "@/lib/queries";

describe("calendar matrix", () => {
  test("builds a five week calendar grid", () => {
    const now = new Date("2026-03-23T12:00:00Z");
    const matrix = buildCalendarMatrix([], now);

    expect(matrix).toHaveLength(35);
    expect(matrix.some((cell) => cell.isToday)).toBe(true);
  });
});