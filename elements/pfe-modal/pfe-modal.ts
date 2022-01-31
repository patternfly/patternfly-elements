import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, initializer, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-modal.scss';

export class ModalCancelEvent extends ComposedEvent {
  constructor() {
    super('cancel');
  }
}

export class ModalCloseEvent extends ComposedEvent {
  constructor() {
    super('close');
  }
}

export class ModalOpenEvent extends ComposedEvent {
  constructor(
    /** The trigger element which triggered the modal to open */
    public trigger: HTMLElement | null
  ) {
    super('open');
  }
}

/**
 * Modals display information in a window or help a user focus on a task without navigating them away from the page.
 * A user can’t perform other actions until the modal is dismissed.
 *
 * @summary Displays information or helps a user focus on a task
 *
 * @csspart overlay - The modal overlay which lies under the dialog and above the page body
 * @csspart dialog - The dialog element
 * @csspart content - The container for the dialog content
 * @csspart close-button - The modal's close button
 *
 * @fires {ModalOpenEvent} open - Fires when a user clicks on the trigger or manually opens a modal.
 * @fires {ModalCloseEvent} close - Fires when either a user clicks on either the close button or the overlay or manually closes a modal.
 *
 * @fires {CustomEvent<{ open: true; trigger?: HTMLElement }>} pfe-modal:open - {@deprecated Use `open`} When the modal opens
 * @fires {CustomEvent<{ open: false }>} pfe-modal:close - {@deprecated Use `close`} When the modal closes
 * @slot - The default slot can contain any type of content. When the header is not present this unnamed slot appear at the top of the modal window (to the left of the close button). Otherwise it will appear beneath the header.
 * @slot trigger - The only part visible on page load, the trigger opens the modal window. The trigger can be a button, a cta or a link. While it is part of the modal web component, it does not contain any intrinsic styles.
 * @slot header - The header is an optional slot that appears at the top of the modal window. It should be a header tag (h2-h6).
 * @slot pfe-modal--trigger - {@deprecated use `trigger`}
 * @slot pfe-modal--header - {@deprecated use `header`}
 */
@customElement('pfe-modal') @pfelement()
export class PfeModal extends LitElement {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * The `width` controls the width of the modal.
   * There are three options: `small`, `medium` and `large`. The default is `large`.
   */
  @property({ reflect: true }) width: 'small' | 'medium' | 'large' = 'large';

  @observed('_openChanged')
  @property({ type: Boolean }) open = false;

  /** Optional ID of the trigger element */
  @observed
  @property() trigger?: string;

  public returnValue?: string;

  @query('#overlay') private overlay?: HTMLElement;
  @query('#dialog') private dialog?: HTMLElement;
  @query('.pfe-modal__close') private _modalCloseButton?: HTMLElement | null;

  private headerId = getRandomId();
  private triggerElement: HTMLElement | null = null;
  private header: HTMLElement | null = null;
  private body: Element[] = [];
  private headings: Element[] = [];
  private cancelling = false;

  private slots = new SlotController(this, {
    slots: [null, 'trigger', 'header'],
    deprecations: {
      'trigger': 'pfe-modal--trigger',
      'header': 'pfe-modal--header',
    }
  });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._keydownHandler);
    this.addEventListener('click', this.onClick);
  }

  render() {
    const headerId = (this.header || this.headings.length) ? this.headerId : undefined;
    const headerLabel = this.triggerElement ? this.triggerElement.innerText : undefined;
    const hasHeader = this.slots.hasSlotted('header', 'pfe-modal--header');

    return html`
      <slot name="trigger"></slot>
      <slot name="pfe-modal--trigger"></slot>
      <section class="pfe-modal__outer" ?hidden="${!this.open}">
        <div id="overlay"
            part="overlay"
            class="pfe-modal__overlay" 
            ?hidden="${!this.open}"></div>
        <div id="dialog"
            part="dialog"
            class="pfe-modal__window"
            tabindex="0"
            role="dialog"
            aria-labelledby="${ifDefined(headerId)}"
            aria-label="${ifDefined(headerLabel)}"
            ?hidden="${!this.open}">
          <div class="pfe-modal__container">
            <div part="content" class="pfe-modal__content ${classMap({ 'has-header': hasHeader })}">
              <slot name="header"></slot>
              <slot name="pfe-modal--header"></slot>
              <slot></slot>
            </div>
            <button
                part="close-button"
                class="pfe-modal__close"
                aria-label="Close dialog"
                @keydown="${this._keydownHandler}"
                @click="${this.close}">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="-11 11 22 23">
                <path d="M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z" transform="rotate(45)"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._keydownHandler);

    this.triggerElement?.removeEventListener('click', this.onExternalTriggerClick);
  }

  @initializer()
  protected async _init() {
    await this.updateComplete;
    this.triggerElement ??= this.querySelector(`[slot$="trigger"]`);
    this.header = this.querySelector(`[slot$="header"]`);
    this.body = [...this.querySelectorAll(`*:not([slot])`)];
    this.headings = this.body.filter(el => el.tagName.slice(0, 1) === 'H');

    if (this.triggerElement) {
      this.triggerElement.addEventListener('click', this.onExternalTriggerClick);
      this.removeAttribute('hidden');
    }

    if (this.header) {
      this.header.id = this.headerId;
    } else if (this.headings.length > 0) {
      // Get the first heading in the modal if it exists
      this.headings[0].id = this.headerId;
    }
  }

  protected _triggerChanged() {
    if (this.trigger) {
      this.triggerElement = (this.getRootNode() as Document | ShadowRoot).getElementById(this.trigger);
      this.triggerElement?.addEventListener('click', this.onExternalTriggerClick);
    }
  }

  @bound private onExternalTriggerClick(event: MouseEvent) {
    event.preventDefault();
    // TODO: in non-modal case, toggle the dialog
    this.showModal();
  }

  @bound private onClick(event: MouseEvent) {
    if (this.open) {
      const path = event.composedPath();
      if (this.overlay && this.dialog && path.includes(this.overlay) && !path.includes(this.dialog)) {
        event.preventDefault();
        this.cancel();
      }
    }
  }

  @bound private _keydownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
        if (event.target === this._modalCloseButton) {
          event.preventDefault();
          this.dialog?.focus();
        }
        return;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.cancel();
        return;
      case 'Enter':
        if (event.target === this.triggerElement) {
          event.preventDefault();
          this.showModal();
        }
        return;
    }
  }

  private async cancel() {
    this.cancelling = true;
    this.open = false;
    await this.updateComplete;
    this.cancelling = false;
  }

  protected async _openChanged(oldValue?: boolean, newValue?: boolean) {
    // loosening types to prevent running these effects in unexpected circumstances
    // eslint-disable-next-line eqeqeq
    if (oldValue == null || newValue == null || oldValue == newValue) {
      return;
    } else if (this.open) {
      // This prevents background scroll
      document.body.style.overflow = 'hidden';
      await this.updateComplete;
      // Set the focus to the container
      this.dialog?.focus();
      this.dispatchEvent(new ModalOpenEvent(this.triggerElement));
      this.dispatchEvent(deprecatedCustomEvent('pfe-modal:open', {
        open: true,
        ...(this.triggerElement) ? { trigger: this.triggerElement } : {},
      }));
    } else {
      // Return scrollability
      document.body.style.overflow = 'auto';

      const { cancelling } = this;

      await this.updateComplete;

      if (this.triggerElement) {
        this.triggerElement.focus();
      }

      this.dispatchEvent(cancelling ? new ModalCancelEvent() : new ModalCloseEvent());
      this.dispatchEvent(deprecatedCustomEvent('pfe-modal:close', { open: false }));
    }
  }

  setTrigger(element: HTMLElement) {
    this.triggerElement = element;
    this.triggerElement.addEventListener('click', this.onExternalTriggerClick);
  }

  /**
   * Manually toggles a modal.
   * ```javascript
   * document.querySelector('pfe-modal').toggle();
   * ```
   */
  @bound toggle() {
    this.open = !this.open;
  }

  /**
   * Manually opens a modal.
   * ```javascript
   * document.querySelector('pfe-modal').open();
   * ```
   */
  @bound show() {
    this.open = true;
  }

  @bound showModal() {
    this.show();
  }

  /**
   * Manually closes a modal.
   * ```javascript
   * document.querySelector('pfe-modal').close();
   * ```
   */
  @bound close(returnValue?: string) {
    if (typeof returnValue === 'string') {
      this.returnValue = returnValue;
    }

    this.open = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-modal': PfeModal;
  }
}
