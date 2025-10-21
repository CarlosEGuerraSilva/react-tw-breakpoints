import { useMemo } from "react";
import { useSyncExternalStore } from 'react';
import { BreakpointContainerEnum, StaticBreakpointContainer } from "../const/breakpoints";
import { mediaQueryStore } from "../core/media-query-store";
import { getMediaQuery } from "../helpers/get-media-query";
import { isServer } from "../utils/ssr-utils";

/**
 * Custom hook to get the current active container breakpoint.
 * @returns The current active container breakpoint.
 */
export function useBreakpointContainer(): StaticBreakpointContainer {
	const getActiveBreakpoint = () => {
		if (isServer()) return 'xs';
		const entries = Object.entries(BreakpointContainerEnum) as [StaticBreakpointContainer, string][];
		const active = entries
			.filter(([_, size]) => getMediaQuery(`(min-width: ${size})`).matches)
			.map(([label]) => label)
			.pop();
		return (active ?? 'xs') as StaticBreakpointContainer;
	};

	const queries = useMemo(() => {
		const entries = Object.entries(BreakpointContainerEnum) as [StaticBreakpointContainer, string][];
		return entries
			.filter(([label]) => label !== 'xs')
			.map(([, size]) => `(min-width: ${size})`);
	}, []);

	const subscribe = (onChange: () => void) => {
		const unsubscribers = queries.map((q) => mediaQueryStore.subscribe(q, onChange));
		return () => unsubscribers.forEach((u) => u());
	};

	const getSnapshot = getActiveBreakpoint;
	const getServerSnapshot = () => 'xs' as StaticBreakpointContainer;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}