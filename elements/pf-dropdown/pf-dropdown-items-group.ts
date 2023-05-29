import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-items-group.css';

/**
 * Represents a group of items for a dropdown component.
 * @slot
 *     Content for the group of dropdown items
 */
@customElement('pf-dropdown-items-group')
export class PfDropdownItemsGroup extends LitElement {
  static readonly styles = [styles];

  /**
   * The label for the group of dropdown items.
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
