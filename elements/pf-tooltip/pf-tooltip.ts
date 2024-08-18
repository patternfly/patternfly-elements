import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement, html, isServer } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  FloatingDOMController,
  type Placement,
} from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { bound } from '@patternfly/pfe-core/decorators/bound.js';

import { StringListConverter } from '@patternfly/pfe-core';

import styles from './pf-tooltip.css';

const EnterEvents = ['focusin', 'tap', 'click', 'mouseenter'];
const ExitEvents = ['focusout', 'blur', 'mouseleave'];

/**
 * A **tooltip** is in-app messaging used to identify elements on a page with short,
 * clarifying text.
 * @summary Toggle the visibility of helpful or contextual information.
 * @slot
 *       This slot wraps around the element that should be used to invoke the tooltip content to display.
 *       Typically this would be an icon, button, or other small sized element.
 * @slot content
 *       This slot renders the content that will be displayed inside of the tooltip.
 *       Typically this would include a string of text without any additional elements.
 *       This element is wrapped with a div inside of the component to give it the stylings and background colors.
 * @cssprop     {<color>} [--pf-c-tooltip__content--BackgroundColor=#1b1d21]
 *              Sets the background color for the tooltip content.
 *
 * @cssprop     {<color>} [--pf-c-tooltip__content--Color=#e0e0e0]
 *              Sets the font color for the tooltip content.
 *
 * @cssprop     {<number>} [--pf-c-tooltip--line-height=1.5]
 *              Sets the font color for the tooltip content.
 *
 * @cssprop     {<length>} [--pf-c-tooltip--MaxWidth=18.75rem]
 *              Maximum width for the tooltip.
 *
 * @cssprop     [--pf-c-tooltip--BoxShadow=0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)]
 *              Box shadow for the tooltip.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__content--PaddingTop=0.5rem]
 *              Top padding for the tooltip.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__content--PaddingRight=0.5rem]
 *              Right padding for the tooltip.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__content--PaddingBottom=0.5rem]
 *              Bottom padding for the tooltip.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__content--PaddingLeft=0.5rem]
 *              Left Padding for the tooltip.
 *
 * @cssprop     [--pf-c-tooltip__content--FontSize=0.875rem]
 *              Font size for the tooltip content.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__arrow--Width=0.5rem]
 *              Tooltip arrow width.
 *
 * @cssprop     {<length>} [--pf-c-tooltip__arrow--Height=0.5rem]
 *              Tooltip arrow height.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-top--TranslateX=-50]
 *              Positions the tooltip arrow along the x axis for `top` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-top--TranslateY=50]
 *              Positions the tooltip arrow along the y axis for `top` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-top--Rotate=45deg]
 *              Rotates the tooltip arrow based on degrees of movement for `top` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-right--TranslateX=-50]
 *              Positions the tooltip arrow along the x axis for `right` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-right--TranslateY=-50]
 *              Positions the tooltip arrow along the y axis for `right` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-right--Rotate=45deg]
 *              Rotates the tooltip arrow based on degrees of movement for `right` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-bottom--TranslateX=-50]
 *              Positions the tooltip arrow along the x axis for `bottom` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-bottom--TranslateY=-50]
 *              Positions the tooltip arrow along the y axis for `bottom` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-bottom--Rotate=45deg]
 *              Rotates the tooltip arrow based on degrees of movement for `bottom` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-left--TranslateX=50]
 *              Positions the tooltip arrow along the x axis for `left` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-left--TranslateY=-50]
 *              Positions the tooltip arrow along the y axis for `left` positioned arrows.
 *
 * @cssprop     [--pf-c-tooltip__arrow--m-left--Rotate=45deg]
 *              Rotates the tooltip arrow based on degrees of movement for `left` positioned arrows.
 *
 */
@customElement('pf-tooltip')
export class PfTooltip extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** The position of the tooltip, relative to the invoking content */
  @property() position: Placement = 'top';

  /** Tooltip content. Overridden by the content slot */
  @property() content?: string;

  /** If false, prevents the tooltip from trying to remain in view by flipping itself when necessary */
  @property({ type: Boolean, attribute: 'no-flip' }) noFlip = false;

  @property() trigger?: string | Element;

  /**
   * The flip order when flip is enabled and the initial position is not possible.
   * There are 12 options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`,
   * `bottom-start`, `bottom-end`, `left-start`, `left-end`,`right-start`, `right-end`.
   * The default is [oppositePlacement], where only the opposite placement is tried.
   */
  @property({
    attribute: 'flip-behavior',
    converter: StringListConverter,
  }) flipBehavior?: Placement[];

  get #invoker(): HTMLSlotElement | null {
    return this.shadowRoot?.querySelector('#invoker') ?? null;
  }

  get #content(): HTMLElement | null {
    return this.shadowRoot?.querySelector('#tooltip') ?? null;
  }

  #referenceTrigger?: HTMLElement | null;

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | null | undefined => this.#content,
    invoker: (): HTMLElement | null | undefined => {
      if (this.#referenceTrigger) {
        return this.#referenceTrigger;
      } else if (this.#invoker instanceof HTMLSlotElement
              && this.#invoker.assignedElements().length > 0) {
        return this.#invoker.assignedElements().at(0) as HTMLElement;
      } else {
        return this.#invoker;
      }
    },
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.#invokerChanged();
    this.#updateTrigger();
  }

  /**
   * Removes event listeners from the old trigger element and attaches
   * them to the new trigger element.
   * @param changed changed properties
   */
  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('trigger')) {
      this.#updateTrigger();
    }
  }

  override render(): TemplateResult<1> {
    const { alignment, anchor, open, styles } = this.#float;

    const blockInvoker =
      this.#invoker?.assignedElements().length === 0
      && this.#invoker?.assignedNodes().length > 0;
    const display = blockInvoker ? 'block' : 'contents';

    return html`
      <div id="container"
           style="${styleMap(styles)}"
           class="${classMap({ open,
                               [anchor]: !!anchor,
                               [alignment]: !!alignment })}">
        <div role="tooltip"
             style="${styleMap({ display })}"
             aria-labelledby="tooltip">
          <slot id="invoker" @slotchange="${this.#invokerChanged}"></slot>
        </div>
        <div aria-hidden="${String(!open) as 'true' | 'false'}">
          <slot id="tooltip" name="content">${this.content}</slot>
        </div>
      </div>
    `;
  }

  /** the invoker slot should render at block level if it only has text nodes */
  #invokerChanged() {
    this.requestUpdate();
  }

  #getReferenceTrigger() {
    return (this.getRootNode() as Document | ShadowRoot)
        .getElementById(this.trigger?.normalize() ?? '');
  }

  #updateTrigger() {
    if (!isServer) {
      const oldReferenceTrigger = this.#referenceTrigger;
      this.#referenceTrigger =
          this.trigger instanceof HTMLElement ? this.trigger
        : typeof this.trigger === 'string' ? this.#getReferenceTrigger()
        : null;
      for (const evt of EnterEvents) {
        if (this.#referenceTrigger) {
          this.removeEventListener(evt, this.show);
          this.#referenceTrigger.addEventListener(evt, this.show);
        } else {
          oldReferenceTrigger?.removeEventListener(evt, this.show);
          this.addEventListener(evt, this.show);
        }
      }
      for (const evt of ExitEvents) {
        if (this.#referenceTrigger) {
          this.removeEventListener(evt, this.hide);
          this.#referenceTrigger.addEventListener(evt, this.hide);
        } else {
          oldReferenceTrigger?.removeEventListener(evt, this.hide);
          this.addEventListener(evt, this.hide);
        }
      }
    }
  }

  @bound async show(): Promise<void> {
    await this.updateComplete;
    const placement = this.position;
    const offset =
        !placement?.match(/top|bottom/) ? 15
      : { mainAxis: 15, alignmentAxis: -4 };
    await this.#float.show({
      offset,
      placement,
      flip: !this.noFlip,
      fallbackPlacements: this.flipBehavior,
    });
  }

  @bound async hide(): Promise<void> {
    await this.#float.hide();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tooltip': PfTooltip;
  }
}
