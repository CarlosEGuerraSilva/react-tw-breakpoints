import { BreakpointEnum } from "../const/breakpoints";
import { getMediaQuery } from "../helpers/getMediaQuery";
import { StaticBreakpoint } from "../const/breakpoints";

// Get current active breakpoint
export const getCurrentBreakpoint = (): StaticBreakpoint => {
	if (typeof window === 'undefined') return 'xs';

	const entries = Object.entries(BreakpointEnum) as [StaticBreakpoint, string][];
	const active = entries
		.filter(([_, size]) => getMediaQuery(`(min-width: ${size})`).matches)
		.map(([label]) => label)
		.pop();
	return active ?? 'xs';
};