import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { FloatingDOMController, type Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { InternalsController } from './internals-controller.js';
import { ListboxController } from './listbox-controller.js';
import { getRandomId } from '../functions/random.js';

/**
 * properties for popup option elements
 */
export interface ToggleHost extends HTMLElement {
  expanded: boolean;
}

export type PopupKind = 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

export interface ToggleControllerOptions {
  kind?: PopupKind;
  getTogglableElement?: () => Element;
  willChange?(old: boolean): void;
  onChange?(bool: boolean): void;
}

function isReactiveControllerHost(element: HTMLElement): element is HTMLElement & ReactiveControllerHost {
  return 'addController' in element && typeof element.addController === 'function';
}

/**
 * Whether or not the container contains the node,
 * and if not, whether the node is contained by any element
 * slotted in to the container
 */
function containsDeep(container: Element, node: Node) {
  if (container.contains(node)) {
    return true;
  } else {
    for (const slot of container.querySelectorAll('slot') ?? []) {
      for (const el of slot.assignedElements()) {
        if (el.contains(node)) {
          return true;
        }
      }
    }
    return false;
  }
}

/**
 * Implements roving tabindex, as described in WAI-ARIA practices, [Managing Focus Within
 * Components Using a Roving
 * tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
 */
export class ToggleController implements ReactiveController {
  /** element that toggles popup */
  #triggerElements: HTMLElement[] = [];

  /** pop-up that is toggled */
  #popupElement?: HTMLElement;

  #popupType: PopupKind = 'menu';

  #float?: FloatingDOMController;

  #triggerInternals = new WeakMap<HTMLElement, InternalsController>;

  #getToggleElement: () => Element | null;

  #hostListeners = {
    'focusin': this.#onHostFocusin.bind(this),
    'focusout': this.#onHostFocusout.bind(this),
    'mouseout': this.#onHostMouseout.bind(this),
    'mouseover': this.#onHostMouseover.bind(this),
  };

  #popupListeners = {
    'click': this.#onPopupClick.bind(this),
    'keydown': this.#onPopupKeydown.bind(this),
    'keyup': this.#onPopupKeyup.bind(this),
  };

  #triggerListeners = {
    'click': this.#onTriggerClick.bind(this),
    'keydown': this.#onTriggerKeydown.bind(this),
    'keyup': this.#onTriggerKeyup.bind(this),
    'focusin': this.#onTriggerFocusin.bind(this),
  };

  /** whether host is focused */
  focused = false;

  /** whether host is hovered */
  hovered = false;

  enableFlip = false;

  position: Placement = 'bottom-start';

  get styles() {
    return this.#float?.styles || {};
  }

  get anchor() {
    return this.#float?.anchor || '';
  }

  get alignment() {
    return this.#float?.alignment || 'center';
  }

  get expanded() {
    return !!this.#float?.open;
  }

  get popupElement() {
    return this.#popupElement;
  }

  set popupType(popupType: PopupKind) {
    if (this.#popupType !== popupType) {
      this.#popupType = popupType;
      this.#triggerElements.forEach(element => {
        const internals = this.#triggerInternals.get(element);
        if (internals) {
          internals.ariaHasPopup = this.#popupType;
        } else {
          element.setAttribute('aria-haspopup', this.#popupType);
        }
      });
    }
  }

  constructor(public host: ReactiveControllerHost, private options?: ToggleControllerOptions) {
    this.#getToggleElement = options?.getTogglableElement ?? (() =>
      (host instanceof Element) ? host : null);
    this.host.addController(this);
    this.#popupType = options?.kind ?? 'menu';
    this.hostConnected();
  }

  /**
   * adds event listeners to items container
   */
  hostConnected() {
    this.#float ??= new FloatingDOMController(this.host, {
      content: () => this.popupElement,
    });
    if (this.#float) {
      this.host?.addController(this.#float);
      this.host?.requestUpdate();
    }
    for (const [event, listener] of Object.entries(this.#hostListeners)) {
      this.#getToggleElement()?.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected() {
    if (this.#float) {
      this.host?.removeController(this.#float);
      this.host?.requestUpdate();
    }
    for (const [event, listener] of Object.entries(this.#hostListeners)) {
      this.#getToggleElement()?.removeEventListener(event, listener as (event: Event | null) => void);
    }
  }

  #updateFocused() {
    const el = this.#getToggleElement();
    if (el) {
      const focusedLightDOM =
        document.activeElement && !!el.contains(document.activeElement);
      const focusedShadowDOM =
          el?.shadowRoot?.activeElement &&
        !!el?.shadowRoot?.contains(el?.shadowRoot?.activeElement);
      this.focused = !!focusedLightDOM || !!focusedShadowDOM;
      if (!this.focused) {
        setTimeout(this.hide.bind(this), 300);
      }
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
    setTimeout(this.hide.bind(this), 300);
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
      case 'Tab':
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
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
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
   * When a trigger is focused, if the previously focused element
   * is a child of the popup element, close the popup
   */
  #onTriggerFocusin(event: FocusEvent) {
    if (this.expanded &&
        !!this.#popupElement &&
        containsDeep(this.#popupElement, event.relatedTarget as Node)) {
      this.hide(true);
    }
  }

  /**
   * sets popup event listeners and floating DOM controllers
   */
  setPopupElement(popupElement?: HTMLElement | null) {
    const el = this.#getToggleElement();
    if (el && popupElement && this.#popupElement !== popupElement) {
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
      this.#popupElement.id ||= getRandomId(el.localName);
      if (this.#popupElement?.id) {
        const id = this.#popupElement?.id;
        this.#triggerElements.forEach(triggerElement => triggerElement?.setAttribute('controls', id));
      }
      // add new listeners
      for (const [event, listener] of listeners) {
        this.#popupElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
    }
  }

  /**
   * connects a trigger element
   * (multiple trigger elements, such as an input and a button, can be added)
   */
  addTriggerElement(triggerElement?: HTMLElement | null ) {
    if (triggerElement && !this.#triggerElements.includes(triggerElement)) {
      // use internals, if possible
      if (isReactiveControllerHost(triggerElement)) {
        const internals = InternalsController.of(triggerElement);
        internals.ariaExpanded = this.expanded ? 'true' : 'false';
        internals.ariaHasPopup = this.#popupType;
        this.#triggerInternals.set(triggerElement, internals);
      } else {
        // otherwise, set attributes
        triggerElement?.setAttribute('aria-haspopup', this.#popupType);
        triggerElement?.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
      }
      if (this.#popupElement?.id) {
        triggerElement?.setAttribute('controls', this.#popupElement?.id);
      }
      for (const [event, listener] of Object.entries(this.#triggerListeners)) {
        triggerElement?.addEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      this.#triggerElements.push(triggerElement);
    }
  }

  /**
   * disconnects a trigger element
   */
  removeTriggerElement(triggerElement?: HTMLElement | null) {
    if (triggerElement && !this.#triggerElements.includes(triggerElement)) {
      this.#triggerElements = this.#triggerElements.filter(el => el !== triggerElement);
      for (const [event, listener] of Object.entries(this.#triggerListeners)) {
        triggerElement?.removeEventListener(event, listener as (event: KeyboardEvent | MouseEvent | Event | null) => void);
      }
      const internals = this.#triggerInternals.get(triggerElement);
      if (internals) {
        internals.ariaHasPopup = null;
        internals.ariaExpanded = null;
      } else {
        triggerElement.removeAttribute('aria-haspopup');
        triggerElement?.removeAttribute('aria-expanded');
      }
      triggerElement?.removeAttribute('controls');
    }
  }

  /**
   * toggles popup based on current state
   */
  async toggle(force?: boolean) {
    force ??= !this.expanded;
    await (force ? this.show() : this.hide(true));
  }

  /**
   * shows popup and sets focus
   * @param focus whether popup element should receive focus
   */
  async show(focus = false) {
    this.options?.willChange?.(this.expanded);
    if (!this.expanded) {
      this.options?.onChange?.(this.expanded);
    }
    if (this.#popupElement && this.#float) {
      await this.#float.show({
        placement: this.position || 'bottom',
        flip: !!this.enableFlip,
      });
      await this.host.updateComplete;
      this.#triggerElements.forEach(element => {
        const internals = this.#triggerInternals.get(element);
        if (internals) {
          internals.ariaExpanded = 'true';
        } else {
          element.setAttribute('aria-expanded', 'true');
        }
      });
      if (focus) {
        // workaround for non-chromium browsers
        // @ts-expect-error(bennypowers): intentional, internal access
        const lists = ListboxController.instances;
        if (lists.has(this.#popupElement as unknown as ReactiveControllerHost)) {
          lists.get(this.#popupElement as unknown as ReactiveControllerHost)?.focusActiveItem();
        } else {
          this.#popupElement.focus();
        }
      }
    }
  }

  /**
   * hides popup and sets focus
   */
  async hide(force = false) {
    this.options?.willChange?.(this.expanded);
    const { expanded, focused, hovered } = this;
    const hasFocus = focused || hovered;
    // only close if popup is not set to always open
    // and it does not currently have focus/hover
    if (this.#float && (force || !hasFocus)) {
      await this.#float.hide();
      await this.host.updateComplete;
      if (expanded !== this.expanded) {
        this.options?.onChange?.(this.expanded);
      }
      this.#triggerElements.forEach(element => {
        const internals = this.#triggerInternals.get(element);
        if (internals) {
          internals.ariaExpanded = 'false';
        } else {
          element.setAttribute('aria-expanded', 'false');
        }
      });
      const el = this.#getToggleElement();
      // only re-set focus if host had focus
      if (focused) {
        (el as HTMLElement)?.focus();
      }
    }
  }
}
