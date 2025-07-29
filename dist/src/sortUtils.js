"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFalsyItemsByPropertiesCondition = exports.removeFalsyItemsByProperties = exports.removeFalsyItemsByProperty = exports.removeFalsyItems = exports.removeItemsByPropertiesCondition = exports.removeItemsByProperties = exports.removeItemsByProperty = exports.removeItemsByCondition = exports.removeItemsByIndex = exports.removeItemByIndex = exports.removeItems = exports.removeItem = exports.removeFalsyAndDuplicates = exports.removeFalsyValues = exports.removeDuplicates = exports.compactArray = exports.flattenArray = exports.chunkArray = exports.rotateArray = exports.reverseArray = exports.shuffleArray = exports.maxBy = exports.minBy = exports.sortByCustomComparator = exports.sortByMultipleKeys = exports.sortArray = void 0;
const sortArray = (array, key, order = "asc") => {
    return array.sort((a, b) => {
        if (a[key] < b[key])
            return order === "asc" ? -1 : 1;
        if (a[key] > b[key])
            return order === "asc" ? 1 : -1;
        return 0;
    });
};
exports.sortArray = sortArray;
const sortByMultipleKeys = (array, keys) => {
    return array.sort((a, b) => {
        for (const { key, order } of keys) {
            if (a[key] < b[key])
                return order === "asc" ? -1 : 1;
            if (a[key] > b[key])
                return order === "asc" ? 1 : -1;
        }
        return 0;
    });
};
exports.sortByMultipleKeys = sortByMultipleKeys;
const sortByCustomComparator = (array, comparator) => {
    return array.sort(comparator);
};
exports.sortByCustomComparator = sortByCustomComparator;
// export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
//   return array.reduce((groups, item) => {
//     const value = item[key];
//     groups[value as keyof T] = groups[value as keyof T] || [];
//     groups[value as keyof T].push(item);
//     return groups;
//   }, {} as Record<string, T[]>);
// };
// export const countBy = <T>(array: T[], key: keyof T): Record<string, number> => {
//   return array.reduce((counts, item) => {
//     const value = item[key];
//     counts[value] = (counts[value] || 0) + 1;
//     return counts;
//   }, {} as Record<string, number>);
// };
// export const sumBy = <T>(array: T[], key: keyof T): number => {
//   return array.reduce((sum, item) => sum + item[key], 0);
// };
// export const averageBy = <T>(array: T[], key: keyof T): number => {
//   return sumBy(array, key) / array.length;
// };
const minBy = (array, key) => {
    return array.reduce((min, item) => (item[key] < min[key] ? item : min), array[0]);
};
exports.minBy = minBy;
const maxBy = (array, key) => {
    return array.reduce((max, item) => (item[key] > max[key] ? item : max), array[0]);
};
exports.maxBy = maxBy;
// export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
//   return Array.from(new Set(array.map((item) => item[key])));
// };
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
exports.shuffleArray = shuffleArray;
const reverseArray = (array) => {
    return array.slice().reverse();
};
exports.reverseArray = reverseArray;
const rotateArray = (array, times) => {
    return [...array.slice(times), ...array.slice(0, times)];
};
exports.rotateArray = rotateArray;
const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
};
exports.chunkArray = chunkArray;
const flattenArray = (array) => {
    return array.reduce((flattened, current) => [...flattened, ...current], []);
};
exports.flattenArray = flattenArray;
const compactArray = (array) => {
    return array.filter((item) => item != null);
};
exports.compactArray = compactArray;
const removeDuplicates = (array) => {
    return Array.from(new Set(array));
};
exports.removeDuplicates = removeDuplicates;
const removeFalsyValues = (array) => {
    return array.filter(Boolean);
};
exports.removeFalsyValues = removeFalsyValues;
const removeFalsyAndDuplicates = (array) => {
    return (0, exports.removeDuplicates)((0, exports.removeFalsyValues)(array));
};
exports.removeFalsyAndDuplicates = removeFalsyAndDuplicates;
const removeItem = (array, item) => {
    return array.filter((current) => current !== item);
};
exports.removeItem = removeItem;
const removeItems = (array, items) => {
    return array.filter((current) => !items.includes(current));
};
exports.removeItems = removeItems;
const removeItemByIndex = (array, index) => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
};
exports.removeItemByIndex = removeItemByIndex;
const removeItemsByIndex = (array, indexes) => {
    return array.filter((_, index) => !indexes.includes(index));
};
exports.removeItemsByIndex = removeItemsByIndex;
const removeItemsByCondition = (array, condition) => {
    return array.filter((item) => !condition(item));
};
exports.removeItemsByCondition = removeItemsByCondition;
const removeItemsByProperty = (array, key, values) => {
    return array.filter((item) => !values.includes(item[key]));
};
exports.removeItemsByProperty = removeItemsByProperty;
const removeItemsByProperties = (array, keys, values) => {
    return array.filter((item) => !keys.some((key) => values.includes(item[key])));
};
exports.removeItemsByProperties = removeItemsByProperties;
const removeItemsByPropertiesCondition = (array, keys, condition) => {
    return array.filter((item) => !condition(keys.map((key) => item[key])));
};
exports.removeItemsByPropertiesCondition = removeItemsByPropertiesCondition;
const removeFalsyItems = (array) => {
    return array.filter(Boolean);
};
exports.removeFalsyItems = removeFalsyItems;
const removeFalsyItemsByProperty = (array, key) => {
    return array.filter((item) => Boolean(item[key]));
};
exports.removeFalsyItemsByProperty = removeFalsyItemsByProperty;
const removeFalsyItemsByProperties = (array, keys) => {
    return array.filter((item) => keys.every((key) => Boolean(item[key])));
};
exports.removeFalsyItemsByProperties = removeFalsyItemsByProperties;
const removeFalsyItemsByPropertiesCondition = (array, keys, condition) => {
    return array.filter((item) => condition(keys.map((key) => item[key])));
};
exports.removeFalsyItemsByPropertiesCondition = removeFalsyItemsByPropertiesCondition;
