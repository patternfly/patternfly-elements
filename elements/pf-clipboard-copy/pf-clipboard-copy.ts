import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './pf-clipboard-copy.css';
import formControlStyles from '../form-control.css';

import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-tooltip/pf-tooltip.js';

const sleep = (ms?: number) => new Promise(r => setTimeout(r, ms));

export class PfClipboardCopyCopiedEvent extends Event {
  constructor(public text: string) {
    super('copy', { bubbles: true });
  }
}

/**
 * The **clipboard copy** component allows users to quickly and easily copy content to their clipboard.
 * @slot - Place content to copy here, or use the `value` attribute
 * @slot actions - Place additional action buttons here
 * @fires {PfClipboardCopyCopiedEvent} copy - when the text snippet is successfully copied.
 */
@customElement('pf-clipboard-copy')
export class PfClipboardCopy extends LitElement {
  static readonly styles = [formControlStyles, styles];

  static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Tooltip message to display when clicking the copy button */
  @property({ attribute: 'click-tip' }) clickTip = 'Successfully copied to clipboard!';

  /** Tooltip message to display when hover the copy button */
  @property({ attribute: 'hover-tip' }) hoverTip = 'Copy to clipboard';

  /** Accessible label to use on the text input. */
  @property({ attribute: 'accessible-text-label' }) accessibleTextLabel = 'Copyable input';

  /** Accessible label to use on the toggle button. */
  @property({ attribute: 'accessible-toggle-label' }) accessibleToggleLabel = 'Show content';

  /** Delay in ms before the tooltip appears. */
  @property({ type: Number, attribute: 'entry-delay' }) entryDelay = 300;

  /** Delay in ms before the tooltip disappears. */
  @property({ type: Number, attribute: 'exit-delay' }) exitDelay = 1500;

  /** Flag to determine if inline clipboard copy should be block styling */
  @property({ type: Boolean, reflect: true }) block = false;

  /** Flag to determine if clipboard copy content includes code */
  @property({ type: Boolean, reflect: true }) code = false;

  /** Flag to determine if clipboard copy is in the expanded state */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Implies not `inline`. */
  @property({ type: Boolean, reflect: true }) expandable = false;

  /** Flag to show if the input is read only. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Implies not expandable. Overrules `expandable`. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Flag to determine if inline clipboard copy should have compact styling */
  @property({ type: Boolean, reflect: true }) compact = false;

  /** String to copy */
  @property() value = '';

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
      <div id="container" class="${classMap({ code, expanded, inline, compact, block })}">
        <div id="input-group">
          <div id="wrapper">
            <pf-button id="expand-button"
                       variant="control"
                       label="EXPAND"
                       ?inert="${!expandable}"
                       @click="${this.#onClick}">
              <pf-icon icon="chevron-right"></pf-icon>
            </pf-button>
          </div>
          <span ?hidden="${!(inline || compact)}">${this.value}</span>
          <input aria-label="${this.accessibleTextLabel}"
                 ?hidden="${inline || compact}"
                 ?disabled="${expanded || readonly}"
                 .value="${this.value}"
                 @input="${this.#onChange}">
          <pf-tooltip>
            <pf-button id="copy-button"
                       icon="copy"
                       ?plain="${inline || compact}"
                       variant="${ifDefined(!(inline || compact) ? 'control' : undefined)}"
                       label="${this.hoverTip}"
                       @click="${this.copy}">
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

  /**
   * Copy the current value to the clipboard.
   */
  async copy() {
    await navigator.clipboard.writeText(this.value);
    this.dispatchEvent(new PfClipboardCopyCopiedEvent(this.value));
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
