# Server-Side Rendering (SSR) and Hydration

Learn how `react-tw-breakpoints` handles server-side rendering and hydration to ensure your responsive applications work correctly in SSR frameworks like Next.js, Remix, and Gatsby.

## Overview

All hooks and components in `react-tw-breakpoints` are SSR-safe by design. They use React's `useSyncExternalStore` hook to ensure proper hydration without mismatches.

## How It Works

### Server Behavior

On the server (during SSR):

- Hooks return default/mobile-first values
- No browser APIs are accessed
- No errors or warnings are thrown

**Default Server Values:**

- `useBreakpoint()` → `'xs'`
- `useBreakpointCondition()` → `false`
- `useBreakpointContainer()` → `'xs'`
- `useBreakpointContainerCondition()` → `false`
- `useContainerBreakpoint()` → `'xs'`
- Helper hooks → `false` (except `useBreakpointOnly('xs')` → `true`)

### Client Hydration

On the client (after hydration):

1. Initial render uses server values (prevents hydration mismatch)
2. Effects run and subscribe to media queries / resize observers
3. State updates to reflect actual viewport/container size
4. Component re-renders with correct values

This two-phase approach ensures:

- No hydration mismatches
- Progressive enhancement
- Mobile-first default

## Usage in SSR Frameworks

### Next.js (App Router)

```tsx
'use client';

import { useBreakpoint } from 'react-tw-breakpoints';

export function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {breakpoint === 'lg' && <DesktopFeature />}
    </div>
  );
}
```

**Key Points:**

- Mark components using hooks with `'use client'`
- Server renders with `'xs'`
- Hydrates with actual value
- No hydration warnings

### Next.js (Pages Router)

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

export default function Page() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Breakpoint: {breakpoint}</p>
    </div>
  );
}
```

Works out of the box, no special configuration needed.

### Remix

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

export default function Route() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Breakpoint: {breakpoint}</p>
    </div>
  );
}
```

### Gatsby

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

const Page = () => {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Breakpoint: {breakpoint}</p>
    </div>
  );
};

export default Page;
```

## Avoiding Layout Shift

The default SSR values (`'xs'`) can cause layout shift when hydrating on desktop. Here are strategies to minimize this:

### 1. CSS-First Approach

Use CSS media queries for layout, JavaScript for logic:

```tsx
function Sidebar() {
  const breakpoint = useBreakpoint();

  return (
    <aside className="w-full md:w-64">
      {/* CSS handles width */}

      {/* JS handles conditional features */}
      {breakpoint === 'lg' && <AdvancedWidget />}
    </aside>
  );
}
```

### 2. Mobile-First Design

Design mobile-first so the default SSR value matches small screens:

```tsx
function Hero() {
  const isMobile = useBreakpointCondition({ lessThan: 'md' });

  return (
    <section>
      {/* Mobile layout is default */}
      {isMobile ? <CompactHero /> : <FullHero />}
    </section>
  );
}
```

### 3. Loading States

Show a loading state during hydration:

```tsx
import { useState, useEffect } from 'react';
import { useBreakpoint } from 'react-tw-breakpoints';

function AdaptiveContent() {
  const breakpoint = useBreakpoint();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {breakpoint === 'xs' && <MobileView />}
      {breakpoint === 'lg' && <DesktopView />}
    </div>
  );
}
```

### 4. Defer Non-Critical Content

Defer desktop-only features to avoid initial layout shift:

```tsx
import { useState, useEffect } from 'react';
import { useBreakpointCondition } from 'react-tw-breakpoints';

function EnhancedUI() {
  const [showEnhancements, setShowEnhancements] = useState(false);
  const isDesktop = useBreakpointCondition({ largerThan: 'lg' });

  useEffect(() => {
    if (isDesktop) {
      setShowEnhancements(true);
    }
  }, [isDesktop]);

  return (
    <div>
      <CoreContent />
      {showEnhancements && <DesktopEnhancements />}
    </div>
  );
}
```

## Container Queries and SSR

`useContainerBreakpoint` is also SSR-safe:

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function Card() {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <div ref={cardRef}>
      {/* Server: 'xs', Client: actual size */}
      {breakpoint === 'lg' && <ExtraContent />}
    </div>
  );
}
```

**Best Practice**: Use CSS `@container` queries for styling, `useContainerBreakpoint` for conditional logic.

## React Strict Mode

All hooks are compatible with React 18+ Strict Mode:

- No duplicate subscriptions
- Clean up properly on unmount
- No memory leaks
- No extra re-renders

```tsx
import { StrictMode } from 'react';
import { useBreakpoint } from 'react-tw-breakpoints';

function App() {
  return (
    <StrictMode>
      <ResponsiveApp />
    </StrictMode>
  );
}
```

## Testing SSR Behavior

### Unit Tests

Mock the SSR environment:

```typescript
import { getCurrentBreakpoint } from 'react-tw-breakpoints';

describe('SSR', () => {
  it('returns xs on server', () => {
    // Mock server environment
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    expect(getCurrentBreakpoint()).toBe('xs');

    // Restore
    global.window = originalWindow;
  });
});
```

### Integration Tests

Test hydration with a testing library:

```typescript
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useBreakpoint } from 'react-tw-breakpoints';

function TestComponent() {
  const bp = useBreakpoint();
  return <div>{bp}</div>;
}

it('hydrates without mismatch', () => {
  // Server render
  const serverHtml = renderToString(<TestComponent />);
  expect(serverHtml).toContain('xs');

  // Client render
  render(<TestComponent />);
  expect(screen.getByText(/xs|sm|md|lg|xl/)).toBeInTheDocument();
});
```

## Common Patterns

### Progressive Enhancement

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function EnhancedFeature() {
  const hasSpace = useBreakpointCondition({ largerThan: 'lg' });

  return (
    <div>
      <CoreFeature />
      {hasSpace && <Enhancement />}
    </div>
  );
}
```

Server renders `<CoreFeature />` only, client adds `<Enhancement />` when appropriate.

### Conditional Scripts

```tsx
import { useEffect } from 'react';
import { useBreakpointCondition } from 'react-tw-breakpoints';

function Analytics() {
  const isDesktop = useBreakpointCondition({ largerThan: 'md' });

  useEffect(() => {
    if (isDesktop) {
      // Load desktop-specific analytics
      loadAdvancedAnalytics();
    }
  }, [isDesktop]);

  return null;
}
```

### Responsive Images

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

function ResponsiveImage() {
  const bp = useBreakpoint();

  const imageSrc =
    {
      xs: '/image-small.jpg',
      sm: '/image-medium.jpg',
      lg: '/image-large.jpg',
    }[bp] || '/image-small.jpg';

  return <img src={imageSrc} alt="Responsive" />;
}
```

**Better approach**: Use native responsive images:

```tsx
function ResponsiveImage() {
  return (
    <img
      src="/image.jpg"
      srcSet="
        /image-small.jpg 640w,
        /image-medium.jpg 1024w,
        /image-large.jpg 1920w
      "
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt="Responsive"
    />
  );
}
```

## Performance Considerations

### Server Performance

- No performance impact: hooks return static values immediately
- No browser API calls
- No media query evaluations

### Client Performance

- Initial hydration is fast (uses server values)
- First update after hydration may cause re-render
- Subsequent updates are optimized with `useSyncExternalStore`

### Optimization Tips

1. **Batch updates**: React automatically batches state updates
2. **Memoize heavy computations**: Use `useMemo` for expensive derived state
3. **Avoid unnecessary hooks**: Don't call hooks if you don't need the value
4. **Prefer CSS**: Use media queries for styling

## Troubleshooting

### Hydration Mismatch Warnings

**Symptom**: Console warnings about hydration mismatches

**Cause**: Rendering different content on server vs. client

**Solution**: Ensure initial render matches server:

```tsx
// ❌ Bad: Different on server
function Bad() {
  const bp = useBreakpoint();
  return <div>{bp === 'lg' ? 'Desktop' : 'Mobile'}</div>;
}

// ✅ Good: Progressive enhancement
function Good() {
  const [hydrated, setHydrated] = useState(false);
  const bp = useBreakpoint();

  useEffect(() => setHydrated(true), []);

  return (
    <div>
      {!hydrated && 'Loading...'}
      {hydrated && (bp === 'lg' ? 'Desktop' : 'Mobile')}
    </div>
  );
}
```

### Layout Shift on Hydration

**Symptom**: Content jumps after page load

**Solutions**:

1. Use CSS media queries for layout
2. Reserve space for dynamic content
3. Mobile-first design
4. Loading states

### Flash of Wrong Content

**Symptom**: Wrong content briefly appears then changes

**Solution**: Show loading state or use CSS to hide until hydrated:

```tsx
function Content() {
  const [show, setShow] = useState(false);
  const bp = useBreakpoint();

  useEffect(() => setShow(true), []);

  return (
    <div className={show ? 'opacity-100' : 'opacity-0'}>
      {bp === 'lg' ? <Desktop /> : <Mobile />}
    </div>
  );
}
```

## Best Practices

1. **Mobile-first**: Design for mobile, enhance for desktop
2. **CSS for layout**: Use media queries for styles, hooks for logic
3. **Progressive enhancement**: Core content works everywhere, enhancements load later
4. **Test SSR**: Verify your app works with JavaScript disabled
5. **Monitor hydration**: Check for hydration warnings in development

## Framework-Specific Tips

### Next.js

- Use `'use client'` directive for client components
- Consider `dynamic()` with `ssr: false` for truly client-only components
- Use `useEffect` to detect hydration

### Remix

- Hooks work in routes and components
- Consider `useHydrated()` utility for hydration detection
- Leverage loader data for initial state

### Gatsby

- Works out of the box
- Use `wrapPageElement` for consistent layouts
- Consider gatsby-plugin-preact for smaller bundles

## Resources

- [React useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [Next.js Hydration](https://nextjs.org/docs/messages/react-hydration-error)
- [Web.dev: Hydration](https://web.dev/rendering-on-the-web/)

---

**Next Steps:**

- [Hooks API Reference](../api/hooks.md)
- [Examples](../examples/examples.md)
- [Examples](../examples/examples.md)
