import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';
import { property } from 'lit/decorators/property.js';

/**
 * Table
 * @slot - Place element content here
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'table';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
