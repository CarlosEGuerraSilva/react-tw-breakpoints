import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mediaQueryStore, __internal__ } from '../core/media-query-store';

describe('MediaQueryStore - Multiple Changes', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let listeners: Map<string, Set<(e: MediaQueryListEvent) => void>>;
  let matchStates: Map<string, boolean>;

  beforeEach(() => {
    listeners = new Map();
    matchStates = new Map();

    mockMatchMedia = vi.fn((query: string) => {
      if (!matchStates.has(query)) {
        matchStates.set(query, false);
      }

      const mql = {
        get matches() {
          return matchStates.get(query) ?? false;
        },
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
            if (listeners.get(query)!.size === 0) {
              listeners.delete(query);
            }
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
    listeners.clear();
    matchStates.clear();
    __internal__.clearAllListeners();
  });

  const triggerMediaQueryChange = (query: string, matches: boolean) => {
    matchStates.set(query, matches);
    const queryListeners = listeners.get(query);
    if (queryListeners) {
      queryListeners.forEach((listener) => {
        listener({
          matches,
          media: query,
        } as MediaQueryListEvent);
      });
    }
  };

  it('should trigger listener on first media query change', () => {
    const query = '(max-width: 767px)';
    const listener = vi.fn();

    mediaQueryStore.subscribe(query, listener);

    const registeredListeners = listeners.get(query);
    expect(registeredListeners).toBeDefined();
    expect(registeredListeners!.size).toBe(1);

    triggerMediaQueryChange(query, true);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should trigger listener on second media query change', () => {
    const query = '(max-width: 767px)';
    const listener = vi.fn();

    mediaQueryStore.subscribe(query, listener);

    triggerMediaQueryChange(query, true);
    expect(listener).toHaveBeenCalledTimes(1);

    triggerMediaQueryChange(query, false);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('should trigger listener on multiple consecutive changes', () => {
    const query = '(max-width: 767px)';
    const listener = vi.fn();

    mediaQueryStore.subscribe(query, listener);

    triggerMediaQueryChange(query, true);
    triggerMediaQueryChange(query, false);
    triggerMediaQueryChange(query, true);
    triggerMediaQueryChange(query, false);
    triggerMediaQueryChange(query, true);

    expect(listener).toHaveBeenCalledTimes(5);
  });

  it('should handle multiple listeners on same query with multiple changes', () => {
    const query = '(max-width: 767px)';
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    mediaQueryStore.subscribe(query, listener1);
    mediaQueryStore.subscribe(query, listener2);
    mediaQueryStore.subscribe(query, listener3);

    triggerMediaQueryChange(query, true);
    triggerMediaQueryChange(query, false);
    triggerMediaQueryChange(query, true);

    expect(listener1).toHaveBeenCalledTimes(3);
    expect(listener2).toHaveBeenCalledTimes(3);
    expect(listener3).toHaveBeenCalledTimes(3);
  });

  it('should not trigger unsubscribed listener on subsequent changes', () => {
    const query = '(max-width: 767px)';
    const listener = vi.fn();

    const unsubscribe = mediaQueryStore.subscribe(query, listener);

    triggerMediaQueryChange(query, true);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    triggerMediaQueryChange(query, false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should handle different queries independently', () => {
    const query1 = '(max-width: 767px)';
    const query2 = '(min-width: 768px)';
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    mediaQueryStore.subscribe(query1, listener1);
    mediaQueryStore.subscribe(query2, listener2);

    triggerMediaQueryChange(query1, true);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(0);

    triggerMediaQueryChange(query2, true);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    triggerMediaQueryChange(query1, false);
    expect(listener1).toHaveBeenCalledTimes(2);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it('should reflect state changes in getSnapshot', () => {
    const query = '(max-width: 767px)';

    expect(mediaQueryStore.getSnapshot(query)).toBe(false);

    triggerMediaQueryChange(query, true);
    expect(mediaQueryStore.getSnapshot(query)).toBe(true);

    triggerMediaQueryChange(query, false);
    expect(mediaQueryStore.getSnapshot(query)).toBe(false);

    triggerMediaQueryChange(query, true);
    expect(mediaQueryStore.getSnapshot(query)).toBe(true);
  });

  it('should handle rapid successive changes', () => {
    const query = '(max-width: 767px)';
    const listener = vi.fn();

    mediaQueryStore.subscribe(query, listener);

    for (let i = 0; i < 10; i++) {
      triggerMediaQueryChange(query, i % 2 === 0);
    }

    expect(listener).toHaveBeenCalledTimes(10);
  });

  it('should cleanup listeners properly after multiple subscriptions and unsubscriptions', () => {
    const query = '(max-width: 767px)';
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    const unsub1 = mediaQueryStore.subscribe(query, listener1);
    const unsub2 = mediaQueryStore.subscribe(query, listener2);

    triggerMediaQueryChange(query, true);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    unsub1();

    triggerMediaQueryChange(query, false);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);

    unsub2();

    triggerMediaQueryChange(query, true);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
