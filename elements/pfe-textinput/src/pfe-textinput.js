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
    this._input = null;
    this._validHandler = this._validHandler.bind(this);
    this._invalidHandler = this._invalidHandler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._checkValidity = this._checkValidity.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
    this._observer.observe(this, observerConfig);
  }

  disconnectedCallback() {
    if (this._input) {
      this._input.removeEventListener(this._invalidHandler);
      this._input.removeEventListener(this._focusHandler);
      this._input.removeEventListener(this._checkValidity);
      this._input.removeEventListener(this._checkValidity);
      this._input.removeEventListener(this._checkValidity);
    }
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

  _init() {
    if (this._isValidLightDOM()) {
      this._input = this.querySelector("input");
      this._input.addEventListener("invalid", this._invalidHandler);
      this._input.addEventListener("focus", this._focusHandler);
      this._input.addEventListener("blur", this._checkValidity);
      this._input.addEventListener("change", this._checkValidity);
      this._input.addEventListener("keyup", this._checkValidity);
    }
  }

  _checkValidity() {
    const valid = this._input.checkValidity();
    if (!valid) {
      this._invalidHandler();
    } else {
      this._validHandler();
    }
  }

  _validHandler() {
    this.classList.remove("pfe-invalid");
  }

  _invalidHandler() {
    this.classList.add("pfe-invalid");
  }

  _focusHandler() {
    this.classList.add("pfe-touched");
  }
}

PFElement.create(PfeTextinput);

export default PfeTextinput;
