import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, deprecation, initializer, observed } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pf-modal.css';

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
 * @slot - The default slot can contain any type of content. When the header is not present this unnamed slot appear at the top of the modal window (to the left of the close button). Otherwise it will appear beneath the header.
 * @slot header - The header is an optional slot that appears at the top of the modal window. It should be a header tag (h2-h6).
 * @slot footer - Optional footer content. Good place to put action buttons.
 *
 * @fires {ModalOpenEvent} open - Fires when a user clicks on the trigger or manually opens a modal.
 * @fires {ModalCloseEvent} close - Fires when either a user clicks on either the close button or the overlay or manually closes a modal.
 *
 * @csspart overlay - The modal overlay which lies under the dialog and above the page body
 * @csspart dialog - The dialog element
 * @csspart content - The container for the dialog content
 * @csspart header - The container for the optional dialog header
 * @csspart description - The container for the optional dialog description in the header
 * @csspart close-button - The modal's close button
 * @csspart footer - Actions footer container
 *
 * @cssprop {<length>} --pf-c-modal-box--ZIndex {@default 500}
 * @cssprop {<length>} --pf-c-modal-box--Width - Width of the modal {@default calc(100% - 2rem)}
 * @cssprop {<length>} --pf-c-modal-box--MaxWidth - Max width of the modal {@default calc(100% - 2rem)}
 * @cssprop {<length>} --pf-c-modal-box--m-sm--sm--MaxWidth - Max width of the small variant modal {@default 35rem}
 * @cssprop {<length>} --pf-c-modal-box--m-md--MaxWidth - Max width of the small variant modal {@default 52.5rem}
 * @cssprop {<length>} --pf-c-modal-box--m-lg--lg--MaxWidth - Max width of the large variant modal {@default 70rem}
 * @cssprop {<length>} --pf-c-modal-box--MaxHeight - Max height of the modal {@default calc(100% - 3rem)}
 * @cssprop {<length>} --pf-c-modal-box--BoxShadow - {@default var(--pf-global--BoxShadow--xl)}
 * @cssprop {<length>} --pf-c-modal-box__title--FontSize - {@default 1.5rem}
 * @cssprop {<length>} --pf-c-modal-box--m-align-top--MarginTop - {@default 2rem}
 * @cssprop {<length>} --pf-c-modal-box--m-align-top--MaxWidth
 * @cssprop {<length>} --pf-c-modal-box--m-align-top--MaxHeight
 * @cssprop {<color>} --pf-c-modal-box--BackgroundColor - {@default #fff}
 * @cssprop --pf-c-modal-box__title--FontFamily - default font family for header-slotted headings
 */
@customElement('pf-modal')
export class PfModal extends LitElement implements HTMLDialogElement {
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly version = '{{version}}';

  static readonly styles = [style];

  /** Should the dialog close when user clicks outside the dialog? */
  protected static closeOnOutsideClick = false;

  /**
   * The `variant` controls the width of the modal.
   * There are three options: `small`, `medium` and `large`. The default is `large`.
   */
  @property({ reflect: true }) variant?: 'small' | 'medium' | 'large';

  @deprecation({ alias: 'variant', attribute: 'width' }) width?: 'small' | 'medium' | 'large';

  /**
   * `position="top"` aligns the dialog with the top of the page
   */
  @property({ reflect: true }) position?: 'top';

  @observed
  @property({ type: Boolean, reflect: true }) open = false;

  /** Optional ID of the trigger element */
  @observed
  @property() trigger?: string;

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue */
  public returnValue = '';

  @query('#overlay') private overlay?: HTMLElement | null;
  @query('#dialog') private dialog?: HTMLElement | null;
  @query('#close-button') private closeButton?: HTMLElement | null;

  #headerId = getRandomId();
  #triggerElement: HTMLElement | null = null;
  #header: HTMLElement | null = null;
  #body: Element[] = [];
  #headings: Element[] = [];
  #cancelling = false;

  #slots = new SlotController(this, null, 'header', 'description', 'footer');

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('click', this.onClick);
  }

  render() {
    const headerId = (this.#header || this.#headings.length) ? this.#headerId : undefined;
    const headerLabel = this.#triggerElement ? this.#triggerElement.innerText : undefined;
    const hasHeader = this.#slots.hasSlotted('header');
    const hasDescription = this.#slots.hasSlotted('description');
    const hasFooter = this.#slots.hasSlotted('footer');

    return html`
      <section ?hidden=${!this.open}>
        <div id="overlay" part="overlay" ?hidden=${!this.open}></div>
        <div id="dialog"
            part="dialog"
            tabindex="0"
            role="dialog"
            aria-labelledby=${ifDefined(headerId)}
            aria-label=${ifDefined(headerLabel)}
            ?hidden="${!this.open}">
          <div id="container">
            <div id="content" part="content" class=${classMap({ hasHeader, hasDescription, hasFooter })}>
              <header part="header">
                <slot name="header"></slot>
                <div part="description" ?hidden=${!hasDescription}>
                  <slot name="description"></slot>
                </div>
              </header>
              <slot></slot>
              <footer ?hidden=${!hasFooter} part="footer">
                <slot name="footer"></slot>
              </footer>
            </div>
            <button id="close-button"
                part="close-button"
                aria-label="Close dialog"
                @keydown=${this.onKeydown}
                @click=${this.close}>
              <svg fill="currentColor" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this.onKeydown);

    this.#triggerElement?.removeEventListener('click', this.onTriggerClick);
  }

  @initializer()
  protected async _init() {
    await this.updateComplete;
    this.#header = this.querySelector(`[slot$="header"]`);
    this.#body = [...this.querySelectorAll(`*:not([slot])`)];
    this.#headings = this.#body.filter(el => el.tagName.slice(0, 1) === 'H');

    if (this.#triggerElement) {
      this.#triggerElement.addEventListener('click', this.onTriggerClick);
      this.removeAttribute('hidden');
    }

    if (this.#header) {
      this.#header.id = this.#headerId;
    } else if (this.#headings.length > 0) {
      // Get the first heading in the modal if it exists
      this.#headings[0].id = this.#headerId;
    }
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
      this.dispatchEvent(new ModalOpenEvent(this.#triggerElement));
    } else {
      // Return scrollability
      document.body.style.overflow = 'auto';

      await this.updateComplete;

      if (this.#triggerElement) {
        this.#triggerElement.focus();
      }

      this.dispatchEvent(this.#cancelling ? new ModalCancelEvent() : new ModalCloseEvent());
    }
  }

  protected _triggerChanged() {
    if (this.trigger) {
      this.#triggerElement = (this.getRootNode() as Document | ShadowRoot).getElementById(this.trigger);
      this.#triggerElement?.addEventListener('click', this.onTriggerClick);
    }
  }

  @bound private onTriggerClick(event: MouseEvent) {
    event.preventDefault();
    // TODO: in non-modal case, toggle the dialog
    this.showModal();
  }

  @bound private onClick(event: MouseEvent) {
    const { open, overlay, dialog } = this;
    if (open) {
      const path = event.composedPath();
      const { closeOnOutsideClick } = this.constructor as typeof PfModal;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (closeOnOutsideClick && path.includes(overlay!) && !path.includes(dialog!)) {
        event.preventDefault();
        this.cancel();
      }
    }
  }

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
        if (event.target === this.closeButton) {
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
        if (event.target === this.#triggerElement) {
          event.preventDefault();
          this.showModal();
        }
        return;
    }
  }

  private async cancel() {
    this.#cancelling = true;
    this.open = false;
    await this.updateComplete;
    this.#cancelling = false;
  }

  setTrigger(element: HTMLElement) {
    this.#triggerElement = element;
    this.#triggerElement.addEventListener('click', this.onTriggerClick);
  }

  /**
   * Manually toggles the modal.
   * ```js
   * modal.toggle();
   * ```
   */
  @bound toggle() {
    this.open = !this.open;
  }

  /**
   * Manually opens the modal.
   * ```js
   * modal.open();
   * ```
   */
  @bound show() {
    this.open = true;
  }

  @bound showModal() {
    // TODO: non-modal mode
    this.show();
  }

  /**
   * Manually closes the modal.
   * ```js
   * modal.close();
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
    'pf-modal': PfModal;
  }
}
