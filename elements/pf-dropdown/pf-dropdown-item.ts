import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import styles from './pf-dropdown-item.css';

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
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * The value associated with the dropdown item.
   * This value can be used to identify the selected item
  */
  @property({ reflect: true }) value?: string;

  /**
   * uri for links
  */
  @property({ reflect: false, attribute: 'to' }) to?: string;

  /**
   * Flag indicating whether the item is active
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * Indicates whether the dropdown item is disabled.
   * A disabled item cannot be selected.
   */
  @property({ reflect: true, attribute: 'aria-disabled', type: String }) ariaDisabled = 'false';
  @query('a') private _link!: HTMLLinkElement;

  #internals: InternalsController;
  #id: string;

  constructor() {
    super();
    this.#internals = new InternalsController(this, {
      role: 'none'
    });
    this.#internals;
    this.#id = getRandomId();
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('to')) {
      this.dispatchEvent(new Event('menuitemchange', { bubbles: true }));
    }
  }

  render() {
    return html`
      <div id="menuitem" role="none">
        ${this.to && this.to !== '' ? html`<a id="${this.#id}" role="menuitem" href="${this.to}"><slot></slot></a>`
          : html`<div id="${this.#id}" role="menuitem"><slot></slot></div>`}
        <div id="description"><slot name="description"></slot></div>
      </div>`;
  }

  get menuItem() {
    return this.shadowRoot?.querySelector('[role="menuitem"') as HTMLElement | undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-item': PfDropdownItem;
  }
}
