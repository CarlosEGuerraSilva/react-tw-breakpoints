# Components API Reference

This document provides detailed information about UI components available in `react-tw-breakpoints`.

> [!CAUTION]
> These components are experimental and may change their API or functionality. They are subject to discussion and improvement proposals, so breaking changes or even removal may occur. Use them at your own risk.

## Table of Contents

- [Container](#container)
- [Grid](#grid)
- [Configuration Requirements](#configuration-requirements)

---

## Container

A layout component inspired by Material UI's Container. Provides a centered wrapper with configurable maximum width constraints and horizontal padding.

**Signature:**

```typescript
function Container(props: ContainerProps): React.ReactElement;
```

**Props:**

```typescript
interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
    | 'full';
}
```

**Default Values:**

- `maxWidth`: `'lg'` (1024px)
- Always centered horizontally with `mx-auto`
- Default padding: `px-2` (0.5rem horizontal padding)

**Behavior:**

Similar to Material UI's Container:

- **Centered content**: Uses `margin-left: auto` and `margin-right: auto` for horizontal centering
- **Fluid width**: Container grows to fill available space up to the max-width
- **Horizontal padding**: Includes `px-2` by default (can be overridden via className)
- **Full-width container**: Uses Tailwind's `container` class for responsive behavior

**Generated Classes:**

Base: `container mx-auto px-2`

Plus one of:

- `max-w-sm` (640px in Tailwind)
- `max-w-md` (768px)
- `max-w-lg` (1024px) - **default**
- `max-w-xl` (1280px)
- `max-w-2xl` (1536px)
- `max-w-3xl` (1792px)
- `max-w-4xl` (2048px)
- `max-w-5xl` (2304px)
- `max-w-6xl` (2560px)
- `max-w-7xl` (2816px)
- `max-w-[1600px]` (for `8xl` - custom)
- `max-w-[1800px]` (for `9xl` - custom)
- `max-w-full` (100% width, no constraint)

**Examples:**

### Basic Usage

```tsx
import { Container } from 'react-tw-breakpoints';

export function Page() {
  return (
    <Container>
      <h1>Page Title</h1>
      <p>Page content goes here.</p>
    </Container>
  );
}
```

### Custom Max Width

```tsx
import { Container } from 'react-tw-breakpoints';

export function WideLayout() {
  return (
    <Container maxWidth="xl">
      <Dashboard />
    </Container>
  );
}
```

### Full Width with Custom Styling

```tsx
import { Container } from 'react-tw-breakpoints';

export function Hero() {
  return (
    <Container maxWidth="full" className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
      <HeroContent />
    </Container>
  );
}
```

### Extra Wide for Marketing Pages

```tsx
import { Container } from 'react-tw-breakpoints';

export function MarketingPage() {
  return (
    <Container maxWidth="8xl">
      <Hero />
      <Features />
      <Testimonials />
    </Container>
  );
}
```

### Nested Containers with Different Widths

```tsx
import { Container } from 'react-tw-breakpoints';

export function Article() {
  return (
    <Container maxWidth="full" className="bg-gray-50">
      <Container maxWidth="3xl">
        <header>
          <h1>Article Title</h1>
        </header>

        <Container maxWidth="2xl">
          <article className="prose">
            <p>Article content optimized for reading...</p>
          </article>
        </Container>

        <footer>
          <Comments />
        </footer>
      </Container>
    </Container>
  );
}
```

**When to use:**

- For page-level layout containers
- To constrain content width for better readability
- For consistent horizontal spacing across pages
- When you need responsive max-width behavior

**Configuration:**

Requires Tailwind safelist configuration. See [Tailwind Safelist Guide](../guides/tailwind-safelist.md).

---

## Grid

A 12-column flexbox layout system with responsive sizing, inspired by Material-UI Grid v2.

**Signature:**

```typescript
function Grid(props: GridProps): React.ReactElement;
```

**Props:**

```typescript
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  size?: number | ResponsiveSize;
  className?: string;
  children: React.ReactNode;
}

type ResponsiveSize = Partial<{
  xs: number; // 1-12
  sm: number; // 1-12
  md: number; // 1-12
  lg: number; // 1-12
  xl: number; // 1-12
  '2xl': number; // 1-12
}>;
```

**Default Props:**

- `container`: `false`
- `size`: `12` (when not specified on items)

**Features:**

- 12-column responsive grid system
- Container/item pattern like CSS Grid or Material-UI
- Flexbox-based with `basis-*` utilities
- Responsive sizing per breakpoint
- Supports nesting
- Type-safe with TypeScript

**How it works:**

- **Container**: `container={true}` creates a flex container with `flex flex-wrap`
- **Item**: `container={false}` (default) creates a flex item with responsive `basis-*` classes
- **Size**: Determines how many of the 12 columns the item spans

**Generated Classes:**

Container: `flex flex-wrap`

Items: `basis-{fraction}` where fraction is based on size:

- `size={6}` → `basis-6/12` (50%)
- `size={4}` → `basis-4/12` (33.33%)
- `size={12}` → `basis-full` (100%)

Responsive:

- `xs` → no prefix (base)
- `sm` → `sm:basis-*`
- `md` → `md:basis-*`
- `lg` → `lg:basis-*`
- `xl` → `xl:basis-*`
- `2xl` → `2xl:basis-*`

**Examples:**

### Basic 3-Column Grid

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Cards() {
  return (
    <Grid container>
      <Grid size={4}>
        <Card title="Card 1" />
      </Grid>
      <Grid size={4}>
        <Card title="Card 2" />
      </Grid>
      <Grid size={4}>
        <Card title="Card 3" />
      </Grid>
    </Grid>
  );
}
```

### Responsive Grid Layout

```tsx
import { Grid } from 'react-tw-breakpoints';

export function ResponsiveCards() {
  return (
    <Grid container>
      {items.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
```

**Result:**

- Mobile (xs): 1 column (full width)
- Tablet (sm): 2 columns
- Desktop (md): 3 columns
- Large (lg): 4 columns

### Main Content + Sidebar

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Layout() {
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 8 }}>
        <MainContent />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Sidebar />
      </Grid>
    </Grid>
  );
}
```

**Result:**

- Mobile: Stacked (main then sidebar, both full width)
- Desktop: Main 66.66%, Sidebar 33.33%

### Complex Dashboard Layout

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Dashboard() {
  return (
    <Grid container className="gap-4">
      {/* Header - Full Width */}
      <Grid size={12}>
        <Header />
      </Grid>

      {/* Main Stats - 3 columns on desktop, stacked on mobile */}
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard title="Revenue" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard title="Users" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard title="Orders" />
      </Grid>

      {/* Charts - 2 columns */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <LineChart />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <PieChart />
      </Grid>

      {/* Footer - Full Width */}
      <Grid size={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
```

### Nested Grids

```tsx
import { Grid } from 'react-tw-breakpoints';

export function NestedLayout() {
  return (
    <Grid container className="gap-4">
      <Grid size={12}>
        <Grid container className="gap-2">
          <Grid size={{ xs: 6, md: 3 }}>
            <Tile icon="home" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Tile icon="settings" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Tile icon="profile" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Tile icon="help" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
```

### With Custom Spacing

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Gallery() {
  return (
    <Grid container className="gap-6 p-4">
      {images.map((image) => (
        <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }} className="p-2">
          <Image src={image.url} alt={image.alt} />
        </Grid>
      ))}
    </Grid>
  );
}
```

**Configuration:**

Requires Tailwind safelist configuration. See [Tailwind Safelist Guide](../guides/tailwind-safelist.md).

---

## Configuration Requirements

Both `Container` and `Grid` require additional Tailwind configuration because as they add dynamic classes based on props and does not generate their css as they are not directly present in the source code.

For full details, see the [Tailwind Safelist Guide](../guides/tailwind-safelist.md).

---

## TypeScript Support

Both components are fully typed with TypeScript:

```typescript
import type { ContainerProps, GridProps } from 'react-tw-breakpoints';
```

IntelliSense will provide autocomplete for all props and valid values.

---

## Related

- [Tailwind Safelist Configuration](../guides/tailwind-safelist.md)
- [CSS Container Queries](../guides/css-container-queries.md)
- [Examples](../examples/examples.md)
