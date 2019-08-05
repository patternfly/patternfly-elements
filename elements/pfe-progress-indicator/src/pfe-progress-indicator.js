import PFElement from "../pfelement/pfelement.js";

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


  constructor() {
    super(PfeProgressIndicator);
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
        PfeProgressIndicator.tag
        }: You do not have a backup loading message.`
      );
    } else {
      // do nothing
    }
  }

}

PFElement.create(PfeProgressIndicator);

export default PfeProgressIndicator;
