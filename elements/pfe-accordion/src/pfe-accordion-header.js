import PFElement from "../../pfelement/dist/pfelement.js";
import PFEIcon from "../../pfe-icon/dist/pfe-icon.js";

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

  get isDirectLink() {
    return this.hasAttribute("is-direct-link");
  }

  get link() {
    return this.querySelector("a");
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
    this._keydownHandler = this._keydownHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);

    this._observer = new MutationObserver(this._init);
    this._slotObserver = new MutationObserver(this._init);

    this._getHeaderElement = this._getHeaderElement.bind(this);

    this.headingTag = "h3";

    this.addEventListener("click", this._clickHandler);
    this.addEventListener("keydown", this._keydownHandler);
    this.addEventListener("keyup", this._keyupHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Capture the button and the text
    this._button = this.shadowRoot.querySelector(`#button`);
    this._buttonText = this.shadowRoot.querySelector(`#button--content`);

    // This validates if HTML _or_ textContent exists inside the component
    if (this.hasLightDOM()) this._init();
    else {
      this.setAttribute("hidden", "");
    }

    this.addEventListener("click", this._clickHandler);
    this._observer.observe(this, {
      childList: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this.removeEventListener("keyup", this._keyupHandler);

    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    const header = this._getHeaderElement();
    if (header) {
      this.headingTag = header.tagName.toLowerCase();
      this.headingText = header.textContent.trim();
    } else {
      console.log(this)
      // this.headingText = this.getSlot().textContent.trim();
    }

    // Re-render with the updated heading tag and content
    this.render();

    // Validate that headers with the `is-direct-link` attribute contain a link
    if (this.isDirectLink && !this.querySelector("a[href]:not([href^='#'])")) {
      this.warn(`This component expects to find a link in the light DOM due to the "is-direct-link" attribute`);
    }

    // Remove the hidden attribute after upgrade
    this.removeAttribute("hidden");

    if (window.ShadyCSS)
      this._observer.observe(this, {
        childList: true,
      });
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
        // Get the assigned node(s) for the slot
        let slotted = this.firstElementChild.assignedNodes();

        // Check for default slot content if no nodes assigned
        if (slotted.length === 0) {
          slotted = [...this.firstElementChild.children];
        }

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

  _clickHandler(event) {
    this.emitEvent(PfeAccordionHeader.events.change, {
      detail: {
        expanded: !this.expanded,
      },
      bubbles: true,
      composed: true,
    });
  }

  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
      case "Enter":
      case 13:
        event.preventDefault();
        break;
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
      case "Enter":
      case 13:
        this.click(event);
        break;
    }
  }

  _expandedChanged() {
    this.setAttribute("aria-expanded", this.expanded);
    if (this._button) this._button.setAttribute("aria-expanded", this.expanded);
  }
}

export default PfeAccordionHeader;
