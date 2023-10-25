import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { PfDropdownItem } from './pf-dropdown-item.js';
import styles from './pf-dropdown-group.css';

/**
 * Represents a group of items for a dropdown component.
 * @slot
 *     Content for the group of dropdown items
 */
@customElement('pf-dropdown-group')
export class PfDropdownGroup extends LitElement {
  static readonly styles = [styles];
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * The label for the group of dropdown items.
   */
  @property({ reflect: true }) label?: string;
  @queryAssignedElements({ selector: 'pf-dropdown-item' }) dropdownItems!: Array<PfDropdownItem>;

  get menuItems() {
    return this.dropdownItems.map(el => el.menuItem);
  }

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
