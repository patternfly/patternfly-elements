import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pf-card.css';

/**
 * A **card** is a square or rectangular container that can contain any kind of content.
 * Cards symbolize units of information, and each one acts as an entry point for
 * users to access more details. For example, in dashboards and catalog views, cards
 * function as a preview of a detailed page. Cards may also be used in data displays
 * like card views, or for positioning content on a page.
 * @summary Gives a preview of information in a small layout
 * @slot header
 *       When included, defines the contents of a card. Card headers can contain images as well as
 *       the title of a card and an actions menu represented by the right-aligned kebab.
 *       In most cases, your card should include a header. The only exceptions are when cards being
 *       used as a layout element to create a white background behind other content.
 * @slot title
 *       Communicates the title of a card if it's not included in the header.
 *       If a card will be utilized as a selectable and clickable card, the title needs to be made as a linked text to trigger action and indicate interaction.
 * @slot - Body. Provides details about the item. A card body can include any combination of static
 *         text and/or active content.
 * @slot footer
 *       Contains external links, actions, or static text at the bottom of a card.
 * @csspart header - The container for *header* content
 * @csspart body - The container for *body* content
 * @csspart footer - The container for *footer* content
 * @cssprop {<color>} [--pf-c-card--BackgroundColor=#ffffff]
 * @cssprop {<color>} [--pf-c-card--BoxShadow=0 0.0625rem 0.125rem 0 rgba(3, 3, 3, 0.12), 0 0 0.125rem 0 rgba(3, 3, 3, 0.06)]
 * @cssprop {<color>} [--pf-c-card--size-compact__body--FontSize=.875rem]
 * @cssprop {<color>} [--pf-c-card--size-compact__footer--FontSize=1rem]
 * @cssprop {<color>} [--pf-c-card--size-compact--first-child--PaddingTop=1.5rem]
 * @cssprop {<color>} [--pf-c-card--size-compact--child--PaddingRight=1rem]
 * @cssprop {<color>} [--pf-c-card--size-compact--child--PaddingBottom=1rem]
 * @cssprop {<color>} [--pf-c-card--size-compact--child--PaddingLeft=1rem]
 * @cssprop {<color>} [--pf-c-card--size-compact__title--not--last-child--PaddingBottom=.5rem]
 * @cssprop {<color>} [--pf-c-card--size-large__title--FontSize=1.25rem]
 * @cssprop {<color>} [--pf-c-card--size-large--first-child--PaddingTop=2rem]
 * @cssprop {<color>} [--pf-c-card--size-large--child--PaddingRight=2rem]
 * @cssprop {<color>} [--pf-c-card--size-large--child--PaddingBottom=2rem]
 * @cssprop {<color>} [--pf-c-card--size-large--child--PaddingLeft=2rem]
 * @cssprop {<color>} [--pf-c-card--size-large__title--not--last-child--PaddingBottom=1.5rem]
 * @cssprop {<color>} [--pf-c-card--m-flat--BorderWidth=1px solid #d2d2d2]
 * @cssprop {<color>} [--pf-c-card--m-plain--BoxShadow=none]
 * @cssprop {<color>} [--pf-c-card--m-plain--BackgroundColor=transparent]
 * @cssprop {<color>} [--pf-c-card--m-rounded--BorderRadius=3px]
 * @cssprop {<color>} [--pf-c-card--m-full-height--Height=100]
 * @cssprop {<color>} [--pf-c-card__title--FontFamily="RedHatDisplayUpdated", helvetica, arial, sans-serif]
 * @cssprop {<color>} [--pf-c-card__title--FontSize=1rem]
 * @cssprop {<color>} [--pf-c-card__title--FontWeight=700]
 */
@customElement('pf-card')
export class PfCard extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

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

  #slots = new SlotController(this, 'header', 'title', null, 'footer');

  render(): TemplateResult<1> {
    return html`
      <article>
        <header id="header"
                part="header"
                class="${classMap({ empty: this.#slots.isEmpty('header') })}">
          <slot name="header"></slot>
          <slot id="title" name="title" ?hidden="${this.#slots.isEmpty('title')}"></slot>
        </header>
        <div id="body"
             part="body"
             class="${classMap({ empty: this.#slots.isEmpty(null) })}">
          <slot></slot>
        </div>
        <footer id="footer"
                part="footer"
                class="${classMap({ empty: this.#slots.isEmpty('footer') })}">
          <slot name="footer"></slot>
        </footer>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-card': PfCard;
  }
}
