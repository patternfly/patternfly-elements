import type { ComplexAttributeConverter } from 'lit';

export interface PfeConfig {
  trackPerformance?: boolean;
  log?: boolean;
}

export interface Breakpoints {
  /** $pf-global--breakpoint--xs: 0 !default; */
  'xs': '0px',
  /** $pf-global--breakpoint--sm: 576px !default; */
  'sm': '576px',
  /** $pf-global--breakpoint--md: 768px !default; */
  'md': '768px',
  /** $pf-global--breakpoint--lg: 992px !default; */
  'lg': '992px',
  /** $pf-global--breakpoint--xl: 1200px !default; */
  'xl': '1200px',
  /** $pf-global--breakpoint--2xl: 1450px !default; */
  '2xl': '1450px',
}

export type ContextTheme = (
  | 'dark'
  | 'light'
  | 'saturated'
);

/** Global patternfly elements config */
window.PfeConfig = Object.assign(window.PfeConfig ?? {}, {
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
    PfeConfig: PfeConfig;
  }
}
