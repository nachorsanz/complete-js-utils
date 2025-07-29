"use strict";
/**
 * Extended array utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.leastFrequent = exports.mostFrequent = exports.frequency = exports.isSuperset = exports.isSubset = exports.transpose = exports.move = exports.xor = exports.zipWith = exports.unzip = exports.zip = exports.pullAt = exports.pull = exports.nth = exports.last = exports.first = exports.findLastIndex = exports.findIndex = exports.dropWhile = exports.takeWhile = exports.sampleSize = exports.sample = exports.partition = exports.unionBy = exports.differenceBy = exports.intersectionBy = exports.uniqueBy = exports.averageBy = exports.sumBy = exports.countByKey = exports.groupByKey = void 0;
const groupByKey = (array, key) => {
    return array.reduce((groups, item) => {
        const value = String(item[key]);
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(item);
        return groups;
    }, {});
};
exports.groupByKey = groupByKey;
const countByKey = (array, key) => {
    return array.reduce((counts, item) => {
        const value = String(item[key]);
        counts[value] = (counts[value] || 0) + 1;
        return counts;
    }, {});
};
exports.countByKey = countByKey;
const sumBy = (array, key) => {
    return array.reduce((sum, item) => sum + Number(item[key]), 0);
};
exports.sumBy = sumBy;
const averageBy = (array, key) => {
    if (array.length === 0)
        return 0;
    return (0, exports.sumBy)(array, key) / array.length;
};
exports.averageBy = averageBy;
const uniqueBy = (array, key) => {
    const seen = new Set();
    return array.filter((item) => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
};
exports.uniqueBy = uniqueBy;
const intersectionBy = (array1, array2, key) => {
    const set2 = new Set(array2.map((item) => item[key]));
    return array1.filter((item) => set2.has(item[key]));
};
exports.intersectionBy = intersectionBy;
const differenceBy = (array1, array2, key) => {
    const set2 = new Set(array2.map((item) => item[key]));
    return array1.filter((item) => !set2.has(item[key]));
};
exports.differenceBy = differenceBy;
const unionBy = (array1, array2, key) => {
    const seen = new Set();
    const result = [];
    [...array1, ...array2].forEach((item) => {
        const value = item[key];
        if (!seen.has(value)) {
            seen.add(value);
            result.push(item);
        }
    });
    return result;
};
exports.unionBy = unionBy;
const partition = (array, predicate) => {
    const truthy = [];
    const falsy = [];
    array.forEach((item) => {
        if (predicate(item)) {
            truthy.push(item);
        }
        else {
            falsy.push(item);
        }
    });
    return [truthy, falsy];
};
exports.partition = partition;
const sample = (array) => {
    if (array.length === 0)
        return undefined;
    return array[Math.floor(Math.random() * array.length)];
};
exports.sample = sample;
const sampleSize = (array, n) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
};
exports.sampleSize = sampleSize;
const takeWhile = (array, predicate) => {
    const result = [];
    for (const item of array) {
        if (!predicate(item))
            break;
        result.push(item);
    }
    return result;
};
exports.takeWhile = takeWhile;
const dropWhile = (array, predicate) => {
    let index = 0;
    while (index < array.length && predicate(array[index])) {
        index++;
    }
    return array.slice(index);
};
exports.dropWhile = dropWhile;
const findIndex = (array, predicate) => {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
};
exports.findIndex = findIndex;
const findLastIndex = (array, predicate) => {
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
};
exports.findLastIndex = findLastIndex;
const first = (array) => {
    return array[0];
};
exports.first = first;
const last = (array) => {
    return array[array.length - 1];
};
exports.last = last;
const nth = (array, index) => {
    if (index < 0) {
        return array[array.length + index];
    }
    return array[index];
};
exports.nth = nth;
const pull = (array, ...values) => {
    return array.filter((item) => !values.includes(item));
};
exports.pull = pull;
const pullAt = (array, indexes) => {
    const result = [];
    const sortedIndexes = [...indexes].sort((a, b) => b - a);
    sortedIndexes.forEach((index) => {
        if (index >= 0 && index < array.length) {
            result.unshift(array.splice(index, 1)[0]);
        }
    });
    return result.reverse();
};
exports.pullAt = pullAt;
const zip = (array1, array2) => {
    const length = Math.min(array1.length, array2.length);
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push([array1[i], array2[i]]);
    }
    return result;
};
exports.zip = zip;
const unzip = (array) => {
    const result1 = [];
    const result2 = [];
    array.forEach(([first, second]) => {
        result1.push(first);
        result2.push(second);
    });
    return [result1, result2];
};
exports.unzip = unzip;
const zipWith = (array1, array2, fn) => {
    const length = Math.min(array1.length, array2.length);
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(fn(array1[i], array2[i]));
    }
    return result;
};
exports.zipWith = zipWith;
const xor = (array1, array2) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    return [...array1.filter((item) => !set2.has(item)), ...array2.filter((item) => !set1.has(item))];
};
exports.xor = xor;
const move = (array, fromIndex, toIndex) => {
    const result = [...array];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
};
exports.move = move;
const transpose = (matrix) => {
    if (matrix.length === 0)
        return [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    for (let j = 0; j < cols; j++) {
        result[j] = [];
        for (let i = 0; i < rows; i++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
};
exports.transpose = transpose;
const isSubset = (subset, superset) => {
    return subset.every((item) => superset.includes(item));
};
exports.isSubset = isSubset;
const isSuperset = (superset, subset) => {
    return (0, exports.isSubset)(subset, superset);
};
exports.isSuperset = isSuperset;
const frequency = (array) => {
    const freq = new Map();
    array.forEach((item) => {
        freq.set(item, (freq.get(item) || 0) + 1);
    });
    return freq;
};
exports.frequency = frequency;
const mostFrequent = (array) => {
    const freq = (0, exports.frequency)(array);
    let maxCount = 0;
    let result;
    freq.forEach((count, item) => {
        if (count > maxCount) {
            maxCount = count;
            result = item;
        }
    });
    return result;
};
exports.mostFrequent = mostFrequent;
const leastFrequent = (array) => {
    const freq = (0, exports.frequency)(array);
    let minCount = Infinity;
    let result;
    freq.forEach((count, item) => {
        if (count < minCount) {
            minCount = count;
            result = item;
        }
    });
    return result;
};
exports.leastFrequent = leastFrequent;
