import { DateCountry, DateFormat } from "./dateUtils.types";

export const formatDate = (date: Date, format: DateFormat, countrieType: DateCountry = "es-ES"): string => {
  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case "YYYY-MM-DD":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "DD-MM-YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "MM-DD-YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "YYYY/MM/DD":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "DD/MM/YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "MM/DD/YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "YYYY.MM.DD":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "DD.MM.YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "MM.DD.YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;

    default:
      throw new Error("Formato no soportado");
  }
  return new Intl.DateTimeFormat(countrieType, options).format(date);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const differenceInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDay();
};

export const getMonthName = (month: number, countrieType: DateCountry = "es-ES"): string => {
  return new Intl.DateTimeFormat(countrieType, { month: "long" }).format(new Date(2000, month));
};

export const getShortMonthName = (month: number, countrieType: DateCountry = "es-ES"): string => {
  return new Intl.DateTimeFormat(countrieType, { month: "short" }).format(new Date(2000, month));
};

export const getWeekdayName = (day: number, countrieType: DateCountry = "es-ES"): string => {
  return new Intl.DateTimeFormat(countrieType, { weekday: "long" }).format(new Date(2000, 0, day + 1));
};

export const getShortWeekdayName = (day: number, countrieType: DateCountry = "es-ES"): string => {
  return new Intl.DateTimeFormat(countrieType, { weekday: "short" }).format(new Date(2000, 0, day + 1));
};

export const getDaysArray = (year: number, month: number): Date[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

export const getMonthsArray = (countrieType: DateCountry = "es-ES"): string[] => {
  return Array.from({ length: 12 }, (_, i) => getMonthName(i, countrieType));
};

export const getShortMonthsArray = (countrieType: DateCountry = "es-ES"): string[] => {
  return Array.from({ length: 12 }, (_, i) => getShortMonthName(i, countrieType));
};

export const getWeekdaysArray = (countrieType: DateCountry = "es-ES"): string[] => {
  return Array.from({ length: 7 }, (_, i) => getWeekdayName(i, countrieType));
};

export const getShortWeekdaysArray = (countrieType: DateCountry = "es-ES"): string[] => {
  return Array.from({ length: 7 }, (_, i) => getShortWeekdayName(i, countrieType));
};

export const getYearsArray = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

export const isSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isTomorrow = (date: Date): boolean => {
  return isSameDay(date, addDays(new Date(), 1));
};

export const isYesterday = (date: Date): boolean => {
  return isSameDay(date, subtractDays(new Date(), 1));
};

export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

export const isPast = (date: Date): boolean => {
  return date < new Date();
};

export const isBefore = (date1: Date, date2: Date): boolean => {
  return date1 < date2;
};

export const isAfter = (date1: Date, date2: Date): boolean => {
  return date1 > date2;
};

export const isBetween = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

export const isWeekendDay = (date: Date): boolean => {
  return date.getDay() === 0 || date.getDay() === 6;
};

export const isWeekendDate = (date: Date): boolean => {
  return isWeekendDay(date);
};

export const isWeekday = (date: Date): boolean => {
  return !isWeekendDay(date);
};

export const isWeekdayEnd = (date: Date): boolean => {
  return isWeekday(date);
};

export const isMonday = (date: Date): boolean => {
  return date.getDay() === 1;
};

export const isTuesday = (date: Date): boolean => {
  return date.getDay() === 2;
};

export const isWednesday = (date: Date): boolean => {
  return date.getDay() === 3;
};

export const isThursday = (date: Date): boolean => {
  return date.getDay() === 4;
};

export const isFriday = (date: Date): boolean => {
  return date.getDay() === 5;
};

export const isSaturday = (date: Date): boolean => {
  return date.getDay() === 6;
};

export const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};

export const isLastDayOfMonth = (date: Date): boolean => {
  return date.getDate() === getDaysInMonth(date.getFullYear(), date.getMonth());
};

export const isFirstDayOfMonth = (date: Date): boolean => {
  return date.getDate() === 1;
};

export const isLastMonth = (date: Date): boolean => {
  return date.getMonth() === 11;
};

export const isFirstMonth = (date: Date): boolean => {
  return date.getMonth() === 0;
};

export const isLastYear = (date: Date): boolean => {
  return date.getFullYear() === 9999;
};

export const isFirstYear = (date: Date): boolean => {
  return date.getFullYear() === 1000;
};
