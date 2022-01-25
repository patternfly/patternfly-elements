import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement, initializer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pfe-tab-panel.scss';

import { PfeTab } from './pfe-tab.js';

/**
 * @slot - Add the content for your tab panel here.
 */
@customElement('pfe-tab-panel') @pfelement()
export class PfeTabPanel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /** Selected tab */
  @property({ type: Boolean, reflect: true, attribute: 'aria-selected' }) selected = false;

  /** Visibility */
  @property({ type: Boolean, reflect: true }) hidden = false;

  @property({ reflect: true }) role = 'tabpanel';

  @property({ type: Number }) tabIndex = 0;

  // TODO: Should deprecate
  get tabindex() {
    return this.tabIndex;
  }

  set tabindex(v: number) {
    this.tabIndex = v;
  }

  @property({ attribute: 'aria-labelledby', reflect: true }) labelledby?: string;

  /** Variant */
  @property({ reflect: true }) variant: 'wind'|'earth' = 'wind';

  connectedCallback() {
    super.connectedCallback();
    // Force role to be set to tab
    this.setAttribute('role', 'tabpanel');
  }

  render() {
    return html`
      <div tabindex="-1" role="tabpanel">
        <div class="container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  @initializer({ observe: { childList: true, subtree: true } })
  protected _init() {
    // If an ID is not defined, generate a random one
    this.id ||= getRandomId();

    if (
      this.previousElementSibling instanceof PfeTab &&
      this.previousElementSibling.selected !== 'true'
    ) {
      this.hidden = true;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab-panel': PfeTabPanel;
  }
}
