import { useCallback, useEffect, useMemo, useState } from "react";
import { BreakpointEnum, StaticBreakpoint } from "../const/breakpoints";
import { getCurrentBreakpoint } from "../helpers/getCurrentBreakpoint";
import { getMediaQuery } from "../helpers/getMediaQuery";

/**
 * Custom hook to get the current active breakpoint.
 * @returns The current active breakpoint.
 */
export function useBreakpoint(): StaticBreakpoint {
	const [bp, setBp] = useState<StaticBreakpoint>(() => getCurrentBreakpoint());

	const mqls = useMemo(() => {
		if (typeof window === 'undefined') return [];

		const entries = Object.entries(BreakpointEnum) as [StaticBreakpoint, string][];
		return entries
			.filter(([label]) => label !== 'xs')
			.map(([label, size]) => ({
				label,
				mql: getMediaQuery(`(min-width: ${size})`)
			}));
	}, []);

	const handler = useCallback(() => {
		const newBp = getCurrentBreakpoint();
		setBp(current => current === newBp ? current : newBp);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		mqls.forEach(({ mql }) => {
			mql.addEventListener('change', handler);
		});

		// Initial check
		handler();

		return () => {
			mqls.forEach(({ mql }) => {
				mql.removeEventListener('change', handler);
			});
		};
	}, [mqls, handler]);

	return bp;
}