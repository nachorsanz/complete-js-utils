/**
 * Extended array utility functions
 */

export const groupByKey = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const countByKey = <T>(array: T[], key: keyof T): Record<string, number> => {
  return array.reduce((counts, item) => {
    const value = String(item[key]);
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};

export const sumBy = <T>(array: T[], key: keyof T): number => {
  return array.reduce((sum, item) => sum + Number(item[key]), 0);
};

export const averageBy = <T>(array: T[], key: keyof T): number => {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
};

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
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

export const intersectionBy = <T>(array1: T[], array2: T[], key: keyof T): T[] => {
  const set2 = new Set(array2.map((item) => item[key]));
  return array1.filter((item) => set2.has(item[key]));
};

export const differenceBy = <T>(array1: T[], array2: T[], key: keyof T): T[] => {
  const set2 = new Set(array2.map((item) => item[key]));
  return array1.filter((item) => !set2.has(item[key]));
};

export const unionBy = <T>(array1: T[], array2: T[], key: keyof T): T[] => {
  const seen = new Set();
  const result: T[] = [];

  [...array1, ...array2].forEach((item) => {
    const value = item[key];
    if (!seen.has(value)) {
      seen.add(value);
      result.push(item);
    }
  });

  return result;
};

export const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];

  array.forEach((item) => {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
};

export const sample = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
};

export const sampleSize = <T>(array: T[], n: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
};

export const takeWhile = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  const result: T[] = [];
  for (const item of array) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
};

export const dropWhile = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  let index = 0;
  while (index < array.length && predicate(array[index])) {
    index++;
  }
  return array.slice(index);
};

export const findIndex = <T>(array: T[], predicate: (item: T) => boolean): number => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
};

export const findLastIndex = <T>(array: T[], predicate: (item: T) => boolean): number => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
};

export const first = <T>(array: T[]): T | undefined => {
  return array[0];
};

export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
};

export const nth = <T>(array: T[], index: number): T | undefined => {
  if (index < 0) {
    return array[array.length + index];
  }
  return array[index];
};

export const pull = <T>(array: T[], ...values: T[]): T[] => {
  return array.filter((item) => !values.includes(item));
};

export const pullAt = <T>(array: T[], indexes: number[]): T[] => {
  const result: T[] = [];
  const sortedIndexes = [...indexes].sort((a, b) => b - a);

  sortedIndexes.forEach((index) => {
    if (index >= 0 && index < array.length) {
      result.unshift(array.splice(index, 1)[0]);
    }
  });

  return result.reverse();
};

export const zip = <T, U>(array1: T[], array2: U[]): Array<[T, U]> => {
  const length = Math.min(array1.length, array2.length);
  const result: Array<[T, U]> = [];

  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }

  return result;
};

export const unzip = <T, U>(array: Array<[T, U]>): [T[], U[]] => {
  const result1: T[] = [];
  const result2: U[] = [];

  array.forEach(([first, second]) => {
    result1.push(first);
    result2.push(second);
  });

  return [result1, result2];
};

export const zipWith = <T, U, R>(array1: T[], array2: U[], fn: (a: T, b: U) => R): R[] => {
  const length = Math.min(array1.length, array2.length);
  const result: R[] = [];

  for (let i = 0; i < length; i++) {
    result.push(fn(array1[i], array2[i]));
  }

  return result;
};

export const xor = <T>(array1: T[], array2: T[]): T[] => {
  const set1 = new Set(array1);
  const set2 = new Set(array2);

  return [...array1.filter((item) => !set2.has(item)), ...array2.filter((item) => !set1.has(item))];
};

export const move = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
};

export const transpose = <T>(matrix: T[][]): T[][] => {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: T[][] = [];

  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
};

export const isSubset = <T>(subset: T[], superset: T[]): boolean => {
  return subset.every((item) => superset.includes(item));
};

export const isSuperset = <T>(superset: T[], subset: T[]): boolean => {
  return isSubset(subset, superset);
};

export const frequency = <T>(array: T[]): Map<T, number> => {
  const freq = new Map<T, number>();
  array.forEach((item) => {
    freq.set(item, (freq.get(item) || 0) + 1);
  });
  return freq;
};

export const mostFrequent = <T>(array: T[]): T | undefined => {
  const freq = frequency(array);
  let maxCount = 0;
  let result: T | undefined;

  freq.forEach((count, item) => {
    if (count > maxCount) {
      maxCount = count;
      result = item;
    }
  });

  return result;
};

export const leastFrequent = <T>(array: T[]): T | undefined => {
  const freq = frequency(array);
  let minCount = Infinity;
  let result: T | undefined;

  freq.forEach((count, item) => {
    if (count < minCount) {
      minCount = count;
      result = item;
    }
  });

  return result;
};
