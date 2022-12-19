import { customElement } from 'lit/decorators.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import styles from './pfe-tab-panel.scss';

import { BaseTabPanel } from './BaseTabPanel';

/**
 * @slot - Tab panel content
 *
 * @cssprop {<color>} --pf-c-tab-content--m-light-300 {@default `#f0f0f0`}
 *
 * @csspart container - container for the panel content
 */
@customElement('pfe-tab-panel')
export class PfeTabPanel extends BaseTabPanel {
  static readonly styles = [...BaseTabPanel.styles, styles];

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab-panel');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab-panel': PfeTabPanel;
  }
}
