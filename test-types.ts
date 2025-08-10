/**
 * TypeScript test file to verify types work correctly
 * Compile with: npx tsc test-types.ts --noEmit
 */

import {
  formatDate,
  isEmailValid,
  sortArray,
  randomString,
  isUrlValid,
  capitalize,
  sortByMultipleKeys,
} from "./dist/index";

// Test date utilities with proper typing
const date = new Date();
const formattedDate: string = formatDate(date, "yyyy-MM-dd");

// Test validation utilities
const email = "test@example.com";
const isValid: boolean = isEmailValid(email);

// Test array utilities with objects
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Bob", age: 35 },
];
const sortedUsers = sortArray(users, "age", "asc");

// Test string utilities
const randomStr: string = randomString(10);
const capitalizedStr: string = capitalize("hello world");

// Test URL validation
const url = "https://example.com";
const isValidUrl: boolean = isUrlValid(url);

// Test multi-key sorting
const sortedByMultiple = sortByMultipleKeys(users, [
  { key: "age", order: "desc" },
  { key: "name", order: "asc" },
]);

console.log("All TypeScript types are working correctly!");
console.log("Formatted date:", formattedDate);
console.log("Email is valid:", isValid);
console.log("Sorted users:", sortedUsers);
console.log("Random string:", randomStr);
console.log("Capitalized:", capitalizedStr);
console.log("URL is valid:", isValidUrl);
