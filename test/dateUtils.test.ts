import { formatDate } from "../src/dateUtils";
import { expect, test } from "@jest/globals";

test("formats date to YYYY-MM-DD", () => {
  const date = new Date("2023-07-09T00:00:00Z");
  expect(formatDate(date, "YYYY-MM-DD")).toBe("09/07/2023");
});
