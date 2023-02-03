import { LitElement, nothing } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import styles from './pf-popover.css';

const headingLevels = [2, 3, 4, 5, 6] as const;
type HeadingLevel = typeof headingLevels[number];
type AlertSeverity = 'default' | 'info' | 'warning' | 'success' | 'danger';

/**
 * Patternfly popover
 *
 * A Popover displays content in a non-modal dialog and adds contextual information or provides resources via text and links.
 *
 * @summary Toggle the visiblity of helpful or contextual information.
 *
 * @slot - This slot wraps around the element that should be used to invoke the popover content to display. Typically this would be an icon, button, or other small sized element.
 * @slot heading - This slot renders the content that will be displayed inside of the header of the popover. Typically this would be a heading element.
 * @slot icon - This slot renders the icon that will be displayed inside the header of the popover, before the heading.
 * @slot body - This slot renders the content that will be displayed inside of the body of the popover.
 * @slot footer - This slot renders the content that will be displayed inside of the footer of the popover.
 *
 * @csspart container - The component wrapper
 * @csspart content - The content wrapper
 * @csspart header - The header element; only visible if both an icon and heading are provided.
 * @csspart heading - The heading element
 * @csspart icon - The header icon
 * @csspart close-button - The close button
 * @csspart body - The container for the body content.
 * @csspart footer - The container for the footer content.
 *
 * @cssprop {<length>} --pf-c-popover__arrow--Height
 *          Height of the arrow
 *          {@default `1.5625rem`}
 * @cssprop {<length>} --pf-c-popover__arrow--Width
 *          Width of the arrow
 *          {@default `1.5625rem`}
 * @cssprop {<color>} --pf-c-popover__title-text--Color
 *          Heading font color
 *          {@default `inherit`}
 * @cssprop {<color>} --pf-c-popover__title-icon--Color
 *          Heading icon font color
 *          {@default `#151515`}
 * @cssprop {<color>} --pf-c-popover__arrow--BackgroundColor
 *          Arrow background color
 *          {@default `#fff`}
 * @cssprop --pf-c-popover__arrow--BoxShadow
 *          Arrow box shadow
 *          {@default `0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)`}
 * @cssprop --pf-c-popover--BoxShadow
 *          Popover box shadow
 *          {@default `0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingTop
 *          Popover top padding
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingRight
 *          Popover right padding
 *          {@default ``1rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingBottom
 *          Popover bottom padding
 *          {@default ``1rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingLeft
 *          Popover left padding
 *          {@default ``1rem`}
 * @cssprop --pf-c-popover--line-height
 *          Popover line height
 *          {@default `1.5`}
 * @cssprop --pf-c-popover__content--FontSize
 *          Popover font-size
 *          {@default `0.875rem`}
 * @cssprop {<color>} --pf-c-popover__content--BackgroundColor
 *          Popover background color
 *          {@default `#fff`}
 * @cssprop {<length>} --pf-c-popover--MaxWidth
 *          Popover max-width
 *          {@default `20.75rem`}
 * @cssprop {<length>} --pf-c-popover--MinWidth
 *          Popover min-width
 *          {@default `20.75rem`}
 * @cssprop --pf-c-popover--c-button--Right
 *          Close button right position
 *          {@default `0}
 * @cssprop --pf-c-popover--c-button--Top
 *          Close button top position
 *          {@default `0.625rem`}
 * @cssprop {<length>} --pf-c-popover--c-button--sibling--PaddingRight
 *          Padding between close button and it's immediate sibling
 *          {@default `3rem`}
 * @cssprop {<length>} --pf-c-popover__title-icon--MarginRight
 *          Heading icon right margin
 *          {@default `0.5rem`}
 * @cssprop --pf-c-popover__title--FontSize
 *          Header font-size
 *          {@default `1rem`}
 * @cssprop --pf-c-popover__title--MarginBottom
 *          Header bottom margin
 *          {@default `0.5rem`}
 * @cssprop --pf-c-popover__title--LineHeight
 *          Header line height
 *          {@default `1.5`}
 * @cssprop --pf-c-popover__title--FontFamily
 *          Header font-family
 *          {@default `'RedHatDisplay', 'Overpass', overpass, helvetica, arial, sans-serif`}
 * @cssprop --pf-c-popover__footer--MarginTop
 *          Footer top margin
 *          {@default `1rem`}
 * @cssprop {<color>} --pf-c-popover--m-default__title-text--Color
 *          Default alert heading color
 *          {@default `#003737`}
 * @cssprop {<color>} --pf-c-popover--m-default__title-icon--Color
 *          Default alert icon color
 *          {@default `#009596`}
 * @cssprop {<color>} --pf-c-popover--m-info__title-text--Color
 *          Default alert heading color
 *          {@default `#002952`}
 * @cssprop {<color>} --pf-c-popover--m-info__title-icon--Color
 *          Default alert icon color
 *          {@default `#2b9af3`}
 * @cssprop {<color>} --pf-c-popover--m-warning__title-text--Color
 *          Default alert heading color
 *          {@default `#795600`}
 * @cssprop {<color>} --pf-c-popover--m-warning__title-icon--Color
 *          Default alert icon color
 *          {@default `#f0ab00`}
 * @cssprop {<color>} --pf-c-popover--m-success__title-text--Color
 *          Default alert heading color
 *          {@default `#1e4f18`}
 * @cssprop {<color>} --pf-c-popover--m-success__title-icon--Color
 *          Default alert icon color
 *          {@default `#3e8635`}
 * @cssprop {<color>} --pf-c-popover--m-danger__title-text--Color
 *          Default alert heading color
 *          {@default `#a30000`}
 * @cssprop {<color>} --pf-c-popover--m-danger__title-icon--Color
 *          Default alert icon color
 *          {@default `#c9190b`}
 */
@customElement('pf-popover')
export class PfPopover extends LitElement {
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
    content: () => this.shadowRoot?.querySelector('#popover'),
    arrow: () => this.shadowRoot?.querySelector('#arrow')
  });

  #slots = new SlotController(this, { slots: [null, 'icon', 'heading', 'body', 'footer'] });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    document.addEventListener('click', this._outsideClick);
  }

  /**
   * Shows the popover
   * @return resolves when the update completes
   */
  async show() {
    await this.updateComplete;
    const placement = this.position;
    const offset = 35;
    await this.#float.show({ offset, placement });
    this._popover?.focus();
  }

  /**
   * Hides the popover
   * @return resolves when the update completes
   */
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
          <pf-button
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
          </pf-button>
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
    return html`<pf-icon icon=${icon} set=${ifDefined(this.iconSet)} size="md"></pf-icon>`;
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

  @bound private _outsideClick(event: MouseEvent) {
    if (!event.composedPath().includes(this)) {
      this.hide();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-popover': PfPopover;
  }
}
