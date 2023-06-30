import type { ReactiveController, ReactiveElement } from 'lit';

export type DateTimeFormat = 'full' | 'long' | 'medium' | 'short';

interface Options {
  dateFormat?: DateTimeFormat;
  timeFormat?: DateTimeFormat;
  customFormat?: object;
  displaySuffix?: string;
  locale?: string;
  relative?: boolean;
  utc?: boolean;
  hour12?: boolean;
}

const defaults: Options = {
  dateFormat: 'short',
  timeFormat: 'short',
  customFormat: {},
  displaySuffix: '',
  locale: '',
  relative: false,
  utc: false,
  hour12: false
};

type Option = keyof Options;

export class TimestampController implements ReactiveController {
  #date = new Date();

  #isoString = this.#date.toISOString();

  get date() {
    return this.#date.toLocaleString();
  }

  set date(string) {
    this.#date = new Date(string);
    this.#isoString = this.#date.toISOString();
  }

  get isoString() {
    return this.#isoString;
  }

  get time() {
    const { dateFormat: dateStyle, timeFormat: timeStyle, customFormat, displaySuffix, locale, relative, utc, hour12 } = this.options;
    const timeZone = utc ? 'UTC' : undefined;
    const formatOptions = customFormat || { hour12, dateStyle, timeStyle, timeZone };
    const formattedDate = this.#date.toLocaleString(locale, formatOptions);
    return relative ? this.#getTimeRelative(this.#date, locale) : `${formattedDate}${displaySuffix ? ` ${displaySuffix}` : ''}`;
  }

  options: Options;

  constructor(host: ReactiveElement, options?: Options) {
    host.addController(this);
    this.options = {};
    for (const [name, value] of Object.entries(defaults)) {
      if (this.isOption(name)) {
        this.options[name] = options?.[name] ?? value;
      }
      // @todo create decorator?
      Object.defineProperty(this.options, name, {
        get() {
          return this.options?.[name];
        },
        set(value) {
          this.options[name] = value;
          host.requestUpdate();
        },
      });
    }
  }

  hostConnected?(): void

  isOption(prop: string): prop is Option {
    return prop in defaults;
  }

  /**
   * Based off of Github Relative Time
   * https://github.com/github/time-elements/blob/master/src/relative-time.js
   */
  #getTimeRelative(date: Date, locale?: string) {
    const rtf = new Intl.RelativeTimeFormat(locale, { localeMatcher: 'best fit', numeric: 'auto', style: 'long' });
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
}
