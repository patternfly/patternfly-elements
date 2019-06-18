import PFElement from "../pfelement/pfelement.js";

class PfeCta extends PFElement {
  static get tag() {
    return "pfe-cta";
  }

  get styleUrl() {
    return "pfe-cta.scss";
  }

  get templateUrl() {
    return "pfe-cta.html";
  }

  constructor() {
    super(PfeCta);
    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be an anchor tag (<a>)`
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be an anchor tag (<a>)`
      );
    } else {
      this.link = this.querySelector("a");
    }
  }
}

PFElement.create(PfeCta);

export default PfeCta;
