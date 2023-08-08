import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

export interface Options {
  /**
   * Force hide the scroll buttons regardless of overflow
   */
  hideOverflowButtons?: boolean;
  /**
   * Delay in ms to wait before checking for overflow
   */
  scrollTimeoutDelay?: number;
}

export class OverflowController implements ReactiveController {
  static #instances = new Set<OverflowController>();

  static {
    // on resize check for overflows to add or remove scroll buttons
    window.addEventListener('resize', () => {
      for (const instance of this.#instances) {
        instance.onScroll();
      }
    }, { capture: false });
  }

  /** Overflow container */
  #container?: HTMLElement;
  /** Children that can overflow */
  #items: HTMLElement[] = [];

  #scrollTimeoutDelay: number;
  #scrollTimeout?: ReturnType<typeof setTimeout>;

  /** Default state */
  #hideOverflowButtons: boolean;
  showScrollButtons = false;
  overflowLeft = false;
  overflowRight = false;

  get firstItem(): HTMLElement | undefined {
    return this.#items.at(0);
  }

  get lastItem(): HTMLElement | undefined {
    return this.#items.at(-1);
  }

  constructor(public host: ReactiveControllerHost & Element, private options?: Options) {
    this.host.addController(this);
    this.#hideOverflowButtons = options?.hideOverflowButtons ?? false;
    this.#scrollTimeoutDelay = options?.scrollTimeoutDelay ?? 0;
    if (host.isConnected) {
      OverflowController.#instances.add(this);
    }
  }

  #setOverflowState(): void {
    if (!this.firstItem || !this.lastItem || !this.#container) {
      return;
    }
    const prevLeft = this.overflowLeft;
    const prevRight = this.overflowRight;

    this.overflowLeft = !this.#hideOverflowButtons && !isElementInView(this.#container, this.firstItem);
    this.overflowRight = !this.#hideOverflowButtons && !isElementInView(this.#container, this.lastItem);
    let scrollButtonsWidth = 0;
    if (this.overflowLeft || this.overflowRight) {
      scrollButtonsWidth = (this.#container.parentElement?.querySelector('button')?.getBoundingClientRect().width || 0) * 2;
    }
    this.showScrollButtons = !this.#hideOverflowButtons &&
    this.#container.scrollWidth > (this.#container.clientWidth + scrollButtonsWidth);

    // only request update if there has been a change
    if ((prevLeft !== this.overflowLeft) || (prevRight !== this.overflowRight)) {
      this.host.requestUpdate();
    }
  }

  init(container: HTMLElement, items: HTMLElement[]) {
    this.#container = container;
    // convert HTMLCollection to HTMLElement[]
    this.#items = items;
  }

  onScroll = () => {
    clearTimeout(this.#scrollTimeout);
    this.#scrollTimeout = setTimeout(() => this.#setOverflowState(), this.#scrollTimeoutDelay);
  };

  scrollLeft() {
    if (!this.#container) {
      return;
    }
    const leftScroll = this.#container.scrollLeft - this.#container.clientWidth;
    this.#container.scroll({ left: leftScroll, behavior: 'smooth' });
    this.#setOverflowState();
  }

  scrollRight() {
    if (!this.#container) {
      return;
    }
    const leftScroll = this.#container.scrollLeft + this.#container.clientWidth;
    this.#container.scroll({ left: leftScroll, behavior: 'smooth' });
    this.#setOverflowState();
  }

  update() {
    this.#setOverflowState();
  }

  hostConnected(): void {
    this.onScroll();
    this.#setOverflowState();
  }
}
