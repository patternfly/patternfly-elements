/* eslint-disable no-console */
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import './lib/Tooltip/BaseTooltip.ts';

import style from './pfe-tooltip.scss';
import { BaseTooltip } from './lib/Tooltip/BaseTooltip.js';
import { colorContextConsumer } from '@patternfly/pfe-core/decorators.js';
import { ColorTheme } from '@patternfly/pfe-core';


/**
 * A Tooltip is a floating text area triggered by a user that provides helpful or contextual information.
 *
 * @summary Toggle the visiblity of helpful or contextual information.
 *
 * @slot invoker
 *       This slot wraps around the element that should be used to invoke the tooltip content to display.
 *       Typically this would be an icon, button, or other small sized element.
 *
 * @slot content
 *       This slot renders the content that will be displayed inside of the tooltip.
 *       Typically this would include a string of text without any additional elements.
 *       This element is wrapped with a div inside of the component to give it the stylings and background colors.
 *
 * @cssproperty --background-color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BackgroundColor--dark-100, #1b1d21)`}
 * @cssproperty --color
 *              Sets the font color for the tooltip content.
 *              {@default `var(--pf-global--Color--light-100, #e0e0e0)`}
 * @cssproperty --pf-c-tooltip--MaxWidth
 *              Maximum width for the tooltip.
 *              {@default `18.75rem`}
 * @cssproperty --pf-c-tooltip--BoxShadow
 *              Box shadow for the tooltip.
 *              {@default `var(--pf-global--BoxShadow--md, 0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06))`}
 * @cssproperty --pf-c-tooltip__content--PaddingTop
 *              Top padding for the tooltip.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssproperty --pf-c-tooltip__content--PaddingRight
 *              Right padding for the tooltip.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssproperty --pf-c-tooltip__content--PaddingBottom
 *              Bottom padding for the tooltip.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssproperty --pf-c-tooltip__content--PaddingLeft
 *              Left Padding for the tooltip.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssproperty --pf-c-tooltip__content--Color
 *              Color for the tooltip content font.
 *              {@default `var(--color)`}
 * @cssproperty --pf-c-tooltip__content--BackgroundColor
 *              Background color for the tooltip content.
 *              {@default `var(--background-color)`}
 * @cssproperty --pf-c-tooltip__content--FontSize
 *              Font size for the tooltip content.
 *              {@default `var(--pf-global--FontSize--sm, 0.875rem)`}
 * @cssproperty --pf-c-tooltip__arrow--Width
 *              Tooltip arrow width.
 *              {@default `0.5rem`}
 * @cssproperty --pf-c-tooltip__arrow--Height
 *              Tooltip arrow height.
 *              {@default `0.5rem`}
 * @cssproperty --pf-c-tooltip__arrow--m-top--TranslateX
 *              Positions the tooltip arrow along the x axis for `top` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-top--TranslateY
 *              Positions the tooltip arrow along the y axis for `top` positioned arrows.
 *              {@default `50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-top--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `top` positioned arrows.
 *              {@default `45deg`}
 * @cssproperty --pf-c-tooltip__arrow--m-right--TranslateX
 *              Positions the tooltip arrow along the x axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-right--TranslateY
 *              Positions the tooltip arrow along the y axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-right--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `right` positioned arrows.
 *              {@default `45deg`}
 * @cssproperty --pf-c-tooltip__arrow--m-bottom--TranslateX
 *              Positions the tooltip arrow along the x axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-bottom--TranslateY
 *              Positions the tooltip arrow along the y axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-bottom--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `bottom` positioned arrows.
 *              {@default `45deg`}
 * @cssproperty --pf-c-tooltip__arrow--m-left--TranslateX
 *              Positions the tooltip arrow along the x axis for `left` positioned arrows.
 *              {@default `50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-left--TranslateY
 *              Positions the tooltip arrow along the y axis for `left` positioned arrows.
 *              {@default `-50%`}
 * @cssproperty --pf-c-tooltip__arrow--m-left--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `left` positioned arrows.
 *              {@default `45deg`}
 */

@customElement('pfe-tooltip')
export class PfeTooltip extends BaseTooltip {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  @colorContextConsumer()
  @property({ reflect: true }) on: ColorTheme = 'light';

  private _id = `${PfeTooltip.name}-${getRandomId()}`;

  override render() {
    return html`
      <div id="invoker-id" class="invoker" role="tooltip" tabindex="0" aria-labelledby="${this._id}">
        <slot name="invoker"></slot>
      </div>
      <div id="${this._id}" class="tooltip hidden" aria-hidden=${this.isOpen ? 'false' : 'true'}>
        <div class="tooltip__arrow"></div>
        <div id="content" class="tooltip__content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tooltip': PfeTooltip;
  }
}
