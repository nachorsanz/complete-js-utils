# Complete JS Utils - Catálogo Completo de Funciones

## 📅 Date Utils (67 funciones)

### Formateo y Conversión

- `formatDate` - Formatear fecha según formato especificado
- `parseDate` - Parsear string a fecha
- `isValidDate` - Validar si es una fecha válida
- `toISOString` - Convertir fecha a string ISO
- `fromTimestamp` - Crear fecha desde timestamp
- `toTimestamp` - Convertir fecha a timestamp

### Operaciones de Suma/Resta

- `addDays` - Añadir días a una fecha
- `subtractDays` - Restar días a una fecha
- `addHours` - Añadir horas a una fecha
- `addMinutes` - Añadir minutos a una fecha
- `addSeconds` - Añadir segundos a una fecha
- `addMonths` - Añadir meses a una fecha
- `addYears` - Añadir años a una fecha

### Diferencias y Cálculos

- `differenceInDays` - Diferencia en días entre fechas
- `differenceInHours` - Diferencia en horas entre fechas
- `differenceInMinutes` - Diferencia en minutos entre fechas
- `differenceInSeconds` - Diferencia en segundos entre fechas
- `differenceInMonths` - Diferencia en meses entre fechas
- `differenceInYears` - Diferencia en años entre fechas
- `age` - Calcular edad entre fechas
- `timeAgo` - Tiempo transcurrido en formato legible

### Inicio/Final de Períodos

- `startOfDay` - Inicio del día
- `endOfDay` - Final del día
- `startOfWeek` - Inicio de la semana
- `endOfWeek` - Final de la semana
- `startOfMonth` - Inicio del mes
- `endOfMonth` - Final del mes
- `startOfYear` - Inicio del año
- `endOfYear` - Final del año
- `startOfQuarter` - Inicio del trimestre
- `endOfQuarter` - Final del trimestre

### Comparaciones

- `isSameDay` - Verificar si son el mismo día
- `isSameWeek` - Verificar si son la misma semana
- `isSameMonth` - Verificar si son el mismo mes
- `isSameYear` - Verificar si son el mismo año
- `isToday` - Verificar si es hoy
- `isTomorrow` - Verificar si es mañana
- `isYesterday` - Verificar si es ayer
- `isFuture` - Verificar si es futuro
- `isPast` - Verificar si es pasado
- `isBefore` - Verificar si es anterior
- `isAfter` - Verificar si es posterior
- `isBetween` - Verificar si está entre fechas

### Días de la Semana

- `isWeekend` - Verificar si es fin de semana
- `isWeekendDay` - Verificar si es día de fin de semana
- `isWeekendDate` - Verificar si la fecha es fin de semana
- `isWeekday` - Verificar si es día laborable
- `isWeekdayEnd` - Verificar si es final de día laborable
- `isMonday` - Verificar si es lunes
- `isTuesday` - Verificar si es martes
- `isWednesday` - Verificar si es miércoles
- `isThursday` - Verificar si es jueves
- `isFriday` - Verificar si es viernes
- `isSaturday` - Verificar si es sábado
- `isSunday` - Verificar si es domingo

### Obtener Información

- `getDaysInMonth` - Obtener días en el mes
- `getFirstDayOfMonth` - Primer día del mes
- `getLastDayOfMonth` - Último día del mes
- `getMonthName` - Nombre del mes
- `getShortMonthName` - Nombre corto del mes
- `getWeekdayName` - Nombre del día de la semana
- `getShortWeekdayName` - Nombre corto del día
- `getQuarter` - Obtener trimestre
- `getWeekNumber` - Número de semana del año
- `getDayOfYear` - Día del año
- `getWeeksInMonth` - Semanas en el mes

### Arrays de Información

- `getDaysArray` - Array de días del mes
- `getMonthsArray` - Array de nombres de meses
- `getShortMonthsArray` - Array de nombres cortos de meses
- `getWeekdaysArray` - Array de días de la semana
- `getShortWeekdaysArray` - Array de días cortos
- `getYearsArray` - Array de años en rango

### Validaciones Especiales

- `isLeapYear` - Verificar si es año bisiesto
- `isLastDayOfMonth` - Verificar si es último día del mes
- `isFirstDayOfMonth` - Verificar si es primer día del mes
- `isLastMonth` - Verificar si es último mes del año
- `isFirstMonth` - Verificar si es primer mes del año
- `isLastYear` - Verificar si es último año válido
- `isFirstYear` - Verificar si es primer año válido

## 🧮 Number Utils (32 funciones)

### Operaciones Básicas

- `clamp` - Limitar número entre min y max
- `random` - Número aleatorio entre rango
- `randomInt` - Entero aleatorio entre rango
- `round` - Redondear con decimales
- `toFixed` - Formatear con decimales fijos

### Validaciones Numéricas

- `isEven` - Verificar si es par
- `isOdd` - Verificar si es impar
- `isPrime` - Verificar si es primo
- `inRange` - Verificar si está en rango

### Matemáticas Avanzadas

- `factorial` - Calcular factorial
- `fibonacci` - Número de Fibonacci
- `gcd` - Máximo común divisor
- `lcm` - Mínimo común múltiplo
- `toRadians` - Grados a radianes
- `toDegrees` - Radianes a grados
- `lerp` - Interpolación lineal
- `map` - Mapear valor entre rangos

### Porcentajes

- `percentage` - Calcular porcentaje
- `percentageOf` - Valor del porcentaje

### Estadísticas de Arrays

- `average` - Promedio de números
- `median` - Mediana de números
- `mode` - Moda de números
- `sum` - Suma de números
- `product` - Producto de números
- `max` - Máximo de números
- `min` - Mínimo de números
- `range` - Rango de números
- `standardDeviation` - Desviación estándar
- `variance` - Varianza

### Formateo

- `formatNumber` - Formatear número con locale
- `formatCurrency` - Formatear como moneda
- `formatPercent` - Formatear como porcentaje

## 🔤 String Utils (22 funciones)

### Transformaciones de Caso

- `capitalize` - Primera letra mayúscula
- `camelCase` - Convertir a camelCase
- `kebabCase` - Convertir a kebab-case
- `snakeCase` - Convertir a snake_case
- `pascalCase` - Convertir a PascalCase
- `titleCase` - Convertir a Title Case

### Manipulación de Texto

- `reverse` - Invertir string
- `truncate` - Truncar con sufijo
- `padStart` - Rellenar al inicio
- `padEnd` - Rellenar al final
- `removeAccents` - Quitar acentos
- `slugify` - Crear slug URL-friendly

### Análisis de Contenido

- `extractNumbers` - Extraer números
- `countWords` - Contar palabras
- `countCharacters` - Contar caracteres

### Validaciones

- `isEmail` - Validar email
- `isUrl` - Validar URL

### Utilidades Avanzadas

- `maskString` - Enmascarar caracteres
- `randomString` - Generar string aleatorio
- `escapeHtml` - Escapar HTML
- `unescapeHtml` - Desescapar HTML
- `stripHtml` - Quitar etiquetas HTML
- `highlightText` - Resaltar texto

## 🗂️ Array Utils (32 funciones)

### Agrupación y Conteo

- `groupByKey` - Agrupar por propiedad
- `countByKey` - Contar por propiedad
- `frequency` - Frecuencia de elementos
- `mostFrequent` - Elemento más frecuente
- `leastFrequent` - Elemento menos frecuente

### Análisis Estadístico

- `sumBy` - Suma por propiedad
- `averageBy` - Promedio por propiedad

### Operaciones de Conjunto

- `uniqueBy` - Únicos por propiedad
- `intersectionBy` - Intersección por propiedad
- `differenceBy` - Diferencia por propiedad
- `unionBy` - Unión por propiedad
- `xor` - Diferencia simétrica
- `isSubset` - Verificar subconjunto
- `isSuperset` - Verificar superconjunto

### Selección y Filtrado

- `partition` - Particionar por condición
- `sample` - Elemento aleatorio
- `sampleSize` - Múltiples elementos aleatorios
- `takeWhile` - Tomar mientras condición
- `dropWhile` - Omitir mientras condición

### Búsqueda

- `findIndex` - Encontrar índice
- `findLastIndex` - Encontrar último índice
- `first` - Primer elemento
- `last` - Último elemento
- `nth` - Elemento en posición

### Modificación

- `pull` - Remover valores
- `pullAt` - Remover en índices
- `move` - Mover elemento

### Combinación

- `zip` - Combinar arrays
- `unzip` - Descomponer arrays combinados
- `zipWith` - Combinar con función

### Transformación

- `transpose` - Transponer matriz

## 🎨 Color Utils (20 funciones)

### Conversiones de Color

- `hexToRgb` - HEX a RGB
- `rgbToHex` - RGB a HEX
- `rgbToHsl` - RGB a HSL
- `hslToRgb` - HSL a RGB
- `rgbToHsv` - RGB a HSV
- `hsvToRgb` - HSV a RGB

### Manipulación de Color

- `lighten` - Aclarar color
- `darken` - Oscurecer color
- `saturate` - Saturar color
- `desaturate` - Desaturar color

### Esquemas de Color

- `complement` - Color complementario
- `analogous` - Colores análogos
- `triadic` - Esquema triádico
- `tetradic` - Esquema tetrádico
- `monochromatic` - Esquema monocromático

### Análisis de Color

- `getContrast` - Calcular contraste
- `isLight` - Verificar si es claro
- `isDark` - Verificar si es oscuro

### Utilidades

- `randomColor` - Color aleatorio
- `rgbString` - String RGB/RGBA
- `hslString` - String HSL/HSLA

## 📁 File Utils (21 funciones)

### Información de Archivo

- `formatFileSize` - Formatear tamaño
- `getFileExtensionFromPath` - Obtener extensión
- `getFileName` - Obtener nombre
- `getFileNameWithoutExtension` - Nombre sin extensión
- `getMimeType` - Obtener tipo MIME

### Validaciones de Tipo

- `isImageFile` - Verificar si es imagen
- `isVideoFile` - Verificar si es video
- `isAudioFile` - Verificar si es audio
- `isDocumentFile` - Verificar si es documento
- `isArchiveFile` - Verificar si es archivo
- `isCodeFile` - Verificar si es código

### Operaciones de Archivo

- `downloadFile` - Descargar archivo
- `readFileAsText` - Leer como texto
- `readFileAsDataURL` - Leer como Data URL
- `readFileAsArrayBuffer` - Leer como Array Buffer

### Validación y Seguridad

- `validateFileType` - Validar tipo
- `validateFileSize` - Validar tamaño
- `generateUniqueFileName` - Generar nombre único
- `sanitizeFileName` - Sanear nombre

### Procesamiento de Datos

- `parseCSV` - Parsear CSV
- `arrayToCSV` - Array a CSV
- `compressImage` - Comprimir imagen

## 🖼️ Image Utils (27 funciones)

### Conversiones de Formato

- `base64ToBlob` - Base64 a Blob
- `blobToBase64` - Blob a Base64
- `stripBase64Header` - Quitar header Base64
- `addBase64Header` - Añadir header Base64

### Validaciones y Información

- `isValidImageFormat` - Validar formato
- `getImageFormatFromExtension` - Formato desde extensión
- `getImageFormatFromMimeType` - Formato desde MIME
- `getMimeTypeFromFormat` - MIME desde formato
- `isBase64Image` - Validar Base64 de imagen
- `getBase64ImageFormat` - Formato de Base64
- `getBase64ImageSize` - Tamaño de Base64

### Transformaciones

- `resizeImage` - Redimensionar imagen
- `imageToGrayScale` - Convertir a escala de grises
- `flipImageData` - Voltear datos de imagen
- `rotateImageData90` - Rotar 90 grados

### Cálculos de Dimensiones

- `calculateAspectRatio` - Calcular aspecto
- `calculateDimensionsFromAspectRatio` - Dimensiones desde aspecto
- `isSquareImage` - Verificar si es cuadrada
- `isPortraitImage` - Verificar si es vertical
- `isLandscapeImage` - Verificar si es horizontal

### Utilidades de Color

- `rgbToGrayscale` - RGB a escala de grises
- `adjustBrightness` - Ajustar brillo

### Utilidades de Tamaño

- `formatImageFileSize` - Formatear tamaño
- `convertBytesToKB` - Convertir a KB
- `convertBytesToMB` - Convertir a MB
- `estimateImageQuality` - Estimar calidad
- `getImageSizeCategory` - Categoría de tamaño
- `extractImageNameFromUrl` - Extraer nombre de URL

## 🔍 Search Utils (3 funciones)

### Búsqueda en Arrays

- `searchInArray` - Buscar por propiedad
- `searchWithMultipleKeys` - Buscar por múltiples propiedades
- `searchWithCustomComparator` - Buscar con comparador personalizado

## 📊 Sort Utils (24 funciones)

### Ordenamiento

- `sortArray` - Ordenar por propiedad
- `sortByMultipleKeys` - Ordenar por múltiples claves
- `sortByCustomComparator` - Ordenar con comparador

### Selección de Extremos

- `minBy` - Mínimo por propiedad
- `maxBy` - Máximo por propiedad

### Manipulación de Arrays

- `shuffleArray` - Mezclar array
- `reverseArray` - Invertir array
- `rotateArray` - Rotar array
- `chunkArray` - Dividir en chunks
- `flattenArray` - Aplanar array
- `compactArray` - Compactar array

### Eliminación de Elementos

- `removeDuplicates` - Quitar duplicados
- `removeFalsyValues` - Quitar valores falsy
- `removeFalsyAndDuplicates` - Quitar falsy y duplicados
- `removeItem` - Quitar elemento
- `removeItems` - Quitar elementos
- `removeItemByIndex` - Quitar por índice
- `removeItemsByIndex` - Quitar por índices
- `removeItemsByCondition` - Quitar por condición
- `removeItemsByProperty` - Quitar por propiedad
- `removeItemsByProperties` - Quitar por propiedades
- `removeItemsByPropertiesCondition` - Quitar por condición de propiedades
- `removeFalsyItems` - Quitar elementos falsy
- `removeFalsyItemsByProperty` - Quitar falsy por propiedad
- `removeFalsyItemsByProperties` - Quitar falsy por propiedades
- `removeFalsyItemsByPropertiesCondition` - Quitar falsy por condición

## 🌐 URL Utils (30 funciones)

### Parsing y Validación

- `parseUrl` - Parsear URL
- `isValidUrl` - Validar URL
- `isAbsoluteUrl` - Verificar si es absoluta
- `isRelativeUrl` - Verificar si es relativa
- `isSecure` - Verificar si es HTTPS
- `isSameOrigin` - Verificar mismo origen
- `isSameDomain` - Verificar mismo dominio

### Componentes de URL

- `getDomain` - Obtener dominio
- `getProtocol` - Obtener protocolo
- `getPort` - Obtener puerto
- `getPath` - Obtener ruta
- `getHash` - Obtener hash
- `getFileExtension` - Obtener extensión de archivo
- `removeFileExtension` - Quitar extensión

### Parámetros de Query

- `getQueryParams` - Obtener parámetros
- `addQueryParams` - Añadir parámetros
- `removeQueryParams` - Quitar parámetros
- `getQueryParam` - Obtener parámetro específico
- `hasQueryParam` - Verificar parámetro
- `clearQueryParams` - Limpiar parámetros
- `encodeQueryString` - Codificar query string
- `decodeQueryString` - Decodificar query string

### Construcción y Manipulación

- `buildUrl` - Construir URL
- `joinPaths` - Unir rutas
- `makeAbsolute` - Hacer absoluta
- `makeSecure` - Hacer segura (HTTPS)
- `makeInsecure` - Hacer insegura (HTTP)

### Validación de Tipos de Archivo

- `isImageUrl` - Verificar si es imagen
- `isVideoUrl` - Verificar si es video
- `isAudioUrl` - Verificar si es audio

## 🔍 Validation Utils (41 funciones)

### Validaciones de Tipo

- `isString` - Verificar si es string
- `isNumber` - Verificar si es número
- `isBoolean` - Verificar si es booleano
- `isArray` - Verificar si es array
- `isObject` - Verificar si es objeto
- `isFunction` - Verificar si es función
- `isNull` - Verificar si es null
- `isUndefined` - Verificar si es undefined
- `isNil` - Verificar si es null o undefined
- `isDate` - Verificar si es fecha
- `isRegExp` - Verificar si es expresión regular
- `isError` - Verificar si es error

### Validaciones de Contenido

- `isNotEmpty` - Verificar si no está vacío
- `isEmailValid` - Validar email
- `isUrlValid` - Validar URL
- `isUuid` - Validar UUID
- `isIpAddress` - Validar dirección IP
- `isMacAddress` - Validar dirección MAC
- `isCreditCard` - Validar tarjeta de crédito
- `isPhoneNumber` - Validar número de teléfono
- `isPostalCode` - Validar código postal
- `isHexColor` - Validar color hexadecimal
- `isBase64` - Validar Base64
- `isJson` - Validar JSON

### Validaciones Numéricas

- `isPositive` - Verificar si es positivo
- `isNegative` - Verificar si es negativo
- `isZero` - Verificar si es cero
- `isInteger` - Verificar si es entero
- `isFloat` - Verificar si es decimal
- `isEvenNumber` - Verificar si es par
- `isOddNumber` - Verificar si es impar
- `isPrimeNumber` - Verificar si es primo
- `isInRange` - Verificar si está en rango

### Validaciones de String

- `isAlpha` - Verificar si es alfabético
- `isAlphanumeric` - Verificar si es alfanumérico
- `isNumeric` - Verificar si es numérico
- `isLowercase` - Verificar si es minúscula
- `isUppercase` - Verificar si es mayúscula
- `hasLength` - Verificar longitud
- `matchesPattern` - Verificar patrón
- `isStrongPassword` - Verificar contraseña fuerte
- `isWeakPassword` - Verificar contraseña débil

## 🎯 Object Utils (20 funciones)

### Manipulación Básica

- `clone` - Clonar objeto
- `merge` - Fusionar objetos
- `pick` - Seleccionar propiedades
- `omit` - Omitir propiedades

### Acceso a Propiedades

- `get` - Obtener valor por ruta
- `set` - Establecer valor por ruta
- `has` - Verificar si tiene propiedad

### Análisis de Objetos

- `isEmpty` - Verificar si está vacío
- `isEqual` - Verificar igualdad profunda

### Utilidades de Claves/Valores

- `keys` - Obtener claves
- `values` - Obtener valores
- `entries` - Obtener entradas
- `fromEntries` - Crear desde entradas
- `invert` - Invertir clave-valor

### Transformaciones

- `mapValues` - Mapear valores
- `mapKeys` - Mapear claves
- `flatten` - Aplanar objeto
- `unflatten` - Desaplanar objeto

### Operaciones con Arrays

- `groupBy` - Agrupar array por función
- `countBy` - Contar array por función
- `indexBy` - Indexar array por función

---

## 📊 Resumen Total

**Total de funciones: 334**

- Date Utils: 67 funciones
- Validation Utils: 41 funciones
- Array Utils: 32 funciones
- Number Utils: 32 funciones
- URL Utils: 30 funciones
- Image Utils: 27 funciones
- Sort Utils: 24 funciones
- String Utils: 22 funciones
- File Utils: 21 funciones
- Color Utils: 20 funciones
- Object Utils: 20 funciones
- Search Utils: 3 funciones

### Distribución por Categoría:

1. **Manipulación de Fechas** (67) - 20.1%
2. **Validaciones** (41) - 12.3%
3. **Operaciones con Arrays** (32) - 9.6%
4. **Operaciones Numéricas** (32) - 9.6%
5. **Manipulación de URLs** (30) - 9.0%
6. **Procesamiento de Imágenes** (27) - 8.1%
7. **Ordenamiento y Filtrado** (24) - 7.2%
8. **Manipulación de Strings** (22) - 6.6%
9. **Operaciones con Archivos** (21) - 6.3%
10. **Manipulación de Colores** (20) - 6.0%
11. **Operaciones con Objetos** (20) - 6.0%
12. **Búsquedas** (3) - 0.9%

Esta biblioteca ofrece una cobertura completa de utilidades para JavaScript/TypeScript, siendo especialmente fuerte en manipulación de fechas, validaciones y operaciones con arrays.
