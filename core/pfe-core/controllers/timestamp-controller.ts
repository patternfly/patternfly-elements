import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type DateTimeFormat = 'full' | 'long' | 'medium' | 'short';

export interface TimestampOptions {
  dateFormat: DateTimeFormat;
  timeFormat: DateTimeFormat;
  customFormat?: Intl.DateTimeFormatOptions;
  displaySuffix: string;
  locale: Intl.LocalesArgument;
  relative: boolean;
  utc: boolean;
  hour12: boolean;
}

const defaults = {
  dateFormat: 'short',
  timeFormat: 'short',
  customFormat: undefined,
  displaySuffix: '',
  locale: undefined,
  relative: false,
  utc: false,
  hour12: false
} as const;

export class TimestampController implements ReactiveController {
  static #isTimestampOptionKey(prop: PropertyKey): prop is keyof TimestampOptions {
    return prop in defaults;
  }

  #date = new Date();

  #isoString = this.#date.toISOString();

  #options: TimestampOptions = defaults;

  #host: ReactiveControllerHost;

  get date() {
    return this.#date.toLocaleString(this.#options.locale);
  }

  set date(string) {
    this.#date = new Date(string);
    this.#isoString = this.#date.toISOString();
  }

  get isoString() {
    return this.#isoString;
  }

  get #timeOptions(): Intl.DateTimeFormatOptions {
    if (this.#options.customFormat) {
      return this.#options.customFormat;
    } else {
      const { dateFormat: dateStyle, timeFormat: timeStyle, utc, hour12 } = this.#options;
      const timeZone = utc ? 'UTC' : undefined;
      return { hour12, dateStyle, timeStyle, timeZone };
    }
  }

  get time() {
    if (this.#options.relative) {
      return this.#getTimeRelative();
    } else {
      let { displaySuffix, locale } = this.#options;
      if (this.#options.utc) {
        displaySuffix ||= 'UTC';
      }
      return `${this.#date.toLocaleString(locale, this.#timeOptions)} ${displaySuffix ?? ''}`
        .trim();
    }
  }

  constructor(host: ReactiveControllerHost, options?: Partial<TimestampOptions>) {
    this.#host = host;
    host.addController(this);
    for (const [name, value] of Object.entries(this.#options)) {
      // @ts-expect-error: seems typescript compiler isn't up to the task here
      this.#options[name] = options?.[name] ?? value;
    }
  }

  hostConnected?(): void

  /**
   * Based off of Github Relative Time
   * https://github.com/github/time-elements/blob/master/src/relative-time.js
   */
  #getTimeRelative() {
    const date = this.#date;
    const { locale } = this.#options;
    const rtf = new Intl.RelativeTimeFormat(locale as string, { localeMatcher: 'best fit', numeric: 'auto', style: 'long' });
    const ms: number = date.getTime() - Date.now();
    const tense = ms > 0 ? 1 : -1;
    let qty = 0;
    let units: Intl.RelativeTimeFormatUnit | undefined;
    const s = Math.round(Math.abs(ms) / 1000);
    const min = Math.round(s / 60);
    const h = Math.round(min / 60);
    const d = Math.round(h / 24);
    const m = Math.round(d / 30);
    const y = Math.round(m / 12);
    if (m >= 12) {
      qty = y;
      units = 'year';
    } else if (d >= 30) {
      qty = m;
      units = 'month';
    } else if (h >= 24) {
      qty = d;
      units = 'day';
    } else if (min >= 45) {
      qty = h;
      units = 'hour';
    } else if (s >= 45) {
      qty = min;
      units = 'minute';
    } else if (s >= 10) {
      qty = s;
      units = 'second';
    }

    return typeof (units) !== 'undefined' ? rtf.format(tense * qty, units) : 'just now';
  }

  set(prop: PropertyKey, value: unknown) {
    if (TimestampController.#isTimestampOptionKey(prop)) {
      // @ts-expect-error: seems typescript compiler isn't up to the task here
      this.#options[prop] = value;
      this.#host.requestUpdate();
    }
  }
}
