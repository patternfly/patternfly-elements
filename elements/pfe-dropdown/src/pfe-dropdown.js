import PFElement from "../../pfelement/dist/pfelement.js";
import PfeDropdownItem from "./pfe-dropdown-item.js";

// @POLYFILL  Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// @POLYFILL  Element.matches
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

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
  TAB: 9
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

  get schemaUrl() {
    return "pfe-dropdown.json";
  }

  static get observedAttributes() {
    return ["pfe-label", "is_disabled"];
  }

  set pfeDropdownOptions(options) {
    this._modifyDOM(options);
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  constructor() {
    super(PfeDropdown);

    // state
    this.isOpen = false;

    this._init = this._init.bind(this);

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
      this._init();
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
      case "is_disabled":
        this._setDisabled();
        break;
      default:
        break;
    }
  }

  _init() {
    if (this.children.length) {
      if (!this.hasAttribute("is_disabled")) {
        this._toggle.addEventListener("click", this._clickHandler);
        this._toggle.addEventListener("keydown", this._toggleKeydownHandler);
        this._allItems().forEach(item => {
          item.addEventListener("keydown", this._itemKeydownHandler);
          item.addEventListener("click", this._itemClickHandler);
        });
      }
    }
  }

  // Event handler for click event on Dropdown button
  _clickHandler(event) {
    this.isOpen ? this.close(event) : this.open(event);
    return this;
  }

  // Event handler for click event on Dropdown Item
  _itemClickHandler(event) {
    let pfeType;
    if (event.target.parentElement.attributes["pfe-item-type"]) {
      pfeType = event.target.parentElement.attributes["pfe-item-type"].value;
    }
    this._selectItem(event.target, pfeType);
    return this;
  }

  // Event handler for keydown events on Dropdown Menu
  _itemKeydownHandler(event) {
    let newItem;
    let pfeType;
    if (event.target.attributes["pfe-item-type"]) {
      pfeType = event.target.attributes["pfe-item-type"].value;
    }
    // active dropdown item index
    const currentIndex = this._allItems().findIndex(
      item => item === document.activeElement
    );
    switch (event.keyCode) {
      case KEYCODE.ENTER:
        this._selectItem(event.target.children[0], pfeType);
        break;
      case KEYCODE.ESC:
        this.close(event);
        break;
      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        // get the following item
        newItem = this._itemContainer(this._nextItem(currentIndex, 1));
        break;
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        // get the previous item
        newItem = this._itemContainer(this._nextItem(currentIndex, -1));
        break;
      case KEYCODE.HOME:
        newItem = this._firstItem();
        break;
      case KEYCODE.END:
        newItem = this._lastItem();
        break;
      case KEYCODE.TAB:
        this.close();
        break;
      default:
        break;
    }
    if (newItem) {
      newItem.setAttribute("tabindex", "-1");
      newItem.focus();
    }
    return this;
  }

  // Event handler for click event outside the Dropdown element
  _outsideClickHandler(event) {
    // Check if the clicked element is the dropdown object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the dropdown element
    let isChild = event.target.closest("pfe-dropdown");
    let insideWrapper =
      event.target.tagName.indexOf("-") > -1
        ? event.target.shadowRoot.querySelector("pfe-dropdown")
        : null;
    // Check states to determine if the dropdown menu should close
    if (!isSelf && !(isChild || insideWrapper)) {
      this.close();
    }
  }

  // Event handler for keydown event on Dropdown
  _toggleKeydownHandler(event) {
    switch (event.keyCode) {
      case KEYCODE.ENTER:
      case KEYCODE.DOWN:
        if (this._allDisabled()) {
          // toggle the dropdown if all items disabled
          this.toggle(event);
        } else {
          // otherwise, get the next enabled item
          this.open();
          const item = this._itemContainer(this._nextItem(-1, 1));
          item.setAttribute("tabindex", "-1");
          item.focus();
        }
        break;
      case KEYCODE.TAB:
        this.close();
        break;
      default:
        break;
    }
    return this;
  }

  // modify DOM if custom options are passed in an array
  _modifyDOM(options) {
    options.forEach(el => {
      let item;
      switch (el.type) {
        case "link":
          item = document.createElement("a");
          item.setAttribute("href", el.href ? el.href : "#");
          break;
        case "action":
          item = document.createElement("button");
          break;
        default:
          break;
      }
      const option = document.createElement("pfe-dropdown-item");
      option.setAttribute("pfe-item-type", el.type);
      if (el.is_disabled) {
        option.setAttribute("is_disabled", el.is_disabled);
      }
      if (item) {
        item.innerText = el.text ? el.text : "";
        option.appendChild(item);
      }
      this.appendChild(option);
    });
  }

  _setDisabled() {
    const isDisabled = this.hasAttribute("is_disabled");
    if (isDisabled) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("tabindex", "-1");
    } else {
      this.removeAttribute("is_disabled");
      this.setAttribute("aria-disabled", "false");
      this.removeAttribute("tabindex");
    }
  }

  _allItems() {
    return [
      ...this.querySelectorAll(
        `${this.tag}-item:not([pfe-item-type='separator'])`
      )
    ];
  }

  _allDisabled() {
    return (
      this._allItems().find(item => !item.hasAttribute("is_disabled")) ===
      undefined
    );
  }

  _nextItem(currentPosition, direction) {
    const items = this._allItems();
    let index = (currentPosition + direction) % items.length;
    index = index < 0 ? index + items.length : index;
    let item = items[index];
    while (item && item.hasAttribute("is_disabled")) {
      index += direction;
      item = items[index % items.length];
    }
    return item;
  }

  _firstItem() {
    const items = this._allItems();
    return items[0];
  }

  _lastItem() {
    const items = this._allItems();
    return items[items.length - 1];
  }

  _selectItem(item, type) {
    if (type === "action") {
      this.emitEvent(PfeDropdown.events.change, {
        detail: { action: item.innerText }
      });
      this.close(event);
    } else {
      item.click();
    }
  }

  addDropdownOptions(options) {
    this._modifyDOM(options);
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

  toggle(event) {
    this.isOpen ? this.close(event) : this.open(event);
  }

  _itemContainer(item) {
    // used to apply the focus state to the item's container
    return item.shadowRoot.querySelector(`.${this.tag}-item__container`);
  }
}

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
