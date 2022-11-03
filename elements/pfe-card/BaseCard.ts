import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import { classMap } from 'lit/directives/class-map.js';

import style from './BaseCard.scss';

export abstract class BaseCard extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Optionally provide a size for the card and the card contents.
   * The default is set to `undefined` and provides default styles.
   * Compact provides styles which decreases the padding between the sections.
   * Large provides styles which increases the padding between the sections and the font size for the title, header, and footer.
   */
   @property({ reflect: true }) size: 'compact'|'large'|undefined = undefined;

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
      </div>
      <div class="pfe-card__body ${classMap(classes)}" part="body">
        <slot></slot>
      </div>
      <div class="pfe-card__footer ${classMap(classes)}" part="footer">
        <slot name="footer"></slot>
      </div>
    `;
   }
}
