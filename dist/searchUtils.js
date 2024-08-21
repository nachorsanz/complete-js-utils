"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWithCustomComparator = exports.searchWithMultipleKeys = exports.searchInArray = void 0;
const searchInArray = (array, key, value) => {
    return array.filter((item) => { var _a; return (_a = item[key]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes(value.toLowerCase()); });
};
exports.searchInArray = searchInArray;
const searchWithMultipleKeys = (array, keys, value) => {
    return array.filter((item) => keys.some((key) => { var _a; return (_a = item[key]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes(value.toLowerCase()); }));
};
exports.searchWithMultipleKeys = searchWithMultipleKeys;
const searchWithCustomComparator = (array, comparator) => {
    return array.filter(comparator);
};
exports.searchWithCustomComparator = searchWithCustomComparator;
