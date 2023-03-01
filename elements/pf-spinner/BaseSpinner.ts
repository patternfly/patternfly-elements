import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';

import styles from './BaseSpinner.css';

export type SpinnerSize = (
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
);

/**
 * Base spinner class
 *
 * @cssprop {<length>} --pf-c-spinner--diameter                      {@default `3.375rem`}
 * @cssprop {<length>} --pf-c-spinner--Width                         {@default `3.375rem`}
 * @cssprop {<length>} --pf-c-spinner--Height                        {@default `3.375rem`}
 * @cssprop {<color>}  --pf-c-spinner--Color                         {@default `#06c`}
 * @cssprop {<length>} --pf-c-spinner--m-sm--diameter                {@default `0.625rem`}
 * @cssprop {<length>} --pf-c-spinner--m-md--diameter                {@default `1.125rem`}
 * @cssprop {<length>} --pf-c-spinner--m-lg--diameter                {@default `1.5rem`}
 * @cssprop {<length>} --pf-c-spinner--m-xl--diameter                {@default `3.375rem`}
 * @cssprop {<time>}   --pf-c-spinner--AnimationDuration             {@default `1.4s`}
 * @cssprop {<string>} --pf-c-spinner--AnimationTimingFunction       {@default `linear`}
 * @cssprop {<number>} --pf-c-spinner--stroke-width                  {@default `10`}
 * @cssprop {<color>}  --pf-c-spinner__path--Stroke                  {@default `#06c`}
 * @cssprop {<number>} --pf-c-spinner__path--StrokeWidth             {@default `10`}
 * @cssprop {<string>} --pf-c-spinner__path--AnimationTimingFunction {@default `ease-in-out`}
 */

export abstract class BaseSpinner extends LitElement {
  static readonly styles = [styles];

  /** Preset sizes for the spinner */
  @property({ reflect: true }) size: SpinnerSize = 'xl';

  /** Custom diameter of spinner set as CSS variable */
  @property({ reflect: true }) diameter?: `${string}${'px'|'%'|'rem'|'em'|'fr'|'pt'}`;

  override render() {
    return html`
      <svg role="progressbar" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" />
      </svg>
    `;
  }
}
