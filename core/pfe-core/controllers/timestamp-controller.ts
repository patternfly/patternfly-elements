import type { ReactiveController, ReactiveElement } from 'lit';

export class TimestampController implements ReactiveController {
  constructor(host: ReactiveElement) {
    host.addController(this);
  }

  hostConnected(): void {
    //
  }

  /**
   * Based off of Github Relative Time
   * https://github.com/github/time-elements/blob/master/src/relative-time.js
   */
  getTimeRelative(date: Date, locale?: string) {
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
