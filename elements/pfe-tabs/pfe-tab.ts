import { customElement, property } from 'lit/decorators.js';
import { BaseTab } from './BaseTab.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './BaseTab.scss';
import pfeStyle from './pfe-tab.scss';

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tab')
export class PfeTab extends BaseTab {
  static readonly version = '{{version}}';

  static readonly styles = [style, pfeStyle];

  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

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
