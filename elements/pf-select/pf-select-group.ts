import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-select-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-select-group')
export class PfSelectGroup extends LitElement {
  static readonly styles = [styles];

  #internals = new InternalsController(this, {
    role: 'group'
  });

  override connectedCallback() {
    super.connectedCallback();
    this.#internals;
  }

  render() {
    return html`
      <slot name="label" role="presentation"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-group': PfSelectGroup;
  }
}
