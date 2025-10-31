import { BreakpointEnum, StaticBreakpoint } from '../const/breakpoints';
import { isServer } from '../utils/ssr-utils';
import { clearBreakpointCache } from './breakpoint-cache';

const listeners = new Set<() => void>();
const mediaQueries = new Map<string, MediaQueryList>();
const queryListeners = new Map<string, Set<() => void>>();
const queryHandlers = new Map<string, () => void>();

const getMediaQuery = (query: string): MediaQueryList | null => {
  if (isServer()) {
    return null;
  }

  if (!mediaQueries.has(query)) {
    const mql = window.matchMedia(query);
    mediaQueries.set(query, mql);
  }

  return mediaQueries.get(query) ?? null;
};

const onChange = () => {
  clearBreakpointCache();
  listeners.forEach((l) => l());
};

const onQueryChange = (query: string): (() => void) => {
  if (!queryHandlers.has(query)) {
    const handler = () => {
      clearBreakpointCache();
      const queryListener = queryListeners.get(query);
      if (queryListener) {
        queryListener.forEach((l) => l());
      }
    };
    queryHandlers.set(query, handler);
  }
  return queryHandlers.get(query)!;
};

/**
 * Subscribe to a media query and be notified on changes.
 * In SSR, no listeners are attached.
 */
const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (listeners.size === 1) {
    Object.values(BreakpointEnum).forEach((size) => {
      const mql = getMediaQuery(`(min-width: ${size})`);
      mql?.addEventListener('change', onChange);
    });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      Object.values(BreakpointEnum).forEach((size) => {
        const mql = getMediaQuery(`(min-width: ${size})`);
        mql?.removeEventListener('change', onChange);
      });
    }
  };
};

/**
 * Return current match state for a query.
 * In SSR, returns false.
 */
const getSnapshot = (query: string): boolean => {
  const mql = getMediaQuery(query);
  return mql?.matches ?? false;
};

/**
 * Server snapshot: always false to keep hydration stable.
 */
const getServerSnapshot = (): boolean => false;

export const mediaQueryStore = {
  subscribe: (query: string, listener: () => void) => {
    if (!queryListeners.has(query)) {
      queryListeners.set(query, new Set());
    }

    const queryListener = queryListeners.get(query)!;
    queryListener.add(listener);

    if (queryListener.size === 1) {
      const mql = getMediaQuery(query);
      const handler = onQueryChange(query);
      mql?.addEventListener('change', handler);
    }

    return () => {
      queryListener.delete(listener);

      if (queryListener.size === 0) {
        const mql = getMediaQuery(query);
        const handler = queryHandlers.get(query);
        if (handler) {
          mql?.removeEventListener('change', handler);
        }
        queryListeners.delete(query);
        queryHandlers.delete(query);
      }
    };
  },
  getSnapshot,
  getServerSnapshot,
};

export const breakpointStore = {
  subscribe,
  getSnapshot: () => true,
  getServerSnapshot: (): StaticBreakpoint => 'xs',
};

/**
 * Internal testing utilities.
 * @internal
 */
export const __internal__ = {
  clearAllListeners: () => {
    listeners.clear();
    queryListeners.clear();
    queryHandlers.clear();
    mediaQueries.clear();
  },
};
