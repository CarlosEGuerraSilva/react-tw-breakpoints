import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mediaQueryCache } from '../helpers/getMediaQuery';
import { getCurrentBreakpoint } from '../helpers/getCurrentBreakpoint';

describe('getCurrentBreakpoint', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mediaQueryCache.clear();
	});

	afterEach(() => {
		mediaQueryCache.clear();
	});

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

	it('should return xs for small screens', () => {
		setupMatchMedia({});
		expect(getCurrentBreakpoint()).toBe('xs');
	});

	it('should return sm for 640px+ screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('sm');
	});

	it('should return md for 768px+ screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
			'(min-width: 768px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('md');
	});

	it('should return lg for 1024px+ screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
			'(min-width: 768px)': true,
			'(min-width: 1024px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('lg');
	});

	it('should return xl for 1280px+ screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
			'(min-width: 768px)': true,
			'(min-width: 1024px)': true,
			'(min-width: 1280px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('xl');
	});

	it('should return _2xl for 1536px+ screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
			'(min-width: 768px)': true,
			'(min-width: 1024px)': true,
			'(min-width: 1280px)': true,
			'(min-width: 1536px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('_2xl');
	});

	it('should return _5xl for largest screens', () => {
		setupMatchMedia({
			'(min-width: 0px)': true,
			'(min-width: 640px)': true,
			'(min-width: 768px)': true,
			'(min-width: 1024px)': true,
			'(min-width: 1280px)': true,
			'(min-width: 1536px)': true,
			'(min-width: 1792px)': true,
			'(min-width: 2048px)': true,
			'(min-width: 2304px)': true,
		});
		expect(getCurrentBreakpoint()).toBe('_5xl');
	});
});
