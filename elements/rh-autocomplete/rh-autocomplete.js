import RHElement from "../rhelement/rhelement.js";

/*
 * Copyright 2018 Red Hat, Inc.
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
 */

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

// use this variable to debounce api call when user types very fast
let throttle = false;

class RhAutocomplete extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }
</style>
<rh-search-box id="input-box"></rh-search-box>
<rh-search-droplist id="dropdown"></rh-search-droplist>`;
  }

  static get tag() {
    return "rh-autocomplete";
  }

  get templateUrl() {
    return "rh-autocomplete.html";
  }

  get styleUrl() {
    return "rh-autocomplete.scss";
  }

  constructor() {
    super(RhAutocomplete);
  }

  connectedCallback() {
    super.connectedCallback();

    this._inputBox = this.shadowRoot.querySelector("#input-box");
    this._inputBox.value = this.initValue;
    this._inputBox.debounce = this.debounce || 500;

    this._dropdown = this.shadowRoot.querySelector("#dropdown");
    this._dropdown.data = [];

    this.addEventListener(
      "rh-input-change-event",
      this._autocomplete.bind(this)
    );
    this.addEventListener("rh-input-blur", this._closeDroplist.bind(this));
    this.addEventListener("keyup", this._inputKeyUp.bind(this));

    // these two events, fire search
    this.addEventListener("rh-search-event", this._closeDroplist.bind(this));
    this.addEventListener(
      "rh-option-selected",
      this._optionSelected.bind(this)
    );
  }

  disconnectedCallback() {
    this.removeEventListener(
      "rh-input-change-event",
      this._autocomplete.bind(this)
    );
    this.removeEventListener("rh-input-blur", this._closeDroplist.bind(this));
    this.removeEventListener("keyup", this._inputKeyUp.bind(this));

    this.removeEventListener("rh-search-event", this._closeDroplist);
    this.removeEventListener(
      "rh-option-selected",
      this._optionSelected.bind(this)
    );
  }

  get initValue() {
    return this.getAttribute("init-value");
  }

  set initValue(val) {
    this.setAttribute("init-value", val);
  }

  get debounce() {
    return this.getAttribute("debounce");
  }

  set debounce(val) {
    this.setAttribute("debounce", val);
  }

  _closeDroplist() {
    this._dropdown.open = null;
    this._inputBox.setAttribute("aria-open", "");
  }

  _openDroplist() {
    this._dropdown.setAttribute("open", true);
    this._inputBox.setAttribute("aria-open", true);
  }

  _optionSelected(e) {
    // update input box with selected value from options list
    var selectedValue = e.detail.optionValue;
    this._reset(selectedValue);

    // send search request
    this._dispatchSearchEvent(selectedValue);
  }

  _dispatchSearchEvent(searchQuery) {
    this.dispatchEvent(
      new CustomEvent("rh-search-event", {
        detail: { searchValue: searchQuery },
        bubbles: true,
        composed: true
      })
    );
  }

  _autocomplete(event) {
    let input = event.detail.inputValue;
    this._sendAutocompleteRequest(input);
  }

  _sendAutocompleteRequest(input) {
    this.autocompleteRequest(
      { query: input },
      this._autocompleteCallback.bind(this)
    );
  }

  _autocompleteCallback(response) {
    this._dropdown.data = response;
    this._dropdown.reflow = true;
    response.length !== 0 ? this._openDroplist() : this._closeDroplist();
  }

  _reset(selectedValue) {
    this._inputBox.value = selectedValue;
    this._dropdown.activeIndex = null;
    this._dropdown.data = [];
    this._closeDroplist();
  }

  _inputKeyUp(e) {
    let key = e.keyCode;

    if (
      this._dropdown.data.length === 0 && //????
      key !== KEYCODE.DOWN &&
      key !== KEYCODE.UP &&
      key !== KEYCODE.ENTER &&
      key !== KEYCODE.ESC
    )
      return;

    let activeIndex = parseInt(this._dropdown.activeIndex, 10) || null;
    let selectedOption = this._dropdown.selectedOption;

    let optionsLength = this._dropdown.data.length;

    if (key == KEYCODE.ESC) {
      this._closeDroplist();
    } else if (key === KEYCODE.UP) {
      activeIndex -= 1;

      if (activeIndex < 0) {
        activeIndex = optionsLength - 1;
      }
    } else if (key === KEYCODE.DOWN) {
      activeIndex += 1;

      if (activeIndex > optionsLength - 1) {
        activeIndex = 0;
      }
    } else if (key === KEYCODE.ENTER) {
      let selectedValue;
      if (activeIndex) {
        selectedValue = this._dropdown.getAttribute("selected-option");
        this._reset(selectedValue);
      } else {
        selectedValue = this._inputBox.value;
      }

      // send search request
      this._dispatchSearchEvent(selectedValue);
      return;
    }

    this._dropdown.activeIndex = activeIndex;
  }
}

/*
* - Attributes ------------------------------------
* value     | input box value
* aria-open | A list is attached to input box. Use this attribute to set
* debounce  | debounce value for firing rh-input-change-event event
              aria-autocomplete="list" and aria-haspopup="true" on input box

* - Events ----------------------------------------
* rh-input-change-event | Fires when user type in input box
* rh-input-blur         | Fires when input box blurs
*/
class RhSearchBox extends RHElement {
  get html() {
    return `
<style>
:host {
  position: relative;
  display: flex; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0; }

input {
  width: 100%;
  flex: 1;
  box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.075) !important;
  padding-left: 5px;
  border-radius: 0;
  background: #fff;
  border: 1px solid #d1d1d1;
  border-right: none;
  font-size: 16px;
  
  line-height: 24px;
  
  height: 35px;
  margin: 0px;
  transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s; }

input:focus,
input:focus ~ button.search-button {
  border-color: #66afe9;
  outline: 0; }

input[type="search"],
button {
  -webkit-appearance: none; }

input[type="search"]::-ms-clear {
  display: none; }

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none; }

button.clear-search {
  font-size: 27px;
  color: #cccccc;
  background-color: #fff;
  font-weight: 600;
  border: none;
  line-height: 20px;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0px;
  margin: 0px; }

button.clear-search:hover {
  opacity: 1;
  color: #06c; }

button.search-button {
  box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.075);
  background-color: #fff;
  border-color: #0076e0;
  color: #06c;
  border: 1px solid #d1d1d1;
  border-left: none;
  margin: 0px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }

button[disabled="true"] {
  color: #ccc; }
</style>
<label for="keywordInputx" class="sr-only">Keyword</label>
  <input placeholder="Enter Your Search Term"
    role="search"
    type="search"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    class="form-control"/>
  <button type="button" class="clear-search" aria-label="clear search query">
    &times;
  </button>
  <button class="search-button" type="button" aria-label="Search">
      <span class="web-icon-search" aria-hidden="true" title="Search">Search</span>
  </button>`;
  }

  static get tag() {
    return "rh-search-box";
  }

  get templateUrl() {
    return "rh-search-box.html";
  }

  get styleUrl() {
    return "rh-search-box.scss";
  }

  constructor() {
    super(RhSearchBox);
  }

  connectedCallback() {
    super.connectedCallback();

    // input box
    this._input = this.shadowRoot.querySelector("input");
    this._input.addEventListener("input", this._inputChanged.bind(this));
    this._input.addEventListener("blur", this._inputBlured.bind(this));

    // clear button
    this._clearBtn = this.shadowRoot.querySelector(".clear-search");
    this._clearBtn.addEventListener("click", this._clear.bind(this));

    // search button
    this._searchBtn = this.shadowRoot.querySelector(".search-button");
    this._searchBtn.addEventListener("click", this._search.bind(this));
  }

  disconnectedCallback() {
    this._input.removeEventListener("input", this._inputChanged);
    this._input.removeEventListener("blur", this._inputBlured);

    this._clearBtn.removeEventListener("click", this._clear);
    this._searchBtn.removeEventListener("click", this._search);
  }

  static get observedAttributes() {
    return ["value", "aria-open"];
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    this.setAttribute("value", val);
  }

  get ariaOpen() {
    return this.hasAttribute("aria-open");
  }

  set ariaOpen(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("aria-open", "");
    } else {
      this.removeAttribute("aria-open");
    }
  }

  get debounce() {
    return this.getAttribute("debounce");
  }

  set debounce(val) {
    this.setAttribute("debounce", val);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback();

    if (attr === "value") {
      this._input.value = newVal;

      if (newVal === "") {
        this._searchBtn.setAttribute("disabled", true);
      } else {
        this._searchBtn.removeAttribute("disabled");
        this._clearBtn.removeAttribute("hidden");
      }
    }

    if (attr === "aria-open") {
      if (newVal) {
        this._input.setAttribute("aria-autocomplete", "list");
        this._input.setAttribute("aria-haspopup", true);
      } else {
        this._input.removeAttribute("aria-autocomplete", "");
        this._input.removeAttribute("aria-haspopup", "");
      }
    }
  }

  _inputBlured() {
    this.dispatchEvent(
      new CustomEvent("rh-input-blur", {
        bubbles: true,
        composed: true
      })
    );
  }

  _inputChanged() {
    this.value = this._input.value;

    if (throttle === false) {
      throttle = true;

      window.setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent("rh-input-change-event", {
            detail: { inputValue: this._input.value },
            bubbles: true,
            composed: true
          })
        );

        throttle = false;
      }, parseInt(this.debounce, 10) || 500);
    }
  }

  _clear() {
    this._input.value = "";
    this._clearBtn.setAttribute("hidden", true);
    this._searchBtn.setAttribute("disabled", true);
    this._input.focus();
  }

  _search(event) {
    this.dispatchEvent(
      new CustomEvent("rh-search-event", {
        detail: { searchValue: this._input.value },
        bubbles: true,
        composed: true
      })
    );
  }
}

/*
* - Attributes ------------------------------------
* open               | Set when the combo box dropdown is open
* active-index       | Set selected option
* loading            | Set when new items are expected
* reflow             | Re-renders the dropdown

* - Events ----------------------------------------
* rh-option-selected | Fires when an option is selected.
  event.detailes.selectedValue contains the selected value.
*/
class RhSearchDroplist extends RHElement {
  get html() {
    return `
<style>
:host {
  position: relative;
  display: none; }

:host([open]) {
  display: block; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0; }

ul {
  display: block;
  position: absolute;
  top: 100%;
  left: 0px;
  right: 0px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 9999;
  margin: 0px;
  padding: 0px;
  list-style: none;
  cursor: pointer;
  overflow-y: scroll;
  overflow-x: hidden; }

ul li.active {
  background-color: #f0f0f0; }

ul li {
  display: list-item;
  cursor: pointer;
  padding: 7px 10px;
  margin: 2px 0px 2px 0px; }
</style>
<div class="suggestions-aria-help sr-only" role="status" aria-activedescendant="option-0"></div>
<ul role="listbox" tabindex="-1">
</ul>`;
  }

  static get tag() {
    return "rh-search-droplist";
  }

  get templateUrl() {
    return "rh-search-droplist.html";
  }

  get styleUrl() {
    return "rh-search-droplist.scss";
  }

  constructor() {
    super(RhSearchDroplist);
  }

  connectedCallback() {
    super.connectedCallback();

    this._ariaAnnounce = this.shadowRoot.querySelector(
      ".suggestions-aria-help"
    );

    this._ul = this.shadowRoot.querySelector("ul");
    this._ul.addEventListener("mousedown", this._optionSelected.bind(this));
  }

  disconnectedCallback() {
    this._ul.removeEventListener("mousedown", this._optionSelected);
  }

  _optionSelected(e) {
    if (e.target.tagName === "LI") {
      this.dispatchEvent(
        new CustomEvent("rh-option-selected", {
          detail: { optionValue: e.target.innerText },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  _renderOptions() {
    this.reflow = "";

    let options = this.data;

    this._ariaAnnounce.innerHTML = `There are ${
      options.length
    } suggestions. Use the up and down arrows to browse.`;
    this._ariaAnnounce.setAttribute("aria-live", "polite");

    this._ul.innerHTML = `${options
      .map((item, index) => {
        return `<li id="option-${index}" class="${
          index === 0 ? "active" : ""
        }" role="option" tabindex="-1" value="${item}">${item}</li>`;
      })
      .join("")}`;
  }

  static get observedAttributes() {
    return ["open", "reflow", "active-index", "selected-option"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback();

    if (this[name] !== newVal) {
      this[name] = newVal;
    }

    if (attr === "active-index" && oldVal !== newVal) {
      this._activeIndexChanged();
    }

    if (attr === "reflow") {
      this._renderOptions();
    }
  }

  _activeIndexChanged() {
    if (isNaN(this.activeIndex) || this.data.length === 0) return;

    // add aria-activedescendant
    this._ul.setAttribute(
      "aria-activedescendant",
      "option-" + this.activeIndex
    );

    // remove active class
    this._ul.querySelector(".active").classList.remove("active");

    // add active class to selected option
    let activeOption = this._ul.querySelector(
      "li:nth-child(" + (this.activeIndex + 1) + ")"
    );
    this.selectedOption = activeOption.innerHTML;
    activeOption.classList.add("active");
  }

  get open() {
    return this.shadowRoot.hasAttribute("open");
  }

  set open(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  get activeIndex() {
    return parseInt(this.getAttribute("active-index"), 10);
  }

  set activeIndex(val) {
    this.setAttribute("active-index", val);
  }

  get selectedOption() {
    this.getAttribute("selected-option");
  }

  set selectedOption(val) {
    this.setAttribute("selected-option", val);
  }

  get reflow() {
    return this.hasAttribute("reflow");
  }

  set reflow(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("reflow", "");
    } else {
      this.removeAttribute("reflow");
    }
  }
}

RHElement.create(RhSearchBox);
RHElement.create(RhSearchDroplist);
RHElement.create(RhAutocomplete);

export default RhAutocomplete;
//# sourceMappingURL=rh-autocomplete.js.map
