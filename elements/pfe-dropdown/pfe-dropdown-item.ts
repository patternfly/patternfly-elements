import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-dropdown-item.scss';

@customElement('pfe-dropdown-item') @pfelement()
export class PfeDropdownItem extends LitElement {
  static readonly styles = [style];

  /** Use 'delegatesFocus' to forward focus to the first pfe-dropdown-item when this container is clicked or focused. */
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * This is an optional attribute string that you should provide to indicate the type of dropdown item. This drives the appropriate assignment of accessibility attributes for each type of item.
   * - `link` : an HTML link
   * - `action` : a button that triggers some sort of action
   * - `separator` : a visual separator for items in the list
   */
  @observed @property({ reflect: true, attribute: 'item-type' })
    itemType?: 'link'|'action'|'separator';

  /** Disabled item */
  @observed @property({ type: Boolean, reflect: true })
    disabled = false;

  @state() containerRole?: 'none'|'menuitem'|'separator';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._clickHandler);
  }

  render() {
    return html`
      <li class="pfe-dropdown-item__container" role="${ifDefined(this.containerRole)}">
        <slot></slot>
      </li>
    `;
  }

  protected _itemTypeChanged() {
    const type = this.itemType;
    if (type) {
      switch (type) {
        case 'link':
          this.containerRole = 'none';
          this.firstElementChild?.setAttribute('role', 'menuitem');
          break;
        case 'action':
          this.containerRole = 'menuitem';
          this.firstElementChild?.removeAttribute('role');
          break;
        case 'separator':
          this.containerRole = 'separator';
          break;
      }
    }
  }

  protected _disabledChanged() {
    const isDisabled = this.disabled;
    this.setAttribute('aria-disabled', String(this.disabled));
    // TODO: Deprecate - bp
    this.toggleAttribute('is_disabled', this.disabled);
    if (isDisabled) {
      this.removeAttribute('tabindex');
    } else {
      this.setAttribute('tabindex', '0');
    }
  }

  protected _clickHandler() {
    // Forward all click events to the elements in the lightdom.
    // This fixes <a> tags from not being selected with keyboard events.
    this.firstElementChild?.click();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-dropdown-item': PfeDropdownItem;
  }
}
