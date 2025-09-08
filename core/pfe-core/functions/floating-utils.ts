// Utility functions moved from @floating-ui/utils
// This file contains all the utility functions that were previously imported from @floating-ui/utils

import type {
  Alignment,
  Axis,
  Side,
  Length,
  Placement,
  Coords,
  Rect,
  SideObject,
  ClientRectObject,
  Padding,
  ElementRects,
} from './floating-types';

// Constants
export const sides: Side[] = ['top', 'right', 'bottom', 'left'];
export const alignments: Alignment[] = ['start', 'end'];
export const placements: Placement[] = sides.reduce((acc, side) =>
  acc.concat(side, `${side}-${alignments[0]}`, `${side}-${alignments[1]}`), [] as Placement[]);

// Math utilities
// We can't use object destructuring here because we get in a loop with
// Binding elements can't be exported directly with --isolatedDeclarations.
// eslint-disable-next-line prefer-destructuring
export const min: (...values: number[]) => number = Math.min;
// eslint-disable-next-line prefer-destructuring
export const max: (...values: number[]) => number = Math.max;
// eslint-disable-next-line prefer-destructuring
export const round: (x: number) => number = Math.round;
// eslint-disable-next-line prefer-destructuring
export const floor: (x: number) => number = Math.floor;

// Helper objects
const oppositeSideMap: Record<Side, Side> = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};

const oppositeAlignmentMap: Record<Alignment, Alignment> = {
  start: 'end',
  end: 'start',
};

const yAxisSides = new Set<Side>(['top', 'bottom']);

// Utility functions
/**
 * Creates a coordinate object with the same value for both x and y.
 * @param v - The value to use for both coordinates
 * @returns Coordinate object with x and y set to the same value
 */
export const createCoords = (v: number): Coords => ({
  x: v,
  y: v,
});

/**
 * Clamps a value between a minimum and maximum range.
 * @param start - The minimum value
 * @param value - The value to clamp
 * @param end - The maximum value
 * @returns The clamped value
 */
export function clamp(start: number, value: number, end: number): number {
  return max(start, min(value, end));
}

/**
 * Evaluates a value that can be either a static value or a function.
 * @param value - The value or function to evaluate
 * @param param - The parameter to pass to the function if value is a function
 * @returns The evaluated result
 */
export function evaluate<T, P>(value: T | ((param: P) => T), param: P): T {
  return typeof value === 'function' ? (value as (param: P) => T)(param) : value;
}

/**
 * Extracts the side from a placement string.
 * @param placement - The placement string (e.g., 'top-start')
 * @returns The side portion (e.g., 'top')
 */
export function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}

/**
 * Extracts the alignment from a placement string.
 * @param placement - The placement string (e.g., 'top-start')
 * @returns The alignment portion (e.g., 'start') or undefined if no alignment
 */
export function getAlignment(placement: Placement): Alignment | undefined {
  return placement.split('-')[1] as Alignment | undefined;
}

/**
 * Gets the opposite axis (x ↔ y).
 * @param axis - The axis to flip
 * @returns The opposite axis
 */
export function getOppositeAxis(axis: Axis): Axis {
  return axis === 'x' ? 'y' : 'x';
}

/**
 * Gets the length property name for an axis.
 * @param axis - The axis ('x' or 'y')
 * @returns 'width' for x-axis, 'height' for y-axis
 */
export function getAxisLength(axis: Axis): Length {
  return axis === 'y' ? 'height' : 'width';
}

/**
 * Gets the axis that runs along the side of a placement.
 * @param placement - The placement to get the side axis for
 * @returns 'y' for top/bottom sides, 'x' for left/right sides
 */
export function getSideAxis(placement: Placement): Axis {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}

/**
 * Gets the axis that runs along the alignment of a placement.
 * @param placement - The placement to get the alignment axis for
 * @returns The axis perpendicular to the side axis
 */
export function getAlignmentAxis(placement: Placement): Axis {
  return getOppositeAxis(getSideAxis(placement));
}

/**
 * Gets the two sides that correspond to the alignment axis for overflow checking.
 * @param placement - The placement to get alignment sides for
 * @param rects - The reference and floating element rectangles
 * @param rtl - Whether the layout is right-to-left
 * @returns Tuple of main alignment side and its opposite
 */
export function getAlignmentSides(
  placement: Placement,
  rects: ElementRects,
  rtl = false
): [Side, Side] {
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);

  let mainAlignmentSide: Side = alignmentAxis === 'x' ?
    alignment === (rtl ? 'end' : 'start') ? 'right' : 'left'
    : alignment === 'start' ? 'bottom' : 'top';

  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }

  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}

/**
 * Gets an array of alternative placements for fallback positioning.
 * @param placement - The initial placement to expand
 * @returns Array of alternative placements including opposite alignments
 */
export function getExpandedPlacements(placement: Placement): Placement[] {
  const oppositePlacement = getOppositePlacement(placement);
  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement),
  ];
}

/**
 * Flips the alignment portion of a placement (start ↔ end).
 * @param placement - The placement string to flip alignment for
 * @returns The placement with opposite alignment
 */
export function getOppositeAlignmentPlacement<T extends string>(placement: T): T {
  return placement.replace(/start|end/g, alignment =>
    oppositeAlignmentMap[alignment as Alignment]) as T;
}

const lrPlacement: Side[] = ['left', 'right'];
const rlPlacement: Side[] = ['right', 'left'];
const tbPlacement: Side[] = ['top', 'bottom'];
const btPlacement: Side[] = ['bottom', 'top'];

/**
 * Gets a list of sides based on the starting side and direction.
 * @param side - The starting side
 * @param isStart - Whether to get start direction sides
 * @param rtl - Whether the layout is right-to-left
 * @returns Array of sides for the given direction
 */
function getSideList(side: Side, isStart: boolean, rtl?: boolean): Side[] {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) {
        return isStart ? rlPlacement : lrPlacement;
      }
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}

/**
 * Gets placements on the opposite axis for fallback positioning.
 * @param placement - The initial placement
 * @param flipAlignment - Whether to include opposite alignment variants
 * @param direction - The direction preference ('none', 'start', or 'end')
 * @param rtl - Whether the layout is right-to-left
 * @returns Array of placements on the opposite axis
 */
export function getOppositeAxisPlacements(
  placement: Placement,
  flipAlignment: boolean,
  direction: 'none' | Alignment,
  rtl?: boolean
): Placement[] {
  const alignment = getAlignment(placement);
  let list: Placement[] =
    getSideList(getSide(placement), direction === 'start', rtl) as Placement[];

  if (alignment) {
    list = list.map(side => `${side}-${alignment}` as Placement);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }

  return list;
}

/**
 * Gets the opposite placement by flipping the side.
 * @param placement - The placement to flip
 * @returns The placement with opposite side
 */
export function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, side =>
    oppositeSideMap[side as Side]) as T;
}

/**
 * Expands a partial padding object to include all sides with defaults.
 * @param padding - The partial padding object
 * @returns Complete padding object with all sides
 */
export function expandPaddingObject(padding: Partial<SideObject>): SideObject {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding,
  };
}

/**
 * Converts padding value to a complete side object.
 * @param padding - The padding value (number or partial side object)
 * @returns Complete side object with padding for all sides
 */
export function getPaddingObject(padding: Padding): SideObject {
  return typeof padding !== 'number' ?
    expandPaddingObject(padding)
    : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
    };
}

/**
 * Converts a basic rect to a client rect object with all sides.
 * @param rect - The basic rect with x, y, width, height
 * @returns Client rect object with top, left, right, bottom properties
 */
export function rectToClientRect(rect: Rect): ClientRectObject {
  const { x, y, width, height } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
  };
}
