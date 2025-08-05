# formatDate
Formatea una fecha con un patrón específico, con la configuración por defecto de FormatDateOptions = { timezone: 'Europe/Madrid', locale: 'es-ES'}

## Formatos soportados

Se soportan siguentes formatos basados en el estándar Moment.js / Day.js 

const date = new Date("2025-08-04T08:49:29.773Z");

| Formato | Significado               | Ejemplo       |
|---------|---------------------------|---------------|
| YYYY    | Año completo                | 2025 |
| YY      | Año corto                   | 25 |
| MMMM    | Mes completo                | agosto |
| MMM     | Mes corto                   | ago |
| MM      | Mes en números              | 08 |
| DD      | Día                         | 04 |
| dddd    | Día de semana completo      | lunes |
| ddd     | Día de semana corto         | lun |
| HH      | Hora (24h)                  | 08 |
| hh      | Hora (12h)                  | 08 |
| mm      | Minutos                     | 49 |
| ss      | Segundos                    | 29 |
| sss     | Milisegundos                | 773 |
| A       | AM/PM                       | AM |
| a       | am/pm                       | am |
| X       | Timestamp Unix              | 1754297369 |
| x       | Timestamp JavaScript        | 1754297369773 |
| ISO_8601 | El estándar ISO 8601       | 2025-08-04T08:49:29Z |

> **Nota**: También puedes usar template literals con texto literal entre corchetes `[texto]` para crear formatos personalizados que combinen texto con los formatos de fecha y hora.

| Formato | Ejemplo |
|---------|---------|
| `[Hoy es] dddd[,] DD [de] MMMM` | Hoy es lunes, 23 de agosto |



Ejemplo
```js
import { formatDate } from 'complete-js-utils';

// Formatear fechas
const date = new Date('2023-07-09');
const result1 = formatDate(date, 'DD/MM/YYYY'); // '09/07/2023'
const result2 = formatDate(date, 'YYYY-MM-DD'); // '2023-07-09'
const result3 = formatDate(date, 'MM-DD-YYYY'); // '07-09-2023'
const result4 = formatDate(date, 'DD.MM.YYYY'); // '09.07.2023'
const result5 = formatDate(date, '[Hoy es] dddd[,] DD [de] MMMM'); // Hoy es domingo, 09 de julio

```

## Ejemplos con zonas horarias de España

### UTC+2 (CEST) - Horario de verano
Activo en España entre el último domingo de marzo y el último domingo de octubre.

```js
import { formatDate } from 'complete-js-utils';

const date = new Date('2023-08-23T16:13:37.100+02:00');
```

| Formato | UTC+2 (CEST) | UTC | Diferencia |
|---------|---------------|-----|------------|
| `YYYY-MM-DD` | 2023-08-23 | 2023-08-23 | 0 días |
| `DD/MM/YYYY` | 23/08/2023 | 23/08/2023 | 0 días |
| `MMMM DD YYYY` | August 23 2023 | August 23 2023 | 0 días |
| `HH:mm:ss` | 16:13:37 | 14:13:37 | +2 horas |
| `hh:mm A` | 04:13 PM | 02:13 PM | +2 horas |
| `sss` | 100 | 100 | 0 ms |
| `X` (timestamp segundos) | 1692800017 | 1692800017 | 0 segundos |
| `x` (timestamp ms) | 1692800017100 | 1692800017100 | 0 ms |
| `ISO_8601` | 2023-08-23T14:13:37.100Z | 2023-08-23T14:13:37.100Z | 0 ms |

**Template literals:**
| Formato | UTC+2 (CEST) |
|---------|---------------|
| `[Current time is] HH:mm:ss` | Current time is 16:13:37 |
| `[Time:] hh:mm A` | Time: 04:13 PM |
| `HH:mm:ss [UTC+2]` | 16:13:37 UTC+2 |

### UTC+1 (CET) - Horario de invierno
Activo en España entre el último domingo de octubre y el último domingo de marzo.

```js
import { formatDate } from 'complete-js-utils';

const date = new Date('2023-12-15T16:13:37.100+01:00');
```

| Formato | UTC+1 (CET) | UTC | Diferencia |
|---------|--------------|-----|------------|
| `YYYY-MM-DD` | 2023-12-15 | 2023-12-15 | 0 días |
| `DD/MM/YYYY` | 15/12/2023 | 15/12/2023 | 0 días |
| `MMMM DD YYYY` | December 15 2023 | December 15 2023 | 0 días |
| `HH:mm:ss` | 16:13:37 | 15:13:37 | +1 hora |
| `hh:mm A` | 04:13 PM | 03:13 PM | +1 hora |
| `sss` | 100 | 100 | 0 ms |
| `X` (timestamp segundos) | 1702653217 | 1702653217 | 0 segundos |
| `x` (timestamp ms) | 1702653217100 | 1702653217100 | 0 ms |
| `ISO_8601` | 2023-12-15T15:13:37.100Z | 2023-12-15T15:13:37.100Z | 0 ms |

## Personalización

### Locales

Puedes personalizar el idioma de los meses y días usando diferentes locales:

```js
import { createDateFormatter } from 'complete-js-utils';

const date = new Date('2023-08-23T16:13:37.100Z');

// Español (España)
const formatDate_ES = createDateFormatter({locale: "es-ES", timezone: "Europe/Madrid"});

// Inglés (Estados Unidos)
const formatDate_EN = createDateFormatter({locale: "en-US", timezone: "Europe/Madrid"});
```

| Formato | es-ES | en-US |
|---------|-------|-------|
| `MMMM DD YYYY` | agosto 23 2023 | August 23 2023 |
| `MMM DD YYYY` | ago 23 2023 | Aug 23 2023 |
| `dddd DD MMMM YYYY` | miércoles 23 agosto 2023 | Wednesday 23 August 2023 |
| `ddd DD MMM YYYY` | mié 23 ago 2023 | Wed 23 Aug 2023 |
| `[Hoy es] dddd[,] DD [de] MMMM` | Hoy es miércoles, 23 de agosto | Hoy es miércoles, 23 de agosto |
| `[Today is the] DD[th] [of] MMMM` | Today is the 23th of agosto | Today is the 23th of August |


### Timezone

Puedes especificar diferentes zonas horarias para obtener la hora local:

```js
import { createDateFormatter } from 'complete-js-utils';

const date = new Date('2023-08-23T16:13:37.100Z');

// Madrid, España (UTC+2 en verano)
const formatDate_Madrid = createDateFormatter({locale: "en-US", timezone: "Europe/Madrid"});

// Bogotá, Colombia (UTC-5)
const formatDate_Bogota = createDateFormatter({locale: "en-US", timezone: "America/Bogota"});
```

| Formato | Europe/Madrid | America/Bogota | Diferencia |
|---------|---------------|----------------|------------|
| `YYYY-MM-DD` | 2023-08-23 | 2023-08-23 | 0 días |
| `HH:mm:ss` | 18:13:37 | 11:13:37 | +7 horas |
| `hh:mm A` | 06:13 PM | 11:13 AM | +7 horas |
| `[Current time is] HH:mm:ss` | Current time is 18:13:37 | Current time is 11:13:37 | +7 horas |
| `[Time:] hh:mm A` | Time: 06:13 PM | Time: 11:13 AM | +7 horas |