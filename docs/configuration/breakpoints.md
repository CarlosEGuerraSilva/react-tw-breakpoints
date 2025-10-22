# Breakpoint Configuration

This document describes the default breakpoint configuration used by `react-tw-breakpoints`.

## Default Viewport Breakpoints

Viewport breakpoints are used by `useBreakpoint`, `useBreakpointCondition`, and helper hooks.

```typescript
export const BreakpointEnum = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  _2xl: '1536px',
  _3xl: '1792px',
  _4xl: '2048px',
  _5xl: '2304px',
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
```

### Breakpoint Table

| Label  | Min Width | Typical Device      | Tailwind Equivalent |
| ------ | --------- | ------------------- | ------------------- |
| `xs`   | 0px       | Mobile portrait     | (default)           |
| `sm`   | 640px     | Mobile landscape    | `sm:`               |
| `md`   | 768px     | Tablet              | `md:`               |
| `lg`   | 1024px    | Desktop             | `lg:`               |
| `xl`   | 1280px    | Large desktop       | `xl:`               |
| `_2xl` | 1536px    | Extra large         | `2xl:`              |
| `_3xl` | 1792px    | Ultra wide          | -                   |
| `_4xl` | 2048px    | Very large displays | -                   |
| `_5xl` | 2304px    | Extreme displays    | -                   |

## Default Container Breakpoints

Container breakpoints are used by `useBreakpointContainer`, `useBreakpointContainerCondition`, and `useContainerBreakpoint`.

```typescript
export const BreakpointContainerEnum = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  _2xl: '1536px',
  _3xl: '1792px',
  _4xl: '2048px',
  _5xl: '2304px',
  _6xl: '2560px',
  _7xl: '2816px',
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

### Container Breakpoint Table

| Label  | Min Width | Use Case              |
| ------ | --------- | --------------------- |
| `xs`   | 0px       | Very small containers |
| `sm`   | 640px     | Small containers      |
| `md`   | 768px     | Medium containers     |
| `lg`   | 1024px    | Large containers      |
| `xl`   | 1280px    | Extra large           |
| `_2xl` | 1536px    | 2X large              |
| `_3xl` | 1792px    | 3X large              |
| `_4xl` | 2048px    | 4X large              |
| `_5xl` | 2304px    | 5X large              |
| `_6xl` | 2560px    | 6X large              |
| `_7xl` | 2816px    | 7X large (maximum)    |

## Why Two Breakpoint Systems?

The library provides two breakpoint systems for flexibility:

### Viewport Breakpoints

- **Used by**: `useBreakpoint`, `useBreakpointCondition`, helper hooks
- **Based on**: Browser viewport (`window`)
- **Range**: `xs` to `_5xl` (9 breakpoints)
- **Purpose**: Global responsive behavior

### Container Breakpoints

- **Used by**: `useBreakpointContainer`, `useBreakpointContainerCondition`, `useContainerBreakpoint`
- **Based on**: Either viewport (for `useBreakpointContainer`) or element size (for `useContainerBreakpoint`)
- **Range**: `xs` to `_7xl` (11 breakpoints)
- **Purpose**: Fine-grained control, especially for very large displays or per-element responsiveness

## Alignment with Tailwind CSS

The breakpoint values align with Tailwind CSS default breakpoints:

| react-tw-breakpoints | Tailwind CSS      |
| -------------------- | ----------------- |
| `xs: 0px`            | (default)         |
| `sm: 640px`          | `sm: 640px` ✅    |
| `md: 768px`          | `md: 768px` ✅    |
| `lg: 1024px`         | `lg: 1024px` ✅   |
| `xl: 1280px`         | `xl: 1280px` ✅   |
| `_2xl: 1536px`       | `2xl: 1536px` ✅  |
| `_3xl: 1792px`       | (not in Tailwind) |
| `_4xl: 2048px`       | (not in Tailwind) |
| `_5xl: 2304px`       | (not in Tailwind) |

The extra breakpoints (`_3xl`, `_4xl`, `_5xl`, `_6xl`, `_7xl`) provide granular control for ultra-wide displays.

## Naming Convention

The underscore prefix (`_2xl`, `_3xl`, etc.) is used because JavaScript identifiers cannot start with a number.

```typescript
// ❌ Invalid JavaScript
const breakpoints = {
  2xl: "1536px" // Syntax error
};

// ✅ Valid
const breakpoints = {
  _2xl: "1536px"
};
```

When using with TypeScript, the labels are strongly typed:

```typescript
type StaticBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '_2xl' | '_3xl' | '_4xl' | '_5xl';
```

## Customizing Breakpoints

> [!NOTE]
> This library does not currently support runtime breakpoint customization. To use custom breakpoints, you'll need to fork the project and modify `src/const/breakpoints.ts`.

If you need custom breakpoints:

1. Fork the repository
2. Edit `src/const/breakpoints.ts`
3. Update both `BreakpointEnum` and `BreakpointValue`
4. Rebuild: `npm run build`
5. Use your forked version

**Example custom breakpoints:**

```typescript
export const BreakpointEnum = {
  mobile: '0px',
  tablet: '600px',
  desktop: '1200px',
  ultrawide: '1920px',
} as const;

export const BreakpointValue = {
  mobile: 0,
  tablet: 600,
  desktop: 1200,
  ultrawide: 1920,
} as const;
```

## TypeScript Types

The breakpoint labels are exported as TypeScript types:

```typescript
import type { StaticBreakpoint, StaticBreakpointContainer } from 'react-tw-breakpoints';

const bp: StaticBreakpoint = 'lg'; // Valid
const bp2: StaticBreakpoint = 'invalid'; // Type error

const containerBp: StaticBreakpointContainer = '_6xl'; // Valid
```

## Usage Examples

### With Viewport Hooks

```typescript
import { useBreakpoint } from 'react-tw-breakpoints';

function MyComponent() {
  const bp = useBreakpoint();

  if (bp === 'xs' || bp === 'sm') {
    return <MobileView />;
  }

  if (bp === 'md') {
    return <TabletView />;
  }

  return <DesktopView />;
}
```

### With Container Hooks

```typescript
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function AdaptiveCard() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useContainerBreakpoint(ref);

  return (
    <div ref={ref}>
      {bp === 'xs' && <CompactLayout />}
      {bp === 'md' && <NormalLayout />}
      {bp === 'lg' && <ExpandedLayout />}
      {(bp === '_6xl' || bp === '_7xl') && <UltraWideLayout />}
    </div>
  );
}
```

### With Helpers

```typescript
import { getCurrentBreakpoint } from 'react-tw-breakpoints';

const currentBp = getCurrentBreakpoint();

if (currentBp === 'lg' || currentBp === 'xl') {
  // Desktop-specific initialization
}
```

## Best Practices

1. **Mobile-first**: Start with `xs` and scale up
2. **Use semantic names**: Match breakpoints to device types in your app
3. **Consistent with Tailwind**: Keep alignment with Tailwind for easier styling
4. **Test at boundaries**: Test your app at each breakpoint threshold
5. **Document overrides**: If you customize, document your breakpoints clearly

## Related Documentation

- [Hooks API Reference](../api/hooks.md) - How to use breakpoint hooks
- [Helpers API Reference](../api/helpers.md) - Helper functions
- [Examples](../examples/examples.md) - Practical examples

---

**Source Code**: [`src/const/breakpoints.ts`](../../src/const/breakpoints.ts)
