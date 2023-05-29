import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-item.css';

/**
 * Represents an item for a dropdown component.
 * @slot
 *      Content for the dropdown item
 *
 * @csspart dropdown-item - Dropdown item element
 *
 * @cssprop {<length>} --pf-c-dropdown__menu-item--FontSize
 *          Dropdown item font size
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--FontWeight
 *          Dropdown item font weight
 *          {@default `400`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--LineHeight
 *          Dropdown item line height
 *          {@default `1.5`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--Color
 *          Dropdown item color
 *          {@default `#151515`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--BackgroundColor
 *          Dropdown item background color
 *          {@default `transparent`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--PaddingTop
 *          Dropdown item padding top
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--PaddingRight
 *          Dropdown item padding right
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--PaddingBottom
 *          Dropdown item padding bottom
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-dropdown__menu-item--PaddingLeft
 *          Dropdown item padding left
 *          {@default `1rem`}
 */
@customElement('pf-dropdown-item')
export class PfDropdownItem extends LitElement {
  static readonly styles = [styles];

  /**
   * The value associated with the dropdown item.
   * This value can be used to identify the selected item
  */
  @property({ reflect: true }) value?: string;

  /**
   * Indicates whether the dropdown item is a divider.
   * A divider visually separates groups of dropdown items.
   */
  @property({ type: Boolean, reflect: true }) divider = false;

  /**
   * Indicates whether the dropdown item is disabled.
   * A disabled item cannot be selected or interacted with.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <li tabindex="-1" part="dropdown-item" ?disabled="${this.disabled}">
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
