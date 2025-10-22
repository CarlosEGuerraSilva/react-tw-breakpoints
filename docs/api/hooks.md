# Hooks API Reference

This document provides detailed information about all hooks available in `react-tw-breakpoints`.

## Table of Contents

- [Core Hooks](#core-hooks)
  - [useBreakpoint](#usebreakpoint)
  - [useBreakpointCondition](#usebreakpointcondition)
  - [useBreakpointContainer](#usebreakpointcontainer)
  - [useBreakpointContainerCondition](#usebreakpointcontainercondition)
  - [useContainerBreakpoint](#usecontainerbreakpoint)
- [Helper Hooks](#helper-hooks)
  - [useBreakpointUp](#usebreakpointup)
  - [useBreakpointDown](#usebreakpointdown)
  - [useBreakpointOnly](#usebreakpointonly)
  - [useBreakpointBetween](#usebreakpointbetween)

---

## Core Hooks

### useBreakpoint

Returns the current active viewport breakpoint based on `window.matchMedia`.

**Signature:**

```typescript
function useBreakpoint(): StaticBreakpoint;
```

**Returns:**

- `StaticBreakpoint`: One of `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'_2xl'` | `'_3xl'` | `'_4xl'` | `'_5xl'`

**Features:**

- Uses `useSyncExternalStore` for safe concurrent rendering
- Deduplicates `matchMedia` listeners via internal store
- SSR-safe: returns `'xs'` on the server
- No duplicate listeners in React StrictMode

**Example:**

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {breakpoint === 'xs' && <MobileView />}
      {breakpoint === 'md' && <TabletView />}
      {breakpoint === 'lg' && <DesktopView />}
    </div>
  );
}
```

**When to use:**

- When you need to render different components based on viewport size
- When you need the exact breakpoint label for logic or display
- For global viewport-based responsive behavior

---

### useBreakpointCondition

Evaluates viewport breakpoint conditions without returning the actual breakpoint.

**Signature:**

```typescript
function useBreakpointCondition(condition: {
  largerThan?: StaticBreakpoint;
  lessThan?: StaticBreakpoint;
  onlyAt?: StaticBreakpoint;
}): boolean;
```

**Parameters:**

- `condition.largerThan`: Check if viewport is larger than the specified breakpoint
- `condition.lessThan`: Check if viewport is smaller than the specified breakpoint
- `condition.onlyAt`: Check if viewport is exactly at the specified breakpoint (takes precedence)

**Returns:**

- `boolean`: `true` if the condition matches, `false` otherwise

**Features:**

- Conditions can be combined (except `onlyAt` which takes precedence)
- Optimized: only subscribes to relevant media queries
- SSR-safe: returns `false` on the server

**Examples:**

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function Navigation() {
  const isMobile = useBreakpointCondition({ lessThan: 'md' });
  const isDesktop = useBreakpointCondition({ largerThan: 'lg' });

  return (
    <nav>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
      {isDesktop && <UserPanel />}
    </nav>
  );
}
```

```tsx
// Only at specific breakpoint
function TabletOnlyFeature() {
  const isTablet = useBreakpointCondition({ onlyAt: 'md' });

  if (!isTablet) return null;

  return <TabletOptimizedUI />;
}
```

```tsx
// Combined conditions
function MidRangeDevices() {
  const isMidRange = useBreakpointCondition({
    largerThan: 'sm',
    lessThan: 'xl',
  });

  return isMidRange ? <OptimizedView /> : <StandardView />;
}
```

**When to use:**

- When you only need a boolean check (more efficient than `useBreakpoint`)
- For conditional rendering based on viewport ranges
- When you don't need the exact breakpoint label

---

### useBreakpointContainer

Similar to `useBreakpoint` but uses the container breakpoint set. Still viewport-based.

**Signature:**

```typescript
function useBreakpointContainer(): StaticBreakpointContainer;
```

**Returns:**

- `StaticBreakpointContainer`: One of `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'_2xl'` | `'_3xl'` | `'_4xl'` | `'_5xl'` | `'_6xl'` | `'_7xl'`

**Features:**

- Uses extended breakpoint set with more granular options
- Viewport-based (not per-element)
- Same optimizations as `useBreakpoint`

**Example:**

```tsx
import { useBreakpointContainer } from 'react-tw-breakpoints';

function WideScreenLayout() {
  const containerBp = useBreakpointContainer();

  return (
    <div>
      {containerBp === '_6xl' && <UltraWideLayout />}
      {containerBp === '_5xl' && <WideLayout />}
      {containerBp === 'xl' && <StandardLayout />}
    </div>
  );
}
```

**When to use:**

- When you need a separate breakpoint system from the main viewport
- For layouts that require finer granularity at larger sizes
- When coordinating multiple responsive systems

---

### useBreakpointContainerCondition

Evaluates container breakpoint conditions (viewport-based with container labels).

**Signature:**

```typescript
function useBreakpointContainerCondition(condition: {
  largerThan?: StaticBreakpointContainer;
  lessThan?: StaticBreakpointContainer;
  onlyAt?: StaticBreakpointContainer;
}): boolean;
```

**Parameters:**

Same as `useBreakpointCondition` but with container breakpoint labels.

**Returns:**

- `boolean`: `true` if the condition matches

**Example:**

```tsx
import { useBreakpointContainerCondition } from 'react-tw-breakpoints';

function UltraWideFeature() {
  const isUltraWide = useBreakpointContainerCondition({ largerThan: '_5xl' });

  if (!isUltraWide) return null;

  return <UltraWideOptimizedContent />;
}
```

**When to use:**

- When using the container breakpoint set for viewport checks
- For ultra-wide screen optimizations

---

### useContainerBreakpoint

True per-element breakpoint based on the element's actual width using `ResizeObserver`.

**Signature:**

```typescript
function useContainerBreakpoint(ref: React.RefObject<HTMLElement>): StaticBreakpointContainer;
```

**Parameters:**

- `ref`: React ref to the element to observe

**Returns:**

- `StaticBreakpointContainer`: Breakpoint based on element width

**Features:**

- Uses `ResizeObserver` for true per-element responsive behavior
- Independent of viewport size
- Deduplicates observers via internal store
- SSR-safe: returns `'xs'` on the server

**Example:**

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function AdaptiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <div ref={cardRef} className="card">
      {breakpoint === 'xs' && <CompactLayout />}
      {breakpoint === 'md' && <NormalLayout />}
      {breakpoint === 'lg' && <ExpandedLayout />}
    </div>
  );
}
```

**Advanced example with sidebar:**

```tsx
function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarBp = useContainerBreakpoint(sidebarRef);

  return (
    <aside ref={sidebarRef} className="sidebar">
      {sidebarBp === 'xs' && <CollapsedNav />}
      {sidebarBp === 'sm' && <IconOnlyNav />}
      {sidebarBp === 'md' && <FullNav />}
    </aside>
  );
}
```

**When to use:**

- For component-specific responsive behavior
- When a component's layout depends on its container, not the viewport
- In reusable components that adapt to their allocated space
- With CSS Grid or Flexbox layouts where item sizes vary

**Performance notes:**

- More efficient than viewport media queries for per-component logic
- Observers are shared and deduplicated automatically
- Consider using CSS `@container` queries for style-only changes

---

## Helper Hooks

These hooks provide convenient shortcuts for common breakpoint checks.

### useBreakpointUp

Check if the viewport is at or above a specific breakpoint.

**Signature:**

```typescript
function useBreakpointUp(breakpoint: StaticBreakpoint): boolean;
```

**Parameters:**

- `breakpoint`: The minimum breakpoint to check

**Returns:**

- `boolean`: `true` if viewport is at or above the breakpoint

**Example:**

```tsx
import { useBreakpointUp } from 'react-tw-breakpoints';

function DesktopFeatures() {
  const isDesktop = useBreakpointUp('lg');

  return isDesktop ? <AdvancedFeatures /> : <BasicFeatures />;
}
```

**Equivalent to:**

```tsx
useBreakpointCondition({ largerThan: 'md' }) || breakpoint === 'md';
```

---

### useBreakpointDown

Check if the viewport is below a specific breakpoint.

**Signature:**

```typescript
function useBreakpointDown(breakpoint: StaticBreakpoint): boolean;
```

**Parameters:**

- `breakpoint`: The maximum breakpoint (exclusive)

**Returns:**

- `boolean`: `true` if viewport is below the breakpoint

**Example:**

```tsx
import { useBreakpointDown } from 'react-tw-breakpoints';

function MobileOnlyBanner() {
  const isMobile = useBreakpointDown('md');

  if (!isMobile) return null;

  return <InstallAppBanner />;
}
```

---

### useBreakpointOnly

Check if the viewport is exactly at a specific breakpoint.

**Signature:**

```typescript
function useBreakpointOnly(breakpoint: StaticBreakpoint): boolean;
```

**Parameters:**

- `breakpoint`: The exact breakpoint to check

**Returns:**

- `boolean`: `true` if viewport is exactly at the breakpoint

**Example:**

```tsx
import { useBreakpointOnly } from 'react-tw-breakpoints';

function TabletOptimizations() {
  const isTablet = useBreakpointOnly('md');

  return isTablet ? <TabletUI /> : <DefaultUI />;
}
```

**Equivalent to:**

```tsx
useBreakpointCondition({ onlyAt: 'md' });
```

---

### useBreakpointBetween

Check if the viewport is between two breakpoints.

**Signature:**

```typescript
function useBreakpointBetween(min: StaticBreakpoint, max: StaticBreakpoint): boolean;
```

**Parameters:**

- `min`: Minimum breakpoint (inclusive)
- `max`: Maximum breakpoint (exclusive)

**Returns:**

- `boolean`: `true` if viewport is between the breakpoints

**Example:**

```tsx
import { useBreakpointBetween } from 'react-tw-breakpoints';

function MidSizeLayout() {
  const isMidSize = useBreakpointBetween('sm', 'xl');

  return <div>{isMidSize ? <TwoColumnLayout /> : <SingleColumnLayout />}</div>;
}
```

**Use case - Tablet and small desktop:**

```tsx
function OptimalReadingWidth() {
  const isOptimalRange = useBreakpointBetween('md', '_2xl');

  return (
    <article className={isOptimalRange ? 'max-w-3xl' : 'max-w-full'}>
      <Content />
    </article>
  );
}
```

---

## TypeScript Types

```typescript
type StaticBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '_2xl' | '_3xl' | '_4xl' | '_5xl';

type StaticBreakpointContainer = StaticBreakpoint | '_6xl' | '_7xl';
```

---

## Performance Considerations

1. **Prefer conditions over breakpoint checks**: Use `useBreakpointCondition` instead of `useBreakpoint()` when you only need a boolean.

2. **Deduplicated listeners**: All viewport hooks share the same `matchMedia` listeners, so using multiple hooks has minimal overhead.

3. **Container vs Viewport**: Use `useContainerBreakpoint` for component-specific logic, viewport hooks for global UI changes.

4. **CSS vs JS**: For style-only changes, prefer CSS media queries or `@container` queries over JavaScript hooks.

---

## SSR Behavior

All hooks are SSR-safe:

- Viewport hooks return `'xs'` on the server
- Condition hooks return `false` on the server
- Container hooks return `'xs'` on the server
- Hydration occurs seamlessly on the client

See the [SSR Guide](../guides/ssr.md) for more details.
