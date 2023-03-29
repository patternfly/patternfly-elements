import type { Placement } from '@floating-ui/dom';
import type { ReactiveController, ReactiveElement } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';
import type { Options as Offset } from '@floating-ui/core/src/middleware/offset';

export { Placement };

import {
  autoUpdate,
  computePosition,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  flip as flipMiddleware,
  arrow as arrowMiddleware
} from '@floating-ui/dom';

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
  offset?: Offset;
  placement?: Placement;
  flip?: boolean;
  fallbackPlacements?: Placement[]
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
  #options: Required<FloatingDOMControllerOptions>;

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
  get alignment() {
    return this.#alignment ?? 'center';
  }

  /** The side of the invoker on which to display the floating DOM */
  get anchor() {
    return this.#anchor ?? '';
  }

  /**
   * When true, the floating DOM is visible
   */
  get open() {
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
    private host: ReactiveElement,
    options: FloatingDOMControllerOptions
  ) {
    host.addController(this);
    this.#options = options as Required<FloatingDOMControllerOptions>;
    this.#options.invoker ??= host;
    this.#options.shift ??= true;
  }

  hostDisconnected() {
    this.#cleanup?.();
  }

  async #update(placement: Placement = 'top', offset?: Offset, flip = true, fallbackPlacements?: Placement[]) {
    const { padding, shift } = this.#options;

    const invoker = this.#invoker;
    const content = this.#content;
    const arrow = this.#arrow;
    if (!invoker || !content) {
      return;
    }
    const { x, y, placement: _placement, middlewareData } = await computePosition(invoker, content, {
      strategy: 'absolute',
      placement,
      middleware: [
        offsetMiddleware(offset),
        shift && shiftMiddleware({ padding }),
        arrow && arrowMiddleware({ element: arrow, padding: arrow.offsetHeight / 2 }),
        flip && flipMiddleware({ padding, fallbackPlacements }),
      ].filter(Boolean)
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

  /** Show the floating DOM */
  async show({ offset, placement, flip, fallbackPlacements }: ShowOptions = {}) {
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
  async hide() {
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
