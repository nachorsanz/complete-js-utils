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
