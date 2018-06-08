import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-search-result.html and css from
 * rh-search-result.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhSearchResult extends Rhelement {
  constructor() {
    super("rh-search-result", template);

    this._headingId = "#heading";

    const headingSlot = this.shadowRoot.querySelector('[name="heading"]');
    headingSlot.addEventListener("slotchange", () => {
      this._transport(headingSlot, this._headingId);
    });

    this._transport(headingSlot, this._headingId);
  }

  _transport(slot, destination) {
    const nodes = slot.assignedNodes();

    if (!nodes.length) {
      return;
    }

    this.shadowRoot.querySelector(destination).innerHTML = nodes[0].outerHTML;
  }
}

window.customElements.define("rh-search-result", RhSearchResult);
