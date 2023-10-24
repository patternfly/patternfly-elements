import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-select-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-select-group')
export class PfSelectGroup extends LitElement {
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
    'pf-select-group': PfSelectGroup;
  }
}
