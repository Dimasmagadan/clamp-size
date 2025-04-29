# Clamp Size SCSS Utility

A lightweight SCSS utility for generating responsive sizes using the `clamp()` function. This package includes helper functions for dynamic sizing based on breakpoints or custom values.

Resulted `clamp()` would have rem, not px units. Please use `csize()` function to use `cqi` units to work with container queries.

## Installation

Install the package via npm:

```bash
npm install clamp-size
```

## Usage

Import the SCSS file into your project:

```scss
@use 'clamp-size/src/clamp' as clamp;
```

Or add in your scss file:

```scss
@forward 'clamp-size';
```

### Functions

#### `size($a, $b: null, $c: null, $d: null)`

Generates a responsive size using the `clamp()` function. This function works with both breakpoints (defined in the `$breakpoints` map) and custom numeric values.

- **Parameters**:
  - `$a`: Minimum size (required).
  - `$b`: Maximum size (optional).
  - `$c`: Minimum width (optional, can be a breakpoint key or a numeric value).
  - `$d`: Maximum width (optional, can be a breakpoint key or a numeric value).

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

#### `csize($a, $b, $c, $d)`

Similar to `size`, but uses container query units (`cqi`) instead of `vw`. This function is better suited for container queries and works best with numeric values for widths.

- **Parameters**:
  - `$a`: Minimum size (required).
  - `$b`: Maximum size (required).
  - `$c`: Minimum width (required, should be a numeric value).
  - `$d`: Maximum width (required, should be a numeric value).

- **Example**:

```scss
.my-class {
  font-size: clamp.csize(16px, 24px, 360px, 1400px);
}
```

#### `px-to-rem($px)`

Converts a pixel value to rem based on the global base size.

- **Example**:

```scss
.my-class {
  margin: clamp.px-to-rem(16px);
}
```

### Configuration

#### Breakpoints

The utility uses a default `$breakpoints` map:

```scss
$breakpoints: (
  'xs': 320,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200
) !default;
```

You can override this map in your project:

```scss
$breakpoints: (
  'mobile': 360,
  'tablet': 768,
  'desktop': 1024
);
```

#### Base Rem Size

Define a `$base-rem-size` variable in your project to set the base size for `px-to-rem` conversions:

```scss
$base-rem-size: 16;
```

### License

This project is licensed under the MIT License.