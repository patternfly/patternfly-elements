import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-chip.css';
import shared from './pf-chip-shared.css';

export class PfChipRemoveEvent extends Event {
  constructor(public chip: PfChip) {
    super('remove', { bubbles: true });
  }
}

/**
 * A **chip** is used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.
 * @fires {ChipRemoveEvent} remove - Fires when chip is removed
 * @fires {Event} click - when close button is clicked
 * @slot
 *      chip text
 * @csspart text - container for chip text
 */
@customElement('pf-chip')
export class PfChip extends LitElement {
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
        <span part="text">
          <slot></slot>
        </span>
      </button>
    ` : html`
      <div id="outer">
        <span id="chip-text" part="text">
          <slot></slot>
        </span>
        <pf-button id="close-button"
                plain
                icon="close" icon-set="patternfly"
                label="${this.accessibleCloseLabel}"
                aria-describedby="chip-text"
                ?hidden="${this.readonly || this.overflowChip}"
                @click="${this.#onClick}"></pf-button>
      </div>
    `;
  }

  #onClick() {
    if (this.dispatchEvent(new PfChipRemoveEvent(this))) {
      this.remove();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip': PfChip;
  }
}
