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
  }

  getUpdateByFilter(filter = '') {
    if (filter === '' || (this.textContent || '').toLowerCase().match(filter)) {
      this.removeAttribute('hidden-by-filter');
    } else {
      this.setAttribute('hidden-by-filter', 'hidden-by-filter');
    }
    return !this.hasAttribute('hidden-by-filter');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

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

  updateSetSizeAndPosition(setSize: number | null, posInSet: number | null) {
    this.#internals.ariaSetSize = setSize !== null ? `${setSize}` : null;
    this.#internals.ariaPosInSet = posInSet !== null ? `${posInSet}` : null;
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
