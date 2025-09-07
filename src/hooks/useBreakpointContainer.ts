
import { useCallback, useEffect, useMemo, useState } from "react";
import { BreakpointContainerEnum } from "../const/breakpoints";
import { StaticBreakpointContainer } from "../const/breakpoints";
import { getMediaQuery } from "../helpers/getMediaQuery";

/**
 * Custom hook to get the current active container breakpoint.
 * @returns The current active container breakpoint.
 */
export function useBreakpointContainer(): StaticBreakpointContainer {
	const getActiveBreakpoint = useCallback((): StaticBreakpointContainer => {
		if (typeof window === 'undefined') return 'xs';

		const entries = Object.entries(BreakpointContainerEnum) as [StaticBreakpointContainer, string][];
		const active = entries
			.filter(([_, size]) => getMediaQuery(`(min-width: ${size})`).matches)
			.map(([label]) => label)
			.pop();
		return active ?? 'xs';
	}, []);

	const [bp, setBp] = useState<StaticBreakpointContainer>(() => getActiveBreakpoint());

	const mqls = useMemo(() => {
		if (typeof window === 'undefined') return [];

		const entries = Object.entries(BreakpointContainerEnum) as [StaticBreakpointContainer, string][];
		return entries
			.filter(([label]) => label !== 'xs')
			.map(([label, size]) => ({
				label,
				mql: getMediaQuery(`(min-width: ${size})`)
			}));
	}, []);

	const handler = useCallback(() => {
		const newBp = getActiveBreakpoint();
		setBp(current => current === newBp ? current : newBp);
	}, [getActiveBreakpoint]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		mqls.forEach(({ mql }) => {
			mql.addEventListener('change', handler);
		});

		handler();

		return () => {
			mqls.forEach(({ mql }) => {
				mql.removeEventListener('change', handler);
			});
		};
	}, [mqls, handler]);

	return bp;
}