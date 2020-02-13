import PFElement from "../../pfelement/dist/pfelement.js";
import PfeDropdownItem from "./pfe-dropdown-item.js";

const KEYCODE = {
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESC: 27,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 0 || 32,
  UP: 38
};

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
    this._container = this.shadowRoot.querySelector(`#${this.tag}-container`);
    this._toggle = this.shadowRoot.querySelector(`#${this.tag}-toggle`);
    this._toggle_text = this._toggle.querySelector(`.${this.tag}__toggle-text`);
    this._menu = this.shadowRoot.querySelector(`#${this.tag}-menu`);

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this._clickHandler = this._clickHandler.bind(this);
    this._toggleKeydownHandler = this._toggleKeydownHandler.bind(this);
    this._itemKeydownHandler = this._itemKeydownHandler.bind(this);
    //this._outsideClickHandler = this._outsideClickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.children.length) {
      customElements.whenDefined(PfeDropdown.tag).then(() => {
        //document.addEventListener("click", this._outsideClickHandler);
        this._toggle.addEventListener("click", this._clickHandler);
        this._toggle.addEventListener("keydown", this._toggleKeydownHandler);
        this._allItems().forEach(item => {
          item.addEventListener("keydown", this._itemKeydownHandler);
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

  _toggleKeydownHandler(event) {
    // open menu when "keydown" event occurs on initial focus
    this.open(event);

    let newItem;

    switch (event.keyCode) {
      case KEYCODE.ESC:
        this.close(event);
        break;

      case KEYCODE.DOWN:
        newItem = this._firstItem();
        break;

      default:
        break;
    }

    if (newItem) {
      newItem.focus();
    }
    return this;
  }

  _itemKeydownHandler(event) {
    let newItem;
    const pfeType = event.target.parentElement.attributes["pfe-type"].value;
    switch (event.keyCode) {
      case KEYCODE.ENTER:
        if (pfeType === "action") {
          this._selectItem(event);
        }
        break;

      case KEYCODE.ESC:
        this.close(event);
        break;

      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        newItem = this._nextItem();
        break;

      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newItem = this._prevItem();
        break;

      case KEYCODE.HOME:
        newItem = this._firstItem();
        break;

      case KEYCODE.END:
        newItem = this._lastItem();
        break;

      default:
        break;
    }
    if (newItem) {
      newItem.focus();
    }
  }

  // TODO: This logic doesn't work as the (this._container.contains(path[0])) always return false
  // _outsideClickHandler(event) {
  //   const path = event.path || (event.composedPath && event.composedPath());
  //   if (!this._container.contains(path[0])) {
  //     this.close(event);
  //   }
  // }

  _allItems() {
    return [
      ...this.querySelectorAll(`${this.tag}:not([pfe-type='seperator'])`)
    ].map(item => item.children[0]);
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
    this.dispatchEvent(
      new CustomEvent(`${PfeDropdown.tag}:change`, {
        bubbles: true,
        detail: {
          action: event.target.innerText
        }
      })
    );
    this.close(event);
  }
}

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
