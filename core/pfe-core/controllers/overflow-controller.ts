import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

export interface Options {
  hideOverflowButtons?: boolean;
}

export class OverflowController implements ReactiveController {
  /** Overflow container */
  #container?: HTMLElement;
  /** Children that can overflow */
  #items: HTMLElement[] = [];

  #scrollTimeoutDelay = 0;
  #scrollTimeout?: ReturnType<typeof setTimeout>;

  /** Default state */
  #hideOverflowButtons = false;
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
    if (options?.hideOverflowButtons) {
      this.#hideOverflowButtons = options?.hideOverflowButtons;
    }
  }

  #setOverflowState(): void {
    if (!this.firstItem || !this.lastItem || !this.#container) {
      return;
    }
    this.overflowLeft = !this.#hideOverflowButtons && !isElementInView(this.#container, this.firstItem);
    this.overflowRight = !this.#hideOverflowButtons && !isElementInView(this.#container, this.lastItem);
    this.showScrollButtons = !this.#hideOverflowButtons && (this.overflowLeft || this.overflowRight);
    this.host.requestUpdate();
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
    let firstElementInView: HTMLElement | undefined;
    let lastElementOutOfView: HTMLElement | undefined;
    for (let i = 0; i < this.#items.length && !firstElementInView; i++) {
      if (isElementInView(this.#container, this.#items[i] as HTMLElement, false)) {
        firstElementInView = this.#items[i];
        lastElementOutOfView = this.#items[i - 1];
      }
    }
    if (lastElementOutOfView) {
      this.#container.scrollLeft -= lastElementOutOfView.scrollWidth;
    }
    this.#setOverflowState();
  }

  scrollRight() {
    if (!this.#container) {
      return;
    }
    let lastElementInView: HTMLElement | undefined;
    let firstElementOutOfView: HTMLElement | undefined;
    for (let i = this.#items.length - 1; i >= 0 && !lastElementInView; i--) {
      if (isElementInView(this.#container, this.#items[i] as HTMLElement, false)) {
        lastElementInView = this.#items[i];
        firstElementOutOfView = this.#items[i + 1];
      }
    }
    if (firstElementOutOfView) {
      this.#container.scrollLeft += firstElementOutOfView.scrollWidth;
    }
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
