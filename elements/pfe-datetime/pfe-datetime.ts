import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-datetime.scss';

function dash(str: string): string {
  return str
    .replace(/[\w]([A-Z])/g, match => `${match[0]}-${match[1]}`)
    .toLowerCase();
}

const INTL_CONFIGS = Object.entries({
  weekday: {
    short: 'short',
    long: 'long',
  },
  day: {
    'numeric': 'numeric',
    '2-digit': '2-digit',
  },
  month: {
    short: 'short',
    long: 'long',
  },
  year: {
    'numeric': 'numeric',
    '2-digit': '2-digit',
  },
  hour: {
    'numeric': 'numeric',
    '2-digit': '2-digit',
  },
  minute: {
    'numeric': 'numeric',
    '2-digit': '2-digit',
  },
  second: {
    'numeric': 'numeric',
    '2-digit': '2-digit',
  },
  timeZoneName: {
    short: 'short',
    long: 'long',
  },
}) as [keyof Required<Intl.DateTimeFormatOptions>, object][];

/**
 * @attr {'narrow'|'short'|'long'} weekday
 * @attr {'numeric'|'2-digit'|'narrow'|'short'|'long'} month
 * @attr {'numeric'|'2-digit'} day
 * @attr {'numeric'|'2-digit'} year
 * @attr {'numeric'|'2-digit'} hour
 * @attr {'numeric'|'2-digit'} minute
 * @attr {'numeric'|'2-digit'} second
 */
@customElement('pfe-datetime') @pfelement()
export class PfeDatetime extends LitElement {
  static readonly styles = [style]

  /**
   * The options for type are:
   * - `local`: Shows a formatted time for the indicated locale if provided
   * - `relative`: Shows a relative time (1 hour ago, 2 hours until)
   */
  @property({ reflect: true }) type: 'local'|'relative' = 'local';

  /** The value of this should be the same timestamp that you add to the light DOM. */
  @observed
  @property({ reflect: true }) datetime = '';

  /**
   * A unix timestamp that will be converted for use in displaying the appropriate date.
   * You would not use both datetime and timestamp, and the last updated will take precedence.
   */
  @observed
  @property({ type: Number, reflect: true }) timestamp?: number;

  /** Time Zone */
  @property({ reflect: true, attribute: 'time-zone' }) timeZone?: string;

  @state() private _datetime?: number;

  @state() private _timestamp?: number;

  private logger = new Logger(this);

  private get _dateTimeType() {
    return this.type || 'local';
  }

  render() {
    const formattedDate = this._getTypeString();
    return html`
      <span>${formattedDate}</span>
    `;
  }

  protected _datetimeChanged(_oldVal?: string, newVal?: string) {
    if (!newVal || !Date.parse(newVal)) {
      return;
    }


    if (Date.parse(newVal) && this._datetime === Date.parse(newVal)) {
      return;
    }


    this.setDate(Date.parse(newVal));
  }

  protected _timestampChanged(_oldVal?: number, newVal?: number) {
    if (newVal == null || this._timestamp === newVal) {
      this.logger.log('early return');
      return;
    }

    this._timestamp = newVal;
    this.setDate(new Date(newVal * 1000));
  }

  private _getOptions(): Intl.DateTimeFormatOptions {
    const options: Intl.DateTimeFormatOptions = {};

    for (const [key, val] of INTL_CONFIGS) {
      // converting the prop name from camel case to
      // hyphenated so it matches the attribute.
      // for example: timeZoneName to time-zone-name
      const attributeName = dash(key);

      const configured =
        this.getAttribute(attributeName) as string;

      if (configured) {
        const value = val[configured as keyof typeof val];
        if (value) {
          options[key] = value;
        }
      }
    }

    if (this.timeZone) {
      options.timeZone = this.timeZone;
    }

    return options;
  }

  private _getTypeString(): string {
    if (this._datetime == null) {
      return '';
    }
    try {
      const options = this._getOptions();
      const locale = this.getAttribute('locale') || navigator.language;
      switch (this._dateTimeType) {
        case 'local':
          return new Intl.DateTimeFormat(locale, options).format(this._datetime);
        case 'relative':
          return this._getTimeRelative(this._datetime - Date.now());
        default:
          return new Date(this._datetime ?? '').toLocaleString();
      }
    } catch (e) {
      return new Date(this._datetime ?? '').toLocaleString();
    }
  }

  /**
   * Based off of Github Relative Time
   * https://github.com/github/time-elements/blob/master/src/relative-time.js
   */
  private _getTimeRelative(ms: number) {
    const tense = ms > 0 ? 'until' : 'ago';
    let str = 'just now';
    const s = Math.round(Math.abs(ms) / 1000);
    const min = Math.round(s / 60);
    const h = Math.round(min / 60);
    const d = Math.round(h / 24);
    const m = Math.round(d / 30);
    const y = Math.round(m / 12);
    if (m >= 18) {
      str = `${y} years`;
    } else if (m >= 12) {
      str = 'a year';
    } else if (d >= 45) {
      str = `${m} months`;
    } else if (d >= 30) {
      str = 'a month';
    } else if (h >= 36) {
      str = `${d} days`;
    } else if (h >= 24) {
      str = 'a day';
    } else if (min >= 90) {
      str = `${h} hours`;
    } else if (min >= 45) {
      str = 'an hour';
    } else if (s >= 90) {
      str = `${min} minutes`;
    } else if (s >= 45) {
      str = 'a minute';
    } else if (s >= 10) {
      str = `${s} seconds`;
    }

    return str !== 'just now' ? `${str} ${tense}` : str;
  }

  setDate(date: number|Date) {
    this._datetime = date instanceof Date ? date.getTime() : date;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-datetime': PfeDatetime;
  }
}
