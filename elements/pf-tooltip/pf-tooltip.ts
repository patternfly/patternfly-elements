import type { PropertyValues } from 'lit';
import { LitElement, html } from 'lit';
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
 * @cssprop     {<color>} --pf-c-tooltip__content--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `#1b1d21`}
 * @cssprop     {<color>} --pf-c-tooltip__content--Color
 *              Sets the font color for the tooltip content.
 *              {@default `#e0e0e0`}
 * @cssprop     {<number>} --pf-c-tooltip--line-height
 *              Sets the font color for the tooltip content.
 *              {@default `1.5`}
 * @cssprop     {<length>} --pf-c-tooltip--MaxWidth
 *              Maximum width for the tooltip.
 *              {@default `18.75rem`}
 * @cssprop     --pf-c-tooltip--BoxShadow
 *              Box shadow for the tooltip.
 *              {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingTop
 *              Top padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingRight
 *              Right padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingBottom
 *              Bottom padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingLeft
 *              Left Padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     --pf-c-tooltip__content--FontSize
 *              Font size for the tooltip content.
 *              {@default `0.875rem`}
 * @cssprop     {<length>} --pf-c-tooltip__arrow--Width
 *              Tooltip arrow width.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__arrow--Height
 *              Tooltip arrow height.
 *              {@default `0.5rem`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--TranslateX
 *              Positions the tooltip arrow along the x axis for `top` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--TranslateY
 *              Positions the tooltip arrow along the y axis for `top` positioned arrows.
 *              {@default `50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `top` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--TranslateX
 *              Positions the tooltip arrow along the x axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--TranslateY
 *              Positions the tooltip arrow along the y axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `right` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--TranslateX
 *              Positions the tooltip arrow along the x axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--TranslateY
 *              Positions the tooltip arrow along the y axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `bottom` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--TranslateX
 *              Positions the tooltip arrow along the x axis for `left` positioned arrows.
 *              {@default `50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--TranslateY
 *              Positions the tooltip arrow along the y axis for `left` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `left` positioned arrows.
 *              {@default `45deg`}
 */
@customElement('pf-tooltip')
export class PfTooltip extends LitElement {
  static readonly styles = [styles];

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

  override connectedCallback() {
    super.connectedCallback();
    this.#invokerChanged();
    this.#updateTrigger();
  }

  /**
   * Removes event listeners from the old trigger element and attaches
   * them to the new trigger element.
   */
  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('trigger')) {
      this.#updateTrigger();
    }
  }

  override render() {
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

  @bound async show() {
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

  @bound async hide() {
    await this.#float.hide();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tooltip': PfTooltip;
  }
}
