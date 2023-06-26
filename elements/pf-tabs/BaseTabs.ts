import { LitElement, html } from 'lit';

import { property } from 'lit/decorators/property.js';

import { classMap } from 'lit/directives/class-map.js';

import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { TabsController } from './TabsController.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './BaseTabs.css';

/**
 * BaseTabs
 *
 * @attr [label-scroll-left="Scroll left"] - accessible label for the tab panel's scroll left button.
 * @attr [label-scroll-right="Scroll right"] - accessible label for the tab panel's scroll right button.
 *
 */
export abstract class BaseTabs extends LitElement {
  static readonly styles = [styles];

  /** Time in milliseconds to debounce between scroll events and updating scroll button state */
  protected static readonly scrollTimeoutDelay: number = 0;

  /** Icon name to use for the scroll left button */
  protected static readonly scrollIconLeft: string = 'angle-left';

  /** Icon name to use for the scroll right button */
  protected static readonly scrollIconRight: string = 'angle-right';

  /** Icon set to use for the scroll buttons */
  protected static readonly scrollIconSet: string = 'fas';

  /**
   * Tab activation
   * Tabs can be either [automatic](https://w3c.github.io/aria-practices/examples/tabs/tabs-automatic.html) activated
   * or [manual](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html)
   */
  @property({ reflect: true, type: Boolean }) manual = false;

  #tabs = new TabsController(this);

  #overflow = new OverflowController(this);

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
  }

  updated() {
    const tabsList = this.shadowRoot?.getElementById('tabs');
    if (tabsList) {
      this.#overflow.init(tabsList, this.#tabs.tabs);
    }
  }

  override render() {
    const { scrollIconSet, scrollIconLeft, scrollIconRight } = this.constructor as typeof BaseTabs;
    return html`
      <div part="container" class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-icon icon="${scrollIconLeft}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
          <slot id="tabs"
                name="tab"
                part="tabs"
                role="tablist"
                @scroll="${this.#overflow.onScroll}"></slot> ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight}">
            <pf-icon icon="${scrollIconRight}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
        </div>
        <slot part="panels"></slot>
      </div>
    `;
  }

  #scrollLeft() {
    this.#overflow.scrollLeft();
  }

  #scrollRight() {
    this.#overflow.scrollRight();
  }
}
