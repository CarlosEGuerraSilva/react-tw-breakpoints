# Container Component Examples

> [!CAUTION]
> These components are experimental and may change their API or functionality. They are subject to discussion and improvement proposals, so breaking changes or even removal may occur. Use them at your own risk.

The `<Container>` component is inspired by Material UI's Container. It provides a centered layout wrapper with configurable max-width constraints.

## Component Behavior

- **Centered by default**: Uses `mx-auto` for automatic horizontal centering
- **Horizontal padding**: Applies `px-2` (0.5rem) by default
- **Responsive max-width**: Default is `lg` (1024px in Tailwind)
- **Full-width container**: Uses `container` class for responsive behavior

## Table of Contents

- [Basic Usage](#basic-usage)
- [Max-Width Options](#max-width-options)
- [Full-Width Sections](#full-width-sections)
- [Nested Containers](#nested-containers)
- [Removing Padding](#removing-padding)

---

## Basic Usage

The Container centers content and constrains its width.

```tsx
import { Container } from 'react-tw-breakpoints';

function App() {
  return (
    <Container>
      <h1>Welcome</h1>
      <p>This content is centered with a max-width of 1024px (default: lg)</p>
    </Container>
  );
}
```

**Default behavior**: Content is centered horizontally with `max-width: 1024px` and `padding: 0 0.5rem`

---

## Max-Width Options

Control the maximum width with the `maxWidth` prop.

```tsx
import { Container } from 'react-tw-breakpoints';

function Page() {
  return (
    <>
      {/* Small container: 640px */}
      <Container maxWidth="sm">
        <p>Small container (640px max-width)</p>
      </Container>

      {/* Medium container: 768px */}
      <Container maxWidth="md">
        <p>Medium container (768px max-width)</p>
      </Container>

      {/* Large container: 1024px (default) */}
      <Container maxWidth="lg">
        <p>Large container (1024px max-width)</p>
      </Container>

      {/* Extra large: 1280px */}
      <Container maxWidth="xl">
        <p>Extra large container (1280px max-width)</p>
      </Container>

      {/* 2XL and beyond: 1536px, 1792px, 2048px, 2304px, 2560px */}
      <Container maxWidth="2xl">
        <p>2XL container (1536px max-width)</p>
      </Container>

      {/* Custom sizes: 8xl = 1600px, 9xl = 1800px */}
      <Container maxWidth="8xl">
        <p>Custom 8XL container (1600px max-width)</p>
      </Container>

      <Container maxWidth="9xl">
        <p>Custom 9XL container (1800px max-width)</p>
      </Container>

      {/* Full width: no max-width constraint */}
      <Container maxWidth="full">
        <p>Full-width container (no max-width)</p>
      </Container>
    </>
  );
}
```

**Available maxWidth values**: `sm`, `md`, `lg` (default), `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl` (1600px), `9xl` (1800px), `full`

---

## Full-Width Sections

Combine full-width backgrounds with centered content.

```tsx
import { Container } from 'react-tw-breakpoints';

function LandingPage() {
  return (
    <>
      {/* Full-width hero background with centered content */}
      <section className="bg-blue-600 text-white py-20">
        <Container>
          <h1 className="text-4xl font-bold">Hero Section</h1>
          <p className="text-lg mt-4">Full-width background, centered content</p>
        </Container>
      </section>

      {/* Contained section */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-3 gap-8">
          <FeatureCard title="Fast" icon="⚡" />
          <FeatureCard title="Secure" icon="🔒" />
          <FeatureCard title="Scalable" icon="📈" />
        </div>
      </Container>

      {/* Full-width CTA */}
      <section className="bg-gray-900 text-white py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold">
            Sign Up Free
          </button>
        </Container>
      </section>
    </>
  );
}
```

---

## Nested Containers

Use different max-widths for inner containers.

```tsx
import { Container } from 'react-tw-breakpoints';

function BlogPost() {
  return (
    <Container maxWidth="xl" className="py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Article Title</h1>
          <p className="text-gray-600">Published on Jan 1, 2024</p>
        </header>

        {/* Narrower container for readable text */}
        <Container maxWidth="md" className="prose prose-lg">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
        </Container>

        {/* Full-width image within outer container */}
        <figure className="my-12">
          <img src="/article-image.jpg" alt="Article illustration" className="w-full rounded-lg" />
          <figcaption className="text-center text-sm text-gray-600 mt-2">Image caption</figcaption>
        </figure>

        {/* Back to narrow for text */}
        <Container maxWidth="md" className="prose prose-lg">
          <p>Ut enim ad minim veniam, quis nostrud exercitation...</p>
        </Container>
      </article>
    </Container>
  );
}
```

---

## Removing Padding

The Container has `px-2` by default. You can remove or override it.

```tsx
import { Container } from 'react-tw-breakpoints';

function NoPadding() {
  return (
    <Container className="px-0">
      <img src="/full-width-image.jpg" alt="Full width" className="w-full" />
    </Container>
  );
}

function CustomPadding() {
  return (
    <Container className="px-4 sm:px-6 lg:px-8">
      <h1>Custom responsive padding</h1>
    </Container>
  );
}
```

---

## Page Layout Pattern

Complete page layout with header, main, and footer.

```tsx
import { Container } from 'react-tw-breakpoints';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <Container className="py-4">
          <nav className="flex items-center justify-between">
            <Logo />
            <Navigation />
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-8">{children}</Container>
      </main>

      <footer className="bg-gray-900 text-white">
        <Container className="py-8">
          <FooterContent />
        </Container>
      </footer>
    </div>
  );
}
```

---

## Props Reference

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

**Default values:**

- `maxWidth`: `'lg'` (1024px)
- Always centered with `mx-auto`
- Default padding: `px-2` (0.5rem)

---

## Configuration Requirements

The `Container` component generates dynamic Tailwind classes for `maxWidth` (including arbitrary values like `max-w-[1600px]`). To ensure these classes are present in your build, configure Tailwind safelist as described in the [Tailwind Safelist Guide](../../guides/tailwind-safelist.md).

---

## Related

- [Grid Component Examples](grid.md) - Responsive grid layouts
- [Viewport Hooks Examples](../hooks/viewport-hooks.md) - Hook-based responsiveness
- [Components API Reference](../../api/components.md) - Complete component API
