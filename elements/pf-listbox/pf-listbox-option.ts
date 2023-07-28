import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

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

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.#onFocus);
    this.addEventListener('blur', this.#onBlur);
    this.id = this.id || getRandomId();
    this.#internals;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  #onFocus() {
    this.dispatchEvent(new Event('optionfocus', { bubbles: true }));
  }

  #onBlur() {
    this.dispatchEvent(new Event('optionblur', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox-option': PfListboxOption;
  }
}
