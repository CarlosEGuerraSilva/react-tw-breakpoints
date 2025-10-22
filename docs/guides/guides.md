# Guides

Comprehensive guides for using `react-tw-breakpoints` effectively.

## Available Guides

### [Tailwind Safelist Configuration](tailwind-safelist.md)

Learn how to configure Tailwind CSS to work with the `Container` and `Grid` components. This guide covers:

- Why safelist configuration is needed
- Setup for Tailwind v4
- Setup for Tailwind v3
- Verification and troubleshooting
- Performance considerations

**When to read**: Before using `Container` or `Grid` components.

---

### [CSS Container Queries](css-container-queries.md)

Master native CSS `@container` queries for style-based responsive design. This guide covers:

- Browser support and compatibility
- Basic setup with `container-type`
- Using `@container` queries in CSS
- Container query units (`cqw`, `cqh`, etc.)
- Integration with Tailwind v4
- Practical examples and patterns
- Combining with JavaScript hooks
- Debugging container queries

**When to read**: When you want to use CSS for responsive styling instead of JavaScript.

---

### [SSR and Hydration](ssr.md)

Understand how `react-tw-breakpoints` handles server-side rendering. This guide covers:

- How SSR works with the hooks
- Default server-side values
- Hydration behavior and best practices
- Avoiding layout shift
- Framework-specific tips (Next.js, Remix, Gatsby)
- React Strict Mode compatibility
- Testing SSR behavior
- Common patterns and troubleshooting

**When to read**: When using SSR frameworks like Next.js, Remix, or Gatsby.

---

## Quick Decision Guide

**I want to...**

### ...style components based on their container size

Read [CSS Container Queries](css-container-queries.md)

Use CSS `@container` queries for styling, `useContainerBreakpoint` for conditional logic.

### ...use Grid or Container components

Read [Tailwind Safelist Configuration](tailwind-safelist.md)

Required setup to make dynamic Tailwind classes work.

### ...build an SSR app

Read [SSR and Hydration](ssr.md)

Learn best practices for server-side rendering and avoiding hydration issues.

### ...optimize performance

Read [SSR and Hydration](ssr.md) + [CSS Container Queries](css-container-queries.md)

Use CSS for styling, JavaScript for logic, and follow SSR best practices.

## Related Documentation

- [API Reference](../api/) - Detailed API documentation
- [Examples](../examples/examples.md) - Practical usage examples
- [Main Documentation](../../README.md) - Back to main README

## External Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN: CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [React SSR Documentation](https://react.dev/reference/react-dom/server)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Need help?** Check the [main documentation index](../README.md) or [open an issue](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues).
