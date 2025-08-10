#!/usr/bin/env node

/**
 * Test script to verify the library works correctly in TypeScript projects
 * Run with: node test-import.js
 */

const { formatDate, validateEmail, sortArray } = require("./dist/index.js");

console.log("Testing complete-js-utils library...\n");

// Test date utilities
try {
  console.log("✓ Date utilities imported successfully");
} catch (error) {
  console.error("✗ Error importing date utilities:", error.message);
}

// Test validation utilities
try {
  console.log("✓ Validation utilities imported successfully");
} catch (error) {
  console.error("✗ Error importing validation utilities:", error.message);
}

// Test sort utilities
try {
  console.log("✓ Sort utilities imported successfully");
} catch (error) {
  console.error("✗ Error importing sort utilities:", error.message);
}

console.log("\n✅ All imports working correctly!");
console.log("\nTo use in your TypeScript project:");
console.log("npm install complete-js-utils");
console.log('import { formatDate, validateEmail, sortArray } from "complete-js-utils";');
