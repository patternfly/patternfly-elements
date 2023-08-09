import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ComposedEvent } from '@patternfly/pfe-core';

import styles from './pf-expandable-rowset.css';

import { PfTbody, type PfTr } from '@patternfly/elements/pf-table/pf-table.js';

export class ExpandChangeEvent extends ComposedEvent {
  constructor(public expanded: boolean) {
    super('change');
  }
}

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
      <pf-td id="toggle-cell">
        <pf-button id="toggle-button"
                   aria-expanded=${this.expanded}
                   plain
                   @click=${this.#onClick}>
          <pf-icon id="toggle-icon"
                   icon="angle-right"
                   size="md"></pf-icon>
        </pf-button>
      </pf-td>
      <slot></slot>
    `;
  }

  #onChange(event: ExpandChangeEvent) {
    const { expanded } = event;
    this.expanded = expanded;

    const expandableRow = this.querySelector<PfTr>('pf-tr[expandable]');
    if (expandableRow) {
      expandableRow.expanded = expanded;
    }

    event.stopPropagation();
  }

  #onClick() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new ExpandChangeEvent(this.expanded));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-expandable-rowset': PfExpandableRowset;
  }
}
