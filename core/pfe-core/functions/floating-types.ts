/*
 * This is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 */

// Basic type definitions
export type Alignment = 'start' | 'end';
export type Axis = 'x' | 'y';
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Length = 'width' | 'height';
export type Strategy = 'absolute' | 'fixed';

// Derived types
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Placement = Side | AlignedPlacement;

export type Coords = Record<Axis, number>;

export type Dimensions = Record<Length, number>;

export type Rect = Coords & Dimensions;

export type SideObject = Record<Side, number>;

export type ClientRectObject = Rect & SideObject;

export type Padding = number | Partial<SideObject>;

export interface ElementRects {
  reference: Rect;
  floating: Rect;
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
export interface VirtualElement {
  getBoundingClientRect(): ClientRectObject;
  getClientRects?(): ClientRectObject[];
  contextElement?: any;
}

// Core floating UI types
export type Boundary = any;
export type ElementContext = 'reference' | 'floating';
export type FloatingElement = any;
export type ReferenceElement = any;
export type RootBoundary = 'viewport' | 'document' | Rect;

// Utility types
type Promisable<T> = T | Promise<T>;

/**
 * Function option to derive middleware options from state.
 */
export type Derivable<T> = (state: MiddlewareState) => T;

export interface Elements {
  reference: ReferenceElement;
  floating: FloatingElement;
}

export interface MiddlewareData {
  [key: string]: any;
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  autoPlacement?: {
    index?: number;
    overflows: {
      placement: Placement;
      overflows: number[];
    }[];
  };
  flip?: {
    index?: number;
    overflows: {
      placement: Placement;
      overflows: number[];
    }[];
  };
  hide?: {
    referenceHidden?: boolean;
    escaped?: boolean;
    referenceHiddenOffsets?: SideObject;
    escapedOffsets?: SideObject;
  };
  offset?: Coords & {
    placement: Placement;
  };
  shift?: Coords & {
    enabled: Record<Axis, boolean>;
  };
}

export interface MiddlewareReturn extends Partial<Coords> {
  data?: Record<string, any>;
  reset?: boolean | {
    placement?: Placement;
    rects?: boolean | ElementRects;
  };
}

export interface MiddlewareState extends Coords {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
  elements: Elements;
  rects: ElementRects;
  platform: Platform;
}

export interface Middleware {
  name: string;
  options?: any;
  fn: (state: MiddlewareState) => Promisable<MiddlewareReturn>;
}

/**
 * @deprecated use `MiddlewareState` instead.
 */
export type MiddlewareArguments = MiddlewareState;

/**
 * Platform interface methods to work with the current platform.
 * @see https://floating-ui.com/docs/platform
 */
export interface Platform {
  getElementRects: (args: {
    reference: ReferenceElement;
    floating: FloatingElement;
    strategy: Strategy;
  }) => Promisable<ElementRects>;
  getClippingRect: (args: {
    element: any;
    boundary: Boundary;
    rootBoundary: RootBoundary;
    strategy: Strategy;
  }) => Promisable<Rect>;
  getDimensions: (element: any) => Promisable<Dimensions>;
  convertOffsetParentRelativeRectToViewportRelativeRect?: (args: {
    elements?: Elements;
    rect: Rect;
    offsetParent: any;
    strategy: Strategy;
  }) => Promisable<Rect>;
  getOffsetParent?: (element: any) => Promisable<any>;
  isElement?: (value: any) => Promisable<boolean>;
  getDocumentElement?: (element: any) => Promisable<any>;
  getClientRects?: (element: any) => Promisable<ClientRectObject[]>;
  isRTL?: (element: any) => Promisable<boolean>;
  getScale?: (element: any) => Promisable<{
    x: number;
    y: number;
  }>;
}

export interface ComputePositionConfig {
  /**
   * Object to interface with the current platform.
   */
  platform: Platform;
  /**
   * Where to place the floating element relative to the reference element.
   */
  placement?: Placement;
  /**
   * The strategy to use when positioning the floating element.
   */
  strategy?: Strategy;
  /**
   * Array of middleware objects to modify the positioning or provide data for
   * rendering.
   */
  middleware?: (Middleware | null | undefined | false)[];
}

export interface ComputePositionReturn extends Coords {
  /**
   * The final chosen placement of the floating element.
   */
  placement: Placement;
  /**
   * The strategy used to position the floating element.
   */
  strategy: Strategy;
  /**
   * Object containing data returned from all middleware, keyed by their name.
   */
  middlewareData: MiddlewareData;
}

export type ComputePosition = (
  reference: unknown,
  floating: unknown,
  config: ComputePositionConfig
) => Promise<ComputePositionReturn>;

export interface DetectOverflowOptions {
  /**
   * The clipping element(s) or area in which overflow will be checked.
   * @default 'clippingAncestors'
   */
  boundary?: Boundary;
  /**
   * The root clipping area in which overflow will be checked.
   * @default 'viewport'
   */
  rootBoundary?: RootBoundary;
  /**
   * The element in which overflow is being checked relative to a boundary.
   * @default 'floating'
   */
  elementContext?: ElementContext;
  /**
   * Whether to check for overflow using the alternate element's boundary
   * (`clippingAncestors` boundary only).
   * @default false
   */
  altBoundary?: boolean;
  /**
   * Virtual padding for the resolved overflow detection offsets.
   * @default 0
   */
  padding?: Padding;
}

export interface ArrowOptions {
  /**
   * The arrow element to be positioned.
   * @default undefined
   */
  element: any;
  /**
   * The padding between the arrow element and the floating element edges.
   * Useful when the floating element has rounded corners.
   * @default 0
   */
  padding?: Padding;
}

export interface FlipOptions extends DetectOverflowOptions {
  /**
   * The axis that runs along the side of the floating element. Determines
   * whether overflow along this axis is checked to perform a flip.
   * @default true
   */
  mainAxis?: boolean;
  /**
   * The axis that runs along the alignment of the floating element. Determines
   * whether overflow along this axis is checked to perform a flip.
   * - `true`: Whether to check cross axis overflow for both side and alignment flipping.
   * - `false`: Whether to disable all cross axis overflow checking.
   * - `'alignment'`: Whether to check cross axis overflow for alignment flipping only.
   * @default true
   */
  crossAxis?: boolean | 'alignment';
  /**
   * Placements to try sequentially if the preferred `placement` does not fit.
   * @default [oppositePlacement] (computed)
   */
  fallbackPlacements?: Placement[];
  /**
   * What strategy to use when no placements fit.
   * @default 'bestFit'
   */
  fallbackStrategy?: 'bestFit' | 'initialPlacement';
  /**
   * Whether to allow fallback to the perpendicular axis of the preferred
   * placement, and if so, which side direction along the axis to prefer.
   * @default 'none' (disallow fallback)
   */
  fallbackAxisSideDirection?: 'none' | 'start' | 'end';
  /**
   * Whether to flip to placements with the opposite alignment if they fit
   * better.
   * @default true
   */
  flipAlignment?: boolean;
}

export type OffsetValue = number | {
  /**
   * The axis that runs along the side of the floating element. Represents
   * the distance (gutter or margin) between the reference and floating
   * element.
   * @default 0
   */
  mainAxis?: number;
  /**
   * The axis that runs along the alignment of the floating element.
   * Represents the skidding between the reference and floating element.
   * @default 0
   */
  crossAxis?: number;
  /**
   * The same axis as `crossAxis` but applies only to aligned placements
   * and inverts the `end` alignment. When set to a number, it overrides the
   * `crossAxis` value.
   *
   * A positive number will move the floating element in the direction of
   * the opposite edge to the one that is aligned, while a negative number
   * the reverse.
   * @default null
   */
  alignmentAxis?: number | null;
};

export type OffsetOptions = OffsetValue | Derivable<OffsetValue>;

export interface ShiftOptions extends DetectOverflowOptions {
  /**
   * The axis that runs along the alignment of the floating element. Determines
   * whether overflow along this axis is checked to perform shifting.
   * @default true
   */
  mainAxis?: boolean;
  /**
   * The axis that runs along the side of the floating element. Determines
   * whether overflow along this axis is checked to perform shifting.
   * @default false
   */
  crossAxis?: boolean;
  /**
   * Accepts a function that limits the shifting done in order to prevent
   * detachment.
   */
  limiter?: {
    fn: (state: MiddlewareState) => Coords;
    options?: any;
  };
}
