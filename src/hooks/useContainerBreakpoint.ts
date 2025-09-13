import * as React from 'react';
import { useMemo, useEffect, useCallback } from 'react';
import { useSyncExternalStore } from 'react';
import {
	BreakpointContainerValue,
	CONTAINER_BREAKPOINT_ORDER,
	StaticBreakpointContainer,
} from '../const/breakpoints';
import { resizeObserverStore } from '../core/resizeObserverStore';

function widthToContainerBreakpoint(width: number): StaticBreakpointContainer {
	let active: StaticBreakpointContainer = 'xs';
	for (const key of CONTAINER_BREAKPOINT_ORDER) {
		const min = BreakpointContainerValue[key];
		if (width >= min) active = key;
		else break;
	}
	return active;
}

/**
 * Real container query hook: returns the breakpoint label for the element width.
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   const bp = useContainerBreakpoint(ref);
 */
export function useContainerBreakpoint(
	ref: React.RefObject<Element | null>
): StaticBreakpointContainer {
	const [el, setEl] = React.useState<Element | null>(null);

	useEffect(() => {
		const next = ref?.current ?? null;
		setEl((prev) => (prev === next ? prev : next));
	});

	const subscribe = useCallback(
		(onChange: () => void) => {
			if (!el) return () => { };
			return resizeObserverStore.subscribe(el, onChange);
		},
		[el]
	);

	const getSnapshot = useCallback(() => {
		if (!el) return 0;
		return resizeObserverStore.getWidthSnapshot(el);
	}, [el]);

	const getServerSnapshot = useCallback(() => 0, []);

	const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	return useMemo(() => widthToContainerBreakpoint(width), [width]);
}
