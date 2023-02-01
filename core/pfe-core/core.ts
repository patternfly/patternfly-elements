import type { ComplexAttributeConverter } from 'lit';

/** PatternFly Elements global config object */
export interface PfeConfig {
  /** Set to false to disable client-side page load performance tracking */
  trackPerformance?: boolean;
  /** Set to false to disable various debug logs */
  log?: boolean;
  /** Set to false to disable automatically removing `unresolved` attr from body */
  autoReveal?: boolean;
}

const noPref = Symbol();

/** Retrieve an HTML metadata item */
function getMeta(name: string): string|undefined {
  return document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content;
}

/**
 * A boolean value that indicates if the performance should be tracked.
 * For use in a JS file or script tag; can also be added in the constructor of a component during development.
 * @example trackPerformance(true);
 */
export function trackPerformance(preference: boolean | typeof noPref = noPref) {
  if (preference !== noPref) {
    window.PfeConfig.trackPerformance = !!preference;
  }
  return window.PfeConfig.trackPerformance;
}

/**
 * A LitElement property converter which represents a list of numbers as a comma separated string
 * @see https://lit.dev/docs/components/properties/#conversion-converter
 */
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

// 👇 SIDE EFFECTS 👇

declare global {
  interface Window {
    /** Global configuration settings for PatternFly Elements */
    PfeConfig: PfeConfig;
  }
}

const bodyNoAutoReveal = document.body.hasAttribute('no-auto-reveal');

/** Global patternfly elements config */
window.PfeConfig = Object.assign(window.PfeConfig ?? {}, {
  trackPerformance: window.PfeConfig?.trackPerformance ?? getMeta('pf-track-performance') === 'true',
  // if the body tag has `no-auto-reveal` attribute, reveal immediately
  // if `<meta name="pf-auto-reveal">` exists, and it's `content` is 'true',
  // then auto-reveal the body
  autoReveal: window.PfeConfig?.autoReveal ?? (
      bodyNoAutoReveal ? !bodyNoAutoReveal
    : getMeta('pf-auto-reveal') === 'true'
  ),
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
