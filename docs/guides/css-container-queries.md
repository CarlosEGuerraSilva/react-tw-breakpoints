# CSS Container Queries

Learn how to use native CSS `@container` queries alongside `react-tw-breakpoints` for optimal responsive design.

## Overview

CSS Container Queries allow elements to respond to their container's size rather than the viewport. This is perfect for creating truly reusable components that adapt to their available space.

**When to use:**

- Style-only responsive changes (colors, spacing, layout)
- Components that need to work in various contexts
- Design systems with reusable components

**When to use `useContainerBreakpoint` instead:**

- Conditional rendering based on size
- Loading different components
- Complex JavaScript logic based on size

## Browser Support

- Chrome/Edge 105+
- Safari 16+
- Firefox 110+

All modern browsers as of 2023. Check [caniuse.com](https://caniuse.com/css-container-queries) for current support.

## Basic Setup

### 1. Mark the Container

Define an element as a container using `container-type`:

```css
.card {
  container-type: inline-size;
}
```

**Container Types:**

- `inline-size`: Queries based on inline dimension (width in LTR languages)
- `size`: Queries based on both dimensions (width and height)
- `normal`: Not a container (default)

### 2. Query the Container

Use `@container` to apply styles based on container size:

```css
.card .title {
  font-size: 1.25rem;
}

@container (width >= 400px) {
  .card .title {
    font-size: 1.5rem;
  }
}

@container (width >= 600px) {
  .card .title {
    font-size: 2rem;
  }
}
```

## Using with Tailwind v4

Tailwind v4 supports container queries with arbitrary properties and values.

### Mark Container with Arbitrary Property

```html
<div class="[container-type:inline-size]">
  <div class="content">
    <!-- Content adapts to container size -->
  </div>
</div>
```

### Named Containers

```html
<div class="[container-type:inline-size] [container-name:card]">
  <!-- Now you can query this specific container by name -->
</div>
```

### Styles in CSS

```css
.content {
  display: block;
}

@container (width >= 640px) {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container (width >= 1024px) {
  .content {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Named Container Queries

```css
@container card (width >= 400px) {
  .card-title {
    font-size: 1.5rem;
  }
}
```

## Container Query Units

Use container query units for fluid sizing:

| Unit    | Description                 | Equivalent to   |
| ------- | --------------------------- | --------------- |
| `cqw`   | 1% of container width       | `1%` of width   |
| `cqh`   | 1% of container height      | `1%` of height  |
| `cqi`   | 1% of container inline size | `cqw` in LTR    |
| `cqb`   | 1% of container block size  | `cqh` in LTR    |
| `cqmin` | Smaller of `cqi` or `cqb`   | `min(cqw, cqh)` |
| `cqmax` | Larger of `cqi` or `cqb`    | `max(cqw, cqh)` |

### Examples

```css
.hero {
  padding-inline: 6cqw;
  font-size: clamp(1rem, 4cqw, 2rem);
}

.sidebar {
  padding: 2cqh 2cqw;
}

.card {
  gap: calc(2cqw + 0.5rem);
}
```

## Practical Examples

### Adaptive Card Component

```html
<div class="card [container-type:inline-size] p-4 border rounded">
  <div class="card-content">
    <h3 class="card-title">Product Title</h3>
    <img src="product.jpg" alt="Product" class="card-image" />
    <p class="card-description">Description</p>
    <button class="card-button">Buy Now</button>
  </div>
</div>
```

```css
.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
}

@container (width >= 300px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'image title'
      'image description'
      'image button';
  }

  .card-image {
    grid-area: image;
  }

  .card-title {
    grid-area: title;
  }

  .card-description {
    grid-area: description;
  }

  .card-button {
    grid-area: button;
    justify-self: start;
  }
}

@container (width >= 500px) {
  .card-content {
    grid-template-columns: 200px 1fr;
  }
}
```

### Responsive Navigation

```html
<nav class="[container-type:inline-size] [container-name:nav]">
  <ul class="nav-list">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```css
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@container nav (width >= 400px) {
  .nav-list {
    flex-direction: row;
    gap: 2rem;
  }
}

@container nav (width >= 600px) {
  .nav-list {
    justify-content: space-between;
  }
}
```

### Sidebar with Breakpoints

```html
<aside class="sidebar [container-type:inline-size]">
  <div class="sidebar-content">
    <div class="icon"></div>
    <div class="text">Dashboard</div>
  </div>
</aside>
```

```css
.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.text {
  display: none;
}

@container (width >= 200px) {
  .sidebar-content {
    flex-direction: row;
    justify-content: flex-start;
  }

  .text {
    display: block;
  }
}
```

## Combining with JavaScript Hooks

Use CSS `@container` for styles and `useContainerBreakpoint` for logic:

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function SmartCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <div ref={cardRef} className="[container-type:inline-size] card">
      {/* CSS handles layout */}
      <div className="card-content">
        <img src="image.jpg" />
        <h3>Title</h3>

        {/* JavaScript handles conditional rendering */}
        {breakpoint === 'lg' && <AdvancedFeatures />}
        {breakpoint === 'xs' && <SimplifiedView />}
      </div>
    </div>
  );
}
```

```css
.card-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@container (width >= 640px) {
  .card-content {
    grid-template-columns: 1fr 2fr;
  }
}

@container (width >= 1024px) {
  .card-content {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

**Best Practice**: Use CSS for layout and styling, JavaScript for conditional logic and rendering.

## Debugging Container Queries

### Chrome DevTools

1. Open DevTools (F12)
2. Go to Elements tab
3. Look for `container` badge next to elements
4. Hover to see container information
5. Use "Toggle container query debugger" in Styles panel

### Firefox DevTools

1. Open DevTools (F12)
2. Go to Inspector tab
3. Container elements show with special icon
4. Container queries highlighted in Rules panel

### Common Issues

**Query not working?**

- Check if `container-type` is set on parent
- Verify query syntax: `@container (width >= 400px)` not `@container (min-width: 400px)`
- Ensure the queried element is a descendant of the container

**Arbitrary value not working?**

- Tailwind v4: Use `[container-type:inline-size]`
- Tailwind v3: May need plugin or custom CSS

**Performance issues?**

- Container queries are efficient but avoid too many nested containers
- Use named containers to be specific about what you're querying

## Container Query Syntax

### Modern Syntax (Recommended)

```css
@container (width >= 400px) {
  /* ... */
}
@container (width <= 800px) {
  /* ... */
}
@container (400px <= width <= 800px) {
  /* ... */
}
```

### Legacy Syntax (Still supported)

```css
@container (min-width: 400px) {
  /* ... */
}
@container (max-width: 800px) {
  /* ... */
}
```

### Logical Operators

```css
@container (width >= 400px) and (width <= 800px) {
  /* ... */
}
@container (width >= 600px) or (height >= 400px) {
  /* ... */
}
@container not (width >= 600px) {
  /* ... */
}
```

## Performance Tips

1. **Minimize nesting**: Avoid deeply nested containers
2. **Use named containers**: Be explicit about what you're querying
3. **Combine with CSS Grid/Flexbox**: Let CSS handle layout when possible
4. **Cache container references**: Don't recreate containers unnecessarily

## Comparison: Container Queries vs. Media Queries

| Feature  | Media Queries | Container Queries |
| -------- | ------------- | ----------------- |
| Based on | Viewport size | Container size    |
| Global   | Yes           | No                |
| Reusable | Limited       | Excellent         |
| Nested   | N/A           | Yes               |
| Use case | Page layout   | Component styling |

**Use Both**: Media queries for global layout, container queries for component adaptation.

## Resources

- [MDN: CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [Container Query Units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_query_length_units)
- [Can I Use: Container Queries](https://caniuse.com/css-container-queries)
- [useContainerBreakpoint Hook](../api/hooks.md#usecontainerbreakpoint)

---

**Next Steps:**

- [Hooks API Reference](../api/hooks.md)
- [Examples](../examples/examples.md)
- [SSR Guide](./ssr.md)
