# clamp-size

Fluid sizes without hand-writing clamp() math.

A lightweight SCSS utility for generating responsive sizes using the `clamp()` function. This package includes helper functions for dynamic sizing based on breakpoints or custom values.

Resulted `clamp()` would have rem, not px units. Please use `csize()` function to use `cqi` units to work with container queries.

## Why not just write `clamp()` by hand?

```scss
// Hand-written: you compute the slope/intersection yourself, and
// px→rem conversion, breakpoint lookup, and direction all live in your head.
font-size: clamp(1rem, 0.3076923077rem + 1.9230769231vw, 1.5rem);

// clamp-size: breakpoints referenced by key, px auto-converted to rem,
// and size(24px, 16px, ...) inverts correctly if min > max — no hand math.
font-size: clamp.size(16px, 24px, 'sm', 'lg');
```

## Installation

Install the package via npm:

```bash
npm install clamp-size
```

## Usage

Import the package into your project:

```scss
@use 'clamp-size' as clamp;
```

### Functions

#### `size($min-size, $max-size: null, $min-width: null, $max-width: null)`

Generates a responsive size using the `clamp()` function. This function works with both breakpoints (defined in the `$breakpoints` map) and custom numeric values.

- **Parameters**:
  - `$min-size`: Size at `$min-width` (required). Unitless number or `px` — anything else is a build error.
  - `$max-size`: Size at `$max-width` (optional). Same unit rules as `$min-size`. If `$max-size` is greater than `$min-size` the value grows with the viewport; if smaller, it shrinks. May equal `$min-size` for a constant size.
  - `$min-width`: Viewport width the size ramp starts at (optional). Either a key from `$breakpoints` (e.g. `'sm'`) or a unitless/`px` number. Defaults to the **first entry** in `$breakpoints` (`'xs'` / 320 by default) — not the numerically smallest one, so an unordered custom map changes this default.
  - `$max-width`: Viewport width the size ramp ends at (optional). Same rules as `$min-width`, defaults to the **last entry** in `$breakpoints` (`'xl'` / 1200 by default). Must resolve to a value strictly greater than `$min-width`, or it's a build error.

  `$min-size`/`$max-size` are output as `rem` (converted via `$base-rem-size`) regardless of whether you passed `px` or a unitless number. `$min-width`/`$max-width` are only used as unitless pixel counts for the slope math — they never appear as `rem` in the output.

- **Example**:

Using breakpoints:

```scss
.my-class {
  font-size: clamp.size(16px, 24px, 'sm', 'lg');
}
```

Using numeric values:

```scss
.my-class {
  font-size: clamp.size(10px, 20px, 360px, 1400px);
}
```

#### `csize($min-size, $max-size, $min-width, $max-width)`

Identical to `size()` — same parameter rules, same breakpoint-key-or-number widths — except the output uses container query units (`cqi`) instead of `vw`. Unlike `size()`, all four parameters are required (no defaults).

- **Parameters**: see `size()` above; `$min-size`, `$max-size`, `$min-width`, `$max-width` all required here.

- **Example**:

```scss
.my-class {
  font-size: clamp.csize(16px, 24px, 360px, 1400px);
}
```

#### `px-to-rem($px)`

Converts a pixel value to rem based on the global base size. Accepts a unitless number or a `px` value; any other unit (e.g. `rem`, `em`, `%`) is a build error.

- **Example**:

```scss
.my-class {
  margin: clamp.px-to-rem(16px);
}
```

### Configuration

The utility uses a default `$breakpoints` map and `$base-rem-size`:

```scss
$breakpoints: (
  'xs': 320,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200
) !default;

$base-rem-size: 16 !default;
```

Both are `@use`-configurable — override them with `with (...)` on the same
statement that imports the module (this must be the first `@use` of
`clamp-size` in your build):

```scss
@use 'clamp-size' as clamp with (
  $breakpoints: (
    'mobile': 360,
    'tablet': 768,
    'desktop': 1024
  ),
  $base-rem-size: 16
);
```

### License

This project is licensed under the MIT License.