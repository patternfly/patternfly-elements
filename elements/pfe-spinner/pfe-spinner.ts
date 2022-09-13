import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement, initializer } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-spinner.scss';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

export type Size = (
  | 'sm'
  | 'md'
  | 'xl'
);

/**
 * Progress indicator indicates that the user is waiting on a process: page load, HTTP request, image loading, etc.
 *
 * @summary Indicates that the user is waiting on a process
 *
 * @slot - The provided element should contain a fallback loading message if JavaScript should fail for any reason. When the element is connected, the loading message is visually hidden, and replaced by an animated "spinner".
 *       ```html
 *       <!--The web component that upgrades to a "loader"-->
 *       <pfe-spinner indeterminate>
 *         <!--your custom message for JS failure AND a11y technologies-->
 *         <h1>
 *           This text will be seen if JS fails, but will be hidden on upgrade.
 *           Screen readers will still see it as a part of the DOM.
 *         </h1>
 *       </pfe-spinner>
 *       ```
 * @cssprop --pfe-spinner--background-color {@default rgba(0, 0, 0, .25)} Color of the circle
 * @cssprop --pfe-spinner--foreground-color {@default rgba(0, 0, 0, .75)} Color of the spinner
 * @cssprop --pfe-spinner--Width {@default 2rem} Width of the circle
 * @cssprop --pfe-spinner--Height {@default 2rem} Height of the circle
 */
@customElement('pfe-spinner') @pfelement()
export class PfeSpinner extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  private logger = new Logger(this);

  /** Uses the spinner style display. Currently this is on the only supported display. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** Size */
  @property({ reflect: true }) size?: 'sm'|'md'|'xl' = 'md';

  render() {
    return html`
      <div id="container">
        <span><slot @slotchange="${this._init}"></slot></span>
      </div>
    `;
  }

  @initializer({ observe: false }) protected _init() {
    if (this.isConnected) {
      const [firstChild] = this.children;
      if (!firstChild && !this.textContent?.trim()) {
        this.logger.warn(`You do not have a backup loading message.`);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-spinner': PfeSpinner;
  }
}
