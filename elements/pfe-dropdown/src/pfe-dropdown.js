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
    return ["pfe-label", "disabled"];
  }

  get disabled() {
    return this.hasAttribute("disabled");
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
    this._itemClickHandler = this._itemClickHandler.bind(this);
    this._outsideClickHandler = this._outsideClickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._outsideClickHandler);
    Promise.all([
      customElements.whenDefined(PfeDropdown.tag),
      customElements.whenDefined(PfeDropdownItem.tag)
    ]).then(() => {
      if (this.children.length) {
        if (!this.disabled) {
          this._toggle.addEventListener("click", this._clickHandler);
          this._toggle.addEventListener("keydown", this._toggleKeydownHandler);
          this._allItems().forEach(item => {
            item.addEventListener("keydown", this._itemKeydownHandler);
            item.addEventListener("click", this._itemClickHandler);
          });
        }
      }
    });
  }

  disconnectedCallback() {
    this._toggle.removeEventListener("click", this._clickHandler);
    this._toggle.removeEventListener("keydown", this._toggleKeydownHandler);
    this._allItems().forEach(item => {
      item.removeEventListener("keydown", this._itemKeydownHandler);
      item.removeEventListener("click", this._itemClickHandler);
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-label":
        this._toggle_text.textContent = newValue;
        break;

      case "disabled":
        this._setDisabled();
        break;

      default:
        break;
    }
  }

  _setDisabled() {
    const isDisabled = this.hasAttribute("disabled");
    if (isDisabled) {
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("disabled");
      this.setAttribute("aria-disabled", "false");
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
    this._toggle.setAttribute("aria-expanded", false);
    return this;
  }

  _clickHandler(event) {
    this.isOpen ? this.close(event) : this.open(event);

    return this;
  }

  _itemClickHandler(event) {
    let pfeType;

    if (event.target.parentElement.attributes["pfe-type"]) {
      pfeType = event.target.parentElement.attributes["pfe-type"].value;
    }

    this._selectItem(event.target, pfeType);
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
      if (newItem.hasAttribute("disabled")) {
        newItem = this._skipItem();
      }
      newItem.setAttribute("tabindex", "-1");
      newItem.focus();
    }

    return this;
  }

  _itemKeydownHandler(event) {
    let newItem;
    let pfeType;

    if (event.target.attributes["pfe-type"]) {
      pfeType = event.target.attributes["pfe-type"].value;
    }

    switch (event.keyCode) {
      case KEYCODE.ENTER:
        this._selectItem(event.target.children[0], pfeType);
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
      if (newItem.hasAttribute("disabled")) {
        newItem = this._skipItem();
      }
      newItem.setAttribute("tabindex", "-1");
      newItem.focus();
    }

    return this;
  }

  _outsideClickHandler(event) {
    // Check if the clicked element is the dropdown object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the dropdown element
    let isChild = event.target.closest("pfe-dropdown");
    let insideWrapper = event.target.tagName.includes("-")
      ? event.target.shadowRoot.querySelector("pfe-dropdown")
      : null;

    // Check states to determine if the dropdown menu should close
    if (!isSelf && !(isChild || insideWrapper)) {
      this.close(event);
    }
  }

  _allItems() {
    return [
      ...this.querySelectorAll(`${this.tag}-item:not([pfe-type='seperator'])`)
    ];
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

  _skipItem() {
    const items = this._allItems();
    let newIdx = items.findIndex(item => item === document.activeElement) + 1;
    return items[(newIdx % items.length) + 1];
  }

  _selectItem(item, type) {
    if (type === "action") {
      this.dispatchEvent(
        new CustomEvent(`${PfeDropdown.tag}:change`, {
          bubbles: true,
          detail: {
            action: item.innerText
          }
        })
      );
      this.close(event);
    } else {
      item.click();
    }
  }
}

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
