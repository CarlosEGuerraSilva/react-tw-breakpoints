import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpoint } from '../hooks/useBreakpoint';

describe('useBreakpoint', () => {
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

	it('should return xs as default breakpoint in test environment', () => {
		const { result } = renderHook(() => useBreakpoint());
		expect(result.current).toBe('xs');
	});

	it('should be a valid breakpoint value', () => {
		const { result } = renderHook(() => useBreakpoint());
		const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl'];
		expect(validBreakpoints).toContain(result.current);
	});

	it('should remain stable across re-renders', () => {
		const { result, rerender } = renderHook(() => useBreakpoint());
		const initial = result.current;
		rerender();
		expect(result.current).toBe(initial);
	});
});
