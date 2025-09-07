import { useEffect, useState } from 'react';
import { StaticBreakpointContainer } from '../const/breakpoints';
import { BreakpointContainerValue, CONTAINER_BREAKPOINT_ORDER } from '../const/breakpoints';
import { getMediaQuery } from '../helpers/getMediaQuery';

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
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;

		if (condition.onlyAt) {
			const targetValue = BreakpointContainerValue[condition.onlyAt];
			const nextBreakpointIndex = CONTAINER_BREAKPOINT_ORDER.indexOf(condition.onlyAt) + 1;
			const nextBreakpointValue = nextBreakpointIndex < CONTAINER_BREAKPOINT_ORDER.length
				? BreakpointContainerValue[CONTAINER_BREAKPOINT_ORDER[nextBreakpointIndex]]
				: Infinity;

			return window.innerWidth >= targetValue && window.innerWidth < nextBreakpointValue;
		}

		let result = true;

		if (condition.largerThan) {
			const targetValue = BreakpointContainerValue[condition.largerThan];
			result = result && window.innerWidth > targetValue;
		}

		if (condition.lessThan) {
			const targetValue = BreakpointContainerValue[condition.lessThan];
			result = result && window.innerWidth < targetValue;
		}

		return result;
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQueries: MediaQueryList[] = [];

		if (condition.onlyAt) {
			const targetValue = BreakpointContainerValue[condition.onlyAt];
			const nextBreakpointIndex = CONTAINER_BREAKPOINT_ORDER.indexOf(condition.onlyAt) + 1;
			const nextBreakpointValue = nextBreakpointIndex < CONTAINER_BREAKPOINT_ORDER.length
				? BreakpointContainerValue[CONTAINER_BREAKPOINT_ORDER[nextBreakpointIndex]]
				: Infinity;

			const minQuery = getMediaQuery(`(min-width: ${targetValue}px)`);
			const maxQuery = nextBreakpointValue !== Infinity
				? getMediaQuery(`(max-width: ${nextBreakpointValue - 1}px)`)
				: null;

			mediaQueries.push(minQuery);
			if (maxQuery) mediaQueries.push(maxQuery);
		} else {
			if (condition.largerThan) {
				const targetValue = BreakpointContainerValue[condition.largerThan];
				mediaQueries.push(getMediaQuery(`(min-width: ${targetValue + 1}px)`));
			}

			if (condition.lessThan) {
				const targetValue = BreakpointContainerValue[condition.lessThan];
				mediaQueries.push(getMediaQuery(`(max-width: ${targetValue - 1}px)`));
			}
		}

		const handler = () => {
			let newMatches = true;

			if (condition.onlyAt) {
				const targetValue = BreakpointContainerValue[condition.onlyAt];
				const nextBreakpointIndex = CONTAINER_BREAKPOINT_ORDER.indexOf(condition.onlyAt) + 1;
				const nextBreakpointValue = nextBreakpointIndex < CONTAINER_BREAKPOINT_ORDER.length
					? BreakpointContainerValue[CONTAINER_BREAKPOINT_ORDER[nextBreakpointIndex]]
					: Infinity;

				newMatches = window.innerWidth >= targetValue && window.innerWidth < nextBreakpointValue;
			} else {
				if (condition.largerThan) {
					const targetValue = BreakpointContainerValue[condition.largerThan];
					newMatches = newMatches && window.innerWidth > targetValue;
				}

				if (condition.lessThan) {
					const targetValue = BreakpointContainerValue[condition.lessThan];
					newMatches = newMatches && window.innerWidth < targetValue;
				}
			}

			setMatches(prev => prev === newMatches ? prev : newMatches);
		};

		mediaQueries.forEach(mql => {
			mql.addEventListener('change', handler);
		});

		// Initial check
		handler();

		return () => {
			mediaQueries.forEach(mql => {
				mql.removeEventListener('change', handler);
			});
		};
	}, [condition.largerThan, condition.lessThan, condition.onlyAt]);

	return matches;
}