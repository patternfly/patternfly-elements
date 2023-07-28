import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-listbox-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-listbox-group')
export class PfListboxGroup extends LitElement {
  static readonly styles = [styles];

  #internals = new InternalsController(this, {
    role: 'group'
  });

  override connectedCallback() {
    this.#internals;
  }

  render() {
    return html`
      <slot name="group-heading" role="presentation"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox-group': PfListboxGroup;
  }
}
