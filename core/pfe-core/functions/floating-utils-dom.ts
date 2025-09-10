/*
 * This is a recreation of the @floating-ui/dom package.
 * Published under the MIT license.
 * @see https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 */


/**
 * Checks if the current environment has a window object.
 */
function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Gets the node name of a given node, handling various edge cases.
 * @param node - The node to get the name of
 */
function getNodeName(node: any): string {
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
 * @param node - The node to get the window from
 */
function getWindow(node: any): Window {
  return (node?.ownerDocument?.defaultView) || window;
}

/**
 * Gets the document element from a node.
 * @param node - The node to get the document element from
 */
function getDocumentElement(node: any): Element | undefined {
  const doc = (isNode(node) ? node.ownerDocument : node.document) || window.document;
  return doc?.documentElement;
}

/**
 * Type guard to check if a value is a Node.
 * @param value - The value to check
 */
function isNode(value: any): value is Node {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof (getWindow(value) as any).Node;
}

/**
 * Type guard to check if a value is an Element.
 * @param value - The value to check
 */
function isElement(value: any): value is Element {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof (getWindow(value) as any).Element;
}

/**
 * Type guard to check if a value is an HTMLElement.
 * @param value - The value to check
 */
function isHTMLElement(value: any): value is HTMLElement {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof (getWindow(value) as any).HTMLElement;
}

/**
 * Type guard to check if a value is a ShadowRoot.
 * @param value - The value to check
 */
function isShadowRoot(value: any): value is ShadowRoot {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof (getWindow(value) as any).ShadowRoot;
}

const invalidOverflowDisplayValues = new Set(['inline', 'contents']);

/**
 * Determines if an element has overflow styles that create a scrollable container.
 * @param element - The element to check
 */
function isOverflowElement(element: Element): boolean {
  const {
    overflow,
    overflowX,
    overflowY,
    display,
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX)
    && !invalidOverflowDisplayValues.has(display);
}

const tableElements = new Set(['table', 'td', 'th']);

/**
 * Checks if an element is a table-related element.
 * @param element - The element to check
 */
function isTableElement(element: Element): boolean {
  return tableElements.has(getNodeName(element));
}

const topLayerSelectors = [':popover-open', ':modal'];

/**
 * Checks if an element is in the top layer (modal or popover).
 * @param element - The element to check
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

const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
const containValues = ['paint', 'layout', 'strict', 'content'];

/**
 * Determines if an element or CSS creates a containing block.
 * @param elementOrCss - The element or CSS style declaration to check
 */
function isContainingBlock(elementOrCss: Element | CSSStyleDeclaration): boolean {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return transformProperties.some(value => css[value as keyof CSSStyleDeclaration] ?
    css[value as keyof CSSStyleDeclaration] !== 'none' : false)
    || (css.containerType ? css.containerType !== 'normal' : false)
    || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)
    || !webkit && (css.filter ? css.filter !== 'none' : false)
    || willChangeValues.some(value => (css.willChange || '').includes(value))
    || containValues.some(value => (css.contain || '').includes(value));
}

/**
 * Gets the containing block of an element.
 * @param element - The element to find the containing block for
 */
function getContainingBlock(element: Element): HTMLElement | null {
  let currentNode = getParentNode(element);
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
 * @param node - The node to check
 */
function isLastTraversableNode(node: any): boolean {
  return lastTraversableNodeNames.has(getNodeName(node));
}

/**
 * Gets the computed style of an element.
 * @param element - The element to get computed styles for
 */
function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

/**
 * Gets the scroll position of a node (element or window).
 * @param element - The element or window to get scroll position from
 */
function getNodeScroll(element: Element | Window): { scrollLeft: number; scrollTop: number } {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }
  return {
    scrollLeft: (element as Window).scrollX,
    scrollTop: (element as Window).scrollY,
  };
}

/**
 * Gets the parent node of a given node, handling shadow DOM and other edge cases.
 * @param node - The node to get the parent of
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
 * Gets the nearest overflow ancestor of a node.
 * @param node - The node to find the overflow ancestor for
 */
function getNearestOverflowAncestor(node: Node): Element {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node as any).ownerDocument ? (node as any).ownerDocument.body : (node as any).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}

/**
 * Gets all overflow ancestors of a node.
 * @param node - The node to find overflow ancestors for
 * @param list - Existing list of ancestors to append to
 * @param traverseIframes - Whether to traverse iframe boundaries
 */
function getOverflowAncestors(
  node: Node,
  list: (Element | Window)[] = [],
  traverseIframes = true,
): (Element | Window)[] {
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === (node as any).ownerDocument?.body;
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(
      [win],
      win.visualViewport ? [win.visualViewport as any] : [],
      isOverflowElement(scrollableAncestor) ? [scrollableAncestor] : [],
      frameElement && traverseIframes ?
        getOverflowAncestors(frameElement) : [],
    );
  }
  return list.concat(
    scrollableAncestor,
    getOverflowAncestors(scrollableAncestor, [], traverseIframes),
  );
}

/**
 * Gets the frame element of a window if it exists.
 * @param win - The window to get the frame element from
 */
function getFrameElement(win: Window): Element | null {
  return (win as any).parent && Object.getPrototypeOf((win as any).parent) ?
    (win as any).frameElement : null;
}

export {
  getComputedStyle,
  getContainingBlock,
  getDocumentElement,
  getFrameElement,
  getNearestOverflowAncestor,
  getNodeName,
  getNodeScroll,
  getOverflowAncestors,
  getParentNode,
  getWindow,
  isContainingBlock,
  isElement,
  isHTMLElement,
  isLastTraversableNode,
  isNode,
  isOverflowElement,
  isShadowRoot,
  isTableElement,
  isTopLayer,
  isWebKit,
};
