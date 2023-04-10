import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';

import { BaseSpinner } from './BaseSpinner.js';
import styles from './pf-spinner.css';

/**
 * A **spinner** is used to indicate to users that an action is in progress. For actions
 * that may take a long time, use a progress bar instead.
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

@customElement('pf-spinner')
export class PfSpinner extends BaseSpinner {
  static readonly styles = [...BaseSpinner.styles, styles];
  render() {
    return html`<div style=${styleMap({ '--pf-c-spinner--diameter': this.diameter })}>${super.render()}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-spinner': PfSpinner;
  }
}
