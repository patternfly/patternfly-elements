import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type DateTimeFormat = 'full' | 'long' | 'medium' | 'short';

export type HourCycle = 'h11' | 'h12' | 'h23' | 'h24';

export interface TimestampOptions {
  dateFormat?: DateTimeFormat;
  timeFormat?: DateTimeFormat;
  customFormat?: Intl.DateTimeFormatOptions;
  displaySuffix?: string;
  locale?: Intl.LocalesArgument;
  relative?: boolean;
  timeZone?: string;
  hourCycle?: HourCycle;
}

const optionKeys: Record<keyof TimestampOptions, true> = {
  dateFormat: true,
  timeFormat: true,
  customFormat: true,
  displaySuffix: true,
  locale: true,
  relative: true,
  timeZone: true,
  hourCycle: true,
};

export class TimestampController implements ReactiveController {
  static #isTimestampOptionKey(prop: PropertyKey): prop is keyof TimestampOptions {
    return prop in optionKeys;
  }

  // When Temporal reaches baseline, replace with Temporal.Instant;
  // timeZone and hourCycle options already align with Temporal's API
  #date = new Date();

  #options: Partial<TimestampOptions> = {};

  #host: ReactiveControllerHost;

  get date(): Date {
    return this.#date;
  }

  set date(value: string | Date) {
    this.#date = new Date(value);
  }

  get isoString(): string {
    return this.#date.toISOString();
  }

  get time(): string {
    if (this.#options.relative) {
      return this.#getTimeRelative();
    }
    const { displaySuffix, locale, timeZone, hourCycle } = this.#options;
    const localeString = this.#date.toLocaleString(locale, this.#options.customFormat ?? {
      hourCycle,
      timeStyle: this.#options.timeFormat,
      dateStyle: this.#options.dateFormat,
      timeZone,
    });
    return `${localeString}${displaySuffix ? ` ${displaySuffix}` : ''}`;
  }

  constructor(host: ReactiveControllerHost, options?: Partial<TimestampOptions>) {
    this.#host = host;
    host.addController(this);
    if (options) {
      Object.assign(this.#options, options);
    }
  }

  hostConnected?(): void;

  // When Temporal reaches baseline, replace Intl.RelativeTimeFormat usage
  // with Temporal.Duration and Temporal.Now.instant() for precise unit selection
  #getTimeRelative() {
    const date = this.#date;
    const { locale } = this.#options;
    const rtf = new Intl.RelativeTimeFormat(locale as string, {
      localeMatcher: 'best fit',
      numeric: 'auto',
      style: 'long',
    });
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

  set(prop: PropertyKey, value: unknown): void {
    if (TimestampController.#isTimestampOptionKey(prop)) {
      // @ts-expect-error: dynamic property assignment from element willUpdate
      this.#options[prop] = value;
      this.#host.requestUpdate();
    }
  }
}
