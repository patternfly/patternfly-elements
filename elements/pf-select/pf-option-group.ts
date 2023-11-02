import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-option-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-option-group')
export class PfOptionGroup extends LitElement {
  static readonly styles = [styles];

  /**
   * whether group is disabled
   */
  @property({ type: Boolean }) disabled = false;

  #internals = new InternalsController(this, { role: 'group' });

  render() {
    const disabled = this.disabled ? 'disabled' : '';
    return html`
      <slot class="${disabled}" name="label" role="presentation"></slot>
      <slot class="${disabled}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-option-group': PfOptionGroup;
  }
}
