import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import '@patternfly/elements/pf-v5-button/pf-v5-button.js';

import styles from './pf-v5-chip.css';
import shared from './pf-v5-chip-shared.css';

export class PfV5ChipRemoveEvent extends Event {
  constructor(public chip: PfV5Chip) {
    super('remove', { bubbles: true });
  }
}

/**
 * A **chip** is used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.
 * @alias Chip
 * @fires {ChipRemoveEvent} remove - Fires when chip is removed
 * @fires {Event} click - when close button is clicked
 */
@customElement('pf-v5-chip')
export class PfV5Chip extends LitElement {
  static readonly styles: CSSStyleSheet[] = [shared, styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Accessible label for close button
   */
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';

  /**
   * Flag indicating if chip is read-only and cannot be removed
   */
  @property({ reflect: true, type: Boolean }) readonly = false;

  /**
   * Flag indicating if chip is read-only and cannot be removed
   */
  @property({ attribute: 'overflow-chip', reflect: true, type: Boolean }) overflowChip = false;

  render(): TemplateResult<1> {
    return this.overflowChip ? html`
      <button id="outer">
        <!-- container for chip text -->
        <span part="text">
          <!-- chip text -->
          <slot></slot>
        </span>
      </button>
    ` : html`
      <div id="outer">
        <!-- container for chip text -->
        <span id="chip-text" part="text">
          <!-- chip text -->
          <slot></slot>
        </span>
        <pf-v5-button id="close-button"
                plain
                icon="close" icon-set="patternfly"
                label="${this.accessibleCloseLabel}"
                aria-describedby="chip-text"
                ?hidden="${this.readonly || this.overflowChip}"
                @click="${this.#onClick}"></pf-v5-button>
      </div>
    `;
  }

  #onClick() {
    if (this.dispatchEvent(new PfV5ChipRemoveEvent(this))) {
      this.remove();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-chip': PfV5Chip;
  }
}
