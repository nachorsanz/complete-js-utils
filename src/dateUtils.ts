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
