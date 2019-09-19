import PFElement from "../pfelement/pfelement.js";

class PfeSelect extends PFElement {
  static get tag() {
    return "pfe-select";
  }

  get templateUrl() {
    return "pfe-select.html";
  }

  get styleUrl() {
    return "pfe-select.scss";
  }

  static get observedAttributes() {
    return [
      "pfe-invalid"
    ];
  }

  constructor() {
    super(PfeSelect);

    this._init = this._init.bind(this);
    this._inputChanged = this._inputChanged.bind(this);

    this.observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length) {
      this._init();
    }

    this.observer.observe(this, { childList: true });

    let invalidAttr = this.getAttribute('pfe-invalid');
    if (invalidAttr) {
      this.querySelector('select').setAttribute('aria-invalid', invalidAttr);
    }
    
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix form the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }

    let invalidAttr = this.getAttribute('pfe-invalid');
    if (this.getAttribute('pfe-invalid')) {
      this.querySelector('select').setAttribute('aria-invalid', invalidAttr);
    }

  }

  _init() {
    this._input = this.querySelector("select");
    if (!this._input) {
      console.warn("The first child needs to be a select element");
      return;
    }

    this._input.addEventListener("input", this._inputChanged);
  }

  _inputChanged() {
    this.dispatchEvent(new CustomEvent(`${this.tag}:input`, {
      detail: { value: this._input.value },
      bubbles: true,
      composed: true
    }));
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this._input.removeEventListener("input", this._inputChanged);
  }
}

PFElement.create(PfeSelect);

export default PfeSelect;
