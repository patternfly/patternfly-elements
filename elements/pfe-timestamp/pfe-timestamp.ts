import type { ComplexAttributeConverter } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './pfe-timestamp.css';

const BooleanStringConverter: ComplexAttributeConverter = {
  fromAttribute(value) {
    return !value || value === 'true';
  },
};

@customElement('pfe-timestamp')
export class PfeTimestamp extends LitElement {
  static readonly version = '{{version}}';
  static readonly styles = [style];

  @property({ reflect: true }) date = new Date().toLocaleString();

  @property({ reflect: true, attribute: 'date-format' }) dateFormat?: 'full' | 'long' | 'medium' | 'short';

  @property({ reflect: true, attribute: 'time-format' }) timeFormat?: 'full' | 'long' | 'medium' | 'short';

  @property({ attribute: false }) customFormat?: object;

  @property({ reflect: true, attribute: 'display-suffix' }) displaySuffix?: string;

  @property({ reflect: true }) locale?: string;

  @property({ reflect: true, type: Boolean }) relative?: boolean;

  @property({ reflect: true, type: Boolean }) utc?: boolean;

  @property({ reflect: true, attribute: 'hour-12', converter: BooleanStringConverter }) hour12?: boolean;

  render() {
    const { hour12 } = this;
    const formatOptions = this.customFormat || {
      ...(this.dateFormat && { dateStyle: this.dateFormat }),
      ...(this.timeFormat && { timeStyle: this.timeFormat }),
      ...{ hour12 },
      ...(this.utc && { timeZone: 'UTC' })
    };

    if (!this.displaySuffix && this.utc) {
      this.displaySuffix = 'UTC';
    }

    const _date = new Date(this.date);
    const formattedDate = _date.toLocaleString(this.locale, formatOptions);
    const isoDate = _date.toISOString();
    const timestampContent = this.relative ? this.#getTimeRelative(_date) : `${formattedDate}${this.displaySuffix ? ` ${this.displaySuffix}` : ''}`;

    return html`
      <time datetime="${isoDate}">${timestampContent}</time>
    `;
  }

  /**
   * Based off of Github Relative Time
   * https://github.com/github/time-elements/blob/master/src/relative-time.js
   */
  #getTimeRelative(date: Date) {
    const ms: number = date.getTime() - Date.now();
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-timestamp': PfeTimestamp;
  }
}
