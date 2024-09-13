import type { ComplexAttributeConverter, PropertyValues, TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import {
  TimestampController,
  type DateTimeFormat,
} from '@patternfly/pfe-core/controllers/timestamp-controller.js';

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
  static readonly styles: CSSStyleSheet[] = [style];

  @property({ reflect: true, attribute: 'date-format' }) dateFormat?: DateTimeFormat;

  @property({ reflect: true, attribute: 'time-format' }) timeFormat?: DateTimeFormat;

  @property({ attribute: false }) customFormat?: object;

  @property({ reflect: true, attribute: 'display-suffix' }) displaySuffix?: string;

  @property({ reflect: true }) locale?: string;

  @property({ reflect: true, type: Boolean }) relative?: boolean;

  @property({ reflect: true, type: Boolean }) utc?: boolean;

  @property({
    reflect: true,
    attribute: 'hour-12',
    converter: BooleanStringConverter,
  }) hour12?: boolean;

  @property({ reflect: true })
  get date(): string {
    return this.#timestamp.localeString;
  }

  set date(string) {
    this.#timestamp.date = new Date(string);
  }

  get isoString(): string {
    return this.#timestamp.isoString;
  }

  get time(): string {
    return this.#timestamp.time;
  }

  #timestamp = new TimestampController(this);

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hasAttribute('date')) {
      this.#timestamp.date = new Date(this.getAttribute('date')!);
    }
  }

  willUpdate(changedProperties: PropertyValues<this>): void {
    for (const [prop] of changedProperties) {
      this.#timestamp.set(prop, this[prop as keyof this]);
    }
  }

  render(): TemplateResult<1> {
    return html`
      <time datetime="${this.#timestamp.isoString}">${this.#timestamp.time}</time>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-timestamp': PfTimestamp;
  }
}
