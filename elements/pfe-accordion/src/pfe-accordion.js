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
      description: "This element renders content sets in an expandable format."
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
        observer: "_disclosureChanged",
        cascade: ["pfe-accordion-header", "pfe-accordion-panel"]
      },
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure"
      },
      // Do not set a default of 0, it causes a the URL history to
      // be updated on load for every tab; infinite looping goodness
      // Seriously, don't set a default here unless you do a rewrite
      expandedIndex: {
        title: "Expanded index(es)",
        type: String,
        observer: "_expandedIndexHandler"
      },
      history: {
        title: "History",
        type: Boolean,
        default: false,
        observer: "_historyHandler"
      }
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
              $ref: "pfe-accordion-header"
            },
            {
              $ref: "pfe-accordion-panel"
            }
          ]
        }
      }
    };
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      updateHistory: `${this.tag}:updateHistory`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  // Each set contains a header and a panel
  static get contentTemplate() {
    return `
    <pfe-accordion-header content-type="header"></pfe-accordion-header>
    <pfe-accordion-panel content-type="panel"></pfe-accordion-panel>
    `;
  }

  constructor() {
    PFElement._debugLog = true;
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._linkPanels = this._linkPanels.bind(this);
    this._observer = new MutationObserver(this._linkPanels);
    this._popstateEventHandler = this._popstateEventHandler.bind(this);
    this._updateHistory = true;
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag)
    ]).then(() => {
      if (this.hasLightDOM()) {
        this._linkPanels();
        const indexesFromURL = this._getIndexesFromURL();
        if (indexesFromURL.length > 0) {
          this._setFocus = true;
          this.expanded.push(indexesFromURL);
        }
      }

      this.addEventListener(PfeAccordion.events.change, this._changeHandler);
      this.addEventListener("keydown", this._keydownHandler);

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();

    if (this.history) window.removeEventListener("popstate", this._popstateEventHandler);
  }

  toggle(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

    if (!header.expanded) {
      this._expandHeader(header);
      this._expandPanel(panel);
    } else {
      this._collapseHeader(header);
      this._collapsePanel(panel);
    }
  }

  expand(_index) {
    if (_index === undefined || _index === null) return;

    const index = parseInt(_index, 10);
    const headers = this._allHeaders();
    const header = headers[index];
    const panel = this._panelForHeader(header);

    if (!header || !panel) return;

    this._updateURLHistory(index);
    this._expandHeader(header);
    this._expandPanel(panel);
  }

  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._expandHeader(header));
    panels.forEach(panel => this._expandPanel(panel));
  }

  collapse(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

    this._collapseHeader(header);
    this._collapsePanel(panel);
  }

  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._collapseHeader(header));
    panels.forEach(panel => this._collapsePanel(panel));
  }

  _disclosureChanged(oldVal, newVal) {
    if (newVal === "true") {
      this._allHeaders().forEach(header => header.setAttribute("pfe-disclosure", "true"));
      this._allPanels().forEach(panel => panel.setAttribute("pfe-disclosure", "true"));

      // @TODO Deprecated in 1.0
      this.oldDisclosure = "true";
    } else {
      this._allHeaders().forEach(header => header.setAttribute("pfe-disclosure", "false"));
      this._allPanels().forEach(panel => panel.setAttribute("pfe-disclosure", "false"));

      // @TODO Deprecated in 1.0
      this.oldDisclosure = "false";
    }
  }

  _linkPanels() {
    const headers = this._allHeaders();
    headers.forEach(header => {
      const panel = this._panelForHeader(header);

      if (!panel) {
        return;
      }

      header.ariaControls = panel._id;
      panel.ariaLabelledby = header._id;
    });

    if (headers.length === 1) {
      if (this.disclosure === "false") {
        return;
      }

      this.disclosure = "true";
    }

    if (headers.length > 1) {
      if (this.disclosure) {
        this.disclosure = "false";
      }
    }
  }

  _changeHandler(evt) {
    if (this.classList.contains("animating")) {
      return;
    }

    const header = evt.target;
    const panel = evt.target.nextElementSibling;

    if (evt.detail.expanded) {
      this._expandHeader(header);
      this._expandPanel(panel);
    } else {
      this._collapseHeader(header);
      this._collapsePanel(panel);
    }
  }

  _historyHandler() {
    if (!this.history) window.removeEventListener("popstate", this._popstateEventHandler);
    else window.addEventListener("popstate", this._popstateEventHandler);
  }

  _expandHeader(header) {
    this.expanded.push(this._getIndex(header));
    header.expanded = true;
  }

  _expandPanel(panel) {
    if (!panel) {
      console.error(`${PfeAccordion.tag}: Trying to expand a panel that doesn't exist`);
      return;
    }

    if (panel.expanded) return;

    panel.expanded = true;

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, height);
  }

  _collapseHeader(header) {
    header.expanded = false;
  }

  _collapsePanel(panel) {
    if (!panel) {
      console.error(`${PfeAccordion.tag}: Trying to collapse a panel that doesn't exist`);
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

    newHeader.shadowRoot.querySelector("button").focus();

    if (newHeader) {
      this.expanded.push(this._getIndex(newHeader));
      this._setFocus = true;
    } else this.warn(`No header of index ${this._getIndex(newHeader)} could be found.`);
  }

  _transitionEndHandler(evt) {
    const header = evt.target.previousElementSibling;
    if (header) {
      header.classList.remove("animating");
    }
    evt.target.style.height = "";
    evt.target.classList.remove("animating");
    evt.target.removeEventListener("transitionend", this._transitionEndHandler);
  }

  _allHeaders() {
    return [...this.querySelectorAll(PfeAccordionHeader.tag)];
  }

  _allPanels() {
    return [...this.querySelectorAll(PfeAccordionPanel.tag)];
  }

  _panelForHeader(header) {
    const next = header.nextElementSibling;

    if (!next) {
      return;
    }

    if (next.tagName.toLowerCase() !== PfeAccordionPanel.tag) {
      console.error(`${PfeAccordion.tag}: Sibling element to a header needs to be a panel`);
      return;
    }

    return next;
  }

  _previousHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex(header => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex(header => header === document.activeElement) + 1;
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

  _expandedIndexHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    // Wait until the tab and panels are loaded
    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag)
    ]).then(() => {
      this._linkPanels();
      this.expand(newVal);
      this._updateHistory = true;
    });
  }

  _getIndex(_header) {
    if (_header) {
      const headers = this._allHeaders();
      return headers.findIndex(header => header.id === _header.id);
    } else {
      this.warn(`No header was provided to _getIndex; required to return the index value.`);
      return 0;
    }
  }

  _getIndexesFromURL() {
    let urlParams;

    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (window.URLSearchParams) {
      urlParams = new URLSearchParams(window.location.search);

      const accordionInUrl = urlParams.has(this.id);

      if (urlParams && accordionInUrl) {
        const indexes = urlParams.get(this.id);
        if (!indexes) return [];

        const items = indexes.split(",").map(item => item.trim());

        items.forEach(idx => {
          this.log(`Find header with index ${idx}`, this._allHeaders()[idx]);
          this.expand(idx);
        });

        return items;
      }
    }

    return -1;
  }

  _updateURLHistory(index) {
    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (!this.history || !this._updateHistory || !window.URLSearchParams) return;
    console.log({history: this.history, update: this._updateHistory, supported: window.URLSearchParams});

    // Rebuild the url
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const currentParams = urlParams.get(this.id);

    if (index) this.expanded.push(index);

    if (currentParams) {
      let params = currentParams.split(",");
      if (params.length > 0) this.expanded = params
        .map(item => parseInt(item, 10))
        .filter(item => this.expanded.index(item) >= 0);
    }

    // urlParams.set(this.id, this.expanded.join(","));
    // history.pushState({}, "", `${pathname}?${urlParams.toString()}${hash}`);

    this.emitEvent(PfeAccordion.events.updateHistory, {
      detail: {
        expanded: this.expanded
      }
    });
  }

  _popstateEventHandler() {
    const indexesFromURL = this._getIndexesFromURL();

    this._updateHistory = false;
    if (indexesFromURL.length >= 0) {
      console.log({ expanded: this.expanded, indexesFromURL});
      this.expanded.push(indexesFromURL);
    }
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export { PfeAccordion as default };
