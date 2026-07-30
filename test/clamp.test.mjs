import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compileString } from 'sass';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const srcDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function compile(scss) {
    return compileString(`@use 'clamp';\n${scss}`, { loadPaths: [srcDir] }).css;
}

test('px-to-rem strips units from px input', () => {
    const css = compile('.a { margin: clamp.px-to-rem(16px); }');
    assert.match(css, /margin:\s*1rem;/);
});

test('px-to-rem treats unitless input as a px count', () => {
    const css = compile('.a { margin: clamp.px-to-rem(16); }');
    assert.match(css, /margin:\s*1rem;/);
});

test('size() with px sizes and breakpoint-key widths produces valid CSS units (README example)', () => {
    const css = compile(".a { font-size: clamp.size(16px, 24px, 'sm', 'lg'); }");
    // Regression pin for the Phase 0 bug: mixing px sizes with unitless
    // breakpoint widths used to leak a stray "px" into the vw coefficient
    // (e.g. "1.9230769231pxvw"), producing invalid CSS.
    assert.doesNotMatch(css, /px(rem|vw|cqi)/);
    assert.match(css, /font-size:\s*clamp\(1rem, 0\.3076923077rem \+ 1\.9230769231vw, 1\.5rem\);/);
});

test('csize() uses cqi units', () => {
    const css = compile('.a { width: clamp.csize(16px, 24px, 360px, 1400px); }');
    assert.match(css, /width:\s*clamp\(1rem, 0\.8269230769rem \+ 0\.7692307692cqi, 1\.5rem\);/);
});

test('size() with $min-size > $max-size stays positive and shrinks as the viewport grows', () => {
    const css = compile(".a { font-size: clamp.size(24px, 16px, 'sm', 'lg'); }");
    // Evaluated by hand against the emitted clamp(): at the 'sm' (576px)
    // bound the value is 1.5rem, at the 'lg' (992px) bound it's 1rem — a
    // positive size that decreases as the viewport widens, not a min/max
    // swap.
    assert.match(
        css,
        /font-size:\s*calc\(clamp\(-1\.5rem, -2\.1923076923rem \+ 1\.9230769231vw, -1rem\) \* -1\);/
    );
});

test('unknown breakpoint key errors instead of dividing by null', () => {
    assert.throws(() => compile(".a { font-size: clamp.size(16px, 24px, 'sm', 'xxl'); }"), /unknown breakpoint 'xxl'/);
});

test('$breakpoints and $base-rem-size are configurable via @use ... with', () => {
    const css = compileString(
        `@use 'clamp' with ($breakpoints: ('mobile': 360, 'desktop': 1024), $base-rem-size: 10);
         .a { font-size: clamp.size(16px, 24px, 'mobile', 'desktop'); }`,
        { loadPaths: [srcDir] }
    ).css;
    assert.match(css, /font-size:\s*clamp\(1\.6rem, [\d.]+rem \+ [\d.]+vw, 2\.4rem\);/);
});

test('compiling produces no deprecation warnings', () => {
    let warned = false;
    compileString(`@use 'clamp';\n.a { font-size: clamp.size(16px, 24px, 'sm', 'lg'); }`, {
        loadPaths: [srcDir],
        logger: { warn: () => { warned = true; } },
    });
    assert.equal(warned, false);
});
