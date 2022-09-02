import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pfe-tab-panel.scss';

/**
 * @slot - Add the content for your tab panel here.
 * @csspart container - container for the panel content
 */
@customElement('pfe-tab-panel')
export class PfeTabPanel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  @property({ reflect: true, type: Boolean }) disabled = false;

  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  async connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab-panel');
    await this.updateComplete;
    this.#upgradeAccessibility();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  setAriaLabelledBy(id: string) {
    if (!this.hasAttribute('aria-labelledby')) {
      this.setAttribute('aria-labelledby', id);
    }
  }

  #upgradeAccessibility() {
    this.setAttribute('role', 'tabpanel');
    if (!this.disabled) {
      this.tabIndex = 0;
    } else {
      this.tabIndex = -1;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab-panel': PfeTabPanel;
  }
}
