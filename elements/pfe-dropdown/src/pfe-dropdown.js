import PFElement from "../../pfelement/dist/pfelement.js";
import PfeDropdownItem from './pfe-dropdown-item.js';

const KEYCODE = {
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESC: 27,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 0 || 32,
  UP: 38,
};

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

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

  static get observedAttributes() {
    return ["pfe-label"];
  }

  constructor() {
    super(PfeDropdown);

    // state
    this.isOpen = false;

    // elements
    this._toggle = this.shadowRoot.querySelector("#pfe-dropdown-toggle");
    this._toggle_text = this._toggle.querySelector(".pfe-dropdown__toggle-text");
    this._menu = this.shadowRoot.querySelector("#pfe-dropdown-menu");

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  
    this._clickHandler = this._clickHandler.bind(this);
    this._toggleKeyDownHandler = this._toggleKeyDownHandler.bind(this);
    this._itemKeyDownHandler = this._itemKeyDownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();    
    if (this.children.length) {
      customElements.whenDefined(PfeDropdown.tag).then(() => {
        this._toggle.addEventListener("click", this._clickHandler);
        this._toggle.addEventListener("keydown", this._toggleKeyDownHandler);
        this._allItems().forEach(item => {
          item.addEventListener("keydown", this._itemKeyDownHandler);
        });
      });
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-label":
       this._toggle_text.textContent = newValue;
      default:
        break;
    }
  }

  open(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = true;
    this._menu.classList.add("open");
    this._toggle.setAttribute("aria-expanded", true);
    return this;
  }

  close(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = false;
    this._menu.classList.remove("open");
    this._toggle.removeAttribute("aria-expanded");
    return this;
  }

  _clickHandler(event) {
    this.isOpen ? this.close(event) : this.open(event);
    return this;
  }

  _toggleKeyDownHandler(event) {

    // open menu when "keydown" event occurs on initial focus
    this.open(event);

    let newItem;

    switch (event.keyCode) {

      case KEYCODE.ESC :
        this.close(event);
        break;

      case KEYCODE.DOWN :
        newItem = this._nextItem();
        break;

      default :
        break;
    }

    if (newItem) {
      newItem.focus();
    }
    return this;
  }

  _itemKeyDownHandler(event) {
    
    let newItem;
    switch (event.keyCode) {

      case KEYCODE.ENTER :
        this._selectItem(event);
        break;

      case KEYCODE.ESC :
        this.close(event);
        break;

      case KEYCODE.RIGHT:
      case KEYCODE.DOWN :
        newItem = this._nextItem();
        break;

      case KEYCODE.LEFT:
      case KEYCODE.UP :
        newItem = this._prevItem();
        break;

      case KEYCODE.HOME :
        newItem = this._firstItem();
        break;

      case KEYCODE.END :
        newItem = this._lastItem();
        break;

      default :
        break;
    }
    if (newItem) {
      newItem.focus();
    }
  }

  _allItems() {
    return [...this.querySelectorAll("pfe-dropdown-item")];
  }

  _prevItem() {
    const items = this._allItems();
    let newIdx = items.findIndex(item => item === document.activeElement) - 1;
    return items[(newIdx + items.length) % items.length];
  }

  _firstItem() {
    const items = this._allItems();
    return items[0];
  }

  _lastItem() {
    const items = this._allItems();
    return items[items.length - 1];
  }

  _nextItem() {
    const items = this._allItems();    
    let newIdx = items.findIndex(item => item === document.activeElement) + 1;
    return items[newIdx % items.length];
  }

  _selectItem(event) {
    const pfeType = event.target.attributes['pfe-type'].value;
    
    if (pfeType === 'action') {
      this.dispatchEvent(
        new CustomEvent(`${PfeDropdown.tag}:change`, {
          bubbles: true,
          detail: {
            action: event.target.innerText
          }
        })
      );
    } else if (pfeType === 'link') {
      // todo: add checks for href i.e it should display a warning if href is not present in <a> tag
      window.location.assign(event.target.children[0].href);
    }

    // close menu once an item link or action is clicked/selected
    this.close(event);
  }
}

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
