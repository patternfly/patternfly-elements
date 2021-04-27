import PFElement from "../../pfelement/dist/pfelement.js";

class PfeProgressIndicator extends PFElement {
  static get tag() {
    return "pfe-progress-indicator";
  }

  get templateUrl() {
    return "pfe-progress-indicator.html";
  }

  get styleUrl() {
    return "pfe-progress-indicator.scss";
  }

  get schemaUrl() {
    return "pfe-progress-indicator.json";
  }

  static get properties() {
    return {
      indeterminate: {
        title: "Indeterminate",
        type: Boolean
      },
      // @TODO: Deprecated in 1.0
      oldIndeterminate: {
        alias: "indeterminate",
        attr: "pfe-indeterminate"
      },
      size: {
        title: "Size",
        type: String,
        values: ["sm", "md", "xl"],
        default: "md"
      }
    };
  }

  constructor() {
    super(PfeProgressIndicator);
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild) {
      this.warn(`You do not have a backup loading message.`);
    }
  }
}

PFElement.create(PfeProgressIndicator);

export default PfeProgressIndicator;
