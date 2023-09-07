import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-item.css';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

/**
 * Represents an item for a dropdown component.
 * @slot
 *      Content for the dropdown item
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
   * Flag indicating whether the item is active
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * Indicates whether the dropdown item is disabled.
   * A disabled item cannot be selected or interacted with.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Flag indicating if the option is selected
   */
  @property({ type: Boolean, reflect: true }) favorited = false;

  /**
   * Flag indicating if the option is selected
   */
  @property({ type: String }) icon = '';

  /**
   * Flag indicating the item has favorite icon
   */
  @property({ type: Boolean, reflect: true }) hasFavorite = false;

  #internals: InternalsController;

  constructor() {
    super();
    this.#internals = new InternalsController(this, {
      role: 'menuitem'
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.#onFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.#onFocus);
  }

  render() {
    return html`
      <div id="menuitem">
        ${this.icon && this.icon !== '' ? html`<pf-icon icon="${this.icon}"></pf-icon>` : ''}
        <slot></slot>
        <slot name="description"></slot>
      </div>`;
  }

  /**
   * handles option focus
   * @fires optionfocus
   */
  #onFocus() {
    this.dispatchEvent(new Event('dropdownitemfocus', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-item': PfDropdownItem;
  }
}
