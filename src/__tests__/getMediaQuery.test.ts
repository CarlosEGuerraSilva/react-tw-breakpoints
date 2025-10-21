import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMediaQuery, mediaQueryCache } from '../helpers/get-media-query';

describe('getMediaQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mediaQueryCache.clear();

    window.matchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any;
  });

  it('should return a MediaQueryList object', () => {
    const query = '(min-width: 640px)';
    const result = getMediaQuery(query);

    expect(result).toBeDefined();
    expect(typeof result.matches).toBe('boolean');
    expect(typeof result.media).toBe('string');
  });

  it('should return cached result for same query', () => {
    const query = '(min-width: 640px)';
    const first = getMediaQuery(query);
    const second = getMediaQuery(query);

    expect(first).toBe(second);
  });

  it('should handle different media queries', () => {
    const query1 = '(min-width: 640px)';
    const query2 = '(min-width: 768px)';

    const result1 = getMediaQuery(query1);
    const result2 = getMediaQuery(query2);

    expect(result1).not.toBe(result2);
  });

  it('should work with complex media queries', () => {
    const query = '(min-width: 640px) and (max-width: 767.98px)';
    const result = getMediaQuery(query);

    expect(result).toBeDefined();
    expect(result.media).toBe(query);
  });
});
