import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-spinner/pf-spinner.js';

import tokensStyles from './pf-button-tokens.css';
import iconStyles from './pf-button-icon.css';

import styles from './pf-button.css';

export type ButtonVariant = (
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'control'
  | 'link'
);

/**
 * A **button** is a box area or text that communicates and triggers user actions when
 * clicked or selected. Buttons can be used to communicate and immediately trigger
 * actions a user can take in an application, like submitting a form, canceling a
 * process, or creating a new object. Buttons can also be used to take a user to a
 * new location, like another page inside of a web application, or an external site
 * such as help or documentation.
 * @slot - Button text label
 * @slot icon - Button Icon, overrides `icon` attribute
 * @summary Allows users to perform an action when triggered
 * @cssprop {<length>} [--pf-c-button--FontSize=1rem]
 * @cssprop            [--pf-c-button--FontWeight=400]
 * @cssprop {<number>} [--pf-c-button--LineHeight=1.5]
 * @cssprop {<length>} [--pf-c-button--PaddingTop=0.375rem]
 * @cssprop {<length>} [--pf-c-button--PaddingLeft=1rem]
 * @cssprop {<length>} [--pf-c-button--PaddingBottom=0.375rem]
 * @cssprop {<length>} [--pf-c-button--PaddingRight=1rem]
 * @cssprop {<length>|<percentage>} [--pf-c-button--BorderRadius=3px]
 * @cssprop {<color>}  [--pf-c-button--after--BorderColor=transparent]
 * @cssprop {<length>} [--pf-c-button--after--BorderRadius=3px]
 * @cssprop {<length>} [--pf-c-button--after--BorderWidth=1px]
 * @cssprop {<length>} [--pf-c-button--active--after--BorderWidth=2px]
 * @cssprop {<length>} [--pf-c-button--hover--after--BorderWidth=2px]
 * @cssprop {<length>} [--pf-c-button--focus--after--BorderWidth=2px]
 * @cssprop {<color>}  [--pf-c-button--m-primary--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-primary--BackgroundColor=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-primary--active--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-primary--active--BackgroundColor=#004080]
 * @cssprop {<color>}  [--pf-c-button--m-primary--focus--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-primary--focus--BackgroundColor=#004080]
 * @cssprop {<color>}  [--pf-c-button--m-primary--hover--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-primary--hover--BackgroundColor=#004080]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--Color=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--active--Color=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--active--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--active--BorderColor=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--focus--Color=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--focus--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--focus--BorderColor=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--hover--Color=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--hover--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--hover--BorderColor=#06c]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--active--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--active--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--active--BorderColor=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--focus--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--focus--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--focus--BorderColor=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--hover--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--hover--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-tertiary--hover--BorderColor=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-danger--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-danger--BackgroundColor=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-danger--active--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-danger--active--BackgroundColor=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-danger--focus--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-danger--focus--BackgroundColor=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-danger--hover--Color=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-danger--hover--BackgroundColor=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--Color=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--BorderColor=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--active--Color=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--active--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--active--BorderColor=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--focus--Color=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--focus--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--focus--BorderColor=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--hover--Color=#a30000]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--hover--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-secondary--m-danger--hover--BorderColor=#c9190b]
 * @cssprop {<color>}  [--pf-c-button--m-control--disabled--BackgroundColor=#f0f0f0]
 * @cssprop {<length>} [--pf-c-button--m-control--BorderRadius=0]
 * @cssprop {<length>} [--pf-c-button--m-control--after--BorderWidth=1px]
 * @cssprop {<color>}  [--pf-c-button--m-control--after--BorderTopColor=#f0f0f0]
 * @cssprop {<color>}  [--pf-c-button--m-control--after--BorderRightColor=#f0f0f0]
 * @cssprop {<color>}  [--pf-c-button--m-control--after--BorderBottomColor=#8a8d90]
 * @cssprop {<color>}  [--pf-c-button--m-control--after--BorderLeftColor=#f0f0f0]
 * @cssprop {<color>}  [--pf-c-button--m-control--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-control--BackgroundColor=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-control--active--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-control--active--BackgroundColor=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-control--active--BorderBottomColor=#06c]
 * @cssprop {<length>} [--pf-c-button--m-control--active--after--BorderBottomWidth=2px]
 * @cssprop {<color>}  [--pf-c-button--m-control--focus--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-control--focus--BackgroundColor=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-control--focus--BorderBottomColor=#06c]
 * @cssprop {<length>} [--pf-c-button--m-control--focus--after--BorderBottomWidth=2px]
 * @cssprop {<color>}  [--pf-c-button--m-control--hover--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-control--hover--BackgroundColor=#fff]
 * @cssprop {<color>}  [--pf-c-button--m-control--hover--BorderBottomColor=#06c]
 * @cssprop {<length>} [--pf-c-button--m-control--hover--after--BorderBottomWidth=2px]
 * @cssprop {<color>}  [--pf-c-button--disabled--Color=#6a6e73]
 * @cssprop {<color>}  [--pf-c-button--disabled--BackgroundColor=#d2d2d2]
 * @cssprop {<color>}  [--pf-c-button--disabled--after--BorderColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-warning--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-warning--BackgroundColor=#f0ab00]
 * @cssprop {<color>}  [--pf-c-button--m-warning--active--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-warning--active--BackgroundColor=#c58c00]
 * @cssprop {<color>}  [--pf-c-button--m-warning--focus--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-warning--focus--BackgroundColor=#c58c00]
 * @cssprop {<color>}  [--pf-c-button--m-warning--hover--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-warning--hover--BackgroundColor=#c58c00]
 * @cssprop {<color>}  [--pf-c-button--m-plain--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-plain--Color=#6a6e73]
 * @cssprop {<color>}  [--pf-c-button--m-plain--hover--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-plain--hover--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-plain--focus--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-plain--focus--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-plain--active--BackgroundColor=transparent]
 * @cssprop {<color>}  [--pf-c-button--m-plain--active--Color=#151515]
 * @cssprop {<color>}  [--pf-c-button--m-plain--disabled--Color=#d2d2d2]
 * @cssprop {<color>}  [--pf-c-button--m-plain--disabled--BackgroundColor=transparent]
 * @attr {string} [loading-label='loading'] - ARIA label for the loading indicator
 */
@customElement('pf-button')
export class PfButton extends LitElement {
  static readonly formAssociated = true;

  static readonly styles: CSSStyleSheet[] = [
    tokensStyles,
    iconStyles,
    styles,
  ];

  @property({ reflect: true }) type?: 'button' | 'submit' | 'reset';

  /** Accessible name for the button, use when the button does not have slotted text */
  @property() label?: string;

  /** Form value for the button */
  @property() value?: string;

  /** Form element name for the button */
  @property() name?: string;

  /** Disables the button */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Represents the state of a stateful button */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Changes the size of the button. */
  @property({ reflect: true }) size?: 'small' | 'large';

  /** Not as urgent as danger */
  @property({ type: Boolean, reflect: true }) warning = false;

  /**
   * Use danger buttons for actions a user can take that are potentially
   * destructive or difficult/impossible to undo, like deleting or removing
   * user data.
   */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** Applies plain styles */
  @property({ type: Boolean, reflect: true }) plain = false;

  /**
   * Changes the style of the button.
   * - Primary: Used for the most important call to action on a page. Try to
   *   limit primary buttons to one per page.
   * - Secondary: Use secondary buttons for general actions on a page, that
   *   don’t require as much emphasis as primary button actions. For example,
   *   you can use secondary buttons where there are multiple actions, like in
   *   toolbars or data lists.
   * - Tertiary: Tertiary buttons are flexible and can be used as needed.
   */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  @property({ reflect: true, type: Boolean }) inline = false;

  @property({ reflect: true, type: Boolean }) block = false;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Store the URL Link */
  @property({ reflect: true }) href?: string;

  /**  Redirecting the URL Link to new Tab */
  @property({ reflect: true }) target?: string;

  #internals = InternalsController.of(this, { role: this.variant === 'link' ? 'none' : 'button' });

  #slots = new SlotController(this, 'icon', null);

  get #disabled() {
    return this.disabled || this.#internals.formDisabled;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
  }

  protected override willUpdate(): void {
    this.#internals.ariaLabel = this.label || null;
    this.#internals.ariaDisabled = String(!!this.disabled);
    const isLink = this.variant === 'link' && this.href;
    if (isLink) {
      this.removeAttribute('tabindex');
      this.#internals.role = 'none';
    } else {
      this.tabIndex = 0;
      this.#internals.role = 'button';
    }
  }

  async formDisabledCallback(): Promise<void> {
    await this.updateComplete;
    this.requestUpdate();
  }

  override render(): TemplateResult<1> {
    const hasIcon = !!this.icon || !!this.loading || this.#slots.hasSlotted('icon');
    const { warning, variant, danger, loading, plain, inline, block, size, href, target } = this;

    const disabled = this.#disabled;

    const content = html`
      <slot id="icon"
            part="icon"
            name="icon"
            ?hidden="${!hasIcon}">
        <pf-icon role="presentation"
                 icon="${ifDefined(this.icon)}"
                 set="${ifDefined(this.iconSet)}"
                 ?hidden="${!this.icon || this.loading}"></pf-icon>
        <pf-spinner size="md"
                    ?hidden="${!this.loading}"
                    aria-label="${this.getAttribute('loading-label') ?? 'loading'}"></pf-spinner>
      </slot>
      <slot id="text"></slot>
    `;

    if (variant === 'link' && href) {
      return html`
        <a id="button"
           href="${href}"
           target="${ifDefined(target)}"
           class="${classMap({
                        [variant]: true,
                        [size ?? '']: !!size,
                        anchor: true,
                        inline,
                        block,
                        danger,
                        disabled,
                        hasIcon,
                        loading,
                        plain,
                        warning,
                      })}">${content}</a>`;
    } else {
      return html`
      <div id="button"
           class="${classMap({
             [variant]: true,
             [size ?? '']: !!size,
             inline,
             block,
             danger,
             disabled,
             hasIcon,
             loading,
             plain,
             warning,
           })}">${content}</div>`;
    }
  }

  #onClick() {
    if (!this.#disabled) {
      switch (this.type) {
        case 'reset':
          return this.#internals.reset();
        default:
          return this.#internals.submit();
      }
    }
  }

  #onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        if (this.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }))) {
          this.#onClick();
        }
        break;
      case 'Enter':
        if (this.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }))) {
          this.#onClick();
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-button': PfButton;
  }
}
