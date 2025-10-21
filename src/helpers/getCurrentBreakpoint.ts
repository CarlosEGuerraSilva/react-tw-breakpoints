import { BreakpointEnum } from "../const/breakpoints";
import { getMediaQuery } from "../helpers/getMediaQuery";
import { StaticBreakpoint } from "../const/breakpoints";
import { isServer } from "../utils/ssr-utils";

// Get current active breakpoint
export const getCurrentBreakpoint = (): StaticBreakpoint => {
	if (isServer()) return 'xs';

	const entries = Object.entries(BreakpointEnum) as [StaticBreakpoint, string][];
	const active = entries
		.filter(([_, size]) => getMediaQuery(`(min-width: ${size})`).matches)
		.map(([label]) => label)
		.pop();
	return active ?? 'xs';
};