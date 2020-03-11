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
    return ["pfe-type", "disabled"];
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
        break;
      case "disabled":
        this._setDisabled();
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _setAccessibility() {
    if (this._container && this._item) {
      const type = this.getAttribute("pfe-type");
      if (type) {
        switch (type) {
          case "link":
            this._container.setAttribute("role", "none");
            this._item.setAttribute("role", "menuitem");
            break;
          case "action":
            this._container.setAttribute("role", "menuitem");
            this._item.removeAttribute("role");
            break;
          case "seperator":
            this._container.setAttribute("role", "seperator");
          default:
            break;
        }
      }
    }
  }

  _setDisabled() {
    const isDisabled = this.hasAttribute("disabled");
    if (isDisabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("disabled");
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-disabled", "false");
    }
  }
}

export default PfeDropdownItem;
