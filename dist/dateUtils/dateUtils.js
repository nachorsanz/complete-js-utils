"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirstYear = exports.isLastYear = exports.isFirstMonth = exports.isLastMonth = exports.isFirstDayOfMonth = exports.isLastDayOfMonth = exports.isSunday = exports.isSaturday = exports.isFriday = exports.isThursday = exports.isWednesday = exports.isTuesday = exports.isMonday = exports.isWeekdayEnd = exports.isWeekday = exports.isWeekendDate = exports.isWeekendDay = exports.isBetween = exports.isAfter = exports.isBefore = exports.isPast = exports.isFuture = exports.isYesterday = exports.isTomorrow = exports.isToday = exports.isSameYear = exports.isSameMonth = exports.isValidDate = exports.getYearsArray = exports.getShortWeekdaysArray = exports.getWeekdaysArray = exports.getShortMonthsArray = exports.getMonthsArray = exports.getDaysArray = exports.getShortWeekdayName = exports.getWeekdayName = exports.getShortMonthName = exports.getMonthName = exports.getLastDayOfMonth = exports.getFirstDayOfMonth = exports.getDaysInMonth = exports.isSameDay = exports.isLeapYear = exports.isWeekend = exports.differenceInDays = exports.subtractDays = exports.addDays = exports.formatDate = void 0;
const formatDate = (date, format, countrieType = "es-ES") => {
    const options = {};
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
exports.formatDate = formatDate;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const subtractDays = (date, days) => {
    return (0, exports.addDays)(date, -days);
};
exports.subtractDays = subtractDays;
const differenceInDays = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
exports.differenceInDays = differenceInDays;
const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
};
exports.isWeekend = isWeekend;
const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
exports.isLeapYear = isLeapYear;
const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
};
exports.isSameDay = isSameDay;
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};
exports.getDaysInMonth = getDaysInMonth;
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};
exports.getFirstDayOfMonth = getFirstDayOfMonth;
const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDay();
};
exports.getLastDayOfMonth = getLastDayOfMonth;
const getMonthName = (month, countrieType = "es-ES") => {
    return new Intl.DateTimeFormat(countrieType, { month: "long" }).format(new Date(2000, month));
};
exports.getMonthName = getMonthName;
const getShortMonthName = (month, countrieType = "es-ES") => {
    return new Intl.DateTimeFormat(countrieType, { month: "short" }).format(new Date(2000, month));
};
exports.getShortMonthName = getShortMonthName;
const getWeekdayName = (day, countrieType = "es-ES") => {
    return new Intl.DateTimeFormat(countrieType, { weekday: "long" }).format(new Date(2000, 0, day + 1));
};
exports.getWeekdayName = getWeekdayName;
const getShortWeekdayName = (day, countrieType = "es-ES") => {
    return new Intl.DateTimeFormat(countrieType, { weekday: "short" }).format(new Date(2000, 0, day + 1));
};
exports.getShortWeekdayName = getShortWeekdayName;
const getDaysArray = (year, month) => {
    const daysInMonth = (0, exports.getDaysInMonth)(year, month);
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }
    return days;
};
exports.getDaysArray = getDaysArray;
const getMonthsArray = (countrieType = "es-ES") => {
    return Array.from({ length: 12 }, (_, i) => (0, exports.getMonthName)(i, countrieType));
};
exports.getMonthsArray = getMonthsArray;
const getShortMonthsArray = (countrieType = "es-ES") => {
    return Array.from({ length: 12 }, (_, i) => (0, exports.getShortMonthName)(i, countrieType));
};
exports.getShortMonthsArray = getShortMonthsArray;
const getWeekdaysArray = (countrieType = "es-ES") => {
    return Array.from({ length: 7 }, (_, i) => (0, exports.getWeekdayName)(i, countrieType));
};
exports.getWeekdaysArray = getWeekdaysArray;
const getShortWeekdaysArray = (countrieType = "es-ES") => {
    return Array.from({ length: 7 }, (_, i) => (0, exports.getShortWeekdayName)(i, countrieType));
};
exports.getShortWeekdaysArray = getShortWeekdaysArray;
const getYearsArray = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
exports.getYearsArray = getYearsArray;
const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidDate = isValidDate;
const isSameMonth = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};
exports.isSameMonth = isSameMonth;
const isSameYear = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear();
};
exports.isSameYear = isSameYear;
const isToday = (date) => {
    return (0, exports.isSameDay)(date, new Date());
};
exports.isToday = isToday;
const isTomorrow = (date) => {
    return (0, exports.isSameDay)(date, (0, exports.addDays)(new Date(), 1));
};
exports.isTomorrow = isTomorrow;
const isYesterday = (date) => {
    return (0, exports.isSameDay)(date, (0, exports.subtractDays)(new Date(), 1));
};
exports.isYesterday = isYesterday;
const isFuture = (date) => {
    return date > new Date();
};
exports.isFuture = isFuture;
const isPast = (date) => {
    return date < new Date();
};
exports.isPast = isPast;
const isBefore = (date1, date2) => {
    return date1 < date2;
};
exports.isBefore = isBefore;
const isAfter = (date1, date2) => {
    return date1 > date2;
};
exports.isAfter = isAfter;
const isBetween = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
};
exports.isBetween = isBetween;
const isWeekendDay = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
};
exports.isWeekendDay = isWeekendDay;
const isWeekendDate = (date) => {
    return (0, exports.isWeekendDay)(date);
};
exports.isWeekendDate = isWeekendDate;
const isWeekday = (date) => {
    return !(0, exports.isWeekendDay)(date);
};
exports.isWeekday = isWeekday;
const isWeekdayEnd = (date) => {
    return (0, exports.isWeekday)(date);
};
exports.isWeekdayEnd = isWeekdayEnd;
const isMonday = (date) => {
    return date.getDay() === 1;
};
exports.isMonday = isMonday;
const isTuesday = (date) => {
    return date.getDay() === 2;
};
exports.isTuesday = isTuesday;
const isWednesday = (date) => {
    return date.getDay() === 3;
};
exports.isWednesday = isWednesday;
const isThursday = (date) => {
    return date.getDay() === 4;
};
exports.isThursday = isThursday;
const isFriday = (date) => {
    return date.getDay() === 5;
};
exports.isFriday = isFriday;
const isSaturday = (date) => {
    return date.getDay() === 6;
};
exports.isSaturday = isSaturday;
const isSunday = (date) => {
    return date.getDay() === 0;
};
exports.isSunday = isSunday;
const isLastDayOfMonth = (date) => {
    return date.getDate() === (0, exports.getDaysInMonth)(date.getFullYear(), date.getMonth());
};
exports.isLastDayOfMonth = isLastDayOfMonth;
const isFirstDayOfMonth = (date) => {
    return date.getDate() === 1;
};
exports.isFirstDayOfMonth = isFirstDayOfMonth;
const isLastMonth = (date) => {
    return date.getMonth() === 11;
};
exports.isLastMonth = isLastMonth;
const isFirstMonth = (date) => {
    return date.getMonth() === 0;
};
exports.isFirstMonth = isFirstMonth;
const isLastYear = (date) => {
    return date.getFullYear() === 9999;
};
exports.isLastYear = isLastYear;
const isFirstYear = (date) => {
    return date.getFullYear() === 1000;
};
exports.isFirstYear = isFirstYear;
