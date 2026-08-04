import {
  LitElement,
  html,
  isServer,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';
import '@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js';

import styles from './pf-v6-button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'link'
  | 'plain'
  | 'control'
  | 'stateful';

export type ButtonSize = 'sm' | 'lg';

export type ButtonState = 'read' | 'unread' | 'attention';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonIconPosition = 'start' | 'end';

export type ButtonHamburgerVariant = 'expand' | 'collapse';

/**
 * A **button** communicates and triggers user actions when clicked or selected.
 * Use buttons for actions such as submitting a form, canceling a process, or
 * navigating to another page. Icon-only buttons MUST provide an `accessible-label`.
 *
 * @summary Triggers an action when activated
 *
 * @slot - Button label text
 * @slot icon - Icon displayed at the start or end of the button
 * @slot count - Count badge displayed after the label
 *
 * @cssprop {<color>} --pf-v6-c-button--BackgroundColor - Button background color
 * @cssprop {<color>} --pf-v6-c-button--Color - Button text color
 * @cssprop {<length>} --pf-v6-c-button--PaddingInlineStart - Inline-start padding
 * @cssprop {<length>} --pf-v6-c-button--PaddingInlineEnd - Inline-end padding
 * @cssprop {<length>} --pf-v6-c-button--FontSize - Button font size
 * @cssprop {<length>} --pf-v6-c-button--BorderRadius - Button border radius
 *
 * @csspart icon - Container for the icon slot and built-in icons
 * @csspart text - Container for the default slot label
 * @csspart count - Container for the count slot
 * @csspart progress - Container for the loading spinner
 */
@customElement('pf-v6-button')
export class PfV6Button extends LitElement {
  static readonly formAssociated = true;

  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Visual style of the button.
   * - Primary: most important call to action; limit to one per page
   * - Secondary: general actions that need less emphasis
   * - Tertiary: classic button format with still less emphasis
   * - Danger: potentially destructive or hard-to-undo actions
   * - Warning: important setting changes that are not destructive
   * - Link: low-emphasis actions or navigation
   * - Plain: icon-labeled actions with no chrome
   * - Control: for pairing with other controls in an input group
   * - Stateful: notification state (`read`, `unread`, `attention`)
   */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Size of the button. Omit for default size. */
  @property({ reflect: true }) size?: ButtonSize;

  /** Native form button type */
  @property({ reflect: true }) type?: ButtonType;

  /** State for the stateful variant. Defaults to unread when variant is stateful. */
  @property({ reflect: true }) state?: ButtonState;

  /** Form value for the button */
  @property() value?: string;

  /** Form element name for the button */
  @property() name?: string;

  /** Accessible name when the button has no visible text */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Disables the button and removes it from the tab order */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * Disables activation while keeping the button focusable.
   * Use when a disabled button still needs a tooltip or other focus treatment.
   */
  @property({ reflect: true, type: Boolean, attribute: 'disabled-focusable' })
  disabledFocusable = false;

  /** Shows a progress spinner and progress styling */
  @property({ reflect: true, type: Boolean }) loading = false;

  /** Accessible label for the loading spinner */
  @property({ attribute: 'loading-label' }) loadingLabel = 'Loading';

  /** Spans the full width of the parent */
  @property({ reflect: true, type: Boolean }) block = false;

  /** Renders a link variant inline with surrounding text */
  @property({ reflect: true, type: Boolean }) inline = false;

  /** Applies danger styling to secondary or link variants */
  @property({ reflect: true, type: Boolean }) danger = false;

  /** Applies clicked styling */
  @property({ reflect: true, type: Boolean }) clicked = false;

  /** Renders as a favorite toggle; overrides the icon slot */
  @property({ reflect: true, type: Boolean }) favorite = false;

  /** Whether the favorite toggle is currently favorited */
  @property({ reflect: true, type: Boolean }) favorited = false;

  /** Renders as a settings button; overrides the icon slot */
  @property({ reflect: true, type: Boolean }) settings = false;

  /** Renders as a hamburger button; overrides the icon slot */
  @property({ reflect: true, type: Boolean }) hamburger = false;

  /** Required when `hamburger` is set; reflects expansion of controlled content */
  @property({ reflect: true, type: Boolean }) expanded?: boolean;

  /** Animates the hamburger icon toward expand or collapse */
  @property({ reflect: true, attribute: 'hamburger-variant' })
  hamburgerVariant?: ButtonHamburgerVariant;

  /** Removes padding from a plain variant for inline icon placement */
  @property({ reflect: true, type: Boolean, attribute: 'no-padding' })
  noPadding = false;

  /** Icon position relative to the label. Defaults to start. */
  @property({ reflect: true, attribute: 'icon-position' })
  iconPosition?: ButtonIconPosition;

  /** When set with `variant="link"`, renders as an anchor */
  @property({ reflect: true }) href?: string;

  /** Target for the link when `href` is set */
  @property({ reflect: true }) target?: string;

  /** Shorthand icon name for the icon slot */
  @property() icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  #internals = InternalsController.of(this);

  #slots = new SlotController(this, 'icon', 'count', null);

  get #disabled() {
    return this.disabled || this.#internals.formDisabled;
  }

  get #operable() {
    return !(this.#disabled || this.disabledFocusable);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.addEventListener('click', this.#onClick);
      this.addEventListener('keydown', this.#onKeydown);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeydown);
  }

  protected override willUpdate(): void {
    const isLink = this.variant === 'link' && !!this.href;
    this.#internals.ariaLabel = this.accessibleLabel || null;
    this.#internals.ariaDisabled =
      this.#disabled || this.disabledFocusable ? 'true' : null;
    this.#internals.ariaExpanded =
      this.expanded === undefined ? null : String(this.expanded);
    this.#internals.setFormValue(
      this.name == null ? null : (this.value ?? ''),
    );

    if (isLink) {
      this.removeAttribute('tabindex');
      this.#internals.role = 'none';
    } else {
      this.#internals.role = 'button';
      if (this.#disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.tabIndex = 0;
      }
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('hamburger') || changed.has('expanded')) {
      if (this.hamburger && this.expanded === undefined) {
        // eslint-disable-next-line no-console
        console.error(
          'pf-v6-button: when hamburger is set, expanded must also be set. '
            + 'A hamburger button is expected to control expansion of other content.'
        );
      }
    }

    if (
      changed.has('settings')
      || changed.has('hamburger')
      || changed.has('favorite')
    ) {
      const iconOnly = this.settings || this.hamburger || this.favorite;
      if (iconOnly && !this.accessibleLabel && !this.#hasTextContent()) {
        // eslint-disable-next-line no-console
        console.error(
          'pf-v6-button: provide visible text or accessible-label for settings, '
            + 'hamburger, and favorite buttons.'
        );
      }
    }

    if (changed.has('disabled')) {
      this.#syncCountBadgeDisabled();
    }
  }

  override render(): TemplateResult<1> {
    const disabled = this.#disabled;
    const hasIcon = this.#hasIcon();
    const hasCount = this.#slots.hasSlotted('count');
    const hasText = this.#hasTextContent();
    const iconAtEnd = this.iconPosition === 'end';
    const showDanger =
      this.variant === 'danger'
      || (this.danger
        && (this.variant === 'secondary' || this.variant === 'link'));

    const classes = {
      [this.variant]: true,
      'settings': this.settings,
      'hamburger': this.hamburger,
      'expand': this.hamburger && this.hamburgerVariant === 'expand',
      'collapse': this.hamburger && this.hamburgerVariant === 'collapse',
      'block': this.block,
      disabled,
      'aria-disabled': this.disabledFocusable,
      'clicked': this.clicked,
      'inline': this.inline && this.variant === 'link',
      'favorite': this.favorite,
      'favorited': this.favorite && this.favorited,
      'danger': showDanger,
      'progress': this.loading && this.variant !== 'plain',
      'in-progress': this.loading,
      'no-padding': this.noPadding && this.variant === 'plain',
      'small': this.size === 'sm',
      'display-lg': this.size === 'lg',
      ...(this.variant === 'stateful' ?
        { [this.state ?? 'unread']: true }
        : {}),
      hasIcon,
      'loading': this.loading,
      'anchor': !!(this.variant === 'link' && this.href),
    };

    const icon = this.#renderIcon(hasText);
    const text = hasText ?
      html`
          <!-- summary: Button label text -->
          <span id="text" part="text" class="text"><slot></slot></span>
        `
      : html`<!-- summary: Button label text --><slot></slot>`;

    const content = html`
      ${this.loading ?
        html`
            <!-- summary: Loading spinner -->
            <span id="progress" part="progress" class="progress">
              <pf-v6-spinner
                size="md"
                ?inline="${this.inline}"
                accessible-label="${this.loadingLabel}"
              ></pf-v6-spinner>
            </span>
          `
        : null}
      ${iconAtEnd ? html`${text}${icon}` : html`${icon}${text}`}
      <!-- summary: Count badge -->
      <span id="count" part="count" class="count" ?hidden="${!hasCount}">
        <!-- summary: Count badge content, typically a pf-v6-badge -->
        <slot name="count"></slot>
      </span>
    `;

    if (this.variant === 'link' && this.href) {
      return html`
        <a
          id="button"
          class="${classMap(classes)}"
          href="${this.href}"
          target="${ifDefined(this.target)}"
          tabindex="${ifDefined(disabled ? -1 : undefined)}"
          aria-disabled="${ifDefined(
            disabled || this.disabledFocusable ? 'true' : undefined
          )}"
          >${content}</a
        >
      `;
    }

    return html`
      <div id="button" class="${classMap(classes)}">${content}</div>
    `;
  }

  async formDisabledCallback(): Promise<void> {
    await this.updateComplete;
    this.requestUpdate();
  }

  #hasIcon(): boolean {
    return (
      this.settings
      || this.hamburger
      || this.favorite
      || this.loading
      || !!this.icon
      || this.#slots.hasSlotted('icon')
    );
  }

  #hasTextContent(): boolean {
    return this.#slots.hasSlotted();
  }

  #syncCountBadgeDisabled(): void {
    if (isServer) {
      return;
    }
    for (const badge of this.querySelectorAll('pf-v6-badge[slot="count"]')) {
      if (this.disabled) {
        badge.setAttribute('disabled', '');
      } else {
        badge.removeAttribute('disabled');
      }
    }
  }

  #renderIcon(hasText: boolean): TemplateResult {
    const hasIcon = this.#hasIcon();
    let iconContent: TemplateResult;

    if (this.favorite) {
      iconContent = this.#renderFavoriteIcons();
    } else if (this.settings) {
      iconContent = this.#renderSettingsIcon();
    } else if (this.hamburger) {
      iconContent = this.#renderHamburgerIcon();
    } else {
      // Always render the slot so SlotController can detect light-DOM icons.
      iconContent = html`
        <slot name="icon">
          <pf-v5-icon
            role="presentation"
            icon="${ifDefined(this.icon)}"
            set="${ifDefined(this.iconSet)}"
            ?hidden="${!this.icon || this.loading}"
          ></pf-v5-icon>
        </slot>
      `;
    }

    return html`
      <!-- summary: Leading or trailing icon -->
      <span
        id="icon"
        part="icon"
        class="${classMap({
          'icon': true,
          'icon-start': hasText && this.iconPosition !== 'end',
          'icon-end': hasText && this.iconPosition === 'end',
        })}"
        ?hidden="${!hasIcon}"
        >${iconContent}</span
      >
    `;
  }

  #renderHamburgerIcon(): TemplateResult {
    return html`
      <svg
        viewBox="0 0 10 10"
        class="hamburger-icon"
        width="1em"
        height="1em"
        aria-hidden="true"
      >
        <path class="hamburger-icon-top" d="M1,1 L9,1"></path>
        <path class="hamburger-icon-middle" d="M1,5 L9,5"></path>
        <path class="hamburger-icon-arrow" d="M1,5 L1,5 L1,5"></path>
        <path class="hamburger-icon-bottom" d="M9,9 L1,9"></path>
      </svg>
    `;
  }

  #renderSettingsIcon(): TemplateResult {
    return html`
      <svg
        viewBox="0 0 512 512"
        class="settings-icon"
        width="1em"
        height="1em"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
        ></path>
      </svg>
    `;
  }

  #renderFavoriteIcons(): TemplateResult {
    return html`
      <span class="icon-favorite">
        <svg viewBox="0 0 576 512" width="1em" height="1em" aria-hidden="true">
          <path
            fill="currentColor"
            d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
          ></path>
        </svg>
      </span>
      <span class="icon-favorited">
        <svg viewBox="0 0 576 512" width="1em" height="1em" aria-hidden="true">
          <path
            fill="currentColor"
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
          ></path>
        </svg>
      </span>
    `;
  }

  #onClick = (event: Event): void => {
    if (!this.#operable) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.variant === 'link' && this.href) {
      return;
    }
    switch (this.type) {
      case 'reset':
        this.#internals.reset();
        break;
      case 'button':
        break;
      default:
        this.#internals.submit();
    }
  };

  #onKeydown = (event: KeyboardEvent): void => {
    if (this.variant === 'link' && this.href) {
      return;
    }
    switch (event.key) {
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        this.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        break;
      case 'Enter':
        this.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        break;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-button': PfV6Button;
  }
}
