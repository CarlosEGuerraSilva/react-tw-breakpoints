// Global store to deduplicate a single ResizeObserver across elements
export type ROListener = () => void;

type Entry = {
	width: number;
	height: number;
	listeners: Set<ROListener>;
};

const hasRO = typeof window !== 'undefined' && 'ResizeObserver' in window;

export class ResizeObserverStore {
	private map = new WeakMap<Element, Entry>();
	private ro: ResizeObserver | null;

	constructor() {
		this.ro = hasRO
			? new ResizeObserver((entries) => {
				for (const e of entries) {
					const el = e.target as Element;
					const rec = this.map.get(el);
					if (!rec) continue;

					let width = 0;
					let height = 0;
					const anyEntry: any = e as any;
					const cbs = anyEntry?.contentBoxSize;
					if (cbs) {
						const box = Array.isArray(cbs) ? cbs[0] : cbs;
						width = box.inlineSize ?? e.contentRect.width;
						height = box.blockSize ?? e.contentRect.height;
					} else {
						width = e.contentRect.width;
						height = e.contentRect.height;
					}

					if (width !== rec.width || height !== rec.height) {
						rec.width = width;
						rec.height = height;
						rec.listeners.forEach((l) => l());
					}
				}
			})
			: null;
	}

	private ensure(el: Element): Entry {
		let entry = this.map.get(el);
		if (!entry) {
			entry = { width: 0, height: 0, listeners: new Set() };
			this.map.set(el, entry);
			this.ro?.observe(el);
			try {
				const rect = (el as HTMLElement).getBoundingClientRect?.();
				if (rect) {
					entry.width = rect.width;
					entry.height = rect.height;
				}
			} catch { }
		}
		return entry;
	}

	subscribe(el: Element, listener: ROListener) {
		const entry = this.ensure(el);
		entry.listeners.add(listener);
		return () => {
			entry.listeners.delete(listener);
			if (entry.listeners.size === 0) {
				this.ro?.unobserve(el);
				this.map.delete(el);
			}
		};
	}

	getWidthSnapshot(el: Element): number {
		const entry = this.ensure(el);
		return entry.width;
	}

	getServerSnapshot(): number {
		return 0;
	}
}

export const resizeObserverStore = new ResizeObserverStore();
