![assets/project.svg](https://raw.githubusercontent.com/CarlosEGuerraSilva/react-tw-breakpoints/refs/heads/main/assets/project.svg)

<p align="center">
useBreakpoint hooks and tw-based components
</p>

<div style="display: grid; place-items: center;">

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/CarlosEGuerraSilva/react-tw-breakpoints)
<a href="https://bundlejs.com/?q=react-tw-breakpoints%40latest&treeshake=%5B*%5D" target="\_parent">
<img alt="" src="https://deno.bundlejs.com/badge?q=react-tw-breakpoints@latest&treeshake=[*]" />
</a><a href="https://www.npmjs.com/package/react-tw-breakpoints" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/react-tw-breakpoints.svg" />
</a><a href="https://twitter.com/carlosedgusi" target="\_parent">
<img alt="" src="https://img.shields.io/twitter/follow/carlosedgusi.svg?style=social&label=Follow" />
</a>

</div>

Optimized SSR-friendly React hooks to get the current breakpoint based on:

- Viewport: uses `matchMedia` and is global to `window`.
- Container (true per-element): uses `ResizeObserver` to measure an element and return its breakpoint.

Includes condition helpers (largerThan/lessThan/onlyAt) and is tree-shakeable.

## Installation

```sh
npm install react-tw-breakpoints
```

Peer deps: React 18/19 (DOM).
Tailwind is NOT required for the hooks. If you use the experimental UI components (`Container`, `Grid`), Tailwind CSS is required and you must configure a safelist so their dynamic classes are included. See docs/guides/tailwind-safelist.md.

## Documentation

- [API Reference](docs/api/api.md)
  - [Hooks](docs/api/hooks.md)
  - [Helpers](docs/api/helpers.md)
  - [Components](docs/api/components.md)
- [Guides](docs/guides/guides.md)
  - [Tailwind Safelist Configuration](docs/guides/tailwind-safelist.md)
  - [CSS Container Queries](docs/guides/css-container-queries.md)
  - [SSR and Hydration](docs/guides/ssr.md)
- [Examples](docs/examples/examples.md)
  - [Viewport Hooks](docs/examples/hooks/viewport-hooks.md)
  - [Container Hooks](docs/examples/hooks/container-hooks.md)
  - [Components](docs/examples/components/container.md)

## Breakpoints

The library uses Tailwind-aligned breakpoints: `xs` (0px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `_2xl` (1536px), [and more](docs/configuration/breakpoints.md).

Note:

- Hook/constant identifiers use a leading underscore for sizes starting with a number (e.g. `_2xl`, `_3xl`) because TypeScript identifiers cannot start with digits. See [`BreakpointEnum`](src/const/breakpoints.ts).
- Tailwind class names and component props use the native Tailwind form without underscore (e.g. `2xl`). See [`Grid`](src/components/Grid.tsx).

Scopes:

- Viewport breakpoints are defined up to `_5xl`. See [`BREAKPOINT_ORDER`](src/const/breakpoints.ts).
- Container breakpoints extend up to `_7xl`. See [`CONTAINER_BREAKPOINT_ORDER`](src/const/breakpoints.ts).

## Quick start

### 1) Viewport

```tsx
import { useBreakpoint, useBreakpointCondition } from 'react-tw-breakpoints';

function Example() {
  const bp = useBreakpoint(); // 'xs' | 'sm' | ...
  const isLgUp = useBreakpointCondition({ largerThan: 'lg' });
  const onlyMd = useBreakpointCondition({ onlyAt: 'md' });
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
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function Card() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useContainerBreakpoint(ref); // based on the element width
  return (
    <div ref={ref} style={{ width: '100%' }}>
      {bp === 'xs' && <OneCol />}
      {bp === 'md' && <TwoCols />}
      {bp === 'lg' && <ThreeCols />}
    </div>
  );
}
```

## API Overview

### Hooks

**`useBreakpoint()`** - Returns the active viewport breakpoint label.

**`useBreakpointCondition(opts)`** - Evaluates viewport conditions (`largerThan`, `lessThan`, `onlyAt`).

**`useBreakpointContainer()`** - Container breakpoint set (viewport-based).

**`useContainerBreakpoint(ref)`** - True per-element breakpoint using `ResizeObserver`.

**Helper Hooks**: `useBreakpointUp`, `useBreakpointDown`, `useBreakpointOnly`, `useBreakpointBetween`

[Hooks API Reference](docs/api/hooks.md)

### Helpers

**`getCurrentBreakpoint()`** - Synchronously get current breakpoint (SSR-safe).

**`getMediaQuery(query)`** - Get cached `MediaQueryList` for custom queries.

[Helpers API Reference](docs/api/helpers.md)

### Components (Experimental)

> [!CAUTION]
> These components are experimental and may change their API or functionality. They are subject to discussion and improvement proposals, so breaking changes or even removal may occur. Use them at your own risk.

There are some basic layout components to use in your application. These are independent of the hooks in this library, so they are not affected by changes to the API for hooks, helpers, etc.

### Why?

Many UI libraries don't have basic layout components. You probably need something simple and straightforward like a `<Container>`, and you may not want to have to define it in every project you work on if you use the same UI library or another one that doesn't have one.

- **`Container`** - Centered wrapper with max-width constraints.

- **`Grid`** - 12-column responsive grid system.

[Components API Reference](docs/api/components.md)

## Quick Examples

### Responsive Navigation

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function Navigation() {
  const isMobile = useBreakpointCondition({ lessThan: 'lg' });

  return <nav>{isMobile ? <MobileMenu /> : <DesktopMenu />}</nav>;
}
```

### Adaptive Card

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function Card() {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <div ref={cardRef}>
      {breakpoint === 'xs' && <CompactLayout />}
      {breakpoint === 'lg' && <ExpandedLayout />}
    </div>
  );
}
```

📚 [**More Examples**](docs/examples/examples.md)

## Advanced Topics

### CSS @container Queries

For style-based container queries without JavaScript, use native CSS `@container`. [Learn more](docs/guides/css-container-queries.md).

### SSR and StrictMode

Hooks use `useSyncExternalStore` for safe subscriptions. In SSR they return base values (`xs` or `false`) and hydrate on the client. No duplicate listeners in StrictMode.

### Browser Compatibility

- `matchMedia`: All modern browsers
- `ResizeObserver`: Chrome/Edge 64+, Safari 13.1+, Firefox 69+
- CSS `@container`: Chrome/Edge 105+, Safari 16+, Firefox 110+

## FAQ

- Why two kinds of “container breakpoints”?
  - `useBreakpointContainer` uses viewport with a different label set (useful if you want two global grids).
  - `useContainerBreakpoint` is true per element.

- Can I change breakpoints?
  - Yes, edit `src/const/breakpoints.ts` and rebuild the package.

- Tree‑shaking?
  - Yes. `package.json` exports ESM with `sideEffects: false`. Import only what you use.

## Want to contribute?

Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE)
