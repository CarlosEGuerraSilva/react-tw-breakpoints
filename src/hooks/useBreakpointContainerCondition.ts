import { useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import { StaticBreakpointContainer } from '../const/breakpoints';
import { BreakpointContainerValue, CONTAINER_BREAKPOINT_ORDER } from '../const/breakpoints';
import { mediaQueryStore } from '../core/mediaQueryStore';

/**
 * Custom hook to evaluate container breakpoint conditions.
 * @param condition - The container breakpoint condition to evaluate.
 * @returns Whether the current viewport matches the specified breakpoint conditions.
 */
export function useBreakpointContainerCondition(condition: {
	largerThan?: StaticBreakpointContainer;
	lessThan?: StaticBreakpointContainer;
	onlyAt?: StaticBreakpointContainer;
}): boolean {
	if (!condition.onlyAt && !condition.largerThan && !condition.lessThan) {
		return true;
	}
	const query = useMemo(() => {
		if (condition.onlyAt) {
			const min = BreakpointContainerValue[condition.onlyAt];
			const nextIdx = CONTAINER_BREAKPOINT_ORDER.indexOf(condition.onlyAt) + 1;
			const next = nextIdx < CONTAINER_BREAKPOINT_ORDER.length ? CONTAINER_BREAKPOINT_ORDER[nextIdx] : null;
			if (!next) return `(min-width: ${min}px)`;
			const max = BreakpointContainerValue[next] - 0.02;
			return `(min-width: ${min}px) and (max-width: ${max}px)`;
		}
		const parts: string[] = [];
		if (condition.largerThan) {
			const min = BreakpointContainerValue[condition.largerThan];
			parts.push(`(min-width: ${min + 0.02}px)`);
		}
		if (condition.lessThan) {
			const max = BreakpointContainerValue[condition.lessThan];
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