import { LitElement, nothing } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent, StringListConverter } from '@patternfly/pfe-core/core.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import '@patternfly/elements/pf-button/pf-button.js';
import styles from './pf-popover.css';

const alertIcons: Record<AlertSeverity, string> = {
  default: 'bell',
  info: 'circle-info',
  success: 'circle-check',
  warning: 'triangle-exclamation',
  danger: 'circle-exclamation',
};

const headingLevels = [2, 3, 4, 5, 6] as const;

type HeadingLevel = (typeof headingLevels)[number];

type AlertSeverity = 'default' | 'info' | 'warning' | 'success' | 'danger';

export class PopoverHideEvent extends ComposedEvent {
  constructor() {
    super('hide');
  }
}

export class PopoverHiddenEvent extends ComposedEvent {
  constructor() {
    super('hidden');
  }
}

export class PopoverShowEvent extends ComposedEvent {
  constructor() {
    super('show');
  }
}

export class PopoverShownEvent extends ComposedEvent {
  constructor() {
    super('shown');
  }
}

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
 * @csspart body - The container for the body content
 * @csspart footer - The container for the footer content
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
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingBottom
 *          Popover bottom padding
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingLeft
 *          Popover left padding
 *          {@default `1rem`}
 * @cssprop {<number>} --pf-c-popover--line-height
 *          Popover line height
 *          {@default `1.5`}
 * @cssprop {<length>} --pf-c-popover__content--FontSize
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
 * @cssprop {<number>} --pf-c-popover--c-button--Right
 *          Close button right position
 *          {@default `0}
 * @cssprop {<number>} --pf-c-popover--c-button--Top
 *          Close button top position
 *          {@default `0`}
 * @cssprop {<length>} --pf-c-popover--c-button--sibling--PaddingRight
 *          Padding between close button and its immediate sibling
 *          {@default `3rem`}
 * @cssprop {<length>} --pf-c-popover__title-icon--MarginRight
 *          Heading icon right margin
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-popover__title--FontSize
 *          Header font-size
 *          {@default `1rem`}
 * @cssprop {<length>} --pf-c-popover__title--MarginBottom
 *          Header bottom margin
 *          {@default `0.5rem`}
 * @cssprop {<number>} --pf-c-popover__title--LineHeight
 *          Header line height
 *          {@default `1.5`}
 * @cssprop {<string>} --pf-c-popover__title--FontFamily
 *          Header font-family
 *          {@default `'RedHatDisplay', 'Overpass', overpass, helvetica, arial, sans-serif`}
 * @cssprop {<length>} --pf-c-popover__footer--MarginTop
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

  private static _instances = new Set<PfPopover>();

  /**
   * `position` inidicates the initial popover position.
   * There are 12 options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`,
   * `bottom-start`, `bottom-end`, `left-start`, `left-end`,`right-start`, `right-end`.
   * The default is `top`.
   */
  @property({ reflect: true }) position: Placement = 'top';

  /**
   * The content rendered in the popover's heading.
   */
  @property({ reflect: true }) heading?: string;

  /**
   * The content rendered in the popover's body. The default is `''`.
   */
  @property({ reflect: true }) body = '';

  /**
   * The content rendered in the popover's footer.
   */
  @property({ reflect: true }) footer?: string;

  /**
   * The icon placed before the popover's heading.
   */
  @property({ reflect: true }) icon?: string;

  /**
   * The accessible label for the popover. This is required if the no heading is set.
   */
  @property({ reflect: true }) label?: string;

  /**
   * The distance to set between the popover and its trigger element.
   */
  @property({ type: Number, reflect: true }) distance?: number;

  /**
   * The flip order when flip is enabled and the initial position is not possible.
   * There are 12 options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`,
   * `bottom-start`, `bottom-end`, `left-start`, `left-end`,`right-start`, `right-end`.
   * The default is [oppositePlacement], where only the opposite placement is tried.
   */
  @property({ attribute: 'flip-behavior', converter: StringListConverter }) flipBehavior?: Placement[];

  /**
   * Disable the flip behavior. The default is `false`.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-flip' }) noFlip?: boolean;

  /**
   * The heading level to use for the popover's header. The default is `h6`.
   */
  @property({ type: Number, reflect: true, attribute: 'heading-level' }) headingLevel?: HeadingLevel;

  /**
   * Indicates which icon set to use for the header's icon. The default is `fas` (Font Awesome Free Solid).
   */
  @property({ reflect: true, attribute: 'icon-set' }) iconSet?: string;

  /**
   * Hide the close button. The default is `false`.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close' }) hideClose?: boolean;

  /**
   * Indicates the severity variant to use for the alert popover. There are five options: `default`, `info`,
   * `warning`, `success`, and `danger`.
   */
  @property({ reflect: true, attribute: 'alert-severity' }) alertSeverity?: AlertSeverity;

  /**
   * The accessible label for the popover's close button. The default is `Close popover`.
   */
  @property({ reflect: true, attribute: 'close-label' }) closeButtonLabel?: string;

  /**
   * The text announced by the screen reader to indicate the popover's severity.
   * The default is `{alertSeverity} alert:`.
   */
  @property({ reflect: true, attribute: 'alert-severity-text' }) alertSeverityText?: string;

  /**
   * Trap focus in the popover.
   */
  @property({ type: Boolean, reflect: true, attribute: 'focus-trap' }) focusTrap?: boolean;

  /**
   * Don't hide the popover when clicking ouside of it.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-outside-click' }) noOutsideClick?: boolean;

  /**
   * The ID of the element to attach the popover to.
   */
  @observed
  @property({ reflect: true }) trigger?: string;

  @query('#popover') private _popover!: HTMLDialogElement;
  @query('#trigger') private _slottedTrigger?: HTMLElement | null;
  @query('#arrow') private _arrow!: HTMLDivElement;
  @query('#content') private _content!: HTMLDivElement;
  @query('#close-button') private _closeButton!: HTMLButtonElement;

  #referenceTrigger?: HTMLElement | null = null;

  #float = new FloatingDOMController(this, {
    content: () => this._popover,
    arrow: () => this._arrow,
    invoker: () => this.#referenceTrigger || this._slottedTrigger,
  });

  #slots = new SlotController(this, null, 'icon', 'heading', 'body', 'footer');

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._onKeydown);
    !this.noOutsideClick && document.addEventListener('click', this._outsideClick);
    PfPopover._instances.add(this);
  }

  render() {
    const { alignment, anchor, styles } = this.#float;

    const hasIcon = this.#slots.hasSlotted('icon') || !!this.icon || !!this.alertSeverity;
    const fallbackIcon = this.icon ?? (this.alertSeverity ? alertIcons[this.alertSeverity] : nothing);

    const screenReaderText = this.alertSeverity ?
      html`<span class="sr-only">${this.alertSeverityText ?? `${this.alertSeverity} alert:`}</span>`
      : nothing;

    const hasHeading = this.#slots.hasSlotted('heading') || !!this.heading;
    const headingLevel = headingLevels.find(level => level === this.headingLevel) ?? 6;
    const heading = html`<slot id="heading" name="heading" part="heading" ?hidden=${!hasHeading}
      >${unsafeStatic(`<h${headingLevel}>${this.heading ?? ''}</h${headingLevel}>`)}</slot
    >`;
    const asHeader = hasHeading && hasIcon;
    const header = asHeader ?
      html`
          <header part="header">
            <span part="icon">
              <slot name="icon"><pf-icon icon=${fallbackIcon} set=${ifDefined(this.iconSet)} size="md"></pf-icon></slot>
            </span>
            ${screenReaderText} ${heading}
          </header>
        `
      : html`${heading}`;

    const hasFooter = this.#slots.hasSlotted('footer') || !!this.footer;

    return html`
      <div
        id="container"
        style="${styleMap(styles)}"
        class="${classMap({ [anchor]: !!anchor, [alignment]: !!alignment })}"
      >
        <slot id="trigger" @keydown=${this._onKeydown} @click=${this.toggle}></slot>
        <dialog id="popover" aria-labelledby="heading" aria-describedby="body" aria-label=${ifDefined(this.label)}>
          <div id="arrow"></div>
          <div id="content" part="content">
            <pf-button
              id="close-button"
              label=${this.closeButtonLabel ?? 'Close popover'}
              part="close-button"
              plain
              @click=${this.hide}
              @keydown=${this._onKeydown}
              ?hidden=${this.hideClose}
            >
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
                <path
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </pf-button>
            ${header}
            <slot id="body" part="body" name="body">${this.body}</slot>
            <footer part="footer" ?hidden=${!hasFooter}>
              <slot name="footer">${this.footer}</slot>
            </footer>
          </div>
        </dialog>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClick);
    PfPopover._instances.delete(this);
    this.#referenceTrigger?.removeEventListener('click', this.show);
    this.#referenceTrigger?.removeEventListener('keydown', this._onKeydown);
  }

  @bound private _onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.hide();
        return;
      case 'Enter':
        if (event.target === this.#referenceTrigger || event.target === this._slottedTrigger) {
          event.preventDefault();
          this.show();
        }
        return;
    }
  }

  @bound private _outsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this) && !path.includes(this.#referenceTrigger as HTMLElement)) {
      this.hide();
    }
  }

  /**
   * Removes event listeners from the old trigger element and attaches
   * them to the new trigger element.
   * @param oldValue
   * @param newValue
   */
  protected _triggerChanged(oldValue?: string, newValue?: string) {
    if (oldValue) {
      this.#referenceTrigger?.removeEventListener('click', this.show);
      this.#referenceTrigger?.removeEventListener('keydown', this._onKeydown);
    }
    if (newValue) {
      this.#referenceTrigger = (this.getRootNode() as Document | ShadowRoot).getElementById(newValue);
      this.#referenceTrigger?.addEventListener('click', this.show);
      this.#referenceTrigger?.addEventListener('keydown', this._onKeydown);
    }
  }

  /**
   * Toggle the popover
   */
  @bound async toggle() {
    this.#float.open ? this.hide() : this.show();
  }

  /**
   * Opens the popover
   */
  @bound async show() {
    this.dispatchEvent(new PopoverShowEvent());
    await this.updateComplete;
    await this.#float.show({
      offset: this.distance ?? 25,
      placement: this.position,
      flip: !(this.noFlip ?? false),
      fallbackPlacements: this.flipBehavior,
    });
    this.focusTrap ? this._popover?.showModal() : this._popover?.show();
    this.dispatchEvent(new PopoverShownEvent());
  }

  /**
   * Closes the popover
   */
  @bound async hide() {
    this.dispatchEvent(new PopoverHideEvent());
    await this.#float.hide();
    this._popover?.close();
    this.dispatchEvent(new PopoverHiddenEvent());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-popover': PfPopover;
  }
}
