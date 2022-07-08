import type { TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './BaseButton.scss';

export type ButtonVariant = (
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'control'
  | 'link'
);

/**
 * Base button class
 * @cssprop {<length>} --pf-c-button--FontSize                                               {@default 1rem}
 * @cssprop {normal | bold | bolder | lighter | <number [1,1000]>} --pf-c-button--FontWeight {@default 400}
 * @cssprop {<number>} --pf-c-button--LineHeight                                             {@default 1.5}
 *
 * @cssprop {<length>} --pf-c-button--PaddingTop    {@default 0.375rem}
 * @cssprop {<length>} --pf-c-button--PaddingLeft   {@default 1rem}
 * @cssprop {<length>} --pf-c-button--PaddingBottom {@default 0.375rem}
 * @cssprop {<length>} --pf-c-button--PaddingRight  {@default 1rem}
 *
 * @cssprop {<length>|<percentage>} --pf-c-button--BorderRadius  {@default 3px}
 * @cssprop {<color>}  --pf-c-button--after--BorderColor         {@default transparent}
 * @cssprop {<length>} --pf-c-button--after--BorderRadius        {@default 3px}
 * @cssprop {<length>} --pf-c-button--after--BorderWidth         {@default 1px}
 * @cssprop {<length>} --pf-c-button--active--after--BorderWidth {@default 2px}
 * @cssprop {<length>} --pf-c-button--hover--after--BorderWidth  {@default 2px}
 * @cssprop {<length>} --pf-c-button--focus--after--BorderWidth  {@default 2px}
 *
 * @cssprop {<color>}  --pf-c-button--m-primary--Color                   {@default #fff} {@link --rh-color-white}
 * @cssprop {<color>}  --pf-c-button--m-primary--BackgroundColor         {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--Color           {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--BackgroundColor {@default #004080}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--Color            {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--BackgroundColor  {@default #004080}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--Color            {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--BackgroundColor  {@default #004080}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--Color                   {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--BackgroundColor         {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--Color           {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BorderColor     {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--Color            {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BorderColor      {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--Color            {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BorderColor      {@default #06c}
 *
 * @cssprop {<color>}  --pf-c-button--m-tertiary--Color                   {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--BackgroundColor         {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--Color           {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BorderColor     {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BorderColor      {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BorderColor      {@default #151515}
 *
 * @cssprop {<color>}  --pf-c-button--m-danger--Color                   {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--BackgroundColor         {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--Color           {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--BackgroundColor {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--Color            {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--BackgroundColor  {@default a30000}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--Color            {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--BackgroundColor  {@default a30000}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--Color                   {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BackgroundColor         {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BorderColor             {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--Color           {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BorderColor     {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--Color            {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BorderColor      {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--Color            {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BorderColor      {@default #c9190b}
 *
 * @cssprop {<color>}  --pf-c-button--m-control--disabled--BackgroundColor        {@default #f0f0f0}
 * @cssprop {<length>} --pf-c-button--m-control--BorderRadius                     {@default 0}
 * @cssprop {<length>} --pf-c-button--m-control--after--BorderWidth               {@default 1px}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderTopColor            {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderRightColor          {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderBottomColor         {@default #8a8d90}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderLeftColor           {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--Color                            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--BackgroundColor                  {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--active--Color                    {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BackgroundColor          {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BorderBottomColor        {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--active--after--BorderBottomWidth {@default 2px}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--Color                     {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BackgroundColor           {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BorderBottomColor         {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--focus--after--BorderBottomWidth  {@default 2px}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--Color                     {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BackgroundColor           {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BorderBottomColor         {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--hover--after--BorderBottomWidth  {@default 2px}
 *
 * @cssprop {<color>}  --pf-c-button--disabled--Color              {@default #6a6e73}
 * @cssprop {<color>}  --pf-c-button--disabled--BackgroundColor    {@default #d2d2d2}
 * @cssprop {<color>}  --pf-c-button--disabled--after--BorderColor {@default transparent}
 *
 * @csspart state - Container for the state slot.
 * @slot icon
 *       Contains the button's icon or state indicator, e.g. a spinner.
 * @slot
 *       Must contain exactly one `<button>` element as the only content not assigned to a named slot.
 */
export abstract class BaseButton extends LitElement {
  static readonly styles = [styles];

  /** Disables the button */
  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

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

  /** Changes the size of the button. */
  @property({ reflect: true }) size?: 'small'|'large';

  @observed
  @property() type?: 'button'|'submit'|'reset';

  /**
   * Use danger buttons for actions a user can take that are potentially
   * destructive or difficult/impossible to undo, like deleting or removing
   * user data.
   */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon = '';

  /** Represents the state of the anonymous and icon slots */
  protected slots = new SlotController(this, null, 'icon');

  get #button() {
    return this.querySelector('button');
  }

  #logger = new Logger(this);

  #mo = new MutationObserver(() => this.#onMutation());

  #prevTabindex = this.#button?.tabIndex ?? null;

  override connectedCallback() {
    this.#onSlotChange();
    super.connectedCallback();
    this.shadowRoot?.addEventListener('slotchange', () => this.#onSlotChange());
  }

  override render() {
    const { icon } = this;
    const hasIcon = this.slots.hasSlotted('icon') || !!icon;
    return html`
      <span id="container" class=${classMap({ hasIcon })}>
        <span part="icon">
          <slot name="icon">${this.renderDefaultIcon()}</slot>
        </span>
        <slot></slot>
      </span>
    `;
  }

  /**
   * Fallback content for the icon slot. When the `icon` attribute is set, it
   * should render an icon corresponding to the value.
   *
   * @example ```html
   *          <pfe-icon icon=${this.icon}></pfe-icon>
   *          ```
   */
  protected abstract renderDefaultIcon(): TemplateResult;

  protected override firstUpdated(): void {
    this._disabledChanged();
    this.#onMutation();
  }

  /** Synchronizes the `type` attribute with the slotted `<button>` */
  protected _typeChanged() {
    if (this.#button && this.#button.type !== this.type) {
      if (this.type) {
        this.#button.type = this.type;
      } else {
        this.#button.removeAttribute('type');
      }
    }
  }

  /** Synchronizes the `disabled` attribute with the slotted `<button>` and manages tabindex */
  protected _disabledChanged() {
    if (this.#button && this.#button.disabled !== this.disabled) {
      this.#button.disabled = this.disabled;
      if (this.disabled) {
        this.#prevTabindex = this.#button.tabIndex;
        this.#button.setAttribute('tabindex', '-1');
      } else if (this.#prevTabindex) {
        this.#button.setAttribute('tabindex', this.#prevTabindex.toString());
        this.#prevTabindex = null;
      } else {
        this.#button.removeAttribute('tabindex');
        this.#prevTabindex = null;
      }
    }
  }

  #onSlotChange() {
    this.#mo.disconnect();
    if (this.#button) {
      this.#mo.observe(this.#button, { attributes: true, attributeFilter: ['type', 'disabled'] });
    }
  }

  #onMutation() {
    const lightButtons = this.querySelectorAll('button');
    if (!this.#button) {
      this.#logger.warn('You must have a button in the light DOM');
    } else {
      this.disabled = this.#button.hasAttribute('disabled') || this.#button.getAttribute('aria-disabled') === 'true';
      this.type = this.#button.getAttribute('type') as this['type'] ?? undefined;
      if (lightButtons.length > 1) {
        this.#logger.warn('Only one button child is allowed');
      }
    }
  }
}
