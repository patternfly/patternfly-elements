import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { BaseClipboardCopy } from './BaseClipboardCopy.js';

import styles from './pf-clipboard-copy.css';

import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-tooltip/pf-tooltip.js';

const sleep = (ms?: number) => new Promise(r => setTimeout(r, ms));

/**
 * The **clipboard copy** component allows users to quickly and easily copy content to their clipboard.
 * @slot - Place content to copy here, or use the `value` attribute
 * @slot actions - Place additional action buttons here
 */
@customElement('pf-clipboard-copy')
export class PfClipboardCopy extends BaseClipboardCopy {
  static readonly styles = [...BaseClipboardCopy.styles, styles];

  static override readonly shadowRootOptions = {
    ...BaseClipboardCopy.shadowRootOptions,
    delegatesFocus: true,
  };

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

  #mo = new MutationObserver(() => this.#onMutation());

  connectedCallback() {
    super.connectedCallback();
    this.#mo.observe(this, { characterData: true });
    this.#onMutation();
  }

  /**
   * @todo fix the collapsed whitespace between the end of the "inline-compact" variant and the text node.
   * This demonstrates the collapsed whitespace issue.
   * The extra space between the closing slot tag and the closing template literal results in a collapsed whitespace.
   */
  render() {
    const { expanded, expandable, inline, compact, code, block, readonly } = this;
    return html`
      <div class="container ${classMap({ code, expanded, inline, compact, block })}">
        <div id="input-group">
          <div id="wrapper">
            <pf-button id="expand-button"
                        plain
                        variant="control"
                        label="EXPAND"
                        ?inert="${!expandable}"
                        @click="${this.#onClick}">
              <pf-icon icon="chevron-right"></pf-icon>
            </pf-button>
          </div>
          <span ?hidden="${!(inline || compact)}">${this.value}</span>
          <input
              ?hidden="${inline || compact}"
              ?disabled="${expanded || readonly}"
              .value="${this.value}"
              @input="${this.#onChange}"
              aria-label="${this.textAriaLabel}">
          <pf-tooltip>
            <pf-button id="copy-button"
                        plain
                        variant="${ifDefined(!(inline || compact) ? 'control' : undefined)}"
                        label="${this.hoverTip}"
                        size="lg"
                        @click="${this.copy}">
              <pf-icon icon="copy"></pf-icon>
            </pf-button>
            <span slot="content">${this.#copied ? this.clickTip : this.hoverTip}</span>
          </pf-tooltip>
          <slot name="actions"></slot>
        </div>
        <textarea .value="${this.value}"
                  .disabled="${this.readonly}"
                  ?hidden="${!(expandable && expanded)}"
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

  #onMutation() {
    if (this.childNodes.length > 0) {
      this.value = this.getAttribute('value') ?? this.#dedent(Array.from(this.childNodes, child =>
        (child instanceof Element || child instanceof Text) ? (child.textContent ?? '') : '')
          .join(''));
    }
  }

  #dedent(str: string): string {
    const stripped = str.replace(/^\n/, '');
    const match = stripped.match(/^\s+/);
    return match ? stripped.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str;
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
    'pf-clipboard-copy': PfClipboardCopy;
  }
}
