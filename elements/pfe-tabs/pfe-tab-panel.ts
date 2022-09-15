import { customElement, property } from 'lit/decorators.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pfe-tab-panel.scss';
import { BaseTabPanel } from './BaseTabPanel';

/**
 * @slot - Add the content for your tab panel here.
 * @csspart container - container for the panel content
 */
@customElement('pfe-tab-panel')
export class PfeTabPanel extends BaseTabPanel {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  async connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab-panel');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab-panel': PfeTabPanel;
  }
}
