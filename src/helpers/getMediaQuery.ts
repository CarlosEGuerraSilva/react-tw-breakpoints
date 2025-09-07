// Cache for MediaQueryList instances to avoid recreating them
export const mediaQueryCache = new Map<string, MediaQueryList>();

// Helper function to get cached MediaQueryList
export const getMediaQuery = (query: string): MediaQueryList => {
	if (typeof window === 'undefined') {
		// Return a mock MediaQueryList for SSR
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