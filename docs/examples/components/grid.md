# Grid Component Examples

> [!CAUTION]
> These components are experimental and may change their API or functionality. They are subject to discussion and improvement proposals, so breaking changes or even removal may occur. Use them at your own risk.

Examples using the `<Grid>` component as a flex-based 12-column system with responsive item sizes.

## Table of Contents

- [Basic 3-Column Grid](#basic-3-column-grid)
- [Responsive Grid Layout](#responsive-grid-layout)
- [Main Content + Sidebar](#main-content--sidebar)
- [Complex Dashboard Layout](#complex-dashboard-layout)

---

## Basic 3-Column Grid

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Cards() {
  return (
    <Grid container className="gap-4">
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

---

## Responsive Grid Layout

```tsx
import { Grid } from 'react-tw-breakpoints';

export function ResponsiveCards({ items }) {
  return (
    <Grid container className="gap-4">
      {items.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
```

Result:

- Mobile (xs): 1 column (full width)
- Tablet (sm): 2 columns
- Desktop (md): 3 columns
- Large (lg): 4 columns

---

## Main Content + Sidebar

```tsx
import { Grid } from 'react-tw-breakpoints';

export function Layout() {
  return (
    <Grid container className="gap-4">
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

---

## Complex Dashboard Layout

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

---

## Configuration Requirements

This component generates Tailwind classes dynamically (e.g., `basis-*` and responsive prefixes). Configure Tailwind safelist as described in the [Tailwind Safelist Guide](../../guides/tailwind-safelist.md).

---

## Related

- [Container Component Examples](container.md) - Max-width containers
- [Components API Reference](../../api/components.md) - Complete component API
