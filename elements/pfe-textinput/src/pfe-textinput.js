import PFElement from "../../pfelement/dist/pfelement.js";

const observerConfig = {
  childList: true
};

class PfeTextinput extends PFElement {
  static get tag() {
    return "pfe-textinput";
  }

  get schemaUrl() {
    return "pfe-textinput.json";
  }

  get templateUrl() {
    return "pfe-textinput.html";
  }

  get styleUrl() {
    return "pfe-textinput.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeTextinput, { type: PfeTextinput.PfeType });
    this._observer = new MutationObserver(this._isValidLightDOM);
  }

  connectedCallback() {
    super.connectedCallback();

    this._isValidLightDOM();
    this._observer.observe(this, observerConfig);
  }

  _isValidLightDOM() {
    if (!this.children.length) {
      console.warn(
        `${PfeTextinput.tag}: You must have a text input in the light DOM`
      );
      return false;
    }

    if (this.children[0].tagName !== "INPUT") {
      console.warn(
        `${PfeTextinput.tag}: The only child in the light DOM must be an input tag`
      );
      return false;
    }

    return true;
  }
}

PFElement.create(PfeTextinput);

export default PfeTextinput;
