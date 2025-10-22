# Docs

Welcome to the `react-tw-breakpoints` documentation. This index provides a comprehensive overview of all available documentation.

## Getting Started

- [README](../README.md) - Project overview and quick start guide
- [Installation](../README.md#installation) - How to install the package
- [Quick Start](../README.md#quick-start) - Basic usage examples

## API Reference

### Hooks

Detailed documentation for all React hooks provided by the library.

- [useBreakpoint](api/hooks.md#usebreakpoint) - Get current viewport breakpoint
- [useBreakpointCondition](api/hooks.md#usebreakpointcondition) - Evaluate breakpoint conditions
- [useBreakpointContainer](api/hooks.md#usebreakpointcontainer) - Container breakpoint (viewport-based)
- [useBreakpointContainerCondition](api/hooks.md#usebreakpointcontainercondition) - Container breakpoint conditions
- [useContainerBreakpoint](api/hooks.md#usecontainerbreakpoint) - True per-element breakpoint

**Helper Hooks:**

- [useBreakpointUp](api/hooks.md#usebreakpointup) - Check if at or above breakpoint
- [useBreakpointDown](api/hooks.md#usebreakpointdown) - Check if below breakpoint
- [useBreakpointOnly](api/hooks.md#usebreakpointonly) - Check if exactly at breakpoint
- [useBreakpointBetween](api/hooks.md#usebreakpointbetween) - Check if between breakpoints

[Full Hooks API Reference](api/hooks.md)

### Helpers

Utility functions for working with breakpoints outside of React components.

- [getCurrentBreakpoint](api/helpers.md#getcurrentbreakpoint) - Synchronously get current breakpoint
- [getMediaQuery](api/helpers.md#getmediaquery) - Get cached MediaQueryList

[Full Helpers API Reference](api/helpers.md)

### Components

Optional UI components for Tailwind CSS layouts.

- [Container](api/components.md#container) - Centered wrapper with max-width
- [Grid](api/components.md#grid) - 12-column responsive grid system

[Full Components API Reference](api/components.md)

## Guides

In-depth guides for specific topics.

### Configuration

- [Tailwind Safelist Configuration](guides/tailwind-safelist.md) - Required setup for Container and Grid components

### Advanced Topics

- [CSS Container Queries](guides/css-container-queries.md) - Using native CSS `@container` queries
- [SSR and Hydration](guides/ssr.md) - Server-side rendering best practices

## Examples

Practical examples for common use cases.

### Basic Usage

- [Responsive Navigation](examples/hooks/viewport-hooks.md#responsive-navigation)
- [Adaptive Layouts](examples/hooks/viewport-hooks.md#adaptive-layouts)
- [Conditional Rendering](examples/hooks/viewport-hooks.md#conditional-rendering)
- [Responsive Cards](examples/hooks/container-hooks.md#adaptive-cards)
- [Dashboard Layouts](examples/components/grid.md#complex-layouts)
- [Sidebar Behavior](examples/hooks/container-hooks.md#sidebar-component)

[All Examples](examples/examples.md)

### Advanced Patterns

See:

- [Examples](examples/examples.md)
- [Guides](guides/guides.md)

## Contributing

- [Contributing Guidelines](../CONTRIBUTING.md) - How to contribute to the project
- [Code of Conduct](../CODE_OF_CONDUCT.MD) - Community guidelines
- [Agents Guidelines](../AGENTS.md) - Code style and best practices for AI-generated code
- [Testing Guidelines](../TESTING.md) - How to write and run tests

## Additional Resources

### Browser Compatibility

- `matchMedia`: All modern browsers
- `ResizeObserver`: Chrome/Edge 64+, Safari 13.1+, Firefox 69+
- CSS `@container`: Chrome/Edge 105+, Safari 16+, Firefox 110+

### Related Links

- [NPM Package](https://www.npmjs.com/package/react-tw-breakpoints)
- [GitHub Repository](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints)
- [Issue Tracker](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues)
- [Ask DeepWiki](https://deepwiki.com/CarlosEGuerraSilva/react-tw-breakpoints)

### External Documentation

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [MDN: Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

## FAQ

### Why two kinds of "container breakpoints"?

- `useBreakpointContainer`: Uses viewport with a different label set (useful if you want two global grids)
- `useContainerBreakpoint`: True per-element based on actual element width

### Can I change breakpoints?

Yes, edit `src/const/breakpoints.ts` and rebuild the package. Note that this requires forking the project.

### Is tree-shaking supported?

Yes. The package exports ESM with `sideEffects: false`. Import only what you use and unused code will be eliminated.

### How does it work with SSR?

All hooks use `useSyncExternalStore` for safe hydration. Server-side they return default values (`'xs'` or `false`) and hydrate properly on the client. See the [SSR Guide](guides/ssr.md) for details.

### Do I need Tailwind CSS?

Tailwind is optional for the hooks—you can use any styling solution. If you use the experimental `Container` and `Grid` components, Tailwind CSS is required and you must configure a safelist so their dynamic classes are included. See the [Tailwind Safelist Configuration](guides/tailwind-safelist.md).

### What about performance?

The library is highly optimized:

- Media queries are cached and deduplicated
- ResizeObservers are shared between components
- Uses React's `useSyncExternalStore` for efficient updates
- Minimal bundle size (check the badge in README)

## Need Help?

If you can't find what you're looking for:

1. Check the [FAQ](../README.md#faq) in the README
2. Search [existing issues](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues)
3. Ask on [DeepWiki](https://deepwiki.com/CarlosEGuerraSilva/react-tw-breakpoints)
4. [Open a new issue](https://github.com/CarlosEGuerraSilva/react-tw-breakpoints/issues/new)

---

**Last Updated**: October 2025
