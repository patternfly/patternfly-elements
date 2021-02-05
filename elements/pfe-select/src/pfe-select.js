// Import polyfills: assign
import "./polyfills--pfe-select.js";

import PFElement from "../../pfelement/dist/pfelement.js";

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

  //@TODO: Do we need to rename this to remove the prefix?
  get pfeOptions() {
    return this._pfeOptions;
  }

  set pfeOptions(options) {
    this._pfeOptions =
      options.filter(el => el.selected).length > 1 ? this._handleMultipleSelectedValues(options) : options;
    this._modifyDOM();
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  static get properties() {
    return {
      invalid: {
        type: Boolean,
        observer: "_handleInvalid",
        default: false
      },
      oldInvalid: {
        type: Boolean,
        alias: "invalid",
        attr: "pfe-invalid"
      }
    };
  }

  _handleInvalid(oldVal, newVal) {
    const ariaVal = newVal ? "true" : "false";
    this.querySelector("select").setAttribute("aria-invalid", ariaVal);
  }

  constructor() {
    super(PfeSelect);
    this._pfeOptions = null;
    this._init = this._init.bind(this);
    this._inputChanged = this._inputChanged.bind(this);

    this.observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();
    customElements.whenDefined(PfeSelect.tag).then(() => {
      if (this.pfeOptions) {
        this._modifyDOM();
        this._init();
      } else {
        if (this.hasLightDOM()) this._init();
        else this.warn(`The first child in the light DOM must be a supported select tag`);
      }
    });
    this.observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.observer.disconnect();
    this._input.removeEventListener("input", this._inputChanged);
  }

  addOptions(options) {
    // Reset the pfeOptions by concatenating newly added options with _pfeOptions
    this._pfeOptions = this._pfeOptions ? this._pfeOptions.concat(options) : options;
  }

  _handleMultipleSelectedValues(options) {
    // Warn if options array has more than one selected value set as true
    this.warn(`The first 'selected' option will take precedence over others incase of multiple 'selected' options`);
    // Get the index of the first element with selected "true"
    const firstIndex = options.findIndex(el => el.selected);
    // Update the options array with precedence to first element with selected value as true
    return options.map((el, idx) => {
      el.selected = firstIndex == idx;
      return el;
    });
  }

  _init() {
    this._input = this.querySelector("select");
    if (!this._input) {
      this.warn(`The first child needs to be a select element`);
      return;
    }
    this._input.addEventListener("change", this._inputChanged);
  }

  _inputChanged() {
    this.emitEvent(PfeSelect.events.change, {
      detail: {
        value: this._input.value
      }
    });
  }

  _modifyDOM() {
    // Create select element
    let pfeSelect = document.createElement("select");
    // Create option element for each element in _pfeOptions array
    this._pfeOptions.map(el => {
      const option = Object.assign(document.createElement("option"), el);
      pfeSelect.add(option, null);
    });
    // if select already exists in the DOM then replace the old select with the new _pfeOptions array
    if (this.hasLightDOM()) {
      const select = this.querySelector("select");
      select.parentNode.replaceChild(pfeSelect, select);
    } else {
      // Otherwise create a new select element
      this.appendChild(pfeSelect);
    }
  }
}

PFElement.create(PfeSelect);

export default PfeSelect;
