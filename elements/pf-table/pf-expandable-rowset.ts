import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-expandable-rowset.css';

import { ExpandChangeEvent, PfExpandableRow, PfTbody } from '@patternfly/elements/pf-table/pf-table.js';

/**
 * Expandable rowset
 * @slot - Place element content here
 */
@customElement('pf-expandable-rowset')
export class PfExpandableRowset extends PfTbody {
  static readonly styles = [...PfTbody.styles, styles];

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

  #onChange(event: ExpandChangeEvent) {
    const { expanded } = event;

    const expandableRow = Array.from(this.children)?.[1] as PfExpandableRow;

    if (expandableRow) {
      expandableRow.expanded = expanded;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-expandable-rowset': PfExpandableRowset;
  }
}
