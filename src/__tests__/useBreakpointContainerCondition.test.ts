import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpointContainerCondition } from '../hooks';

describe('useBreakpointContainerCondition', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  describe('empty conditions', () => {
    it('should return true when no conditions are provided', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({}));
      expect(result.current).toBe(true);
    });
  });

  describe('onlyAt condition', () => {
    it('should return boolean for onlyAt xs', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ onlyAt: 'xs' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for onlyAt sm', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ onlyAt: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for onlyAt _6xl', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ onlyAt: '_6xl' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largest breakpoint', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ onlyAt: '_7xl' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('largerThan condition', () => {
    it('should return boolean for largerThan xs', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ largerThan: 'xs' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largerThan sm', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ largerThan: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largerThan _6xl', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ largerThan: '_6xl' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('lessThan condition', () => {
    it('should return boolean for lessThan sm', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ lessThan: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for lessThan md', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ lessThan: 'md' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for lessThan _7xl', () => {
      const { result } = renderHook(() => useBreakpointContainerCondition({ lessThan: '_7xl' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('combined conditions', () => {
    it('should return boolean for largerThan and lessThan together', () => {
      const { result } = renderHook(() =>
        useBreakpointContainerCondition({ largerThan: 'sm', lessThan: 'lg' }),
      );
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for complex conditions', () => {
      const { result } = renderHook(() =>
        useBreakpointContainerCondition({
          onlyAt: 'md',
          largerThan: 'sm',
          lessThan: 'lg',
        }),
      );
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for container-specific breakpoints', () => {
      const { result } = renderHook(() =>
        useBreakpointContainerCondition({ largerThan: '_5xl', lessThan: '_7xl' }),
      );
      expect(typeof result.current).toBe('boolean');
    });
  });
});
