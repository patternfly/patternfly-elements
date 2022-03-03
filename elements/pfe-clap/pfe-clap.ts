import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-clap.scss';

/**
 * Clap
 * @slot - Place element content here
 */
@customElement('pfe-clap') @pfelement()
export class PfeClap extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ type: Boolean, reflect: true }) public isCapping = false;

  render() {
    return html`
      <button class="base" part="base" @click=${() => {
 this.isCapping = !this.isCapping;
}}>
        ${this.isCapping ? html`👏` : html`🤲`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clap': PfeClap;
  }
}
