import { BreakpointEnum, StaticBreakpoint } from '../const/breakpoints';
import { isServer } from '../utils/ssr-utils';
import { clearBreakpointCache } from './breakpoint-cache';

const listeners = new Set<() => void>();
const mediaQueries = new Map<string, MediaQueryList>();

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

const getSnapshot = (query: string): boolean => {
	const mql = getMediaQuery(query);
	return mql?.matches ?? false;
};

const getServerSnapshot = (): boolean => false;

export const mediaQueryStore = {
	subscribe: (query: string, listener: () => void) => {
		listeners.add(listener);

		if (listeners.size === 1) {
			const mql = getMediaQuery(query);
			mql?.addEventListener('change', onChange);
		}

		return () => {
			listeners.delete(listener);

			if (listeners.size === 0) {
				const mql = getMediaQuery(query);
				mql?.removeEventListener('change', onChange);
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
