import { StaticBreakpoint } from '../const/breakpoints';
import { isServer } from '../utils/ssr-utils';
import { getCurrentBreakpoint } from '../helpers/get-current-breakpoint';

let cachedBreakpoint: StaticBreakpoint | null = null;

/**
 * Get the current breakpoint from cache or calculate it.
 * @param forceRecalculate Force recalculation even if cached.
 * @returns The current breakpoint.
 */
export const getCachedBreakpoint = (forceRecalculate = false): StaticBreakpoint => {
  if (isServer()) {
    return 'xs';
  }

  if (cachedBreakpoint && !forceRecalculate) {
    return cachedBreakpoint;
  }

  cachedBreakpoint = getCurrentBreakpoint();
  return cachedBreakpoint;
};

/**
 * Clear the cached breakpoint value.
 * Should be called when media queries change.
 */
export const clearBreakpointCache = (): void => {
  cachedBreakpoint = null;
};
