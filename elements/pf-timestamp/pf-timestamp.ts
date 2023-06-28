import type { ComplexAttributeConverter } from 'lit';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { TimestampController } from '@patternfly/pfe-core/controllers/timestamp-controller.js';
import type { DateTimeFormat } from '@patternfly/pfe-core/controllers/timestamp-controller.js';

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
    return this.#timestamp.date;
  }

  set date(string) {
    this.#timestamp.date = string;
  }

  @property({ reflect: true, attribute: 'date-format' }) dateFormat?: DateTimeFormat;

  @property({ reflect: true, attribute: 'time-format' }) timeFormat?: DateTimeFormat;

  @property({ attribute: false }) customFormat?: object;

  @property({ reflect: true, attribute: 'display-suffix' }) displaySuffix?: string;

  @property({ reflect: true }) locale?: string;

  @property({ reflect: true, type: Boolean }) relative?: boolean;

  @property({ reflect: true, type: Boolean }) utc?: boolean;

  @property({ reflect: true, attribute: 'hour-12', converter: BooleanStringConverter }) hour12?: boolean;

  get isoString() {
    return this.#timestamp.isoString;
  }

  get time() {
    return this.#timestamp.time;
  }

  #timestamp = new TimestampController(this);

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

  updated(changedProperties: Map<string, string | object | boolean>) {
    for (const [prop] of changedProperties) {
      // @todo
      // if (isTimestampProp(prop)) {
      //   this.timestamp[prop]= this[prop];
      // }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-timestamp': PfTimestamp;
  }
}
