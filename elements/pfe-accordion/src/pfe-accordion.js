import PFElement from "../pfelement/pfelement.js";
import {
  PfeCollapsible,
  PfeCollapsibleToggle,
  PfeCollapsiblePanel
} from "../pfe-collapsible/pfe-collapsible.js";

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeAccordion extends PfeCollapsible {
  static get tag() {
    return "pfe-accordion";
  }

  get styleUrl() {
    return "pfe-accordion.scss";
  }

  get templateUrl() {
    return "pfe-accordion.html";
  }

  constructor() {
    super(PfeAccordion);

    this._linkControls = this._linkControls.bind(this);
    this._observer = new MutationObserver(this._linkControls);
    this.addEventListener(`${PfeCollapsible.tag}:change`, this._changeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "presentation");
    this.setAttribute("defined", "");

    this.addEventListener("keydown", this._keydownHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();
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

  expand(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

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

  _changeHandler(event) {
    super._changeHandler(event);

    this.dispatchEvent(
      new CustomEvent(`${PfeAccordion.tag}:change`, {
        detail: event.detail,
        bubbles: true
      })
    );
  }

  _linkControls() {
    const headers = this._allHeaders();
    headers.forEach(header => {
      const panel = this._panelForHeader(header);

      if (!panel) {
        return;
      }

      header.setAttribute("aria-controls", panel.pfeId);
      panel.setAttribute("aria-labelledby", header.pfeId);
    });
  }

  _expandHeader(header) {
    header.expanded = true;
  }

  _expandPanel(panel) {
    if (!panel) {
      console.error(
        `${PfeAccordion.tag}: Trying to expand a panel that doesn't exist`
      );
      return;
    }

    if (panel.expanded) {
      return;
    }

    panel.expanded = true;
  }

  _collapseHeader(header) {
    header.expanded = false;
  }

  _collapsePanel(panel) {
    if (!panel) {
      console.error(
        `${PfeAccordion.tag}: Trying to collapse a panel that doesn't exist`
      );
      return;
    }

    if (!panel.expanded) {
      return;
    }

    panel.expanded = false;
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
      console.error(
        `${PfeAccordion.tag}: Sibling element to a header needs to be a panel`
      );
      return;
    }

    return next;
  }

  _previousHeader() {
    const headers = this._allHeaders();
    let newIndex =
      headers.findIndex(header => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex =
      headers.findIndex(header => header === document.activeElement) + 1;
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

  _keydownHandler(event) {
    const currentHeader = event.target;

    if (!this._isHeader(currentHeader)) {
      return;
    }

    let newHeader;

    switch (event.key) {
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
  }
}

class PfeAccordionHeader extends PfeCollapsibleToggle {
  static get tag() {
    return "pfe-accordion-header";
  }

  get styleUrl() {
    return "pfe-accordion-header.scss";
  }

  get templateUrl() {
    return "pfe-accordion-header.html";
  }

  get expanded() {
    return super.expanded;
  }

  set expanded(val) {
    super.expanded = val;

    const value = Boolean(val);

    if (!this.button) {
      return;
    }

    this.button.setAttribute("aria-expanded", value);
  }

  constructor() {
    super(PfeAccordionHeader, { setTabIndex: false, addKeydownHandler: false });

    this.button = this.shadowRoot.querySelector("button");

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length || this.textContent.trim().length) {
      this._init();
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    // console.log(newVal);
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    this.setAttribute("role", "header");

    const child = this.children[0];
    let isHeaderTag = false;

    if (child) {
      switch (child.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          isHeaderTag = true;
          break;
      }

      const wrapperTag = document.createElement(child.tagName);
      this.button.innerText = child.innerText;

      wrapperTag.appendChild(this.button);
      this.shadowRoot.appendChild(wrapperTag);
    } else {
      this.button.innerText = this.textContent.trim();
    }

    if (!isHeaderTag) {
      console.warn(
        `${this.tag}: The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)`
      );
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }
}

class PfeAccordionPanel extends PfeCollapsiblePanel {
  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get templateUrl() {
    return "pfe-accordion-panel.html";
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "region");
  }
}

PFElement.create(PfeAccordion);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordionHeader);

export { PfeAccordion as default };
