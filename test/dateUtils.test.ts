import { expect, test } from "@jest/globals";
import { formatDate, addDays, subtractDays, differenceInDays, isWeekend } from "../src/dateUtils";

test("formats date to YYYY-MM-DD", () => {
  const date = new Date("2023-07-09T00:00:00Z");
  expect(formatDate(date, "YYYY-MM-DD")).toBe("09/07/2023");
});

test("adds days to a date", () => {
  const date = new Date("2023-07-09T00:00:00Z");
  const newDate = addDays(date, 5);
  expect(formatDate(newDate, "YYYY-MM-DD")).toBe("14/07/2023");
});

test("subtracts days from a date", () => {
  const date = new Date("2023-07-09T00:00:00Z");
  const newDate = subtractDays(date, 5);
  expect(formatDate(newDate, "YYYY-MM-DD")).toBe("04/07/2023");
});

test("calculates difference in days between two dates", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-07-14T00:00:00Z");
  expect(differenceInDays(date1, date2)).toBe(5);
});

test("checks if a date is a weekend", () => {
  const date = new Date("2023-07-09T00:00:00Z"); // Sunday
  expect(isWeekend(date)).toBe(true);
});
