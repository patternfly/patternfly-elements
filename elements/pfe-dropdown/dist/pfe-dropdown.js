import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeDropdown 1.0.0-prerelease.31
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
    return "1.0.0-prerelease.31";
  }

  get html() {
    return `<style>:host{--pfe-dropdown-item--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown-item--PaddingRight:var(--pfe-theme--container-padding, 16px);--pfe-dropdown-item--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown-item--PaddingLeft:var(--pfe-theme--container-padding, 16px);--pfe-dropdown-item--FontSize:var(--pfe-theme--font-size, 16px);--pfe-dropdown-item--FontWeight:400;--pfe-dropdown-item--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown-item--Color:#151515;--pfe-dropdown-item--Color--hover:#151515;--pfe-dropdown-item--TextAlign:left;--pfe-dropdown-item--WhiteSpace:nowrap;--pfe-dropdown-item--BackgroundColor:transparent;--pfe-dropdown-item--BackgroundColor--hover:#ededed;--pfe-dropdown-item--Border:none;--pfe-dropdown-item--BoxSizing:border-box;--pfe-dropdown-item--TextDecoration:none;--pfe-dropdown-item--Height:1px;--pfe-dropdown-item--MarginTop:0.5rem;--pfe-dropdown-item--MarginBottom:0.5rem}::slotted(*){display:block;width:100%;padding-top:var(--pfe-dropdown-item--PaddingTop);padding-right:var(--pfe-dropdown-item--PaddingRight);padding-bottom:var(--pfe-dropdown-item--PaddingBottom);padding-left:var(--pfe-dropdown-item--PaddingLeft);font-size:var(--pfe-dropdown-item--FontSize);font-weight:var(--pfe-dropdown-item--FontWeight);line-height:var(--pfe-dropdown-item--LineHeight);color:var(--pfe-dropdown-item--Color);text-align:var(--pfe-dropdown-item--TextAlign);white-space:var(--pfe-dropdown-item--WhiteSpace);background-color:var(--pfe-dropdown-item--BackgroundColor);border:var(--pfe-dropdown-item--Border);-webkit-box-sizing:var(--pfe-dropdown-item--BoxSizing);box-sizing:var(--pfe-dropdown-item--BoxSizing);-webkit-text-decoration:var(--pfe-dropdown-item--TextDecoration);text-decoration:var(--pfe-dropdown-item--TextDecoration);font-family:inherit}::slotted(:hover){color:var(--pfe-dropdown-item--Color--hover);background-color:var(--pfe-dropdown-item--BackgroundColor--hover)}:host([pfe-type=separator]) .pfe-dropdown-item__container{height:var(--pfe-dropdown-item--Height);margin-top:var(--pfe-dropdown-item--MarginTop);background-color:#d2d2d2;border:0}:host([disabled]) .pfe-dropdown-item__container{pointer-events:none;--pfe-dropdown-item--Color:#737679;--pfe-dropdown-item--BackgroundColor:transparent}
/*# sourceMappingURL=pfe-dropdown-item.min.css.map */
</style><li class="pfe-dropdown-item__container" id="pfe-dropdown-item">
  <slot></slot>
</li>`;
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
          case "separator":
            this._container.setAttribute("role", "separator");
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

/*!
 * PatternFly Elements: PfeDropdown 1.0.0-prerelease.31
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

const KEYCODE = {
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESC: 27,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
};

class PfeDropdown extends PFElement {
  static get version() {
    return "1.0.0-prerelease.31";
  }

  get html() {
    return `<style>:host{--pfe-dropdown__toggle--Position:relative;--pfe-dropdown__toggle--Display:flex;--pfe-dropdown__toggle--AlignItems:center;--pfe-dropdown__toggle--JustifyContent:space-between;--pfe-dropdown__toggle--MinWidth:calc(var(--pfe-theme--container-spacer, 16px) * 2);--pfe-dropdown__toggle--MaxWidth:100%;--pfe-dropdown__toggle--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.375);--pfe-dropdown__toggle--PaddingRight:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__toggle--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.375);--pfe-dropdown__toggle--PaddingLeft:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__toggle--FontSize:var(--pfe-theme--font-size, 16px);--pfe-dropdown__toggle--FontWeight:400;--pfe-dropdown__toggle--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown__toggle--Color:var(--pfe-theme--color--text, #333);--pfe-dropdown__toggle--BackgroundColor:transparent;--pfe-dropdown__toggle--Border:none;--pfe-dropdown__toggle--BorderBottomColor--before:#8a8d90;--pfe-dropdown__toggle--BorderBottomColor--before--hover:var(--pfe-theme--color--link, #06c);--pfe-dropdown__toggle--BorderWidth--before:var(--pfe-theme--ui--border-width, 1px);--pfe-dropdown__toggle--BorderWidth--before--hover:calc(var(--pfe-theme--ui--border-width, 1px) * 2);--pfe-dropdown__toggle--BorderTopColor--before:#ededed;--pfe-dropdown__toggle--BorderRightColor--before:#ededed;--pfe-dropdown__toggle--BorderLeftColor--before:#ededed;--pfe-dropdown__toggle--BorderStyle--before:solid;--pfe-dropdown__toggle-text--Overflow:hidden;--pfe-dropdown__toggle-text--TextOverflow:ellipsis;--pfe-dropdown__toggle-text--WhiteSpace:nowrap;--pfe-dropdown__toggle-icon--VerticalAlign:calc(var(--pfe-theme--container-spacer, 16px) * -0.125);--pfe-dropdown__toggle-icon--Height:var(--pfe-theme--icon-size, 1em);--pfe-dropdown__toggle-icon--Width:var(--pfe-theme--icon-size, 1em);--pfe-dropdown__toggle-icon--MarginRight:calc(var(--pfe-theme--container-spacer, 16px) * 0.5);--pfe-dropdown__toggle-icon--MarginLeft:var(--pfe-theme--container-spacer, 16px);--pfe-dropdown__toggle-icon--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown__menu--Top:calc(100% + 0.25rem);--pfe-dropdown__menu--ZIndex:200;--pfe-dropdown__menu--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__menu--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__menu--PaddingRight:0;--pfe-dropdown__menu--PaddingLeft:0;--pfe-dropdown__menu--Margin:0;--pfe-dropdown__menu--Background:var(--pfe-theme--color--surface--lightest, #fff);--pfe-dropdown__menu--BackgroundClip:padding-box;--pfe-dropdown__menu--BorderWidth:var(--pfe-theme--ui--border-width, 1px);--pfe-dropdown__menu--BorderStyle:var(--pfe-theme--ui--border-style, solid);--pfe-dropdown__menu--BorderColor:transparent;--pfe-dropdown__menu--BoxShadow:var(--pfe-theme--box-shadow--sm, 0 0.0625rem 0.125rem 0 rgba(19, 19, 19, 0.2));--pfe-dropdown__menu--BoxSizing:border-box;--pfe-dropdown__menu--ListStyle:none;--pfe-dropdown__menu--MinWidth:100%;position:relative;display:inline-block;max-width:100%}:host([hidden]){display:none}:host([disabled]) .pfe-dropdown__container{pointer-events:none}:host([disabled]) .pfe-dropdown__toggle{--pfe-dropdown__toggle--BackgroundColor:#ededed}:host([disabled]) .pfe-dropdown__toggle::before{border:none}.pfe-dropdown__toggle{position:var(--pfe-dropdown__toggle--Position);display:var(--pfe-dropdown__toggle--Display);-webkit-box-align:var(--pfe-dropdown__toggle--AlignItems);-webkit-align-items:var(--pfe-dropdown__toggle--AlignItems);-ms-flex-align:var(--pfe-dropdown__toggle--AlignItems);align-items:var(--pfe-dropdown__toggle--AlignItems);-webkit-box-pack:var(--pfe-dropdown__toggle--JustifyContent);-webkit-justify-content:var(--pfe-dropdown__toggle--JustifyContent);-ms-flex-pack:var(--pfe-dropdown__toggle--JustifyContent);justify-content:var(--pfe-dropdown__toggle--JustifyContent);min-width:var(--pfe-dropdown__toggle--MinWidth);max-width:var(--pfe-dropdown__toggle--MaxWidth);padding-top:var(--pfe-dropdown__toggle--PaddingTop);padding-right:var(--pfe-dropdown__toggle--PaddingRight);padding-bottom:var(--pfe-dropdown__toggle--PaddingBottom);padding-left:var(--pfe-dropdown__toggle--PaddingLeft);font-size:var(--pfe-dropdown__toggle--FontSize);font-weight:var(--pfe-dropdown__toggle--FontWeight);line-height:var(--pfe-dropdown__toggle--LineHeight);color:var(--pfe-dropdown__toggle--Color);background-color:var(--pfe-dropdown__toggle--BackgroundColor);border:var(--pfe-dropdown__toggle--Border);font-family:inherit}.pfe-dropdown__toggle:active:before,.pfe-dropdown__toggle:focus:before,.pfe-dropdown__toggle:hover:before{border-bottom-color:var(--pfe-dropdown__toggle--BorderBottomColor--before--hover)}.pfe-dropdown__toggle:active:before,.pfe-dropdown__toggle:focus:before{border-width:var(--pfe-dropdown__toggle--BorderWidth--before--hover)}.pfe-dropdown__toggle:before{position:absolute;top:0;right:0;bottom:0;left:0;content:"";border-width:var(--pfe-dropdown__toggle--BorderWidth--before);border-style:var(--pfe-dropdown__toggle--BorderStyle--before);border-top-color:var(--pfe-dropdown__toggle--BorderTopColor--before);border-right-color:var(--pfe-dropdown__toggle--BorderRightColor--before);border-bottom-color:var(--pfe-dropdown__toggle--BorderBottomColor--before);border-left-color:var(--pfe-dropdown__toggle--BorderLeftColor--before)}.pfe-dropdown__toggle-text{overflow:var(--pfe-dropdown__toggle-text--Overflow);text-overflow:var(--pfe-dropdown__toggle-text--TextOverflow);white-space:var(--pfe-dropdown__toggle-text--WhiteSpace)}.pfe-dropdown__toggle-icon{vertical-align:var(--pfe-dropdown__toggle-icon--VerticalAlign);fill:currentColor;height:var(--pfe-dropdown__toggle-icon--Height);width:var(--pfe-dropdown__toggle-icon--Width);margin-right:var(--pfe-dropdown__toggle-icon--MarginRight);margin-left:var(--pfe-dropdown__toggle-icon--MarginLeft);line-height:var(--pfe-dropdown__toggle-icon--LineHeight)}.pfe-dropdown__menu{display:none;position:absolute;top:var(--pfe-dropdown__menu--Top);z-index:var(--pfe-dropdown__menu--ZIndex);padding-top:var(--pfe-dropdown__menu--PaddingTop);padding-bottom:var(--pfe-dropdown__menu--PaddingBottom);padding-right:var(--pfe-dropdown__menu--PaddingRight);padding-left:var(--pfe-dropdown__menu--PaddingLeft);margin:var(--pfe-dropdown__menu--Margin);background:var(--pfe-dropdown__menu--Background);background-clip:var(--pfe-dropdown__menu--BackgroundClip);border-width:var(--pfe-dropdown__menu--BorderWidth);border-style:var(--pfe-dropdown__menu--BorderStyle);border-color:var(--pfe-dropdown__menu--BorderColor);-webkit-box-shadow:var(--pfe-dropdown__menu--BoxShadow);box-shadow:var(--pfe-dropdown__menu--BoxShadow);-webkit-box-sizing:var(--pfe-dropdown__menu--BoxSizing);box-sizing:var(--pfe-dropdown__menu--BoxSizing);list-style:var(--pfe-dropdown__menu--ListStyle);min-width:var(--pfe-dropdown__menu--MinWidth)}.pfe-dropdown__menu.open{display:block}
/*# sourceMappingURL=pfe-dropdown.min.css.map */
</style><div class="pfe-dropdown__container" id="pfe-dropdown-container">
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

      case "disabled":
        this._setDisabled();
        break;

      default:
        break;
    }
  }

  _init() {
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
  }

  // Event handler for click event on Dropdown button
  _clickHandler(event) {
    this.isOpen ? this.close(event) : this.open(event);

    return this;
  }

  // Event handler for click event on Dropdown Item
  _itemClickHandler(event) {
    let pfeType;

    if (event.target.parentElement.attributes["pfe-type"]) {
      pfeType = event.target.parentElement.attributes["pfe-type"].value;
    }

    this._selectItem(event.target, pfeType);
    return this;
  }

  // Event handler for keydown events on Dropdown Menu
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
        newItem = this._nextItem().hasAttribute("disabled")
          ? this._skipItem(1)
          : this._nextItem();
        break;

      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newItem = this._prevItem().hasAttribute("disabled")
          ? this._skipItem(-1)
          : this._prevItem();
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
    let insideWrapper = event.target.tagName.includes("-")
      ? event.target.shadowRoot.querySelector("pfe-dropdown")
      : null;

    // Check states to determine if the dropdown menu should close
    if (!isSelf && !(isChild || insideWrapper)) {
      this.close(event);
    }
  }

  // Event handler for keydown event on Dropdown
  _toggleKeydownHandler(event) {
    if (event.keyCode === KEYCODE.DOWN || event.keyCode === KEYCODE.ENTER) {
      this.open(event);
      let newItem = this._firstItem();
      if (newItem) {
        if (newItem.hasAttribute("disabled")) {
          newItem = this._skipItem(1);
        }
        newItem.setAttribute("tabindex", "-1");
        newItem.focus();
      }
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
      option.setAttribute("pfe-type", el.type);
      if (el.disabled) {
        option.setAttribute("disabled", el.disabled);
      }
      if (item) {
        item.innerText = el.text ? el.text : "";
        option.appendChild(item);
      }
      this.appendChild(option);
    });
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

  _allItems() {
    return [
      ...this.querySelectorAll(`${this.tag}-item:not([pfe-type='separator'])`)
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

  _skipItem(direction) {
    const items = this._allItems();
    let newIdx =
      items.findIndex(item => item === document.activeElement) + direction;
    return items[(newIdx % items.length) + direction];
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
}

PFElement.create(PfeDropdownItem);
PFElement.create(PfeDropdown);

export default PfeDropdown;
//# sourceMappingURL=pfe-dropdown.js.map
