import { customElement } from 'lit/decorators.js';

import { BaseSwitch } from './BaseSwitch.js';
import styles from './pf-switch.css';

/**
 * Switch
 * @cssprop --pf-c-switch--FontSize {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch--ColumnGap {@default `1rem`}
 * @cssprop --pf-c-switch__toggle-icon--FontSize {@default `calc(1rem * .625)`}
 * @cssprop {<color>} --pf-c-switch__toggle-icon--Color {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Left {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Offset {@default `0.125rem`}
 * @cssprop {<number>} --pf-c-switch--LineHeight {@default `1.5`}
 * @cssprop {<length>} --pf-c-switch--Height {@default `auto`}
 * @cssprop {<color>} --pf-c-switch__input--checked__toggle--BackgroundColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__input--checked__toggle--before--TranslateX {@default `calc(100% + 0.125rem)`}
 * @cssprop {<color>} --pf-c-switch__input--checked__label--Color {@default `#151515`}
 * @cssprop {<color>} --pf-c-switch__input--not-checked__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--BackgroundColor {@default `#d2d2d2`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--before--BackgroundColor {@default `#f5f5f5`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineWidth {@default `2px`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineOffset {@default `0.5rem`}
 * @cssprop {<color>} --pf-c-switch__input--focus__toggle--OutlineColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__toggle--Height {@default `calc(1rem * 1.5)`}
 * @cssprop {<color>} --pf-c-switch__toggle--BackgroundColor {@default `#8a8d90`}
 * @cssprop {<length>} --pf-c-switch__toggle--BorderRadius {@default `calc(1rem * 1.5)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Width {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Height {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Top {@default calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Left {@default `calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<color>} --pf-c-switch__toggle--before--BackgroundColor {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--BorderRadius {@default `30em`}
 * @cssprop --pf-c-switch__toggle--before--BoxShadow {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop --pf-c-switch__toggle--before--Transition {@default `transform .25s ease 0s`}
 * @cssprop {<length>} --pf-c-switch__toggle--Width {@default `calc(calc(1rem * 1.5) + 0.125rem + calc(1rem - 0.125rem))`}
 */

@customElement('pf-switch')
export class PfSwitch extends BaseSwitch {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseSwitch.styles, styles];
}

  declare global {
    interface HTMLElementTagNameMap {
      'pf-switch': PfSwitch;
  }
}
