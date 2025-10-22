import type { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';

type Lazy<T> = T | (() => T | null | undefined);

interface FloatingDOMControllerOptions {
  content: Lazy<HTMLElement>;
  invoker?: Lazy<HTMLElement>;
  arrow?: Lazy<HTMLElement>;
  shift?: boolean;
  padding?: number;
  fallbackPlacements?: Placement[];
}

interface ShowOptions {
  offset?: OffsetOptions;
  placement?: Placement;
  flip?: boolean;
  fallbackPlacements?: Placement[];
}

export type Anchor = '' | 'top' | 'left' | 'bottom' | 'right';
export type Alignment = 'center' | 'start' | 'end';

/**
 * Controls floating DOM within a web component, e.g. tooltips and popovers
 */
export class FloatingDOMController implements ReactiveController {
  #open = false;
  #opening = false;
  #cleanup?: () => void;
  #anchor?: Anchor;
  #alignment?: Alignment;
  #styles?: StyleInfo;
  #placement?: Placement;
  #options: FloatingDOMControllerOptions;

  get #invoker() {
    const { invoker } = this.#options;
    return typeof invoker === 'function' ? invoker() : invoker;
  }

  get #content() {
    const { content } = this.#options;
    return typeof content === 'function' ? content() : content;
  }

  get #arrow() {
    const { arrow } = this.#options;
    return typeof arrow === 'function' ? arrow() : arrow;
  }

  /** The crosswise alignment of the invoker on which to display the floating DOM */
  get alignment(): Alignment {
    return this.#alignment ?? 'center';
  }

  /** The side of the invoker on which to display the floating DOM */
  get anchor(): Anchor {
    return this.#anchor ?? '';
  }

  /**
   * When true, the floating DOM is visible
   */
  get open(): boolean {
    return this.#open;
  }

  /** The computed placement of the floating DOM */
  get placement(): Placement {
    return this.#placement ?? 'top';
  }

  /**
   * Styles to apply to your element's container
   *
   * - `--_floating-content-translate`: translate to apply to floating content.
   */
  get styles(): StyleInfo {
    return this.#styles ?? {};
  }

  constructor(
    private host: ReactiveControllerHost,
    options: FloatingDOMControllerOptions
  ) {
    host.addController(this);
    this.#options = {
      invoker: (() => host as LitElement),
      shift: true,
      ...options,
    };
  }

  hostDisconnected(): void {
    this.#cleanup?.();
  }

  async #update(
    placement: Placement = 'top',
    offset?: OffsetOptions,
    flip = true,
    fallbackPlacements?: Placement[],
  ) {
    const { padding, shift } = this.#options;

    const invoker = this.#invoker;
    const content = this.#content;
    const arrow = this.#arrow;
    if (!invoker || !content) {
      return;
    }
    const {
      x,
      y,
      placement: _placement,
      middlewareData,
    } = await computePosition(invoker, content, {
      strategy: 'absolute',
      placement,
      middleware: [
        offsetMiddleware(offset),
        shift && shiftMiddleware({ padding }),
        arrow && arrowMiddleware({ element: arrow, padding: arrow.offsetHeight / 2 }),
        flip && flipMiddleware({ padding, fallbackPlacements }),
      ].filter(Boolean),
    });

    if (arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[_placement.split('-')[0]] || '';

      Object.assign(arrow.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null && !['top'].includes(_placement) ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: `-${arrow.offsetHeight / 2}px`,
      });
    }

    this.#placement = _placement;
    [this.#anchor, this.#alignment] = (this.#placement.split('-') ?? []) as [Anchor, Alignment];
    this.#styles = {
      '--_floating-content-translate': `${x}px ${y}px`,
    };
    this.host.requestUpdate();
  }

  /**
   * Show the floating DOM
   * @param [options={}]
   * @param options.offset
   * @param options.placement
   * @param options.flip
   * @param options.fallbackPlacements
   * */
  async show({ offset, placement, flip, fallbackPlacements }: ShowOptions = {}): Promise<void> {
    const invoker = this.#invoker;
    const content = this.#content;
    if (!invoker || !content) {
      return;
    }
    if (!this.#opening) {
      this.#opening = true;
      const p = this.#update(placement, offset, flip, fallbackPlacements);
      this.#cleanup ??= autoUpdate(invoker, content, () =>
        this.#update(placement, offset, flip, fallbackPlacements));
      await p;
      this.#opening = false;
    }
    this.#open = true;
    this.host.requestUpdate();
  }

  /** Hide the floating DOM */
  async hide(): Promise<void> {
    await this.host.updateComplete;
    while (this.#opening && !this.open) {
      await new Promise(requestAnimationFrame);
    }
    this.#open = false;
    this.#cleanup?.();
    this.host.requestUpdate();
    await this.host.updateComplete;
  }
}

/*
 * The below is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 *
 * This file combines all floating-ui functionality into a single module
 * to reduce import waterfall and simplify maintenance. When CSS anchor
 * positioning reaches GA, this entire file can be deleted.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

// Basic type definitions
type Axis = 'x' | 'y';
type Side = 'top' | 'right' | 'bottom' | 'left';
type Length = 'width' | 'height';
type Strategy = 'absolute' | 'fixed';

// Derived types
type AlignedPlacement = `${Side}-${'start' | 'end'}`;
export type Placement = Side | AlignedPlacement;

type Coords = Record<Axis, number>;

type Dimensions = Record<Length, number>;

type Rect = Coords & Dimensions;

type SideObject = Record<Side, number>;

type ClientRectObject = Rect & SideObject;

type Padding = number | Partial<SideObject>;

interface ElementRects {
  reference: Rect;
  floating: Rect;
}

// Core floating UI types
type Boundary = any;
type ElementContext = 'reference' | 'floating';
type FloatingElement = any;
type ReferenceElement = any;
type RootBoundary = 'viewport' | 'document' | Rect;

// Utility types
type Promisable<T> = T | Promise<T>;

/**
 * Function option to derive middleware options from state.
 */
type Derivable<T> = (state: MiddlewareState) => T;

interface Elements {
  reference: ReferenceElement;
  floating: FloatingElement;
}

interface MiddlewareData {
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

interface MiddlewareReturn extends Partial<Coords> {
  data?: Record<string, any>;
  reset?: boolean | {
    placement?: Placement;
    rects?: boolean | ElementRects;
  };
}

interface MiddlewareState extends Coords {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
  elements: Elements;
  rects: ElementRects;
  platform: Platform;
}

interface Middleware {
  name: string;
  options?: any;
  fn: (state: MiddlewareState) => Promisable<MiddlewareReturn>;
}

/**
 * @deprecated use `MiddlewareState` instead.
 */
type MiddlewareArguments = MiddlewareState;

/**
 * Platform interface methods to work with the current platform.
 * @see https://floating-ui.com/docs/platform
 */
interface Platform {
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

interface ComputePositionConfig {
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

interface ComputePositionReturn extends Coords {
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

type ComputePosition = (
  reference: unknown,
  floating: unknown,
  config: ComputePositionConfig
) => Promise<ComputePositionReturn>;

interface DetectOverflowOptions {
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

interface ArrowOptions {
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

interface FlipOptions extends DetectOverflowOptions {
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

type OffsetValue = number | {
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

interface ShiftOptions extends DetectOverflowOptions {
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

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Constants
const sides: Side[] = ['top', 'right', 'bottom', 'left'];

// Math utilities
// We can't use object destructuring here because we get in a loop with
// Binding elements can't be exported directly with --isolatedDeclarations.
// eslint-disable-next-line prefer-destructuring
const min: (...values: number[]) => number = Math.min;
// eslint-disable-next-line prefer-destructuring
const max: (...values: number[]) => number = Math.max;
// eslint-disable-next-line prefer-destructuring
const round: (x: number) => number = Math.round;
// eslint-disable-next-line prefer-destructuring
const floor: (x: number) => number = Math.floor;

// Helper objects
const oppositeSideMap: Record<Side, Side> = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};

const oppositeAlignmentMap: Record<Exclude<Alignment, 'center'>, Exclude<Alignment, 'center'>> = {
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
const createCoords = (v: number): Coords => ({
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
function clamp(start: number, value: number, end: number): number {
  return max(start, min(value, end));
}

/**
 * Evaluates a value that can be either a static value or a function.
 * @param value - The value or function to evaluate
 * @param param - The parameter to pass to the function if value is a function
 * @returns The evaluated result
 */
function evaluate<T, P>(value: T | ((param: P) => T), param: P): T {
  return typeof value === 'function' ? (value as (param: P) => T)(param) : value;
}

/**
 * Extracts the side from a placement string.
 * @param placement - The placement string (e.g., 'top-start')
 * @returns The side portion (e.g., 'top')
 */
function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}

/**
 * Extracts the alignment from a placement string.
 * @param placement - The placement string (e.g., 'top-start')
 * @returns The alignment portion (e.g., 'start') or undefined if no alignment
 */
function getAlignment(placement: Placement): Alignment | undefined {
  return placement.split('-')[1] as Alignment | undefined;
}

/**
 * Gets the opposite axis (x ↔ y).
 * @param axis - The axis to flip
 * @returns The opposite axis
 */
function getOppositeAxis(axis: Axis): Axis {
  return axis === 'x' ? 'y' : 'x';
}

/**
 * Gets the length property name for an axis.
 * @param axis - The axis ('x' or 'y')
 * @returns 'width' for x-axis, 'height' for y-axis
 */
function getAxisLength(axis: Axis): Length {
  return axis === 'y' ? 'height' : 'width';
}

/**
 * Gets the axis that runs along the side of a placement.
 * @param placement - The placement to get the side axis for
 * @returns 'y' for top/bottom sides, 'x' for left/right sides
 */
function getSideAxis(placement: Placement): Axis {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}

/**
 * Gets the axis that runs along the alignment of a placement.
 * @param placement - The placement to get the alignment axis for
 * @returns The axis perpendicular to the side axis
 */
function getAlignmentAxis(placement: Placement): Axis {
  return getOppositeAxis(getSideAxis(placement));
}

/**
 * Gets the two sides that correspond to the alignment axis for overflow checking.
 * @param placement - The placement to get alignment sides for
 * @param rects - The reference and floating element rectangles
 * @param rtl - Whether the layout is right-to-left
 * @returns Tuple of main alignment side and its opposite
 */
function getAlignmentSides(
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
function getExpandedPlacements(placement: Placement): Placement[] {
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
function getOppositeAlignmentPlacement<T extends string>(placement: T): T {
  return placement.replace(/start|end/g, alignment =>
    oppositeAlignmentMap[alignment as Exclude<Alignment, 'center'>]) as T;
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
function getOppositeAxisPlacements(
  placement: Placement,
  flipAlignment: boolean,
  direction: 'none' | Exclude<Alignment, 'center'>,
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
function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, side =>
    oppositeSideMap[side as Side]) as T;
}

/**
 * Expands a partial padding object to include all sides with defaults.
 * @param padding - The partial padding object
 * @returns Complete padding object with all sides
 */
function expandPaddingObject(padding: Partial<SideObject>): SideObject {
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
function getPaddingObject(padding: Padding): SideObject {
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
function rectToClientRect(rect: Rect): ClientRectObject {
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

// =============================================================================
// DOM UTILITY FUNCTIONS
// =============================================================================

type OverflowAncestors = (Element | Window | VisualViewport)[];

/**
 * Checks if the window object is available in the current environment.
 * @returns {boolean} True if window is defined, false otherwise
 */
function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Gets the node name of a given node or window object.
 * @param {Node | Window} node - The node or window to get the name for
 * @returns {string} The lowercase node name, or '#document' for non-Node objects
 */
function getNodeName(node: Node | Window): string {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}

/**
 * Gets the window object associated with a given node.
 * @param {any} node - The node to get the window for
 * @returns {typeof window} The window object associated with the node, or the global window
 */
function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

/**
 * Gets the document element (html element) for a given node or window.
 * @param {Node | Window} node - The node or window to get the document element for
 * @returns {HTMLElement} The document element (html element)
 */
function getDocumentElement(node: Node | Window): HTMLElement {
  return (
    (isNode(node) ? node.ownerDocument : node.document) || window.document
  )?.documentElement;
}

/**
 * Type guard to check if a value is a Node.
 * @param {unknown} value - The value to check
 * @returns {value is Node} True if the value is a Node, false otherwise
 */
function isNode(value: unknown): value is Node {
  if (!hasWindow()) {
    return false;
  }

  return value instanceof Node || value instanceof getWindow(value).Node;
}

/**
 * Type guard to check if a value is an Element.
 * @param {unknown} value - The value to check
 * @returns {value is Element} True if the value is an Element, false otherwise
 */
function isElement(value: unknown): value is Element {
  if (!hasWindow()) {
    return false;
  }

  return value instanceof Element || value instanceof getWindow(value).Element;
}

/**
 * Type guard to check if a value is an HTMLElement.
 * @param {unknown} value - The value to check
 * @returns {value is HTMLElement} True if the value is an HTMLElement, false otherwise
 */
function isHTMLElement(value: unknown): value is HTMLElement {
  if (!hasWindow()) {
    return false;
  }

  return (
    value instanceof HTMLElement
    || value instanceof getWindow(value).HTMLElement
  );
}

/**
 * Type guard to check if a value is a ShadowRoot.
 * @param {unknown} value - The value to check
 * @returns {value is ShadowRoot} True if the value is a ShadowRoot, false otherwise
 */
function isShadowRoot(value: unknown): value is ShadowRoot {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }

  return (
    value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
  );
}

const invalidOverflowDisplayValues = new Set(['inline', 'contents']);

/**
 * Checks if an element has overflow properties that create a scrolling context.
 * @param {Element} element - The element to check
 * @returns {boolean} True if the element has overflow properties that create a scrolling context
 */
function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX)
    && !invalidOverflowDisplayValues.has(display)
  );
}

const tableElements = new Set(['table', 'td', 'th']);

/**
 * Checks if an element is a table-related element (table, td, th).
 * @param {Element} element - The element to check
 * @returns {boolean} True if the element is a table-related element
 */
function isTableElement(element: Element): boolean {
  return tableElements.has(getNodeName(element));
}

const topLayerSelectors = [':popover-open', ':modal'];

/**
 * Checks if an element is in the top layer (popover or modal).
 * @param {Element} element - The element to check
 * @returns {boolean} True if the element is in the top layer
 */
function isTopLayer(element: Element): boolean {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch {
      return false;
    }
  });
}

const transformProperties = [
  'transform',
  'translate',
  'scale',
  'rotate',
  'perspective',
];

const willChangeValues = [
  'transform',
  'translate',
  'scale',
  'rotate',
  'perspective',
  'filter',
];

const containValues = ['paint', 'layout', 'strict', 'content'];

/**
 * Checks if an element or CSS style declaration creates a containing block.
 * A containing block is the element relative to which positioned elements are positioned.
 * @param {Element | CSSStyleDeclaration} elementOrCss - The element or CSS style declaration to check
 * @returns {boolean} True if the element creates a containing block
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
 * @see https://drafts.csswg.org/css-transforms-2/#individual-transforms
 */
function isContainingBlock(
  elementOrCss: Element | CSSStyleDeclaration,
): boolean {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ?
    getComputedStyle(elementOrCss)
    : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return (
    transformProperties.some(value =>
      css[value as keyof CSSStyleDeclaration] ?
        css[value as keyof CSSStyleDeclaration] !== 'none'
        : false,
    )
    || (css.containerType ? css.containerType !== 'normal' : false)
    || (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false))
    || (!webkit && (css.filter ? css.filter !== 'none' : false))
    || willChangeValues.some(value => (css.willChange || '').includes(value))
    || containValues.some(value => (css.contain || '').includes(value))
  );
}

/**
 * Gets the nearest containing block element for a given element.
 * Traverses up the DOM tree to find the first element that creates a containing block.
 * @param {Element} element - The element to find the containing block for
 * @returns {HTMLElement | null} The containing block element, or null if none found
 */
function getContainingBlock(element: Element): HTMLElement | null {
  let currentNode: Node | null = getParentNode(element);

  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }

    currentNode = getParentNode(currentNode);
  }

  return null;
}

/**
 * Checks if the current browser is WebKit-based.
 * @returns {boolean} True if the browser is WebKit-based, false otherwise
 */
function isWebKit(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }
  return CSS.supports('-webkit-backdrop-filter', 'none');
}

const lastTraversableNodeNames = new Set(['html', 'body', '#document']);

/**
 * Checks if a node is the last traversable node in the DOM tree.
 * @param {Node} node - The node to check
 * @returns {boolean} True if the node is the last traversable node (html, body, or #document)
 */
function isLastTraversableNode(node: Node): boolean {
  return lastTraversableNodeNames.has(getNodeName(node));
}

/**
 * Gets the computed style for an element.
 * @param {Element} element - The element to get computed styles for
 * @returns {CSSStyleDeclaration} The computed style declaration for the element
 */
function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

/**
 * Gets the scroll position of an element or window.
 * @param {Element | Window} element - The element or window to get scroll position for
 * @returns {{scrollLeft: number, scrollTop: number}} Object containing scrollLeft and scrollTop values
 */
function getNodeScroll(element: Element | Window): {
  scrollLeft: number;
  scrollTop: number;
} {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }

  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}

/**
 * Gets the parent node of a given node, handling shadow DOM and slotted elements.
 * @param {Node} node - The node to get the parent for
 * @returns {Node} The parent node, handling shadow DOM boundaries and slotted elements
 */
function getParentNode(node: Node): Node {
  if (getNodeName(node) === 'html') {
    return node;
  }

  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    (node as any).assignedSlot
    // DOM Element detected.
    || node.parentNode
    // ShadowRoot detected.
    || (isShadowRoot(node) && node.host)
    // Fallback.
    || getDocumentElement(node);

  return isShadowRoot(result) ? result.host : result;
}

/**
 * Gets the nearest overflow ancestor element for a given node.
 * Traverses up the DOM tree to find the first element that has overflow properties.
 * @param {Node} node - The node to find the overflow ancestor for
 * @returns {HTMLElement} The nearest overflow ancestor element
 */
function getNearestOverflowAncestor(node: Node): HTMLElement {
  const parentNode = getParentNode(node);

  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ?
      node.ownerDocument.body
      : (node as Document).body;
  }

  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }

  return getNearestOverflowAncestor(parentNode);
}

/**
 * Gets all overflow ancestors for a given node, including windows and visual viewports.
 * @param {Node} node - The node to get overflow ancestors for
 * @param {OverflowAncestors} list - Accumulator list for overflow ancestors
 * @param {boolean} traverseIframes - Whether to traverse iframe boundaries
 * @returns {OverflowAncestors} Array of overflow ancestors including elements, windows, and visual viewports
 */
function getOverflowAncestors(
  node: Node,
  list: OverflowAncestors = [],
  traverseIframes = true,
): OverflowAncestors {
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === node.ownerDocument?.body;
  const win = getWindow(scrollableAncestor);

  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
    );
  }

  return list.concat(
    scrollableAncestor,
    getOverflowAncestors(scrollableAncestor, [], traverseIframes),
  );
}

/**
 * Gets the frame element for a window if it's within an iframe.
 * @param {Window} win - The window to get the frame element for
 * @returns {Element | null} The frame element if the window is within an iframe, null otherwise
 */
function getFrameElement(win: Window): Element | null {
  return win.parent && Object.getPrototypeOf(win.parent) ?
    win.frameElement
    : null;
}

// =============================================================================
// CORE MIDDLEWARES
// =============================================================================

// Helper function implementations
function computeCoordsFromPlacement(
  { reference, floating }: { reference: Rect; floating: Rect },
  placement: Placement,
  rtl?: boolean
): Coords {
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords: Coords;

  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height,
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height,
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY,
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY,
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y,
      };
  }

  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }

  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This is the core implementation without platform-specific caching.
 * Internal use only - external code should use the exported computePosition.
 * @param reference - The reference element
 * @param floating - The floating element
 * @param config - Configuration options
 */
async function computePositionCore(reference: unknown, floating: unknown, config: {
  placement?: Placement;
  strategy?: 'absolute' | 'fixed';
  middleware?: (Middleware | null | undefined | false)[];
  platform: any;
}): Promise<{
    x: number;
    y: number;
    placement: Placement;
    strategy: 'absolute' | 'fixed';
    middlewareData: MiddlewareData;
  }> {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
  } = config;
  const validMiddleware = middleware.filter(Boolean) as Middleware[];
  const rtl = await (platform.isRTL?.(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy,
  });
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData: MiddlewareData = {};
  let resetCount = 0;

  for (let i = 0; i < validMiddleware.length; i++) {
    const { name, fn } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating,
      },
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data,
      },
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy,
          }) : reset.rects;
        }
        ({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }

  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  };
}


/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 * @param state - The middleware state
 * @param options - Detection options
 */
async function detectOverflow(
  state: MiddlewareState,
  options: DetectOverflowOptions | Derivable<DetectOverflowOptions> = {}
): Promise<SideObject> {
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy,
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0,
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: (await platform.isElement?.(element)) !== false ?
      element
      : element.contextElement || (await platform.getDocumentElement?.(elements.floating)),
    boundary,
    rootBoundary,
    strategy,
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height,
  } : rects.reference;
  const offsetParent = await platform.getOffsetParent?.(elements.floating);
  const offsetScale = (await platform.isElement?.(offsetParent)) ?
    (await platform.getScale?.(offsetParent)) || { x: 1, y: 1 }
    : { x: 1, y: 1 };
  const elementClientRect = rectToClientRect(
    platform.convertOffsetParentRelativeRectToViewportRelativeRect ?
      await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements,
        rect,
        offsetParent,
        strategy,
      })
      : rect,
  );
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top)
      / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom)
      / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left)
      / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right)
      / offsetScale.x,
  };
}


/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 * @param options - Arrow options
 */
const arrowMiddleware = (options: ArrowOptions | Derivable<ArrowOptions>): Middleware => ({
  name: 'arrow',
  options,
  async fn(state: MiddlewareState): Promise<MiddlewareReturn> {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData,
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0,
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = { x, y };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis]
      - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await platform.getOffsetParent?.(element);
    let clientSize = arrowOffsetParent ? (arrowOffsetParent as any)[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await platform.isElement?.(arrowOffsetParent))) {
      clientSize = (elements.floating as any)[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max$1 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max$1);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null
      && center !== offset && rects.reference[length] / 2
      - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ?
      center < min$1 ? center - min$1 : center - max$1
      : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset,
        }),
      },
      reset: shouldAddOffset,
    };
  },
});


/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 * @param options - Flip options
 */
const flipMiddleware = (options: FlipOptions | Derivable<FlipOptions> = {}): Middleware => {
  return {
    name: 'flip',
    options,
    async fn(state: MiddlewareState): Promise<MiddlewareReturn> {
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements,
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if (middlewareData.arrow?.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await platform.isRTL?.(elements.floating);
      const fallbackPlacements = specifiedFallbackPlacements || (
        isBasePlacement || !flipAlignment ?
          [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement)
      );
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(
          initialPlacement,
          flipAlignment,
          fallbackAxisSideDirection,
          rtl,
        ));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows: number[] = [];
      let overflowsData = middlewareData.flip?.overflows || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows,
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        const nextIndex = (middlewareData.flip?.index || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ?
            initialSideAxis !== getSideAxis(nextPlacement)
            : false;
          if (!ignoreCrossAxisOverflow
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          || overflowsData.every(d =>
            d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis
          )) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData,
              },
              reset: {
                placement: nextPlacement,
              },
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = overflowsData
            .filter(d => d.overflows[0] <= 0)
            .sort((a, b) => a.overflows[1] - b.overflows[1])[0]?.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
            {
              const placement = overflowsData.filter(d => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    || currentSideAxis === 'y';
                }
                return true;
              })
                  .map(d => [
                    d.placement,
                    d.overflows
                        .filter(overflow => overflow > 0)
                        .reduce((acc, overflow) => acc + overflow, 0),
                  ])
                  .sort((a, b) => (a[1] as number) - (b[1] as number))[0]?.[0];
              if (placement) {
                resetPlacement = placement as Placement;
              }
              break;
            }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement,
            },
          };
        }
      }
      return {};
    },
  };
};

const originSides = new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(
  state: MiddlewareState,
  options: OffsetValue | Derivable<OffsetValue>
): Promise<Coords> {
  const {
    placement,
    platform,
    elements,
  } = state;
  const rtl = await platform.isRTL?.(elements.floating);
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);


  const {
    mainAxis,
    crossAxis: initialCrossAxis,
    alignmentAxis,
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null,
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis,
  };
  const crossAxis = alignment && typeof alignmentAxis === 'number' ?
    alignment === 'end' ? alignmentAxis * -1 : alignmentAxis
    : initialCrossAxis;
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti,
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti,
  };
}


/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 * @param options - Offset options
 */
const offsetMiddleware = (options: OffsetOptions = 0): Middleware => {
  return {
    name: 'offset',
    options,
    async fn(state: MiddlewareState): Promise<MiddlewareReturn> {
      const {
        x,
        y,
        placement,
        middlewareData,
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === middlewareData.offset?.placement && middlewareData.arrow?.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement,
        },
      };
    },
  };
};


/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 * @param options - Shift options
 */
const shiftMiddleware = (options: ShiftOptions | Derivable<ShiftOptions> = {}): Middleware => {
  return {
    name: 'shift',
    options,
    async fn(state: MiddlewareState): Promise<MiddlewareReturn> {
      const { x, y, placement } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: ({ x, y }: { x: number; y: number }) => ({ x, y }),
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = { x, y };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      };
    },
  };
};

// =============================================================================
// DOM PLATFORM & AUTO-UPDATE
// =============================================================================

interface CssDimensions {
  width: number;
  height: number;
  $: boolean;
}

/**
 * Gets the CSS dimensions of an element, handling fallbacks for SVG elements.
 * @param element - The element to get dimensions for
 * @returns Object containing width, height, and fallback flag
 */
function getCssDimensions(element: Element): CssDimensions {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback,
  };
}

/**
 * Unwraps an element from a virtual element wrapper if needed.
 * @param element - The element or virtual element to unwrap
 * @returns The unwrapped element
 */
function unwrapElement(element: any): Element {
  return !isElement(element) ? element.contextElement : element;
}

/**
 * Gets the scale factor of an element based on its bounding rect vs CSS dimensions.
 * @param element - The element to get scale for
 * @returns Coordinates object with x and y scale factors
 */
function getScale(element: any): Coords {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $,
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y,
  };
}

const noOffsets = createCoords(0);

/**
 * Gets the visual viewport offsets for an element in WebKit browsers.
 * @param element - The element to get visual offsets for
 * @returns Coordinates object with x and y offsets
 */
function getVisualOffsets(element: Element): Coords {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  };
}

/**
 * Determines if visual offsets should be added for positioning calculations.
 * @param element - The element to check
 * @param isFixed - Whether the element uses fixed positioning
 * @param floatingOffsetParent - The floating element's offset parent
 * @returns True if visual offsets should be added
 */
function shouldAddVisualOffsets(
  element: Element,
  isFixed = false,
  floatingOffsetParent?: any
): boolean {
  if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== getWindow(element))) {
    return false;
  }
  return isFixed;
}

/**
 * Gets the bounding client rect of an element with optional scale and iframe handling.
 * @param element - The element to get bounding rect for
 * @param includeScale - Whether to include scale calculations
 * @param isFixedStrategy - Whether the element uses fixed positioning strategy
 * @param offsetParent - The offset parent for calculations
 * @returns Client rect object with position and dimensions
 */
function getBoundingClientRect(
  element: any,
  includeScale = false,
  isFixedStrategy = false,
  offsetParent?: any
): ClientRectObject {
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ?
    getVisualOffsets(domElement)
    : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent
      && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left
        + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top
        + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y,
  });
}

/**
 * Gets the X position of the window scrollbar.
 * Note: If <html> has a CSS width greater than the viewport, this will be incorrect for RTL.
 * @param element - The element to get scrollbar position for
 * @param rect - Optional rect to use instead of calculating
 * @returns The X position of the scrollbar
 */
function getWindowScrollBarX(element: Element, rect?: ClientRectObject): number {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)!).left + leftScroll;
  }
  return rect.left + leftScroll;
}

/**
 * Gets the HTML offset for positioning calculations.
 * @param documentElement - The document element
 * @param scroll - The scroll position object
 * @param ignoreScrollbarX - Whether to ignore X scrollbar in calculations
 * @returns Coordinates object with x and y offsets
 */
function getHTMLOffset(
  documentElement: Element,
  scroll: { scrollLeft: number; scrollTop: number },
  ignoreScrollbarX = false
): Coords {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0
  // RTL <body> scrollbar.
  : getWindowScrollBarX(documentElement, htmlRect));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y,
  };
}

/**
 * Converts an offset parent relative rect to a viewport relative rect.
 * @param args - Object containing elements, rect, offsetParent, and strategy
 * @returns Viewport-relative rect
 */
function convertOffsetParentRelativeRectToViewportRelativeRect(args: {
  elements?: { floating: Element };
  rect: Rect;
  offsetParent: any;
  strategy: Strategy;
}): Rect {
  const { elements, rect, offsetParent, strategy } = args;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent)!;
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || (topLayer && isFixed)) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ?
    getHTMLOffset(documentElement, scroll, true)
    : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  };
}

/**
 * Gets all client rects for an element.
 * @param element - The element to get client rects for
 * @returns Array of client rect objects
 */
function getClientRects(element: Element): ClientRectObject[] {
  return Array.from(element.getClientRects());
}

/**
 * Gets the entire size of the scrollable document area, even extending outside
 * of the `<html>` and `<body>` rect bounds if horizontally scrollable.
 * @param element - The element to get document rect for
 * @returns Rect object with document dimensions and position
 */
function getDocumentRect(element: Element): Rect {
  const html = getDocumentElement(element)!;
  const scroll = getNodeScroll(element);
  const { body } = (element as any).ownerDocument;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y,
  };
}

/**
 * Gets the viewport rect, accounting for visual viewport if available.
 * @param element - The element to get viewport rect for
 * @param strategy - The positioning strategy being used
 * @returns Rect object with viewport dimensions and position
 */
function getViewportRect(element: Element, strategy: Strategy): Rect {
  const win = getWindow(element);
  const html = getDocumentElement(element)!;
  const { visualViewport } = (win as any);
  const width = visualViewport ? visualViewport.width : html.clientWidth;
  const height = visualViewport ? visualViewport.height : html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y,
  };
}

const absoluteOrFixed = new Set(['absolute', 'fixed']);

/**
 * Returns the inner client rect, subtracting scrollbars if present.
 * @param element - The element to get inner rect for
 * @param strategy - The positioning strategy being used
 * @returns Rect object with inner dimensions and position
 */
function getInnerBoundingClientRect(element: Element, strategy: Strategy): Rect {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + (element as HTMLElement).clientTop;
  const left = clientRect.left + (element as HTMLElement).clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = (element as HTMLElement).clientWidth * scale.x;
  const height = (element as HTMLElement).clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y,
  };
}

/**
 * Gets the client rect from a clipping ancestor (viewport, document, or element).
 * @param element - The element being positioned
 * @param clippingAncestor - The clipping ancestor ('viewport', 'document', or element)
 * @param strategy - The positioning strategy being used
 * @returns Client rect object for the clipping boundary
 */
function getClientRectFromClippingAncestor(
  element: Element,
  clippingAncestor: any,
  strategy: Strategy
): ClientRectObject {
  let rect: Rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element)!);
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    };
  }
  return rectToClientRect(rect);
}

/**
 * Checks if an element has a fixed position ancestor up to a stop node.
 * @param element - The element to check
 * @param stopNode - The node to stop checking at
 * @returns True if a fixed position ancestor is found
 */
function hasFixedPositionAncestor(element: Element, stopNode: Element): boolean {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed'
    || hasFixedPositionAncestor(parentNode, stopNode);
}

/**
 * A "clipping ancestor" is an `overflow` element with the characteristic of
 * clipping (or hiding) child elements. This returns all clipping ancestors
 * of the given element up the tree.
 * @param element - The element to find clipping ancestors for
 * @param cache - Cache map to store results
 * @returns Array of clipping ancestor elements
 */
function getClippingElementAncestors(element: Element, cache: Map<Element, Element[]>): Element[] {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(
    el => isElement(el) && getNodeName(el) !== 'body'
  ) as Element[];
  let currentContainingBlockComputedStyle: CSSStyleDeclaration | null = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode: Node | null = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ?
      !currentNodeIsContaining && !currentContainingBlockComputedStyle
      : !currentNodeIsContaining && computedStyle.position === 'static'
        && !!currentContainingBlockComputedStyle
        && absoluteOrFixed.has(currentContainingBlockComputedStyle.position)
        || isOverflowElement(currentNode)
        && !currentNodeIsContaining
        && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode as Element);
  }
  cache.set(element, result);
  return result;
}

/**
 * Gets the maximum area that the element is visible in due to any number of
 * clipping ancestors.
 * @param args - Object containing element, boundary, rootBoundary, and strategy
 * @returns Rect object representing the clipping area
 */
function getClippingRect(this: { _c: Map<Element, Element[]> }, args: {
  element: Element;
  boundary: any;
  rootBoundary: any;
  strategy: Strategy;
}): Rect {
  const { element, boundary, rootBoundary, strategy } = args;
  const elementClippingAncestors = boundary === 'clippingAncestors' ?
    isTopLayer(element) ?
      []
      : getClippingElementAncestors(element, this._c)
    : [boundary].flat();
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const [firstClippingAncestor] = clippingAncestors;
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top,
  };
}

/**
 * Gets the dimensions of an element.
 * @param element - The element to get dimensions for
 * @returns Dimensions object with width and height
 */
function getDimensions(element: Element): Dimensions {
  const { width, height } = getCssDimensions(element);
  return {
    width,
    height,
  };
}

/**
 * Gets the rect of an element relative to its offset parent.
 * @param element - The element to get rect for
 * @param offsetParent - The offset parent element
 * @param strategy - The positioning strategy being used
 * @returns Rect object relative to the offset parent
 */
function getRectRelativeToOffsetParent(
  element: Element,
  offsetParent: any,
  strategy: Strategy
): Rect {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent)!;
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset(): void {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ?
    getHTMLOffset(documentElement, scroll)
    : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Checks if an element has static positioning.
 * @param element - The element to check
 * @returns True if the element is statically positioned
 */
function isStaticPositioned(element: Element): boolean {
  return getComputedStyle(element).position === 'static';
}

/**
 * Gets the true offset parent of an element, handling browser differences.
 * Firefox returns the <html> element as the offsetParent if it's non-static,
 * while Chrome and Safari return the <body> element. The <body> element must
 * be used to perform the correct calculations even if the <html> element is
 * non-static.
 * @param element - The element to get offset parent for
 * @param polyfill - Optional polyfill function for offset parent
 * @returns The true offset parent or null
 */
function getTrueOffsetParent(element: Element, polyfill?: (element: Element) =>
  Element | null): Element | null {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = (element as HTMLElement).offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

/**
 * Gets the closest ancestor positioned element. Handles some edge cases,
 * such as table ancestors and cross browser bugs.
 * @param element - The element to get offset parent for
 * @param polyfill - Optional polyfill function for offset parent
 * @returns The offset parent element or window
 */
function getOffsetParent(element: Element, polyfill?: (element: Element) =>
  Element | null): Element | Window {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent)
      && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

/**
 * Gets the element rects for reference and floating elements.
 * @param data - Object containing reference, floating, and strategy
 * @returns Promise resolving to element rects
 */
const getElementRects = async function(this: any, data: {
  reference: Element;
  floating: Element;
  strategy: Strategy;
}): Promise<ElementRects> {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(
      data.reference,
      await getOffsetParentFn(data.floating),
      data.strategy
    ),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height,
    },
  };
};

/**
 * Checks if an element is in a right-to-left (RTL) context.
 * @param element - The element to check
 * @returns True if the element is in RTL context
 */
function isRTL(element: Element): boolean {
  return getComputedStyle(element).direction === 'rtl';
}

const platform: Platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL,
};

/**
 * Checks if two client rect objects are equal.
 * @param a - First rect object
 * @param b - Second rect object
 * @returns True if the rects are equal
 */
function rectsAreEqual(a: ClientRectObject, b: ClientRectObject): boolean {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

/**
 * Observes an element for movement and calls a callback when it moves.
 * Based on https://samthor.au/2021/observing-dom/
 * @param element - The element to observe
 * @param onMove - Callback function called when element moves
 * @returns Cleanup function to stop observing
 */
function observeMove(element: Element, onMove: () => void): () => void {
  let io: IntersectionObserver | null = null;
  let timeoutId: ReturnType<typeof setTimeout>;
  const root = getDocumentElement(element)!;
  function cleanup(): void {
    clearTimeout(timeoutId);
    io?.disconnect();
    io = null;
  }
  function refresh(skip = false, threshold = 1): void {
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const { left, top, width, height } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = `${-insetTop}px ${-insetRight}px ${-insetBottom}px ${-insetLeft}px`;
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1,
    };
    let isFirstUpdate = true;
    function handleObserve(entries: IntersectionObserverEntry[]): void {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1
        && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        // It's possible that even though the ratio is reported as 1, the
        // element is not actually fully within the IntersectionObserver's root
        // area anymore. This can happen under performance constraints. This may
        // be a bug in the browser's IntersectionObserver implementation. To
        // work around this, we compare the element's bounding rect now with
        // what it was at the time we created the IntersectionObserver. If they
        // are not equal then the element moved, so we refresh.
        refresh();
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument,
      });
    } catch {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

interface AutoUpdateOptions {
  /**
   * Whether to update the position when an overflow ancestor scrolls.
   * @default true
   */
  ancestorScroll?: boolean;
  /**
   * Whether to update the position when an overflow ancestor is resized.
   * @default true
   */
  ancestorResize?: boolean;
  /**
   * Whether to update the position when either the reference or floating
   * elements resized.
   * @default true
   */
  elementResize?: boolean;
  /**
   * Whether to update the position when the reference element moved on the
   * screen (covered by another element, clipped by an ancestor, or scrolled
   * out of view).
   * @default true
   */
  layoutShift?: boolean;
  /**
   * Whether to update on every animation frame if required.
   * @default false
   */
  animationFrame?: boolean;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
export function autoUpdate(
  reference: Element,
  floating: HTMLElement,
  update: () => void,
  options: AutoUpdateOptions = {}
): () => void {
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false,
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ?
    [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)]
    : [];
  ancestors.forEach(ancestor => {
    if (ancestorScroll) {
      ancestor.addEventListener('scroll', update, { passive: true });
    }
    if (ancestorResize) {
      ancestor.addEventListener('resize', update);
    }
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver: ResizeObserver | null = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(([firstEntry]) => {
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver?.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId: number;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop(): void {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      if (ancestorScroll) {
        ancestor.removeEventListener('scroll', update);
      }
      if (ancestorResize) {
        ancestor.removeEventListener('resize', update);
      }
    });
    cleanupIo?.();
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

// Note: offset, shift, flip, arrow are already exported in the CORE MIDDLEWARES section above.

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This DOM-specific version adds platform caching for better performance.
 * @param reference - The reference element to position relative to
 * @param floating - The floating element to position
 * @param options - Optional configuration for positioning
 * @returns Promise resolving to computed position data
 */
export const computePosition = (
  reference: Element,
  floating: HTMLElement,
  options?: Partial<ComputePositionConfig>
): Promise<ComputePositionReturn> => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options,
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache,
  };
  return computePositionCore(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  });
};
