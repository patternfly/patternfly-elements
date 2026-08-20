import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-helper-text.css';

export type HelperTextVariant =
  | 'default'
  | 'indeterminate'
  | 'warning'
  | 'success'
  | 'error';

/**
 * Provides contextual feedback for form fields. Authors must supply
 * text content and should set `variant` for visual status. When items
 * update dynamically, authors should wrap them in a container with
 * `aria-live="polite"`. Authors should avoid using without an associated
 * form field.
 *
 * @summary Contextual help or validation message for form fields.
 *
 * @fires {Event} slotchange - Fires when the default or icon slot content changes. The event target is the `<slot>` element whose assigned nodes changed. No custom detail.
 */
@customElement('pf-v6-helper-text')
export class PfV6HelperText extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Status variant controlling color, font weight, and default icon.
   */
  @property({ reflect: true }) variant: HelperTextVariant = 'default';

  /**
   * Marks this item as dynamically shown/hidden, enabling the "dynamic"
   * styling modifier (e.g. icon color changes in dynamic context).
   */
  @property({ type: Boolean, reflect: true }) dynamic = false;

  /**
   * Accessible label appended to the visible text for assistive technologies,
   * providing status context that sighted users receive from the variant icon.
   * Defaults to "${variant} status" for non-default variants.
   */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  #slots = new SlotController(this, 'icon', null);

  /** Resolves the accessible label for the current variant and its icon.
   *  Uses the author-provided `accessible-label` if set, otherwise
   *  generates "${variant} status" for non-default variants. */
  get #variantStatusLabel(): string | undefined {
    if (this.accessibleLabel !== undefined) {
      return this.accessibleLabel;
    }
    if (this.variant !== 'default') {
      return `${this.variant} status`;
    }
    return undefined;
  }

  /** Whether to render the icon area */
  get #showIcon(): boolean {
    return this.#slots.hasSlotted('icon') || this.variant !== 'default';
  }

  override render(): TemplateResult<1> {
    const srText = this.#variantStatusLabel;
    return html`
      <!-- summary: Icon container
           description: Displays the status icon (default or custom). -->
      <span id="icon"
            part="icon"
            ?hidden="${!this.#showIcon}"
            aria-hidden="true">
        <!-- summary: Custom status icon
             description: Inline SVG or image element to replace the default variant icon. -->
        <slot name="icon">${this.#renderDefaultIcon()}</slot>
      </span>
      <!-- summary: Text container
           description: Wraps the helper text content and screen reader announcement. -->
      <span id="text" part="text">
        <!-- summary: Validation or contextual message text
             description: |
               Inline text or phrasing content describing validation state
               or field guidance. Must contain meaningful text content. -->
        <slot></slot>${!srText ? '' : html`<span class="sr-only">: ${srText};</span>`}
      </span>
    `;
  }

  // TODO: when pf-v6-icon exists, replace inline SVGs with <pf-v6-icon>
  // and add an `icon` @property to complete the attr/slot pair
  #renderDefaultIcon(): TemplateResult<1> | string {
    if (this.variant === 'default') {
      return '';
    }
    switch (this.variant) {
      case 'indeterminate':
        return html`<svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M29 17H3a1 1 0 0 1 0-2h26a1 1 0 0 1 0 2Z"/></svg>`;
      case 'warning':
        return html`<svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="m31.874 28.514-15.011-27a1.001 1.001 0 0 0-1.748 0l-15.011 27A1 1 0 0 0 .978 30H31a1 1 0 0 0 .874-1.486ZM14.5 12a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5ZM16 26.001a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 26.001Z"/></svg>`;
      case 'success':
        return html`<svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 1C7.729 1 1 7.729 1 16s6.729 15 15 15 15-6.729 15-15S24.271 1 16 1Zm7.795 11.795-8.646 8.646c-.317.317-.733.475-1.149.475s-.832-.158-1.149-.475l-4.646-4.646a1.126 1.126 0 0 1 1.591-1.591l4.205 4.205 8.205-8.205a1.126 1.126 0 0 1 1.591 1.591Z"/></svg>`;
      case 'error':
        return html`<svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 1C7.729 1 1 7.729 1 16s6.729 15 15 15 15-6.729 15-15S24.271 1 16 1Zm-1.5 8a1.5 1.5 0 1 1 3 0v7a1.5 1.5 0 1 1-3 0V9ZM16 25.001a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 25.001Z"/></svg>`;
      default:
        return '';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-helper-text': PfV6HelperText;
  }
}
