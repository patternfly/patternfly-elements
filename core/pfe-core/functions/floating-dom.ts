/*
 * This is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 */

import type {
  Rect,
  Strategy,
  Placement,
  Middleware,
  ComputePositionConfig,
  ComputePositionReturn,
  Platform,
  Coords,
  Dimensions,
  ClientRectObject,
  ElementRects,
} from './floating-types.js';

import {
  arrow as arrowCore,
  detectOverflow as detectOverflowCore,
  flip as flipCore,
  offset as offsetCore,
  shift as shiftCore,
  computePosition as computePositionCore,
} from './floating-core.js';

import { rectToClientRect, round, createCoords, max, min, floor } from './floating-utils.js';

import {
  getComputedStyle,
  isHTMLElement,
  isElement,
  getWindow,
  isWebKit,
  getFrameElement,
  getNodeScroll,
  getDocumentElement,
  isTopLayer,
  getNodeName,
  isOverflowElement,
  getOverflowAncestors,
  getParentNode,
  isLastTraversableNode,
  isContainingBlock,
  isTableElement,
  getContainingBlock,
} from './floating-utils-dom.js';

export { getOverflowAncestors } from './floating-utils-dom.js';

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

export const platform: Platform = {
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

export interface AutoUpdateOptions {
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

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
export const offset: typeof offsetCore = offsetCore;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
export const shift: typeof shiftCore = shiftCore;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
export const flip: typeof flipCore = flipCore;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
export const arrow: typeof arrowCore = arrowCore;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
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
