import { LitElement, nothing } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import styles from './pfe-popover.scss';

const headingLevels = [2, 3, 4, 5, 6] as const;
type HeadingLevel = typeof headingLevels[number];
type AlertSeverity = 'default' | 'info' | 'warning' | 'success' | 'danger';

/**
 * Popover
 * @slot - Place element content here
 */
@customElement('pfe-popover')
export class PfePopover extends LitElement {
  static readonly styles = [styles];

  @property({ type: String, reflect: true }) position: Placement = 'top';
  @property({ type: String, reflect: true }) heading?: string;
  @property({ type: String, reflect: true }) body = '';
  @property({ type: String, reflect: true }) footer?: string;
  @property({ type: String, reflect: true }) icon?: string;
  @property({ type: String, reflect: true }) label?: string;
  @property({ type: Number, reflect: true, attribute: 'heading-level' }) headingLevel?: HeadingLevel;
  @property({ type: String, reflect: true, attribute: 'icon-set' }) iconSet?: string;
  @property({ type: Boolean, reflect: true, attribute: 'hide-close' }) hideClose?: boolean;
  @property({ type: String, reflect: true, attribute: 'alert-severity' }) alertSeverity?: AlertSeverity;

  @query('#popover') private _popover?: HTMLElement | null;
  @query('#close-button') private _closeButton?: HTMLElement | null;
  @query('#invoker') private _invoker?: HTMLElement | null;

  #float = new FloatingDOMController(this, {
    arrow: () => this.shadowRoot?.querySelector('#arrow'),
    content: () => this.shadowRoot?.querySelector('#popover'),
  });

  #slots = new SlotController(this, { slots: [null, 'icon', 'heading', 'body', 'footer'] });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    document.addEventListener('click', this._outsideClick);
  }

  async show() {
    await this.updateComplete;
    const placement = this.position;
    // todo: determine final offset due to larger arrow size
    // todo: arrow alignment always in the center, which is problematic with wide content
    const offset = !placement?.match(/top|bottom/) ? 35 : { mainAxis: 35, alignmentAxis: -4 };
    await this.#float.show({ offset, placement });
    this._popover?.focus();
  }

  async hide() {
    await this.#float.hide();
  }

  render() {
    const { alignment, anchor, open, styles } = this.#float;
    return html`
      <div
        id="container"
        style="${styleMap(styles)}"
        class="${classMap({
          open,
          [anchor]: !!anchor,
          [alignment]: !!alignment,
        })}"
      >
        <slot id="invoker" @keydown=${this.onKeydown} @click=${this.show}></slot>
        <div
          id="popover"
          role="dialog"
          aria-labelledby="heading"
          aria-describedby="body"
          aria-label=${ifDefined(this.label)}
          ?hidden=${!open}
        >
          <div id="arrow"></div>
          <div id="content" part="content">
            ${this._renderCloseButton()} ${this._renderHeader()} ${this._renderBody()} ${this._renderFooter()}
          </div>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('click', this._outsideClick);
  }

  protected _renderCloseButton() {
    return !this.hideClose ?
      html`
          <pfe-button
            id="close-button"
            label="Close popover"
            part="close-button"
            plain
            @click=${this.hide}
            @keydown=${this.onKeydown}
          >
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
              <path
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </pfe-button>
        `
      : nothing;
  }

  protected _renderFallbackIcon() {
    const alertIcons: Record<AlertSeverity, string> = {
      default: 'bell',
      info: 'circle-info',
      success: 'circle-check',
      warning: 'triangle-exclamation',
      danger: 'circle-exclamation',
    };
    const icon = this.icon ?? (this.alertSeverity ? alertIcons[this.alertSeverity] : nothing);
    return html`<pfe-icon icon=${icon} set=${ifDefined(this.iconSet)} size="md"></pfe-icon>`;
  }

  protected _renderHeading() {
    const headingLevel = headingLevels.find(level => level === this.headingLevel) ?? 6;
    const hasHeading = this.#slots.hasSlotted('heading') || !!this.heading;
    return hasHeading ?
      html`<slot id="heading" name="heading" part="heading"
          >${unsafeStatic(`<h${headingLevel}>${this.heading}</h${headingLevel}>`)}</slot
        >`
      : nothing;
  }

  protected _renderHeader() {
    const hasHeading = this.#slots.hasSlotted('heading') || !!this.heading;
    const hasIcon = this.#slots.hasSlotted('icon') || !!this.icon || !!this.alertSeverity;
    const asHeader = hasHeading && hasIcon;
    return asHeader ?
      html`
          <header part="header">
            <span part="icon">
              <slot name="icon"> ${this._renderFallbackIcon()} </slot>
            </span>
            ${this._renderHeading()}
          </header>
        `
      : html`${this._renderHeading()}`;
  }

  protected _renderBody() {
    return html` <slot id="body" part="body" name="body">${this.body}</slot> `;
  }

  protected _renderFooter() {
    const hasFooter = this.#slots.hasSlotted('footer') || !!this.footer;
    return hasFooter ?
      html`
          <footer part="footer" ?hidden=${!hasFooter}>
            <slot name="footer">${this.footer}</slot>
          </footer>
        `
      : nothing;
  }

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
        // todo: withFocusTrap override option
        if (event.target === this._closeButton) {
          event.preventDefault();
          this._closeButton?.focus();
        }
        return;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.hide();
        return;
      case 'Enter':
        if (event.target === this._invoker) {
          event.preventDefault();
          this.show();
        }
        return;
    }
  }

  // todo: hideOnOutsideClick override option
  @bound private _outsideClick(event: MouseEvent) {
    if (!event.composedPath().includes(this)) {
      this.hide();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-popover': PfePopover;
  }
}
