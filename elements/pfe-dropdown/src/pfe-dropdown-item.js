import PFElement from "../../pfelement/dist/pfelement.js";

class PfeDropdownItem extends PFElement {
  static get tag() {
    return "pfe-dropdown-item";
  }

  get templateUrl() {
    return "pfe-dropdown-item.html";
  }

  get styleUrl() {
    return "pfe-dropdown-item.scss";
  }

  static get observedAttributes() {
    return ["pfe-type"];
  }

  constructor() {
    super(PfeDropdownItem);

    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._item = this.shadowRoot.querySelector("slot").assignedNodes()[1];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-type":
        this._setAccessibility();
      default:
        break;
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _setAccessibility() {
    if (this.isLink()) {
      this._container.setAttribute("role", "none");
      this._item.setAttribute("role", "menuitem");
      this._item.setAttribute("tabindex", "-1");
    } else if (this.isAction()) {
      this._container.setAttribute("role", "menuitem");
      this._container.setAttribute("tabindex", "-1");
      this._item.removeAttribute("role");
    }
  }

  isLink() {
    return this.getAttribute("pfe-type") === "link";
  }

  isAction() {
    return this.getAttribute("pfe-type") === "action";
  }
}

export default PfeDropdownItem;
