export const searchInArray = <T>(array: T[], key: keyof T, value: string): T[] => {
  return array.filter((item) => item[key]?.toString().toLowerCase().includes(value.toLowerCase()));
};
