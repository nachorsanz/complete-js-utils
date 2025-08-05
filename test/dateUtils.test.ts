import { expect, test, describe } from "@jest/globals";
import {
  // Basic date operations
  createDateFormatter,
  formatDate,
  parseDate,
  toISOString,
  toTimestamp,
  fromTimestamp,
  isValidDate,

  // Date arithmetic
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addYears,
  subtractDays,

  // Date differences
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,

  // Date comparisons
  isBefore,
  isAfter,
  isBetween,
  isSameDay,
  isSameMonth,
  isSameYear,
  isSameWeek,

  // Weekend/weekday checks
  isWeekend,
  isWeekendDay,
  isWeekendDate,
  isWeekday,
  isWeekdayEnd,

  // Date type checks
  isToday,
  isTomorrow,
  isYesterday,
  isFuture,
  isPast,

  // Specific day checks
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,

  // Start/end of period
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,

  // Month/year edge checks
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isFirstMonth,
  isLastMonth,
  isFirstYear,
  isLastYear,

  // Various getters
  getDayOfYear,
  getWeekNumber,
  getWeeksInMonth,
  getQuarter,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthName,
  getShortMonthName,
  getWeekdayName,
  getShortWeekdayName,
  getDaysArray,
  getMonthsArray,
  getShortMonthsArray,
  getWeekdaysArray,
  getShortWeekdaysArray,
  getYearsArray,
  isLeapYear,
  age,
  timeAgo,
} from "../src/dateUtils/dateUtils";

describe("Date Utils", () => {
  const testDate = new Date("2023-07-09"); // Sunday
  const testDate2 = new Date("2023-07-14"); // Friday

  describe("Basic Date Operations", () => {

    describe("createDateFormatter", () => {
      describe("UTC", () => {
        const date = new Date("2023-08-23T16:13:37.100Z");
        const formatDate_UTC = createDateFormatter({locale: "en-US", timezone: "UTC"})
        const formatDate_UTC_EN = createDateFormatter({locale: "en-US", timezone: "UTC"})
        const formatDate_UTC_ES = createDateFormatter({locale: "es-ES", timezone: "UTC"})

        describe("Dates", () => {
          it('should format date with "YYYY-MM-DD" pattern', () => {
            const result = formatDate_UTC(date, "YYYY-MM-DD");
            expect(result).toBe("2023-08-23");
          });
  
          it('should format date with "YY-MM-DD" pattern', () => {
            const result = formatDate_UTC(date, "YY-MM-DD");
            expect(result).toBe("23-08-23");
          });
  
          it('should format date with "DD-MM-YYYY" pattern', () => {
            const result = formatDate_UTC(date, "DD-MM-YYYY");
            expect(result).toBe("23-08-2023");
          });
  
          it('should format date with "MM-DD-YYYY" pattern', () => {
            const result = formatDate_UTC(date, "MM-DD-YYYY");
            expect(result).toBe("08-23-2023");
          });
  
          it('should format date with "YYYY/MM/DD" pattern', () => {
            const result = formatDate_UTC(date, "YYYY/MM/DD");
            expect(result).toBe("2023/08/23");
          });
  
          it('should format date with "DD/MM/YYYY" pattern', () => {
            const result = formatDate_UTC(date, "DD/MM/YYYY");
            expect(result).toBe("23/08/2023");
          });
  
          it('should format date with "MM/DD/YYYY" pattern', () => {
            const result = formatDate_UTC(date, "MM/DD/YYYY");
            expect(result).toBe("08/23/2023");
          });
  
          it('should format date with "YYYY.MM.DD" pattern', () => {
            const result = formatDate_UTC(date, "YYYY.MM.DD");
            expect(result).toBe("2023.08.23");
          });
  
          it('should format date with "DD.MM.YYYY" pattern', () => {
            const result = formatDate_UTC(date, "DD.MM.YYYY");
            expect(result).toBe("23.08.2023");
          });
  
          it('should format date with "MM.DD.YYYY" pattern', () => {
            const result = formatDate_UTC(date, "MM.DD.YYYY");
            expect(result).toBe("08.23.2023");
          });
  
          describe("UTC - Dates - locale: en-US", () => {
            it('should format date with "MMMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, "MMMM DD YYYY");
              expect(result).toBe("August 23 2023");
            });
  
            it('should format date with "MMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, "MMM DD YYYY");
              expect(result).toBe("Aug 23 2023");
            });
  
            it('should format date with "dddd DD MMMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, "dddd DD MMMM YYYY");
              expect(result).toBe("Wednesday 23 August 2023");
            });
  
            it('should format date with "ddd DD MMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, "ddd DD MMM YYYY");
              expect(result).toBe("Wed 23 Aug 2023");
            });
    
          
            it("should format date with literal text", () => {
              const result = formatDate_UTC_EN(date, "[Today is the] DD[th] [of] MMMM");
              expect(result).toBe("Today is the 23th of August");
            });

            it("formatDate - formats date with template literal in English", () => {
              expect(formatDate_UTC_EN(date, "[It is] dddd[,] MMMM DD[th]")).toBe("It is Wednesday, August 23th");
              expect(formatDate_UTC_EN(date, "[Today is the] DD[th] [of] MMMM")).toBe("Today is the 23th of August");
              expect(formatDate_UTC_EN(date, "[Date:] YYYY-MM-DD")).toBe("Date: 2023-08-23");
              expect(formatDate_UTC_EN(date, "YYYY-MM-DD [Date:]")).toBe("2023-08-23 Date:");
            });
          })
  
          describe("UTC - Dates- locale: es-ES", () => {
            it('should format date with "MMMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, "MMMM DD YYYY");
              expect(result).toBe("agosto 23 2023");
            });
  
            it('should format date with "MMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, "MMM DD YYYY");
              expect(result).toBe("ago 23 2023");
            });
  
            it('should format date with "dddd DD MMMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, "dddd DD MMMM YYYY");
              expect(result).toBe("miércoles 23 agosto 2023");
            });
  
            it('should format date with "ddd DD MMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, "ddd DD MMM YYYY");
              expect(result).toBe("mié 23 ago 2023");
            });

            it("should format date with literal text in Spanish", () => {
              const result = formatDate_UTC_ES(date, "[Hoy es] dddd[,] DD [de] MMMM");
              expect(result).toBe("Hoy es miércoles, 23 de agosto");
            });

            it("formatDate - formats date with template literal in Spanish", () => {
              expect(formatDate_UTC_ES(date, "[Es] dddd[,] MMMM DD[th]")).toBe("Es miércoles, agosto 23th");              
              expect(formatDate_UTC_ES(date, "[Hoy es el] DD[th] [de] MMMM")).toBe("Hoy es el 23th de agosto");
              expect(formatDate_UTC_ES(date, "[Fecha:] YYYY-MM-DD")).toBe("Fecha: 2023-08-23");
              expect(formatDate_UTC_ES(date, "YYYY-MM-DD [Fecha:]")).toBe("2023-08-23 Fecha:");
            });
          });
        })

        describe("Time", () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate_UTC(date, "X");
            expect(result).toBe("1692807217");
          });
  
          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate_UTC(date, "x");
            expect(result).toBe("1692807217100");
          });
  
          it('should format date with "ISO_8601"', () => {
            const result = formatDate_UTC(date, "ISO_8601");
            expect(result).toBe("2023-08-23T16:13:37.100Z");
          });
  
          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate_UTC(date, "HH:mm:ss");
            expect(result).toBe("16:13:37");
          });
  
          it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate_UTC(date, "hh:mm A");
            expect(result).toBe("04:13 PM");
          });
  
          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate_UTC(date, "hh:mm a");
            expect(result).toBe("04:13 pm");
          });
  
          it('should format date with milliseconds "sss"', () => {
            const result = formatDate_UTC(date, "sss");
            expect(result).toBe("100");
          });

          it("formatDate - formats time with template literal in English", () => {
            expect(formatDate_UTC_EN(date, "[Current time is] HH:mm:ss")).toBe("Current time is 16:13:37");
            expect(formatDate_UTC_EN(date, "[Time:] hh:mm A")).toBe("Time: 04:13 PM");
            expect(formatDate_UTC_EN(date, "HH:mm:ss [UTC]")).toBe("16:13:37 UTC");
            expect(formatDate_UTC_EN(date, "[Timestamp:] X")).toBe("Timestamp: 1692807217");
          });

          it("formatDate - formats time with template literal in Spanish", () => {
            expect(formatDate_UTC_ES(date, "[La hora actual es] HH:mm:ss")).toBe("La hora actual es 16:13:37");
            expect(formatDate_UTC_ES(date, "[Hora:] hh:mm A")).toBe("Hora: 04:13 PM");
            expect(formatDate_UTC_ES(date, "HH:mm:ss [UTC]")).toBe("16:13:37 UTC");
            expect(formatDate_UTC_ES(date, "[Marca de tiempo:] X")).toBe("Marca de tiempo: 1692807217");
          });

          describe("UTC - Time - timezone: Asia/Singapor", () => {
            it("should handle time zones correctly", () => {
              const result = createDateFormatter({
                timezone: "Asia/Singapore",
                locale: "en-US",
              })(date, "YYYY-MM-DD HH:mm:ss");
              expect(result).toBe("2023-08-24 00:13:37");
            });
          })
        })
      });

      describe("UTC+2 (CEST) active in Spain between the last Sunday of March and the last Sunday of October", () => {
        const date = new Date("2023-08-23T14:13:37.100Z"); // En UTC+2 es"2023-08-23T16:13:37.100+02:00
        const formatDate_UTC_2 = createDateFormatter({locale: "en-US", timezone: "Europe/Madrid"})
        const formatDate_UTC_2_EN = createDateFormatter({locale: "en-US", timezone: "Europe/Madrid"})
        const formatDate_UTC_2_ES = createDateFormatter({locale: "es-ES", timezone: "Europe/Madrid"})

        describe("Dates", () => {
          it('should format date with "YYYY-MM-DD" pattern', () => {
            const result = formatDate_UTC_2(date, "YYYY-MM-DD");
            expect(result).toBe("2023-08-23");
          });

          it('should format date with "YY-MM-DD" pattern', () => {
            const result = formatDate_UTC_2(date, "YY-MM-DD");
            expect(result).toBe("23-08-23");
          });

          it('should format date with "DD-MM-YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "DD-MM-YYYY");
            expect(result).toBe("23-08-2023");
          });

          it('should format date with "MM-DD-YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "MM-DD-YYYY");
            expect(result).toBe("08-23-2023");
          });

          it('should format date with "YYYY/MM/DD" pattern', () => {
            const result = formatDate_UTC_2(date, "YYYY/MM/DD");
            expect(result).toBe("2023/08/23");
          });

          it('should format date with "DD/MM/YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "DD/MM/YYYY");
            expect(result).toBe("23/08/2023");
          });

          it('should format date with "MM/DD/YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "MM/DD/YYYY");
            expect(result).toBe("08/23/2023");
          });

          it('should format date with "YYYY.MM.DD" pattern', () => {
            const result = formatDate_UTC_2(date, "YYYY.MM.DD");
            expect(result).toBe("2023.08.23");
          });

          it('should format date with "DD.MM.YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "DD.MM.YYYY");
            expect(result).toBe("23.08.2023");
          });

          it('should format date with "MM.DD.YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, "MM.DD.YYYY");
            expect(result).toBe("08.23.2023");
          });

          describe("UTC +2 - Dates - locale: en-US", () => {
            it('should format date with "MMMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, "MMMM DD YYYY");
              expect(result).toBe("August 23 2023");
            });

            it('should format date with "MMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, "MMM DD YYYY");
              expect(result).toBe("Aug 23 2023");
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, "dddd DD MMMM YYYY");
              expect(result).toBe("Wednesday 23 August 2023");
            });

            it('should format date with "ddd DD MMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, "ddd DD MMM YYYY");
              expect(result).toBe("Wed 23 Aug 2023");
            });

            it("formatDate - formats date with template literal in English", () => {
              expect(formatDate_UTC_2_EN(date, "[It is] dddd[,] MMMM DD[th]")).toBe("It is Wednesday, August 23th");              
              expect(formatDate_UTC_2_EN(date, "[Today is the] DD[th] [of] MMMM")).toBe("Today is the 23th of August");
              expect(formatDate_UTC_2_EN(date, "[Date:] YYYY-MM-DD")).toBe("Date: 2023-08-23");
              expect(formatDate_UTC_2_EN(date, "YYYY-MM-DD [Date:]")).toBe("2023-08-23 Date:");
            });
          });

          describe("UTC +2 - Dates - locale: es-ES", () => {
            it('should format date with "MMMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, "MMMM DD YYYY");
              expect(result).toBe("agosto 23 2023");
            });

            it('should format date with "MMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, "MMM DD YYYY");
              expect(result).toBe("ago 23 2023");
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, "dddd DD MMMM YYYY");
              expect(result).toBe("miércoles 23 agosto 2023");
            });

            it('should format date with "ddd DD MMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, "ddd DD MMM YYYY");
              expect(result).toBe("mié 23 ago 2023");
            });


            it("formatDate - formats date with template literal in Spanish", () => {
              expect(formatDate_UTC_2_ES(date, "[Es] dddd[,] MMMM DD[th]")).toBe("Es miércoles, agosto 23th");              
              expect(formatDate_UTC_2_ES(date, "[Hoy es el] DD[th] [de] MMMM")).toBe("Hoy es el 23th de agosto");
              expect(formatDate_UTC_2_ES(date, "[Fecha:] YYYY-MM-DD")).toBe("Fecha: 2023-08-23");
              expect(formatDate_UTC_2_ES(date, "YYYY-MM-DD [Fecha:]")).toBe("2023-08-23 Fecha:");
            });
          });


        });

        describe("Time", () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate_UTC_2(date, "X");
            expect(result).toBe("1692800017");
          });

          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate_UTC_2(date, "x");
            expect(result).toBe("1692800017100");
          });

          it('should format date with "ISO_8601"', () => {
            const result = formatDate_UTC_2(date, "ISO_8601");
            expect(result).toBe("2023-08-23T14:13:37.100Z");
          });

          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate_UTC_2(date, "HH:mm:ss");
            expect(result).toBe("16:13:37");
          });

           it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate_UTC_2_EN(date, "hh:mm A");
            expect(result).toBe("04:13 PM");
          });

          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate_UTC_2_EN(date, "hh:mm a");
            expect(result).toBe("04:13 pm");
          });

          it('should format date with milliseconds "sss"', () => {
            const result = formatDate_UTC_2(date, "sss");
            expect(result).toBe("100");
          });


          it("formatDate - formats time with template literal in English", () => {
            expect(formatDate_UTC_2_EN(date, "[Current time is] HH:mm:ss")).toBe("Current time is 16:13:37");
            expect(formatDate_UTC_2_EN(date, "[Time:] hh:mm A")).toBe("Time: 04:13 PM");
            expect(formatDate_UTC_2_EN(date, "HH:mm:ss [UTC+2]")).toBe("16:13:37 UTC+2");
            expect(formatDate_UTC_2_EN(date, "[Timestamp:] X")).toBe("Timestamp: 1692800017");
          });

          it("formatDate - formats time with template literal in Spanish", () => {
            expect(formatDate_UTC_2_ES(date, "[La hora actual es] HH:mm:ss")).toBe("La hora actual es 16:13:37");
            expect(formatDate_UTC_2_ES(date, "[Hora:] hh:mm A")).toBe("Hora: 04:13 PM");
            expect(formatDate_UTC_2_ES(date, "HH:mm:ss [UTC+2]")).toBe("16:13:37 UTC+2");
            expect(formatDate_UTC_2_ES(date, "[Marca de tiempo:] X")).toBe("Marca de tiempo: 1692800017");
          });

          it("should handle locale correctly", () => {
            const result = formatDate_UTC_2_ES(date, "dddd, MMMM DD YYYY");
            expect(result).toBe("miércoles, agosto 23 2023");
          });

          it("should handle time zones correctly", () => {
            const result = createDateFormatter({
              timezone: "Asia/Singapore",
              locale: "en-US",
            })(date, "YYYY-MM-DD HH:mm:ss");
            expect(result).toBe("2023-08-23 22:13:37");
          });

        });
      });

      describe("UTC+1 (CET) active in Spain between the last Sunday of October and the last Sunday of March", () => {
        const date = new Date("2023-12-15T15:13:37.100Z"); // En UTC+1 es"2023-08-23T16:13:37.100+01:00

        const formatDate = createDateFormatter({locale: "en-US", timezone: "Europe/Madrid"})

        describe("Time", () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate(date, "X");
            expect(result).toBe("1702653217");
          });

          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate(date, "x");
            expect(result).toBe("1702653217100");
          });

          it('should format date with "ISO_8601"', () => {
            const result = formatDate(date, "ISO_8601");
            expect(result).toBe("2023-12-15T15:13:37.100Z");
          });

          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate(date, "HH:mm:ss");
            expect(result).toBe("16:13:37");
          });

           it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate(date, "hh:mm A");
            expect(result).toBe("04:13 PM");
          });

          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate(date, "hh:mm a");
            expect(result).toBe("04:13 pm");
          });

          it('should format date with milliseconds "sss"', () => {
            const result = formatDate(date, "sss");
            expect(result).toBe("100");
          });
        });
      });
    })

    describe("formatDate", () => {
      it("formatDate - formats date with given pattern", () => {
        expect(formatDate(testDate, "YYYY-MM-DD")).toBe("2023-07-09");
        expect(formatDate(testDate, "DD-MM-YYYY")).toBe("09-07-2023");
        expect(formatDate(testDate, "MM-DD-YYYY")).toBe("07-09-2023");
  
        expect(formatDate(testDate, "YYYY/MM/DD")).toBe("2023/07/09");
        expect(formatDate(testDate, "DD/MM/YYYY")).toBe("09/07/2023");
        expect(formatDate(testDate, "MM/DD/YYYY")).toBe("07/09/2023");
  
        expect(formatDate(testDate, "YYYY.MM.DD")).toBe("2023.07.09");
        expect(formatDate(testDate, "DD.MM.YYYY")).toBe("09.07.2023");
        expect(formatDate(testDate, "MM.DD.YYYY")).toBe("07.09.2023");
      })
    })

    test("parseDate - parses date string", () => {
      const parsed = parseDate("2023-07-09");
      expect(parsed).toBeInstanceOf(Date);
      if (parsed) {
        expect(parsed.getFullYear()).toBe(2023);
      }
    });

    test("toISOString - converts to ISO string", () => {
      const iso = toISOString(testDate);
      expect(iso).toContain("2023-07-09");
    });

    test("toTimestamp - converts to timestamp", () => {
      const timestamp = toTimestamp(testDate);
      expect(typeof timestamp).toBe("number");
      expect(timestamp).toBe(testDate.getTime()); // Should return the same value as getTime()
    });

    test("fromTimestamp - creates date from timestamp", () => {
      const timestamp = testDate.getTime();
      const date = fromTimestamp(timestamp);
      expect(date).toEqual(testDate);
    });

    test("isValidDate - checks if date is valid", () => {
      expect(isValidDate(testDate)).toBe(true);
      expect(isValidDate(new Date("invalid"))).toBe(false);
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe("Date Arithmetic", () => {
    test("addDays - adds days to date", () => {
      const result = addDays(testDate, 5);
      expect(result.getDate()).toBe(14);
    });

    test("addHours - adds hours to date", () => {
      const result = addHours(testDate, 24);
      expect(result.getDate()).toBe(10);
    });

    test("addMinutes - adds minutes to date", () => {
      const result = addMinutes(testDate, 60);
      expect(result.getHours()).toBe(testDate.getHours() + 1);
    });

    test("addMonths - adds months to date", () => {
      const result = addMonths(testDate, 1);
      expect(result.getMonth()).toBe(7); // August (0-indexed)
    });

    test("addSeconds - adds seconds to date", () => {
      const result = addSeconds(testDate, 60);
      expect(result.getMinutes()).toBe(1);
    });

    test("addYears - adds years to date", () => {
      const result = addYears(testDate, 1);
      expect(result.getFullYear()).toBe(2024);
    });

    test("subtractDays - subtracts days from date", () => {
      const result = subtractDays(testDate, 5);
      expect(result.getDate()).toBe(4);
    });
  });

  describe("Date Differences", () => {
    test("differenceInDays - calculates difference in days", () => {
      const diff = differenceInDays(testDate2, testDate);
      expect(diff).toBe(5);
    });

    test("differenceInHours - calculates difference in hours", () => {
      const diff = differenceInHours(testDate2, testDate);
      expect(diff).toBe(120); // 5 days * 24 hours
    });

    test("differenceInMinutes - calculates difference in minutes", () => {
      const diff = differenceInMinutes(testDate2, testDate);
      expect(diff).toBe(7200); // 5 days * 24 hours * 60 minutes
    });

    test("differenceInMonths - calculates difference in months", () => {
      const date1 = new Date("2023-01-01");
      const date2 = new Date("2023-07-01");
      const diff = differenceInMonths(date1, date2); // Swapped order
      expect(diff).toBe(6);
    });

    test("differenceInSeconds - calculates difference in seconds", () => {
      const diff = differenceInSeconds(testDate2, testDate);
      expect(diff).toBe(432000); // 5 days * 24 hours * 60 minutes * 60 seconds
    });

    test("differenceInYears - calculates difference in years", () => {
      const date1 = new Date("2020-01-01");
      const date2 = new Date("2023-01-01");
      const diff = differenceInYears(date1, date2); // Swapped order
      expect(diff).toBe(3);
    });
  });

  describe("Date Comparisons", () => {
    test("isBefore - checks if date is before another", () => {
      expect(isBefore(testDate, testDate2)).toBe(true);
      expect(isBefore(testDate2, testDate)).toBe(false);
    });

    test("isAfter - checks if date is after another", () => {
      expect(isAfter(testDate2, testDate)).toBe(true);
      expect(isAfter(testDate, testDate2)).toBe(false);
    });

    test("isBetween - checks if date is between two dates", () => {
      const middleDate = new Date("2023-07-11");
      expect(isBetween(middleDate, testDate, testDate2)).toBe(true);
      expect(isBetween(testDate, middleDate, testDate2)).toBe(false);
    });

    test("isSameDay - checks if dates are on same day", () => {
      const sameDay = new Date("2023-07-09T15:00:00");
      expect(isSameDay(testDate, sameDay)).toBe(true);
      expect(isSameDay(testDate, testDate2)).toBe(false);
    });

    test("isSameMonth - checks if dates are in same month", () => {
      const sameMonth = new Date("2023-07-15");
      expect(isSameMonth(testDate, sameMonth)).toBe(true);
      const differentMonth = new Date("2023-08-09");
      expect(isSameMonth(testDate, differentMonth)).toBe(false);
    });

    test("isSameYear - checks if dates are in same year", () => {
      expect(isSameYear(testDate, testDate2)).toBe(true);
      const differentYear = new Date("2024-07-09");
      expect(isSameYear(testDate, differentYear)).toBe(false);
    });

    test("isSameWeek - checks if dates are in same week", () => {
      // testDate is Sunday July 9, 2023. In this implementation, week starts on Monday,
      // so Sunday belongs to the previous week
      const sameWeek = new Date("2023-07-05"); // Wednesday of same week (week starts Mon July 3)
      expect(isSameWeek(testDate, sameWeek)).toBe(true); // Should be in same week

      const differentWeek = new Date("2023-07-10"); // Monday starts new week
      expect(isSameWeek(testDate, differentWeek)).toBe(false); // Should be different week
    });
  });

  describe("Weekend/Weekday Checks", () => {
    test("isWeekend - checks if date is weekend", () => {
      expect(isWeekend(testDate)).toBe(true); // Sunday
      expect(isWeekend(testDate2)).toBe(false); // Friday
    });

    test("isWeekendDay - alias for isWeekend", () => {
      expect(isWeekendDay(testDate)).toBe(true); // Sunday
    });

    test("isWeekendDate - alias for isWeekend", () => {
      expect(isWeekendDate(testDate)).toBe(true); // Sunday
    });

    test("isWeekday - checks if date is weekday", () => {
      expect(isWeekday(testDate)).toBe(false); // Sunday
      expect(isWeekday(testDate2)).toBe(true); // Friday
    });

    test("isWeekdayEnd - checks if date is weekday end", () => {
      expect(isWeekdayEnd(testDate)).toBe(false); // Sunday is not a weekday end
      expect(isWeekdayEnd(testDate2)).toBe(true); // Friday is weekday end
    });
  });

  describe("Date Type Checks", () => {
    test("isToday - checks if date is today", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
      expect(isToday(testDate)).toBe(false);
    });

    test("isTomorrow - checks if date is tomorrow", () => {
      const tomorrow = addDays(new Date(), 1);
      expect(isTomorrow(tomorrow)).toBe(true);
      expect(isTomorrow(testDate)).toBe(false);
    });

    test("isYesterday - checks if date is yesterday", () => {
      const yesterday = subtractDays(new Date(), 1);
      expect(isYesterday(yesterday)).toBe(true);
      expect(isYesterday(testDate)).toBe(false);
    });

    test("isFuture - checks if date is in future", () => {
      const future = addDays(new Date(), 1);
      expect(isFuture(future)).toBe(true);
      expect(isFuture(testDate)).toBe(false);
    });

    test("isPast - checks if date is in past", () => {
      expect(isPast(testDate)).toBe(true);
      const future = addDays(new Date(), 1);
      expect(isPast(future)).toBe(false);
    });
  });

  describe("Specific Day Checks", () => {
    test("isMonday - checks if date is Monday", () => {
      const monday = new Date("2023-07-10"); // Monday
      expect(isMonday(monday)).toBe(true);
      expect(isMonday(testDate)).toBe(false);
    });

    test("isTuesday - checks if date is Tuesday", () => {
      const tuesday = new Date("2023-07-11"); // Tuesday
      expect(isTuesday(tuesday)).toBe(true);
      expect(isTuesday(testDate)).toBe(false);
    });

    test("isWednesday - checks if date is Wednesday", () => {
      const wednesday = new Date("2023-07-12"); // Wednesday
      expect(isWednesday(wednesday)).toBe(true);
      expect(isWednesday(testDate)).toBe(false);
    });

    test("isThursday - checks if date is Thursday", () => {
      const thursday = new Date("2023-07-13"); // Thursday
      expect(isThursday(thursday)).toBe(true);
      expect(isThursday(testDate)).toBe(false);
    });

    test("isFriday - checks if date is Friday", () => {
      expect(isFriday(testDate2)).toBe(true); // testDate2 is Friday
      expect(isFriday(testDate)).toBe(false);
    });

    test("isSaturday - checks if date is Saturday", () => {
      const saturday = new Date("2023-07-08"); // Saturday
      expect(isSaturday(saturday)).toBe(true);
      expect(isSaturday(testDate)).toBe(false);
    });

    test("isSunday - checks if date is Sunday", () => {
      expect(isSunday(testDate)).toBe(true); // testDate is Sunday
      expect(isSunday(testDate2)).toBe(false);
    });
  });

  describe("Month/Year Edge Checks", () => {
    test("isFirstDayOfMonth - checks if date is first day of month", () => {
      const firstDay = new Date("2023-07-01");
      expect(isFirstDayOfMonth(firstDay)).toBe(true);
      expect(isFirstDayOfMonth(testDate)).toBe(false);
    });

    test("isLastDayOfMonth - checks if date is last day of month", () => {
      const lastDay = new Date("2023-07-31");
      expect(isLastDayOfMonth(lastDay)).toBe(true);
      expect(isLastDayOfMonth(testDate)).toBe(false);
    });

    test("isFirstMonth - checks if date is in first month of year", () => {
      const january = new Date("2023-01-15");
      expect(isFirstMonth(january)).toBe(true);
      expect(isFirstMonth(testDate)).toBe(false);
    });

    test("isLastMonth - checks if date is in last month of year", () => {
      const december = new Date("2023-12-15");
      expect(isLastMonth(december)).toBe(true);
      expect(isLastMonth(testDate)).toBe(false);
    });

    test("isFirstYear - checks if date is in first year (year 1000)", () => {
      // JavaScript Date constructor interprets "1000-01-01" as year 999
      const firstYear = new Date(1000, 0, 1); // Use constructor with year 1000
      expect(isFirstYear(firstYear)).toBe(true);
      expect(isFirstYear(testDate)).toBe(false); // 2023 is not year 1000
    });

    test("isLastYear - checks if date is in last year (year 9999)", () => {
      const lastYear = new Date("9999-01-01");
      expect(isLastYear(lastYear)).toBe(true);
      expect(isLastYear(testDate)).toBe(false); // 2023 is not year 9999
    });
  });

  describe("Start/End of Period", () => {
    test("startOfDay - gets start of day", () => {
      const start = startOfDay(testDate);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
      expect(start.getSeconds()).toBe(0);
    });

    test("endOfDay - gets end of day", () => {
      const end = endOfDay(testDate);
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
      expect(end.getSeconds()).toBe(59);
    });

    test("startOfWeek - gets start of week", () => {
      const start = startOfWeek(testDate);
      expect(start.getDay()).toBe(1); // Monday (default start)
    });

    test("endOfWeek - gets end of week", () => {
      const end = endOfWeek(testDate);
      expect(end.getDay()).toBe(0); // Sunday (end of week when Monday start)
    });

    test("startOfMonth - gets start of month", () => {
      const start = startOfMonth(testDate);
      expect(start.getDate()).toBe(1);
    });

    test("endOfMonth - gets end of month", () => {
      const end = endOfMonth(testDate);
      expect(end.getDate()).toBe(31); // July has 31 days
    });

    test("startOfQuarter - gets start of quarter", () => {
      const start = startOfQuarter(testDate); // Q3 2023
      expect(start.getMonth()).toBe(6); // July (0-indexed)
    });

    test("endOfQuarter - gets end of quarter", () => {
      const end = endOfQuarter(testDate); // Q3 2023
      expect(end.getMonth()).toBe(8); // September (0-indexed)
    });

    test("startOfYear - gets start of year", () => {
      const start = startOfYear(testDate);
      expect(start.getMonth()).toBe(0); // January
      expect(start.getDate()).toBe(1);
    });

    test("endOfYear - gets end of year", () => {
      const end = endOfYear(testDate);
      expect(end.getMonth()).toBe(11); // December
      expect(end.getDate()).toBe(31);
    });
  });

  describe("Various Getters", () => {
    test("getDayOfYear - gets day of year", () => {
      const dayOfYear = getDayOfYear(testDate); // July 9, 2023
      expect(dayOfYear).toBeGreaterThan(180);
    });

    test("getWeekNumber - gets week number", () => {
      const weekNumber = getWeekNumber(testDate);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });

    test("getWeeksInMonth - gets weeks in month", () => {
      const weeks = getWeeksInMonth(testDate); // July 2023
      expect(weeks).toBeGreaterThan(0);
      expect(weeks).toBeLessThanOrEqual(6);
    });

    test("getQuarter - gets quarter of year", () => {
      expect(getQuarter(testDate)).toBe(3); // July is Q3
    });

    test("getDaysInMonth - gets days in month", () => {
      expect(getDaysInMonth(2023, 6)).toBe(31); // July has 31 days (0-indexed)
    });

    test("getFirstDayOfMonth - gets first day number", () => {
      const firstDay = getFirstDayOfMonth(2023, 6); // July 2023 (month 6 = July)
      // July 1st, 2023 was a Saturday (6)
      expect(firstDay).toBe(6);
    });

    test("getLastDayOfMonth - gets last day number", () => {
      const lastDay = getLastDayOfMonth(2023, 6); // July 2023 (month 6 = July)
      // July 31st, 2023 was a Monday (1)
      expect(lastDay).toBe(1);
    });

    test("getMonthName - gets month name", () => {
      // Now using intuitive 1-indexed months (1=January, 7=July)
      expect(getMonthName(7)).toBe("julio"); // July in Spanish
      expect(getMonthName(1)).toBe("enero"); // January in Spanish
      expect(getMonthName(12)).toBe("diciembre"); // December in Spanish
    });

    test("getShortMonthName - gets short month name", () => {
      // Now using intuitive 1-indexed months (1=January, 7=July)
      expect(getShortMonthName(7)).toBe("jul"); // July short in Spanish
      expect(getShortMonthName(1)).toBe("ene"); // January short in Spanish
    });

    test("getWeekdayName - gets weekday name", () => {
      // Now using intuitive weekdays: 1=Monday, 2=Tuesday, ..., 7=Sunday
      expect(getWeekdayName(6)).toBe("sábado"); // Saturday
      expect(getWeekdayName(7)).toBe("domingo"); // Sunday
      expect(getWeekdayName(1)).toBe("lunes"); // Monday
    });

    test("getShortWeekdayName - gets short weekday name", () => {
      expect(getShortWeekdayName(6)).toBe("sáb"); // Saturday short
      expect(getShortWeekdayName(7)).toBe("dom"); // Sunday short
      expect(getShortWeekdayName(1)).toBe("lun"); // Monday short
    });

    test("getDaysArray - gets array of days in month", () => {
      const days = getDaysArray(2023, 6); // July 2023 (month 6 = July)
      expect(Array.isArray(days)).toBe(true);
      expect(days.length).toBe(31); // July has 31 days
      expect(days[0].getDate()).toBe(1); // First day is 1st
      expect(days[30].getDate()).toBe(31); // Last day is 31st
      expect(days.length).toBe(31);
    });

    test("getMonthsArray - gets array of month names", () => {
      const months = getMonthsArray();
      expect(Array.isArray(months)).toBe(true);
      expect(months.length).toBe(12);
      expect(months[0]).toBe("enero"); // January in Spanish
      expect(months[6]).toBe("julio"); // July in Spanish
      expect(months[11]).toBe("diciembre"); // December in Spanish
    });

    test("getShortMonthsArray - gets array of short month names", () => {
      const shortMonths = getShortMonthsArray();
      expect(Array.isArray(shortMonths)).toBe(true);
      expect(shortMonths.length).toBe(12);
      expect(shortMonths[0]).toBe("ene"); // January short in Spanish
      expect(shortMonths[6]).toBe("jul"); // July short in Spanish
    });

    test("getWeekdaysArray - gets array of weekday names", () => {
      const weekdays = getWeekdaysArray();
      expect(Array.isArray(weekdays)).toBe(true);
      expect(weekdays.length).toBe(7);
      expect(weekdays[0]).toBe("lunes"); // Monday (day 1)
      expect(weekdays[1]).toBe("martes"); // Tuesday (day 2)
      expect(weekdays[2]).toBe("miércoles"); // Wednesday (day 3)
    });

    test("getShortWeekdaysArray - gets array of short weekday names", () => {
      const shortWeekdays = getShortWeekdaysArray();
      expect(Array.isArray(shortWeekdays)).toBe(true);
      expect(shortWeekdays.length).toBe(7);
      expect(shortWeekdays[0]).toBe("lun"); // Monday short (day 1)
      expect(shortWeekdays[1]).toBe("mar"); // Tuesday short (day 2)
    });

    test("getYearsArray - gets array of years", () => {
      const years = getYearsArray(2020, 2025);
      expect(Array.isArray(years)).toBe(true);
      expect(years.length).toBe(6);
    });

    test("isLeapYear - checks if year is leap year", () => {
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2023)).toBe(false);
    });

    test("age - calculates age", () => {
      const birthDate = new Date("1990-01-01");
      const ageValue = age(birthDate);
      expect(ageValue).toBeGreaterThan(30);

      // Test edge case: birthday not yet reached this year (should decrement age)
      const today = new Date();
      const futureMonth = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
      const birthDateFuture = new Date(today.getFullYear() - 25, futureMonth.getMonth(), futureMonth.getDate());
      expect(age(birthDateFuture)).toBe(24); // Age should be decremented

      // Test edge case: same month but birthday not yet reached (should decrement age)
      const sameMontFuture = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate() + 5);
      const ageNotReached = age(sameMontFuture);
      expect(ageNotReached).toBe(29); // Should be decremented
    });

    test("timeAgo - gets time ago string", () => {
      // Test seconds ago
      const fewSecondsAgo = new Date(Date.now() - 30 * 1000);
      const secondsAgoString = timeAgo(fewSecondsAgo);
      expect(typeof secondsAgoString).toBe("string");
      expect(secondsAgoString).toContain("second");

      // Test minutes ago
      const fewMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const minutesAgoString = timeAgo(fewMinutesAgo);
      expect(minutesAgoString).toContain("minute");

      // Test hours ago
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const timeAgoString = timeAgo(oneHourAgo);
      expect(timeAgoString).toContain("hour");

      // Test days ago
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const daysAgoString = timeAgo(twoDaysAgo);
      expect(daysAgoString).toContain("day");

      // Test weeks ago
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const weeksAgoString = timeAgo(twoWeeksAgo);
      expect(weeksAgoString).toContain("week");

      // Test months ago
      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const monthsAgoString = timeAgo(threeMonthsAgo);
      expect(monthsAgoString).toContain("month");

      // Test years ago
      const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
      const yearsAgoString = timeAgo(twoYearsAgo);
      expect(yearsAgoString).toContain("year");
    });
  });
});
