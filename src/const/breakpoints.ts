export type StaticBreakpoint = keyof typeof BreakpointEnum;
export type StaticBreakpointContainer = keyof typeof BreakpointContainerEnum;

export const BreakpointEnum = {
	xs: '0px',      // baseline
	sm: '640px',    // 40rem
	md: '768px',    // 48rem
	lg: '1024px',   // 64rem
	xl: '1280px',   // 80rem
	_2xl: '1536px', // 96rem
	_3xl: '1792px', // 112rem
	_4xl: '2048px', // 128rem
	_5xl: '2304px', // 144rem
} as const;

export const BreakpointValue = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	_2xl: 1536,
	_3xl: 1792,
	_4xl: 2048,
	_5xl: 2304,
} as const;

export const BreakpointContainerEnum = {
	xs: '0px',      // baseline
	sm: '640px',    // 40rem
	md: '768px',    // 48rem
	lg: '1024px',   // 64rem
	xl: '1280px',   // 80rem
	_2xl: '1536px', // 96rem
	_3xl: '1792px', // 112rem
	_4xl: '2048px', // 128rem
	_5xl: '2304px', // 144rem
	_6xl: '2560px', // 160rem
	_7xl: '2816px', // 176rem
} as const;

export const BreakpointContainerValue = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	_2xl: 1536,
	_3xl: 1792,
	_4xl: 2048,
	_5xl: 2304,
	_6xl: 2560,
	_7xl: 2816,
} as const;

// Breakpoint order for comparison
export const BREAKPOINT_ORDER: StaticBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl'];
export const CONTAINER_BREAKPOINT_ORDER: StaticBreakpointContainer[] = [
	'xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl'
];