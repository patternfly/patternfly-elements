import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  observed,
  pfelement
} from '@patternfly/pfe-core/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-card.scss';

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
@customElement('pfe-card') @pfelement()
export class PfeCard extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Optional background image applied to the entire card container.
   * Alignment of this image can be managed using the `--pfe-card--BackgroundPosition`
   * variable which is set to `center center` by default.
   */
  @observed
  @property({ attribute: 'img-src', reflect: true }) imgSrc?: string;

  /**
   * Optionally provide a size for the card and the card contents.
   * The default is set to `undefined` and provides default styles.
   * Compact provides styles which decreases the padding between the sections.
   * Large provides styles which increases the padding between the sections and the font size for the title, header, and footer.
   */
   @property({ reflect: true }) size: 'compact'|'large'|undefined = undefined;

   /**
   * Optionally apply a border radius for the drop shadow and/or border.
   */
    @property({ type: Boolean, reflect: true }) rounded = false;

    /**
   * Optionally apply a border color and weight to the entire card container.
   * The default color and weight is `#d2d2d2` and `1px`, respectively.
   */
     @property({ type: Boolean, reflect: true }) fullHeight = false;

  /**
   * Optionally apply a border color and weight to the entire card container.
   * The default color and weight is `#d2d2d2` and `1px`, respectively.
   */
  @property({ type: Boolean, reflect: true }) plain = false;

  protected slots = new SlotController(this, {
    slots: ['header', null, 'footer'],
  });

  render() {
    const classes = {
      'has-header': this.slots.hasSlotted('header'),
      'has-footer': this.slots.hasSlotted('footer'),
      'has-body': this.slots.hasSlotted(),
    };

    return html`
      <div class="pfe-card__header ${classMap(classes)}" part="header">
        <slot name="header"></slot>
        <slot name="pfe-card--header"></slot>
      </div>
      <div class="pfe-card__body ${classMap(classes)}" part="body">
        <slot></slot>
      </div>
      <div class="pfe-card__footer ${classMap(classes)}" part="footer">
        <slot name="footer"></slot>
        <slot name="pfe-card--footer"></slot>
      </div>
    `;
  }

  /** Update the background image */
  protected _imgSrcChanged(_oldValue: unknown, newValue: unknown) {
    if (typeof this.imgSrc === 'string') {
      // Set the image as the background image
      this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-card': PfeCard;
  }
}
