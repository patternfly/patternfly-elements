import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
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

  #internals = new InternalsController(this, {
    role: 'listbox'
  });

  get isVertical(): boolean {
    return this?.getAttribute('aria-orientatiom') === 'vertical';
  }

  get isMultiselectable(): boolean {
    return this?.getAttribute('aria-multiselectable') === 'true';
  }

  #updateActiveDescendant(idRef: string | null) {
    this.#internals.ariaActivedescendant = idRef;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
