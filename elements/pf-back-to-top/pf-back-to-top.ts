import { LitElement, html, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-back-to-top.css';

/**
 * The **back to top** component is a shortcut that allows users to quickly navigate to the top of a lengthy content page.
 * @summary A shortcut that allows users to quickly navigate to the top of a lengthy content page.
 * @csspart trigger - The `<a>` or `<pf-button>` element
 * @slot icon
 *       Contains the prefix icon to display before the link or button.
 * @slot
 *       Text to display inside the link or button.
 * @cssprop {<length>} [--pf-c-back-to-top--Right=3rem`]
 * @cssprop {<length>} [--pf-c-back-to-top--Bottom=1.5rem`]
 * @cssprop [--pf-c-back-to-top--c-button--BoxShadow=0 0.75rem 0.75rem -0.5rem rgba(3, 3, 3, 0.18)]
 * @cssprop {<length>} [--pf-c-button--FontSize=0.75rem]
 * @cssprop {<length>|<percentage>}  [--pf-c-button--BorderRadius=30em]
 * @cssprop {<length>} [--pf-c-button--PaddingTop=0.25rem]
 * @cssprop {<length>} [--pf-c-button--PaddingRight=0.5rem]
 * @cssprop {<length>} [--pf-c-button--PaddingBottom=0.25rem]
 * @cssprop {<length>} [--pf-c-button--PaddingLeft=0.5rem]
 * @cssprop {<color>} [--pf-c-button--m-primary--Color=#fff]
 * @cssprop {<color>} [--pf-c-button--m-primary--BackgroundColor=#06c]
 * @cssprop {<length>} [--pf-c-button__icon--m-end--MarginLeft=0.25rem]
 */
@customElement('pf-back-to-top')
export class PfBackToTop extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Shorthand for the `icon` slot, the value is icon name */
  @property({ reflect: true }) icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Flag to always show back to top button, defaults to false. */
  @property({ reflect: true, type: Boolean, attribute: 'always-visible' }) alwaysVisible = false;

  /** Element selector to spy on for scrolling. Not passing a selector defaults to spying on window scroll events */
  @property({ reflect: true, attribute: 'scrollable-selector' }) scrollableSelector?: string;

  /** Distance from the top of the scrollable element to trigger the visibility of the back to top button */
  @property({ type: Number, attribute: 'scroll-distance' }) scrollDistance = 400;

  /** Accessible name for the back-to-top link, use when component does not have slotted text */
  @property() label?: string;

  /** Page fragment link to target element, must include hash ex: #top */
  @property({ reflect: true }) href?: string;

  #scrollSpy = false;

  #visible = false;

  #scrollElement?: Element | Window;

  #hasSlottedText = false;

  #logger = new Logger(this);

  get #rootNode(): Document | ShadowRoot | null {
    let root = null;
    if (isServer) {
      return null;
    } else if ((root = this.getRootNode()) instanceof Document || root instanceof ShadowRoot) {
      return root;
    } else {
      return document;
    }
  }

  get #ariaLabel(): string | undefined {
    if (this.#hasSlottedText) {
      return undefined;
    }
    return this.label ?? 'Back to top';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.#addScrollListener();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeScrollListener();
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('scrollableSelector')) {
      this.#addScrollListener();
    }
    if (changed.has('alwaysVisible')) {
      this.#toggleVisibility();
    }
  }

  render(): TemplateResult<1> {
    // ensure href has a hash
    if (this.href && this.href.charAt(0) !== '#') {
      this.href = `#${this.href}`;
      this.#logger.warn(`missing hash in href fragment link`);
    }

    if (this.href) {
      return html`
        <a href="${this.href}" ?hidden="${!this.#visible}" part="trigger" aria-label="${ifDefined(this.#ariaLabel)}">
          <slot name="icon"></slot>
          <slot @slotchange="${this.#onSlotchange}"></slot>
          <pf-icon icon="angle-up" set="fas"></pf-icon>
        </a>
      `;
    } else {
      return html`
        <pf-button
            icon="${ifDefined(this.icon)}"
            icon-set="${ifDefined(this.iconSet)}"
            ?hidden="${!this.#visible}"
            tabindex="${this.#visible ? '0' : '-1'}"
            part="trigger"
            label="${ifDefined(this.#ariaLabel)}"
          >
          <slot name="icon" slot="icon"></slot>
          <span>
            <slot></slot>
            <pf-icon icon="angle-up" set="fas"></pf-icon>
          </span>
        </pf-button>
      `;
    }
  }

  #onSlotchange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    this.#hasSlottedText = nodes.length > 0 ? true : false;
    this.requestUpdate();
  }

  #removeScrollListener() {
    this.#scrollElement?.removeEventListener('scroll', this.#toggleVisibility);
  }

  #addScrollListener() {
    this.#removeScrollListener();

    if (this.scrollableSelector?.trim() === '') {
      this.#logger.error(`scrollable-selector attribute cannot be empty`);
      return;
    }

    this.#scrollSpy = !!this.scrollableSelector;
    if (this.#scrollSpy && this.scrollableSelector) {
      const scrollableElement = this.#rootNode?.querySelector?.(this.scrollableSelector);
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
      this.#visible = true;
      this.requestUpdate();
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
