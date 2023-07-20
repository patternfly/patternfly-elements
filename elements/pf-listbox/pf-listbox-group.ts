import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { PfListboxOption } from './pf-listbox-option.js';

import styles from './pf-listbox-group.css';

export type PfListboxGroupOrOption = PfListboxGroup | PfListboxOption;

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

  @queryAssignedElements() private _options!: PfListboxOption[];

  render() {
    return html`
      <slot name="group-heading" role="presentation"></slot>
      <slot @slotchange="${this.#onSlotchange}"></slot>
    `;
  }

  get options() {
    return this._options;
  }

  #onSlotchange() {
    this.dispatchEvent(new Event('slotchange', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox-group': PfListboxGroup;
  }
}
