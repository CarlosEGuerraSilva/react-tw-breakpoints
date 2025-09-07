import { useMemo } from "react";
import { useSyncExternalStore } from 'react';
import { BreakpointEnum, StaticBreakpoint, BREAKPOINT_ORDER, BreakpointValue } from "../const/breakpoints";
import { mediaQueryStore } from "../core/mediaQueryStore";
import { getCurrentBreakpoint } from "../helpers/getCurrentBreakpoint";

/**
 * Custom hook to get the current active breakpoint.
 * @returns The current active breakpoint.
 */
export function useBreakpoint(): StaticBreakpoint {
	// Suscríbete a todos los límites min-width, el snapshot calcula el label vigente
	const queries = useMemo(() => {
		const entries = Object.entries(BreakpointEnum) as [StaticBreakpoint, string][];
		return entries
			.filter(([label]) => label !== 'xs')
			.map(([, size]) => `(min-width: ${size})`);
	}, []);

	const subscribe = (onChange: () => void) => {
		const unsubscribers = queries.map((q) => mediaQueryStore.subscribe(q, onChange));
		return () => unsubscribers.forEach((u) => u());
	};

	const getSnapshot = () => getCurrentBreakpoint();
	const getServerSnapshot = () => 'xs' as StaticBreakpoint;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}