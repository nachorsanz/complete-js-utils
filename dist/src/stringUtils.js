"use strict";
/**
 * String utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightText = exports.stripHtml = exports.unescapeHtml = exports.escapeHtml = exports.randomString = exports.maskString = exports.isUrl = exports.isEmail = exports.countCharacters = exports.countWords = exports.extractNumbers = exports.slugify = exports.removeAccents = exports.padEnd = exports.padStart = exports.truncate = exports.reverse = exports.titleCase = exports.pascalCase = exports.snakeCase = exports.kebabCase = exports.camelCase = exports.capitalize = void 0;
const capitalize = (str) => {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalize = capitalize;
const camelCase = (str) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};
exports.camelCase = camelCase;
const kebabCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};
exports.kebabCase = kebabCase;
const snakeCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
};
exports.snakeCase = snakeCase;
const pascalCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
        .replace(/^./, (chr) => chr.toUpperCase());
};
exports.pascalCase = pascalCase;
const titleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
};
exports.titleCase = titleCase;
const reverse = (str) => {
    return str.split("").reverse().join("");
};
exports.reverse = reverse;
const truncate = (str, length, suffix = "...") => {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + suffix;
};
exports.truncate = truncate;
const padStart = (str, targetLength, padString = " ") => {
    return str.padStart(targetLength, padString);
};
exports.padStart = padStart;
const padEnd = (str, targetLength, padString = " ") => {
    return str.padEnd(targetLength, padString);
};
exports.padEnd = padEnd;
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
exports.removeAccents = removeAccents;
const slugify = (str) => {
    return (0, exports.removeAccents)(str)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
};
exports.slugify = slugify;
const extractNumbers = (str) => {
    const matches = str.match(/\d+/g);
    return matches ? matches.map(Number) : [];
};
exports.extractNumbers = extractNumbers;
const countWords = (str) => {
    return str
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
};
exports.countWords = countWords;
const countCharacters = (str, includeSpaces = true) => {
    return includeSpaces ? str.length : str.replace(/\s/g, "").length;
};
exports.countCharacters = countCharacters;
const isEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
};
exports.isEmail = isEmail;
const isUrl = (str) => {
    try {
        new URL(str);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isUrl = isUrl;
const maskString = (str, maskChar = "*", visibleStart = 2, visibleEnd = 2) => {
    if (str.length <= visibleStart + visibleEnd)
        return str;
    const start = str.slice(0, visibleStart);
    const end = str.slice(-visibleEnd);
    const maskLength = str.length - visibleStart - visibleEnd;
    return start + maskChar.repeat(maskLength) + end;
};
exports.maskString = maskString;
const randomString = (length, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
exports.randomString = randomString;
const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
};
exports.escapeHtml = escapeHtml;
const unescapeHtml = (str) => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
};
exports.unescapeHtml = unescapeHtml;
const stripHtml = (str) => {
    return str.replace(/<[^>]*>/g, "");
};
exports.stripHtml = stripHtml;
const highlightText = (text, searchTerm, highlightClass = "highlight") => {
    if (!searchTerm)
        return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, `<span class="${highlightClass}">$1</span>`);
};
exports.highlightText = highlightText;
