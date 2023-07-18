import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { PfListboxOption } from './pf-listbox-option.js';
import { PfListboxGroup } from './pf-listbox-group.js';

import styles from './pf-listbox.css';

/**
 * List of selectable items
 * @slot - Place element content here
 */
@customElement('pf-listbox')
export class PfListbox extends LitElement {
  static readonly styles = [styles];

  static isOption(element: PfListboxOption): element is PfListboxOption {
    return element instanceof PfListboxOption;
  }

  @queryAssignedElements() private options!: PfListboxOption[];

  #internals = new InternalsController(this, {
    role: 'listbox'
  });

  #_allOptions: PfListboxOption[] = [];

  get isVertical(): boolean {
    return this?.getAttribute('aria-orientatiom') === 'vertical';
  }

  get isMultiselectable(): boolean {
    return this?.getAttribute('aria-multiselectable') === 'true';
  }

  get #allOptions() {
    return this.#_allOptions;
  }

  set #allOptions(options: PfListboxOption[]) {
    this.#_allOptions = options.filter(options => (this.constructor as typeof PfListbox).isOption(options));
  }

  #onSlotchange() {
    this.#_allOptions = this.options;
  }

  #updateActiveDescendant(idRef: string | null) {
    this.#internals.ariaActivedescendant = idRef;
  }

  render() {
    return html`
      <slot @slotchange="${this.#onSlotchange}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
