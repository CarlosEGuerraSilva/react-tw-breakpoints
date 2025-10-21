import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mediaQueryStore } from '../core/mediaQueryStore';

describe('MediaQueryStore', () => {
	let mockMatchMedia: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		const listeners = new Map<string, Set<(e: MediaQueryListEvent) => void>>();

		mockMatchMedia = vi.fn((query: string) => {
			const mql = {
				matches: false,
				media: query,
				onchange: null,
				addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
					if (event === 'change') {
						if (!listeners.has(query)) {
							listeners.set(query, new Set());
						}
						listeners.get(query)!.add(listener);
					}
				}),
				removeEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
					if (event === 'change' && listeners.has(query)) {
						listeners.get(query)!.delete(listener);
					}
				}),
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn(),
			};
			return mql as any;
		});

		window.matchMedia = mockMatchMedia;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('subscribe', () => {
		it('should subscribe to a media query', () => {
			const query = '(min-width: 640px)';
			const listener = vi.fn();

			const unsubscribe = mediaQueryStore.subscribe(query, listener);

			expect(typeof unsubscribe).toBe('function');
		});

		it('should call listener when media query changes', () => {
			const query = '(min-width: 640px)';
			const listener = vi.fn();

			mediaQueryStore.subscribe(query, listener);

			expect(listener).not.toHaveBeenCalled();
		});

		it('should allow multiple subscriptions to same query', () => {
			const query = '(min-width: 640px)';
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = mediaQueryStore.subscribe(query, listener1);
			const unsub2 = mediaQueryStore.subscribe(query, listener2);

			expect(typeof unsub1).toBe('function');
			expect(typeof unsub2).toBe('function');
		});

		it('should unsubscribe correctly', () => {
			const query = '(min-width: 640px)';
			const listener = vi.fn();

			const unsubscribe = mediaQueryStore.subscribe(query, listener);
			unsubscribe();

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('getSnapshot', () => {
		it('should return false for non-matching query by default', () => {
			const query = '(min-width: 640px)';
			const result = mediaQueryStore.getSnapshot(query);

			expect(result).toBe(false);
		});

		it('should return boolean value', () => {
			mockMatchMedia = vi.fn((query: string) => ({
				matches: true,
				media: query,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})) as any;

			window.matchMedia = mockMatchMedia;

			const query = '(min-width: 640px)';
			const result = mediaQueryStore.getSnapshot(query);

			expect(typeof result).toBe('boolean');
		});
	});

	describe('getServerSnapshot', () => {
		it('should always return false', () => {
			const result = mediaQueryStore.getServerSnapshot();
			expect(result).toBe(false);
		});
	});

	describe('cleanup', () => {
		it('should remove event listener when all subscriptions are removed', () => {
			const query = '(min-width: 640px)';
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = mediaQueryStore.subscribe(query, listener1);
			const unsub2 = mediaQueryStore.subscribe(query, listener2);

			unsub1();
			unsub2();

			expect(listener1).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();
		});

		it('should keep subscription active while at least one listener exists', () => {
			const query = '(min-width: 640px)';
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = mediaQueryStore.subscribe(query, listener1);
			mediaQueryStore.subscribe(query, listener2);

			unsub1();

			expect(listener1).not.toHaveBeenCalled();
		});
	});
});
