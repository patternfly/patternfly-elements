import PFElement from "../../pfelement/dist/pfelement.js";
import PfeBadge from "../../pfe-badge/dist/pfe-badge.js";

class PfeChip extends PFElement {
  static get tag() {
    return "pfe-chip";
  }

  get schemaUrl() {
    return "pfe-chip.json";
  }

  get templateUrl() {
    return "pfe-chip.html";
  }

  get styleUrl() {
    return "pfe-chip.scss";
  }

  static get observedAttributes() {
    return ["pfe-read-only", "pfe-variant"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeChip, { type: PfeChip.PfeType });

    this._badge = this.shadowRoot.querySelector(`.${this.tag}__badge`);

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // If you need to initialize any attributes, do that here

    this.badge = this.querySelector(`[slot="${this.tag}--badge"]`);
    this._pfeBadge = this.shadowRoot.querySelector(`pfe-badge`);

    // Add a slotchange listener to the lightDOM trigger
    if (this.badge) {
      this.badge.addEventListener("slotchange", this._init);
    }

    this._init();
  }

  disconnectedCallback() {
    if (this.badge) {
      this.badge.removeEventListener("slotchange", this._init);
    }
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _init() {
    if (this.badge) {
      const badgeContent = this.badge.textContent;
      if (isNaN(badgeContent)) {
        console.warn(`${this.tag}: The badge content must be numeric.`);
      } else {
        this._pfeBadge.setAttribute("number", this.badge.textContent);
      }
    }
  }
}

PFElement.create(PfeChip);

export default PfeChip;
