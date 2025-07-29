/**
 * Number utility functions
 */

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const round = (num: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

export const toFixed = (num: number, decimals: number): string => {
  return num.toFixed(decimals);
};

export const isEven = (num: number): boolean => {
  return num % 2 === 0;
};

export const isOdd = (num: number): boolean => {
  return num % 2 !== 0;
};

export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const factorial = (num: number): number => {
  if (num < 0) return -1;
  if (num === 0) return 1;
  return num * factorial(num - 1);
};

export const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

export const percentage = (value: number, total: number): number => {
  return (value / total) * 100;
};

export const percentageOf = (percent: number, total: number): number => {
  return (percent / 100) * total;
};

export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
};

export const median = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const mode = (numbers: number[]): number[] => {
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;

  numbers.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1;
    maxFreq = Math.max(maxFreq, frequency[num]);
  });

  return Object.keys(frequency)
    .filter((key) => frequency[Number(key)] === maxFreq)
    .map(Number);
};

export const sum = (numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

export const product = (numbers: number[]): number => {
  return numbers.reduce((total, num) => total * num, 1);
};

export const max = (numbers: number[]): number => {
  return Math.max(...numbers);
};

export const min = (numbers: number[]): number => {
  return Math.min(...numbers);
};

export const range = (numbers: number[]): number => {
  return max(numbers) - min(numbers);
};

export const standardDeviation = (numbers: number[]): number => {
  const avg = average(numbers);
  const squaredDiffs = numbers.map((num) => Math.pow(num - avg, 2));
  return Math.sqrt(average(squaredDiffs));
};

export const variance = (numbers: number[]): number => {
  const avg = average(numbers);
  const squaredDiffs = numbers.map((num) => Math.pow(num - avg, 2));
  return average(squaredDiffs);
};

export const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

export const formatNumber = (num: number, locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale).format(num);
};

export const formatCurrency = (num: number, currency: string = "USD", locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(num);
};

export const formatPercent = (num: number, locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
  }).format(num);
};

export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

export const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const inRange = (num: number, min: number, max: number): boolean => {
  return num >= min && num <= max;
};
