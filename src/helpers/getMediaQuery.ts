import { isServer } from '../utils/ssr-utils';

// Cache for MediaQueryList instances to avoid recreating them
export const mediaQueryCache = new Map<string, MediaQueryList>();

/**
 * Get a MediaQueryList for the given query string.
 * @param query - The media query string.
 * @returns The MediaQueryList object.
 */
export const getMediaQuery = (query: string): MediaQueryList => {
	if (isServer()) {
		return {
			matches: false,
			media: query,
			onchange: null,
			addEventListener: () => { },
			removeEventListener: () => { },
			addListener: () => { },
			removeListener: () => { },
			dispatchEvent: () => false,
		} as MediaQueryList;
	}

	if (!mediaQueryCache.has(query)) {
		mediaQueryCache.set(query, window.matchMedia(query));
	}
	return mediaQueryCache.get(query)!;
};