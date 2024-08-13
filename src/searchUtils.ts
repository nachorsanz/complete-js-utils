export const searchInArray = <T>(array: T[], key: keyof T, value: string): T[] => {
  return array.filter((item) => item[key]?.toString().toLowerCase().includes(value.toLowerCase()));
};

export const searchWithMultipleKeys = <T>(array: T[], keys: (keyof T)[], value: string): T[] => {
  return array.filter((item) => keys.some((key) => item[key]?.toString().toLowerCase().includes(value.toLowerCase())));
};

export const searchWithCustomComparator = <T>(array: T[], comparator: (item: T) => boolean): T[] => {
  return array.filter(comparator);
};
