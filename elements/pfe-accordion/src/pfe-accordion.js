// Import polyfills: findIndex
import "./polyfills--pfe-accordion.js";

import PFElement from "../../pfelement/dist/pfelement.js";

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
      change: `${this.tag}:change`
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
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._linkPanels = this._linkPanels.bind(this);
    this._observer = new MutationObserver(this._linkPanels);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(PfeAccordion.events.change, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag)
    ]).then(() => {
      if (this.hasLightDOM()) {
        this._linkPanels();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
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

  _expandHeader(header) {
    header.expanded = true;
  }

  _expandPanel(panel) {
    if (!panel) {
      console.error(`${PfeAccordion.tag}: Trying to expand a panel that doesn't exist`);
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
      console.error(`${PfeAccordion.tag}: Trying to collapse a panel that doesn't exist`);
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

  static get properties() {
    return {
      _id: {
        type: String,
        default: el => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false
      },
      ariaControls: {
        type: String,
        prefix: false
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id"
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        observer: "_expandedChanged",
        cascade: "#pfe-accordion-header--button",
        observer: "_expandedChanged"
      }
    };
  }

  constructor() {
    super(PfeAccordionHeader);

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._observer = new MutationObserver(this._init);
    this._slotObserver = new MutationObserver(this._init);

    this._getHeaderElement = this._getHeaderElement.bind(this);
    this._createButton = this._createButton.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();

    this.addEventListener("click", this._clickHandler);
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    const existingButton = this.shadowRoot.querySelector(`#${this.tag}--button`);
    const button = existingButton || this._createButton();
    const existingHeader = existingButton ? existingButton.parentElement : null;
    const header = this._getHeaderElement();

    if (header) {
      let wrapperTag = document.createElement(header.tagName.toLowerCase() || "h3");
      if (existingHeader && existingHeader.tagName === header.tagName) {
        wrapperTag = existingHeader;
      } else if (existingHeader && existingHeader.tagName !== header.tagName) {
        existingHeader.remove();
      }

      button.innerText = header.innerText;

      wrapperTag.appendChild(button);
      this.shadowRoot.appendChild(wrapperTag);
    } else {
      button.innerText = this.textContent.trim();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }

  _getHeaderElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No header content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      // If the first element is a slot, query for it's content
      if (this.firstElementChild.tagName === "SLOT") {
        const slotted = this.firstElementChild.assignedNodes();
        // If there is no content inside the slot, return empty with a warning
        if (slotted.length === 0) {
          this.warn(`No heading information exists within this slot.`);
          return;
        }
        // If there is more than 1 element in the slot, capture the first h-tag
        if (slotted.length > 1) this.warn(`Heading currently only supports 1 tag.`);
        const htags = slotted.filter(slot => slot.tagName.match(/^H[1-6]/) || slot.tagName === "P");
        if (htags.length > 0) {
          // Return the first htag and attach an observer event to watch for it
          slotted.forEach(slot =>
            this._slotObserver.observe(slot, {
              characterData: true,
              childList: true,
              subtree: true
            })
          );
          return htags[0];
        } else return;
      } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
        return this.firstElementChild;
      } else {
        this.warn(`Heading should contain at least 1 heading tag for correct semantics.`);
      }
    }

    return;
  }

  _createButton(expanded = "false") {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-expanded", expanded);
    button.id = `${this.tag}--button`;
    return button;
  }

  _clickHandler(event) {
    this.emitEvent(PfeAccordion.events.change, {
      detail: {
        expanded: !this.expanded
      }
    });
  }

  _expandedChanged() {
    this.setAttribute("aria-expanded", this.expanded);

    const button = this.shadowRoot.querySelector(`#${this.tag}--button`);
    if (button) button.setAttribute("aria-expanded", this.expanded);
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

  static get properties() {
    return {
      _id: {
        type: String,
        default: el => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false
      },
      role: {
        type: String,
        default: "region",
        prefix: false
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id"
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false
      },
      ariaLabelledby: {
        type: String,
        prefix: false
      }
    };
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export { PfeAccordion as default };
