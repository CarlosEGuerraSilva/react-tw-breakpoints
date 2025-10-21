import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useBreakpointUp,
  useBreakpointDown,
  useBreakpointOnly,
  useBreakpointBetween,
} from '../hooks/use-breakpoint-helpers';
import { mediaQueryCache } from '../helpers/get-media-query';
import { clearBreakpointCache } from '../core/breakpoint-cache';

describe('use-breakpoint-helpers', () => {
  const setupMatchMedia = (currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const breakpoints = {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    };

    const breakpointMaxWidths = {
      xs: '639px',
      sm: '767px',
      md: '1023px',
      lg: '1279px',
      xl: '9999px',
    };

    const queries: Record<string, boolean> = {};

    Object.entries(breakpoints).forEach(([name, size]) => {
      const shouldMatch =
        name === 'xs'
          ? true
          : name === 'sm'
            ? ['sm', 'md', 'lg', 'xl'].includes(currentBreakpoint)
            : name === 'md'
              ? ['md', 'lg', 'xl'].includes(currentBreakpoint)
              : name === 'lg'
                ? ['lg', 'xl'].includes(currentBreakpoint)
                : name === 'xl'
                  ? currentBreakpoint === 'xl'
                  : false;

      queries[`(min-width: ${size})`] = shouldMatch;
    });

    Object.entries(breakpointMaxWidths).forEach(([name, maxSize]) => {
      const shouldMatch =
        name === 'xs'
          ? currentBreakpoint === 'xs'
          : name === 'sm'
            ? ['xs', 'sm'].includes(currentBreakpoint)
            : name === 'md'
              ? ['xs', 'sm', 'md'].includes(currentBreakpoint)
              : name === 'lg'
                ? ['xs', 'sm', 'md', 'lg'].includes(currentBreakpoint)
                : true;

      queries[`(max-width: ${maxSize})`] = shouldMatch;
    });

    window.matchMedia = vi.fn((query: string) => ({
      matches: queries[query] || false,
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
    vi.clearAllMocks();
    clearBreakpointCache();
    mediaQueryCache.clear();
  });

  afterEach(() => {
    mediaQueryCache.clear();
  });

  describe('useBreakpointUp', () => {
    it('should return true when viewport is at or above breakpoint', () => {
      setupMatchMedia('md');
      const { result } = renderHook(() => useBreakpointUp('md'));
      expect(result.current).toBe(true);
    });

    it('should return false when viewport is below breakpoint', () => {
      setupMatchMedia('sm');
      const { result } = renderHook(() => useBreakpointUp('md'));
      expect(result.current).toBe(false);
    });

    it('should return true for xs when viewport is at any breakpoint', () => {
      setupMatchMedia('lg');
      const { result } = renderHook(() => useBreakpointUp('xs'));
      expect(result.current).toBe(true);
    });
  });

  describe('useBreakpointDown', () => {
    it('should return true when viewport is below breakpoint', () => {
      setupMatchMedia('sm');
      const { result } = renderHook(() => useBreakpointDown('lg'));
      expect(result.current).toBe(true);
    });

    it('should return false when viewport is at or above breakpoint', () => {
      setupMatchMedia('lg');
      const { result } = renderHook(() => useBreakpointDown('lg'));
      expect(result.current).toBe(false);
    });

    it('should return false when viewport is above breakpoint', () => {
      setupMatchMedia('xl');
      const { result } = renderHook(() => useBreakpointDown('md'));
      expect(result.current).toBe(false);
    });
  });

  describe('useBreakpointOnly', () => {
    it('should return true when viewport is exactly at breakpoint', () => {
      setupMatchMedia('md');
      const { result } = renderHook(() => useBreakpointOnly('md'));
      expect(result.current).toBe(true);
    });

    it('should return false when viewport is not at breakpoint', () => {
      setupMatchMedia('lg');
      const { result } = renderHook(() => useBreakpointOnly('md'));
      expect(result.current).toBe(false);
    });
  });

  describe('useBreakpointBetween', () => {
    it('should return true when viewport is between breakpoints', () => {
      setupMatchMedia('md');
      const { result } = renderHook(() => useBreakpointBetween('sm', 'lg'));
      expect(result.current).toBe(true);
    });

    it('should return false when viewport is outside range', () => {
      setupMatchMedia('xs');
      const { result } = renderHook(() => useBreakpointBetween('sm', 'lg'));
      expect(result.current).toBe(false);
    });

    it('should return false when viewport is above max', () => {
      setupMatchMedia('xl');
      const { result } = renderHook(() => useBreakpointBetween('sm', 'lg'));
      expect(result.current).toBe(false);
    });

    it('should return true when viewport is at min breakpoint', () => {
      setupMatchMedia('sm');
      const { result } = renderHook(() => useBreakpointBetween('sm', 'lg'));
      expect(result.current).toBe(true);
    });
  });
});
