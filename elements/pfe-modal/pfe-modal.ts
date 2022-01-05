import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, initializer, pfelement } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-modal.scss';

export class ModalCloseEvent extends ComposedEvent {
  constructor() {
    super('close');
  }
}

export class ModalOpenEvent extends ComposedEvent {
  constructor(
    /** The trigger element which triggered the modal to open */
    public trigger: HTMLElement|null
  ) {
    super('open');
  }
}

/**
 * Modals display information in a window or help a user focus on a task without navigating them away from the page.
 * A user can’t perform other actions until the modal is dismissed.
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
  static readonly styles = [style];

  static get events() {
    return {
      open: `pfe-modal:open`,
      close: `pfe-modal:close`,
    };
  }

  /**
   * The `width` controls the width of the modal.
   * There are three options: `small`, `medium` and `large`. The default is `large`.
   */
  @property({ reflect: true }) width: 'small'|'medium'|'large' = 'large';

  @state() private isOpen = false;

  private headerId = getRandomId();
  private trigger: HTMLElement|null = null;
  private header: HTMLElement|null = null;
  private body: Element[] = [];
  private headings: Element[] = [];

  protected slots = new SlotController(this, {
    slots: [null, 'trigger', 'header'],
    deprecations: {
      'trigger': 'pfe-modal--trigger',
      'header': 'pfe-modal--header',
    }
  });

  @query(`.pfe-modal__window`) private _modalWindow?: HTMLElement|null;
  @query(`.pfe-modal__close`) private _modalCloseButton?: HTMLElement|null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._keydownHandler);
  }

  render() {
    const headerId =
        this.header ? this.headerId
      : this.headings.length ? this.headerId
      : this.trigger ? undefined
      : undefined;

    const headerLabel =
        this.trigger ? this.trigger.innerText
      : undefined;

    return html`
      <slot name="trigger"></slot>
      <slot name="pfe-modal--trigger"></slot>
      <section class="pfe-modal__outer" ?hidden="${!this.isOpen}">
        <div class="pfe-modal__overlay"
            @click="${this.close}"
            ?hidden="${!this.isOpen}"></div>
        <div class="pfe-modal__window"
            tabindex="0"
            role="dialog"
            ?hidden="${!this.isOpen}"
            aria-labelledby="${ifDefined(headerId)}"
            aria-label="${ifDefined(headerLabel)}">
          <div class="pfe-modal__container">
            <div class="pfe-modal__content ${classMap({ 'has-header': this.slots.hasSlotted('header', 'pfe-modal--header') })}">
              <slot name="header"></slot>
              <slot name="pfe-modal--header"></slot>
              <slot></slot>
            </div>
            <button class="pfe-modal__close" aria-label="Close dialog" @keydown="${this._keydownHandler}" @click="${this.close}">
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

    if (this.trigger) {
      this.trigger.removeEventListener('click', this.open);
    }
  }

  @initializer() protected async _init() {
    await this.updateComplete;
    this.trigger = this.querySelector(`[slot$="trigger"]`);
    this.header = this.querySelector(`[slot$="header"]`);
    this.body = [...this.querySelectorAll(`*:not([slot])`)];
    this.headings = this.body.filter(el => el.tagName.slice(0, 1) === 'H');

    if (this.trigger) {
      this.trigger.addEventListener('click', this.open);
      this.removeAttribute('hidden');
    }

    if (this.header) {
      this.header.id = this.headerId;
    } else if (this.headings.length > 0) {
      // Get the first heading in the modal if it exists
      this.headings[0].id = this.headerId;
    }
  }

  @bound private _keydownHandler(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const { key } = event;
    switch (key) {
      case 'Tab':
        if (target === this._modalCloseButton) {
          event.preventDefault();
          this._modalWindow?.focus();
        }
        return;
      case 'Escape':
      case 'Esc':
        this.close(event);
        return;
      case 'Enter':
        if (target === this.trigger) {
          this.open(event);
        }
        return;
    }
  }

  /**
   * Manually toggles a modal. Returns the modal that has been toggled.
   * ```javascript
   * document.querySelector("pfe-modal").toggle();
   * ```
   */
  @bound toggle(event?: Event) {
    this.isOpen ? this.close(event) : this.open(event);
    return this;
  }

  /**
   * Manually opens a modal. Return the modal that has been opened.
   * ```javascript
   * document.querySelector("pfe-modal").open();
   * ```
   */
  @bound open(event?: Event) {
    if (event?.target instanceof HTMLElement) {
      event.preventDefault();
      this.trigger = event.target;
    }

    // Reveal the container and overlay
    this.isOpen = true;

    // This prevents background scroll
    document.body.style.overflow = 'hidden';
    // Set the focus to the container
    this._modalWindow?.focus();

    this.dispatchEvent(new ModalOpenEvent(this.trigger));
    this.dispatchEvent(pfeEvent('PfeModal:open', {
      open: true,
      ...(event && this.trigger) ? { trigger: this.trigger } : {},
    }));

    return this;
  }

  /**
   * Manually closes a modal. Returns the modal that has been closed.
   * ```javascript
   * document.querySelector("pfe-modal").close();
   * ```
   */
  @bound close(event?: Event) {
    if (event) {
      event.preventDefault();
    }


    // Hide the container and overlay
    this.isOpen = false;
    // Return scrollability
    document.body.style.overflow = 'auto';

    if (this.trigger) {
      // Move focus back to the trigger element
      this.trigger.focus();
      this.trigger = null;
    }

    this.dispatchEvent(new ModalCloseEvent());
    this.dispatchEvent(pfeEvent('pfe-modal:close', { open: false }));

    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-modal': PfeModal;
  }
}
