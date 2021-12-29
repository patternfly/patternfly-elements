import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-card.scss';

/**
 * This element creates a header, body, and footer region in which to place
 * content or other components.
 *
 * @slot header
 *       If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6).
 *       An icon, svg, or use of the icon component are also valid in this region.
 * @slot - Any content that is not designated for the header or footer slot, will go to this slot.
 * @slot footer
 *       Use this slot for anything that you want to be stuck to the base of the card. This region is bottom-aligned.
 */
@customElement('pfe-card') @pfelement()
export class PfeCard extends LitElement {
  static readonly styles = [style];

  /**
   * Optional background image applied to the entire card container.
   * Alignment of this image can be managed using the `--pfe-card--BackgroundPosition`
   * variable which is set to `center center` by default.
   */
  @observed
  @property({ attribute: 'img-src', reflect: true }) imgSrc = '';

  /**
   * Your theme will influence these colors so check there first if you are seeing inconsistencies.
   *
   * | Color      | Hex Value                                                              |
   * | ---------- | ---------------------------------------------------------------- |
   * | lightest   | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
   * | lighter    | <span class="color-preview" style="--bg:#ececec"></span> #ececec |
   * | default    | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf |
   * | darker     | <span class="color-preview" style="--bg:#464646"></span> #464646 |
   * | darkest    | <span class="color-preview" style="--bg:#131313"></span> #131313 |
   * | accent     | <span class="color-preview" style="--bg:#ee0000"></span> #ee0000 |
   * | complement | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 |
   */
  @property({ reflect: true })
    color: 'lightest'|'lighter'|'default'|'darker'|'darkest'|'accent'|'complement' = 'default';

  /** Optionally adjusts the padding on the container. Accepts: `small`. */
  @property({ reflect: true }) size?: 'small';

  /**
   * Optionally apply a border color and weight to the entire card container.
   * The default color and weight is `#d2d2d2` and `1px`, respectively.
   */
  @property({ type: Boolean, reflect: true }) border = false;

  protected slots = new SlotController(this, {
    slots: ['header', null, 'footer'],
    deprecations: {
      header: 'pfe-card--header',
      footer: 'pfe-card--footer',
    }
  });

  render() {
    const classes = {
      'has-header': this.slots.hasSlotted('header', 'pfe-card--header'),
      'has-footer': this.slots.hasSlotted('footer', 'pfe-card--footer'),
      'has-body': this.slots.hasSlotted(),
    }

    return html`
      <!-- pfe-card -->
      <div class="pfe-card__header ${classMap(classes)}">
        <slot name="header"></slot>
        <slot name="pfe-card--header"></slot>
      </div>
      <div class="pfe-card__body ${classMap(classes)}">
        <slot></slot>
      </div>
      <div class="pfe-card__footer ${classMap(classes)}">
        <slot name="footer"></slot>
        <slot name="pfe-card--footer"></slot>
      </div>
    `;
  }

  /** Update the background image */
  protected _imgSrcChanged(_oldValue: string, newValue: string) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-card': PfeCard;
  }
}
