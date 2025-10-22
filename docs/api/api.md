# API Reference

Complete API documentation for `react-tw-breakpoints`.

## Quick Links

- [Hooks API](hooks.md) - React hooks for breakpoint detection
- [Helpers API](helpers.md) - Utility functions for breakpoint operations
- [Components API](components.md) - UI components for Tailwind CSS

## Overview

`react-tw-breakpoints` provides three categories of exports:

### 1. Hooks

React hooks for responsive behavior in components:

```tsx
import {
  useBreakpoint,
  useBreakpointCondition,
  useBreakpointContainer,
  useBreakpointContainerCondition,
  useContainerBreakpoint,
  useBreakpointUp,
  useBreakpointDown,
  useBreakpointOnly,
  useBreakpointBetween,
} from 'react-tw-breakpoints';
```

[Hooks Documentation](hooks.md)

### 2. Helpers

Utility functions for use outside React components:

```tsx
import { getCurrentBreakpoint, getMediaQuery } from 'react-tw-breakpoints';
```

[Helpers Documentation](helpers.md)

### 3. Components

Optional UI components for Tailwind CSS:

```tsx
import { Container, Grid } from 'react-tw-breakpoints';
```

[Components Documentation](components.md)

## TypeScript Support

All exports are fully typed with TypeScript. Import types as needed:

```typescript
import type {
  StaticBreakpoint,
  StaticBreakpointContainer,
  ContainerProps,
  GridProps,
} from 'react-tw-breakpoints';
```

### Type Definitions

```typescript
type StaticBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '_2xl' | '_3xl' | '_4xl' | '_5xl';

type StaticBreakpointContainer = StaticBreakpoint | '_6xl' | '_7xl';
```

## Breakpoint Values

### Viewport Breakpoints

| Label  | Min Width | Description              |
| ------ | --------- | ------------------------ |
| `xs`   | 0px       | Extra small devices      |
| `sm`   | 640px     | Small devices (phones)   |
| `md`   | 768px     | Medium devices (tablets) |
| `lg`   | 1024px    | Large devices (desktops) |
| `xl`   | 1280px    | Extra large devices      |
| `_2xl` | 1536px    | 2X large devices         |
| `_3xl` | 1792px    | 3X large devices         |
| `_4xl` | 2048px    | 4X large devices         |
| `_5xl` | 2304px    | 5X large devices         |

### Container Breakpoints

Same as viewport breakpoints, plus:

| Label  | Min Width | Description         |
| ------ | --------- | ------------------- |
| `_6xl` | 2560px    | 6X large containers |
| `_7xl` | 2816px    | 7X large containers |

## Usage Patterns

### Viewport-Based Hooks

Use when you need to respond to the browser viewport size:

```tsx
const breakpoint = useBreakpoint();
const isLarge = useBreakpointCondition({ largerThan: 'lg' });
```

### Container-Based Hooks

Use when you need to respond to an element's size:

```tsx
const cardRef = useRef(null);
const cardBreakpoint = useContainerBreakpoint(cardRef);
```

### Helper Functions

Use in non-React code or for synchronous checks:

```tsx
const currentBp = getCurrentBreakpoint();
const mql = getMediaQuery('(min-width: 768px)');
```

## Feature Comparison

| Feature           | Hooks | Helpers | Components |
| ----------------- | ----- | ------- | ---------- |
| Reactive          | ✅    | ❌      | ✅         |
| SSR-safe          | ✅    | ✅      | ✅         |
| Viewport          | ✅    | ✅      | N/A        |
| Per-element       | ✅    | ❌      | N/A        |
| Outside React     | ❌    | ✅      | ❌         |
| Tailwind required | ❌    | ❌      | ✅         |

## Performance Characteristics

- **Hooks**: Optimized with `useSyncExternalStore`, deduplicated listeners
- **Helpers**: Cached media queries, minimal overhead
- **Components**: Lightweight wrappers around Tailwind classes

## Browser Compatibility

All APIs work in modern browsers:

- Chrome/Edge 64+
- Safari 13.1+
- Firefox 69+

For older browsers, provide polyfills for:

- `matchMedia` (if targeting very old browsers)
- `ResizeObserver` (for `useContainerBreakpoint`)

## Related Documentation

- [Hooks API Reference](hooks.md) - Detailed hook documentation
- [Helpers API Reference](helpers.md) - Helper function documentation
- [Components API Reference](components.md) - Component documentation
- [Basic Usage Examples](../examples/basic-usage.md) - Practical examples
- [Advanced Patterns](../examples/advanced-patterns.md) - Advanced techniques
- [SSR Guide](../guides/ssr.md) - Server-side rendering
- [Main Documentation Index](../intro.md) - Back to main docs

---

**Need more help?** Check the [complete documentation index](../intro.md) or [open an issue](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues).
