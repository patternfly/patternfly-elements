import { customElement, property } from 'lit/decorators.js';

import style from './pfe-card.scss';
import { BaseCard } from './BaseCard';
import { bound } from '@patternfly/pfe-core/decorators.js';
// import { bound } from '@patternfly/pfe-core/decorators/bound.js';

/**
 * This element creates a header, body, and footer region in which to place
 * content or other components.
 *
 * @summary Gives a preview of information in a small layout
 *
 * @slot header
 *       If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6).
 *       An icon, svg, or use of the icon component are also valid in this region.
 * @slot - Any content that is not designated for the header or footer slot, will go to this slot.
 * @slot footer
 *       Use this slot for anything that you want to be stuck to the base of the card.
 *       This region is bottom-aligned.
 *
 * @slot pfe-card--header - {@deprecated use header}
 * @slot pfe-card--footer - {@deprecated use footer}
 *
 * @csspart header - The container for *header* content
 * @csspart body - The container for *body* content
 * @csspart footer - The container for *footer* content
 *
 *
 * @cssproperty {<color>} --pfe-theme--color--surface--lightest   {@default `#ffffff`}
 * @cssproperty {<color>} --pfe-theme--color--surface--lighter    {@default `#ececec`}
 * @cssproperty {<color>} --pfe-theme--color--surface--base       {@default `#f0f0f0`}
 * @cssproperty {<color>} --pfe-theme--color--surface--darker     {@default `#3c3f42`}
 * @cssproperty {<color>} --pfe-theme--color--surface--darkest    {@default `#151515`}
 * @cssproperty {<color>} --pfe-theme--color--surface--accent     {@default `#004080`}
 * @cssproperty {<color>} --pfe-theme--color--surface--complement {@default `#002952`}
 *
 * @cssproperty --pfe-band--BackgroundColor
 *              Though using the `color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable.  If you update this value manually, you should also update the `--theme` context variable to invoke the right theme on it and it's child elements.  Supported themes include: `light`, `dark`, and `saturated`.
 * @cssproperty --pfe-card--BackgroundPosition
 *              This is designed for use with the `img-src` attribute to allow you to align your background image.  Default value is `center center`.
 *              {@default `center center`}
 * @cssproperty --pfe-card--Border
 *              This allows the customization of a border around the entire container.
 *              {@default `center center`}
 * @cssproperty --pfe-card--Border
 *              This allows the customization of a border around the entire container.
 * @cssproperty --pfe-card--BorderRadius
 *              This allows the customization of a border radius around the entire container.
 * @cssproperty --pfe-card--BorderWeight
 *              This allows the customization of a border weight around the entire container.
 * @cssproperty --pfe-card--BorderStyle
 *              This allows the customization of a border style around the entire container.
 * @cssproperty --pfe-card--BorderColor
 *              This allows the customization of a border color around the entire container.
 */
@customElement('pfe-card')
export class PfeCard extends BaseCard {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseCard.styles, style];

  @property({ type: Boolean, reflect: true }) selectable = false;

  @property({ type: Boolean, reflect: true }) selected = false;

  @property({ type: Boolean, reflect: true }) hoverable = false;

  @bound private async _clickHandler() {
    if (this.selectable && this.hoverable) {
      this.selected = !this.selected;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._clickHandler.bind(this));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-card': PfeCard;
  }
}
