import { useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import { StaticBreakpoint } from '../const/breakpoints';
import { BreakpointValue, BREAKPOINT_ORDER } from '../const/breakpoints';
import { mediaQueryStore } from '../core/mediaQueryStore';

/**
 * Custom hook to evaluate breakpoint conditions, combining largerThan, lessThan, and onlyAt.
 * @param condition - The breakpoint condition to evaluate.
 * @returns Whether the current viewport matches the specified condition.
 */
export function useBreakpointCondition(condition: {
	largerThan?: StaticBreakpoint;
	lessThan?: StaticBreakpoint;
	onlyAt?: StaticBreakpoint;
}): boolean {
	// Sin condición => siempre true, y evitamos subscribirnos a una query vacía
	if (!condition.onlyAt && !condition.largerThan && !condition.lessThan) {
		return true;
	}
	const query = useMemo(() => {
		if (condition.onlyAt) {
			const min = BreakpointValue[condition.onlyAt];
			const nextIdx = BREAKPOINT_ORDER.indexOf(condition.onlyAt) + 1;
			const next = nextIdx < BREAKPOINT_ORDER.length ? BREAKPOINT_ORDER[nextIdx] : null;
			if (!next) return `(min-width: ${min}px)`;
			const max = BreakpointValue[next] - 0.02; // evitar solapes con min del siguiente
			return `(min-width: ${min}px) and (max-width: ${max}px)`;
		}
		const parts: string[] = [];
		if (condition.largerThan) {
			const min = BreakpointValue[condition.largerThan];
			parts.push(`(min-width: ${min + 0.02}px)`);
		}
		if (condition.lessThan) {
			const max = BreakpointValue[condition.lessThan];
			parts.push(`(max-width: ${max - 0.02}px)`);
		}
		return parts.join(' and ');
	}, [condition.largerThan, condition.lessThan, condition.onlyAt]);

	return useSyncExternalStore(
		(listener) => mediaQueryStore.subscribe(query, listener),
		() => mediaQueryStore.getSnapshot(query),
		() => mediaQueryStore.getServerSnapshot(),
	);
}