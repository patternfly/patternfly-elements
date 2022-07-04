import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

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
 */
export abstract class BaseButton extends LitElement {
  static readonly styles = [styles];

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

  /**
   * Must render a container of id `container` which contains at minimum an anonymous slot
   * ```html
   *      <span id="container">
   *        <slot></slot>
   *      </span>
   * ````
   */
  abstract render(): ReturnType<LitElement['render']>

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
