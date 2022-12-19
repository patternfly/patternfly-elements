import { customElement } from 'lit/decorators.js';
import { BaseTab } from './BaseTab.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import styles from './pfe-tab.scss';

/**
 * PfeTab
 *
 * @slot icon
 *       Can contain an `<svg>` or `<pfe-icon>`
 * @slot
 *       Tab title text
 *
 * @csspart button - button element
 * @csspart icon - span container for the icon
 * @csspart text - span container for the title text
 *
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--first-child__link--before--BorderLeftWidth  {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--last-child__link--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__link--BackgroundColor            {@default `#f0f0f0`}
 * @cssprop     {<color>} --pf-c-tabs__link--disabled--BackgroundColor  {@default `#d2d2d2`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderTopWidth    {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderLeftWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--after--Top    {@default `auto`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Right  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Bottom {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--Left  {@default `0`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingTop    {@default `1rem`}
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingBottom {@default `1rem`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderLeftWidth   {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderTopColor     {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderRightColor   {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderBottomColor  {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderLeftColor    {@default `#d2d2d2`}
 *
 * @cssprop     {<length>}  --pf-c-tabs__link--FontSize      {@default `1rem`}
 * @cssprop     {<color>}   --pf-c-tabs__link--Color          {@default `#6a6e73`}
 * @cssprop     {<length>}  --pf-c-tabs__link--OutlineOffset {@default `-0.375rem`}
 *
 * @cssprop     {<color>}  --pf-c-tabs__link--after--BorderColor        {@default `#b8bbbe`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderTopWidth     {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderRightWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderBottomWidth  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderLeftWidth    {@default `0`}
 *
 * @cssprop     {<color>} --pf-c-tabs__item--m-current__link--Color {@default `#151515`}
 *
 * @cssprop     {<color>}   --pf-c-tabs__item--m-current__link--after--BorderColor {@default `#06c`}
 * @cssprop     {<length>}  --pf-c-tabs__item--m-current__link--after--BorderWidth {@default `3px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--child--MarginRight  {@default `1rem`}
 *
 * @fires { TabExpandEvent } tab-expand - when a tab expands
 */
@customElement('pfe-tab')
export class PfeTab extends BaseTab {
  static readonly styles = [...BaseTab.styles, styles];

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab': PfeTab;
  }
}
