import type { ComplexAttributeConverter } from 'lit';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { TimestampController } from '@patternfly/pfe-core/controllers/timestamp-controller.js';

import style from './pf-timestamp.css';

const BooleanStringConverter: ComplexAttributeConverter = {
  fromAttribute(value) {
    return !value || value === 'true';
  },
};

/**
 * A **timestamp** provides consistent formats for displaying date and time values.
 */
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

  #controller = new TimestampController(this);

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
    return this.relative ? this.#controller.getTimeRelative(this.#date, this.locale) : `${formattedDate}${this.displaySuffix ? ` ${this.displaySuffix}` : ''}`;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-timestamp': PfTimestamp;
  }
}
