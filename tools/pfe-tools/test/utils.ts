import { sendMouse } from '@web/test-runner-commands';
import type { ReactiveElement } from 'lit';

export type Position = [x: number, y: number];

/**
 * Get the center coords of an element.
 * @param element get the center of this element's bounding box
 */
export function getElementCenterPosition(element: Element): Position {
  const { x, y, width, height } = element.getBoundingClientRect();

  return [
    Math.floor(x + window.pageXOffset + width / 2),
    Math.floor(y + window.pageYOffset + height / 2),
  ];
}

/**
 * Click an element at approximate center, using playwright's sendMouse command
 * @param element to click at it's center
 */
export async function clickElementAtCenter(element: Element): Promise<void> {
  const position = getElementCenterPosition(element);
  await sendMouse({ type: 'click', position });
}

/**
 * Click an element at an offset from it's top-left corner,
 * using playwright's sendMouse command
 * @param element to click
 * @param relativeOffset x,y coords tuple
 * @param [options] options
 * @param [options.allowOutOfBounds] allow the browser to click outside of the element boundaries
 */
export async function clickElementAtOffset(
  element: Element,
  relativeOffset: Position,
  options?: {
    allowOutOfBounds?: true;
  }
): Promise<void> {
  const { x, y, right, bottom } = element.getBoundingClientRect();
  const [xOffset, yOffset] = relativeOffset;
  const position = [
    Math.round(xOffset + (xOffset < 0 ? right : x)),
    Math.round(yOffset + (yOffset < 0 ? bottom : y)),
  ] satisfies [number, number];
  const [xCoord, yCoord] = position;
  // NOTE: this may fail in RTL situations?
  if (!options?.allowOutOfBounds) {
    if (xCoord > right) {
      throw new Error('X offset is outside element boundaries');
    }
    if (yCoord > bottom) {
      throw new Error('Y offset is outside element boundaries');
    }
  }
  await sendMouse({ type: 'click', position });
}

/**
 * Waits for an element to completely finish updating, or throws after 100 attempts
 * Will also throw if the element doesn't have an `updateComplete` promise
 * @param element to wait on
 */
export async function allUpdates(element: ReactiveElement): Promise<void> {
  if (!(element.updateComplete instanceof Promise)) {
    throw new Error(`${element.localName} does not appear to be a ReactiveElement`);
  }
  let count = 0;
  do {
    if (count > 100) {
      throw new Error(`Too Many Updates: ${element.localName} did not finish updating after ${count - 1} tries.`);
    }
    await element.updateComplete;
    count++;
  } while (!await element.updateComplete);
}
