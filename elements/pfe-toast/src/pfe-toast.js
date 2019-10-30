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
    return ["auto-dismiss"];
  }

  constructor() {
    super(PfeToast);

    // state
    this.isOpen = false;
    this.doesAutoDismiss = false;

    // elements
    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._content = this.shadowRoot.querySelector(`.${this.tag}__content`);
    this._toastCloseButton = this.shadowRoot.querySelector(`.${this.tag}__close`);
    
    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.doesAutoDismiss = !!newValue;

    if (!this.doesAutoDismiss) {
      this.removeAttribute("aria-live");
      this.removeAttribute("aria-atomic");

      this.setAttribute("role", "alertdialog");
      this.setAttribute("aria-label", "alert dialog"); // need a better description
      this.setAttribute("aria-describedby", `${this.tag}__content`);
    } else {
      this.removeAttribute("aria-label");
      this.removeAttribute("aria-describedby");

      this.setAttribute("role", "alert");
      this.setAttribute("aria-live", "polite");
      this.setAttribute("aria-atomic", "true"); 
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // get/set state
    this.doesAutoDismiss = this.hasAttribute("auto-dismiss");
    this.setAttribute("hidden", "");

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

    if(this.doesAutoDismiss){
      setTimeout(() => {
        this.close();
      }, PfeToast.toMilliseconds(this.getAttribute("auto-dismiss")));
    }

    return this;
  }

  close(event) {
    if (event) {
      event.preventDefault();
    }

    this.isOpen = false;

    this.classList.remove("open");
    setTimeout(() => {
      this.setAttribute("hidden", "");
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

  static toMilliseconds(value){
    // set default if time not provided
    const digits = value.match(/\d+/g) || [8000];
    const unit = value.match(/\D+/g) || [];
    return unit[0] === 's' ? digits[0] * 1000 : digits[0];
  } 
}

PFElement.create(PfeToast);

export default PfeToast;
