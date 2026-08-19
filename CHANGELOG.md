# Changelog

This project follows [Semantic Versioning](https://semver.org/).

## 1.0.3

### Fixed

- Decreasing ranges (`$min-size > $max-size`) emitted
  `calc(clamp(...) * -1)`, which needs browser support for a math function
  nested inside `calc()` — a higher bar than plain `clamp()`. Now emitted as
  a single `clamp()` with ordered bounds and a negative slope instead.

## 1.0.2

### Fixed

- `px-to-rem()` produced invalid CSS units (e.g. `1pxrem`) when passed a
  px-annotated number, and `size()`/`csize()` leaked a stray `px` into the
  `vw`/`cqi` slope when sizes had units but breakpoint widths didn't. Both
  now normalize input units consistently.
- Deprecated `if()`-function syntax replaced with `@if`/`@else` to remove
  dart-sass deprecation warnings.
- `dynamic-size()` no longer calls the public `size()` function internally,
  removing a circular dependency.
- An unknown breakpoint key (e.g. `'xxl'`) now raises a clear `@error`
  instead of silently dividing by `null`.
- Added a root `_index.scss` so `@use 'clamp-size' as clamp;` resolves.

## 1.0.1 and earlier

See git history.
