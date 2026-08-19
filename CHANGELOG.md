# Changelog

This project follows [Semantic Versioning](https://semver.org/).

## 1.0.4

### Fixed

- `strip-unit()` (used by `px-to-rem()`, `size()`, and `csize()`) now rejects
  any unit other than unitless or `px` with a descriptive `@error`. Previously
  a value like `px-to-rem(1rem)` silently treated the `1` as a px count and
  produced a wrong result (`0.0625rem`) instead of failing.
- `dynamic-size()` now requires `$min-width < $max-width` and raises a
  descriptive `@error` otherwise. Equal or reversed width endpoints used to
  produce invalid CSS (`calc(NaN * 1rem) + calc(infinity)vw`).
- Fixed a high-severity transitive `nanoid` advisory via `npm audit fix`.

### Documentation

- README: parameter names in `size()`/`csize()`/`px-to-rem()` docs changed
  from generic `$a`/`$b`/`$c`/`$d` to their actual meaning, with accepted
  units, default-width behavior, and the new validation errors documented.
  Corrected `csize()` docs, which incorrectly implied it only accepts numeric
  widths — it accepts breakpoint keys the same way `size()` does.

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
