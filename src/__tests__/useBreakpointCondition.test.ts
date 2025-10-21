import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpointCondition } from '../hooks';

describe('useBreakpointCondition', () => {
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
      const { result } = renderHook(() => useBreakpointCondition({}));
      expect(result.current).toBe(true);
    });
  });

  describe('onlyAt condition', () => {
    it('should return boolean for onlyAt xs', () => {
      const { result } = renderHook(() => useBreakpointCondition({ onlyAt: 'xs' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for onlyAt sm', () => {
      const { result } = renderHook(() => useBreakpointCondition({ onlyAt: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for onlyAt md', () => {
      const { result } = renderHook(() => useBreakpointCondition({ onlyAt: 'md' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for onlyAt lg', () => {
      const { result } = renderHook(() => useBreakpointCondition({ onlyAt: 'lg' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largest breakpoint', () => {
      const { result } = renderHook(() => useBreakpointCondition({ onlyAt: '_5xl' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('largerThan condition', () => {
    it('should return boolean for largerThan xs', () => {
      const { result } = renderHook(() => useBreakpointCondition({ largerThan: 'xs' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largerThan sm', () => {
      const { result } = renderHook(() => useBreakpointCondition({ largerThan: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for largerThan md', () => {
      const { result } = renderHook(() => useBreakpointCondition({ largerThan: 'md' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('lessThan condition', () => {
    it('should return boolean for lessThan sm', () => {
      const { result } = renderHook(() => useBreakpointCondition({ lessThan: 'sm' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for lessThan md', () => {
      const { result } = renderHook(() => useBreakpointCondition({ lessThan: 'md' }));
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for lessThan lg', () => {
      const { result } = renderHook(() => useBreakpointCondition({ lessThan: 'lg' }));
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('combined conditions', () => {
    it('should return boolean for largerThan and lessThan together', () => {
      const { result } = renderHook(() =>
        useBreakpointCondition({ largerThan: 'sm', lessThan: 'lg' }),
      );
      expect(typeof result.current).toBe('boolean');
    });

    it('should return boolean for complex conditions', () => {
      const { result } = renderHook(() =>
        useBreakpointCondition({
          onlyAt: 'md',
          largerThan: 'sm',
          lessThan: 'lg',
        }),
      );
      expect(typeof result.current).toBe('boolean');
    });
  });
});
