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

  get schemaUrl() {
    return "pfe-dropdown-item.json";
  }

  static get properties() {
    return {
      itemType: {
        title: "List item type",
        type: String,
        values: ["link", "action", "separator"],
        observer: "_itemTypeChanged"
      },
      oldItemType: {
        alias: "itemType",
        attr: "pfe-item-type"
      },
      disabled: {
        title: "Disabled item",
        type: Boolean,
        observer: "_disabledChanged"
      },
      oldDisabled: {
        alias: "disabled",
        attr: "is_disabled"
      }
    };
  }

  constructor() {
    super(PfeDropdownItem);

    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._item = this.shadowRoot.querySelector("slot").assignedNodes()[1];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _itemTypeChanged() {
    this._setAccessibility();
  }

  _disabledChanged() {
    this._setDisabled();
  }

  _setAccessibility() {
    if (this._container) {
      const type = this.itemType;
      if (type) {
        switch (type) {
          case "link":
            this._container.setAttribute("role", "none");
            this._item && this._item.setAttribute("role", "menuitem");
            break;
          case "action":
            this._container.setAttribute("role", "menuitem");
            this._item && this._item.removeAttribute("role");
            break;
          case "separator":
            this._container.setAttribute("role", "separator");
            break;
          default:
            break;
        }
      }
    }
  }

  _setDisabled() {
    const isDisabled = this.disabled;
    if (isDisabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.disabled = false;
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-disabled", "false");
    }
  }
}

export default PfeDropdownItem;
