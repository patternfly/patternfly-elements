import { PfeCollapseToggle } from "../../pfe-collapse/dist/pfe-collapse.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

class PfeAccordionHeader extends PfeCollapseToggle {
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
    return this.querySelector("a[href]");
  }

  constructor() {
    // When using a semantic button, there is no need to include the tab-index or keydownHandler
    super(PfeAccordionHeader, { setTabIndex: false, addKeydownHandler: false });

    this._init = this._init.bind(this);

    this._observer = new MutationObserver(this._init);
    this._slotObserver = new MutationObserver(this._init);

    this._getHeaderElement = this._getHeaderElement.bind(this);

    this.headingTag = "h3";
  }

  connectedCallback() {
    super.connectedCallback();

    // Capture the button and the text
    this.button = this.shadowRoot.querySelector(`.pf-c-accordion__toggle`);
    this._buttonText = this.button.querySelector(`.pf-c-accordion__toggle-text`);

    // This validates if HTML _or_ textContent exists inside the component
    if (this.hasLightDOM()) this._init();
    else {
      this._observer.observe(this, {
        childList: true,
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

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

    this._observer.observe(this, {
      childList: true,
    });

    // Validate that headers with the `is-direct-link` attribute contain a link
    if (this.isDirectLink && !this.link) {
      this.warn(`This component expects to find a link in the light DOM due to the "is-direct-link" attribute`);
    }
  }

  _getHeaderElement() {
    // Check if there is a nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No header content provided.`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      // If the first element is a slot, query for it's content
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
}

export default PfeAccordionHeader;
