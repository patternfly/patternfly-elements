import Rhelement from "../rhelement/rhelement.js";

class RhSearchResult extends Rhelement {
  static get tag() {
    return "rh-search-result";
  }

  get styleUrl() {
    return "rh-search-result.scss";
  }

  get templateUrl() {
    return "rh-search-result.html";
  }

  constructor() {
    super(RhSearchResult.tag);

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

Rhelement.create(RhSearchResult);
