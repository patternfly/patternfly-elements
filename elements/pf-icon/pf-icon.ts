import { BaseIcon } from './BaseIcon.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-icon.css';

/**
 * An **icon** component is a container that allows for icons of varying dimensions to
 * seamlessly replace each other without shifting surrounding content.
 *
 * @slot - Slotted content is used as a fallback in case the icon doesn't load
 * @fires load - Fired when an icon is loaded and rendered
 * @fires error - Fired when an icon fails to load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 */
@customElement('pf-icon')
export class PfIcon extends BaseIcon {
  public static readonly styles = [...BaseIcon.styles, style];

  public static defaultIconSet = 'fas';

  /** Size of the icon */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-icon': PfIcon;
  }
}
