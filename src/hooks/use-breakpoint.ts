import { useSyncExternalStore } from 'react';
import { breakpointStore } from '../core/media-query-store';
import { getCachedBreakpoint } from '../core/breakpoint-cache';
import type { StaticBreakpoint } from '../const/breakpoints';

/**
 * Custom hook to get the current active breakpoint.
 * @returns The current active breakpoint.
 */
export function useBreakpoint(): StaticBreakpoint {
  return useSyncExternalStore(
    breakpointStore.subscribe,
    getCachedBreakpoint,
    breakpointStore.getServerSnapshot,
  );
}
