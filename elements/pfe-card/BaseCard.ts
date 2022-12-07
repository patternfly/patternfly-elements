import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import { classMap } from 'lit/directives/class-map.js';

import style from './BaseCard.scss';

export abstract class BaseCard extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

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
   *
   * @csspart header - The container for *header* content
   * @csspart body - The container for *body* content
   * @csspart footer - The container for *footer* content
  **/

  /**
   * Optionally provide a size for the card and the card contents.
   * The default is set to `undefined` and provides default styles.
   * Compact provides styles which decreases the padding between the sections.
   * Large provides styles which increases the padding between the sections and the font size for the title, header, and footer.
   */
  @property({ reflect: true }) size: 'compact' | 'large' | undefined = undefined;

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
    <article>
      <div class="header ${classMap(classes)}" part="header">
        <slot name="header"></slot>
      </div>
      <div class="body ${classMap(classes)}" part="body">
        <slot></slot>
      </div>
      <div class="footer ${classMap(classes)}" part="footer">
        <slot name="footer"></slot>
      </div>
    </article>
    `;
  }
}
