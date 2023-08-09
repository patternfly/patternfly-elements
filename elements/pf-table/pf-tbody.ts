import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import type { PfTr } from './pf-tr.js';

import { ComposedEvent } from '@patternfly/pfe-core';

import styles from './pf-tbody.css';

export class ExpandChangeEvent extends ComposedEvent {
  constructor(public expanded: boolean) {
    super('change');
  }
}

/**
 * Table body
 * @slot - Place element content here
 */
@customElement('pf-tbody')
export class PfTbody extends LitElement {
  static readonly styles = [styles];

  @property({ type: Boolean, reflect: true }) expandable = false;

  @property({ type: Boolean, reflect: true }) expanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('expanded')) {
      this.#expandedChanged();
    }
  }

  render() {
    return [
      !this.expandable ? '' : html`
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
      `,
      html`
        <slot></slot>
      `
    ];
  }

  #expandedChanged() {
    // disallow setting `expanded` unless `expandable` is also set
    if (this.expanded && !this.expandable) {
      this.expanded = false;
    } else {
      const expandableRow = this.querySelector<PfTr>('pf-tr[expandable]');
      if (expandableRow) {
        expandableRow.expanded = this.expanded;
      }
    }
  }

  #onClick() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new ExpandChangeEvent(this.expanded));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tbody': PfTbody;
  }
}
