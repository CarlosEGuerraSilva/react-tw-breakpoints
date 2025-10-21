import { useBreakpoint } from './use-breakpoint';
import { useBreakpointCondition } from './use-breakpoint-condition';
import type { StaticBreakpoint } from '../const/breakpoints';

const breakpointOrder: StaticBreakpoint[] = [
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'_2xl',
	'_3xl',
	'_4xl',
	'_5xl',
];

const getBreakpointIndex = (bp: StaticBreakpoint): number => {
	return breakpointOrder.indexOf(bp);
};

/**
 * Hook to check if the viewport is at or above a specific breakpoint.
 * @param breakpoint The breakpoint to check.
 * @returns True if viewport is at or above the breakpoint.
 */
export const useBreakpointUp = (breakpoint: StaticBreakpoint): boolean => {
	const current = useBreakpoint();
	return getBreakpointIndex(current) >= getBreakpointIndex(breakpoint);
};

/**
 * Hook to check if the viewport is below a specific breakpoint.
 * @param breakpoint The breakpoint to check.
 * @returns True if viewport is below the breakpoint.
 */
export const useBreakpointDown = (breakpoint: StaticBreakpoint): boolean => {
	const current = useBreakpoint();
	return getBreakpointIndex(current) < getBreakpointIndex(breakpoint);
};

/**
 * Hook to check if the viewport is exactly at a specific breakpoint.
 * @param breakpoint The breakpoint to check.
 * @returns True if viewport is exactly at the breakpoint.
 */
export const useBreakpointOnly = (breakpoint: StaticBreakpoint): boolean => {
	const current = useBreakpoint();
	return current === breakpoint;
};

/**
 * Hook to check if the viewport is between two breakpoints.
 * @param min The minimum breakpoint (inclusive).
 * @param max The maximum breakpoint (exclusive).
 * @returns True if viewport is between the breakpoints.
 */
export const useBreakpointBetween = (
	min: StaticBreakpoint,
	max: StaticBreakpoint,
): boolean => {
	const current = useBreakpoint();
	const currentIndex = getBreakpointIndex(current);
	return currentIndex >= getBreakpointIndex(min) && currentIndex < getBreakpointIndex(max);
};