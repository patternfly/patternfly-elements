import PFElement from "../../pfelement/dist/pfelement.js";

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
        default: (el) => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false,
      },
      ariaControls: {
        type: String,
        prefix: false,
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id",
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        cascade: "#pfe-accordion-header--button",
        observer: "_expandedChanged",
      },
    };
  }

  static get events() {
    return {
      change: `pfe-accordion:change`,
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
    this._observer.observe(this, {
      childList: true,
    });
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
      this._observer.observe(this, {
        childList: true,
      });
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
        const htags = slotted.filter((slot) => slot.tagName.match(/^H[1-6]/) || slot.tagName === "P");
        if (htags.length > 0) {
          // Return the first htag and attach an observer event to watch for it
          slotted.forEach((slot) =>
            this._slotObserver.observe(slot, {
              characterData: true,
              childList: true,
              subtree: true,
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
    this.emitEvent(PfeAccordionHeader.events.change, {
      detail: {
        expanded: !this.expanded,
      },
    });
  }

  _expandedChanged() {
    this.setAttribute("aria-expanded", this.expanded);

    const button = this.shadowRoot.querySelector(`#${this.tag}--button`);
    if (button) button.setAttribute("aria-expanded", this.expanded);
  }
}

export default PfeAccordionHeader;
