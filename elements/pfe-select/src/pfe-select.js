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

  get pfeOptions() {
    return this._pfeOptions;
  }

  set pfeOptions(options) {
    this._pfeOptions = options.filter(el => el.selected).length > 1 ? this.handleMultipleSelectedValues(options) : options;
    this.modifyDOM();
  }

  get pfeInvalid() {
    return this.getAttribute('pfe-invalid');
  }

  set pfeInvalid(invalidAttr) {
    if (!invalidAttr) {
      return;
    }
    this.querySelector('select').setAttribute('aria-invalid', invalidAttr);
  }

  static get observedAttributes() {
    return ["pfe-invalid"];
  }

  constructor() {
    super(PfeSelect);
    this._pfeOptions;
    this._init = this._init.bind(this);
    this._inputChanged = this._inputChanged.bind(this);

    this.observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();    
    if (this._pfeOptions) {
      this.modifyDOM()
      this._init();
    } else {
      if (this.children.length) {
        this._init();
      }
    }
    
    this.observer.observe(this, { childList: true });
    if (this.pfeInvalid) {
      this.pfeInvalid = this.pfeInvalid;
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

    if (this.pfeInvalid) {
      this.pfeInvalid = this.pfeInvalid;
    }
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this._input.removeEventListener("input", this._inputChanged);
  }

  addOptions(options) {
    // Reset the pfeOptions by concatenating newly added options with _pfeOptions
    this.pfeOptions = this._pfeOptions.concat(options);
  }

  handleMultipleSelectedValues(options) {
    // Warn if options array has more than one selected value set as true
    console.warn("The first 'selected' option will take precedence over others incase of multiple 'selected' options");
    // Get the index of the first element with selected "true"
    const firstIndex = options.findIndex(el => el.selected);
    // Update the options array with precedence to first element with selected value as true
    return options.map((el, idx) => {
      el.selected = firstIndex == idx;
      return el;
    });
  }

  modifyDOM() {
    // Create select element
    let pfeSelect = document.createElement('select');
    pfeSelect.setAttribute('slot', 'pfe-select');
    // Create option element for each element in _pfeOptions array
    this._pfeOptions.map(el => {
      const option = Object.assign(document.createElement('option') , el);      
      pfeSelect.add(option, null);      
    });
    // if select already exists in the DOM then replace the old select with the new _pfeOptions array
    if (this.children.length) {
      const select = this.querySelector('select');
      select.parentNode.replaceChild(pfeSelect, select);
    } else {
      // Otherwise create a new select element
      this.appendChild(pfeSelect);
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

}

PFElement.create(PfeSelect);

export default PfeSelect;
