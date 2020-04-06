// Import polyfills: findIndex
import "./polyfills--pfe-accordion.js";

import PFElement from "../../pfelement/dist/pfelement.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeAccordion extends PFElement {
  static get tag() {
    return "pfe-accordion";
  }

  get styleUrl() {
    return "pfe-accordion.scss";
  }

  get templateUrl() {
    return "pfe-accordion.html";
  }

  get schemaUrl() {
    return "pfe-accordion.json";
  }

  static get cascadingAttributes() {
    return {
      on: "pfe-accordion-header, pfe-accordion-panel"
    };
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["pfe-disclosure"];
  }

  constructor() {
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._linkPanels = this._linkPanels.bind(this);
    this._observer = new MutationObserver(this._linkPanels);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tablist");
    this.setAttribute("defined", "");

    this.addEventListener(PfeAccordion.events.change, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag)
    ]).then(() => {
      if (this.children.length) {
        this._linkPanels();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (attr === "pfe-disclosure") {
      if (newVal === "true") {
        this._allHeaders().forEach(header =>
          header.setAttribute("pfe-disclosure", "true")
        );
        this._allPanels().forEach(panel =>
          panel.setAttribute("pfe-disclosure", "true")
        );
      } else {
        this._allHeaders().forEach(header =>
          header.setAttribute("pfe-disclosure", "false")
        );
        this._allPanels().forEach(panel =>
          panel.setAttribute("pfe-disclosure", "false")
        );
      }
    }
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

  _linkPanels() {
    const headers = this._allHeaders();
    headers.forEach(header => {
      const panel = this._panelForHeader(header);

      if (!panel) {
        return;
      }

      header.setAttribute("aria-controls", panel.pfeId);
      panel.setAttribute("aria-labelledby", header.pfeId);
    });

    if (headers.length === 1) {
      if (
        this.hasAttribute("pfe-disclosure") &&
        this.getAttribute("pfe-disclosure") === "false"
      ) {
        return;
      }

      this.setAttribute("pfe-disclosure", "true");
    }

    if (headers.length > 1) {
      if (this.hasAttribute("pfe-disclosure")) {
        this.removeAttribute("pfe-disclosure");
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

  _toggle(header, panel) {}

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

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, height);
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
}

class PfeAccordionHeader extends PFElement {
  static get tag() {
    return "pfe-accordion-header";
  }

  get styleUrl() {
    return "pfe-accordion-header.scss";
  }

  get templateUrl() {
    return "pfe-accordion-header.html";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super(PfeAccordionHeader);

    this.button = this.shadowRoot.querySelector("button");

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length || this.textContent.trim().length) {
      this._init();
    }

    this.addEventListener("click", this._clickHandler);
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
  }

  get expanded() {
    return this.hasAttribute("aria-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("aria-expanded", true);
      this.button.setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("aria-expanded");
      this.button.setAttribute("aria-expanded", false);
    }
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "heading");
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeAccordionHeader.tag}-${generateId()}`;
    }

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
        `${PfeAccordionHeader.tag}: The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)`
      );
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }

  _clickHandler(event) {
    this.emitEvent(PfeAccordion.events.change, {
      detail: { expanded: !this.expanded }
    });
  }
}

class PfeAccordionPanel extends PFElement {
  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get templateUrl() {
    return "pfe-accordion-panel.html";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeAccordionPanel.tag}-${generateId()}`;
    }
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export { PfeAccordion as default };
