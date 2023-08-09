import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-td.css';

/**
 * Table data cell
 * @slot - Place element content here
 */
@customElement('pf-td')
export class PfTd extends LitElement {
  static readonly styles = [styles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'cell');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-td': PfTd;
  }
}
