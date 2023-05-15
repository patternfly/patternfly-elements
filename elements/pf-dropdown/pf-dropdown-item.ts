import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-item.css';

/**
 * Dropdown item
 * @slot - Place element content here
 */
@customElement('pf-dropdown-item')
export class PfDropdownItem extends LitElement {
  static readonly styles = [styles];

  /**
   *
  */
  @property({ reflect: true }) value?: string;

  /**
   *
   */
  @property({ type: Boolean, reflect: true }) divider = false;

  /**
   *
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <li tabindex="-1" class="dropdown-item" ?disabled="${this.disabled}">
        <slot></slot>
        <hr role="presentation" ?hidden="${!this.divider}">
      </li>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-item': PfDropdownItem;
  }
}
