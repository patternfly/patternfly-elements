// Import polyfills: Object.assign()
import "./polyfills--pfe-accordion.js";

import { PfeCollapse, PfeCollapseToggle } from "../../pfe-collapse/dist/pfe-collapse.js";
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

  get templateUrl() {
    return "pfe-accordion.html";
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

    this.init = this.init.bind(this);

    this._updateStateFromURL = this._updateStateFromURL.bind(this);
    this._getIndexesFromURL = this._getIndexesFromURL.bind(this);
    this._updateURLHistory = this._updateURLHistory.bind(this);
  }

  connectedCallback() {
    if (this.isIE11) return;
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

  _expandedIndexHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

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
    const headers = this._allToggles();
    if (headers.length > 0) {
      const expanded = headers.filter((h) => h.expanded);
      const openIndexes = expanded
        .map((item) => headers.indexOf(item))
        .map((item) => item + 1)
        .sort((a, b) => a - b)
        .join("-");

      // If values exist in the array, add them to the parameter string
      if (expanded.length > 0) urlParams.set(this.id, openIndexes);
      // Otherwise delete the set entirely
      else urlParams.delete(this.id);
    }

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
