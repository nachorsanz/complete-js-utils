"use strict";
/**
 * Object utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unflatten = exports.flatten = exports.indexBy = exports.countBy = exports.groupBy = exports.invert = exports.mapKeys = exports.mapValues = exports.fromEntries = exports.entries = exports.values = exports.keys = exports.isEqual = exports.isEmpty = exports.has = exports.set = exports.get = exports.omit = exports.pick = exports.merge = exports.clone = void 0;
const clone = (obj) => {
    if (obj === null || typeof obj !== "object")
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map((item) => (0, exports.clone)(item));
    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = (0, exports.clone)(obj[key]);
            }
        }
        return clonedObj;
    }
    return obj;
};
exports.clone = clone;
const merge = (target, source) => {
    const result = Object.assign({}, target);
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];
            const targetValue = result[key];
            if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
                result[key] = (0, exports.merge)(targetValue, sourceValue);
            }
            else {
                result[key] = sourceValue;
            }
        }
    }
    return result;
};
exports.merge = merge;
const pick = (obj, keys) => {
    const result = {};
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
};
exports.pick = pick;
const omit = (obj, keys) => {
    const result = Object.assign({}, obj);
    keys.forEach((key) => {
        delete result[key];
    });
    return result;
};
exports.omit = omit;
const get = (obj, path, defaultValue) => {
    const keys = path.split(".");
    let result = obj;
    for (const key of keys) {
        if (result == null || typeof result !== "object") {
            return defaultValue;
        }
        result = result[key];
    }
    return result !== undefined ? result : defaultValue;
};
exports.get = get;
const set = (obj, path, value) => {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current) || typeof current[key] !== "object") {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
};
exports.set = set;
const has = (obj, path) => {
    const keys = path.split(".");
    let current = obj;
    for (const key of keys) {
        if (current == null || typeof current !== "object" || !(key in current)) {
            return false;
        }
        current = current[key];
    }
    return true;
};
exports.has = has;
const isEmpty = (obj) => {
    if (obj == null)
        return true;
    if (Array.isArray(obj) || typeof obj === "string")
        return obj.length === 0;
    if (obj instanceof Map || obj instanceof Set)
        return obj.size === 0;
    return Object.keys(obj).length === 0;
};
exports.isEmpty = isEmpty;
const isEqual = (a, b) => {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (typeof a !== typeof b)
        return false;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        return a.every((item, index) => (0, exports.isEqual)(item, b[index]));
    }
    if (isPlainObject(a) && isPlainObject(b)) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length)
            return false;
        return keysA.every((key) => (0, exports.isEqual)(a[key], b[key]));
    }
    return false;
};
exports.isEqual = isEqual;
const keys = (obj) => {
    return Object.keys(obj);
};
exports.keys = keys;
const values = (obj) => {
    return Object.values(obj);
};
exports.values = values;
const entries = (obj) => {
    return Object.entries(obj);
};
exports.entries = entries;
const fromEntries = (entries) => {
    return Object.fromEntries(entries);
};
exports.fromEntries = fromEntries;
const mapValues = (obj, fn) => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = fn(obj[key], key);
        }
    }
    return result;
};
exports.mapValues = mapValues;
const mapKeys = (obj, fn) => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = fn(obj[key], key);
            result[newKey] = obj[key];
        }
    }
    return result;
};
exports.mapKeys = mapKeys;
const invert = (obj) => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[obj[key]] = key;
        }
    }
    return result;
};
exports.invert = invert;
const groupBy = (array, fn) => {
    return array.reduce((groups, item) => {
        const key = fn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
};
exports.groupBy = groupBy;
const countBy = (array, fn) => {
    return array.reduce((counts, item) => {
        const key = fn(item);
        counts[key] = (counts[key] || 0) + 1;
        return counts;
    }, {});
};
exports.countBy = countBy;
const indexBy = (array, fn) => {
    return array.reduce((index, item) => {
        const key = fn(item);
        index[key] = item;
        return index;
    }, {});
};
exports.indexBy = indexBy;
const flatten = (obj, separator = ".") => {
    const result = {};
    function flattenRecursive(current, prefix = "") {
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}${separator}${key}` : key;
                if (isPlainObject(current[key])) {
                    flattenRecursive(current[key], newKey);
                }
                else {
                    result[newKey] = current[key];
                }
            }
        }
    }
    flattenRecursive(obj);
    return result;
};
exports.flatten = flatten;
const unflatten = (obj, separator = ".") => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            (0, exports.set)(result, key.replace(new RegExp(`\\${separator}`, "g"), "."), obj[key]);
        }
    }
    return result;
};
exports.unflatten = unflatten;
// Helper function
const isPlainObject = (value) => {
    return value != null && typeof value === "object" && value.constructor === Object;
};
