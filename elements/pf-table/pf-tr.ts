import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tr.css';

/**
 * Table row
 * @slot - Place element content here
 */
@customElement('pf-tr')
export class PfTr extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'row';

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tr': PfTr;
  }
}
