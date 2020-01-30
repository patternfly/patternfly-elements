import PFElement from "../../pfelement/dist/pfelement.js";

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
    this._list = this.querySelector('[slot=list]');
    this._items = null;

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this._itemSelected = this._itemSelected.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._toggle.addEventListener("click", this.toggle);

    customElements.whenDefined(PfeDropdown.tag).then(() => {
      if (this._items) {
        this._modifyDOM();
        this._list = this.querySelector('[slot=list]');
        this._list.querySelectorAll('[slot=item]').forEach(item => item.addEventListener('click', this._itemSelected));
      }
    });
  }

  _itemSelected(event) {
    this.dispatchEvent(new CustomEvent(`${this.tag}:click`, {
      detail: { value: event },
      bubbles: true,
      composed: true
    }));
  }

  _modifyDOM() {
    // create a new list of HTML list items
    let newList = document.createElement('ul');
    newList.setAttribute("slot", "list");
    this._items.map(el => {
      const item = Object.assign(document.createElement('li') , el);
      item.setAttribute("slot", "item");
      newList.appendChild(item);
    });

    // if a list already exists, replace, otherwise add newlist to the dropdown
    let existingList = this.querySelector('[slot=list]');
    if (existingList) {
      existingList.parentNode.replaceChild(newList, existingList);
    } else {
      this.appendChild(newList);
    }
  }

  addItems(items) {
    this._items = this._items ? this._items.concat(items) : items;
    this._modifyDOM();
  }

  open(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = true;
    this._list.classList.add("open");
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
    this._list.classList.remove("open");
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

PFElement.create(PfeDropdown);

export default PfeDropdown;
