import type { ComplexAttributeConverter, PropertyValues, TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import {
  TimestampController,
  type DateTimeFormat,
} from '@patternfly/pfe-core/controllers/timestamp-controller.js';

import styles from './pf-v6-timestamp.css';

export type { DateTimeFormat };

const BooleanStringConverter: ComplexAttributeConverter = {
  fromAttribute(value) {
    return !value || value === 'true';
  },
};

/**
 * A timestamp provides consistent formats for displaying date and time values.
 * Authors should set `date` to display a specific time. Defaults to now.
 * Set `help-text` when wrapping in a tooltip. The `<time datetime>` element
 * provides screen reader accessible semantics.
 * @summary Consistently formatted date and time display.
 * @slot - Custom content to display instead of the formatted date/time.
 *         Useful for relative time text or prefacing content.
 *         The inner `<time datetime>` element preserves machine-readable
 *         semantics regardless of slotted display text; screen readers
 *         may announce the `datetime` value for additional context.
 */
@customElement('pf-v6-timestamp')
export class PfV6Timestamp extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Format of the displayed date portion. */
  @property({ reflect: true, attribute: 'date-format' }) dateFormat?: DateTimeFormat;

  /** Format of the displayed time portion. */
  @property({ reflect: true, attribute: 'time-format' }) timeFormat?: DateTimeFormat;

  /**
   * Custom Intl.DateTimeFormatOptions for full control over formatting.
   * Overrides `date-format` and `time-format` when set.
   */
  @property({ attribute: false }) customFormat?: Intl.DateTimeFormatOptions;

  /** Custom suffix appended to the displayed content, e.g. a timezone name. */
  @property({ reflect: true, attribute: 'display-suffix' }) displaySuffix?: string;

  /** Locale for formatting. Defaults to the browser's current locale. */
  @property({ reflect: true }) locale?: string;

  /** Display a relative time string (e.g. "3 hours ago") instead of an absolute date. */
  @property({ reflect: true, type: Boolean }) relative?: boolean;

  /** Display the time in UTC instead of the local timezone. */
  @property({ reflect: true, type: Boolean }) utc?: boolean;

  /**
   * Display time in 12-hour format. When absent, uses the locale default.
   * Set `hour-12="false"` to force 24-hour display.
   */
  @property({
    reflect: true,
    attribute: 'hour-12',
    converter: BooleanStringConverter,
  }) hour12?: boolean;

  /** Applies dashed underline styling, indicating a tooltip is available. */
  @property({ reflect: true, type: Boolean, attribute: 'help-text' }) helpText = false;

  /**
   * The date/time to display. Accepts any value parseable by `new Date()`.
   * Defaults to the current date/time when not set.
   */
  @property({ reflect: true })
  get date(): string {
    return this.#timestamp.localeString;
  }

  set date(string) {
    this.#timestamp.date = new Date(string);
  }

  /** The ISO 8601 string representation of the current date value. */
  get isoString(): string {
    return this.#timestamp.isoString;
  }

  /** The formatted display string for the current date/time. */
  get time(): string {
    return this.#timestamp.time;
  }

  #timestamp = new TimestampController(this);

  override willUpdate(changedProperties: PropertyValues<this>): void {
    for (const [prop] of changedProperties) {
      this.#timestamp.set(prop, this[prop as keyof this]);
    }
    // Keyboard-focusable when acting as a tooltip trigger (WCAG 2.1.1)
    if (this.helpText) {
      this.setAttribute('tabindex', '0');
    } else {
      this.removeAttribute('tabindex');
    }
  }

  override render(): TemplateResult<1> {
    return html`
      <time datetime="${this.#timestamp.isoString}">
        <slot>${this.#timestamp.time}</slot>
      </time>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-timestamp': PfV6Timestamp;
  }
}
