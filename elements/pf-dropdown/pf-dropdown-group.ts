import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-group.css';

/**
 * Represents a group of items for a dropdown component.
 * @slot
 *     Content for the group of dropdown items
 */
@customElement('pf-dropdown-group')
export class PfDropdownGroup extends LitElement {
  static readonly styles = [styles];

  /**
   * The label for the group of dropdown items.
   */
  @property({ reflect: true }) label?: string;

  render() {
    return html`
      ${this.label && this.label !== '' ? html`<p role="presentation">${this.label}</p>` : ''}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-group': PfDropdownGroup;
  }
}
