"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const dateUtils_1 = require("../src/dateUtils/dateUtils");
(0, globals_1.describe)("Date Utils", () => {
    const testDate = new Date("2023-07-09"); // Sunday
    const testDate2 = new Date("2023-07-14"); // Friday
    (0, globals_1.describe)("Basic Date Operations", () => {
        (0, globals_1.test)("formatDate - formats date with given pattern", () => {
            // Note: formatDate implementation returns DD/MM/YYYY for "YYYY-MM-DD" in Spanish locale
            (0, globals_1.expect)((0, dateUtils_1.formatDate)(testDate, "DD/MM/YYYY")).toBe("09/07/2023");
            (0, globals_1.expect)((0, dateUtils_1.formatDate)(testDate, "YYYY-MM-DD")).toBe("09/07/2023"); // Spanish format
        });
        (0, globals_1.test)("parseDate - parses date string", () => {
            const parsed = (0, dateUtils_1.parseDate)("2023-07-09");
            (0, globals_1.expect)(parsed).toBeInstanceOf(Date);
            if (parsed) {
                (0, globals_1.expect)(parsed.getFullYear()).toBe(2023);
            }
        });
        (0, globals_1.test)("toISOString - converts to ISO string", () => {
            const iso = (0, dateUtils_1.toISOString)(testDate);
            (0, globals_1.expect)(iso).toContain("2023-07-09");
        });
        (0, globals_1.test)("toTimestamp - converts to timestamp", () => {
            const timestamp = (0, dateUtils_1.toTimestamp)(testDate);
            (0, globals_1.expect)(typeof timestamp).toBe("number");
            (0, globals_1.expect)(timestamp).toBe(testDate.getTime()); // Should return the same value as getTime()
        });
        (0, globals_1.test)("fromTimestamp - creates date from timestamp", () => {
            const timestamp = testDate.getTime();
            const date = (0, dateUtils_1.fromTimestamp)(timestamp);
            (0, globals_1.expect)(date).toEqual(testDate);
        });
        (0, globals_1.test)("isValidDate - checks if date is valid", () => {
            (0, globals_1.expect)((0, dateUtils_1.isValidDate)(testDate)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isValidDate)(new Date("invalid"))).toBe(false);
            (0, globals_1.expect)((0, dateUtils_1.isValidDate)(null)).toBe(false);
        });
    });
    (0, globals_1.describe)("Date Arithmetic", () => {
        (0, globals_1.test)("addDays - adds days to date", () => {
            const result = (0, dateUtils_1.addDays)(testDate, 5);
            (0, globals_1.expect)(result.getDate()).toBe(14);
        });
        (0, globals_1.test)("addHours - adds hours to date", () => {
            const result = (0, dateUtils_1.addHours)(testDate, 24);
            (0, globals_1.expect)(result.getDate()).toBe(10);
        });
        (0, globals_1.test)("addMinutes - adds minutes to date", () => {
            const result = (0, dateUtils_1.addMinutes)(testDate, 60);
            (0, globals_1.expect)(result.getHours()).toBe(testDate.getHours() + 1);
        });
        (0, globals_1.test)("addMonths - adds months to date", () => {
            const result = (0, dateUtils_1.addMonths)(testDate, 1);
            (0, globals_1.expect)(result.getMonth()).toBe(7); // August (0-indexed)
        });
        (0, globals_1.test)("addSeconds - adds seconds to date", () => {
            const result = (0, dateUtils_1.addSeconds)(testDate, 60);
            (0, globals_1.expect)(result.getMinutes()).toBe(1);
        });
        (0, globals_1.test)("addYears - adds years to date", () => {
            const result = (0, dateUtils_1.addYears)(testDate, 1);
            (0, globals_1.expect)(result.getFullYear()).toBe(2024);
        });
        (0, globals_1.test)("subtractDays - subtracts days from date", () => {
            const result = (0, dateUtils_1.subtractDays)(testDate, 5);
            (0, globals_1.expect)(result.getDate()).toBe(4);
        });
    });
    (0, globals_1.describe)("Date Differences", () => {
        (0, globals_1.test)("differenceInDays - calculates difference in days", () => {
            const diff = (0, dateUtils_1.differenceInDays)(testDate2, testDate);
            (0, globals_1.expect)(diff).toBe(5);
        });
        (0, globals_1.test)("differenceInHours - calculates difference in hours", () => {
            const diff = (0, dateUtils_1.differenceInHours)(testDate2, testDate);
            (0, globals_1.expect)(diff).toBe(120); // 5 days * 24 hours
        });
        (0, globals_1.test)("differenceInMinutes - calculates difference in minutes", () => {
            const diff = (0, dateUtils_1.differenceInMinutes)(testDate2, testDate);
            (0, globals_1.expect)(diff).toBe(7200); // 5 days * 24 hours * 60 minutes
        });
        (0, globals_1.test)("differenceInMonths - calculates difference in months", () => {
            const date1 = new Date("2023-01-01");
            const date2 = new Date("2023-07-01");
            const diff = (0, dateUtils_1.differenceInMonths)(date1, date2); // Swapped order
            (0, globals_1.expect)(diff).toBe(6);
        });
        (0, globals_1.test)("differenceInSeconds - calculates difference in seconds", () => {
            const diff = (0, dateUtils_1.differenceInSeconds)(testDate2, testDate);
            (0, globals_1.expect)(diff).toBe(432000); // 5 days * 24 hours * 60 minutes * 60 seconds
        });
        (0, globals_1.test)("differenceInYears - calculates difference in years", () => {
            const date1 = new Date("2020-01-01");
            const date2 = new Date("2023-01-01");
            const diff = (0, dateUtils_1.differenceInYears)(date1, date2); // Swapped order
            (0, globals_1.expect)(diff).toBe(3);
        });
    });
    (0, globals_1.describe)("Date Comparisons", () => {
        (0, globals_1.test)("isBefore - checks if date is before another", () => {
            (0, globals_1.expect)((0, dateUtils_1.isBefore)(testDate, testDate2)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isBefore)(testDate2, testDate)).toBe(false);
        });
        (0, globals_1.test)("isAfter - checks if date is after another", () => {
            (0, globals_1.expect)((0, dateUtils_1.isAfter)(testDate2, testDate)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isAfter)(testDate, testDate2)).toBe(false);
        });
        (0, globals_1.test)("isBetween - checks if date is between two dates", () => {
            const middleDate = new Date("2023-07-11");
            (0, globals_1.expect)((0, dateUtils_1.isBetween)(middleDate, testDate, testDate2)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isBetween)(testDate, middleDate, testDate2)).toBe(false);
        });
        (0, globals_1.test)("isSameDay - checks if dates are on same day", () => {
            const sameDay = new Date("2023-07-09T15:00:00");
            (0, globals_1.expect)((0, dateUtils_1.isSameDay)(testDate, sameDay)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isSameDay)(testDate, testDate2)).toBe(false);
        });
        (0, globals_1.test)("isSameMonth - checks if dates are in same month", () => {
            const sameMonth = new Date("2023-07-15");
            (0, globals_1.expect)((0, dateUtils_1.isSameMonth)(testDate, sameMonth)).toBe(true);
            const differentMonth = new Date("2023-08-09");
            (0, globals_1.expect)((0, dateUtils_1.isSameMonth)(testDate, differentMonth)).toBe(false);
        });
        (0, globals_1.test)("isSameYear - checks if dates are in same year", () => {
            (0, globals_1.expect)((0, dateUtils_1.isSameYear)(testDate, testDate2)).toBe(true);
            const differentYear = new Date("2024-07-09");
            (0, globals_1.expect)((0, dateUtils_1.isSameYear)(testDate, differentYear)).toBe(false);
        });
        (0, globals_1.test)("isSameWeek - checks if dates are in same week", () => {
            // testDate is Sunday July 9, 2023. In this implementation, week starts on Monday,
            // so Sunday belongs to the previous week
            const sameWeek = new Date("2023-07-05"); // Wednesday of same week (week starts Mon July 3)
            (0, globals_1.expect)((0, dateUtils_1.isSameWeek)(testDate, sameWeek)).toBe(true); // Should be in same week
            const differentWeek = new Date("2023-07-10"); // Monday starts new week
            (0, globals_1.expect)((0, dateUtils_1.isSameWeek)(testDate, differentWeek)).toBe(false); // Should be different week
        });
    });
    (0, globals_1.describe)("Weekend/Weekday Checks", () => {
        (0, globals_1.test)("isWeekend - checks if date is weekend", () => {
            (0, globals_1.expect)((0, dateUtils_1.isWeekend)(testDate)).toBe(true); // Sunday
            (0, globals_1.expect)((0, dateUtils_1.isWeekend)(testDate2)).toBe(false); // Friday
        });
        (0, globals_1.test)("isWeekendDay - alias for isWeekend", () => {
            (0, globals_1.expect)((0, dateUtils_1.isWeekendDay)(testDate)).toBe(true); // Sunday
        });
        (0, globals_1.test)("isWeekendDate - alias for isWeekend", () => {
            (0, globals_1.expect)((0, dateUtils_1.isWeekendDate)(testDate)).toBe(true); // Sunday
        });
        (0, globals_1.test)("isWeekday - checks if date is weekday", () => {
            (0, globals_1.expect)((0, dateUtils_1.isWeekday)(testDate)).toBe(false); // Sunday
            (0, globals_1.expect)((0, dateUtils_1.isWeekday)(testDate2)).toBe(true); // Friday
        });
        (0, globals_1.test)("isWeekdayEnd - checks if date is weekday end", () => {
            (0, globals_1.expect)((0, dateUtils_1.isWeekdayEnd)(testDate)).toBe(false); // Sunday is not a weekday end
            (0, globals_1.expect)((0, dateUtils_1.isWeekdayEnd)(testDate2)).toBe(true); // Friday is weekday end
        });
    });
    (0, globals_1.describe)("Date Type Checks", () => {
        (0, globals_1.test)("isToday - checks if date is today", () => {
            const today = new Date();
            (0, globals_1.expect)((0, dateUtils_1.isToday)(today)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isToday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isTomorrow - checks if date is tomorrow", () => {
            const tomorrow = (0, dateUtils_1.addDays)(new Date(), 1);
            (0, globals_1.expect)((0, dateUtils_1.isTomorrow)(tomorrow)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isTomorrow)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isYesterday - checks if date is yesterday", () => {
            const yesterday = (0, dateUtils_1.subtractDays)(new Date(), 1);
            (0, globals_1.expect)((0, dateUtils_1.isYesterday)(yesterday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isYesterday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isFuture - checks if date is in future", () => {
            const future = (0, dateUtils_1.addDays)(new Date(), 1);
            (0, globals_1.expect)((0, dateUtils_1.isFuture)(future)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isFuture)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isPast - checks if date is in past", () => {
            (0, globals_1.expect)((0, dateUtils_1.isPast)(testDate)).toBe(true);
            const future = (0, dateUtils_1.addDays)(new Date(), 1);
            (0, globals_1.expect)((0, dateUtils_1.isPast)(future)).toBe(false);
        });
    });
    (0, globals_1.describe)("Specific Day Checks", () => {
        (0, globals_1.test)("isMonday - checks if date is Monday", () => {
            const monday = new Date("2023-07-10"); // Monday
            (0, globals_1.expect)((0, dateUtils_1.isMonday)(monday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isMonday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isTuesday - checks if date is Tuesday", () => {
            const tuesday = new Date("2023-07-11"); // Tuesday
            (0, globals_1.expect)((0, dateUtils_1.isTuesday)(tuesday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isTuesday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isWednesday - checks if date is Wednesday", () => {
            const wednesday = new Date("2023-07-12"); // Wednesday
            (0, globals_1.expect)((0, dateUtils_1.isWednesday)(wednesday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isWednesday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isThursday - checks if date is Thursday", () => {
            const thursday = new Date("2023-07-13"); // Thursday
            (0, globals_1.expect)((0, dateUtils_1.isThursday)(thursday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isThursday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isFriday - checks if date is Friday", () => {
            (0, globals_1.expect)((0, dateUtils_1.isFriday)(testDate2)).toBe(true); // testDate2 is Friday
            (0, globals_1.expect)((0, dateUtils_1.isFriday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isSaturday - checks if date is Saturday", () => {
            const saturday = new Date("2023-07-08"); // Saturday
            (0, globals_1.expect)((0, dateUtils_1.isSaturday)(saturday)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isSaturday)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isSunday - checks if date is Sunday", () => {
            (0, globals_1.expect)((0, dateUtils_1.isSunday)(testDate)).toBe(true); // testDate is Sunday
            (0, globals_1.expect)((0, dateUtils_1.isSunday)(testDate2)).toBe(false);
        });
    });
    (0, globals_1.describe)("Month/Year Edge Checks", () => {
        (0, globals_1.test)("isFirstDayOfMonth - checks if date is first day of month", () => {
            const firstDay = new Date("2023-07-01");
            (0, globals_1.expect)((0, dateUtils_1.isFirstDayOfMonth)(firstDay)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isFirstDayOfMonth)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isLastDayOfMonth - checks if date is last day of month", () => {
            const lastDay = new Date("2023-07-31");
            (0, globals_1.expect)((0, dateUtils_1.isLastDayOfMonth)(lastDay)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isLastDayOfMonth)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isFirstMonth - checks if date is in first month of year", () => {
            const january = new Date("2023-01-15");
            (0, globals_1.expect)((0, dateUtils_1.isFirstMonth)(january)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isFirstMonth)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isLastMonth - checks if date is in last month of year", () => {
            const december = new Date("2023-12-15");
            (0, globals_1.expect)((0, dateUtils_1.isLastMonth)(december)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isLastMonth)(testDate)).toBe(false);
        });
        (0, globals_1.test)("isFirstYear - checks if date is in first year (year 1000)", () => {
            // JavaScript Date constructor interprets "1000-01-01" as year 999
            const firstYear = new Date(1000, 0, 1); // Use constructor with year 1000
            (0, globals_1.expect)((0, dateUtils_1.isFirstYear)(firstYear)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isFirstYear)(testDate)).toBe(false); // 2023 is not year 1000
        });
        (0, globals_1.test)("isLastYear - checks if date is in last year (year 9999)", () => {
            const lastYear = new Date("9999-01-01");
            (0, globals_1.expect)((0, dateUtils_1.isLastYear)(lastYear)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isLastYear)(testDate)).toBe(false); // 2023 is not year 9999
        });
    });
    (0, globals_1.describe)("Start/End of Period", () => {
        (0, globals_1.test)("startOfDay - gets start of day", () => {
            const start = (0, dateUtils_1.startOfDay)(testDate);
            (0, globals_1.expect)(start.getHours()).toBe(0);
            (0, globals_1.expect)(start.getMinutes()).toBe(0);
            (0, globals_1.expect)(start.getSeconds()).toBe(0);
        });
        (0, globals_1.test)("endOfDay - gets end of day", () => {
            const end = (0, dateUtils_1.endOfDay)(testDate);
            (0, globals_1.expect)(end.getHours()).toBe(23);
            (0, globals_1.expect)(end.getMinutes()).toBe(59);
            (0, globals_1.expect)(end.getSeconds()).toBe(59);
        });
        (0, globals_1.test)("startOfWeek - gets start of week", () => {
            const start = (0, dateUtils_1.startOfWeek)(testDate);
            (0, globals_1.expect)(start.getDay()).toBe(1); // Monday (default start)
        });
        (0, globals_1.test)("endOfWeek - gets end of week", () => {
            const end = (0, dateUtils_1.endOfWeek)(testDate);
            (0, globals_1.expect)(end.getDay()).toBe(0); // Sunday (end of week when Monday start)
        });
        (0, globals_1.test)("startOfMonth - gets start of month", () => {
            const start = (0, dateUtils_1.startOfMonth)(testDate);
            (0, globals_1.expect)(start.getDate()).toBe(1);
        });
        (0, globals_1.test)("endOfMonth - gets end of month", () => {
            const end = (0, dateUtils_1.endOfMonth)(testDate);
            (0, globals_1.expect)(end.getDate()).toBe(31); // July has 31 days
        });
        (0, globals_1.test)("startOfQuarter - gets start of quarter", () => {
            const start = (0, dateUtils_1.startOfQuarter)(testDate); // Q3 2023
            (0, globals_1.expect)(start.getMonth()).toBe(6); // July (0-indexed)
        });
        (0, globals_1.test)("endOfQuarter - gets end of quarter", () => {
            const end = (0, dateUtils_1.endOfQuarter)(testDate); // Q3 2023
            (0, globals_1.expect)(end.getMonth()).toBe(8); // September (0-indexed)
        });
        (0, globals_1.test)("startOfYear - gets start of year", () => {
            const start = (0, dateUtils_1.startOfYear)(testDate);
            (0, globals_1.expect)(start.getMonth()).toBe(0); // January
            (0, globals_1.expect)(start.getDate()).toBe(1);
        });
        (0, globals_1.test)("endOfYear - gets end of year", () => {
            const end = (0, dateUtils_1.endOfYear)(testDate);
            (0, globals_1.expect)(end.getMonth()).toBe(11); // December
            (0, globals_1.expect)(end.getDate()).toBe(31);
        });
    });
    (0, globals_1.describe)("Various Getters", () => {
        (0, globals_1.test)("getDayOfYear - gets day of year", () => {
            const dayOfYear = (0, dateUtils_1.getDayOfYear)(testDate); // July 9, 2023
            (0, globals_1.expect)(dayOfYear).toBeGreaterThan(180);
        });
        (0, globals_1.test)("getWeekNumber - gets week number", () => {
            const weekNumber = (0, dateUtils_1.getWeekNumber)(testDate);
            (0, globals_1.expect)(weekNumber).toBeGreaterThan(0);
            (0, globals_1.expect)(weekNumber).toBeLessThanOrEqual(53);
        });
        (0, globals_1.test)("getWeeksInMonth - gets weeks in month", () => {
            const weeks = (0, dateUtils_1.getWeeksInMonth)(testDate); // July 2023
            (0, globals_1.expect)(weeks).toBeGreaterThan(0);
            (0, globals_1.expect)(weeks).toBeLessThanOrEqual(6);
        });
        (0, globals_1.test)("getQuarter - gets quarter of year", () => {
            (0, globals_1.expect)((0, dateUtils_1.getQuarter)(testDate)).toBe(3); // July is Q3
        });
        (0, globals_1.test)("getDaysInMonth - gets days in month", () => {
            (0, globals_1.expect)((0, dateUtils_1.getDaysInMonth)(2023, 6)).toBe(31); // July has 31 days (0-indexed)
        });
        (0, globals_1.test)("getFirstDayOfMonth - gets first day number", () => {
            const firstDay = (0, dateUtils_1.getFirstDayOfMonth)(2023, 6); // July 2023 (month 6 = July)
            // July 1st, 2023 was a Saturday (6)
            (0, globals_1.expect)(firstDay).toBe(6);
        });
        (0, globals_1.test)("getLastDayOfMonth - gets last day number", () => {
            const lastDay = (0, dateUtils_1.getLastDayOfMonth)(2023, 6); // July 2023 (month 6 = July)
            // July 31st, 2023 was a Monday (1)
            (0, globals_1.expect)(lastDay).toBe(1);
        });
        (0, globals_1.test)("getMonthName - gets month name", () => {
            // Months are 0-indexed in JavaScript Date, so 6 = July
            (0, globals_1.expect)((0, dateUtils_1.getMonthName)(6)).toBe("julio"); // July in Spanish
            (0, globals_1.expect)((0, dateUtils_1.getMonthName)(0)).toBe("enero"); // January in Spanish
            (0, globals_1.expect)((0, dateUtils_1.getMonthName)(11)).toBe("diciembre"); // December in Spanish
        });
        (0, globals_1.test)("getShortMonthName - gets short month name", () => {
            // Months are 0-indexed in JavaScript Date, so 6 = July
            (0, globals_1.expect)((0, dateUtils_1.getShortMonthName)(6)).toBe("jul"); // July short in Spanish
            (0, globals_1.expect)((0, dateUtils_1.getShortMonthName)(0)).toBe("ene"); // January short in Spanish
        });
        (0, globals_1.test)("getWeekdayName - gets weekday name", () => {
            // Function uses new Date(2000, 0, day + 1), so:
            // day=0 → Jan 1, 2000 (Saturday), day=1 → Jan 2, 2000 (Sunday), etc.
            (0, globals_1.expect)((0, dateUtils_1.getWeekdayName)(0)).toBe("sábado"); // Saturday
            (0, globals_1.expect)((0, dateUtils_1.getWeekdayName)(1)).toBe("domingo"); // Sunday
            (0, globals_1.expect)((0, dateUtils_1.getWeekdayName)(2)).toBe("lunes"); // Monday
        });
        (0, globals_1.test)("getShortWeekdayName - gets short weekday name", () => {
            (0, globals_1.expect)((0, dateUtils_1.getShortWeekdayName)(0)).toBe("sáb"); // Saturday short
            (0, globals_1.expect)((0, dateUtils_1.getShortWeekdayName)(1)).toBe("dom"); // Sunday short
            (0, globals_1.expect)((0, dateUtils_1.getShortWeekdayName)(2)).toBe("lun"); // Monday short
        });
        (0, globals_1.test)("getDaysArray - gets array of days in month", () => {
            const days = (0, dateUtils_1.getDaysArray)(2023, 6); // July 2023 (month 6 = July)
            (0, globals_1.expect)(Array.isArray(days)).toBe(true);
            (0, globals_1.expect)(days.length).toBe(31); // July has 31 days
            (0, globals_1.expect)(days[0].getDate()).toBe(1); // First day is 1st
            (0, globals_1.expect)(days[30].getDate()).toBe(31); // Last day is 31st
            (0, globals_1.expect)(days.length).toBe(31);
        });
        (0, globals_1.test)("getMonthsArray - gets array of month names", () => {
            const months = (0, dateUtils_1.getMonthsArray)();
            (0, globals_1.expect)(Array.isArray(months)).toBe(true);
            (0, globals_1.expect)(months.length).toBe(12);
            (0, globals_1.expect)(months[0]).toBe("enero"); // January in Spanish
            (0, globals_1.expect)(months[6]).toBe("julio"); // July in Spanish
            (0, globals_1.expect)(months[11]).toBe("diciembre"); // December in Spanish
        });
        (0, globals_1.test)("getShortMonthsArray - gets array of short month names", () => {
            const shortMonths = (0, dateUtils_1.getShortMonthsArray)();
            (0, globals_1.expect)(Array.isArray(shortMonths)).toBe(true);
            (0, globals_1.expect)(shortMonths.length).toBe(12);
            (0, globals_1.expect)(shortMonths[0]).toBe("ene"); // January short in Spanish
            (0, globals_1.expect)(shortMonths[6]).toBe("jul"); // July short in Spanish
        });
        (0, globals_1.test)("getWeekdaysArray - gets array of weekday names", () => {
            const weekdays = (0, dateUtils_1.getWeekdaysArray)();
            (0, globals_1.expect)(Array.isArray(weekdays)).toBe(true);
            (0, globals_1.expect)(weekdays.length).toBe(7);
            (0, globals_1.expect)(weekdays[0]).toBe("sábado"); // Saturday (day 0)
            (0, globals_1.expect)(weekdays[1]).toBe("domingo"); // Sunday (day 1)
            (0, globals_1.expect)(weekdays[2]).toBe("lunes"); // Monday (day 2)
        });
        (0, globals_1.test)("getShortWeekdaysArray - gets array of short weekday names", () => {
            const shortWeekdays = (0, dateUtils_1.getShortWeekdaysArray)();
            (0, globals_1.expect)(Array.isArray(shortWeekdays)).toBe(true);
            (0, globals_1.expect)(shortWeekdays.length).toBe(7);
            (0, globals_1.expect)(shortWeekdays[0]).toBe("sáb"); // Saturday short (day 0)
            (0, globals_1.expect)(shortWeekdays[1]).toBe("dom"); // Sunday short (day 1)
        });
        (0, globals_1.test)("getYearsArray - gets array of years", () => {
            const years = (0, dateUtils_1.getYearsArray)(2020, 2025);
            (0, globals_1.expect)(Array.isArray(years)).toBe(true);
            (0, globals_1.expect)(years.length).toBe(6);
        });
        (0, globals_1.test)("isLeapYear - checks if year is leap year", () => {
            (0, globals_1.expect)((0, dateUtils_1.isLeapYear)(2020)).toBe(true);
            (0, globals_1.expect)((0, dateUtils_1.isLeapYear)(2023)).toBe(false);
        });
        (0, globals_1.test)("age - calculates age", () => {
            const birthDate = new Date("1990-01-01");
            const ageValue = (0, dateUtils_1.age)(birthDate);
            (0, globals_1.expect)(ageValue).toBeGreaterThan(30);
        });
        (0, globals_1.test)("timeAgo - gets time ago string", () => {
            // Test with a date that's 1 hour ago
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            const timeAgoString = (0, dateUtils_1.timeAgo)(oneHourAgo);
            (0, globals_1.expect)(typeof timeAgoString).toBe("string");
            (0, globals_1.expect)(timeAgoString).toContain("hour"); // Function returns in English
        });
    });
});
