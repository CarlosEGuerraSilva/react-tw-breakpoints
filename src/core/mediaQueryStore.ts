import { getMediaQuery } from '../helpers/getMediaQuery';

export type StoreListener = () => void;

type Entry = {
	mql: MediaQueryList;
	listeners: Set<StoreListener>;
	onChange: (e?: MediaQueryListEvent) => void;
};

/**
 * Global store to share a single MediaQueryList and a single native listener
 * per query string across the entire app.
 */
class MediaQueryStore {
	private entries = new Map<string, Entry>();

	private ensure(query: string): Entry {
		let entry = this.entries.get(query);
		if (entry) return entry;

		const mql = getMediaQuery(query);
		const listeners = new Set<StoreListener>();

		const onChange = () => {
			listeners.forEach((l) => l());
		};

		try {
			mql.addEventListener('change', onChange as EventListener);
		} catch {
			// @ts-ignore
			mql.addListener?.(onChange);
		}

		entry = { mql, listeners, onChange };
		this.entries.set(query, entry);
		return entry;
	}

	subscribe(query: string, listener: StoreListener) {
		const entry = this.ensure(query);
		entry.listeners.add(listener);

		return () => {
			entry.listeners.delete(listener);
			if (entry.listeners.size === 0) {
				try {
					entry.mql.removeEventListener('change', entry.onChange as EventListener);
				} catch {
					// @ts-ignore
					entry.mql.removeListener?.(entry.onChange);
				}
				this.entries.delete(query);
			}
		};
	}

	getSnapshot(query: string) {
		const entry = this.ensure(query);
		return !!entry.mql.matches;
	}

	getServerSnapshot() {
		return false;
	}
}

export const mediaQueryStore = new MediaQueryStore();
