"use strict";
/**
 * Number utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRange = exports.map = exports.lerp = exports.formatPercent = exports.formatCurrency = exports.formatNumber = exports.toDegrees = exports.toRadians = exports.variance = exports.standardDeviation = exports.range = exports.min = exports.max = exports.product = exports.sum = exports.mode = exports.median = exports.average = exports.percentageOf = exports.percentage = exports.lcm = exports.gcd = exports.fibonacci = exports.factorial = exports.isPrime = exports.isOdd = exports.isEven = exports.toFixed = exports.round = exports.randomInt = exports.random = exports.clamp = void 0;
const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
};
exports.clamp = clamp;
const random = (min, max) => {
    return Math.random() * (max - min) + min;
};
exports.random = random;
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.randomInt = randomInt;
const round = (num, decimals = 0) => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
};
exports.round = round;
const toFixed = (num, decimals) => {
    return num.toFixed(decimals);
};
exports.toFixed = toFixed;
const isEven = (num) => {
    return num % 2 === 0;
};
exports.isEven = isEven;
const isOdd = (num) => {
    return num % 2 !== 0;
};
exports.isOdd = isOdd;
const isPrime = (num) => {
    if (num < 2)
        return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
    }
    return true;
};
exports.isPrime = isPrime;
const factorial = (num) => {
    if (num < 0)
        return -1;
    if (num === 0)
        return 1;
    return num * (0, exports.factorial)(num - 1);
};
exports.factorial = factorial;
const fibonacci = (n) => {
    if (n <= 1)
        return n;
    return (0, exports.fibonacci)(n - 1) + (0, exports.fibonacci)(n - 2);
};
exports.fibonacci = fibonacci;
const gcd = (a, b) => {
    return b === 0 ? a : (0, exports.gcd)(b, a % b);
};
exports.gcd = gcd;
const lcm = (a, b) => {
    return Math.abs(a * b) / (0, exports.gcd)(a, b);
};
exports.lcm = lcm;
const percentage = (value, total) => {
    return (value / total) * 100;
};
exports.percentage = percentage;
const percentageOf = (percent, total) => {
    return (percent / 100) * total;
};
exports.percentageOf = percentageOf;
const average = (numbers) => {
    if (numbers.length === 0)
        return 0;
    return (0, exports.sum)(numbers) / numbers.length;
};
exports.average = average;
const median = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
exports.median = median;
const mode = (numbers) => {
    const frequency = {};
    let maxFreq = 0;
    numbers.forEach((num) => {
        frequency[num] = (frequency[num] || 0) + 1;
        maxFreq = Math.max(maxFreq, frequency[num]);
    });
    return Object.keys(frequency)
        .filter((key) => frequency[Number(key)] === maxFreq)
        .map(Number);
};
exports.mode = mode;
const sum = (numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};
exports.sum = sum;
const product = (numbers) => {
    return numbers.reduce((total, num) => total * num, 1);
};
exports.product = product;
const max = (numbers) => {
    return Math.max(...numbers);
};
exports.max = max;
const min = (numbers) => {
    return Math.min(...numbers);
};
exports.min = min;
const range = (numbers) => {
    return (0, exports.max)(numbers) - (0, exports.min)(numbers);
};
exports.range = range;
const standardDeviation = (numbers) => {
    const avg = (0, exports.average)(numbers);
    const squaredDiffs = numbers.map((num) => Math.pow(num - avg, 2));
    return Math.sqrt((0, exports.average)(squaredDiffs));
};
exports.standardDeviation = standardDeviation;
const variance = (numbers) => {
    const avg = (0, exports.average)(numbers);
    const squaredDiffs = numbers.map((num) => Math.pow(num - avg, 2));
    return (0, exports.average)(squaredDiffs);
};
exports.variance = variance;
const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
exports.toRadians = toRadians;
const toDegrees = (radians) => {
    return radians * (180 / Math.PI);
};
exports.toDegrees = toDegrees;
const formatNumber = (num, locale = "en-US") => {
    return new Intl.NumberFormat(locale).format(num);
};
exports.formatNumber = formatNumber;
const formatCurrency = (num, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(num);
};
exports.formatCurrency = formatCurrency;
const formatPercent = (num, locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "percent",
    }).format(num);
};
exports.formatPercent = formatPercent;
const lerp = (start, end, t) => {
    return start + (end - start) * t;
};
exports.lerp = lerp;
const map = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
exports.map = map;
const inRange = (num, min, max) => {
    return num >= min && num <= max;
};
exports.inRange = inRange;
