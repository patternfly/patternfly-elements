import type { ReactiveElement } from 'lit';

export type Position = [x: number, y: number];

export function getElementPosition(element: Element): Position {
  const { x, y, width, height } = element.getBoundingClientRect();

  return [
    Math.floor(x + window.pageXOffset + width / 2),
    Math.floor(y + window.pageYOffset + height / 2),
  ];
}

/**
 * Waits for an element to completely finish updating, or throws after 100 attempts
 * Will also throw if the element doesn't have an `updateComplete` promise
 */
export async function allUpdates(element: ReactiveElement) {
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
