# complete-js-utils

A comprehensive utility library for JavaScript and TypeScript, providing 355+ essential functions across 12 categories for date manipulation, image transformation, sorting, searching, and much more.

## Installation

Install the library via npm:

```bash
npm install complete-js-utils
# or
yarn add complete-js-utils
```

## Quick Start

### JavaScript (CommonJS)

```javascript
const { formatDate, isEmailValid, sortArray } = require('complete-js-utils');

// Use the functions
const date = formatDate(new Date(), 'yyyy-MM-dd');
const isValid = isEmailValid('test@example.com');
const sorted = sortArray([{name: 'John', age: 30}, {name: 'Jane', age: 25}], 'age');
```

### TypeScript (ES Modules)

```typescript
import { formatDate, isEmailValid, sortArray } from 'complete-js-utils';

// Full type safety included
const date: string = formatDate(new Date(), 'yyyy-MM-dd');
const isValid: boolean = isEmailValid('test@example.com');
const sorted = sortArray([{name: 'John', age: 30}, {name: 'Jane', age: 25}], 'age', 'asc');
```

## Features

✅ **355+ utility functions** across 12 categories  
✅ **Full TypeScript support** with complete type definitions  
✅ **Tree-shakeable** - import only what you need  
✅ **Zero dependencies** - lightweight and fast  
✅ **Well tested** - comprehensive test coverage  
✅ **Modern ES6+** - supports latest JavaScript features

## Categories

- 🔢 **Array Utils**: Array manipulation and processing
- 🎨 **Color Utils**: Color format conversion and manipulation
- 📅 **Date Utils**: Date formatting and manipulation
- 📁 **File Utils**: File operations and utilities
- 🖼️ **Image Utils**: Image processing functions
- 🔢 **Number Utils**: Number operations and validations
- 📦 **Object Utils**: Object manipulation utilities
- 🔍 **Search Utils**: Search and filtering functions
- 📊 **Sort Utils**: Sorting algorithms and utilities
- 📝 **String Utils**: String processing and manipulation
- 🌐 **URL Utils**: URL parsing and validation
- ✅ **Validation Utils**: Data validation functions

## TypeScript Support

This library is written in TypeScript and provides:

- Complete type safety
- IntelliSense support
- Type inference
- Generic type support
- Declaration files (.d.ts)
- Source maps for debugging

## Documentation

For complete documentation with all 355+ functions and examples, visit: [complete-js-utils.com](https://complete-js-utils.com)

## License

MIT © Nacho Rodríguez Sanz
