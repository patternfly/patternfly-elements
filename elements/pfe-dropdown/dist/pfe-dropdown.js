import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeDropdown 1.0.0-prerelease.55
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfeDropdownItem extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>::slotted(*){display:block;width:100%;padding:calc(16px * .5) calc(16px * .5);padding:var(--pfe-dropdown--spacing--vertical,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5))) var(--pfe-dropdown--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5)));color:#030303;color:var(--pfe-dropdown--Color,#030303);font-size:16px;font-size:var(--pfe-dropdown--FontSize,var(--pfe-theme--font-size,16px));font-weight:400;font-weight:var(--pfe-dropdown--FontWeight,400);line-height:1.5;line-height:var(--pfe-dropdown--LineHeight,var(--pfe-theme--line-height,1.5));text-align:left;text-align:var(--pfe-dropdown--TextAlign,left);white-space:nowrap;-webkit-box-sizing:border-box;box-sizing:border-box;text-decoration:none;font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);cursor:pointer}::slotted(button){background-color:transparent;background-color:var(--pfe-dropdown--BackgroundColor,transparent);border:none;border:var(--pfe-dropdown--Border,none)}.pfe-dropdown-item__container:active,.pfe-dropdown-item__container:focus,.pfe-dropdown-item__container:hover{background-color:#f0f0f0;background-color:var(--pfe-dropdown--BackgroundColor--hover,var(--pfe-theme--color--surface--lighter,#f0f0f0));color:#151515;color:var(--pfe-dropdown--Color--hover,#151515)}:host([pfe-item-type=separator]) .pfe-dropdown-item__container{height:1px;background-color:#f0f0f0}:host([is_disabled]) .pfe-dropdown-item__container{pointer-events:none;--pfe-dropdown--Color:#6a6e73}
/*# sourceMappingURL=pfe-dropdown-item.min.css.map */
</style><li class="pfe-dropdown-item__container">
  <slot></slot>
</li>`;
  }

  static get properties() {
    return {"item-type":{"title":"List item type","type":"string","enum":["link","action","separator"],"default":null,"prefixed":true}};
  }

  static get slots() {
    return {};
  }
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

  static get observedAttributes() {
    return ["pfe-item-type", "is_disabled"];
  }

  constructor() {
    super(PfeDropdownItem);

    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._item = this.shadowRoot.querySelector("slot").assignedNodes()[1];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-item-type":
        this._setAccessibility();
        break;
      case "is_disabled":
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
    if (this._container) {
      const type = this.getAttribute("pfe-item-type");
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
    const isDisabled = this.hasAttribute("is_disabled");
    if (isDisabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("is_disabled");
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-disabled", "false");
    }
  }
}

/*!
 * PatternFly Elements: PfeDropdown 1.0.0-prerelease.55
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

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
  SPACE: 32,
  UP: 38,
  TAB: 9
};

class PfeDropdown extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{position:relative;display:inline-block;max-width:100%}:host(:hover:not([is_disabled])){--pfe-dropdown__before--BorderBottomColor:var(--pfe-dropdown__before--BorderBottomColor--hover, var(--pfe-dropdown--BorderBottomColor--before--hover, var(--pfe-theme--color--ui-base, #6a6e73)))}:host(:active:not([is_disabled])),:host(:focus:not([is_disabled])){--pfe-dropdown__before--BorderBottomColor:var(--pfe-dropdown__before--BorderBottomColor--hover, var(--pfe-dropdown--BorderBottomColor--before--hover, var(--pfe-theme--color--ui-base, #6a6e73)));--pfe-dropdown__before--BorderWidth:var(--pfe-dropdown__before--BorderWidth--hover, var(--pfe-dropdown--BorderWidth--before--hover, calc(var(--pfe-theme--ui--border-width, 1px) * 2)))}:host([hidden]){display:none}:host([is_disabled]){--pfe-dropdown--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-dropdown--BorderWidth:0}:host([is_disabled]) .pfe-dropdown__container{pointer-events:none}.pfe-dropdown__toggle{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;min-width:calc(16px * 2);min-width:var(--pfe-dropdown--MinWidth,calc(var(--pfe-theme--container-spacer,16px) * 2));max-width:100%;max-width:var(--pfe-dropdown--MaxWidth,100%);padding:calc(16px * .5) calc(16px * .5);padding:var(--pfe-dropdown--spacing--vertical,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5))) var(--pfe-dropdown--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5)));font-size:16px;font-size:var(--pfe-dropdown--FontSize,var(--pfe-theme--font-size,16px));font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);font-weight:400;font-weight:var(--pfe-dropdown--FontWeight,400);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:#3c3f42;color:var(--pfe-dropdown--Color,var(--pfe-broadcasted--text,#3c3f42));background-color:transparent;background-color:var(--pfe-dropdown--BackgroundColor,transparent);border:none;border:var(--pfe-dropdown--Border,none);cursor:pointer}.pfe-dropdown__toggle::before{position:absolute;top:0;right:0;bottom:0;left:0;content:"";border-width:1px;border-width:var(--pfe-dropdown__before--BorderWidth,var(--pfe-dropdown--BorderWidth--before,var(--pfe-theme--ui--border-width,1px)));border-style:solid;border-style:var(--pfe-dropdown__before--BorderStyle,var(--pfe-dropdown--BorderStyle--before,var(--pfe-theme--ui--border-style,solid)));border-top-color:#f0f0f0;border-top-color:var(--pfe-dropdown__before--BorderTopColor,var(--pfe-dropdown--BorderTopColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-right-color:#f0f0f0;border-right-color:var(--pfe-dropdown__before--BorderRightColor,var(--pfe-dropdown--BorderRightColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-bottom-color:#6a6e73;border-bottom-color:var(--pfe-dropdown__before--BorderBottomColor,var(--pfe-dropdown--BorderBottomColor--before,var(--pfe-theme--color--surface--border--darker,#6a6e73)));border-left-color:#f0f0f0;border-left-color:var(--pfe-dropdown__before--BorderLeftColor,var(--pfe-dropdown--BorderLeftColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)))}.pfe-dropdown__toggle-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pfe-dropdown__toggle-icon{vertical-align:calc(16px * -.125);vertical-align:calc(var(--pfe-theme--container-spacer,16px) * -.125);fill:currentColor;height:1em;height:var(--pfe-theme--icon-size,1em);width:var(--pfe-dropdown__toggle-icon--Width);margin-right:calc(16px * .5);margin-right:calc(var(--pfe-theme--container-spacer,16px) * .5);margin-left:16px;margin-left:var(--pfe-theme--container-spacer,16px);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5)}.pfe-dropdown__menu{display:none;position:absolute;top:calc(100% + .25rem);z-index:97;z-index:var(--pfe-theme--zindex--overlay,97);padding:var(--pfe-dropdown__menu--spacing--vertical) 0;padding:var(--pfe-dropdown__menu--spacing--vertical) var(--pfe-dropdown__menu--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,0));margin:0;margin:var(--pfe-dropdown__menu--Margin,0);background:#fff;background:var(--pfe-dropdown__menu--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));background-clip:padding-box;border-width:1px;border-width:var(--pfe-dropdown__menu--BorderWidth,var(--pfe-theme--ui--border-width,1px));border-style:solid;border-style:var(--pfe-dropdown__menu--BorderStyle,var(--pfe-theme--ui--border-style,solid));border-color:transparent;border-color:var(--pfe-dropdown__menu--BorderColor,transparent);-webkit-box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.2);box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.2);-webkit-box-shadow:var(--pfe-dropdown__menu--BoxShadow,var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.2)));box-shadow:var(--pfe-dropdown__menu--BoxShadow,var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.2)));list-style:none;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:100%;min-width:var(--pfe-dropdown__menu--MinWidth,100%)}.pfe-dropdown__menu.open{display:block}
/*# sourceMappingURL=pfe-dropdown.min.css.map */
</style><div class="pfe-dropdown__container">
  <button class="pfe-dropdown__toggle" type="button" aria-haspopup="menu" aria-controls="pfe-dropdown-menu"
    id="pfe-dropdown-toggle">
    <span class="pfe-dropdown__toggle-text"></span>
    <svg class="pfe-dropdown__toggle-icon" viewBox="0 0 320 512" aria-hidden="true" role="img">
      <path
        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
      </path>
    </svg>
  </button>
  <ul class="pfe-dropdown__menu" role="menu" aria-labelledby="pfe-dropdown-toggle" id="pfe-dropdown-menu">
    <slot></slot>
  </ul>
</div>`;
  }

  static get properties() {
    return {"label":{"title":"Menu button label","type":"string","default":"Dropdown","prefixed":true},"is_disabled":{"title":"Disable menu button","type":"boolean","default":false,"prefixed":false}};
  }

  static get slots() {
    return {};
  }
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
//# sourceMappingURL=pfe-dropdown.js.map
