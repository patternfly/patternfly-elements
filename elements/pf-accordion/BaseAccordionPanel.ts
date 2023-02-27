import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './BaseAccordionPanel.css';

export class BaseAccordionPanel extends LitElement {
  static readonly styles = [style];

  @property({ type: Boolean, reflect: true }) expanded = false;

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.setAttribute('role', 'region');
  }

  override render() {
    return html`
      <div tabindex="-1">
        <div id="container" class="content" part="container">
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
