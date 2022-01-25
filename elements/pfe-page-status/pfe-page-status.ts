import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-page-status.scss';

export type PageStatus = (
  | 'default'
  | 'moderate'
  | 'warning'
  | 'important'
  | 'critical'
  | 'success'
  | 'info'
  | 'normal'
  | 'accent'
  | 'complement'
);

/**
 * Page Status creates a flag/banner on the right side of the page denoting the status of the page or document the author is viewing.
 *
 * @summary Creates a flag/banner on the right side of the page
 *
 * @slot - Content in the default slot will be used as the text for the banner on the right side of the page.
 *
 * @cssprop --pfe-theme--color--feedback--default - Color for default state
 * @cssprop --pfe-theme--color--feedback--moderate - Color for `moderate` and `warning`states
 * @cssprop --pfe-theme--color--feedback--important - Color for `important` state
 * @cssprop --pfe-theme--color--feedback--critical - Color for `critical` state
 * @cssprop --pfe-theme--color--feedback--success - Color for `success` state
 * @cssprop --pfe-theme--color--feedback--info - Color for `info` state
 * @cssprop --pfe-theme--color--ui-accent - Color for `normal` state
 * @cssprop --pfe-theme--color--ui-accent - Color for `accent` state
 * @cssprop --pfe-theme--color--ui-base - Color for `complement` state

 */
@customElement('pfe-page-status') @pfelement()
export class PfePageStatus extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Controls the background color of the banner.
   *
   * Values
   * - default
   * - moderate
   * - warning
   * - important
   * - critical
   * - success
   * - info
   * - normal
   * - accent
   * - complement
   */
  @property({ type: String, reflect: true }) status: PageStatus = 'default';

  render() {
    return html`
      <div class="flag" aria-hidden="true">
        <span>
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-page-status': PfePageStatus;
  }
}
