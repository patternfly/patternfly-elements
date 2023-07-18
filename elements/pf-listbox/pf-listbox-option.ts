import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-listbox-option.css';

/**
 * Option within a listbox
 * @slot - Place element content here
 */
@customElement('pf-listbox-option')
export class PfListboxOption extends LitElement {
  static readonly styles = [styles];

  #internals = new InternalsController(this, {
    role: 'option'
  });

  updateSet(setSize?: number | null, posInSet?: number | null) {
    if (!setSize || !posInSet) {
      this.#internals.ariaSetSize = null;
      this.#internals.ariaPosInSet = null;
    } else {
      const parsedSize = Math.max(-1, setSize);
      this.#internals.ariaSetSize = `${parsedSize}`;
      this.#internals.ariaPosInSet = `${Math.min(Math.max(1, posInSet), parsedSize)}`;
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox-option': PfListboxOption;
  }
}
