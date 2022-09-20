import { customElement } from 'lit/decorators.js';

import { BaseSpinner } from './BaseSpinner.js';
import styles from './pfe-spinner.scss';

/**
 * @cssprop {<length>} --pf-c-spinner--diameter {@default `3.375rem`}
 */

@customElement('pfe-spinner')
export class PfeSpinner extends BaseSpinner {
  static readonly version = '{{version}}';
  static readonly styles = [...BaseSpinner.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-spinner': PfeSpinner;
  }
}
