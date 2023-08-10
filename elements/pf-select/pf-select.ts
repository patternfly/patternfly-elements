import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import './pf-select-listbox.js';

import styles from './pf-select.css';

/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot name="trigger"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
