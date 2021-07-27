import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

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

  // @TODO this is for navigation 1.0 updates
  // get isDirectLink() {
  //   return this.hasAttribute("is-direct-link");
  // }

  // get link() {
  //   return this.querySelector("a[href]");
  // }

  static get observer() {
    return {
      childList: true,
    };
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

    this.headingTag = "h3";

    this.addEventListener("click", this._clickHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Capture the button and the text
    this.button = this.shadowRoot.querySelector(`.pf-c-accordion__toggle`);
    this._buttonText = this.button.querySelector(`.pf-c-accordion__toggle-text`);

    if (this.hasLightDOM()) this._init();
    else {
      this._observer.observe(this, PfeAccordionHeader.observer);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
  }

  _init() {
    this._observer.disconnect();

    const header = this._getHeaderElement();

    if (header) {
      this.headingTag = header.tagName ? header.tagName.toLowerCase() : "h3";
      this.headingText = header.textContent ? header.textContent.trim() : "";
    }

    // Update button text
    this._buttonText.innerHTML = this.headingText;

    // Remove the hidden attribute after upgrade
    this.removeAttribute("hidden");

    this._observer.observe(this, PfeAccordionHeader.observer);

    // @TODO this is for navigation 1.0 updates
    // Validate that headers with the `is-direct-link` attribute contain a link
    // if (this.isDirectLink && !this.link) {
    //   this.warn(`This component expects to find a link in the light DOM due to the "is-direct-link" attribute`);
    // }
  }

  _getHeaderElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No header content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      const htags = this.fetchElement(
        this.children,
        (el) => el.tagName && (el.tagName.match(/^H[1-6]/) || el.tagName === "P"),
        this._slotObserver
      );

      // If there is no content inside the slot, return empty with a warning
      if (htags.length === 0) {
        this.warn(`No heading information was provided.`);
        return;
      }
      // If there is more than 1 element in the slot, capture the first h-tag
      else if (htags.length > 1) {
        this.warn(`Heading currently only supports 1 tag; extra tags will be ignored.`);
        return htags[0];
      } else return htags[0];
    } else {
      const htag = document.createElement("h3");

      if (this.firstChild && this.firstChild.nodeType === "#text") {
        // If a text node was provided but no semantics, default to an h3
        htag.textContent = this.firstChild.textContent;
      } else {
        this.warn(`Header should contain at least 1 heading tag for correct semantics.`);

        // If incorrect semantics were used, create an H3 and try to capture the content
        htag.textContent = this.textContent;
      }

      return htag;
    }
  }

  _clickHandler() {
    this.emitEvent(PfeAccordionHeader.events.change, {
      detail: {
        expanded: !this.expanded,
      },
    });
  }

  _expandedChanged() {
    if (this.button) {
      this.button.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    }
  }

  /**
   * Provides a standard way of fetching light DOM that may or may not be provided inside
   * of a slot; optional filtering of results and way to pass in an observer if you need to
   * track updates to the slot
   * @param  {NodeItem} el
   * @param  {function} filter [optional] Filter for the returned results of the NodeList
   * @param  {function} observer [optional] Pointer to the observer defined for that slot
   */
  fetchElement(els, filter, observer) {
    if (!els) return [];
    let nodes = [...els];

    // Parse the nodes for slotted content
    [...nodes]
      .filter((node) => node && node.tagName === "SLOT")
      .forEach((node) => {
        // Remove node from the list
        const idx = nodes.findIndex((item) => item === node);
        // Capture it's assigned nodes for validation
        let slotted = node.assignedNodes();
        // If slotted elements were found, add it to the nodeList
        if (slotted && slotted.length > 0) nodes[idx] = slotted;
        else {
          // If no content exists in the slot, check for default content in the slot template
          const defaults = node.children;
          if (defaults && defaults.length > 0) nodes[idx] = defaults[0];
        }

        // Attach the observer if provided to watch for updates to the slot
        // Useful if you are moving content from light DOM to shadow DOM
        if (typeof observer === "function") {
          observer.observer(node, PfeAccordionHeader.observer);
        }
      });

    if (typeof filter === "function") return nodes.filter(filter);
    else return nodes;
  }
}

PFElement.create(PfeIcon);

export default PfeAccordionHeader;
