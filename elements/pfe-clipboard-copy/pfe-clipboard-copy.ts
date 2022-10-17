import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-clipboard-copy.scss';

export type ClipboardCopyVariant = (
  | 'inline'
  | 'inline-compact'
  | 'expansion'
);

export interface ClipboardCopyState {
  text: string | number;
  expanded: boolean;
  copied: boolean;
}

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
@customElement('pfe-clipboard-copy') @pfelement()
export class PfeClipboardCopy extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ reflect: true }) variant: ClipboardCopyVariant = 'inline';
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) block = false;
  @property({ type: Boolean, reflect: true }) code = false;
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: String, reflect: true }) value = '';

  #renderExpandedButton() {
    if (this.expanded) {
      return html`<button id="toggle-80" aria-labelledby="toggle-80 text-input-80" aria-controls="toggle-80 content-80" aria-expanded="true" aria-disabled="false" aria-label="Show content" class="pf-c-button pf-m-control" type="button" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-control-122"><svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg></button>`;
    }
    return html`<button id="toggle-80" aria-labelledby="toggle-80 text-input-80" aria-controls="toggle-80 content-80" aria-expanded="false" aria-disabled="false" aria-label="Show content" class="pf-c-button pf-m-control" type="button" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-control-122"><svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></button>`;
  }

  render() {
    return html`
      <div class=${classMap({
        'pf-c-clipboard-copy': true,
        'pf-m-expanded': this.expanded,
        'pf-m-inline': this.variant === 'inline-compact',
        'pf-m-block': this.block
        })}
      >
        ${this.variant === 'inline-compact' ?
          html`
            ${this.code ?
              html`
                <code class="pf-c-clipboard-copy__text pf-m-code">
                  <slot></slot>
                </code>
              `
              : html`
                <span class="pf-c-clipboard-copy__text">
                  <slot></slot>
                </span>
              `
            }
            <span class="pf-c-clipboard-copy__actions">
              <span class="pf-c-clipboard-copy__actions-item">
                <button id="copy-button-71" aria-labelledby="copy-button-71 text-input-71" aria-disabled="false" aria-label="Copy" class="pf-c-button pf-m-plain" type="button" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-plain-35"><svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg></button>
              </span>
            </span>
          `
          : html`
            <!-- Not inline-compact -->
            <div class="pf-c-clipboard-copy__group">
              ${this.variant === 'expansion' ? this.#renderExpandedButton() : ''}
              <input ?readonly=${this.readonly} value=${this.value}>
              ${this.expanded ?
                html`
                  <button id="copy-button-75" aria-labelledby="copy-button-75 text-input-75" aria-disabled="false" aria-label="Copy" class="pf-c-button pf-m-control" type="button" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-control-113"><svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg></button> `
                : html``
              }
            </div>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}
