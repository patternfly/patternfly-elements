/*
 * This is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 */

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
export function getNodeName(node: Node | Window): string {
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
export function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

/**
 * Gets the document element (html element) for a given node or window.
 * @param {Node | Window} node - The node or window to get the document element for
 * @returns {HTMLElement} The document element (html element)
 */
export function getDocumentElement(node: Node | Window): HTMLElement {
  return (
    (isNode(node) ? node.ownerDocument : node.document) || window.document
  )?.documentElement;
}

/**
 * Type guard to check if a value is a Node.
 * @param {unknown} value - The value to check
 * @returns {value is Node} True if the value is a Node, false otherwise
 */
export function isNode(value: unknown): value is Node {
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
export function isElement(value: unknown): value is Element {
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
export function isHTMLElement(value: unknown): value is HTMLElement {
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
export function isShadowRoot(value: unknown): value is ShadowRoot {
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
export function isOverflowElement(element: Element): boolean {
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
export function isTableElement(element: Element): boolean {
  return tableElements.has(getNodeName(element));
}

const topLayerSelectors = [':popover-open', ':modal'];

/**
 * Checks if an element is in the top layer (popover or modal).
 * @param {Element} element - The element to check
 * @returns {boolean} True if the element is in the top layer
 */
export function isTopLayer(element: Element): boolean {
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
export function isContainingBlock(
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
export function getContainingBlock(element: Element): HTMLElement | null {
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
export function isWebKit(): boolean {
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
export function isLastTraversableNode(node: Node): boolean {
  return lastTraversableNodeNames.has(getNodeName(node));
}

/**
 * Gets the computed style for an element.
 * @param {Element} element - The element to get computed styles for
 * @returns {CSSStyleDeclaration} The computed style declaration for the element
 */
export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

/**
 * Gets the scroll position of an element or window.
 * @param {Element | Window} element - The element or window to get scroll position for
 * @returns {{scrollLeft: number, scrollTop: number}} Object containing scrollLeft and scrollTop values
 */
export function getNodeScroll(element: Element | Window): {
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
export function getParentNode(node: Node): Node {
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
export function getNearestOverflowAncestor(node: Node): HTMLElement {
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
export function getOverflowAncestors(
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
export function getFrameElement(win: Window): Element | null {
  return win.parent && Object.getPrototypeOf(win.parent) ?
    win.frameElement
    : null;
}
