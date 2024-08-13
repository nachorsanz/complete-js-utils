export const sortArray = <T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
};
