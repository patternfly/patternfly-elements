import PFElement from "../../pfelement/dist/pfelement.js";
import PfeDropdownItem from './pfe-dropdown-item.js';

// Object.assign needs a polyfill as its not supported in IE11
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

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

  constructor() {
    super(PfeDropdown);

    // state
    this.isOpen = false;

    // elements
    this._toggle = this.querySelector('[slot=toggle]');
    this._menu = this.querySelector('[slot=menu]');
    this._link_items = this.querySelectorAll('[slot=link-item]');
    this._action_items = this.querySelectorAll('[slot=action-item]');

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    customElements.whenDefined(PfeDropdown.tag).then(() => {
      this._toggle.addEventListener("click", this.toggle);
      
      this._setAccessibility();  
    });
  }

  _setAccessibility() {
    this._toggle.setAttribute('aria-haspopup', 'menu');
    this._toggle.setAttribute('aria-controls', 'pfe-dropdown-menu');
    this._toggle.setAttribute('id', 'pfe-dropdown-toggle');

    this._menu.setAttribute('role', 'menu');
    this._menu.setAttribute('aria-labelledby', 'pfe-dropdown-toggle');
    this._menu.setAttribute('id', 'pfe-dropdown-menu');

    this._link_items.forEach(item => item.setAttribute('role', 'none'));

    this._action_items.forEach(item => item.setAttribute('role', 'menuitem'));
  }

  open(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = true;
    this._menu.classList.add("open");
    this._toggle.setAttribute("aria-expanded", true);
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
    this._menu.classList.remove("open");
    this._toggle.removeAttribute("aria-expanded");
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

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
