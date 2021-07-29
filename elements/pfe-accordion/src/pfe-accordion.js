// Import polyfills: Object.assign()
import "./polyfills--pfe-accordion.js";

import { PfeCollapse } from "../../pfe-collapse/dist/pfe-collapse.js";
import PfeAccordionHeader from "./pfe-accordion-header.js";
import PfeAccordionPanel from "./pfe-accordion-panel.js";

class PfeAccordion extends PfeCollapse {
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

  get html() {
    return `<slot></slot>`;
  }

  /**
   * Properties specific to the accordion
   * Merge the new properties with the properties in PfeCollapse
   */
  static get properties() {
    return Object.assign(PfeCollapse.properties, {
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
    });
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
    super(PfeAccordion, {
      toggleClass: PfeAccordionHeader,
      panelClass: PfeAccordionPanel,
    });

    this._manualDisclosure = null;
    this._updateHistory = true;
    this.expandedSets = [];

    this.init = this.init.bind(this);

    this._updateStateFromURL = this._updateStateFromURL.bind(this);
    this._getIndexesFromURL = this._getIndexesFromURL.bind(this);
    this._updateURLHistory = this._updateURLHistory.bind(this);
  }

  connectedCallback() {
    // Note: This needs to be captured before the component upgrades
    this._manualDisclosure = this.getAttribute("disclosure");

    super.connectedCallback();
    this.init();

    // Ensure the URL update occurs when a change happens
    this.addEventListener(PfeAccordionHeader.events.change, this._updateURLHistory);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("popstate", this._updateStateFromURL);
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  init() {
    const toggles = this._allToggles();
    // If disclosure was not set by the author, set up the defaults
    if (!this._manualDisclosure) {
      if (toggles.length === 1) this.disclosure = "true";
      else this.disclosure = "false";
    }

    // Update state if params exist in the URL
    if (!this.isIE11) this._updateStateFromURL();
  }

  _historyHandler() {
    if (!this.history) window.removeEventListener("popstate", this._updateStateFromURL);
    else window.addEventListener("popstate", this._updateStateFromURL);
  }

  _expandHeader(header) {
    const index = this._getIndex(header);

    // If this index is not already listed in the expandedSets array, add it
    if (this.expandedSets.indexOf(index) < 0 && index > -1) this.expandedSets.push(index);

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
    let idx = this.expandedSets.indexOf(index);
    if (idx >= 0) this.expandedSets.splice(idx, 1);

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
        newHeader = this._nextHeader();
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        newHeader = this._previousHeader();
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
      this.error(`Sibling element to a header needs to be a panel`);
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
    indexes.reverse().forEach((index) => this.expand(index));
  }

    setTimeout(() => {
      Promise.all([
        customElements.whenDefined(PfeAccordionHeader.tag),
        customElements.whenDefined(PfeAccordionPanel.tag),
      ]).then(() => {
        const toggles = this._allToggles();
        const indexes = newVal.split(",").map((idx) => Number.parseInt(idx, 10) - 1);
        indexes.reverse().map((index) => toggles[index].expand());
      });
    }, 200);
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
   * @requires this.expandedSets {Array}
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
    const openIndexes = this.expandedSets
      .map((item) => item + 1)
      .sort((a, b) => a - b)
      .join("-");

    // If values exist in the array, add them to the parameter string
    if (this.expandedSets.length > 0) urlParams.set(this.id, openIndexes);
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
    const toggles = this._allToggles();
    const indexesFromURL = this._getIndexesFromURL() || [];

    this._updateHistory = false;

    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag),
    ]).then(() => {
      indexesFromURL.forEach((idx) => toggles[idx].expand());
      this._updateHistory = true;
    });
  }
}

PfeCollapse.create(PfeAccordionHeader);
PfeCollapse.create(PfeAccordionPanel);
PfeCollapse.create(PfeAccordion);

export { PfeAccordion as default };
