/**
 * This function returns whether or not an element is within the viewable area of a container. If partial is true,
 * then this function will return true even if only part of the element is in view.
 *
 * @param container  The container to check if the element is in view of.
 * @param element    The element to check if it is view
 * @param partial    true if partial view is allowed
 * @param strict     true if strict mode is set, never consider the container width and element width
 *
 * @returns True if the component is in View.
 */
export function isElementInView(
  container: HTMLElement,
  element: HTMLElement,
  partial = false,
  strict = false
): boolean {
  if (!container || !element) {
    return false;
  }
  const containerBounds = container.getBoundingClientRect();
  const elementBounds = element.getBoundingClientRect();
  const containerBoundsLeft = Math.ceil(containerBounds.left);
  const containerBoundsRight = Math.floor(containerBounds.right);
  const elementBoundsLeft = Math.ceil(elementBounds.left);
  const elementBoundsRight = Math.floor(elementBounds.right);

  // Check if in view
  const isTotallyInView =
    elementBoundsLeft >= containerBoundsLeft &&
    elementBoundsRight <= containerBoundsRight;
  const isPartiallyInView =
    (partial || (!strict && containerBounds.width < elementBounds.width)) &&
    ((elementBoundsLeft < containerBoundsLeft && elementBoundsRight > containerBoundsLeft) ||
      (elementBoundsRight > containerBoundsRight && elementBoundsLeft < containerBoundsRight));

  // Return outcome
  return isTotallyInView || isPartiallyInView;
}
