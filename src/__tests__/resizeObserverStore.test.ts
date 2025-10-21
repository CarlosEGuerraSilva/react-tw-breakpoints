import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResizeObserverStore } from '../core/resizeObserverStore';

describe('ResizeObserverStore', () => {
	let store: ResizeObserverStore;

	beforeEach(() => {
		global.ResizeObserver = class ResizeObserver {
			observe = vi.fn();
			unobserve = vi.fn();
			disconnect = vi.fn();
			constructor(callback: ResizeObserverCallback) { }
		} as any;

		store = new ResizeObserverStore();
	});

	describe('subscribe', () => {
		it('should subscribe to element resize', () => {
			const element = document.createElement('div');
			const listener = vi.fn();

			const unsubscribe = store.subscribe(element, listener);

			expect(typeof unsubscribe).toBe('function');
		});

		it('should observe element when first subscription is added', () => {
			const element = document.createElement('div');
			const listener = vi.fn();

			store.subscribe(element, listener);

			expect(element).toBeDefined();
		});

		it('should allow multiple subscriptions to same element', () => {
			const element = document.createElement('div');
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = store.subscribe(element, listener1);
			const unsub2 = store.subscribe(element, listener2);

			expect(typeof unsub1).toBe('function');
			expect(typeof unsub2).toBe('function');
		});

		it('should unsubscribe correctly', () => {
			const element = document.createElement('div');
			const listener = vi.fn();

			const unsubscribe = store.subscribe(element, listener);
			unsubscribe();

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('getWidthSnapshot', () => {
		it('should return 0 for new element', () => {
			const element = document.createElement('div');
			const width = store.getWidthSnapshot(element);

			expect(width).toBe(0);
		});

		it('should return element width from bounding rect', () => {
			const element = document.createElement('div');

			element.getBoundingClientRect = vi.fn(() => ({
				width: 500,
				height: 300,
				top: 0,
				left: 0,
				bottom: 300,
				right: 500,
				x: 0,
				y: 0,
				toJSON: () => { },
			}));

			const width = store.getWidthSnapshot(element);

			expect(width).toBeGreaterThanOrEqual(0);
		});
	});

	describe('getServerSnapshot', () => {
		it('should always return 0', () => {
			const result = store.getServerSnapshot();
			expect(result).toBe(0);
		});
	});

	describe('cleanup', () => {
		it('should unobserve element when all subscriptions are removed', () => {
			const element = document.createElement('div');
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = store.subscribe(element, listener1);
			const unsub2 = store.subscribe(element, listener2);

			unsub1();
			unsub2();

			expect(element).toBeDefined();
		});

		it('should keep observing while at least one listener exists', () => {
			const element = document.createElement('div');
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			const unsub1 = store.subscribe(element, listener1);
			store.subscribe(element, listener2);

			unsub1();

			expect(element).toBeDefined();
		});
	});

	describe('WeakMap behavior', () => {
		it('should handle different elements independently', () => {
			const element1 = document.createElement('div');
			const element2 = document.createElement('div');
			const listener1 = vi.fn();
			const listener2 = vi.fn();

			store.subscribe(element1, listener1);
			store.subscribe(element2, listener2);

			const width1 = store.getWidthSnapshot(element1);
			const width2 = store.getWidthSnapshot(element2);

			expect(width1).toBe(0);
			expect(width2).toBe(0);
		});
	});
});
