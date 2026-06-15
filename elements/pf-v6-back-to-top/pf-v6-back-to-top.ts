import { LitElement, html, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import styles from './pf-v6-back-to-top.css';

const caretUpIcon = html`<svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" width="1em" height="1em"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>`;

/**
 * Shortcut to navigate to the top of a lengthy content page.
 *
 * Focusable via Tab, activated via Enter or Space. Provides an ARIA
 * label for screen readers. Users SHOULD set `accessible-label` when
 * no text is slotted. MUST be inside a positioned container.
 *
 * With `href`, renders as a link; without, a button that scrolls
 * via JS. Respects `prefers-reduced-motion`.
 *
 * @summary Shortcut to navigate to the top of a lengthy content page.
 *
 * @slot - Visible label text for the trigger. Slotted text replaces the default ARIA label, so it MUST be descriptive for screen reader users.
 */
@customElement('pf-v6-back-to-top')
export class PfV6BackToTop extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Flag to always show the back to top button. */
  @property({ reflect: true, type: Boolean, attribute: 'always-visible' }) alwaysVisible = false;

  /** Element selector to spy on for scrolling. Not passing a selector defaults to spying on window scroll events. */
  @property({ reflect: true, attribute: 'scrollable-selector' }) scrollableSelector?: string;

  /** Accessible name for the trigger when there is no slotted text. */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Page fragment link to target element, e.g. `#top`. When set, renders as a link instead of a button. */
  @property({ reflect: true }) href?: string;

  #visible = false;

  #scrollElement?: Element | Window;

  #hasSlottedText = false;

  #logger = new Logger(this);

  get #rootNode(): Document | ShadowRoot | null {
    if (isServer) {
      return null;
    }
    const root = this.getRootNode();
    if (root instanceof Document || root instanceof ShadowRoot) {
      return root;
    }
    return document;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.#addScrollListener();
    }
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

  override render(): TemplateResult<1> {
    const ariaLabel = this.#hasSlottedText ? undefined : this.accessibleLabel ?? 'Back to top';
    if (this.href) {
      const normalizedHref = this.href.charAt(0) !== '#' ? `#${this.href}` : this.href;
      return html`
        <a id="trigger"
           href="${normalizedHref}"
           ?hidden="${!this.#visible}"
           tabindex="${this.#visible ? 0 : -1}"
           aria-label="${ifDefined(ariaLabel)}">
            <slot @slotchange="${this.#onSlotchange}">Back to top</slot>
          ${caretUpIcon}
        </a>
      `;
    }
    return html`
      <button id="trigger"
              ?hidden="${!this.#visible}"
              tabindex="${this.#visible ? 0 : -1}"
              aria-label="${ifDefined(ariaLabel)}"
              @click="${this.#onClick}">
        <slot @slotchange="${this.#onSlotchange}">Back to top</slot>
        ${caretUpIcon}
      </button>
    `;
  }

  #onClick() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.#scrollElement?.scrollTo({
      top: 0,
      behavior: (prefersReducedMotion ? 'instant' : 'smooth'),
    });
  }

  #onSlotchange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    this.#hasSlottedText = slot.assignedNodes().some(
      n => n.nodeType === Node.ELEMENT_NODE || !!n.textContent?.trim(),
    );
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

    if (isServer) {
      return;
    }

    if (this.scrollableSelector) {
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
      this.#visible = scrolled > 400;
      if (previousVisibility !== this.#visible) {
        this.requestUpdate();
      }
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-back-to-top': PfV6BackToTop;
  }
}
