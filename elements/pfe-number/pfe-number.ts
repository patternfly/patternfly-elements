import { LitElement, html } from 'lit';
import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { customElement, property, state } from 'lit/decorators.js';

import numeral from './numeral.js';

import style from './pfe-number.scss';

export type Format = (
  | 'abbrev'
  | 'bytes'
  | 'e'
  | 'ordinal'
  | 'ordinal'
  | 'percent'
  | 'thousands'
  | 'NONE'
);

// use thin spaces to separate thousands chunks
numeral.locales.en.delimiters.thousands = ' ';

/**
 * Number helps display numbers in a consistent type and format.
 */
@customElement('pfe-number') @pfelement()
export class PfeNumber extends LitElement {
  static readonly styles = [style];

  static get types(): Record<Format, string|undefined> {
    return {
      abbrev: '0a', // or 'approx'?
      ordinal: '0o',
      percent: '0%',
      bytes: '0[.][00] ib',
      e: '0[.00]e+0',
      thousands: '0,0[.][00]',
      NONE: undefined,
    };
  }

  /**
   * Reflects the number that is in the light DOM.
   */
  @observed('_updateNumber')
  @property({ type: Number, reflect: true }) number?: number;

  /**
   *   The type of display you want to show.
   *
   * The options for type are:
   * - `ordinal`: (1st, 2nd, 3rd, 4th)
   * - `bytes`: (2 KiB, 9.54 Mib, 93 Gib)
   * - `abbrev`: (1k, 1m, 1b)
   * - `percent`: (10%, 50%, 100%)
   * - `e`: (2.000e+6)
   * - `thousands`: (97 654 321.123)
   */
  @observed('_updateNumber')
  @property({ type: String, reflect: true })
  type: 'abbrev'|'bytes'|'e'|'ordinal'|'ordinal'|'percent'|'thousands'|'NONE' = 'NONE'

  /**
   * Reflects the format that is being used to display the number.
   */
  @property({ reflect: true }) format?: string;

  @state() private formatted?: string;

  connectedCallback() {
    super.connectedCallback();
    this._setInitialNumber();
  }

  render() {
    return html`
      <span>${this.formatted}</span>
    `;
  }

  protected _updateNumber() {
    if (Number.isNaN(this.number)) {
      this.textContent = '';
      this.formatted = '';
    } else {
      this.textContent = this.number?.toString() ?? '';
      this.format = PfeNumber.types[this.type ?? 'NONE'];
      this.formatted = this._format();
    }
  }


  private _setInitialNumber() {
    const parsed = parseFloat(this.textContent ?? '');
    if (!Number.isNaN(parsed))
      this.number = parsed;
  }

  private _format(num = this.number, formatString = this.format): string {
    if (num == null)
      return '';
    return numeral(num).format(formatString);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-number': PfeNumber;
  }
}
