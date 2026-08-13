import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pf-v6-label.css';

/**
 * Non-status label colors.
 * `'grey'` is the default when no `color` attribute is set;
 * setting `color="grey"` explicitly is valid but has no visual effect
 * beyond the default.
 */
export type LabelColor =
  | 'blue'
  | 'teal'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'orangered'
  | 'grey'
  | 'yellow';

export type LabelVariant =
  | 'filled'
  | 'outline';

export type LabelStatus =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'custom';

export class LabelCloseEvent extends Event {
  constructor() {
    super('close', { bubbles: true, cancelable: true });
  }
}

/**
 * A label is a compact element for categorization, status, or metadata.
 * Labels provide a visual way to describe or tag items using keywords.
 * Use labels when you need short, descriptive annotations for content.
 *
 * Supports filled/outlined variants, 9 non-status colors, 5 status
 * colors (with icons), close button, link/clickable, compact size,
 * and truncation.
 *
 * Label replaces the v5 Chip component — there is no separate
 * `pf-v6-chip`; use Label for all chip/tag use cases.
 *
 * @summary Compact tag for categorization, status, or metadata display.
 *
 * @fires {LabelCloseEvent} close - Fired when the close button is activated on a removable label. Call `event.preventDefault()` to prevent the label from being removed from the DOM.
 */
@customElement('pf-v6-label')
export class PfV6Label extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** Focus the first interactive child (link, button, close) when the host receives focus. */
  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Label fill style: filled (default) or outlined with a border. */
  @property({ reflect: true }) variant?: LabelVariant;

  /**
   * Non-status color for the label. When unset, defaults to grey.
   * Overridden by `status` when both are set.
   */
  @property({ reflect: true }) color?: LabelColor;

  /**
   * Semantic status of the label. Provides a status icon and overrides `color`.
   */
  @property({ reflect: true }) status?: LabelStatus;

  /** Renders the label at a smaller, compact size. */
  @property({ type: Boolean, reflect: true }) compact = false;

  /**
   * Disables the label. Only applies when `href` or `clickable` is set.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * When set, the label renders as an anchor link.
   * Mutually exclusive with `clickable`.
   */
  @property({ reflect: true }) href?: string;

  /**
   * Makes the label interactive as a button.
   * Mutually exclusive with `href`.
   */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /** Shows a close button. Emits a `close` event when activated. */
  @property({ type: Boolean, reflect: true }) removable = false;

  /**
   * Accessible label for the close button.
   * Defaults to "Close".
   */
  @property({ attribute: 'close-button-label' }) closeButtonLabel?: string;

  /** Truncates the label text with an ellipsis when it overflows. */
  @property({ type: Boolean, reflect: true }) truncated = false;

  /**
   * Maximum width for the label text before truncation.
   * Accepts any CSS length, e.g. `"16ch"`, `"100px"`.
   */
  @property({ attribute: 'text-max-width' }) textMaxWidth?: string;

  /**
   * Styles the label as a "+N more" overflow indicator (used by label groups).
   */
  @property({ type: Boolean, reflect: true }) overflow = false;

  #slots = new SlotController(this, null, 'icon');

  get #hasIcon(): boolean {
    return !!this.status || this.#slots.hasSlotted('icon');
  }

  override render(): TemplateResult {
    const textStyle = this.textMaxWidth ?
      `max-width:${this.textMaxWidth}`
      : undefined;
    return html`
      <span id="container">
        <span id="icon"
              ?hidden="${!this.#hasIcon}"
              aria-hidden="true">
          <!-- summary: Icon placed before the label text. Slotted content overrides the default status icon. -->
          <slot name="icon">${!this.status ? html`` : this.#renderStatusIcon()}</slot>
        </span>
        ${!this.href ? html`` : html`
        <a id="content"
           href="${ifDefined(this.disabled ? undefined : this.href)}"
           aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
           tabindex="${this.disabled ? -1 : 0}">
          <span id="text" style="${ifDefined(textStyle)}"><slot></slot></span>
        </a>`}
        ${!(!this.href && this.clickable) ? html`` : html`
        <button id="content"
                type="button"
                ?disabled="${this.disabled}">
          <span id="text" style="${ifDefined(textStyle)}"><slot></slot></span>
        </button>`}
        ${!(!this.href && !this.clickable) ? html`` : html`
        <span id="content">
          <span id="text" style="${ifDefined(textStyle)}"><slot></slot></span>
        </span>`}
        ${!this.removable ? html`` : html`
        <button id="close"
                type="button"
                aria-label="${this.closeButtonLabel ?? 'Close'}"
                ?disabled="${this.disabled}"
                @click="${this.#onClose}">
          <svg viewBox="0 0 384 512" aria-hidden="true">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"/>
          </svg>
        </button>`}
      </span>
    `;
  }

  #renderStatusIcon(): TemplateResult {
    switch (this.status) {
      case 'success':
        return html`<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
      case 'warning':
        return html`<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0-64 0 32 32 0 1 0 64 0z"/></svg>`;
      case 'danger':
        return html`<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm-32 224a32 32 0 1 0 64 0 32 32 0 1 0-64 0z"/></svg>`;
      case 'info':
        return html`<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
      case 'custom':
        return html`<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm-40.4-203.9L161 233.4c-6.6-10.5-3.5-24.4 7-31.1s24.4-3.5 31.1 7l33 52.6 73.4-117.5c6.6-10.5 20.5-13.7 31.1-7s13.7 20.5 7 31.1l-89.7 143.6c-4.1 6.6-11.3 10.6-19.1 10.6s-15.1-4-19.2-10.6z"/></svg>`;
      default:
        return html``;
    }
  }

  #onClose() {
    if (this.removable && this.dispatchEvent(new LabelCloseEvent())) {
      this.remove();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-label': PfV6Label;
  }
}
