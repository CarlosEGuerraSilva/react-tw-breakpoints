import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCachedBreakpoint, clearBreakpointCache } from '../core/breakpoint-cache';
import { mediaQueryCache } from '../helpers/get-media-query';

describe('breakpoint-cache', () => {
	const setupMatchMedia = (matches: Record<string, boolean>) => {
		window.matchMedia = vi.fn((query: string) => ({
			matches: matches[query] || false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})) as any;
	};

	beforeEach(() => {
		clearBreakpointCache();
		mediaQueryCache.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		mediaQueryCache.clear();
	});

	describe('getCachedBreakpoint', () => {
		it('should return "xs" on server and small screens', () => {
			setupMatchMedia({});
			const result = getCachedBreakpoint();
			expect(result).toBe('xs');
		});

		it('should return current breakpoint on client', () => {
			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
			});

			const result = getCachedBreakpoint();
			expect(result).toBe('md');
		});

		it('should return cached value on subsequent calls', () => {
			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
			});

			const matchMediaMock = window.matchMedia as any;

			const firstCall = getCachedBreakpoint();
			const initialCallCount = matchMediaMock.mock.calls.length;

			const secondCall = getCachedBreakpoint();
			const thirdCall = getCachedBreakpoint();
			const finalCallCount = matchMediaMock.mock.calls.length;

			expect(firstCall).toBe('md');
			expect(secondCall).toBe('md');
			expect(thirdCall).toBe('md');
			expect(finalCallCount).toBe(initialCallCount);
		});

		it('should recalculate when forceRecalculate is true', () => {
			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
			});

			const firstResult = getCachedBreakpoint();
			expect(firstResult).toBe('md');

			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
				'(min-width: 1024px)': true,
			});

			mediaQueryCache.clear();

			const cachedResult = getCachedBreakpoint();
			expect(cachedResult).toBe('md');

			const recalculatedResult = getCachedBreakpoint(true);
			expect(recalculatedResult).toBe('lg');
		});
	});

	describe('clearBreakpointCache', () => {
		it('should clear cached breakpoint', () => {
			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
			});

			const firstResult = getCachedBreakpoint();
			expect(firstResult).toBe('md');

			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
				'(min-width: 1024px)': true,
			});

			mediaQueryCache.clear();

			const cachedResult = getCachedBreakpoint();
			expect(cachedResult).toBe('md');

			clearBreakpointCache();

			const recalculatedResult = getCachedBreakpoint();
			expect(recalculatedResult).toBe('lg');
		});

		it('should allow recalculation after clearing', () => {
			setupMatchMedia({});

			const firstResult = getCachedBreakpoint();
			expect(firstResult).toBe('xs');

			setupMatchMedia({
				'(min-width: 0px)': true,
				'(min-width: 640px)': true,
				'(min-width: 768px)': true,
				'(min-width: 1024px)': true,
			});

			clearBreakpointCache();
			mediaQueryCache.clear();

			const secondResult = getCachedBreakpoint();
			expect(secondResult).toBe('lg');
		});
	});
});
