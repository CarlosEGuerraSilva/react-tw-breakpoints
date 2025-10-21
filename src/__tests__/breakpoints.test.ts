import { describe, it, expect } from 'vitest';
import {
	BreakpointEnum,
	BreakpointValue,
	BreakpointContainerEnum,
	BreakpointContainerValue,
	BREAKPOINT_ORDER,
	CONTAINER_BREAKPOINT_ORDER,
	StaticBreakpoint,
	StaticBreakpointContainer,
} from '../const/breakpoints';

describe('Breakpoints Constants', () => {
	describe('BreakpointEnum', () => {
		it('should have correct breakpoint values', () => {
			expect(BreakpointEnum.xs).toBe('0px');
			expect(BreakpointEnum.sm).toBe('640px');
			expect(BreakpointEnum.md).toBe('768px');
			expect(BreakpointEnum.lg).toBe('1024px');
			expect(BreakpointEnum.xl).toBe('1280px');
			expect(BreakpointEnum._2xl).toBe('1536px');
			expect(BreakpointEnum._3xl).toBe('1792px');
			expect(BreakpointEnum._4xl).toBe('2048px');
			expect(BreakpointEnum._5xl).toBe('2304px');
		});
	});

	describe('BreakpointValue', () => {
		it('should have correct numeric breakpoint values', () => {
			expect(BreakpointValue.xs).toBe(0);
			expect(BreakpointValue.sm).toBe(640);
			expect(BreakpointValue.md).toBe(768);
			expect(BreakpointValue.lg).toBe(1024);
			expect(BreakpointValue.xl).toBe(1280);
			expect(BreakpointValue._2xl).toBe(1536);
			expect(BreakpointValue._3xl).toBe(1792);
			expect(BreakpointValue._4xl).toBe(2048);
			expect(BreakpointValue._5xl).toBe(2304);
		});
	});

	describe('BreakpointContainerEnum', () => {
		it('should have correct container breakpoint values', () => {
			expect(BreakpointContainerEnum.xs).toBe('0px');
			expect(BreakpointContainerEnum.sm).toBe('640px');
			expect(BreakpointContainerEnum._6xl).toBe('2560px');
			expect(BreakpointContainerEnum._7xl).toBe('2816px');
		});
	});

	describe('BreakpointContainerValue', () => {
		it('should have correct numeric container breakpoint values', () => {
			expect(BreakpointContainerValue.xs).toBe(0);
			expect(BreakpointContainerValue._6xl).toBe(2560);
			expect(BreakpointContainerValue._7xl).toBe(2816);
		});
	});

	describe('BREAKPOINT_ORDER', () => {
		it('should have breakpoints in ascending order', () => {
			expect(BREAKPOINT_ORDER).toEqual([
				'xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl'
			]);
		});

		it('should have correct length', () => {
			expect(BREAKPOINT_ORDER).toHaveLength(9);
		});
	});

	describe('CONTAINER_BREAKPOINT_ORDER', () => {
		it('should have container breakpoints in ascending order', () => {
			expect(CONTAINER_BREAKPOINT_ORDER).toEqual([
				'xs', 'sm', 'md', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl'
			]);
		});

		it('should have correct length', () => {
			expect(CONTAINER_BREAKPOINT_ORDER).toHaveLength(11);
		});
	});
});
