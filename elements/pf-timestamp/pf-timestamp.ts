import type { ComplexAttributeConverter } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './pf-timestamp.css';

const BooleanStringConverter: ComplexAttributeConverter = {
  fromAttribute(value) {
    return !value || value === 'true';
  },
};

@customElement('pf-timestamp')
export class PfTimestamp extends LitElement {
  static readonly styles = [style];

  @property({ reflect: true })
  get date() {
    return this.#date.toLocaleString();
  }

  set date(string) {
    this.#date = new Date(string);
    this.#isoString = this.#date.toISOString();
  }

  @property({ reflect: true, attribute: 'date-format' }) dateFormat?: 'full' | 'long' | 'medium' | 'short';

  @property({ reflect: true, attribute: 'time-format' }) timeFormat?: 'full' | 'long' | 'medium' | 'short';

  @property({ attribute: false }) customFormat?: object;

  @property({ reflect: true, attribute: 'display-suffix' }) displaySuffix?: string;

  @property({ reflect: true }) locale?: string;

  @property({ reflect: true, type: Boolean }) relative?: boolean;

  @property({ reflect: true, type: Boolean }) utc?: boolean;

  @property({ reflect: true, attribute: 'hour-12', converter: BooleanStringConverter }) hour12?: boolean;

  #date = new Date();

  #isoString = this.#date.toISOString();

  get isoString() {
    return this.#isoString;
  }

  get time() {
    const { hour12, customFormat, dateFormat: dateStyle, timeFormat: timeStyle, utc } = this;
    const timeZone = utc ? 'UTC' : undefined;
    const formatOptions = customFormat || { hour12, dateStyle, timeStyle, timeZone };
    const formattedDate = this.#date.toLocaleString(this.locale, formatOptions);
    return this.relative ? this.#getTimeRelative(this.#date) : `${formattedDate}${this.displaySuffix ? ` ${this.displaySuffix}` : ''}`;
  }

  willUpdate() {
    if (!this.displaySuffix && this.utc) {
      this.displaySuffix = 'UTC';
    }
  }

  render() {
    return html`
      <time datetime="${this.isoString}">${this.time}</time>
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
    'pf-timestamp': PfTimestamp;
  }
}
