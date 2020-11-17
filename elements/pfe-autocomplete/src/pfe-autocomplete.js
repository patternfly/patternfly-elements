import PFElement from "../../pfelement/dist/pfelement.js";
import "../../pfe-button/dist/pfe-button.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

// use this variable to debounce api call when user types very fast
let throttle = false;

class PfeAutocomplete extends PFElement {
  static get tag() {
    return "pfe-autocomplete";
  }

  get schemaUrl() {
    return "pfe-autocomplete.json";
  }

  get templateUrl() {
    return "pfe-autocomplete.html";
  }

  get styleUrl() {
    return "pfe-autocomplete.scss";
  }

  static get properties() {
    return {
      initValue: {
        title: "Initial Value",
        type: String,
        observer: "_initValueChanged"
      },
      loading: {
        title: "Loading",
        type: Boolean,
        default: false,
        observer: "_loadingChanged"
      },
      isDisabled: {
        title: "Is disabled",
        type: Boolean,
        default: false,
        observer: "_isDisabledChanged"
      },
      debounce: {
        title: "Debounce",
        type: Number,
        default: 300
      },
      selectedValue: {
        title: "Selected value",
        type: String
      },
      buttonText: {
        title: "Button text",
        type: String,
        observer: "_buttonTextChanged"
      }
    };
  }

  static get events() {
    return {
      search: `${this.tag}:search-event`,
      select: `${this.tag}:option-selected`,
      optionsShown: `${this.tag}:options-shown`,
      slotchange: `slotchange`
    };
  }

  constructor() {
    super(PfeAutocomplete);

    this._inputInit();

    this._slotchangeHandler = this._slotchangeHandler.bind(this);

    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener(PfeAutocomplete.events.slotchange, this._slotchangeHandler);

    // @TODO: Confirm this is translatable
    this._ariaAnnounceTemplate = "There are ${numOptions} suggestions. Use the up and down arrows to browse.";

    // clear button
    this._clearBtn = this.shadowRoot.querySelector(".clear-search");
    this._clearBtn.addEventListener("click", this._clear.bind(this));

    // search button
    this._searchBtn = this.shadowRoot.querySelector(".search-button");
    this._searchBtn.addEventListener("click", this._search.bind(this));

    // textual search button
    this._searchBtnTextual = this.shadowRoot.querySelector(".search-button--textual");
    this._searchBtnText = this.shadowRoot.querySelector(".search-button__text");
    this._searchBtnTextual.addEventListener("click", this._search.bind(this));

    this._dropdown = this.shadowRoot.querySelector("#dropdown");
    this._dropdown.data = [];

    this.activeIndex = null;

    this.addEventListener("keyup", this._inputKeyUp.bind(this));

    // these two events, fire search
    this.addEventListener(PfeAutocomplete.events.search, this._closeDroplist.bind(this));
    this.addEventListener(PfeAutocomplete.events.select, this._optionSelected.bind(this));
  }

  _inputInit() {
    // input box
    let slotNodes = this.shadowRoot.querySelector("slot").assignedNodes();
    let slotElems = slotNodes.filter(n => n.nodeType === Node.ELEMENT_NODE);
    if (slotElems.length === 0) {
      console.error(`${PfeAutocomplete.tag}: There must be a input tag in the light DOM`);
      return;
    }
    this._input = slotElems[0];

    if (this._input.tagName.toLowerCase() !== "input") {
      console.error(`${PfeAutocomplete.tag}: The only child in the light DOM must be an input tag`);

      return;
    }

    this._input.addEventListener("input", this._inputChanged.bind(this));
    this._input.addEventListener("blur", this._closeDroplist.bind(this));

    this._input.setAttribute("role", "combobox");

    if (!this._input.hasAttribute("aria-label")) {
      this._input.setAttribute("aria-label", "Search");
    }

    this._input.setAttribute("aria-autocomplete", "both");
    this._input.setAttribute("aria-haspopup", "true");
    this._input.setAttribute("type", "search");
    this._input.setAttribute("autocomplete", "off");
    this._input.setAttribute("autocorrect", "off");
    this._input.setAttribute("autocapitalize", "off");
    this._input.setAttribute("spellcheck", "false");
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keyup", this._inputKeyUp);

    this.removeEventListener(PfeAutocomplete.events.search, this._closeDroplist);
    this.removeEventListener(PfeAutocomplete.events.select, this._optionSelected);
    this._slot.removeEventListener(PfeAutocomplete.events.slotchange, this._slotchangeHandler);
    if (this._input) {
      this._input.removeEventListener("input", this._inputChanged);
      this._input.removeEventListener("blur", this._closeDroplist);
    }

    this._clearBtn.removeEventListener("click", this._clear);
    this._searchBtn.removeEventListener("click", this._search);
    this._searchBtnTextual.removeEventListener("click", this._search);
  }

  _initValueChanged(oldVal, newVal) {
    if (newVal) {
      // set inputbox and buttons in the inner component
      this._input.value = newVal;
      if (newVal !== "" && !this.isDisabled) {
        this._searchBtn.removeAttribute("disabled");
        this._searchBtnTextual.removeAttribute("disabled");
        this._clearBtn.removeAttribute("hidden");
      } else {
        this._searchBtn.setAttribute("disabled", "");
        this._searchBtnTextual.setAttribute("disabled", "");
        this._clearBtn.setAttribute("hidden", "");
      }
    }
  }

  _loadingChanged() {
    if (!this.loading || this._input.value === "") {
      this.shadowRoot.querySelector(".loading").setAttribute("hidden", "");
    } else {
      this.shadowRoot.querySelector(".loading").removeAttribute("hidden");
    }
  }

  _isDisabledChanged() {
    if (this.isDisabled) {
      this._clearBtn.setAttribute("disabled", "");
      this._searchBtn.setAttribute("disabled", "");
      this._searchBtnTextual.setAttribute("disabled", "");
      this._input.setAttribute("disabled", "");
    } else {
      this._clearBtn.removeAttribute("disabled");
      this._searchBtn.removeAttribute("disabled");
      this._searchBtnTextual.removeAttribute("disabled");
      this._input.removeAttribute("disabled");
    }
  }

  _buttonTextChanged(oldVal, newVal) {
    if (oldVal === null) {
      this._searchBtn.setAttribute("hidden", "");
      this._searchBtnText.innerHTML = newVal || "Search";
      this._searchBtnTextual.removeAttribute("hidden");
    } else if (newVal === null || newVal === "") {
      this._searchBtnTextual.setAttribute("hidden", "");
      this._searchBtn.removeAttribute("hidden");
    } else {
      this._searchBtnText.innerHTML = newVal || "Search";
    }
  }

  _slotchangeHandler() {
    this._inputInit();
    this._dropdown._ariaAnnounceTemplate = this.getAttribute("aria-announce-template") || this._ariaAnnounceTemplate;
  }

  _inputChanged() {
    if (this._input.value === "") {
      this._searchBtn.setAttribute("disabled", "");
      this._searchBtnTextual.setAttribute("disabled", "");
      this._clearBtn.setAttribute("hidden", "");

      this._reset();
      return;
    } else {
      if (!this._input.hasAttribute("disabled")) {
        this._searchBtn.removeAttribute("disabled");
        this._searchBtnTextual.removeAttribute("disabled");
      }
      this._clearBtn.removeAttribute("hidden");
    }

    if (throttle === false) {
      throttle = true;

      window.setTimeout(() => {
        this._sendAutocompleteRequest(this._input.value);
        throttle = false;
      }, this.debounce);
    }
  }

  _clear() {
    this._input.value = "";
    this._clearBtn.setAttribute("hidden", "");
    this._searchBtn.setAttribute("disabled", "");
    this._searchBtnTextual.setAttribute("disabled", "");
    this._input.focus();
  }

  _search() {
    this._doSearch(this._input.value);
  }

  _closeDroplist() {
    this._dropdown.open = null;
    this._dropdown.removeAttribute("active-index");
  }

  _openDroplist() {
    this.activeIndex = null;
    this._dropdown.open = true;
    this._dropdown.setAttribute("active-index", null);
    this.emitEvent(PfeAutocomplete.events.optionsShown, {
      composed: true
    });
  }

  _optionSelected(e) {
    let selectedValue = e.detail.optionValue;

    // update input box with selected value from options list
    this._input.value = selectedValue;

    // send search request
    this._doSearch(selectedValue);
  }

  _doSearch(searchQuery) {
    this.emitEvent(PfeAutocomplete.events.search, {
      detail: { searchValue: searchQuery },
      composed: true
    });
    this._reset();
    this.selectedValue = searchQuery;
  }

  _sendAutocompleteRequest(input) {
    if (!this.autocompleteRequest) return;

    this.autocompleteRequest({ query: input }, this._autocompleteCallback.bind(this));
  }

  _autocompleteCallback(response) {
    this._dropdown.data = response;
    this._dropdown.reflow = true;
    response.length !== 0 ? this._openDroplist() : this._closeDroplist();
  }

  _reset() {
    this._dropdown.activeIndex = null;
    this._input.setAttribute("aria-activedescendant", "");
    this._dropdown.data = [];
    this._closeDroplist();
  }

  _activeOption(activeIndex) {
    if (activeIndex === null || activeIndex === "null") return;
    return this._dropdown.shadowRoot.querySelector("li:nth-child(" + (parseInt(activeIndex, 10) + 1) + ")").innerHTML;
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
      if (!this._dropdown.open) {
        return;
      }

      activeIndex = activeIndex === null || activeIndex === "null" ? optionsLength : parseInt(activeIndex, 10);

      activeIndex -= 1;

      if (activeIndex < 0) {
        activeIndex = optionsLength - 1;
      }

      this._input.value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.DOWN) {
      if (!this._dropdown.open) {
        return;
      }

      activeIndex = activeIndex === null || activeIndex === "null" ? -1 : parseInt(activeIndex, 10);
      activeIndex += 1;

      if (activeIndex > optionsLength - 1) {
        activeIndex = 0;
      }

      this._input.value = this._activeOption(activeIndex);
    } else if (key === KEYCODE.ENTER) {
      if (this._activeOption(activeIndex)) {
        this.emitEvent(PfeAutocomplete.events.select, {
          detail: { optionValue: this._activeOption(activeIndex) },
          composed: true
        });

        return;
      }

      let selectedValue = this._input.value;
      this._doSearch(selectedValue);
      return;
    }

    if (activeIndex !== null && activeIndex !== "null") {
      this._input.setAttribute("aria-activedescendant", "option-" + activeIndex);
    } else {
      this._input.setAttribute("aria-activedescendant", "");
    }

    this.activeIndex = activeIndex;
    this._dropdown.activeIndex = activeIndex;
  }
}

/*
* - Attributes ------------------------------------
* open               | Set when the combo box dropdown is open
* active-index       | Set selected option
* reflow             | Re-renders the dropdown

* - Events ----------------------------------------
* pfe-autocomplete:option-selected | Fires when an option is selected.
  event.details.optionValue contains the selected value.
*/
class PfeSearchDroplist extends PFElement {
  static get tag() {
    return "pfe-search-droplist";
  }

  get templateUrl() {
    return "pfe-search-droplist.html";
  }

  get styleUrl() {
    return "pfe-search-droplist.scss";
  }

  static get properties() {
    return {
      open: {
        title: "Open",
        type: Boolean
      },
      reflow: {
        title: "Reflow",
        type: Boolean,
        observer: "_renderOptions"
      },
      activeIndex: {
        title: "Active index",
        type: Number,
        observer: "_activeIndexChanged"
      }
    };
  }

  constructor() {
    super(PfeSearchDroplist);
  }

  connectedCallback() {
    super.connectedCallback();

    this._ariaAnnounce = this.shadowRoot.querySelector(".suggestions-aria-help");

    this.activeIndex = null;
    this._ul = this.shadowRoot.querySelector("ul");
    this._ul.addEventListener("mousedown", this._optionSelected.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ul.removeEventListener("mousedown", this._optionSelected);
  }

  _optionSelected(e) {
    if (e.target.tagName === "LI") {
      this.emitEvent(PfeAutocomplete.events.select, {
        detail: { optionValue: e.target.innerText },
        composed: true
      });
    }
  }

  _renderOptions() {
    let options = this.data;
    let ariaAnnounceText = "";

    if (this._ariaAnnounceTemplate) {
      ariaAnnounceText = this._ariaAnnounceTemplate.replace("${numOptions}", options.length);
    }

    this._ariaAnnounce.textContent = ariaAnnounceText;
    this._ariaAnnounce.setAttribute("aria-live", "polite");

    this._ul.innerHTML = `${options
      .map((item, index) => {
        return `<li id="option-${index}" role="option" tabindex="-1" value="${item}">${item}</li>`;
      })
      .join("")}`;
  }

  _activeIndexChanged() {
    if (!this.data || this.data.length === 0 || this.activeIndex === null || this.activeIndex === "null") return;

    // remove active class
    if (this._ul.querySelector(".active")) {
      this._ul.querySelector(".active").classList.remove("active");
    }

    // add active class to selected option
    let activeOption = this._ul.querySelector("li:nth-child(" + (parseInt(this.activeIndex, 10) + 1) + ")");

    activeOption.classList.add("active");

    // scroll to selected element when selected item with keyboard is out of view
    let ulWrapper = this.shadowRoot.querySelector(".droplist");
    let activeOptionHeight = activeOption.offsetHeight;
    activeOptionHeight += parseInt(window.getComputedStyle(activeOption).getPropertyValue("margin-bottom"), 10);
    ulWrapper.scrollTop = activeOption.offsetTop - ulWrapper.offsetHeight + activeOptionHeight;
  }
}

PFElement.create(PfeSearchDroplist);
PFElement.create(PfeAutocomplete);

export default PfeAutocomplete;
