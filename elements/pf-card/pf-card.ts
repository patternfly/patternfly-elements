import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-card.css';
import { BaseCard } from './BaseCard.js';

/**
 * A **card** is a square or rectangular container that can contain any kind of content.
 * Cards symbolize units of information, and each one acts as an entry point for
 * users to access more details. For example, in dashboards and catalog views, cards
 * function as a preview of a detailed page. Cards may also be used in data displays
 * like card views, or for positioning content on a page.
 *
 * @summary Gives a preview of information in a small layout
 *
 * @slot header
 *       If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6).
 *       An icon, svg, or use of the icon component are also valid in this region.
 * @slot - Any content that is not designated for the header or footer slot, will go to this slot.
 * @slot footer
 *       Use this slot for anything that you want to be stuck to the base of the card.
 *
 * @csspart header - The container for *header* content
 * @csspart body - The container for *body* content
 * @csspart footer - The container for *footer* content
 *
 *
 * @cssproperty {<color>} --pf-c-card--BackgroundColor {@default `#ffffff`}
 * @cssproperty {<color>} --pf-c-card--BoxShadow {@default `0 0.0625rem 0.125rem 0 rgba(3, 3, 3, 0.12), 0 0 0.125rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssproperty {<color>} --pf-c-card--size-compact__body--FontSize {@default `.875rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact__footer--FontSize {@default `1rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact--first-child--PaddingTop {@default `1.5rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact--child--PaddingRight {@default `1rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact--child--PaddingBottom {@default `1rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact--child--PaddingLeft {@default `1rem`}
 * @cssproperty {<color>} --pf-c-card--size-compact__title--not--last-child--PaddingBottom {@default `.5rem`}
 * @cssproperty {<color>} --pf-c-card--size-large__title--FontSize {@default `1.25rem`}
 * @cssproperty {<color>} --pf-c-card--size-large--first-child--PaddingTop {@default `2rem`}
 * @cssproperty {<color>} --pf-c-card--size-large--child--PaddingRight {@default `2rem`}
 * @cssproperty {<color>} --pf-c-card--size-large--child--PaddingBottom {@default `2rem`}
 * @cssproperty {<color>} --pf-c-card--size-large--child--PaddingLeft {@default `2rem`}
 * @cssproperty {<color>} --pf-c-card--size-large__title--not--last-child--PaddingBottom {@default `1.5rem`}
 * @cssproperty {<color>} --pf-c-card--m-flat--BorderWidth {@default `1px solid #d2d2d2`}
 * @cssproperty {<color>} --pf-c-card--m-plain--BoxShadow {@default `none`}
 * @cssproperty {<color>} --pf-c-card--m-plain--BackgroundColor {@default `transparent`}
 * @cssproperty {<color>} --pf-c-card--m-rounded--BorderRadius {@default `3px`}
 * @cssproperty {<color>} --pf-c-card--m-full-height--Height {@default `100%`}
 * @cssproperty {<color>} --pf-c-card__title--FontFamily {@default `"RedHatDisplayUpdated", helvetica, arial, sans-serif`}
 * @cssproperty {<color>} --pf-c-card__title--FontSize {@default `1rem`}
 * @cssproperty {<color>} --pf-c-card__title--FontWeight {@default `700`}
 */
@customElement('pf-card')
export class PfCard extends BaseCard {
  static readonly styles = [...BaseCard.styles, style];

  /**
   * Optionally provide a size for the card and the card contents.
   * The default is set to `undefined` and provides default styles.
   * Compact provides styles which decreases the padding between the sections.
   * Large provides styles which increases the padding between the sections and the font size for the title, header, and footer.
   */
  @property({ reflect: true }) size?: 'compact' | 'large';

  /**
  * Optionally apply a border radius for the drop shadow and/or border.
  */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /**
 * Optionally allow the card to take up the full height of the parent element.
 */
  @property({ type: Boolean, reflect: true, attribute: 'full-height' }) fullHeight = false;

  /**
   * Optionally remove the border on the card container.
   */
  @property({ type: Boolean, reflect: true }) plain = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-card': PfCard;
  }
}
