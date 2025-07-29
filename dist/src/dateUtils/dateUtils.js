"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayOfYear = exports.getWeekNumber = exports.toTimestamp = exports.fromTimestamp = exports.toISOString = exports.isValidDate = exports.parseDate = exports.timeAgo = exports.age = exports.differenceInYears = exports.differenceInMonths = exports.differenceInSeconds = exports.differenceInMinutes = exports.differenceInHours = exports.endOfQuarter = exports.startOfQuarter = exports.getQuarter = exports.endOfYear = exports.startOfYear = exports.endOfMonth = exports.startOfMonth = exports.endOfWeek = exports.startOfWeek = exports.endOfDay = exports.startOfDay = exports.addYears = exports.addMonths = exports.addSeconds = exports.addMinutes = exports.addHours = exports.getYearsArray = exports.getShortWeekdaysArray = exports.getWeekdaysArray = exports.getShortMonthsArray = exports.getMonthsArray = exports.getDaysArray = exports.getShortWeekdayName = exports.getWeekdayName = exports.getShortMonthName = exports.getMonthName = exports.getLastDayOfMonth = exports.getFirstDayOfMonth = exports.getDaysInMonth = exports.isSameDay = exports.isLeapYear = exports.isWeekend = exports.differenceInDays = exports.subtractDays = exports.addDays = exports.formatDate = void 0;
exports.isFirstYear = exports.isLastYear = exports.isFirstMonth = exports.isLastMonth = exports.isFirstDayOfMonth = exports.isLastDayOfMonth = exports.isSunday = exports.isSaturday = exports.isFriday = exports.isThursday = exports.isWednesday = exports.isTuesday = exports.isMonday = exports.isWeekdayEnd = exports.isWeekday = exports.isWeekendDate = exports.isWeekendDay = exports.isBetween = exports.isAfter = exports.isBefore = exports.isPast = exports.isFuture = exports.isYesterday = exports.isTomorrow = exports.isToday = exports.isSameYear = exports.isSameMonth = exports.isSameWeek = exports.getWeeksInMonth = void 0;
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
    // Convert 1-based month (1=January, 7=July) to 0-based for JavaScript Date
    return new Intl.DateTimeFormat(countrieType, { month: "long" }).format(new Date(2000, month - 1));
};
exports.getMonthName = getMonthName;
const getShortMonthName = (month, countrieType = "es-ES") => {
    // Convert 1-based month (1=January, 7=July) to 0-based for JavaScript Date
    return new Intl.DateTimeFormat(countrieType, { month: "short" }).format(new Date(2000, month - 1));
};
exports.getShortMonthName = getShortMonthName;
const getWeekdayName = (day, countrieType = "es-ES") => {
    // Convert 1-based weekday (1=Monday, 7=Sunday) to JavaScript day
    // Use a known Monday as reference: January 4, 2021 was a Monday
    const mondayReference = new Date(2021, 0, 4); // Known Monday
    const daysToAdd = (day === 7 ? 0 : day) - 1; // Sunday=0, Monday=1, etc.
    const targetDate = new Date(mondayReference);
    targetDate.setDate(mondayReference.getDate() + daysToAdd);
    return new Intl.DateTimeFormat(countrieType, { weekday: "long" }).format(targetDate);
};
exports.getWeekdayName = getWeekdayName;
const getShortWeekdayName = (day, countrieType = "es-ES") => {
    // Convert 1-based weekday (1=Monday, 7=Sunday) to JavaScript day
    const mondayReference = new Date(2021, 0, 4); // Known Monday
    const daysToAdd = (day === 7 ? 0 : day) - 1; // Sunday=0, Monday=1, etc.
    const targetDate = new Date(mondayReference);
    targetDate.setDate(mondayReference.getDate() + daysToAdd);
    return new Intl.DateTimeFormat(countrieType, { weekday: "short" }).format(targetDate);
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
    return Array.from({ length: 12 }, (_, i) => (0, exports.getMonthName)(i + 1, countrieType)); // 1-based months
};
exports.getMonthsArray = getMonthsArray;
const getShortMonthsArray = (countrieType = "es-ES") => {
    return Array.from({ length: 12 }, (_, i) => (0, exports.getShortMonthName)(i + 1, countrieType)); // 1-based months
};
exports.getShortMonthsArray = getShortMonthsArray;
const getWeekdaysArray = (countrieType = "es-ES") => {
    return Array.from({ length: 7 }, (_, i) => (0, exports.getWeekdayName)(i + 1, countrieType)); // 1-based days
};
exports.getWeekdaysArray = getWeekdaysArray;
const getShortWeekdaysArray = (countrieType = "es-ES") => {
    return Array.from({ length: 7 }, (_, i) => (0, exports.getShortWeekdayName)(i + 1, countrieType)); // 1-based days
};
exports.getShortWeekdaysArray = getShortWeekdaysArray;
const getYearsArray = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
exports.getYearsArray = getYearsArray;
const addHours = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
};
exports.addHours = addHours;
const addMinutes = (date, minutes) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
};
exports.addMinutes = addMinutes;
const addSeconds = (date, seconds) => {
    const result = new Date(date);
    result.setSeconds(result.getSeconds() + seconds);
    return result;
};
exports.addSeconds = addSeconds;
const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};
exports.addMonths = addMonths;
const addYears = (date, years) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};
exports.addYears = addYears;
const startOfDay = (date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};
exports.startOfDay = startOfDay;
const endOfDay = (date) => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};
exports.endOfDay = endOfDay;
const startOfWeek = (date, startOfWeekDay = 1) => {
    const result = new Date(date);
    const day = result.getDay();
    const diff = (day < startOfWeekDay ? 7 : 0) + day - startOfWeekDay;
    result.setDate(result.getDate() - diff);
    return (0, exports.startOfDay)(result);
};
exports.startOfWeek = startOfWeek;
const endOfWeek = (date, startOfWeekDay = 1) => {
    const result = (0, exports.startOfWeek)(date, startOfWeekDay);
    result.setDate(result.getDate() + 6);
    return (0, exports.endOfDay)(result);
};
exports.endOfWeek = endOfWeek;
const startOfMonth = (date) => {
    const result = new Date(date);
    result.setDate(1);
    return (0, exports.startOfDay)(result);
};
exports.startOfMonth = startOfMonth;
const endOfMonth = (date) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    return (0, exports.endOfDay)(result);
};
exports.endOfMonth = endOfMonth;
const startOfYear = (date) => {
    const result = new Date(date);
    result.setMonth(0, 1);
    return (0, exports.startOfDay)(result);
};
exports.startOfYear = startOfYear;
const endOfYear = (date) => {
    const result = new Date(date);
    result.setMonth(11, 31);
    return (0, exports.endOfDay)(result);
};
exports.endOfYear = endOfYear;
const getQuarter = (date) => {
    return Math.floor(date.getMonth() / 3) + 1;
};
exports.getQuarter = getQuarter;
const startOfQuarter = (date) => {
    const quarter = (0, exports.getQuarter)(date);
    const month = (quarter - 1) * 3;
    const result = new Date(date);
    result.setMonth(month, 1);
    return (0, exports.startOfDay)(result);
};
exports.startOfQuarter = startOfQuarter;
const endOfQuarter = (date) => {
    const quarter = (0, exports.getQuarter)(date);
    const month = quarter * 3 - 1;
    const result = new Date(date);
    result.setMonth(month + 1, 0);
    return (0, exports.endOfDay)(result);
};
exports.endOfQuarter = endOfQuarter;
const differenceInHours = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60));
};
exports.differenceInHours = differenceInHours;
const differenceInMinutes = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60));
};
exports.differenceInMinutes = differenceInMinutes;
const differenceInSeconds = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / 1000);
};
exports.differenceInSeconds = differenceInSeconds;
const differenceInMonths = (date1, date2) => {
    const years = date2.getFullYear() - date1.getFullYear();
    const months = date2.getMonth() - date1.getMonth();
    return years * 12 + months;
};
exports.differenceInMonths = differenceInMonths;
const differenceInYears = (date1, date2) => {
    return date2.getFullYear() - date1.getFullYear();
};
exports.differenceInYears = differenceInYears;
const age = (birthDate, referenceDate = new Date()) => {
    let age = referenceDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
exports.age = age;
const timeAgo = (date, locale = "en-US") => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (diffYears > 0)
        return rtf.format(-diffYears, "year");
    if (diffMonths > 0)
        return rtf.format(-diffMonths, "month");
    if (diffWeeks > 0)
        return rtf.format(-diffWeeks, "week");
    if (diffDays > 0)
        return rtf.format(-diffDays, "day");
    if (diffHours > 0)
        return rtf.format(-diffHours, "hour");
    if (diffMins > 0)
        return rtf.format(-diffMins, "minute");
    return rtf.format(-diffSecs, "second");
};
exports.timeAgo = timeAgo;
const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};
exports.parseDate = parseDate;
const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidDate = isValidDate;
const toISOString = (date) => {
    return date.toISOString();
};
exports.toISOString = toISOString;
const fromTimestamp = (timestamp) => {
    return new Date(timestamp);
};
exports.fromTimestamp = fromTimestamp;
const toTimestamp = (date) => {
    return date.getTime();
};
exports.toTimestamp = toTimestamp;
const getWeekNumber = (date) => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};
exports.getWeekNumber = getWeekNumber;
const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};
exports.getDayOfYear = getDayOfYear;
const getWeeksInMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const firstWeek = (0, exports.getWeekNumber)(firstDay);
    const lastWeek = (0, exports.getWeekNumber)(lastDay);
    return lastWeek - firstWeek + 1;
};
exports.getWeeksInMonth = getWeeksInMonth;
const isSameWeek = (date1, date2) => {
    const start1 = (0, exports.startOfWeek)(date1);
    const start2 = (0, exports.startOfWeek)(date2);
    return start1.getTime() === start2.getTime();
};
exports.isSameWeek = isSameWeek;
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
