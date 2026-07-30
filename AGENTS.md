# clamp-size — agent reference

SCSS utility generating CSS `clamp()` for fluid sizing. Import: `@use 'clamp-size' as clamp;`

## Functions

| Function | Signature | Returns |
|---|---|---|
| `size` | `size($min-size, $max-size: null, $min-width: null, $max-width: null)` | `rem` value or `clamp()` in `rem`/`vw` |
| `csize` | `csize($min-size, $max-size, $min-width, $max-width)` | `clamp()` in `rem`/`cqi` (container queries) |
| `px-to-rem` | `px-to-rem($px)` | single `rem` value |

Params: `$min-size`/`$max-size` are numbers, unitless or `px` (unit is discarded, treated as px count). `$min-width`/`$max-width` are a breakpoint key (string, looked up in `$breakpoints`) or a number (unitless or `px`). Omitted widths default to the smallest/largest key in `$breakpoints`.

If `$min-size > $max-size`, the result still decreases as viewport grows (direction is inverted correctly, not swapped).

Unknown breakpoint key → compile-time `@error`.

## Examples

```scss
// size(): 1 arg — px-to-rem only
.a { margin: clamp.size(16px); } // 1rem

// size(): 2 args — fluid between default smallest/largest breakpoint
.b { font-size: clamp.size(16px, 24px); }

// size(): 4 args — fluid between named breakpoints
.c { font-size: clamp.size(16px, 24px, 'sm', 'lg'); }
// -> clamp(1rem, 0.3076923077rem + 1.9230769231vw, 1.5rem)

// size(): numeric widths instead of breakpoint keys
.d { font-size: clamp.size(10px, 20px, 360px, 1400px); }

// size(): inverted (min > max) — still positive, shrinks as viewport grows
.e { font-size: clamp.size(24px, 16px, 'sm', 'lg'); }

// csize(): container-query units, numeric widths required
.f { width: clamp.csize(16px, 24px, 360px, 1400px); }
// -> clamp(1rem, 0.8269230769rem + 0.7692307692cqi, 1.5rem)

// px-to-rem(): plain conversion
.g { padding: clamp.px-to-rem(8px); } // 0.5rem
```

## Configuration

```scss
@use 'clamp-size' as clamp with (
  $breakpoints: ('mobile': 360, 'tablet': 768, 'desktop': 1024),
  $base-rem-size: 16
);
```

`$breakpoints`: map of key → unitless px number, used by breakpoint-key lookups in `size()`.
`$base-rem-size`: unitless number, base used by `px-to-rem()`'s division.
