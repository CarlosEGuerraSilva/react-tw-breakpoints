# Container Hooks Examples

Examples using `useContainerBreakpoint` for per-element responsive behavior based on container size.

## Table of Contents

- [Basic Container Breakpoint](#basic-container-breakpoint)
- [Adaptive Cards](#adaptive-cards)
- [Reusable Components](#reusable-components)
- [Nested Containers](#nested-containers)
- [Combining with CSS Container Queries](#combining-with-css-container-queries)

---

## Basic Container Breakpoint

Detect the breakpoint of a specific element based on its width.

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function ResponsiveBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(boxRef);

  return (
    <div ref={boxRef} className="border p-4">
      <p>Container breakpoint: {breakpoint}</p>
      {breakpoint === 'xs' && <p>Very small container</p>}
      {breakpoint === 'md' && <p>Medium container</p>}
      {breakpoint === 'lg' && <p>Large container</p>}
    </div>
  );
}
```

---

## Adaptive Cards

Cards that adapt based on their own size, not the viewport.

### Product Card

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function ProductCard({ product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  const isCompact = breakpoint === 'xs' || breakpoint === 'sm';
  const isNormal = breakpoint === 'md' || breakpoint === 'lg';
  const isExpanded = breakpoint === 'xl' || breakpoint === '_2xl';

  return (
    <div ref={cardRef} className="card border rounded-lg overflow-hidden">
      {isCompact && (
        <div className="p-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="text-sm font-bold mt-2">{product.name}</h3>
          <p className="text-lg font-bold text-blue-600">{product.price}</p>
        </div>
      )}

      {isNormal && (
        <div className="flex gap-4 p-4">
          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="text-xl font-bold text-blue-600 mt-2">{product.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="p-6">
          <img
            src={product.largeImage}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.fullDescription}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-bold text-blue-600">{product.price}</p>
            <div className="flex gap-2">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Add to Cart</button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg">
                View Details
              </button>
            </div>
          </div>
          <div className="mt-4">
            <RatingStars rating={product.rating} />
            <Reviews reviews={product.reviews} />
          </div>
        </div>
      )}
    </div>
  );
}
```

### Article Card

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function ArticleCard({ article }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <article ref={cardRef} className="bg-white rounded-lg shadow-md overflow-hidden">
      {(breakpoint === 'xs' || breakpoint === 'sm') && (
        <>
          <img src={article.thumbnail} alt={article.title} className="w-full h-40 object-cover" />
          <div className="p-3">
            <h3 className="font-bold text-sm line-clamp-2">{article.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{article.date}</p>
          </div>
        </>
      )}

      {(breakpoint === 'md' || breakpoint === 'lg') && (
        <div className="flex">
          <img src={article.image} alt={article.title} className="w-48 h-48 object-cover" />
          <div className="flex-1 p-4">
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{article.date}</span>
              <button className="text-sm text-blue-600 hover:underline">Read more</button>
            </div>
          </div>
        </div>
      )}

      {(breakpoint === 'xl' || breakpoint === '_2xl') && (
        <div>
          <img src={article.largeImage} alt={article.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-gray-500">{article.date}</p>
              </div>
            </div>
            <h3 className="font-bold text-2xl mb-3">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex items-center gap-2 mb-4">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Read Full Article
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
```

---

## Reusable Components

Build truly reusable components that adapt to their container.

### Sidebar Component

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function Sidebar({ items }) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(sidebarRef);

  const showLabels = breakpoint !== 'xs' && breakpoint !== 'sm';
  const isCollapsed = breakpoint === 'xs';

  return (
    <aside ref={sidebarRef} className={`bg-gray-900 text-white ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <nav className="p-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
          >
            <item.icon className="w-5 h-5" />
            {showLabels && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
```

### Data Widget

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function DataWidget({ title, value, trend, data }) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(widgetRef);

  return (
    <div ref={widgetRef} className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>

      {(breakpoint === 'md' || breakpoint === 'lg') && (
        <div className="flex items-center gap-2 mt-2">
          <TrendIndicator trend={trend} />
          <span className="text-sm text-gray-500">{trend}% vs last month</span>
        </div>
      )}

      {(breakpoint === 'lg' || breakpoint === 'xl') && (
        <div className="mt-4">
          <MiniChart data={data} />
        </div>
      )}
    </div>
  );
}
```

---

## Nested Containers

Handle nested responsive containers.

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function Dashboard() {
  return (
    <div className="p-4">
      <ResponsiveSection title="Analytics">
        <div className="grid gap-4">
          <ResponsiveWidget type="revenue" />
          <ResponsiveWidget type="users" />
          <ResponsiveWidget type="orders" />
        </div>
      </ResponsiveSection>
    </div>
  );
}

function ResponsiveSection({ title, children }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(sectionRef);

  return (
    <section ref={sectionRef} className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className={breakpoint === 'xs' ? 'space-y-4' : 'grid grid-cols-3 gap-4'}>{children}</div>
    </section>
  );
}

function ResponsiveWidget({ type }) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(widgetRef);

  return (
    <div ref={widgetRef} className="bg-white rounded shadow p-3">
      <p className="text-sm text-gray-600">{type}</p>
      {breakpoint !== 'xs' && <Chart type={type} />}
    </div>
  );
}
```

---

## Combining with CSS Container Queries

Use CSS for styling and JavaScript for logic.

```tsx
import { useRef } from 'react';
import { useContainerBreakpoint } from 'react-tw-breakpoints';

function SmartCard({ data }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useContainerBreakpoint(cardRef);

  return (
    <div ref={cardRef} className="[container-type:inline-size] card">
      {/* CSS handles layout via @container queries */}
      <div className="card-content">
        <img src={data.image} alt={data.title} className="card-image" />
        <h3 className="card-title">{data.title}</h3>
        <p className="card-description">{data.description}</p>

        {/* JavaScript handles conditional features */}
        {breakpoint === 'lg' && <RatingStars rating={data.rating} />}
        {breakpoint === 'xl' && (
          <>
            <DetailedInfo info={data.details} />
            <ActionButtons actions={data.actions} />
          </>
        )}
      </div>
    </div>
  );
}
```

**Corresponding CSS:**

```css
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@container (width >= 640px) {
  .card-content {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }

  .card-image {
    grid-row: 1 / -1;
  }
}

@container (width >= 1024px) {
  .card-content {
    grid-template-columns: 300px 1fr 200px;
  }
}
```

---

## Best Practices

1. **Use for component logic**: Use `useContainerBreakpoint` for conditional rendering
2. **CSS for styling**: Use CSS `@container` queries for layout and styling
3. **Reusable components**: Build components that work in any container size
4. **Performance**: Container queries are efficient, don't worry about multiple instances
5. **Testing**: Test components at different container sizes, not just viewport sizes

---

## Related

- [Viewport Hooks Examples](viewport-hooks.md) - Viewport-based responsiveness
- [CSS Container Queries Guide](../../guides/css-container-queries.md) - Using CSS `@container`
- [Hooks API Reference](../../api/hooks.md) - Complete API documentation
