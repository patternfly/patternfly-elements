/*
 * This is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 */

import {
  getSideAxis,
  getAlignmentAxis,
  getAxisLength,
  getSide,
  getAlignment,
  evaluate,
  getPaddingObject,
  rectToClientRect,
  min,
  clamp,
  getAlignmentSides,
  getOppositeAlignmentPlacement,
  getOppositePlacement,
  getExpandedPlacements,
  getOppositeAxisPlacements,
  sides,
  max,
  getOppositeAxis,
} from './floating-utils.js';

import type {
  Alignment,
  ClientRectObject,
  Coords,
  Placement,
  Rect,
  Side,
  SideObject,
  Derivable,
  MiddlewareData,
  MiddlewareReturn,
  MiddlewareState,
  Middleware,
  DetectOverflowOptions,
  ArrowOptions,
  FlipOptions,
  OffsetOptions,
  OffsetValue,
  ShiftOptions,
} from './floating-types.js';

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
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 * @param reference - The reference element
 * @param floating - The floating element
 * @param config - Configuration options
 */
export async function computePosition(reference: unknown, floating: unknown, config: {
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
export async function detectOverflow(
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
export const arrow = (options: ArrowOptions | Derivable<ArrowOptions>): Middleware => ({
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
export const flip = (options: FlipOptions | Derivable<FlipOptions> = {}): Middleware => {
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
export const offset = (options: OffsetOptions = 0): Middleware => {
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
export const shift = (options: ShiftOptions | Derivable<ShiftOptions> = {}): Middleware => {
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
