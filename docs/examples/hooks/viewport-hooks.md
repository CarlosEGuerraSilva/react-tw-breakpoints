# Viewport Hooks Examples

Examples using `useBreakpoint`, `useBreakpointCondition`, and helper hooks for viewport-based responsive behavior.

## Table of Contents

- [Basic useBreakpoint](#basic-usebreakpoint)
- [useBreakpointCondition](#usebreakpointcondition)
- [Helper Hooks](#helper-hooks)
- [Responsive Navigation](#responsive-navigation)
- [Conditional Rendering](#conditional-rendering)
- [Adaptive Layouts](#adaptive-layouts)

---

## Basic useBreakpoint

Get the current viewport breakpoint.

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

function ViewportIndicator() {
  const breakpoint = useBreakpoint();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
      Current: {breakpoint}
    </div>
  );
}
```

### Multiple Layouts Based on Breakpoint

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

function ProductPage() {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'xs' || breakpoint === 'sm') {
    return <MobileLayout />;
  }

  if (breakpoint === 'md') {
    return <TabletLayout />;
  }

  return <DesktopLayout />;
}
```

---

## useBreakpointCondition

Evaluate breakpoint conditions without getting the exact breakpoint.

### Mobile/Desktop Toggle

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function App() {
  const isMobile = useBreakpointCondition({ lessThan: 'md' });

  return <div>{isMobile ? <MobileInterface /> : <DesktopInterface />}</div>;
}
```

### Progressive Enhancement

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function Dashboard() {
  const hasSpace = useBreakpointCondition({ largerThan: 'lg' });

  return (
    <div>
      <CoreDashboard />
      {hasSpace && <AdvancedFeatures />}
    </div>
  );
}
```

### Only at Specific Breakpoint

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function TabletOptimization() {
  const isTablet = useBreakpointCondition({ onlyAt: 'md' });

  if (!isTablet) return null;

  return <TabletSpecificUI />;
}
```

### Combined Conditions

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function MidRangeDevices() {
  const isMidRange = useBreakpointCondition({
    largerThan: 'sm',
    lessThan: 'xl',
  });

  return <div>{isMidRange ? <OptimizedView /> : <StandardView />}</div>;
}
```

---

## Helper Hooks

Convenient shortcuts for common breakpoint checks.

### useBreakpointUp

```tsx
import { useBreakpointUp } from 'react-tw-breakpoints';

function DesktopFeatures() {
  const isDesktop = useBreakpointUp('lg');

  return (
    <div>
      <CoreFeatures />
      {isDesktop && <AdvancedTools />}
    </div>
  );
}
```

### useBreakpointDown

```tsx
import { useBreakpointDown } from 'react-tw-breakpoints';

function MobileOnlyBanner() {
  const isMobile = useBreakpointDown('md');

  if (!isMobile) return null;

  return <div className="banner">Download our mobile app!</div>;
}
```

### useBreakpointOnly

```tsx
import { useBreakpointOnly } from 'react-tw-breakpoints';

function TabletLayout() {
  const isTablet = useBreakpointOnly('md');

  return isTablet ? <TabletUI /> : <DefaultUI />;
}
```

### useBreakpointBetween

```tsx
import { useBreakpointBetween } from 'react-tw-breakpoints';

function MidSizeOptimization() {
  const isMidSize = useBreakpointBetween('sm', 'xl');

  return (
    <article className={isMidSize ? 'max-w-3xl' : 'max-w-full'}>
      <Content />
    </article>
  );
}
```

---

## Responsive Navigation

Complete navigation example with mobile menu.

```tsx
import { useState } from 'react';
import { useBreakpointCondition } from 'react-tw-breakpoints';

function Navigation() {
  const isMobile = useBreakpointCondition({ lessThan: 'lg' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {isMobile ? (
            <>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <MenuIcon />
              </button>

              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg">
                  <div className="flex flex-col p-4 space-y-2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/products">Products</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-gray-700 hover:text-blue-600 transition-colors">
      {children}
    </a>
  );
}
```

---

## Conditional Rendering

Load different components based on viewport.

### Data Table Example

```tsx
import { useBreakpointCondition } from 'react-tw-breakpoints';

function DataTable({ data }) {
  const isDesktop = useBreakpointCondition({ largerThan: 'md' });

  return (
    <div className="overflow-auto">
      {isDesktop ? (
        <FullDataTable data={data} columns={10} />
      ) : (
        <CompactDataTable data={data} columns={3} />
      )}
    </div>
  );
}
```

### Progressive Features

```tsx
import { useBreakpointUp } from 'react-tw-breakpoints';

function ArticleReader({ article }) {
  const hasTableOfContents = useBreakpointUp('lg');
  const hasRelatedArticles = useBreakpointUp('xl');

  return (
    <div className="article-layout">
      {hasTableOfContents && (
        <aside className="toc">
          <TableOfContents items={article.headings} />
        </aside>
      )}

      <article className="prose">
        <ArticleContent content={article.content} />
      </article>

      {hasRelatedArticles && (
        <aside className="related">
          <RelatedArticles articles={article.related} />
        </aside>
      )}
    </div>
  );
}
```

---

## Adaptive Layouts

Change entire layout structure based on viewport.

```tsx
import { useBreakpoint } from 'react-tw-breakpoints';

function AppLayout({ children }) {
  const breakpoint = useBreakpoint();

  const layout =
    {
      xs: 'mobile',
      sm: 'mobile',
      md: 'tablet',
      lg: 'desktop',
      xl: 'desktop-wide',
    }[breakpoint] || 'mobile';

  return (
    <div className={`layout-${layout}`}>
      {layout === 'mobile' && <MobileLayout>{children}</MobileLayout>}
      {layout === 'tablet' && <TabletLayout>{children}</TabletLayout>}
      {layout === 'desktop' && <DesktopLayout>{children}</DesktopLayout>}
      {layout === 'desktop-wide' && <WideLayout>{children}</WideLayout>}
    </div>
  );
}

function MobileLayout({ children }) {
  return (
    <div className="flex flex-col">
      <MobileHeader />
      <main className="flex-1">{children}</main>
      <MobileNav />
    </div>
  );
}

function DesktopLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

---

## Related

- [Container Hooks Examples](container-hooks.md) - Per-element responsiveness
- [Hooks API Reference](../../api/hooks.md) - Complete API documentation
