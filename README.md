# complete-js-utils

Complete, zero-dependency utility library for JavaScript and TypeScript — hundreds of functions across 15 categories for dates, strings, arrays, objects, numbers, colors, files, images, search/sort, validation, and more.

## What’s new

We’ve added three new categories to keep your toolbox modern and productive:

- 🧠 Function Utils — debounce, throttle, once, memoize, compose, pipe
- ⏳ Async Utils — delay, retry, withTimeout, pLimit, parallelMap
- 💾 Storage Utils — safeLocalStorage, safeSessionStorage, JSON helpers, namespacedStorage

These are fully typed and included in the main entry. In the docs site, you’ll see a “New” badge highlighting these additions.

## Installation

Install the library via npm or yarn:

```bash
npm install complete-js-utils
# or
yarn add complete-js-utils
```

## Quick Start

### TypeScript / ES Modules

```ts
import { formatDate, isEmailValid, sortArray, debounce, on, delegate } from 'complete-js-utils';

const date = formatDate(new Date(), 'yyyy-MM-dd');
const isValid = isEmailValid('test@example.com');
const sorted = sortArray(
	[
		{ name: 'John', age: 30 },
		{ name: 'Jane', age: 25 },
	],
	'age',
	'asc'
);

const onScroll = debounce(() => console.log('scrolled'), 200);

// DOM event helpers
on(document.querySelector('#myButton'), 'click', () => console.log('clicked'));
delegate(document.body, '.dynamic-button', 'click', (e) => console.log('delegated click'));
```

### JavaScript / CommonJS

```js
const { formatDate, isEmailValid, sortArray, debounce, on, delegate } = require('complete-js-utils');

const date = formatDate(new Date(), 'yyyy-MM-dd');
const isValid = isEmailValid('test@example.com');
const sorted = sortArray(
	[
		{ name: 'John', age: 30 },
		{ name: 'Jane', age: 25 },
	],
	'age'
);

const onScroll = debounce(() => console.log('scrolled'), 200);

// DOM event helpers
on(document.querySelector('#myButton'), 'click', () => console.log('clicked'));
delegate(document.body, '.dynamic-button', 'click', (e) => console.log('delegated click'));
```
```

## Features

- ✅ 350+ utility functions across 16 categories
- ✅ Full TypeScript support (d.ts included)
- ✅ Tree‑shakeable (ESM) and CommonJS builds
- ✅ Zero dependencies, lightweight and fast
- ✅ Tiny footprint: ~13.9 kB gzipped
- ✅ Well tested
- ✅ Modern ES6+

## Categories

- 🔢 Array Utils — array manipulation and processing
- 🎨 Color Utils — color format conversion and manipulation
- 📅 Date Utils — date formatting and manipulation
- 🌐 DOM Utils — event handling helpers (on, off, delegate)
- 📁 File Utils — file operations and helpers
- 🖼️ Image Utils — base64/Blob helpers, resize, grayscale, etc.
- 🔢 Number Utils — math helpers and checks
- 📦 Object Utils — object manipulation utilities
- 🔍 Search Utils — search and filtering functions
- 📊 Sort Utils — sorting helpers and small algorithms
- 📝 String Utils — string processing and manipulation
- 🌐 URL Utils — URL parsing and processing
- ✅ Validation Utils — email, URL, UUID, IP, etc.
- 🧠 Function Utils — debounce, throttle, once, memoize, compose, pipe
- ⏳ Async Utils — delay, retry, withTimeout, pLimit, parallelMap
- 💾 Storage Utils — safe storages, JSON helpers, namespaced storage

## TypeScript Support

Written in TypeScript with first‑class types:

- Complete type safety and inference
- IntelliSense support
- Generic utilities
- Declaration files (.d.ts)
- Source maps

## Documentation

For full documentation with all functions and examples, visit: https://complete-js-utils.com

## Tree‑shaking

This library is tree‑shakeable in modern bundlers (Vite, Rollup, Webpack production builds):

- Dual builds: CommonJS (main) and ES Module (module).
- Conditional exports: `package.json#exports` provides `require` and `import` fields.
- Types: declaration files are published (`types` field).
- Side‑effect free: `"sideEffects": false` enables dead‑code elimination.

Import only what you need:

```ts
// ESM
import { formatDate, debounce, on, delegate } from 'complete-js-utils';

// CommonJS
const { formatDate, debounce, on, delegate } = require('complete-js-utils');
```

## License

MIT © Nacho Rodríguez Sanz
