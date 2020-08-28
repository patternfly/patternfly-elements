// Import polyfills: closest
import "./polyfills--pfe-textinput.js";
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

  get novalidate() {
    return this.hasAttribute("pfe-c-novalidate");
  }

  set novalidate(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("pfe-c-novalidate", "");
    } else {
      this.removeAttribute("pfe-c-novalidate");
    }
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeTextinput, { type: PfeTextinput.PfeType });

    this.novalidate = false;
    this._input = null;
    this._listenersAdded = false;
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
    if (this._listenersAdded) {
      this._input.removeEventListener("invalid", this._invalidHandler);
      this._input.removeEventListener("focus", this._focusHandler);
      this._input.removeEventListener("blur", this._checkValidity);
      this._input.removeEventListener("change", this._checkValidity);
      this._input.removeEventListener("keyup", this._checkValidity);
      this._input.removeEventListener("paste", this._checkValidity);
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
      this._checkNoValidate();

      if (this.novalidate) {
        return;
      }

      this._input.addEventListener("invalid", this._invalidHandler);
      this._input.addEventListener("focus", this._focusHandler);
      this._input.addEventListener("blur", this._checkValidity);
      this._input.addEventListener("change", this._checkValidity);
      this._input.addEventListener("keyup", this._checkValidity);
      this._input.addEventListener("paste", this._checkValidity);
      this._listenersAdded = true;
    }
  }

  // novalidate functionality is informed by
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate
  _checkNoValidate() {
    const closestForm = this.closest("form");

    if (closestForm.hasAttribute("novalidate")) {
      this.novalidate = true;
      return;
    }

    const formnovalidateElement = closestForm.querySelector(
      `button[formnovalidate], input[type="submit"][formnovalidate], input[type="image"][formnovalidate]`
    );

    if (formnovalidateElement) {
      this.novalidate = true;
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
