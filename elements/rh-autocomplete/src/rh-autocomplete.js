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

import RHElement from "../rhelement/rhelement.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

// use this variable to debounce api call when user types very fast
let throttle = false;

class RhAutocomplete extends RHElement {
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
    this.debounce = this.debounce || 300;

    this._inputBox = this.shadowRoot.querySelector("#input-box");
    this._inputBox.debounce = this.debounce;

    this._dropdown = this.shadowRoot.querySelector("#dropdown");
    this.addEventListener("rh-search-event", this._updateInputBox.bind(this));
    this._dropdown.data = [];

    this.activeIndex = null;

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
      "rh-search-event",
      this._updateInputBox.bind(this)
    );

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
    return ["init-value", "loading", "is-disabled"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback();
    let searchBox = this.shadowRoot.querySelector("rh-search-box").shadowRoot;
    switch (attr) {
      case "loading":
        if (
          !this.loading ||
          this._inputBox.shadowRoot.querySelector("input").value === ""
        ) {
          searchBox.querySelector(".loading").setAttribute("hidden", "");
        } else {
          searchBox.querySelector(".loading").removeAttribute("hidden");
        }

        break;

      case "is-disabled":
        if (this.isDisabled) {
          searchBox.querySelectorAll("button").forEach(e => {
            e.setAttribute("disabled", "");
          });
          searchBox.querySelector("input").setAttribute("disabled", "");
        } else {
          searchBox.querySelectorAll("button").forEach(e => {
            e.removeAttribute("disabled");
          });
          searchBox.querySelector("input").removeAttribute("disabled");
        }
        break;

      case "init-value":
        if (this["init-value"] !== newVal) {
          let inputBox = this.shadowRoot.querySelector("#input-box").shadowRoot;

          inputBox.querySelector("input").value = newVal;
          inputBox.querySelector("button.search-button").disabled = false;
        }
        break;
    }
  }

  set isDisabled(value) {
    if (value) {
      this.setAttribute("is-disabled", "");
    } else {
      this.removeAttribute("is-disabled");
    }
  }

  get isDisabled() {
    return this.hasAttribute("is-disabled");
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

  _updateInputBox(e) {
    this._inputBox.shadowRoot.querySelector("input").value =
      e.detail.searchValue;
    this._reset();
  }

  _closeDroplist() {
    this._dropdown.open = null;

    this._dropdown.removeAttribute("active-index");
    this._inputBox.removeAttribute("active-index");
  }

  _openDroplist() {
    this._dropdown.setAttribute("open", true);

    this._dropdown.setAttribute("active-index", null);
    this._inputBox.setAttribute("active-index", null);
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
    if (!this.autocompleteRequest) return;

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

  _reset() {
    this._dropdown.activeIndex = null;
    this._dropdown.data = [];
    this._closeDroplist();
  }

  _activeOption(activeIndex) {
    if (activeIndex === null || activeIndex === "null") return;
    return this._dropdown.shadowRoot.querySelector(
      "li:nth-child(" + (parseInt(activeIndex, 10) + 1) + ")"
    ).innerHTML;
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

    let activeIndex = this._dropdown.activeIndex;
    let optionsLength = this._dropdown.data.length;

    if (key == KEYCODE.ESC) {
      this._closeDroplist();
    } else if (key === KEYCODE.UP) {
      activeIndex =
        activeIndex === null || activeIndex === "null"
          ? optionsLength
          : parseInt(activeIndex, 10);

      activeIndex -= 1;

      if (activeIndex < 0) {
        activeIndex = optionsLength - 1;
      }

      this._inputBox.shadowRoot.querySelector(
        "input"
      ).value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.DOWN) {
      activeIndex =
        activeIndex === null || activeIndex === "null"
          ? -1
          : parseInt(activeIndex, 10);
      activeIndex += 1;

      if (activeIndex > optionsLength - 1) {
        activeIndex = 0;
      }

      this._inputBox.shadowRoot.querySelector(
        "input"
      ).value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.ENTER) {
      let selectedValue = this._inputBox.shadowRoot.querySelector("input")
        .value;
      this._reset();
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
* active-index | Set selected option
* debounce     | debounce value for firing rh-input-change-event event

* - Events ----------------------------------------
* rh-input-change-event | Fires when user type in input box
* rh-input-blur         | Fires when input box blurs
*/
class RhSearchBox extends RHElement {
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
    return ["active-index"];
  }

  get activeIndex() {
    return this.getAttribute("active-index") || null;
  }

  set activeIndex(val) {
    this.setAttribute("active-index", val);
  }

  get debounce() {
    return this.getAttribute("debounce");
  }

  set debounce(val) {
    this.setAttribute("debounce", val);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback();

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
    if (this._input.value === "") {
      this._searchBtn.setAttribute("disabled", true);
      this._clearBtn.setAttribute("hidden", true);
    } else {
      if (!this._input.hasAttribute("disabled"))
        this._searchBtn.removeAttribute("disabled");
      this._clearBtn.removeAttribute("hidden");
    }

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

    this.activeIndex = null;
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
        return `<li id="option-${index}" role="option" tabindex="-1" value="${item}">${item}</li>`;
      })
      .join("")}`;
  }

  static get observedAttributes() {
    return ["open", "reflow", "active-index"];
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
    if (
      !this.data ||
      this.data.length === 0 ||
      this.activeIndex === null ||
      this.activeIndex === "null"
    )
      return;

    // remove active class
    if (this._ul.querySelector(".active")) {
      this._ul.querySelector(".active").classList.remove("active");
    }

    // add active class to selected option
    let activeOption = this._ul.querySelector(
      "li:nth-child(" + (parseInt(this.activeIndex, 10) + 1) + ")"
    );

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
    return this.getAttribute("active-index");
  }

  set activeIndex(val) {
    this.setAttribute("active-index", val);
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
