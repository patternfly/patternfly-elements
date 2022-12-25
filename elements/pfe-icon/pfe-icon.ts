import { BaseIcon } from './BaseIcon.js';
import { customElement } from 'lit/decorators.js';

import style from './pfe-icon.scss';

/**
 * PatternFly Icon component lazy-loads icons and allows custom icon sets
 *
 * @slot - Slotted content is used as a fallback in case the icon doesn't load
 * @fires load - Fired when an icon is loaded and rendered
 * @fires error - Fired when an icon fails to load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 */
@customElement('pfe-icon')
export class PfeIcon extends BaseIcon {
  public static readonly version = '{{version}}';

  public static readonly styles = [...BaseIcon.styles, style];

  public static defaultIconSet = 'fas';
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon': PfeIcon;
  }
}
