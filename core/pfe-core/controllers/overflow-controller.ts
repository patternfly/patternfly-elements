import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

export class OverflowController implements ReactiveController {
  /** Overflow container */
  #container?: HTMLElement;
  /** Children that can overflow */
  #items: HTMLElement[] = [];

  #scrollTimeoutDelay = 0;
  #scrollTimeout?: ReturnType<typeof setTimeout>;

  /** Default state */
  showScrollButtons = false;
  overflowLeft = false;
  overflowRight = false;

  /** override to prevent scroll buttons from showing */
  protected get canShowScrollButtons() {
    return true;
  }

  get firstItem(): HTMLElement | undefined {
    return this.#items[0];
  }

  get lastItem(): HTMLElement | undefined {
    return this.#items.at(-1);
  }

  constructor(public host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this);
  }

  #setOverflowState(): void {
    const { canShowScrollButtons } = this;
    if (!this.firstItem || !this.lastItem || !this.#container) {
      return;
    }
    this.overflowLeft = canShowScrollButtons && !isElementInView(this.#container, this.firstItem);
    this.overflowRight = canShowScrollButtons && !isElementInView(this.#container, this.lastItem);
    this.showScrollButtons = canShowScrollButtons && (this.overflowLeft || this.overflowRight);
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

  scrollLeft(instance: OverflowController) {
    if (!instance.#container) {
      return;
    }
    let firstElementInView: HTMLElement | undefined;
    let lastElementOutOfView: HTMLElement | undefined;
    for (let i = 0; i < instance.#items.length && !firstElementInView; i++) {
      if (isElementInView(instance.#container, instance.#items[i] as HTMLElement, false)) {
        firstElementInView = instance.#items[i];
        lastElementOutOfView = instance.#items[i - 1];
      }
    }
    if (lastElementOutOfView) {
      instance.#container.scrollLeft -= lastElementOutOfView.scrollWidth;
    }
    this.#setOverflowState();
  }

  scrollRight(instance: OverflowController) {
    if (!instance.#container) {
      return;
    }
    let lastElementInView: HTMLElement | undefined;
    let firstElementOutOfView: HTMLElement | undefined;
    for (let i = instance.#items.length - 1; i >= 0 && !lastElementInView; i--) {
      if (isElementInView(instance.#container, instance.#items[i] as HTMLElement, false)) {
        lastElementInView = instance.#items[i];
        firstElementOutOfView = instance.#items[i + 1];
      }
    }
    if (firstElementOutOfView) {
      instance.#container.scrollLeft += firstElementOutOfView.scrollWidth;
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
