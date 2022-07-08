import { customElement } from 'lit/decorators.js';
import { BaseTooltip } from './lib/BaseTooltip/BaseTooltip.js';
import style from './pfe-tooltip.scss';

@customElement('pfe-tooltip')
export class PfeTooltip extends BaseTooltip {
  static readonly version = '{{version}}';

  static readonly styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tooltip': PfeTooltip;
  }
}
