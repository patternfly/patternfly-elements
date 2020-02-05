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

  constructor() {
    super(PfeDropdownItem);

    this._links = this.querySelectorAll('[slot=link]');
    this._actions = this.querySelectorAll('[slot=action]');
  }

  connectedCallback() {
    super.connectedCallback();
    customElements.whenDefined(PfeDropdownItem.tag).then(() => {
      this._setAccessibility();
    });
  }

  _setAccessibility() {
    this._links.forEach(link => {
      link.setAttribute('role', 'menuitem');
      link.setAttribute('tabindex', '-1');
    });
    
    this._actions.forEach(action => action.setAttribute('tabindex', '-1'));
  }
}

export default PfeDropdownItem;
