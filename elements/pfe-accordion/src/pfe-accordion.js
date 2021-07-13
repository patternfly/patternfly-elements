// Import polyfills: findIndex
import "./polyfills--pfe-accordion.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAccordionHeader from "./pfe-accordion-header.js";
import PfeAccordionPanel from "./pfe-accordion-panel.js";

class PfeAccordion extends PFElement {
  static get tag() {
    return "pfe-accordion";
  }

  static get meta() {
    return {
      title: "Accordion",
      description: "This element renders content sets in an expandable format.",
    };
  }

  get styleUrl() {
    return "pfe-accordion.scss";
  }

  get templateUrl() {
    return "pfe-accordion.html";
  }

  static get properties() {
    return {
      disclosure: {
        // Leaving this as a string since it's an opt out
        title: "Disclosure",
        type: String,
        values: ["true", "false"],
        cascade: ["pfe-accordion-header", "pfe-accordion-panel"],
      },
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure",
      },
      // Do not set a default of 0, it causes a the URL history to
      // be updated on load for every tab; infinite looping goodness
      // Seriously, don't set a default here unless you do a rewrite
      expandedIndex: {
        title: "Expanded index(es)",
        type: String,
        observer: "_expandedIndexHandler",
      },
      history: {
        title: "History",
        type: Boolean,
        default: false,
        observer: "_historyHandler",
      },
    };
  }

  static get slots() {
    return {
      default: {
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "pfe-accordion-header",
            },
            {
              $ref: "pfe-accordion-panel",
            },
          ],
        },
      },
    };
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      expand: `${this.tag}:expand`,
      collapse: `${this.tag}:collapse`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  get isNavigation() {
    return this.hasAttribute("is-navigation");
  }

  // Each set contains a header and a panel
  static get contentTemplate() {
    return `
    <pfe-accordion-header content-type="header"></pfe-accordion-header>
    <pfe-accordion-panel content-type="panel"></pfe-accordion-panel>
    `;
  }

  constructor() {
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._manualDisclosure = null;
    this._updateHistory = true;
    this.expanded = [];

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);

    this._updateStateFromURL = this._updateStateFromURL.bind(this);
    this._getIndexesFromURL = this._getIndexesFromURL.bind(this);
    this._updateURLHistory = this._updateURLHistory.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) {
      this._manualDisclosure = this.getAttribute("disclosure") || this.getAttribute("pfe-disclosure");

      Promise.all([
        customElements.whenDefined(PfeAccordionHeader.tag),
        customElements.whenDefined(PfeAccordionPanel.tag),
      ]).then(this._init);
    }

    this.addEventListener(PfeAccordion.events.change, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    // Set up the observer on the child tree
    this._observer.observe(this, {
      childList: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();

    window.removeEventListener("popstate", this._updateStateFromURL);
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
   * @param {Number} index
   */
  toggle(index) {
    const headers = this._allHeaders();
    const header = headers[index];

    if (!header.expanded) this.expand(index);
    else this.collapse(index);
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand.
   * @param {Number} index
   */
  expand(_index) {
    if (_index === undefined || _index === null) return;

    // Ensure the input is a number
    const index = parseInt(_index, 10);

    // Get all the headers and capture the item by index value
    const headers = this._allHeaders();
    const header = headers[index];
    if (!header) return;

    const panel = this._panelForHeader(header);
    if (!header || !panel) return;

    // If the header and panel exist, open both
    this._expandHeader(header);
    this._expandPanel(panel);

    header.focus();

    this.emitEvent(PfeAccordion.events.expand);
  }

  /**
   * Expands all accordion items.
   */
  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach((header) => this._expandHeader(header));
    panels.forEach((panel) => this._expandPanel(panel));
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   * @param {Number} index
   */
  collapse(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) return;

    this._collapseHeader(header);
    this._collapsePanel(panel);

    this.emitEvent(PfeAccordion.events.collapse);
  }

  /**
   * Collapses all accordion items.
   */
  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach((header) => this._collapseHeader(header));
    panels.forEach((panel) => this._collapsePanel(panel));
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  _init() {
    const headers = this._allHeaders();
    // For each header in the accordion, attach the aria connections
    headers.forEach((header) => {
      const panel = this._panelForHeader(header);
      // Escape if no matching panel can be found
      if (!panel) return;

      header.ariaControls = panel._id;
      panel.ariaLabelledby = header._id;
    });

    // If disclosure was not set by the author, set up the defaults
    if (!this._manualDisclosure) {
      if (headers.length === 1) {
        this.disclosure = "true";
      } else if (headers.length > 1) {
        this.disclosure = "false";
      }
    }

    // Update state if params exist in the URL
    if (!this.isIE11) this._updateStateFromURL();
  }

  _changeHandler(evt) {
    if (this.classList.contains("animating")) return;

    const index = this._getIndex(evt.target);

    if (evt.detail.expanded) this.expand(index);
    else this.collapse(index);

    this._updateURLHistory();
  }

  _historyHandler() {
    if (!this.history) window.removeEventListener("popstate", this._updateStateFromURL);
    else window.addEventListener("popstate", this._updateStateFromURL);
  }

  _expandHeader(header) {
    const index = this._getIndex(header);

    // If this index is not already listed in the expanded array, add it
    if (this.expanded.indexOf(index) < 0 && index > -1) this.expanded.push(index);

    header.expanded = true;
  }

  _expandPanel(panel) {
    if (!panel) {
      this.error(`Trying to expand a panel that doesn't exist.`);
      return;
    }

    if (panel.expanded) return;

    panel.expanded = true;

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, height);
  }

  _collapseHeader(header) {
    const index = this._getIndex(header);

    // If this index is exists in the expanded array, remove it
    let idx = this.expanded.indexOf(index);
    if (idx >= 0) this.expanded.splice(idx, 1);

    header.expanded = false;
  }

  _collapsePanel(panel) {
    if (!panel) {
      this.error(`Trying to collapse a panel that doesn't exist`);
      return;
    }

    if (!panel.expanded) return;

    const height = panel.getBoundingClientRect().height;
    panel.expanded = false;

    this._animate(panel, height, 0);
  }

  _animate(panel, start, end) {
    if (panel) {
      const header = panel.previousElementSibling;
      if (header) {
        header.classList.add("animating");
      }
      panel.classList.add("animating");
      panel.style.height = `${start}px`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.height = `${end}px`;
          panel.addEventListener("transitionend", this._transitionEndHandler);
        });
      });
    }
  }

  _keydownHandler(evt) {
    const currentHeader = evt.target;

    if (!this._isHeader(currentHeader)) {
      return;
    }

    let newHeader;

    switch (evt.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        if (!this.isNavigation) newHeader = this._nextHeader();
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        if (!this.isNavigation) newHeader = this._previousHeader();
        break;
      case "Home":
        newHeader = this._firstHeader();
        break;
      case "End":
        newHeader = this._lastHeader();
        break;
      default:
        return;
    }

    if (newHeader) {
      newHeader.shadowRoot.querySelector("button").focus();

      const index = this._getIndex(newHeader);
      this.expand(index);
      this._setFocus = true;
    }
  }

  _transitionEndHandler(evt) {
    const header = evt.target.previousElementSibling;
    if (header) header.classList.remove("animating");

    evt.target.style.height = "";
    evt.target.classList.remove("animating");
    evt.target.removeEventListener("transitionend", this._transitionEndHandler);
  }

  _allHeaders() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > pfe-accordion-header`)];
    else return this.children.filter((el) => el.tagName.toLowerCase() === "pfe-accordion-header");
  }

  _allPanels() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > pfe-accordion-panel`)];
    else return this.children.filter((el) => el.tagName.toLowerCase() === "pfe-accordion-panel");
  }

  _panelForHeader(header) {
    const next = header.nextElementSibling;

    if (!next) return;

    if (next.tagName.toLowerCase() !== PfeAccordionPanel.tag) {
      this.error(`Sibling element to a header needs to be a panel; was: ${next.tagName.toLowerCase()}.`);
      return;
    }

    return next;
  }

  _previousHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex((header) => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex((header) => header === document.activeElement) + 1;
    return headers[newIndex % headers.length];
  }

  _firstHeader() {
    const headers = this._allHeaders();
    return headers[0];
  }

  _lastHeader() {
    const headers = this._allHeaders();
    return headers[headers.length - 1];
  }

  _isHeader(element) {
    return element.tagName.toLowerCase() === PfeAccordionHeader.tag;
  }

  _isPanel(element) {
    return element.tagName.toLowerCase() === PfeAccordionPanel.tag;
  }

  _expandedIndexHandler(oldVal, newVal) {
    if (oldVal === newVal) return;
    const indexes = newVal.split(",").map((idx) => parseInt(idx, 10) - 1);
    indexes.reverse().map((index) => this.expand(index));
  }

  _getIndex(_el) {
    if (this._isHeader(_el)) {
      const headers = this._allHeaders();
      return headers.findIndex((header) => header.id === _el.id);
    }

    if (this._isPanel(_el)) {
      const panels = this._allPanels();
      return panels.findIndex((panel) => panel.id === _el.id);
    }

    this.warn(`The _getIndex method expects to receive a header or panel element.`);
    return -1;
  }

  _getIndexesFromURL() {
    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (!window.URLSearchParams) return [];

    // Capture the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // If parameters exist and they contain the ID for this accordion
    if (urlParams && urlParams.has(this.id)) {
      const params = urlParams.get(this.id);
      // Split the parameters by underscore to see if more than 1 item is expanded
      const indexes = params.split("-");
      if (indexes.length < 0) return [];

      // Clean up the results by converting to array count
      return indexes.map((item) => parseInt(item.trim(), 10) - 1);
    }
  }

  /**
   * This handles updating the URL parameters based on the current state
   * of the global this.expanded array
   * @requires this.expanded {Array}
   */
  _updateURLHistory() {
    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (!this.history || !this._updateHistory || !window.URLSearchParams) return;

    if (!this.id) {
      this.error(`The history feature cannot update the URL without an ID added to the pfe-accordion tag.`);
      return;
    }

    // Capture the URL and rebuild it using the new state
    const urlParams = new URLSearchParams(window.location.search);
    // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
    // sort values numerically and connect them using a dash
    const openIndexes = this.expanded
      .map((item) => item + 1)
      .sort((a, b) => a - b)
      .join("-");

    // If values exist in the array, add them to the parameter string
    if (this.expanded.length > 0) urlParams.set(this.id, openIndexes);
    // Otherwise delete the set entirely
    else urlParams.delete(this.id);

    // Note: Using replace state protects the user's back navigation
    history.replaceState(
      {},
      "",
      `${window.location.pathname}${urlParams ? `?${urlParams.toString()}` : ""}${window.location.hash}`
    );
  }

  /**
   * This captures the URL parameters and expands each item in the array
   * @requires this._getIndexesFromURL {Method}
   */
  _updateStateFromURL() {
    const indexesFromURL = this._getIndexesFromURL() || [];

    this._updateHistory = false;
    indexesFromURL.forEach((idx) => this.expand(idx));
    this._updateHistory = true;
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export { PfeAccordion as default };
