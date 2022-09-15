import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { cascades } from '@patternfly/pfe-core/decorators.js';

import { BaseTabs } from './BaseTabs.js';
import './pfe-tab.js';
import './pfe-tab-panel.js';

import style from './pfe-tabs.scss';

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tabs')
export class PfeTabs extends BaseTabs {
  static readonly styles = [style];

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  @cascades('pfe-tab')
  @property({ reflect: true, type: Boolean }) fill = false;

  render() {
    const classes = { scrollable: this._showScrollButtons };
    return html`
      <div id="container" part="container">
        <div id="tabs-container" class="${classMap(classes)}">
          ${this._showScrollButtons ? html`
            <button id="previousTab" aria-label="Scroll left" ?disabled="${!this._overflowOnLeft}" @click="${this._scrollLeft}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
            </button>`
          : html``}
          <div id="tabs" part="tabs" role="tablist">
            <slot name="tab" @slotchange="${this._onSlotChange}"></slot>
          </div>
          ${this._showScrollButtons ? html`
            <button id="nextTab" aria-label="Scroll right" ?disabled="${!this._overflowOnRight}" @click="${this._scrollRight}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
            </button>`
          : html``}
        </div>
        <div id="panels" part="panels">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
