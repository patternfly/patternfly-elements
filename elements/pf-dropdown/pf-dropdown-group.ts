import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

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
   * Disable the dropdown
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The label for the group of dropdown items.
   */
  @property({ reflect: true }) label?: string;


  #internals = InternalsController.of(this, { });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this.#onMenuitemFocusin);
    this.addEventListener('click', this.#onMenuitemClick);
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('disabled')) {
      this.#internals.ariaDisabled = `${!!this.disabled}`;
    }
  }

  render() {
    return html`
      <p ?hidden="${!this.label}" role="presentation">${this.label}</p>
      <slot></slot>
    `;
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   */
  #onMenuitemFocusin(event: FocusEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * handles clicking on a menuitem:
   * which selects an item by default
   * or toggles selection if multiselectable
   */
  #onMenuitemClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-group': PfDropdownGroup;
  }
}
