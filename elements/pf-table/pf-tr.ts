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

  @property({ type: Boolean, reflect: true }) expandable = false;

  @property({ type: Boolean, reflect: true }) expanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  render() {
    return html`
      <div id="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tr': PfTr;
  }
}
