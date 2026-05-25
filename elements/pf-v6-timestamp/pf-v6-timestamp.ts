import type { PropertyValues, TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import {
  TimestampController,
  type DateTimeFormat,
  type HourCycle,
} from '@patternfly/pfe-core/controllers/timestamp-controller.js';

import styles from './pf-v6-timestamp.css';

export type { DateTimeFormat, HourCycle };

/**
 * A timestamp provides consistent formats for displaying date and time values.
 * Authors should set `date` to display a specific time. Defaults to now.
 * The `<time datetime>` element provides screen reader accessible semantics.
 *
 * For tooltip display, wrap the timestamp in a `<pf-v6-tooltip>` using
 * composition rather than built-in configuration.
 *
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

  /**
   * IANA timezone identifier for display (e.g. "UTC", "America/New_York").
   * When absent, uses the local timezone.
   */
  @property({ reflect: true, attribute: 'time-zone' }) timeZone?: string;

  /**
   * Hour cycle for time display. Values follow the Intl.DateTimeFormat spec:
   * - `h11`: 12-hour (0-11)
   * - `h12`: 12-hour (1-12)
   * - `h23`: 24-hour (0-23)
   * - `h24`: 24-hour (1-24)
   * When absent, uses the locale default.
   */
  @property({ reflect: true, attribute: 'hour-cycle' }) hourCycle?: HourCycle;

  /**
   * The date/time to display. Accepts any value parseable by `new Date()`.
   * Defaults to the current date/time when not set.
   */
  @property({ reflect: true })
  get date(): string {
    return this.#timestamp.isoString;
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
