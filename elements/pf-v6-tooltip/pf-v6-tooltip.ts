/* eslint-disable lit-a11y/accessible-name -- tooltip content text IS the accessible name */
import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement, html, isServer } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';

import {
  FloatingDOMController,
  type Placement,
} from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { StringListConverter } from '@patternfly/pfe-core';

import styles from './pf-v6-tooltip.css';

export type { Placement };

export type TooltipAlignment = 'start' | 'end' | 'left' | 'right';

export type TooltipTriggerReason =
  | 'mouseenter'
  | 'focusin'
  | 'mouseleave'
  | 'focusout';

export class TooltipShowEvent extends Event {
  constructor(public reason: TooltipTriggerReason) {
    super('show', { bubbles: true, cancelable: true });
  }
}

export class TooltipHideEvent extends Event {
  constructor(public reason: TooltipTriggerReason) {
    super('hide', { bubbles: true, cancelable: true });
  }
}

const ENTRY_EVENTS: readonly string[] = ['focusin', 'mouseenter'];
const EXIT_EVENTS: readonly string[] = ['focusout', 'mouseleave'];

/**
 * A tooltip is in-app messaging used to identify elements on a page with
 * short, clarifying text.
 * @summary Supplementary text popup on hover or focus.
 * @slot - Trigger element that invokes the tooltip on hover or focus.
 * @slot content - Rich tooltip content. Overrides the `content` attribute.
 * @cssprop {<length>} [--pf-v6-c-tooltip--MaxWidth=18.75rem] - Maximum width of the tooltip.
 * @cssprop {<color>} [--pf-v6-c-tooltip__content--Color] - Tooltip text color.
 * @cssprop {<color>} [--pf-v6-c-tooltip__content--BackgroundColor] - Tooltip background color.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--FontSize] - Tooltip font size.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--BorderRadius] - Tooltip border radius.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingBlockStart] - Block start padding.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingBlockEnd] - Block end padding.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingInlineStart] - Inline start padding.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingInlineEnd] - Inline end padding.
 * @cssprop [--pf-v6-c-tooltip--BoxShadow] - Tooltip box shadow.
 * @cssprop {<length>} [--pf-v6-c-tooltip__arrow--Width=0.9375rem] - Arrow width.
 * @cssprop {<length>} [--pf-v6-c-tooltip__arrow--Height=0.9375rem] - Arrow height.
 * @cssprop {<color>} [--pf-v6-c-tooltip__arrow--BackgroundColor] - Arrow background color.
 * @fires {TooltipShowEvent} show - Cancelable event fired before the tooltip shows. The `reason` field indicates what triggered it.
 * @fires {TooltipHideEvent} hide - Cancelable event fired before the tooltip hides. The `reason` field indicates what triggered it.
 */
@customElement('pf-v6-tooltip')
export class PfV6Tooltip extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** When true, the tooltip is displayed. */
  @property({ type: Boolean }) visible = false;

  /** Position of the tooltip relative to the trigger element. */
  @property() position: Placement = 'top';

  /** Tooltip content text. Overridden by the content slot. */
  @property() content?: string;

  /** Disables automatic repositioning when the tooltip would overflow */
  @property({ type: Boolean, attribute: 'no-flip' }) noFlip = false;

  /**
   * Fallback positions when flip is enabled and the initial position
   * is not possible. Comma-separated list of placements.
   */
  @property({
    attribute: 'flip-behavior',
    converter: StringListConverter,
  }) flipBehavior?: Placement[];

  /**
   * External trigger element. As an attribute, accepts the ID of an element
   * in the same root. As a property, also accepts an Element reference directly.
   */
  @property() trigger?: string | Element;

  /** Delay in ms before the tooltip appears */
  @property({ type: Number, attribute: 'entry-delay' }) entryDelay = 300;

  /** Delay in ms before the tooltip disappears */
  @property({ type: Number, attribute: 'exit-delay' }) exitDelay = 300;

  /** Text alignment within the tooltip content */
  @property() alignment?: TooltipAlignment;

  #entryTimeout?: ReturnType<typeof setTimeout>;
  #exitTimeout?: ReturnType<typeof setTimeout>;
  #triggerElement?: HTMLElement | null;

  get #invoker(): HTMLSlotElement | null {
    return this.shadowRoot?.querySelector('#invoker') ?? null;
  }

  get #invokerElement(): HTMLElement | null {
    if (this.#triggerElement) {
      return this.#triggerElement;
    }
    const slot = this.#invoker;
    if (slot instanceof HTMLSlotElement) {
      return slot.assignedElements()[0] as HTMLElement ?? null;
    }
    return null;
  }

  get #tooltipEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector('#tooltip') ?? null;
  }

  get #arrowEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector('#arrow') ?? null;
  }

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | null | undefined => this.#tooltipEl,
    invoker: (): HTMLElement | null | undefined => {
      if (this.#triggerElement) {
        return this.#triggerElement;
      }
      const slot = this.#invoker;
      if (slot instanceof HTMLSlotElement
          && slot.assignedElements().length > 0) {
        return slot.assignedElements()[0] as HTMLElement;
      }
      return slot;
    },
    arrow: (): HTMLElement | null | undefined => this.#arrowEl,
  });

  override connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.#updateTriggerListeners();
      this.addEventListener('keydown', this.#onKeydown);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#clearTimers();
    this.#removeTriggerListeners();
    this.removeEventListener('keydown', this.#onKeydown);
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('trigger')) {
      this.#updateTriggerListeners();
    }
  }

  override render(): TemplateResult {
    const { alignment: floatAlignment, anchor, open, styles: floatStyles } = this.#float;
    return html`
      <slot id="invoker"
            @slotchange=${this.#onSlotChange}></slot>
      <div id="tooltip"
           style="${styleMap(floatStyles)}"
           class="${classMap({
             open,
             [anchor]: !!anchor,
             [floatAlignment]: !!floatAlignment,
           })}">
        <div id="arrow"></div>
        <div id="content"
             role="tooltip"
             ?inert=${!open}
             style="${styleMap({
               ...this.alignment && { 'text-align': this.alignment },
             })}">
          <slot name="content">${this.content}</slot>
        </div>
      </div>
    `;
  }

  /** Show the tooltip programmatically */
  async show(): Promise<void> {
    this.visible = true;
    await this.updateComplete;
    const placement = this.position;
    const offset =
          !placement?.match(/top|bottom/) ? 15
        : { mainAxis: 15, alignmentAxis: -4 };
    const flip = !this.noFlip;
    const fallbackPlacements = this.flipBehavior;
    await this.#float.show({ offset, placement, flip, fallbackPlacements });
    this.#setAriaDescribedBy(true);
  }

  /** Hide the tooltip programmatically */
  async hide(): Promise<void> {
    this.visible = false;
    this.#clearTimers();
    this.#setAriaDescribedBy(false);
    await this.#float.hide();
  }

  @observes('visible')
  protected _visibleChanged(): void {
    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  #setAriaDescribedBy(add: boolean): void {
    const trigger = this.#invokerElement;
    const content = this.shadowRoot?.querySelector('#content') ?? null;
    if (!trigger || !content) {
      return;
    }
    if ('ariaDescribedByElements' in trigger) {
      (trigger as unknown as { ariaDescribedByElements: Element[] })
          .ariaDescribedByElements = add ? [content] : [];
    }
  }

  #clearTimers(): void {
    clearTimeout(this.#entryTimeout);
    clearTimeout(this.#exitTimeout);
  }

  #onSlotChange(): void {
    if (!isServer) {
      this.#updateTriggerListeners();
    }
    this.requestUpdate();
  }

  #getTriggerElement(): HTMLElement | null {
    if (!this.trigger) {
      return null;
    }
    if (typeof this.trigger !== 'string') {
      return this.trigger instanceof HTMLElement ? this.trigger : null;
    }
    return (this.getRootNode() as Document | ShadowRoot)
        .getElementById(this.trigger);
  }

  #updateTriggerListeners(): void {
    if (isServer) {
      return;
    }
    this.#removeTriggerListeners();
    this.#triggerElement = this.#getTriggerElement();
    const target = this.#triggerElement ?? this;
    for (const evt of ENTRY_EVENTS) {
      target.addEventListener(evt, this.#onEntry);
    }
    for (const evt of EXIT_EVENTS) {
      target.addEventListener(evt, this.#onExit);
    }
    if (this.#triggerElement) {
      this.addEventListener('mouseenter', this.#onEntry);
      this.addEventListener('mouseleave', this.#onExit);
    }
  }

  #removeTriggerListeners(): void {
    const target = this.#triggerElement ?? this;
    for (const evt of ENTRY_EVENTS) {
      target.removeEventListener(evt, this.#onEntry);
    }
    for (const evt of EXIT_EVENTS) {
      target.removeEventListener(evt, this.#onExit);
    }
    if (this.#triggerElement) {
      this.removeEventListener('mouseenter', this.#onEntry);
      this.removeEventListener('mouseleave', this.#onExit);
    }
  }

  #onEntry = (event: Event): void => {
    const reason = event.type as TooltipTriggerReason;
    if (!this.dispatchEvent(new TooltipShowEvent(reason))) {
      return;
    }
    this.#clearTimers();
    this.#entryTimeout = setTimeout(() => this.show(), this.entryDelay);
  };

  #onExit = (event: Event): void => {
    const reason = event.type as TooltipTriggerReason;
    if (!this.dispatchEvent(new TooltipHideEvent(reason))) {
      return;
    }
    this.#clearTimers();
    this.#exitTimeout = setTimeout(() => this.hide(), this.exitDelay);
  };

  #onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.#float.open) {
      this.hide();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-tooltip': PfV6Tooltip;
  }
}
