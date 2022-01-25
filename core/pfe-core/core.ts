import type { ComplexAttributeConverter } from 'lit';

export interface PfeConfig {
  /** Set to false to disable client-side page load performance tracking */
  trackPerformance?: boolean;
  /** Set to false to disable various debug logs */
  log?: boolean;
  /** Set to false to disable automatically removing `unresolved` attr from body */
  autoReveal?: boolean;
}

export type ContextTheme = (
  | 'dark'
  | 'light'
  | 'saturated'
);

/**
 * A boolean value that indicates if the performance should be tracked.
 * For use in a JS file or script tag; can also be added in the constructor of a component during development.
 * @example trackPerformance(true);
 */
export function trackPerformance(preference = null) {
  if (preference !== null) {
    window.PfeConfig.trackPerformance = false;
  }
  return window.PfeConfig.trackPerformance;
}

export const NumberListConverter: ComplexAttributeConverter<null|number[]> = {
  fromAttribute(value: string) {
    if (typeof value !== 'string') {
      return null;
    } else {
      return value.split(',').map(x => x.trim()).map(x => parseInt(x, 10));
    }
  },
  toAttribute(value: number[]) {
    return value.join(',');
  },
};

/**
 * A composed, bubbling event for UI interactions
 * e.g. when an accordion panel opens.
 */
export class ComposedEvent extends Event {
  constructor(type: string, init?: EventInit) {
    super(type, {
      bubbles: true,
      composed: true,
      ...init
    });
  }
}

declare global {
  interface Window {
    /** Global configuration settings for PatternFly Elements */
    PfeConfig: PfeConfig;
  }
}

// 👇 SIDE EFFECTS 👇

/** Global patternfly elements config */
window.PfeConfig = Object.assign(window.PfeConfig ?? {}, {
  autoReveal: window.PfeConfig?.autoReveal ?? !document.body.hasAttribute('no-auto-reveal'),
  get log() {
    return !!localStorage.pfeLog;
  },
  set log(v: boolean) {
    if (v) {
      localStorage.setItem('pfeLog', `${true}`);
    } else {
      localStorage.removeItem('pfeLog');
    }
  },
});
