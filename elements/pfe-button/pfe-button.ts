import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { bound, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import styles from './pfe-button.scss';

export type ButtonVariant = (
  |'primary'
  |'secondary'
  |'tertiary'
  |'control'
);

/**
 * Buttons allow users to perform an action when triggered. They feature a text label, a background or a border, and icons.
 *
 * @summary Allows users to perform an action when triggered
 *
 * @fires {Event} pfe-button:click {@deprecated use native click event instead}
 *
 * @cssprop {<length>} --pf-c-button--FontSize {@default 1rem}
 * @cssprop {normal | bold | bolder | lighter | <number [1,1000]>} --pf-c-button--FontWeight {@default 400}
 * @cssprop {<number>} --pf-c-button--LineHeight {@default 1.5}
 *
 * @cssprop {<length>} --pf-c-button--PaddingTop {@default 0.375rem}
 * @cssprop {<length>} --pf-c-button--PaddingLeft {@default 1rem}
 * @cssprop {<length>} --pf-c-button--PaddingBottom {@default 0.375rem}
 * @cssprop {<length>} --pf-c-button--PaddingTop {@default 1rem}
 *
 * @cssprop {<length>|<percentage>} --pf-c-button--BorderRadius {@default 3px}
 * @cssprop {<color>}  --pf-c-button--after--BorderColor {@default transparent}
 * @cssprop {<length>} --pf-c-button--after--BorderRadius {@default 3px}
 * @cssprop {<length>} --pf-c-button--after--BorderWidth {@default 1px}
 * @cssprop {<length>} --pf-c-button--active--after--BorderWidth {@default 2px}
 * @cssprop {<length>} --pf-c-button--hover--after--BorderWidth {@default 2px}
 * @cssprop {<length>} --pf-c-button--focus--after--BorderWidth {@default 2px}
 *
 * @cssprop {<color>}  --pf-c-button--m-primary--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--BackgroundColor {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--BackgroundColor {@default #004080}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--BackgroundColor {@default #004080}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--BackgroundColor {@default #004080}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--Color {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--Color {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BorderColor {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--Color {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BorderColor {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--Color {@default #06c}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BorderColor {@default #06c}
 *
 * @cssprop {<color>}  --pf-c-button--m-tertiary--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BorderColor {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BorderColor {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BorderColor {@default #151515}
 *
 * @cssprop {<color>}  --pf-c-button--m-warning--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--BackgroundColor {@default #f0ab00}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--BackgroundColor {@default #c58c00}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--BackgroundColor {@default #c58c00}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--BackgroundColor {@default #c58c00}
 *
 * @cssprop {<color>}  --pf-c-button--m-danger--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--BackgroundColor {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--BackgroundColor {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--BackgroundColor {@default a30000}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--Color {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--BackgroundColor {@default a30000}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--Color {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BorderColor {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--Color {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BorderColor {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--Color {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BorderColor {@default #c9190b}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--Color {@default #a30000}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BorderColor {@default #c9190b}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--Color {@default #6a6e73}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--Color {@default #151515}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--Color {@default #d2d2d2}
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--BackgroundColor {@default transparent}
 *
 * @cssprop {<color>}  --pf-c-button--m-control--disabled--BackgroundColor {@default #f0f0f0}
 * @cssprop {<length>} --pf-c-button--m-control--BorderRadius {@default 0}
 * @cssprop {<length>} --pf-c-button--m-control--after--BorderWidth {@default 1px}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderTopColor {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderRightColor {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderBottomColor {@default #8a8d90}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderLeftColor {@default #f0f0f0}
 * @cssprop {<color>}  --pf-c-button--m-control--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--BackgroundColor {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--active--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BackgroundColor {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BorderBottomColor {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--active--after--BorderBottomWidth {@default 2px}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BackgroundColor {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BorderBottomColor {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--focus--after--BorderBottomWidth {@default 2px}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--Color {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BackgroundColor {@default #fff}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BorderBottomColor {@default #06c}
 * @cssprop {<length>} --pf-c-button--m-control--hover--after--BorderBottomWidth {@default 2px}
 */
@customElement('pfe-button')
export class PfeButton extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = styles;

  /** Disables the button */
  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * Changes the style of the button.
   * - Primary: Used for the most important call to action on a page. Try to limit primary buttons to one per page.
   * - Secondary: Use secondary buttons for general actions on a page, that don’t require as much emphasis as primary button actions. For example, you can use secondary buttons where there are multiple actions, like in toolbars or data lists.
   * - Tertiary: Tertiary buttons are flexible and can be used as needed.
   */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Changes the size of the button. */
  @property({ reflect: true }) size?: 'small'|'large';

  @observed
  @property() type?: 'button'|'submit'|'reset';

  /**
   * Use danger buttons for actions a user can take that are potentially destructive or difficult/impossible to undo, like deleting or removing user data.
   */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** Represents the state of a stateful button */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Applies plain styles */
  @property({ type: Boolean, reflect: true }) plain = false;

  private logger = new Logger(this);

  private mo = new MutationObserver(this.onMutation);

  private get button() {
    return this.querySelector('button');
  }

  connectedCallback() {
    this.onSlotChange();
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
  }

  render() {
    return html`
      <span id="container" @slotchange=${this.onSlotChange}>
        <slot name="state"></slot>
        <slot></slot>
      </span>
    `;
  }

  protected firstUpdated(): void {
    this._disabledChanged();
    this.onMutation();
  }

  protected _typeChanged() {
    if (this.button && this.button.type !== this.type) {
      if (this.type) {
        this.button.type = this.type;
      } else {
        this.button.removeAttribute('type');
      }
    }
  }

  protected _disabledChanged() {
    if (this.button && this.button.disabled !== this.disabled) {
      this.button.disabled = this.disabled;
    }
  }

  private onSlotChange() {
    this.mo.disconnect();
    if (this.button) {
      this.mo.observe(this.button, { attributes: true, attributeFilter: ['type', 'disabled'] });
    }
  }

  @bound private onClick(event: Event) {
    if (event.target === this.button) {
      this.dispatchEvent(deprecatedCustomEvent('pfe-button:click'));
    }
  }

  @bound private onMutation() {
    if (this.querySelector(':not(button)')) {
      this.logger.warn('The only child in the light DOM must be a button tag');
    } else if (!this.button) {
      this.logger.warn('You must have a button in the light DOM');
    } else {
      this.disabled = this.button.hasAttribute('disabled');
      this.type = this.button.getAttribute('type') as this['type'] ?? undefined;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-button': PfeButton;
  }
}
