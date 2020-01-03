import PFElement from "../../pfelement/dist/pfelement.js";

class PfeDropdown extends PFElement {
  static get tag() {
    return "pfe-dropdown";
  }

  get templateUrl() {
    return "pfe-dropdown.html";
  }

  get styleUrl() {
    return "pfe-dropdown.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeDropdown);

    this.button = this.querySelector('button');
    this.list = this.querySelector('ul');
    // state
    this.isOpen = false;

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this); 
  }

  connectedCallback() {
    super.connectedCallback();

    this.button.addEventListener("click", this.toggle);
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}

  open(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = true;
    this.list.classList.add("open");
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
    this.list.classList.remove("open");
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

PFElement.create(PfeDropdown);

export default PfeDropdown;
