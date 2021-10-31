import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';

import style from './pfe-toast.scss';

export class ToastOpenEvent extends ComposedEvent {
  constructor() {
    super('open');
  }
}

export class ToastCloseEvent extends ComposedEvent {
  constructor() {
    super('close');
  }
}

/**
 * Toast is a self-contained alert that is hidden on page load and slides in/out of the view when programmatically opened/closed.
 *
 * @summary An alert hidden on page load and slides in/out of the view
 *
 * @slot - The default slot can contain any type of content.
 *
 * @fires open - Fires when a toast is manually openned.
 * @fires close - Fires when a toast is manually closed.
 * @fires pfe-toast:open - {@deprecated Use `open`} Fires when a toast is manually openned.
 * @fires pfe-toast:close - {@deprecated Use `close`} Fires when a toast is manually closed.
 *
 * @csspart container - container for the toast element
 * @csspart content - container for the slotted content
 * @csspart close-button - the toast's close button
 *
 * @cssprop --pfe-toast--MaxWidth {@default 500px} Allows you to specify the maximum width of the component.
 * @cssprop --pfe-toast--MinWidth {@default 250px} Allows you to specify the minimum width of the component.
 * @cssprop --pfe-toast--Top {@default 50px} Allows you to customize the distance between the component and the top of its container.
 * @cssprop --pfe-toast--Right {@default 50px} Allows you to customize the distance between the component and the right of its container.
 */
@customElement('pfe-toast') @pfelement()
export class PfeToast extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Creates and opens a toast. The Promise resolves with the opened toast element
   * @param  messageOrContent Text, or DOM content to toast
   */
  public static async toast(messageOrContent: string|Node): Promise<PfeToast> {
    const toast = document.createElement('pfe-toast');
    toast.append(messageOrContent);
    toast.addEventListener('close', () => toast.remove(), { once: true });
    document.body.append(toast);
    toast.open();
    await toast.updateComplete;
    return toast;
  }

  /**
   * This is an optional attribute string that you can provide to automatically dismiss the alert.
   * The auto-dismiss delay value can be provided in seconds or in milliseconds.
   * For example, `auto-dismiss="3s"` and `auto-dismiss="3000ms"` will dismiss the toast alert
   * after three seconds.
   *
   * If no delay value is provided, it will default to eight seconds.
   */
  @observed('_setAccessibility')
  @property({ attribute: 'auto-dismiss', reflect: true }) autoDismiss?: string;

  /**
   * This is an optional attribute string that you can provide that sets the aria-label on the close button in the shadow DOM.
   * The aria-label attribute will default to "Close".
   */
  @property({ attribute: 'close-label', reflect: true }) closeLabel = 'Close';

  @state() private doesAutoDismiss = !!this.autoDismiss;

  @state() private isOpen = false;

  @query('.pfe-toast__close') private _toastCloseButton?: HTMLButtonElement|null;

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    this._setAccessibility();
    // attach listeners
    this.addEventListener('keydown', this._keydownHandler);
  }

  render() {
    return html`
      <div class="pfe-toast__container" part="container">
        <!-- Toast content (default slot) -->
        <div class="pfe-toast__content" part="content">
          <slot></slot>
        </div>
        <!-- Close button -->
        <button part="close-button" class="pfe-toast__close" aria-label="${ifDefined(this.closeLabel)}" @click="${this.close}">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-11 11 22 23">
            <path d="M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z"
                transform="rotate(45)" />
          </svg>
        </button>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._keydownHandler);
  }

  private _setAccessibility() {
    this.doesAutoDismiss = !!this.autoDismiss;
    if (!this.doesAutoDismiss) {
      this.removeAttribute('aria-live');
      this.removeAttribute('aria-atomic');

      this.setAttribute('role', 'alertdialog');
      // default if none provided
      if (!this.hasAttribute('aria-label')) {
        this.setAttribute('aria-label', 'Alert dialog');
      }

      this.setAttribute('aria-describedby', 'pfe-toast__content');
    } else {
      this.removeAttribute('aria-label');
      this.removeAttribute('aria-describedby');

      this.setAttribute('role', 'alert');
      this.setAttribute('aria-live', 'polite');
      this.setAttribute('aria-atomic', 'true');
    }
  }

  private _toMilliseconds(value = ''): number {
    // set default delay if none provided
    const digits = value.match(/\d+/) || [8000];
    const unit = value.match(/\D+/) || '';
    return unit[0] === 's' ? Number(digits[0]) * 1000 : Number(digits[0]);
  }

  @bound private _keydownHandler(event: KeyboardEvent) {
    const { target } = event;
    const { key } = event;
    switch (key) {
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.close();
        break;
      case 'Enter':
        if (target === this._toastCloseButton) {
          event.preventDefault();
        }
        this.close();
        break;
      default:
        break;
    }
  }

  /**
   * Manually opens a toast. Return the toast that has been opened.
   *
   * ```javascript
   * document.querySelector("pfe-toast").open();
   * ```
   */
  @bound open() {
    this.isOpen = true;
    this.hidden = false;
    setTimeout(() => this.classList.add('open'), 500);

    this.dispatchEvent(new ToastOpenEvent());
    this.dispatchEvent(deprecatedCustomEvent('pfe-toast:open'));

    if (this.doesAutoDismiss) {
      setTimeout(this.close, this._toMilliseconds(this.autoDismiss));
    }


    return this;
  }

  /**
   * Manually closes a toast. Returns the toast that has been closed.
   *
   * ```javascript
   * document.querySelector("pfe-toast").close();
   * ```
   */
  @bound close() {
    this.isOpen = false;

    setTimeout(() => {
      this.classList.remove('open');
      this.hidden = true;
    }, 500);

    this.dispatchEvent(new ToastCloseEvent());
    this.dispatchEvent(deprecatedCustomEvent('pfe-toast:close'));

    return this;
  }

  /**
   * Manually toggles a toast. Returns the toast that has been toggled.
   *
   * ```javascript
   * document.querySelector("pfe-toast").toggle();
   * ```
   */
  @bound toggle() {
    this.isOpen ? this.close() : this.open();
    return this;
  }
}

 declare global {
   interface HTMLElementTagNameMap {
     'pfe-toast': PfeToast;
   }
 }
