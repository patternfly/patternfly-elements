import {
  LitElement,
  html,
  isServer,
  type ComplexAttributeConverter,
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

/** `left` / `right` are deprecated aliases for `start` / `end` (React parity). */
export type ButtonIconPosition = 'start' | 'end' | 'left' | 'right';

export type ButtonHamburgerVariant = 'expand' | 'collapse';

/**
 * Tri-state loading converter matching React `isLoading`:
 * - attribute absent → `null` (no progress layout)
 * - `loading` / `loading=""` / `loading="true"` → `true` (spinner + in-progress)
 * - `loading="false"` → `false` (reserved progress padding, no spinner)
 */
const loadingConverter: ComplexAttributeConverter<boolean | null> = {
  fromAttribute(value) {
    if (value === null) {
      return null;
    }
    if (value === 'false') {
      return false;
    }
    return true;
  },
  toAttribute(value) {
    if (value === null) {
      return null;
    }
    if (value === false) {
      return 'false';
    }
    return '';
  },
};

/**
 * A **button** communicates and triggers user actions when clicked or selected.
 * Use buttons for actions such as submitting a form, canceling a process, or
 * navigating to another page. Icon-only buttons MUST provide an `accessible-label`.
 *
 * This is a Form-Associated Custom Element (FACE). Form participation and ARIA
 * (`role`, `aria-label`, `aria-disabled`, `aria-expanded`) are managed through
 * `ElementInternals` via `InternalsController` — not a slotted native `<button>`.
 *
 * @summary Triggers an action when activated
 * @alias Button
 *
 * @slot - Button label text
 * @slot icon - Icon displayed at the start or end of the button
 * @slot count - Count badge displayed after the label
 *
 * @cssprop {<color>} --pf-v6-c-button--BackgroundColor - Button background color
 * @cssprop {<color>} --pf-v6-c-button--Color - Button text color
 * @cssprop {<color>} --pf-v6-c-button--BorderColor - Button border color
 * @cssprop {<length>} --pf-v6-c-button--BorderWidth - Button border width
 * @cssprop {<length>} --pf-v6-c-button--BorderRadius - Button border radius
 * @cssprop {<length>} --pf-v6-c-button--FontSize - Button font size
 * @cssprop {<length>} --pf-v6-c-button--PaddingBlockStart - Block-start padding
 * @cssprop {<length>} --pf-v6-c-button--PaddingBlockEnd - Block-end padding
 * @cssprop {<length>} --pf-v6-c-button--PaddingInlineStart - Inline-start padding
 * @cssprop {<length>} --pf-v6-c-button--PaddingInlineEnd - Inline-end padding
 * @cssprop {<color>} --pf-v6-c-button__icon--Color - Icon color
 * @cssprop {<color>} --pf-v6-c-button--hover--BackgroundColor - Hover background
 * @cssprop {<color>} --pf-v6-c-button--m-clicked--BackgroundColor - Clicked background
 * @cssprop {<length>} --pf-v6-c-button--m-circle--BorderRadius - Circle variant border radius
 *
 * @csspart button - Main button surface (inner control chrome)
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

  /**
   * Native form button type. Defaults to `button` (does not submit), matching
   * React `Button`. Set `type="submit"` or `type="reset"` for form actions.
   */
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

  /**
   * Progress state (React `isLoading` tri-state):
   * - omit / `null` — no progress layout
   * - `true` / `loading` — show spinner and in-progress styling
   * - `false` / `loading="false"` — reserve progress padding without a spinner
   */
  @property({ reflect: true, converter: loadingConverter })
  loading: boolean | null = null;

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

  /** Renders a circular shape instead of a pill; intended for icon-only buttons */
  @property({ reflect: true, type: Boolean }) circle = false;

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

  /**
   * Icon position relative to the label. Defaults to start.
   * `left` / `right` are accepted as deprecated aliases for `start` / `end`.
   */
  @property({ reflect: true, attribute: 'icon-position' })
  iconPosition?: ButtonIconPosition;

  /** Renders the button as an anchor, regardless of variant */
  @property({ reflect: true }) href?: string;

  /** Target for the link when `href` is set */
  @property({ reflect: true }) target?: string;

  /** Shorthand icon name for the icon slot */
  @property() icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  #internals = InternalsController.of(this);

  #slots = new SlotController(this, 'icon', 'count', null);

  /** Owning form via ElementInternals when `formAssociated` is true. */
  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

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
    const isLink = !!this.href;
    this.#internals.ariaLabel = this.accessibleLabel || null;
    this.#internals.ariaDisabled =
      this.#disabled || this.disabledFocusable ? 'true' : null;
    this.#internals.ariaExpanded =
      this.expanded === undefined ? null : String(this.expanded);
    this.#internals.ariaPressed = this.favorite ? String(this.favorited) : null;
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

    // Checked on every update (not gated to specific properties) since a
    // slotted icon can change without any reactive property changing.
    // Uses `textContent` directly rather than `#hasTextContent()`: SlotController
    // populates its slot records asynchronously, so `hasSlotted()` under-reports
    // on the very first render even when light-DOM text is already present.
    if (
      this.#hasIcon()
      && !this.textContent?.trim()
      && !this.accessibleLabel
    ) {
      // eslint-disable-next-line no-console
      console.error(
        'pf-v6-button: icon-only buttons must provide an `accessible-label`.'
      );
    }

    if (changed.has('disabled')) {
      this.#syncCountBadgeDisabled();
    }
  }

  override render(): TemplateResult<1> {
    const disabled = this.#disabled;
    const hasCount = this.#slots.hasSlotted('count');
    const hasText = this.#hasTextContent();
    const iconAtEnd =
      this.iconPosition === 'end' || this.iconPosition === 'right';
    const isLoading = this.loading === true;
    const showProgress = this.loading !== null && this.variant !== 'plain';
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
      'circle': this.circle,
      disabled,
      'aria-disabled': this.disabledFocusable,
      'clicked': this.clicked,
      'inline': this.inline && this.variant === 'link',
      'favorite': this.favorite,
      'favorited': this.favorite && this.favorited,
      'danger': showDanger,
      'progress': showProgress,
      'in-progress': isLoading,
      'no-padding': this.noPadding && this.variant === 'plain',
      'small': this.size === 'sm',
      'display-lg': this.size === 'lg',
      ...(this.variant === 'stateful' ?
        { [this.state ?? 'unread']: true }
        : {}),
      'loading': isLoading,
      'anchor': !!this.href,
    };

    const icon = this.#renderIcon(hasText);
    const text = hasText ?
      html`
          <!-- summary: Button label text -->
          <span id="text" part="text" class="text"><slot></slot></span>
        `
      : html`<!-- summary: Button label text --><slot></slot>`;

    const content = html`
      ${isLoading ?
        html`
            <!-- summary: Loading spinner -->
            <span id="progress" part="progress" class="progress">
              <pf-v6-spinner
                size="md"
                ?inline="${this.inline}"
                accessible-label="${this.loadingLabel}"
                value-text="${this.loadingLabel}"
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

    if (this.href) {
      return html`
        <a
          id="button"
          part="button"
          class="${classMap(classes)}"
          href="${this.href}"
          target="${ifDefined(this.target)}"
          tabindex="${ifDefined(disabled ? -1 : undefined)}"
          aria-label="${ifDefined(this.accessibleLabel)}"
          aria-disabled="${ifDefined(
            disabled || this.disabledFocusable ? 'true' : undefined
          )}"
          >${content}</a
        >
      `;
    }

    return html`
      <div id="button" part="button" class="${classMap(classes)}">${content}</div>
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
            ?hidden="${!this.icon || this.loading === true}"
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
        viewBox="0 0 32 32"
        class="settings-icon"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M26.463 16.845a9.635 9.635 0 0 0-.002-1.688l3.41-1.974a.5.5 0 0 0 .235-.548 14.47 14.47 0 0 0-4.142-7.167.5.5 0 0 0-.594-.07l-3.404 1.97c-.469-.326-.96-.61-1.466-.85V2.58a.5.5 0 0 0-.356-.48 14.662 14.662 0 0 0-8.288 0 .5.5 0 0 0-.356.48v3.944c-.513.245-1.003.528-1.462.846L6.63 5.397a.5.5 0 0 0-.594.07 14.47 14.47 0 0 0-4.142 7.168.5.5 0 0 0 .236.548l3.407 1.972a9.635 9.635 0 0 0 .002 1.688l-3.41 1.974a.5.5 0 0 0-.235.548 14.47 14.47 0 0 0 4.142 7.167c.16.154.405.18.594.07l3.404-1.97c.469.326.96.61 1.466.85v3.938a.5.5 0 0 0 .356.48c1.333.398 2.728.6 4.144.6s2.81-.202 4.144-.6a.5.5 0 0 0 .356-.48v-3.944a10.449 10.449 0 0 0 1.462-.846l3.408 1.973a.5.5 0 0 0 .594-.07 14.47 14.47 0 0 0 4.142-7.168.5.5 0 0 0-.236-.548l-3.407-1.972ZM16 21c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5Z"
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
    if (this.href) {
      return;
    }
    switch (this.type) {
      case 'submit':
        // Prefer this as submitter when the UA allows FACE submitters; otherwise
        // falls back to requestSubmit(). name/value still come from setFormValue.
        this.#internals.submit(this);
        break;
      case 'reset':
        this.#internals.reset();
        break;
      case 'button':
      default:
        // Default matches React Button (`type="button"`): no form action.
        break;
    }
  };

  #onKeydown = (event: KeyboardEvent): void => {
    if (this.href) {
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
