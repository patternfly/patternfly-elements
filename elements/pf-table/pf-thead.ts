import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-thead.css';

/**
 * Table head
 * @slot - Place element content here
 */
@customElement('pf-thead')
export class PfThead extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'rowgroup';

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-thead': PfThead;
  }
}
