import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-items-group.css';

/**
 * Dropdown item groups
 * @slot - Place element content here
 */
@customElement('pf-dropdown-items-group')
export class PfDropdownItemsGroup extends LitElement {
  static readonly styles = [styles];

  /**
   *
  */
  @property({ reflect: true }) label?: string;

  render() {
    return html`
      <h1>${this.label}</h1>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-items-group': PfDropdownItemsGroup;
  }
}
