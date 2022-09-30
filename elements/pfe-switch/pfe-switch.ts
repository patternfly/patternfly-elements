import { customElement } from 'lit/decorators.js';

import { BaseSwitch } from './BaseSwitch.js';
import styles from './pfe-switch.scss';

@customElement('pfe-switch')
export class PfeSwitch extends BaseSwitch {
  static readonly version = '{{version}}';
  static readonly styles = [...BaseSwitch.styles, styles];
}

  declare global {
    interface HTMLElementTagNameMap {
      'pfe-switch': PfeSwitch;
  }
}
