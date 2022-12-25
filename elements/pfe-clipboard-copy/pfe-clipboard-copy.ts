import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { BaseClipboardCopy } from './BaseClipboardCopy.js';

import styles from './pfe-clipboard-copy.scss';
import baseStyles from './BaseClipboardCopy.scss';

import '@patternfly/pfe-button';
import '@patternfly/pfe-icon';
import '@patternfly/pfe-tooltip';

const sleep = (ms?: number) => new Promise(r => setTimeout(r, ms));

/**
 * Clipboard Copy
 * @slot - Place content to copy here, or use the `value` attribute
 * @slot actions - Place additional action buttons here
 */
@customElement('pfe-clipboard-copy')
export class PfeClipboardCopy extends BaseClipboardCopy {
  static readonly version = '{{version}}';

  static readonly styles = [baseStyles, styles];

  @property({ attribute: 'click-tip' }) clickTip = 'Copied';

  @property({ attribute: 'hover-tip' }) hoverTip = 'Copy';

  @property({ attribute: 'text-label' }) textAriaLabel = 'Copyable input';

  @property({ attribute: 'toggle-label' }) toggleAriaLabel = 'Show content';

  @property({ type: Number, attribute: 'entry-delay' }) entryDelay = 300;

  @property({ type: Number, attribute: 'exit-delay' }) exitDelay = 1500;

  @property({ type: Boolean, reflect: true }) block = false;

  @property({ type: Boolean, reflect: true }) code = false;

  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * Implies not `inline`.
   */
  @property({ type: Boolean, reflect: true }) expandable = false;

  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Implies not expandable. Overrules `expandable`.
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  @property({ type: Boolean, reflect: true }) compact = false;

  @property() override value = '';

  #copied = false;

  firstUpdated() {
    this.#onSlotchange();
  }

  /**
   * @todo fix the collapsed whitespace between the end of the "inline-compact" variant and the text node.
   * This demonstrates the collapsed whitespace issue.
   * The extra space between the closing slot tag and the closing template literal results in a collapsed whitespace.
   */
  render() {
    const { expanded, expandable, inline, compact, code, block, readonly } = this;
    return html`
      <div id="container" class="${classMap({ code, expanded, inline, compact, block, })}">
        <div id="input-group">
          <pfe-button id="expand-button"
                      plain
                      variant="control"
                      ?inert="${!expandable}"
                      @click="${this.#onClick}">
            <pfe-icon icon="chevron-right"></pfe-icon>
          </pfe-button>
          <input
              ?inert="${inline || expanded}"
              ?disabled="${expanded || readonly}"
              .value="${this.value}"
              @input="${this.#onChange}"
              aria-label="${this.textAriaLabel}">
          <slot id="content-slot"
                ?inert="${inline || expanded}"
                @slotchange="${this.#onSlotchange}"></slot>
          <pfe-tooltip>
            <pfe-button id="copy-button"
                        plain
                        variant="${ifDefined(!inline ? 'control' : undefined)}"
                        label="${this.hoverTip}"
                        @click="${this.copy}">
              <pfe-icon icon="copy"></pfe-icon>
            </pfe-button>
            <span slot="content">${this.#copied ? this.hoverTip : this.clickTip}</span>
          </pfe-tooltip>
          <slot name="actions"></slot>
        </div>
        <textarea .value="${this.value}"
                  .disabled="${this.readonly}"
                  ?inert="${!(expandable && expanded)}"
                  @input="${this.#onChange}">
        </textarea>
      </div>
    `;
  }

  #onClick() {
    this.expanded = !this.expanded;
  }

  #onChange(e: Event) {
    const { value } = e.target as HTMLInputElement || HTMLTextAreaElement;
    this.value = value;
  }

  #onSlotchange(event?: Event) {
    const slot = (event?.target ?? this.shadowRoot?.getElementById('content-slot')) as HTMLSlotElement;
    const nodes = slot?.assignedNodes() ?? [];
    if (nodes.length > 0) {
      this.value = this.getAttribute('value') ?? nodes.map(child =>
        (child instanceof Element || child instanceof Text) ? (child.textContent ?? '') : '')
        .join('');
    }
  }

  override async copy() {
    await super.copy();
    await sleep(this.entryDelay);
    this.#copied = true;
    this.requestUpdate();
    await sleep(this.exitDelay);
    this.#copied = false;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}
