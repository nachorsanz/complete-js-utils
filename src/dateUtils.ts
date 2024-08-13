export const formatDate = (date: Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {};
  switch (format) {
    case "YYYY-MM-DD":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "DD-MM-YYYY":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    // Agregar más formatos según sea necesario
    default:
      throw new Error("Formato no soportado");
  }
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const differenceInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
