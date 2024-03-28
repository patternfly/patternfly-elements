import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { query } from 'lit/decorators/query.js';
import { consume } from '@lit/context';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import { context, type PfDropdownContext } from './context.js';

import styles from './pf-dropdown-item.css';

export class DropdownItemChange extends Event {
  constructor() {
    super('change', { bubbles: true, cancelable: true });
  }
}

/**
 * Represents an item for a dropdown component.
 * @slot icon
 *      Optional slot for an icon
 * @slot description
 *      Optional slot for item description
 * @slot -
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

  static override readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * The value associated with the dropdown item.
   * This value can be used to identify the selected item
   */
  @property({ reflect: true }) value?: string;

  /**
   * href for link dropdown items
   */
  @property({ attribute: 'href' }) href?: string;

  /**
   * Flag indicating whether the item is active
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * Indicates whether the dropdown item is disabled.
   * A disabled item cannot be selected.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Item description; overridden by `description` slot */
  @property() description?: string;

  @consume({ context, subscribe: true })
  @property({ attribute: false })
  private ctx?: PfDropdownContext;

  /** @internal */
  @query('#item') menuItem!: HTMLElement;

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('href')) {
      this.dispatchEvent(new DropdownItemChange());
    }
  }

  render() {
    const { disabled } = this.ctx ?? { disabled: false };
    const isDisabled = !!this.disabled || !!this.ctx?.disabled;
    return html`
      <div id="menuitem" role="none" class="${classMap({ disabled })}">${this.href ? html`
        <a id="item" role="menuitem" href="${this.href}" aria-disabled="${isDisabled}">
          <slot name="icon"></slot>
          <slot></slot>
        </a>
        ` : html`
        <div id="item" role="menuitem" aria-disabled="${isDisabled}">
          <slot name="icon"></slot>
          <slot></slot>
        </div>`}
        <slot id="description" name="description">${this.description ?? ''}</slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-item': PfDropdownItem;
  }
}
