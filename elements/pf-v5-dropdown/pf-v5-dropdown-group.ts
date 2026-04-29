import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-v5-dropdown-group.css';

/**
 * Represents a group of items for a dropdown component.
 * @slot
 *     Content for the group of dropdown items
 */
@customElement('pf-v5-dropdown-group')
export class PfV5DropdownGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * The label for the group of dropdown items.
   */
  @property({ reflect: true }) label?: string;

  render(): TemplateResult<1> {
    return html`
      <p ?hidden="${!this.label}" role="presentation">${this.label}</p>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-dropdown-group': PfV5DropdownGroup;
  }
}
