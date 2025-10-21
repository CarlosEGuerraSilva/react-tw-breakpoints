import { describe, it, expect } from 'vitest';
import { isBrowser, isServer, clientOnly, serverOnly, ssrSafe } from '../utils/ssr-utils';

describe('SSR Utils', () => {
  describe('isBrowser', () => {
    it('should return true in browser environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('isServer', () => {
    it('should return false in browser environment', () => {
      expect(isServer()).toBe(false);
    });
  });

  describe('clientOnly', () => {
    it('should execute callback in browser environment', () => {
      const result = clientOnly(() => 'client');
      expect(result).toBe('client');
    });

    it('should return the callback result', () => {
      const result = clientOnly(() => ({ foo: 'bar' }));
      expect(result).toEqual({ foo: 'bar' });
    });
  });

  describe('serverOnly', () => {
    it('should return undefined in browser environment', () => {
      const result = serverOnly(() => 'server');
      expect(result).toBeUndefined();
    });
  });

  describe('ssrSafe', () => {
    it('should return client value in browser environment', () => {
      const result = ssrSafe(
        () => 'client',
        () => 'server',
      );
      expect(result).toBe('client');
    });

    it('should work without server value', () => {
      const result = ssrSafe(() => 'client');
      expect(result).toBe('client');
    });
  });
});
