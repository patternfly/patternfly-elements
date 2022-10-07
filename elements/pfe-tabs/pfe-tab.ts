import { customElement, property } from 'lit/decorators.js';
import { BaseTab } from './BaseTab.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './BaseTab.scss';
import pfeStyle from './pfe-tab.scss';

/**
 * PfeTab
 *
 * @csspart button - button element
 * @csspart icon - span container for the icon
 * @csspart text - span container for the title text
 *
 * @slot icon - We expect the light DOM of `<svg>` or `<pfe-icon>`
 * @slot - The tab title text
 *
 * @fires { TabExpandEvent } tab-expand - when a tab is selected
 * @fires { CustomEvent<{ selected: 'true'|'false'; tab BaseTab }> }
 */
@customElement('pfe-tab')
export class PfeTab extends BaseTab {
  static readonly version = '{{version}}';

  static readonly styles = [style, pfeStyle];

  async connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab': PfeTab;
  }
}
