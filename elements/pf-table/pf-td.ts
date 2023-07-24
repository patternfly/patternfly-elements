import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-td.css';

export class TdChangeEvent extends ComposedEvent {
  constructor(
    public expanded: boolean
  ) {
    super('change');
  }
}

/**
 * Table data cell
 * @slot - Place element content here
 */
@customElement('pf-td')
export class PfTd extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'cell';

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ type: Boolean, reflect: true, attribute: 'expand-button' }) expandButton = false;

  render() {
    return !this.expandButton ?
      html`<slot></slot>`
      : html`<pf-button id="button" aria-expanded=${this.expanded} plain @click=${this.#onClick}>
               <pf-icon id="icon" icon="angle-right" size="md"></pf-icon>
             </pf-button>`;
  }

  #onClick() {
    this.dispatchEvent(new TdChangeEvent(!this.expanded));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-td': PfTd;
  }
}
