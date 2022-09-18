import type { Instance } from '@popperjs/core';
import type { ReactiveController, ReactiveElement } from 'lit';

import {
  applyStyles,
  arrow,
  computeStyles,
  eventListeners,
  flip,
  hide,
  offset,
  popperGenerator,
  popperOffsets,
  preventOverflow,
} from '@popperjs/core';

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'

type Alignment =
  | 'start'
  | 'end'

/**
 * Represents the placement of floating DOM
 */
export type Placement = Direction | `${Direction}-${Alignment}`;

const createPopper = popperGenerator({
  defaultModifiers: [
    eventListeners,
    popperOffsets,
    computeStyles,
    applyStyles,
    offset,
    flip,
    preventOverflow,
    arrow,
    hide
  ],
});

/**
 * Controls floating DOM within a web component, e.g. tooltips and popovers
 */
export class FloatingDOMController implements ReactiveController {
  #open = false;

  #popper: Instance | undefined;

  #initialized = false;

  get initialized() {
    return this.#initialized;
  }

  set initialized(v: boolean) {
    this.#initialized = v; this.host.requestUpdate();
  }

  /**
   * When true, the floating DOM is visible
   */
  get open() {
    return this.#open;
  }

  set open(value: boolean) {
    this.#open = value;
    if (value) {
      this.#popper?.update();
    }
    this.host.requestUpdate();
  }

  constructor(private host: ReactiveElement) {
    host.addController(this);
  }

  hostConnected?(): void;

  /** Show the floating DOM */
  show(): void {
    this.open = true;
  }

  /** Hide the floating DOM */
  hide(): void {
    this.open = false;
  }

  /** Initialize the floating DOM */
  create(invoker: Element, content: HTMLElement, placement: Placement, offset?: number[]): void {
    if (invoker && content) {
      this.#popper ??= createPopper(invoker, content, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'right', 'left', 'bottom'],
            },
          }
        ]
      });
      this.initialized ||= true;
    }
  }
}
