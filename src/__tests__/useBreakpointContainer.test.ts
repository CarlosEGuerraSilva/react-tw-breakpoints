import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpointContainer } from '../hooks/useBreakpointContainer';

describe('useBreakpointContainer', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: (query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addEventListener: () => { },
				removeEventListener: () => { },
				addListener: () => { },
				removeListener: () => { },
				dispatchEvent: () => false,
			}),
		});
	});

	it('should return xs as default container breakpoint in test environment', () => {
		const { result } = renderHook(() => useBreakpointContainer());
		expect(result.current).toBe('xs');
	});

	it('should be a valid container breakpoint value', () => {
		const { result } = renderHook(() => useBreakpointContainer());
		const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl'];
		expect(validBreakpoints).toContain(result.current);
	});

	it('should remain stable across re-renders', () => {
		const { result, rerender } = renderHook(() => useBreakpointContainer());
		const initial = result.current;
		rerender();
		expect(result.current).toBe(initial);
	});
});
