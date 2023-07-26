import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import { PfTd } from '@patternfly/elements/pf-table/pf-table.js';


import styles from './pf-expand-toggle.css';

export class ExpandChangeEvent extends ComposedEvent {
  constructor(public expanded: boolean) {
    super('change');
  }
}

/**
 * Expand toggle
 * @slot - Place element content here
 */
@customElement('pf-expand-toggle')
export class PfExpandToggle extends PfTd {
  static readonly styles = [...PfTd.styles, styles];

  @property({ type: Boolean, reflect: true }) expanded = false;

  render() {
    return html`
        <pf-button id="button" aria-expanded=${this.expanded} plain @click=${this.#onClick}>
            <pf-icon id="icon" icon="angle-right" size="md"></pf-icon>
        </pf-button>`;
  }

  #onClick() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new ExpandChangeEvent(this.expanded));
  }
}
