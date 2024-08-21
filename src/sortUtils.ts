export const sortArray = <T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const sortByMultipleKeys = <T>(array: T[], keys: { key: keyof T; order: "asc" | "desc" }[]): T[] => {
  return array.sort((a, b) => {
    for (const { key, order } of keys) {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export const sortByCustomComparator = <T>(array: T[], comparator: (a: T, b: T) => number): T[] => {
  return array.sort(comparator);
};

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

export const minBy = <T>(array: T[], key: keyof T): T | undefined => {
  return array.reduce((min, item) => (item[key] < min[key] ? item : min), array[0]);
};

export const maxBy = <T>(array: T[], key: keyof T): T | undefined => {
  return array.reduce((max, item) => (item[key] > max[key] ? item : max), array[0]);
};

// export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
//   return Array.from(new Set(array.map((item) => item[key])));
// };

export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const reverseArray = <T>(array: T[]): T[] => {
  return array.slice().reverse();
};

export const rotateArray = <T>(array: T[], times: number): T[] => {
  return [...array.slice(times), ...array.slice(0, times)];
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
};

export const flattenArray = <T>(array: T[][]): T[] => {
  return array.reduce((flattened, current) => [...flattened, ...current], []);
};

export const compactArray = <T>(array: (T | null | undefined)[]): T[] => {
  return array.filter((item) => item != null) as T[];
};

export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const removeFalsyValues = <T>(array: T[]): T[] => {
  return array.filter(Boolean);
};

export const removeFalsyAndDuplicates = <T>(array: T[]): T[] => {
  return removeDuplicates(removeFalsyValues(array));
};

export const removeItem = <T>(array: T[], item: T): T[] => {
  return array.filter((current) => current !== item);
};

export const removeItems = <T>(array: T[], items: T[]): T[] => {
  return array.filter((current) => !items.includes(current));
};

export const removeItemByIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const removeItemsByIndex = <T>(array: T[], indexes: number[]): T[] => {
  return array.filter((_, index) => !indexes.includes(index));
};

export const removeItemsByCondition = <T>(array: T[], condition: (item: T) => boolean): T[] => {
  return array.filter((item) => !condition(item));
};

export const removeItemsByProperty = <T>(array: T[], key: keyof T, values: T[keyof T][]): T[] => {
  return array.filter((item) => !values.includes(item[key]));
};

export const removeItemsByProperties = <T>(array: T[], keys: (keyof T)[], values: T[keyof T][]): T[] => {
  return array.filter((item) => !keys.some((key) => values.includes(item[key])));
};

export const removeItemsByPropertiesCondition = <T>(
  array: T[],
  keys: (keyof T)[],
  condition: (values: T[keyof T][]) => boolean,
): T[] => {
  return array.filter((item) => !condition(keys.map((key) => item[key])));
};

export const removeFalsyItems = <T>(array: T[]): T[] => {
  return array.filter(Boolean);
};

export const removeFalsyItemsByProperty = <T>(array: T[], key: keyof T): T[] => {
  return array.filter((item) => Boolean(item[key]));
};

export const removeFalsyItemsByProperties = <T>(array: T[], keys: (keyof T)[]): T[] => {
  return array.filter((item) => keys.every((key) => Boolean(item[key])));
};

export const removeFalsyItemsByPropertiesCondition = <T>(
  array: T[],
  keys: (keyof T)[],
  condition: (values: T[keyof T][]) => boolean,
): T[] => {
  return array.filter((item) => condition(keys.map((key) => item[key])));
};
