# Helpers API Reference

This document provides detailed information about helper functions available in `react-tw-breakpoints`.

## Table of Contents

- [getCurrentBreakpoint](#getcurrentbreakpoint)
- [getMediaQuery](#getmediaquery)

---

## getCurrentBreakpoint

Synchronously get the current viewport breakpoint without using a hook.

**Signature:**

```typescript
function getCurrentBreakpoint(): StaticBreakpoint;
```

**Returns:**

- `StaticBreakpoint`: The current active viewport breakpoint

**Features:**

- Synchronous function (not a hook)
- Can be called outside of React components
- SSR-safe: returns `'xs'` on the server
- Uses cached media queries internally

**Example:**

```tsx
import { getCurrentBreakpoint } from 'react-tw-breakpoints';

const breakpoint = getCurrentBreakpoint();
console.log('Current breakpoint:', breakpoint);

const isMobile = getCurrentBreakpoint() === 'xs' || getCurrentBreakpoint() === 'sm';
```

**Use in event handlers:**

```tsx
function handleResize() {
  const bp = getCurrentBreakpoint();
  console.log('Resized to:', bp);

  if (bp === 'lg' || bp === 'xl') {
    loadDesktopAssets();
  }
}

window.addEventListener('resize', handleResize);
```

**Use in utility functions:**

```tsx
import { getCurrentBreakpoint } from 'react-tw-breakpoints';

export function getOptimalImageSize(): 'small' | 'medium' | 'large' {
  const bp = getCurrentBreakpoint();

  if (bp === 'xs' || bp === 'sm') return 'small';
  if (bp === 'md' || bp === 'lg') return 'medium';
  return 'large';
}
```

**When to use:**

- In non-React code (utility functions, event handlers)
- For one-time synchronous checks
- In initialization code before component mount
- When you need breakpoint info outside the React lifecycle

**When NOT to use:**

- Inside React components for reactive updates (use `useBreakpoint` instead)
- For values that need to update on resize (use hooks)

**Performance notes:**

- This function doesn't subscribe to changes
- It performs a synchronous check of all breakpoints
- Use hooks for reactive behavior in components

---

## getMediaQuery

Get or create a cached `MediaQueryList` for a given query string.

**Signature:**

```typescript
function getMediaQuery(query: string): MediaQueryList;
```

**Parameters:**

- `query`: Media query string (e.g., `"(min-width: 768px)"`)

**Returns:**

- `MediaQueryList`: Browser MediaQueryList object or SSR-safe mock

**Features:**

- Caches MediaQueryList objects to avoid recreating them
- SSR-safe: returns a mock object on the server
- Reusable for custom media queries beyond breakpoints

**Example:**

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

const mql = getMediaQuery('(min-width: 768px)');
console.log('Matches:', mql.matches);

mql.addEventListener('change', (e) => {
  console.log('Media query changed:', e.matches);
});
```

**Custom media queries:**

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

const isDarkMode = getMediaQuery('(prefers-color-scheme: dark)');
const isPortrait = getMediaQuery('(orientation: portrait)');
const isPrint = getMediaQuery('print');

console.log('Dark mode:', isDarkMode.matches);
console.log('Portrait:', isPortrait.matches);
console.log('Print media:', isPrint.matches);
```

**Advanced usage with listeners:**

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

function setupResponsiveListener() {
  const mql = getMediaQuery('(min-width: 1024px)');

  const handler = (e: MediaQueryListEvent) => {
    if (e.matches) {
      console.log('Desktop mode activated');
      enableDesktopFeatures();
    } else {
      console.log('Mobile mode activated');
      enableMobileFeatures();
    }
  };

  mql.addEventListener('change', handler);

  return () => mql.removeEventListener('change', handler);
}
```

**When to use:**

- For custom media queries not covered by breakpoints
- When building custom responsive utilities
- For detecting device capabilities (color scheme, orientation, hover support)
- When you need direct access to the MediaQueryList API

**Cache behavior:**

The function maintains an internal cache, so calling it multiple times with the same query returns the same `MediaQueryList` instance:

```tsx
const mql1 = getMediaQuery('(min-width: 768px)');
const mql2 = getMediaQuery('(min-width: 768px)');

console.log(mql1 === mql2); // true
```

**SSR behavior:**

On the server, returns a mock object with:

```typescript
{
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}
```

---

## Advanced Examples

### Custom Breakpoint System

If you want to create your own breakpoint system without modifying the package:

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

const customBreakpoints = {
  mobile: '(max-width: 599px)',
  tablet: '(min-width: 600px) and (max-width: 1199px)',
  desktop: '(min-width: 1200px)',
};

function getCurrentDevice(): 'mobile' | 'tablet' | 'desktop' {
  if (getMediaQuery(customBreakpoints.desktop).matches) return 'desktop';
  if (getMediaQuery(customBreakpoints.tablet).matches) return 'tablet';
  return 'mobile';
}
```

### Detecting Device Capabilities

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

export const deviceCapabilities = {
  hasHover: () => getMediaQuery('(hover: hover)').matches,
  hasFinePointer: () => getMediaQuery('(pointer: fine)').matches,
  prefersReducedMotion: () => getMediaQuery('(prefers-reduced-motion: reduce)').matches,
  prefersDarkMode: () => getMediaQuery('(prefers-color-scheme: dark)').matches,
  isHighDensity: () => getMediaQuery('(min-resolution: 2dppx)').matches,
};

if (deviceCapabilities.prefersReducedMotion()) {
  disableAnimations();
}
```

### Landscape/Portrait Detection

```tsx
import { getMediaQuery } from 'react-tw-breakpoints';

export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(
    () => getMediaQuery('(orientation: portrait)').matches,
  );

  useEffect(() => {
    const mql = getMediaQuery('(orientation: portrait)');
    const handler = (e: MediaQueryListEvent) => setIsPortrait(e.matches);

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isPortrait;
}
```

---

## TypeScript Types

```typescript
type StaticBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '_2xl' | '_3xl' | '_4xl' | '_5xl';

interface MediaQueryList extends EventTarget {
  readonly matches: boolean;
  readonly media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
  addEventListener(type: 'change', listener: (ev: MediaQueryListEvent) => void): void;
  removeEventListener(type: 'change', listener: (ev: MediaQueryListEvent) => void): void;
}
```

---

## Best Practices

1. **Use hooks in components**: Prefer `useBreakpoint` over `getCurrentBreakpoint` in React components for reactive updates.

2. **Cache media queries**: `getMediaQuery` automatically caches queries, so don't wrap it in useMemo.

3. **Clean up listeners**: Always remove event listeners when they're no longer needed.

4. **SSR considerations**: Both helpers are SSR-safe and will work correctly on the server.

5. **Custom queries**: Use `getMediaQuery` for any media query, not just breakpoints.

---

## Related

- [Hooks API Reference](./hooks.md)
- [SSR Guide](../guides/ssr.md)
- [Advanced Patterns](../examples/advanced-patterns.md)
