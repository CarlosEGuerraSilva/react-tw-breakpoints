# Tests

This project uses [Vitest](https://vitest.dev/) for testing with React Testing Library.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located in `src/__tests__/` directory and organized as follows:

### Unit Tests

- **`ssr-utils.test.ts`**: Tests for SSR utility functions (`isBrowser`, `isServer`, `clientOnly`, `serverOnly`, `ssrSafe`)
- **`breakpoints.test.ts`**: Tests for breakpoint constants and values
- **`getMediaQuery.test.ts`**: Tests for media query helper and caching
- **`getCurrentBreakpoint.test.ts`**: Tests for breakpoint detection logic
- **`mediaQueryStore.test.ts`**: Tests for the media query store subscription system
- **`resizeObserverStore.test.ts`**: Tests for the ResizeObserver store

### Hook Tests

- **`useBreakpoint.test.ts`**: Tests for viewport breakpoint hook
- **`useBreakpointCondition.test.ts`**: Tests for viewport breakpoint conditions
- **`useBreakpointContainer.test.ts`**: Tests for container breakpoint hook (viewport-based)
- **`useBreakpointContainerCondition.test.ts`**: Tests for container breakpoint conditions
- **`useContainerBreakpoint.test.ts`**: Tests for true per-element container breakpoint hook

### Component Tests

- **`Container.test.tsx`**: Tests for Container component props and rendering
- **`Grid.test.tsx`**: Tests for Grid component with responsive sizing

## Test Configuration

The tests are configured with:

- **Environment**: jsdom (browser simulation)
- **Globals**: Enabled for describe/it/expect
- **Setup**: Auto-cleanup after each test
- **Coverage**: V8 provider with HTML/JSON/text reporters

### Coverage Exclusions

The following are excluded from coverage:

- `node_modules/`
- `dist/`
- Type definition files (`**/*.d.ts`)
- Config files (`**/*.config.*`)
- Index files (`**/index.ts`)

## Testing Philosophy

### SSR Compatibility

Tests respect the SSR-first nature of this library:

- Hooks return default values (`xs` or `false`) in test environment (similar to SSR)
- Tests verify behavior without complex mocking when possible
- Focus on API contracts and stability rather than exact breakpoint matching

### What We Test

✅ **Do test:**

- Component rendering and props
- Hook return types and stability
- Store subscription/unsubscription
- Utility function behavior
- SSR-safe patterns

❌ **Don't test:**

- Exact breakpoint detection (requires real browser)
- Complex matchMedia mocking scenarios
- Browser-specific ResizeObserver behavior

## Writing Tests

### Example: Component Test

```typescript
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Container from "../components/Container";

describe("Container Component", () => {
  it("should render children", () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
```

### Example: Hook Test

```typescript
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBreakpoint } from "../hooks/useBreakpoint";

describe("useBreakpoint", () => {
  it("should return valid breakpoint value", () => {
    const { result } = renderHook(() => useBreakpoint());
    const validBreakpoints = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "_2xl",
      "_3xl",
      "_4xl",
      "_5xl",
    ];
    expect(validBreakpoints).toContain(result.current);
  });
});
```

## Continuous Integration

These tests can be run in CI environments:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

### Tests fail with "matchMedia is not defined"

This is expected in some test environments. The hooks handle this gracefully and return SSR-safe defaults.

### Coverage seems low

Some functions are difficult to test in jsdom (browser-specific APIs). Focus on testing the public API surface and critical paths.

### Hooks always return 'xs'

This is correct behavior in test environment. The hooks use `useSyncExternalStore` which returns server snapshots in non-browser environments.
