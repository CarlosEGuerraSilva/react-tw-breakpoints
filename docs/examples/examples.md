# Examples

Practical examples organized by feature type.

## Examples by Category

### Hook Examples

Learn how to use the different hooks for responsive behavior.

- **[Viewport Hooks](hooks/viewport-hooks.md)** - `useBreakpoint`, `useBreakpointCondition`, helper hooks
- **[Container Hooks](hooks/container-hooks.md)** - `useContainerBreakpoint` for per-element responsiveness

### Component Examples

Learn how to use the experimental UI components.

- **[Container Component](components/container.md)** - Layout wrapper examples
- **[Grid Component](components/grid.md)** - Responsive grid layouts

---

## Quick Navigation

**I want to...**

### Use viewport breakpoints

[Viewport Hooks Examples](hooks/viewport-hooks.md)

**Examples**: Responsive navigation, conditional rendering, mobile/desktop toggle

### Use per-element breakpoints

[Container Hooks Examples](hooks/container-hooks.md)

**Examples**: Adaptive cards, responsive components based on container size

### Build layouts with Grid

[Grid Component Examples](components/grid.md)

**Examples**: Dashboards, card grids, responsive forms

### Use Container wrapper

[Container Component Examples](components/container.md)

**Examples**: Page layouts, max-width constraints, centered content

---

## Quick Reference

### Viewport Hooks

```tsx
import { useBreakpoint, useBreakpointCondition } from 'react-tw-breakpoints';

const bp = useBreakpoint(); // 'xs' | 'sm' | 'md' | ...
const isMobile = useBreakpointCondition({ lessThan: 'md' });
```

### Container Hooks

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

const ref = useRef(null);
const bp = useContainerBreakpoint(ref);
```

### Helper Hooks

```tsx
import {
  useBreakpointUp,
  useBreakpointDown,
  useBreakpointOnly,
  useBreakpointBetween,
} from 'react-tw-breakpoints';

const isDesktop = useBreakpointUp('lg');
const isMobile = useBreakpointDown('md');
```

### Components

```tsx
import { Container, Grid } from 'react-tw-breakpoints';

<Container maxWidth="xl">
  <Grid container>
    <Grid size={{ xs: 12, md: 6 }}>Content</Grid>
  </Grid>
</Container>;
```

---

## Related Documentation

- [Hooks API Reference](../api/hooks.md) - Complete hooks documentation
- [Components API Reference](../api/components.md) - Complete components documentation
- [Guides](../guides/guides.md) - Configuration and best practices
- [Main Documentation](../../README.md) - Back to main README

---

**Need help?** Check the [main documentation](../intro.md) or [open an issue](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues).
