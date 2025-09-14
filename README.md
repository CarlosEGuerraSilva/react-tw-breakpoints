# react-tw-breakpoints

Lightweight React breakpoints, with two modes:

- Viewport: uses `matchMedia` and is global to `window`.
- Container (true per-element): uses `ResizeObserver` to measure an element and return its breakpoint.

Includes condition helpers (largerThan/lessThan/onlyAt) and is tree-shakeable.

## Installation

```sh
npm install react-tw-breakpoints
```

Peer deps: React 18/19 (DOM). Tailwind is optional if you use it for styling.

## Default breakpoints

Viewport and container share labels; you can use different sets if needed.

```ts
// src/const/breakpoints.ts
export const BreakpointEnum = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  _2xl: "1536px",
  _3xl: "1792px",
  _4xl: "2048px",
  _5xl: "2304px",
} as const;
export const BreakpointValue = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  _2xl: 1536,
  _3xl: 1792,
  _4xl: 2048,
  _5xl: 2304,
} as const;

export const BreakpointContainerEnum = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  _2xl: "1536px",
  _3xl: "1792px",
  _4xl: "2048px",
  _5xl: "2304px",
  _6xl: "2560px",
  _7xl: "2816px",
} as const;
export const BreakpointContainerValue = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  _2xl: 1536,
  _3xl: 1792,
  _4xl: 2048,
  _5xl: 2304,
  _6xl: 2560,
  _7xl: 2816,
} as const;
```

## Quick start

### 1) Viewport

```tsx
import { useBreakpoint, useBreakpointCondition } from "react-tw-breakpoints";

function Example() {
  const bp = useBreakpoint(); // 'xs' | 'sm' | ...
  const isLgUp = useBreakpointCondition({ largerThan: "lg" });
  const onlyMd = useBreakpointCondition({ onlyAt: "md" });
  return (
    <div>
      <p>Viewport BP: {bp}</p>
      {isLgUp && <span>≥ lg</span>}
      {onlyMd && <span>md only</span>}
    </div>
  );
}
```

### 2) Container (true per-element)

```tsx
import { useRef } from "react";
import { useContainerBreakpoint } from "react-tw-breakpoints";

function Card() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useContainerBreakpoint(ref); // based on the element width
  return (
    <div ref={ref} style={{ width: "100%" }}>
      {bp === "xs" && <OneCol />}
      {bp === "md" && <TwoCols />}
      {bp === "lg" && <ThreeCols />}
    </div>
  );
}
```

## API

### useBreakpoint(): StaticBreakpoint

- Returns the active viewport label.
- Internally uses a store with deduplicated `matchMedia` and `useSyncExternalStore`.

### useBreakpointCondition(opts): boolean

- `opts`: `{ largerThan?: BP; lessThan?: BP; onlyAt?: BP }` (can be combined; `onlyAt` takes precedence)
- Evaluates the current viewport without duplicate listeners.

### useBreakpointContainer(): StaticBreakpointContainer

- Same as `useBreakpoint` but with the “container breakpoints” set, still based on viewport.
- Useful if you need two independent breakpoint systems based on `window`.

### useContainerBreakpoint(ref): StaticBreakpointContainer

- True per-element “container query”.
- Measures the referenced element width via `ResizeObserver` and maps it to a label.
- Recommended for React logic that depends on a component’s actual space.

## UI Components

These optional components are provided for convenience when styling with Tailwind.

## Container

A centered wrapper with horizontal padding and configurable max width.

Props:

- maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "full" (default: "lg")
- className?: string
- children?: React.ReactNode

Notes:

- Renders Tailwind classes: `container mx-auto px-2` plus a corresponding `max-w-*`.
- For `8xl` and `9xl`, fixed widths are used: `max-w-[1600px]`, `max-w-[1800px]`.

Examples:

```tsx
import { Container } from "react-tw-breakpoints";

export function Page() {
  return (
    <Container maxWidth="xl">
      <h1>Title</h1>
      <p>Content</p>
    </Container>
  );
}
```

```tsx
// Full-bleed but centered content with custom styles
<Container maxWidth="full" className="bg-white/80 backdrop-blur py-6">
  <Article />
</Container>
```

```tsx
// Extra wide marketing page
<Container maxWidth="8xl">
  <Hero />
</Container>
```

## Grid (inspired by MUI Grid v2)

A 12‑column CSS grid built with Tailwind utilities. Works as either:

- container = true → grid container (`grid grid-cols-12`) with optional responsive gaps
- container = false → grid item that sets its `col-span-*` responsively

Props:

- container?: boolean (default: false)
- gap?: number | { xs?: n; sm?: n; md?: n; lg?: n; xl?: n; "2xl"?: n }
  - Allowed gap values: 0,1,2,3,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96
- size?: number | { xs?: 1..12; sm?: 1..12; md?: 1..12; lg?: 1..12; xl?: 1..12; "2xl"?: 1..12 }
  - When omitted on items, defaults to 12 (full row)
- className?: string
- children: React.ReactNode

Notes:

- `xs` maps to the base class without a prefix; other breakpoints use `sm:`, `md:`, etc.
- This is not a 1:1 clone of MUI v2 Grid, but aims for a similar ergonomics.

Examples:

```tsx
import { Grid } from "react-tw-breakpoints";

export function Cards() {
  return (
    <Grid container gap={{ xs: 4, md: 8 }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className="h-40 bg-slate-100" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className="h-40 bg-slate-100" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className="h-40 bg-slate-100" />
      </Grid>
    </Grid>
  );
}
```

```tsx
// Mixed: numeric and responsive props
<Grid container gap={6} className="mb-6">
  <Grid size={12}>
    <Header />
  </Grid>
  <Grid size={{ xs: 12, md: 8 }}>
    <Main />
  </Grid>
  <Grid size={{ xs: 12, md: 4 }}>
    <Sidebar />
  </Grid>
  <Grid size={12}>
    <Footer />
  </Grid>
</Grid>
```

```tsx
// Nested grids
<Grid container gap={{ xs: 4, lg: 12 }}>
  <Grid size={12}>
    <Grid container gap={4}>
      <Grid size={{ xs: 6, md: 3 }}>
        <Tile />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Tile />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Tile />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <Tile />
      </Grid>
    </Grid>
  </Grid>
</Grid>
```

Tailwind safelist tip (required if classes are generated from JS props):

- If you consume this library inside an app that purges CSS, safelist the grid classes used by dynamic props:

```js
// tailwind.config.js
const gapValues = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
];
const colValues = Array.from({ length: 12 }, (_, i) => i + 1);
const bps = ["sm", "md", "lg", "xl", "2xl"];

module.exports = {
  // ...
  safelist: [
    ...colValues.map((n) => `col-span-${n}`),
    ...bps.flatMap((bp) => colValues.map((n) => `${bp}:col-span-${n}`)),
    ...gapValues.map((n) => `gap-${n}`),
    ...bps.flatMap((bp) => gapValues.map((n) => `${bp}:gap-${n}`)),
  ],
};
```

## Tailwind and CSS @container (styles without JS)

For container‑based responsive styles, use native CSS `@container`.

1. Mark the container:

```css
.card {
  container-type: inline-size; /* optional: container-name: card; */
}
```

With Tailwind v4 (arbitrary properties):

```html
<div class="[container-type:inline-size] card">
  <div class="content">...</div>
  <!-- now you can use @container rules in CSS -->
</div>
```

2. Rules by container width:

```css
.card .content {
  display: block;
}

@container (width >= 640px) {
  .card .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container (width >= 1024px) {
  .card .content {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

3. Useful container units (no breakpoints):

```css
.hero {
  padding-inline: 6cqw;
}
```

Combine: use `@container` for styles and `useContainerBreakpoint` only when you need render logic.

## SSR and StrictMode

- Hooks use `useSyncExternalStore` for safe subscriptions.
- In SSR they return base values (`xs` or `false`) and hydrate on the client.
- No duplicate listeners in StrictMode.

## Compatibility

- `matchMedia`: all modern browsers.
- `ResizeObserver`: Chrome/Edge 64+, Safari 13.4+, Firefox 69+.
- `@container` CSS: Chrome/Edge 105+, Safari 16+, Firefox 110+.

## FAQ

- Why two kinds of “container breakpoints”?

  - `useBreakpointContainer` uses viewport with a different label set (useful if you want two global grids).
  - `useContainerBreakpoint` is true per element.

- Can I change breakpoints?

  - Yes, edit `src/const/breakpoints.ts` and rebuild the package.

- Tree‑shaking?
  - Yes. `package.json` exports ESM with `sideEffects: false`. Import only what you use.

## Development and publishing

This package uses a GitHub Actions workflow to publish to NPM.

### For maintainers

1. Automatic publishing: The package is published to NPM when you create a GitHub release.

2. Requirements:

- The `package.json` version must match the release tag (e.g., tag `v1.2.3` requires `"version": "1.2.3"`).
- Configure the `NPM_TOKEN` secret in the repository with a valid NPM token.

3. Process:

```bash
# 1. Bump version
npm version patch|minor|major

# 2. Push tags
git push origin --tags

# 3. Create a GitHub release from the tag
# 4. The workflow will run automatically
```

4. Manual publish: It can also be triggered from the "Actions" tab on GitHub.

## License

MIT
