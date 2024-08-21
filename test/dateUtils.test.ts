import { expect, test } from "@jest/globals";
import {
  formatDate,
  addDays,
  subtractDays,
  differenceInDays,
  isWeekend,
  isLeapYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDaysArray,
  getMonthName,
  getShortMonthName,
  getWeekdayName,
  getShortWeekdayName,
} from "../src/dateUtils/dateUtils";

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

test("checks if a date is not a weekend", () => {
  const date = new Date("2023-07-10T00:00:00Z"); // Monday
  expect(isWeekend(date)).toBe(false);
});

test("checks if is leap year", () => {
  expect(isLeapYear(2020)).toBe(true);
});

test("checks if is not leap year", () => {
  expect(isLeapYear(2021)).toBe(false);
});

test("checks if two dates are the same day", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-07-09T12:00:00Z");
  expect(isSameDay(date1, date2)).toBe(true);
});

test("checks if two dates are not the same day", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-07-10T00:00:00Z");
  expect(isSameDay(date1, date2)).toBe(false);
});

test("checks if two dates are the same month", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-07-10T00:00:00Z");
  expect(isSameMonth(date1, date2)).toBe(true);
});

test("checks if two dates are not the same month", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-08-10T00:00:00Z");
  expect(isSameMonth(date1, date2)).toBe(false);
});

test("checks if two dates are the same year", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2023-08-10T00:00:00Z");
  expect(isSameYear(date1, date2)).toBe(true);
});

test("checks if two dates are not the same year", () => {
  const date1 = new Date("2023-07-09T00:00:00Z");
  const date2 = new Date("2024-08-10T00:00:00Z");
  expect(isSameYear(date1, date2)).toBe(false);
});

test("gets the number of days in a month", () => {
  expect(getDaysInMonth(2023, 1)).toBe(28);
});

test("gets the first day of a month", () => {
  expect(getFirstDayOfMonth(2023, 1)).toBe(3);
});

test("gets the last day of a month", () => {
  expect(getLastDayOfMonth(2023, 1)).toBe(2);
});

test("gets an array of days in a month", () => {
  const days = getDaysArray(2023, 1);
  expect(days.length).toBe(28);
  expect(days[0].getDate()).toBe(1);
  expect(days[days.length - 1].getDate()).toBe(28);
});

test("gets the month name", () => {
  expect(getMonthName(1)).toBe("febrero");
});

test("gets the short month name", () => {
  expect(getShortMonthName(1)).toBe("feb");
});

test("gets the weekday name", () => {
  expect(getWeekdayName(1)).toBe("domingo");
});

test("gets the short weekday name", () => {
  expect(getShortWeekdayName(1)).toBe("dom");
});
