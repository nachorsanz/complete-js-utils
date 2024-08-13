# complete-js-utils

A comprehensive utility library for JavaScript and TypeScript, providing essential functions for date manipulation, image transformation, sorting, and searching.

## Installation

Install the library via npm:

```bash
npm install complete-js-utils
```

Date Utilities

Utility functions for handling dates in various formats, performing calculations, and more.

formatDate(date: Date, format: string): string

Formats a Date object into a specified string format.

import { formatDate } from 'complete-js-utils';

const date = new Date('2024-08-13T00:00:00Z');
const formattedDate = formatDate(date, 'YYYY-MM-DD');
console.log(formattedDate); // Outputs: "13/08/2024"

addDays(date: Date, days: number): Date

Adds a specified number of days to a date.

import { addDays } from 'complete-js-utils';

const date = new Date('2024-08-13T00:00:00Z');
const newDate = addDays(date, 5);
console.log(newDate); // Outputs: Date 5 days later

subtractDays(date: Date, days: number): Date

Subtracts a specified number of days from a date.

import { subtractDays } from 'complete-js-utils';

const date = new Date('2024-08-13T00:00:00Z');
const newDate = subtractDays(date, 5);
console.log(newDate); // Outputs: Date 5 days earlier

differenceInDays(date1: Date, date2: Date): number

Calculates the difference in days between two dates.

import { differenceInDays } from 'complete-js-utils';

const date1 = new Date('2024-08-13T00:00:00Z');
const date2 = new Date('2024-08-20T00:00:00Z');
const daysDifference = differenceInDays(date1, date2);
console.log(daysDifference); // Outputs: 7

isWeekend(date: Date): boolean

Checks if a date falls on a weekend.

import { isWeekend } from 'complete-js-utils';

const date = new Date('2024-08-17T00:00:00Z'); // Saturday
const weekendCheck = isWeekend(date);
console.log(weekendCheck); // Outputs: true

Image Utilities

Functions for converting images between formats, resizing, and more.

base64ToBlob(base64: string, contentType: string): Blob

Converts a Base64 string to a Blob object.

import { base64ToBlob } from 'complete-js-utils';

const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
const blob = base64ToBlob(base64, 'image/png');
console.log(blob); // Outputs: Blob object

blobToBase64(blob: Blob): Promise<string>

Converts a Blob object back to a Base64 string.

import { blobToBase64 } from 'complete-js-utils';

const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
blobToBase64(blob).then(base64 => console.log(base64)); // Outputs: Base64 string

resizeImage(base64: string, width: number, height: number): Promise<string>

Resizes an image represented by a Base64 string to the specified dimensions.

import { resizeImage } from 'complete-js-utils';

const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
resizeImage(base64, 100, 100).then(resizedBase64 => console.log(resizedBase64)); // Outputs: Resized Base64 image

imageToGrayScale(base64: string): Promise<string>

Converts a Base64 image to grayscale.

import { imageToGrayScale } from 'complete-js-utils';

const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
imageToGrayScale(base64).then(grayBase64 => console.log(grayBase64)); // Outputs: Grayscale Base64 image

Sort Utilities

Sorting functions for arrays of objects based on keys or custom comparators.

sortArray<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[]

Sorts an array of objects by a specific key.

import { sortArray } from 'complete-js-utils';

const array = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
const sortedArray = sortArray(array, 'age', 'asc');
console.log(sortedArray); // Outputs: [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }]

sortByMultipleKeys<T>(array: T[], keys: { key: keyof T, order: 'asc' | 'desc' }[]): T[]

Sorts an array of objects by multiple keys in the specified order.

import { sortByMultipleKeys } from 'complete-js-utils';

const array = [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }];
const sortedArray = sortByMultipleKeys(array, [{ key: 'name', order: 'asc' }, { key: 'age', order: 'asc' }]);
console.log(sortedArray); // Outputs: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }, { name: 'Bob', age: 25 }]

sortByCustomComparator<T>(array: T[], comparator: (a: T, b: T) => number): T[]

Sorts an array of objects using a custom comparator function.

import { sortByCustomComparator } from 'complete-js-utils';

const array = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
const sortedArray = sortByCustomComparator(array, (a, b) => a.age - b.age);
console.log(sortedArray); // Outputs: [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }]

Search Utilities

Utility functions for searching in arrays of objects.

searchInArray<T>(array: T[], key: keyof T, value: string): T[]

Searches for objects in an array where a specific key contains the specified value.

import { searchInArray } from 'complete-js-utils';

const array = [{ name: 'Alice' }, { name: 'Bob' }];
const results = searchInArray(array, 'name', 'bob');
console.log(results); // Outputs: [{ name: 'Bob' }]

searchWithMultipleKeys<T>(array: T[], keys: (keyof T)[], value: string): T[]

Searches for objects in an array where any of the specified keys contain the value.

import { searchWithMultipleKeys } from 'complete-js-utils';

const array = [{ name: 'Alice', city: 'New York' }, { name: 'Bob', city: 'Los Angeles' }];
const results = searchWithMultipleKeys(array, ['name', 'city'], 'los');
console.log(results); // Outputs: [{ name: 'Bob', city: 'Los Angeles' }]

searchWithCustomComparator<T>(array: T[], comparator: (item: T) => boolean): T[]

Searches for objects in an array using a custom comparator function.

import { searchWithCustomComparator } from 'complete-js-utils';

const array = [{ name: 'Alice' }, { name: 'Bob' }];
const results = searchWithCustomComparator(array, item => item.name.startsWith('A'));
console.log(results); // Outputs: [{ name: 'Alice' }]
