import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tbody.css';

import { PfTd, TdChangeEvent } from '@patternfly/elements/pf-table/pf-table.js';
import { PfTr } from '@patternfly/elements/pf-table/pf-table.js';

/**
 * Table body
 * @slot - Place element content here
 */
@customElement('pf-tbody')
export class PfTbody extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'rowgroup';

  @property({ type: Boolean, reflect: true }) expanded = false;

  constructor() {
    super();
    this.addEventListener('change', this.#onChange as EventListener);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  #onChange(event: TdChangeEvent) {
    const { expanded, target } = event;

    // Toggle expand button
    const td = target as PfTd;
    td.expanded = expanded;

    // Toggle expandable row
    const expandableRow = Array.from(this.children)[1] as PfTr;
    expandableRow.expanded = expanded;
    expandableRow.hidden = !expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tbody': PfTbody;
  }
}
