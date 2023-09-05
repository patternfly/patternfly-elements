import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-back-to-top.css';
import { property } from 'lit/decorators/property.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

/**
 * The **back to top** component is a shortcut that allows users to quickly navigate to the top of a lengthy content page.
 * @summary A shortcut that allows users to quickly navigate to the top of a lengthy content page.
 * @slot icon
 *       Contains the button's icon or state indicator, e.g. a spinner.
 * @slot
 *       Must contain exactly one `<button>` element as the only content not assigned to a named slot.
 */
@customElement('pf-back-to-top')
export class PfBackToTop extends LitElement {
  static readonly styles = [styles];

  #scrollSpy = false;

  #scrollElement?: HTMLElement | Window;

  #logger = new Logger(this);

  /** Shorthand for the `icon` slot, the value is icon name */
  @property({ reflect: true }) icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Flag to always show back to top button, defaults to false. */
  @property({ type: Boolean, reflect: true, attribute: 'always-visible' }) alwaysVisible = false;

  /** Element selector to spy on for scrolling. Not passing a selector defaults to spying on window scroll events */
  @property({ reflect: true, attribute: 'scrollable-selector' }) scrollableSelector?: string;

  /** Distance from the top of the scrollable element to trigger the visibility of the back to top button */
  @property({ type: Number, reflect: true, attribute: 'scroll-distance' }) scrollDistance = 400;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#scrollSpy = Boolean(this.scrollableSelector);
    if (this.#scrollSpy && !!this.scrollableSelector) {
      const selector = document.querySelector(this.scrollableSelector) as HTMLElement;
      if (!selector) {
        this.#logger.warn(`Unable to find element with selector ${this.scrollableSelector}`);
        return;
      }

      this.#scrollElement = selector;
    } else {
      this.#scrollElement = window;
    }
    this.#scrollElement.addEventListener('scroll', this.#toggleVisibility.bind(this));
    this.#toggleVisibility();
  }

  render() {
    return html`
      <pf-button icon="${ifDefined(this.icon)}" icon-set="${ifDefined(this.iconSet)}">
        <slot name="icon" slot="icon"></slot>
        <slot>${ifDefined(this.title)}</slot>
        <span>
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
        </span>
      </pf-button>
    `;
  }

  #toggleVisibility() {
    if (this.#scrollElement) {
      const scrolled = (this.#scrollElement instanceof Window) ? this.#scrollElement.scrollY : this.#scrollElement.scrollTop;
      if (!this.alwaysVisible) {
        if (scrolled > this.scrollDistance) {
          this.#setVisible(true);
        } else {
          this.#setVisible(false);
        }
      }
    }
  }

  #setVisible(visible: boolean) {
    this.hidden = !visible;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-back-to-top': PfBackToTop;
  }
}
