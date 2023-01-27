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
  @property({ type: String, reflect: true }) tile?: string;
  @property({ type: String, reflect: true }) body = '';
  @property({ type: String, reflect: true }) footer?: string;
  @property({ type: String, reflect: true }) icon?: string;
  @property({ type: String, reflect: true }) label?: string;
  @property({ type: Number, reflect: true, attribute: 'heading-level' }) headingLevel?: HeadingLevel;
  @property({ type: String, reflect: true, attribute: 'icon-set' }) iconSet?: string;
  // todo?: use shorter name
  @property({ type: Boolean, reflect: true, attribute: 'no-close-button' }) noCloseButton?: boolean;
  @property({ type: String, reflect: true, attribute: 'alert-severity' }) alertSeverity?: AlertSeverity;

  @query('#popover') private _popover?: HTMLElement | null;
  @query('#close-button') private _closeButton?: HTMLElement | null;
  @query('#invoker') private _invoker?: HTMLElement | null;

  #titleId = getRandomId();
  #bodyId = getRandomId();
  #float = new FloatingDOMController(this, {
    arrow: true,
    content: () => this.shadowRoot?.querySelector('#popover'),
  });

  #slots = new SlotController(this, { slots: [null, 'icon', 'title', 'body', 'footer'] });

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
    const titleId = this.title ? this.#titleId : undefined;
    const { alignment, anchor, open, styles } = this.#float;
    // todo?: not sure if I'm apply the correct values to aria-labelledby/aria-describedby
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
          aria-labelledby=${ifDefined(titleId)}
          aria-describedby=${this.#bodyId}
          aria-label=${ifDefined(this.label)}
          ?hidden=${!open}
        >
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
    return !this.noCloseButton ?
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
    // todo?: do I need to define my own icon set to get correct icons or just add to internal repo?
    const alertIcons: Record<AlertSeverity, string> = {
      default: 'bell',
      info: 'info',
      success: 'check',
      warning: 'exclamation',
      danger: 'dumpster-fire',
    };
    const icon = this.icon ?? (this.alertSeverity ? alertIcons[this.alertSeverity] : nothing);
    return html`<pfe-icon icon=${icon} set=${ifDefined(this.iconSet)} size="md"></pfe-icon>`;
  }

  protected _renderTitle() {
    const headingLevel = headingLevels.find(level => level === this.headingLevel) ?? 6;
    const hasTitle = this.#slots.hasSlotted('title') || !!this.title;
    return hasTitle ?
      html`<slot id="title" name="title" part="title"
          >${unsafeStatic(`<h${headingLevel}>${this.title}</h${headingLevel}>`)}</slot
        >`
      : nothing;
  }

  protected _renderHeader() {
    const hasTitle = this.#slots.hasSlotted('title') || !!this.title;
    const hasIcon = this.#slots.hasSlotted('icon') || !!this.icon || !!this.alertSeverity;
    const asHeader = hasTitle && hasIcon;
    return asHeader ?
      html`
          <header part="header">
            <span part="icon">
              <slot name="icon"> ${this._renderFallbackIcon()} </slot>
            </span>
            ${this._renderTitle()}
          </header>
        `
      : html`${this._renderTitle()}`;
  }

  protected _renderBody() {
    return html`
      <div id=${this.#bodyId} part="body">
        <slot name="body">${this.body}</slot>
      </div>
    `;
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
