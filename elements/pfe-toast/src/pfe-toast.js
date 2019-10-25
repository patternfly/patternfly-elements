import PFElement from "../pfelement/pfelement.js";

class PfeToast extends PFElement {
  static get tag() {
    return "pfe-toast";
  }

  get templateUrl() {
    return "pfe-toast.html";
  }

  get schemaUrl() {
    return "pfe-toast.json";
  }

  get styleUrl() {
    return "pfe-toast.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super(PfeToast);

    // state
    this.isOpen = false;

    // elements
    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._toastCloseButton = this.shadowRoot.querySelector(`.${this.tag}__close`);
    
    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldVal, newVal);
  }

  connectedCallback() {
    super.connectedCallback();

    // add attributes
    this.setAttribute("hidden", true);

    // attach listeners
    this._toastCloseButton.addEventListener("click", this.close);
  }

  disconnectedCallback() {
    this._toastCloseButton.removeEventListener("click", this.close);
  }

  open(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = true;
    this.setAttribute("role", "alert");
    this.removeAttribute("hidden");
    setTimeout(() => {
      this.classList.add("open");
    }, 500);
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {},
        bubbles: true
      })
    );
    return this;
  }

  close(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = false;
    this.removeAttribute("role");
    this.classList.remove("open");
    setTimeout(() => {
      this.setAttribute("hidden", true);
    }, 500);
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {},
        bubbles: true
      })
    );
    return this;
  }

  toggle(event) {
    this.isOpen ? this.close(event) : this.open(event);
    return this;
  }
}

PFElement.create(PfeToast);

export default PfeToast;
