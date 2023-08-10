import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-simple-list-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-simple-list-group')
export class PfSimpleListGroup extends LitElement {
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
    'pf-simple-list-group': PfSimpleListGroup;
  }
}
