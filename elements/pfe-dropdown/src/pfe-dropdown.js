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

    // state
    this.isOpen = false;

    // elements
    this.button = this.querySelector('button');
    this.list = this.querySelector('ul');
    this.items = this.list.querySelectorAll('li');

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this._itemSelected = this._itemSelected.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.button.addEventListener("click", this.toggle);
    this.items.forEach(item => item.addEventListener('click', this._itemSelected));
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}

  _itemSelected(e) {
    this.dispatchEvent(new CustomEvent(`${this.tag}:click`, {
      detail: { value: e },
      bubbles: true,
      composed: true
    }));
  }

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
