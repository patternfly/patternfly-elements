import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { query } from 'lit/decorators/query.js';
import { consume } from '@lit/context';

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
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--FontSize=1rem]
 *          Dropdown item font size
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--FontWeight=400]
 *          Dropdown item font weight
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--LineHeight=1.5]
 *          Dropdown item line height
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--Color=#151515]
 *          Dropdown item color
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--BackgroundColor=transparent]
 *          Dropdown item background color
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--PaddingTop=0.5rem]
 *          Dropdown item padding top
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--PaddingRight=1rem]
 *          Dropdown item padding right
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--PaddingBottom=0.5rem]
 *          Dropdown item padding bottom
 *
 * @cssprop {<length>} [--pf-c-dropdown__menu-item--PaddingLeft=1rem]
 *          Dropdown item padding left
 *
 */
@customElement('pf-dropdown-item')
export class PfDropdownItem extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

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

  render(): TemplateResult<1> {
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
