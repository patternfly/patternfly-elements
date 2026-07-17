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

export type TooltipAlignment = 'start' | 'end';

export type TooltipTriggerReason =
  | 'mouseenter'
  | 'focusin'
  | 'mouseleave'
  | 'focusout'
  | 'escape';

export class TooltipShowEvent extends Event {
  constructor(public reason: TooltipTriggerReason) {
    super('show', { bubbles: true, cancelable: true });
  }
}

export class TooltipHideEvent extends Event {
  /**
   * @param reason - What caused the hide
   * @param cancelable - False for Escape so a11y dismiss cannot be blocked
   */
  constructor(public reason: TooltipTriggerReason, cancelable = true) {
    super('hide', { bubbles: true, cancelable });
  }
}

const ENTRY_EVENTS: readonly string[] = ['focusin', 'mouseenter'];
const EXIT_EVENTS: readonly string[] = ['focusout', 'mouseleave'];

/**
 * A tooltip provides short, clarifying text for a UI element when the user
 * hovers over or focuses the trigger. Use tooltips for supplementary
 * information that SHOULD NOT contain interactive content. The trigger element
 * MUST be focusable so keyboard and screen reader users can access the tooltip.
 *
 * Accessibility is provided via a shared `role="status"` live region that
 * announces tooltip content to screen readers when shown. The tooltip also
 * attempts to set `aria-describedby` on the trigger via the cross-root
 * `ariaDescribedByElements` IDL property, but this is a progressive
 * enhancement — browsers currently reject light-to-shadow element references
 * (see WICG/aom#192, whatwg/html#5401). Until Reference Target ships,
 * the live-region announcer is the working a11y path.
 *
 * Pressing Escape dismisses an open tooltip (fires a non-cancelable `hide`
 * event with `reason: 'escape'`). Focus remains on the trigger while the
 * tooltip is visible.
 *
 * Colors invert automatically via `light-dark()` using PatternFly inverse
 * background and text tokens (`--pf-t--global--background--color--inverse--default`,
 * `--pf-t--global--text--color--inverse`).
 *
 * @summary Supplementary text popup on hover or focus.
 *
 * @slot - Focusable trigger element. MUST be keyboard-accessible (e.g. `<button>`, or an element with `tabindex="0"`).
 * @slot content - Rich tooltip content. Overrides the `content` attribute. SHOULD contain only text and inline formatting; MUST NOT contain interactive elements.
 *
 * @cssprop {<length>} [--pf-v6-c-tooltip--MaxWidth=18.75rem] - Maximum width of the tooltip. Maps to `--pf-t--global--spacer` scale.
 * @cssprop {<color>} [--pf-v6-c-tooltip__content--Color] - Tooltip text color. Defaults to `--pf-t--global--text--color--inverse`.
 * @cssprop {<color>} [--pf-v6-c-tooltip__content--BackgroundColor] - Tooltip background color. Defaults to `--pf-t--global--background--color--inverse--default`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--FontSize] - Tooltip font size. Defaults to `--pf-t--global--font--size--body--sm`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--BorderRadius] - Tooltip border radius. Defaults to `--pf-t--global--border--radius--small`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingBlockStart] - Block start padding. Defaults to `--pf-t--global--spacer--sm`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingBlockEnd] - Block end padding. Defaults to `--pf-t--global--spacer--sm`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingInlineStart] - Inline start padding. Defaults to `--pf-t--global--spacer--md`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__content--PaddingInlineEnd] - Inline end padding. Defaults to `--pf-t--global--spacer--md`.
 * @cssprop {<shadow>} [--pf-v6-c-tooltip--BoxShadow] - Tooltip box shadow. Defaults to `--pf-t--global--box-shadow--md`.
 * @cssprop {<length>} [--pf-v6-c-tooltip__arrow--Width=0.9375rem] - Arrow width.
 * @cssprop {<length>} [--pf-v6-c-tooltip__arrow--Height=0.9375rem] - Arrow height.
 * @cssprop {<color>} [--pf-v6-c-tooltip__arrow--BackgroundColor] - Arrow background color. Defaults to `--pf-t--global--background--color--inverse--default`.
 * @cssprop {<shadow>} [--pf-v6-c-tooltip__arrow--BoxShadow] - Arrow box shadow. Defaults to `--pf-t--global--box-shadow--md`.
 * @cssprop {<integer>} [--pf-v6-c-tooltip--ZIndex=10000] - Z-index of the tooltip overlay.
 *
 * @fires {TooltipShowEvent} show - Cancelable event fired before the tooltip shows. The `reason` property on the event is a `TooltipTriggerReason` string indicating what triggered it (`'mouseenter'` or `'focusin'`). Call `preventDefault()` to cancel.
 * @fires {TooltipHideEvent} hide - Event fired before the tooltip hides. The `reason` property is a `TooltipTriggerReason` (`'mouseleave'`, `'focusout'`, or `'escape'`). Cancelable for mouseleave/focusout; Escape dismiss is never cancelable.
 */
@customElement('pf-v6-tooltip')
export class PfV6Tooltip extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  private static instances = new Set<PfV6Tooltip>();

  private static announcer: HTMLElement;

  /** Tracks which instance last wrote to the shared announcer */
  private static lastAnnouncer: PfV6Tooltip | null = null;

  static {
    if (!isServer) {
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          for (const instance of PfV6Tooltip.instances) {
            if (instance.#float.open) {
              // Notify listeners; non-cancelable so Escape always dismisses
              instance.dispatchEvent(new TooltipHideEvent('escape', false));
              instance.hide();
            }
          }
        }
      });
      PfV6Tooltip.initAnnouncer();
    }
  }

  private static initAnnouncer(): void {
    document.body.append((this.announcer = Object.assign(document.createElement('div'), {
      role: 'status',
      style: /* css */`
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;`,
    })));
  }

  private static announce(instance: PfV6Tooltip, message: string): void {
    this.lastAnnouncer = instance;
    this.announcer.innerText = message;
  }

  /**
   * When true, the tooltip is displayed. Setting this property
   * programmatically calls show()/hide() via the `@observes` decorator;
   * show()/hide() also set it back, which Lit deduplicates.
   */
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
   * External trigger element (element ID or Element reference). As an attribute,
   * accepts the ID of an element in the same root. As a property, also
   * accepts an Element directly.
   */
  @property() trigger?: string | Element;

  /** Delay in ms before the tooltip appears */
  @property({ type: Number, attribute: 'entry-delay' }) entryDelay = 300;

  /** Delay in ms before the tooltip disappears */
  @property({ type: Number, attribute: 'exit-delay' }) exitDelay = 300;

  /** Text alignment within the tooltip content */
  @property() alignment?: TooltipAlignment;

  /** When true, disables screen reader announcements for tooltip content. Only use when another accessible label is provided. */
  @property({ type: Boolean }) silent = false;

  #entryTimeout?: ReturnType<typeof setTimeout>;
  #exitTimeout?: ReturnType<typeof setTimeout>;
  #triggerElement?: Element | null;
  #listenersAttached = false;

  get #accessibleContent(): string {
    if (!this.#float.open || isServer) {
      return '';
    }
    const contentSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('#content-slot');
    const slotted = contentSlot
        ?.assignedNodes()
        ?.map(n => n.textContent ?? '')
        ?.join('')
        ?.trim() ?? '';
    return slotted || this.content || '';
  }

  get #invoker(): HTMLSlotElement | null {
    return this.shadowRoot?.querySelector('#invoker') ?? null;
  }

  get #invokerElement(): Element | null {
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
        return this.#triggerElement as HTMLElement;
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
      PfV6Tooltip.instances.add(this);
      if (this.hasUpdated) {
        this.requestUpdate();
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    PfV6Tooltip.instances.delete(this);
    this.#clearTimers();
    this.#removeTriggerListeners();
    this.#listenersAttached = false;
  }

  override updated(changed: PropertyValues<this>): void {
    if (isServer) {
      return;
    }
    if (!this.#listenersAttached || changed.has('trigger')) {
      this.#updateTriggerListeners();
      this.#listenersAttached = true;
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
          <slot id="content-slot" name="content">${this.content}</slot>
        </div>
      </div>
    `;
  }

  /** Show the tooltip programmatically */
  async show(): Promise<void> {
    this.visible = true;
    await this.updateComplete;
    // bail if hide() was called while awaiting
    if (!this.visible) {
      return;
    }
    const placement = this.position;
    const offset =
          !placement?.match(/top|bottom/) ? 15
        : { mainAxis: 15, alignmentAxis: -4 };
    const flip = !this.noFlip;
    const fallbackPlacements = this.flipBehavior;
    await this.#float.show({ offset, placement, flip, fallbackPlacements });
    // bail if hide() was called while awaiting
    if (!this.visible) {
      return;
    }
    this.#setAriaDescribedBy(true);
    if (!this.silent) {
      PfV6Tooltip.announce(this, this.#accessibleContent);
    }
  }

  /** Hide the tooltip programmatically */
  async hide(): Promise<void> {
    this.visible = false;
    this.#clearTimers();
    this.#setAriaDescribedBy(false);
    await this.#float.hide();
    // bail if show() was called while awaiting
    if (this.visible) {
      return;
    }
    if (!this.silent && PfV6Tooltip.lastAnnouncer === this) {
      PfV6Tooltip.announcer.innerText = '';
      PfV6Tooltip.lastAnnouncer = null;
    }
  }

  @observes('visible')
  protected _visibleChanged(): void {
    // skip if state already matches to prevent double invocation
    if (this.visible && this.#float.open) {
      return;
    }
    if (!this.visible && !this.#float.open) {
      return;
    }
    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  @observes('content')
  protected _contentChanged(): void {
    if (this.#float.open && !this.silent) {
      PfV6Tooltip.announce(this, this.#accessibleContent);
    }
  }

  // ariaDescribedByElements is the correct cross-root ARIA API, but browsers
  // currently reject light-to-shadow element refs (see WICG/aom#192,
  // whatwg/html#5401). Kept as progressive enhancement: will start working
  // once Reference Target (WICG/webcomponents#1086) ships.
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

  #getTriggerElement(): Element | null {
    if (!this.trigger) {
      return null;
    }
    if (typeof this.trigger !== 'string') {
      return this.trigger instanceof Element ? this.trigger : null;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-tooltip': PfV6Tooltip;
  }
}
