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

    this.loading = false;
    this.disabled = false;
    this.debounce = this.debounce || 300;
    this._inputBox = this.shadowRoot.querySelector("#input-box");

    this._inputBox.value = this.initValue || "";
    this._inputBox.debounce = this.debounce;

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

  static get observedAttributes() {
    return ["init-value", "loading", "disabled"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback();
    let searchBox = this.shadowRoot.querySelector("rh-search-box").shadowRoot;
    switch (attr) {
      case "loading":
        if (this.loading) {
          searchBox.querySelector(".loading").removeAttribute("hidden");
        } else {
          searchBox.querySelector(".loading").setAttribute("hidden", "");
        }
        break;

      case "disabled":
        if (this.disabled) {
          searchBox.querySelectorAll("button").forEach(e => {
            e.removeAttribute("disabled");
          });

          searchBox.querySelector("input").removeAttribute("disabled");
        } else {
          searchBox.querySelectorAll("button").forEach(e => {
            e.setAttribute("disabled", "");
          });

          searchBox.querySelector("input").setAttribute("disabled", "");
        }
        break;

      case "init-value":
        if (this["init-value"] !== newVal) {
          this["init-value"] = newVal;
        }
        break;
    }
  }

  set disabled(value) {
    const disabled = Boolean(value);
    if (disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set loading(value) {
    const loading = Boolean(value);
    if (loading) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  get loading() {
    return this.hasAttribute("loading");
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

    this._dropdown.removeAttribute("active-index");
    this._inputBox.removeAttribute("active-index");
  }

  _openDroplist() {
    this._dropdown.setAttribute("open", true);

    this._dropdown.setAttribute("active-index", 0);
    this._inputBox.setAttribute("active-index", 0);
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
      this._dropdown.data.length === 0 &&
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
    this._inputBox.activeIndex = activeIndex;
  }
}

/*
* - Attributes ------------------------------------
* value        | input box value
* active-index | Set selected option
* debounce     | debounce value for firing rh-input-change-event event

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
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075) !important;
  padding-left: 5px;
  padding-right: 30px;
  border-radius: 0;
  background-color: #fff;
  border: 1px solid var(--rh-theme--color--surface--border--lightest, #ececec);
  font-size: 16px;
  
  line-height: 24px;
  
  height: 35px;
  transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s; }

input:disabled,
button:disabled {
  cursor: not-allowed;
  background-color: transparent;
  color: #ccc;
  opacity: 1; }

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

button {
  font-size: 27px;
  color: #cccccc;
  font-weight: 600;
  border: none;
  position: absolute;
  padding: 0px;
  margin-top: 1px; }

button.clear-search {
  right: 31px;
  width: 20px;
  margin-right: 5px; }

button.clear-search:hover {
  opacity: 1;
  color: #06c; }

button.search-button {
  right: 1px;
  width: 30px; }

button.search-button svg {
  fill: #06c;
  width: 16px; }

button.search-button:hover svg,
button.search-button:focus svg {
  fill: #004080; }

button.clear-search:hover {
  color: #ccc; }

button.search-button:disabled svg {
  fill: #ccc; }

.loading {
  position: absolute;
  width: 25px;
  right: 45px;
  top: 62%;
  transform: translate(-50%, -50%); }
</style>
<input placeholder="Enter Your Search Term"
  role="combobox"
  aria-label="Search"
  aria-autocomplete="both"
  aria-haspopup="true"
  type="search"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
  class="form-control"/>

<span class="loading" aria-hidden="true" hidden>
  <svg viewBox="0 0 40 40" enable-background="new 0 0 40 40">
  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
    </path>
  </svg>
</span>

<button type="button" class="clear-search" aria-label="clear search query">
  &times;
</button>
<button class="search-button" type="button" aria-label="Search">
  <svg viewBox="0 0 512 512">
    <path d="M256.233,5.756c-71.07,15.793-141.44,87.863-155.834,159.233c-11.495,57.076,0.3,111.153,27.688,154.335L6.339,441.172
  c-8.596,8.596-8.596,22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,8.596,30.987,0L192.26,383.796
  c43.282,27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,159.632-155.934
  C540.212,104.314,407.968-27.93,256.233,5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944
  S171.969,281.239,171.969,208.37S231.043,76.426,303.913,76.426S435.857,135.501,435.857,208.37z"/>
  </svg>
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
    return ["value", "active-index"];
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    if (val === "") this._clear();
    this.setAttribute("value", val);
  }

  get activeIndex() {
    return parseInt(this.getAttribute("active-index"), 10);
  }

  set activeIndex(val) {
    this.setAttribute("active-index", val);
  }

  get debounce() {
    return parseInt(this.getAttribute("debounce"), 10);
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
        if (!this._input.hasAttribute("disabled"))
          this._searchBtn.removeAttribute("disabled");
        this._clearBtn.removeAttribute("hidden");
      }
    }

    if (attr === "active-index") {
      if (newVal) {
        // add aria-activedescendant on input box
        this._input.setAttribute("aria-activedescendant", "option-" + newVal);
      } else {
        this._input.setAttribute("aria-activedescendant", "");
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
      }, this.debounce);
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
  display: none;
  font-family: var(--rh-theme--font-family);
  font-size: var(--rh-theme--font-size);
  line-height: var(--rh-theme--line-height); }

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

.droplist {
  position: absolute;
  top: 100%;
  left: 0px;
  right: 0px;
  max-height: 250px;
  z-index: 9999;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #ccc;
  background-color: #fff; }

input {
  font-family: var(--rh-theme--font-family);
  font-size: var(--rh-theme--font-size);
  line-height: var(--rh-theme--line-height); }

ul {
  font-family: var(--rh-theme--font-family);
  font-size: var(--rh-theme--font-size);
  line-height: var(--rh-theme--line-height);
  border-top: none;
  margin: 0px;
  padding: 0px;
  list-style: none;
  cursor: pointer; }
  ul li {
    display: list-item;
    cursor: pointer;
    padding: 7px 10px;
    margin: 2px 0px 2px 0px; }
    ul li.active {
      background-color: var(--rh-theme--color--surface--lighter, #ececec); }
</style>
<div class="suggestions-aria-help sr-only" aria-hidden="false" role="status"></div>
<div class="droplist">
  <ul role="listbox" tabindex="-1">
  </ul>
</div>`;
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

    // remove active class
    this._ul.querySelector(".active").classList.remove("active");

    // add active class to selected option
    let activeOption = this._ul.querySelector(
      "li:nth-child(" + (this.activeIndex + 1) + ")"
    );
    this.selectedOption = activeOption.innerHTML;
    activeOption.classList.add("active");

    // scroll to selected element when selected item with keyboard is out of view
    let ulWrapper = this.shadowRoot.querySelector(".droplist");
    let activeOptionHeight = activeOption.offsetHeight;
    activeOptionHeight += parseInt(
      window.getComputedStyle(activeOption).getPropertyValue("margin-bottom"),
      10
    );
    ulWrapper.scrollTop =
      activeOption.offsetTop - ulWrapper.offsetHeight + activeOptionHeight;
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
