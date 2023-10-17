import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-back-to-top.css';

/**
 * The **back to top** component is a shortcut that allows users to quickly navigate to the top of a lengthy content page.
 * @summary A shortcut that allows users to quickly navigate to the top of a lengthy content page.
 *
 * @csspart trigger - The `<a>` or `<pf-button>` element
 *
 * @slot icon
 *       Contains the prefix icon to display before the link or button.
 * @slot
 *       Text to display inside the link or button.
 *
 * @cssprop {<length>} --pf-c-back-to-top--Right {@default `3rem``}
 * @cssprop {<length>} --pf-c-back-to-top--Bottom {@default `1.5rem``}
 * @cssprop --pf-c-back-to-top--c-button--BoxShadow {@default `0 0.75rem 0.75rem -0.5rem rgba(3, 3, 3, 0.18)`}
 * @cssprop {<length>} --pf-c-button--FontSize {@default `0.75rem`}
 * @cssprop {<length>|<percentage>}  --pf-c-button--BorderRadius {@default `30em`}
 * @cssprop {<length>} --pf-c-button--PaddingTop {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-button--PaddingRight {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-button--PaddingBottom {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-button--PaddingLeft {@default `0.5rem`}
 * @cssprop {<color>} --pf-c-button--m-primary--Color {@default `#fff`}
 * @cssprop {<color>} --pf-c-button--m-primary--BackgroundColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-button__icon--m-end--MarginLeft {@default `0.25rem`}
 *
 */
@customElement('pf-back-to-top')
export class PfBackToTop extends LitElement {
  static readonly styles = [styles];

  /** Shorthand for the `icon` slot, the value is icon name */
  @property({ reflect: true }) icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Flag to always show back to top button, defaults to false. */
  @property({ reflect: true, type: Boolean, attribute: 'always-visible' }) alwaysVisible = false;

  /** Element selector to spy on for scrolling. Not passing a selector defaults to spying on window scroll events */
  @property({ reflect: true, attribute: 'scrollable-selector' }) scrollableSelector?: string;

  /** Distance from the top of the scrollable element to trigger the visibility of the back to top button */
  @property({ reflect: true, type: Number, attribute: 'scroll-distance' }) scrollDistance = 400;

  /** Page fragment link to target element, must include hash ex: #top */
  @property({ reflect: true }) href?: string;

  #scrollSpy = false;

  #visible = false;

  #scrollElement?: Element | Window;

  #logger = new Logger(this);

  get #rootNode(): Document | ShadowRoot {
    const root = this.getRootNode();
    if (root instanceof Document || root instanceof ShadowRoot) {
      return root;
    } else {
      return document;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback?.();
    this.#toggleVisibility();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.#removeScrollListener();
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('scrollableSelector')) {
      this.#addScrollListener();
    }
  }

  render() {
    const visuallyHiddenClass = { 'visually-hidden': !this.#visible };

    // ensure href has a hash
    if (this.href && !this.href.includes('#')) {
      this.href = `#${this.href}`;
      this.#logger.warn(`missing hash in href fragment link`);
    }

    if (this.href) {
      return html`
        <a href="${this.href}" class="${classMap(visuallyHiddenClass)}" part="trigger">
          <slot name="icon"></slot>
          <slot>${ifDefined(this.title)}</slot>
          <span>
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
          </span>
        </a>
      `;
    } else {
      return html`
        <pf-button icon="${ifDefined(this.icon)}" icon-set="${ifDefined(this.iconSet)}" class="${classMap(visuallyHiddenClass)}" part="trigger">
          <slot name="icon" slot="icon"></slot>
          <slot>${ifDefined(this.title)}</slot>
          <span>
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
          </span>
        </pf-button>
      `;
    }
  }

  #removeScrollListener() {
    this.#scrollElement?.removeEventListener('scroll', this.#toggleVisibility);
  }

  #addScrollListener() {
    this.#removeScrollListener();

    this.#scrollSpy = !!this.scrollableSelector;
    if (this.scrollableSelector?.trim() === '') {
      this.#logger.error(`scrollable-selector attribute cannot be empty`);
      return;
    }

    if (this.#scrollSpy && !!this.scrollableSelector) {
      const scrollableElement = this.#rootNode.querySelector(this.scrollableSelector);
      if (!scrollableElement) {
        this.#logger.error(`unable to find element with selector ${this.scrollableSelector}`);
        return;
      }
      this.#scrollElement = scrollableElement;
    } else {
      this.#scrollElement = window;
    }

    this.#scrollElement.addEventListener('scroll', this.#toggleVisibility, { passive: true });
    this.#toggleVisibility();
  }

  #toggleVisibility = () => {
    if (this.alwaysVisible) {
      this.#visible = this.alwaysVisible;
      return;
    }
    const previousVisibility = this.#visible;
    if (this.#scrollElement) {
      const scrolled =
          (this.#scrollElement instanceof Window) ?
          this.#scrollElement.scrollY
        : this.#scrollElement.scrollTop;
      this.#visible = (scrolled > this.scrollDistance);
      if (previousVisibility !== this.#visible) {
        this.requestUpdate();
      }
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-back-to-top': PfBackToTop;
  }
}
