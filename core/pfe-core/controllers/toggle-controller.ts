import type { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { getRandomId } from '../functions/random.js';
export type Placement = 'bottom' | 'top' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * properties for popup option elements
 */
export interface ToggleHost extends HTMLElement {
  open: boolean;
}

export type HasPopupType = 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class ToggleController<
  ItemType extends HTMLElement = HTMLElement,
> implements ReactiveController {
  /** element that triggers aria-haspopup content open or closed */
  #triggerElements?: HTMLElement[];

  /** pop-up that is toggled */
  #popupElement?: HTMLElement;

  /** whether host is hovered */
  #hovered = false;

  /** whether host is focused */
  #focused = false;

  #float?: FloatingDOMController;

  #position: Placement = 'bottom-start';

  #enableFlip = false;

  #popupType: HasPopupType = 'true';

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

  get open() {
    return !!this.float?.open;
  }

  get popupElement() {
    return this.#popupElement;
  }

  set popupType(popupType: HasPopupType) {
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

  get #documentListeners() {
    return {
      'keyup': this.#updateFocused.bind(this),
      'click': this.#updateFocused.bind(this)
    };
  }

  get #hostListeners() {
    return {
      'focus': this.#onHostFocus.bind(this),
      'blur': this.#onHostBlur.bind(this),
      'mouseover': this.#onHostMouseover.bind(this),
      'mouseout': this.#onHostMouseout.bind(this),
    };
  }

  get #popupListeners() {
    return {
      'keydown': this.#onPopupKeydown.bind(this),
      'keyup': this.#updateFocused.bind(this),
      'click': this.#updateFocused.bind(this)
    };
  }

  get #triggerListeners() {
    return {
      'keydown': this.#onTriggerKeydown.bind(this),
      'keyup': this.#updateFocused.bind(this),
      'click': this.#onTriggerClick.bind(this)
    };
  }

  constructor(
    public host: ReactiveControllerHost & ToggleHost & ReactiveElement, popupType?: HasPopupType
  ) {
    this.host.addController(this);
    this.#popupType = popupType || 'menu';
    this.#float = new FloatingDOMController(this.host, {
      content: (): HTMLElement | undefined | null => this.popupElement
    });
    for (const [event, listener] of Object.entries(this.#hostListeners)) {
      this.host?.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * adds event listeners to items container
   */
  hostConnected() {
    for (const [event, listener] of Object.entries(this.#documentListeners)) {
      document.addEventListener(event, listener as (event: Event | null) => void);
    }
    for (const [event, listener] of Object.entries(this.#hostListeners)) {
      this.host?.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected() {
    for (const [event, listener] of Object.entries(this.#documentListeners)) {
      document.removeEventListener(event, listener as (event: Event | null) => void);
    }
    for (const [event, listener] of Object.entries(this.#hostListeners)) {
      this.host?.removeEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * sets popup event listneres and floating DOM controllers
  */
  setPopupElement(popupElement?: HTMLElement | null) {
    if (popupElement && this.#popupElement !== popupElement) {
      // remove old listener
      if (this.#popupElement) {
        for (const [event, listener] of Object.entries(this.#popupListeners)) {
          this.#popupElement?.removeEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
        }
        for (const [event, listener] of Object.entries(this.#hostListeners)) {
          this.#popupElement?.removeEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
        }
      }
      // set popup element
      this.#popupElement = popupElement;
      this.#popupElement.id = getRandomId(this.host.localName);
      // add new listeners
      for (const [event, listener] of Object.entries(this.#popupListeners)) {
        this.#popupElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      for (const [event, listener] of Object.entries(this.#hostListeners)) {
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
      for (const [event, listener] of Object.entries(this.#hostListeners)) {
        triggerElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      triggerElement?.setAttribute('aria-haspopup', this.#popupType);
      triggerElement?.setAttribute('aria-controls', this.#popupElement?.id || '');
      triggerElement?.setAttribute('aria-expanded', this.open ? 'true' : 'false');
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
      for (const [event, listener] of Object.entries(this.#hostListeners)) {
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
    this.open ? await this.hide(true) : await this.show();
  }

  /**
   * shows popup and sets focus
   * @param focus {boolean} whether popup element should recieve focus
   */
  async show(focus = false) {
    const { open } = this;
    if (this.#popupElement && this.float) {
      await this.float.show({
        placement: this.position || 'bottom',
        flip: !!this.enableFlip,
      });
      await this.host.updateComplete;
      if (open !== this.open) {
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
    const { open } = this;
    const hasFocus = this.#focused || this.#hovered;
    // only hide if popup is not set to always open
    // and it does not currently have focus/hover
    if (this.float && (force || !hasFocus)) {
      this.float.hide();
      await this.host.updateComplete;
      if (open !== this.open) {
        this.#fireOpenChanged();
      }
      this.#triggerElements?.forEach(element => {
        element.setAttribute('aria-expanded', 'false');
      });
      // only re-set focus if hide was forced by select itself
      if (!force && hasFocus) {
        this.host.focus();
      }
      this.host?.dispatchEvent(new CustomEvent('close'));
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
  #onHostBlur() {
    this.focused = false;
    // wait for immediate focus or hover event;
    // then test if popup can be closed
    setTimeout(this.hide.bind(this), 300);
  }

  /**
   * sets indicator when any part of select gets focus
   */
  #onHostFocus() {
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
   * handles listbox keydown event
   */
  async #onPopupKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      event.stopImmediatePropagation();
      await this.hide(true);
    }
    this.#updateFocused;
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
   * handles toggle button click event
   */
  async #onTriggerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    await this.toggle();
    this.#updateFocused();
  }
}
