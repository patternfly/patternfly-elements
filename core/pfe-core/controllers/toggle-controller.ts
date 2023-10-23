import type { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { FloatingDOMController, type Placement, } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { getRandomId } from '../functions/random.js';

/**
 * properties for popup option elements
 */
export interface ToggleHost extends HTMLElement {
  expanded: boolean;
}

export type PopupKind = 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class ToggleController implements ReactiveController {
  /** element that toggles popup */
  #triggerElements?: HTMLElement[];

  /** pop-up that is toggled */
  #popupElement?: HTMLElement;

  /** whether host is connected */
  #connected = false;

  /** whether host is hovered */
  #hovered = false;

  /** whether host is focused */
  #focused = false;

  #position: Placement = 'bottom-start';

  #enableFlip = false;

  #popupType: PopupKind = 'menu';

  #float?: FloatingDOMController;

  get focused() {
    return this.#focused;
  }

  set focused(focused: boolean) {
    this.#focused = focused;
  }

  get hovered() {
    return this.#hovered;
  }

  set hovered(hovered: boolean) {
    this.#hovered = hovered;
  }

  get float() {
    return this.#float;
  }

  get styles() {
    return this.float?.styles || {};
  }

  get anchor() {
    return this.float?.anchor || '';
  }

  get alignment() {
    return this.float?.alignment || 'center';
  }

  get expanded() {
    return !!this.float?.open;
  }

  get popupElement() {
    return this.#popupElement;
  }

  set popupType(popupType: PopupKind) {
    if (this.#popupType !== popupType) {
      this.#popupType = popupType;
      this.#triggerElements?.forEach(element => element.setAttribute('aria-haspopup', this.#popupType));
    }
  }

  set position(position: Placement) {
    this.#position = position;
  }

  get position() {
    return this.#position;
  }

  set enableFlip(enableFlip: boolean) {
    this.#enableFlip = !!enableFlip;
  }

  get enableFlip() {
    return this.#enableFlip;
  }

  get #hostListeners() {
    return {
      'focusin': this.#onHostFocusin.bind(this),
      'focusout': this.#onHostFocusout.bind(this),
      'mouseout': this.#onHostMouseout.bind(this),
      'mouseover': this.#onHostMouseover.bind(this)
    };
  }

  get #popupListeners() {
    return {
      'click': this.#onPopupClick.bind(this),
      'keydown': this.#onPopupKeydown.bind(this),
      'keyup': this.#onPopupKeyup.bind(this)
    };
  }

  get #triggerListeners() {
    return {
      'click': this.#onTriggerClick.bind(this),
      'keydown': this.#onTriggerKeydown.bind(this),
      'keyup': this.#onTriggerKeyup.bind(this)
    };
  }

  constructor(
    public host: ReactiveControllerHost & ToggleHost & ReactiveElement, popupType?: PopupKind
  ) {
    this.host.addController(this);
    this.#popupType = popupType || 'menu';
    this.#connectFloat();
    this.host?.requestUpdate();
  }

  /**
   * adds event listeners to items container
   */
  hostConnected() {
    this.#connectFloat();
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected() {
    if (this.#connected) {
      if (this.#float) {
        this.host?.removeController(this.#float);
        this.host?.requestUpdate();
      }
      for (const [event, listener] of Object.entries(this.#hostListeners)) {
        this.host?.removeEventListener(event, listener as (event: Event | null) => void);
      }
    }
  }

  #connectFloat() {
    if (!this.#connected) {
      if (!this.#float) {
        this.#float = new FloatingDOMController(this.host, {
          content: (): HTMLElement | undefined | null => this.popupElement
        });
      }
      if (this.#float) {
        this.host?.addController(this.#float);
        this.host?.requestUpdate();
      }
      for (const [event, listener] of Object.entries(this.#hostListeners)) {
        this.host?.addEventListener(event, listener as (event: Event | null) => void);
      }
    }
  }

  #fireOpenChanged() {
    /**
     * @fires open-change
     */
    this.host?.dispatchEvent(new Event('open-change'));
  }

  #updateFocused() {
    const focusedLightDOM = document.activeElement && !!this.host?.contains(document.activeElement);
    const focusedShadowDOM = this.host?.shadowRoot?.activeElement && !!this.host.shadowRoot?.contains(this.host?.shadowRoot?.activeElement);
    this.focused = !!focusedLightDOM || !!focusedShadowDOM;
    if (!this.focused) {
      setTimeout( this.hide.bind(this), 300);
    }
  }

  /**
   * sets focus and tests for closing
   * when any part of select loses focus
   */
  #onHostFocusout() {
    this.focused = false;
    // wait for immediate focus or hover event;
    // then test if popup can be closed
    setTimeout(this.hide.bind(this), 300);
  }

  /**
   * sets indicator when any part of select gets focus
   */
  #onHostFocusin() {
    this.focused = true;
  }

  /**
   * sets focus and tests for closing
   * when any part of select loses hover
   */
  #onHostMouseout() {
    this.hovered = false;
    // wait for immediate focus or hover event;
    // then test if popup can be closed
    setTimeout( this.hide.bind(this), 300);
  }

  /**
   * sets indicator when any part of select gets hover
   */
  #onHostMouseover() {
    this.hovered = true;
  }

  /**
   * handles listbox click event
   */
  #onPopupClick() {
    this.#updateFocused();
  }

  /**
   * handles listbox ≈ event
   */
  async #onPopupKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        event.stopImmediatePropagation();
        await this.hide(true);
        break;
    }
    this.#updateFocused();
  }

  /**
   * handles listbox keyup event
   */
  #onPopupKeyup() {
    this.#updateFocused();
  }

  /**
   * handles toggle button click event
   */
  async #onTriggerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    await this.toggle();
    this.#updateFocused();
  }

  /**
   * handles toggle keydown event
   * @param event {KeyboardEvent}
   */
  async #onTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopImmediatePropagation();
      await this.show(true);
    }
  }

  /**
   * handles listbox keyup event
   */
  #onTriggerKeyup() {
    this.#updateFocused();
  }

  /**
   * sets popup event listeners and floating DOM controllers
  */
  setPopupElement(popupElement?: HTMLElement | null) {
    if (popupElement && this.#popupElement !== popupElement) {
      const listeners = Object.entries({
        ...this.#popupListeners,
        ...this.#hostListeners,
      });
      // remove old listener
      if (this.#popupElement) {
        for (const [event, listener] of listeners) {
          this.#popupElement?.removeEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
        }
      }
      // set popup element
      this.#popupElement = popupElement;
      this.#popupElement.id ||= getRandomId(this.host.localName);
      // add new listeners
      for (const [event, listener] of listeners) {
        this.#popupElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
    }
  }

  /**
   * connects a trigger element
   * (multiple trigger elements, such as an input and a button, can be added)
   * @param popup {HTMLElement}
   */
  addTriggerElement( triggerElement?: HTMLElement | null ) {
    if (triggerElement && !this.#triggerElements?.includes(triggerElement)) {
      this.#triggerElements?.push(triggerElement);
      for (const [event, listener] of Object.entries(this.#triggerListeners)) {
        triggerElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      triggerElement?.setAttribute('aria-haspopup', this.#popupType);
      triggerElement?.setAttribute('aria-controls', this.#popupElement?.id || '');
      triggerElement?.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    }
  }

  /**
   * disconnects a trigger element
   * @param popup {HTMLElement}
   */
  removeTriggerElement( triggerElement?: HTMLElement | null ) {
    if (triggerElement && !this.#triggerElements?.includes(triggerElement)) {
      this.#triggerElements = this.#triggerElements?.filter(el => el !== triggerElement);
      for (const [event, listener] of Object.entries(this.#triggerListeners)) {
        triggerElement?.removeEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      triggerElement?.removeAttribute('aria-haspopup');
      triggerElement?.removeAttribute('aria-controls');
      triggerElement?.removeAttribute('aria-expanded');
    }
  }

  /**
   * toggles popup based on current state
   */
  async toggle() {
    this.expanded ? await this.hide(true) : await this.show();
  }

  /**
   * shows popup and sets focus
   * @param focus {boolean} whether popup element should receive focus
   */
  async show(focus = false) {
    const { expanded } = this;
    if (this.#popupElement && this.float) {
      await this.float.show({
        placement: this.position || 'bottom',
        flip: !!this.enableFlip,
      });
      this.host.expanded = true;
      await this.host.updateComplete;
      if (expanded !== this.expanded) {
        this.#fireOpenChanged();
      }
      this.#triggerElements?.forEach(element => {
        element.setAttribute('aria-expanded', 'true');
      });
      if (focus) {
        this.#popupElement?.focus();
      }
      this.host?.dispatchEvent(new CustomEvent('open'));
    }
  }

  /**
   * hides popup and sets focus
   */
  async hide(force = false) {
    const { expanded } = this;
    const hasFocus = this.#focused || this.#hovered;
    // only close if popup is not set to always open
    // and it does not currently have focus/hover
    if (this.float && (force || !hasFocus)) {
      await this.float.hide();
      this.host.expanded = false;
      await this.host.updateComplete;
      if (expanded !== this.expanded) {
        this.#fireOpenChanged();
      }
      this.#triggerElements?.forEach(element => {
        element.setAttribute('aria-expanded', 'false');
      });
      // only re-set focus if host had focus
      if (this.#focused) {
        this.host.focus();
      }
      this.host?.dispatchEvent(new CustomEvent('close'));
    }
  }
}
