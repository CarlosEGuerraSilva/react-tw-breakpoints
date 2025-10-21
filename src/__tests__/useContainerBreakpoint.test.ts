import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useContainerBreakpoint } from '../hooks';
import { createRef } from 'react';

describe('useContainerBreakpoint', () => {
	it('should return xs for null ref', () => {
		const ref = createRef<HTMLDivElement>();
		const { result } = renderHook(() => useContainerBreakpoint(ref));
		expect(result.current).toBe('xs');
	});

	it('should return xs for element with zero width', () => {
		const div = document.createElement('div');
		Object.defineProperty(div, 'offsetWidth', { value: 0, configurable: true });
		const ref = { current: div };

		const { result } = renderHook(() => useContainerBreakpoint(ref));
		expect(result.current).toBe('xs');
	});

	it('should return valid container breakpoint value', () => {
		const div = document.createElement('div');
		Object.defineProperty(div, 'offsetWidth', { value: 800, configurable: true });
		const ref = { current: div };

		const { result } = renderHook(() => useContainerBreakpoint(ref));
		const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl'];
		expect(validBreakpoints).toContain(result.current);
	});

	it('should be stable across re-renders for same element', () => {
		const div = document.createElement('div');
		Object.defineProperty(div, 'offsetWidth', { value: 1000, configurable: true });
		const ref = { current: div };

		const { result, rerender } = renderHook(() => useContainerBreakpoint(ref));
		const initial = result.current;
		rerender();
		expect(result.current).toBe(initial);
	});
});
