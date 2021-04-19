import PFElement from "../../pfelement/dist/pfelement.js";

// list of attributes that we DO NOT want to pass
// to our shadow DOM. For example, the style attribute
// could ruin our encapsulated styles in the shadow DOM
const denyListAttributes = ["style"];

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  childList: true
};

// @TODO Add keyboard controls for arrows?
// @TODO Add functions to open a specific item by index or ID
class PfePrimaryDetail extends PFElement {
  static get tag() {
    return "pfe-primary-detail";
  }

  static get meta() {
    return {
      title: "Primary detail",
      description: ""
    };
  }

  get templateUrl() {
    return "pfe-primary-detail.html";
  }

  get styleUrl() {
    return "pfe-primary-detail.scss";
  }

  static get events() {
    return {
      hiddenTab: `${this.tag}:hidden-tab`,
      shownTab: `${this.tag}:shown-tab`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      // Set orientation (doesn't change)
      orientation: {
        title: "Orientation",
        type: String,
        attr: "aria-orientation",
        default: "vertical"
      },
      // Set aria role
      role: {
        type: String,
        default: "tablist"
      }
    };
  }

  static get slots() {
    return {
      detailsNavHeader: {
        title: "Details Nav Header",
        type: "array",
        namedSlot: true
      },
      detailsNav: {
        title: "Details Nav",
        type: "array",
        namedSlot: true
      },
      detailsNavFooter: {
        title: "Details Nav Footer",
        type: "array",
        namedSlot: true
      },
      details: {
        title: "Details",
        type: "array",
        namedSlot: true
      }
    };
  }

  constructor() {
    super(PfePrimaryDetail, { type: PfePrimaryDetail.PfeType });
    this.isIE = !!window.MSInputMethodContext && !!document.documentMode;

    this._handleHideShow = this._handleHideShow.bind(this);
    this._initDetailsNav = this._initDetailsNav.bind(this);
    this._initDetail = this._initDetail.bind(this);
    this._processLightDom = this._processLightDom.bind(this);

    this._slots = {
      detailsNav: null,
      details: null,
      detailsNavHeader: null,
      detailsNavFooter: null
    };

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    this._detailsNav = this.shadowRoot.getElementById("details-nav");
    this._detailsWrapper = this.shadowRoot.getElementById("details-wrapper");
  }

  connectedCallback() {
    super.connectedCallback();

    // Add appropriate markup and behaviors if DOM is ready
    if (this.hasLightDOM()) {
      this._processLightDom();
    }

    // Process the light DOM on any update
    this._observer.observe(this, lightDomObserverConfig);

    // Set first item as active for initial load
    this._handleHideShow({
      target: this._slots.detailsNav[0],
      pfeInitializing: true
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    // Don't re-init anything that's been initialized already
    if (detailNavElement.hasAttribute("role") && detailNavElement.dataset.index && detailNavElement.id) {
      // Make sure the data-index attribute is up to date in case order has changed
      detailNavElement.dataset.index = index;
      return;
    }

    // Set data-index attribute
    detailNavElement.dataset.index = index;

    // If the detailNavElement does not have a ID, set a unique ID
    if (!detailNavElement.id) {
      detailNavElement.setAttribute(
        "id",
        `pfe-detail-toggle-${Math.random()
          .toString(36)
          .substr(2, 9)}`
      );
    }

    detailNavElement.setAttribute("role", "tab");
    detailNavElement.setAttribute("aria-selected", "false");

    detailNavElement.addEventListener("click", this._handleHideShow);
    this._slots.detailsNav[index] = detailNavElement;
  }

  /**
   * Process detail wrapper elements
   * @param {object} detail DOM Object of detail wrapper
   * @param {integer} index The index of the item when detail wrappers are queried
   */
  _initDetail(detail, index) {
    detail.dataset.index = index;

    // Don't re-init anything that's been initialized already
    if (detail.dataset.processed === "true") {
      return;
    }

    // If the toggle does not have a ID, set a unique ID
    if (!detail.hasAttribute("id")) {
      detail.setAttribute(
        "id",
        `pfe-detail-${Math.random()
          .toString(36)
          .substr(2, 9)}`
      );
    }

    detail.setAttribute("role", "tabpanel");
    detail.setAttribute("aria-hidden", "true");

    const toggleId = this._slots.detailsNav[index].getAttribute("id");
    if (!detail.hasAttribute("aria-labelledby") && toggleId) {
      detail.setAttribute("aria-labelledby", toggleId);
    }

    // Swing back to detailsNav to add aria-controls, now that details have an Id
    if (!this._slots.detailsNav[index].hasAttribute("aria-controls") && detail.id) {
      this._slots.detailsNav[index].setAttribute("aria-controls", detail.id);
    }

    // Leave a reliable indicator that this has been initialized so we don't do it again
    detail.dataset.processed = true;
    detail.hidden = true;
  }

  /**
   * Adds nav functionality and adds additional HTML/attributes to markup
   */
  _processLightDom() {
    // Update slots
    this._slots = {
      detailsNav: this.getSlot("details-nav"),
      details: this.getSlot("details"),
      detailsNavHeader: this.getSlot("details-nav--header"),
      detailsNavFooter: this.getSlot("details-nav--footer")
    };

    if (this._slots.detailsNav.length !== this._slots.details.length) {
      this.error(
        `The number of item headings does not match the number of item details. Found ${this._slots.detailsNav.length} item headings & ${this._slots.details.length} item details.`
      );
      return;
    }

    // Setup left sidebar navigation
    this._slots.detailsNav.forEach((toggle, index) => {
      this._initDetailsNav(toggle, index);
    });

    // Setup item detail elements
    this._slots.details.forEach((detail, index) => {
      this._initDetail(detail, index);
    });
  }

  /**
   * Handles changes in state
   * @param {object} e Event object
   */
  _handleHideShow(e) {
    const nextToggle = e.target;

    if (typeof nextToggle === "undefined") {
      return;
    }
    // If the clicked toggle is already open, no need to do anything
    else if (nextToggle.hasAttribute("aria-selected") && nextToggle.getAttribute("aria-selected") === "true") {
      return;
    }

    let currentToggle = null;

    // Find the active toggle by looking through them all and finding the ones with aria-selected set
    for (let index = 0; index < this._slots.detailsNav.length; index++) {
      const toggle = this._slots.detailsNav[index];
      if (toggle.hasAttribute("aria-selected") && toggle.getAttribute("aria-selected") === "true") {
        currentToggle = toggle;
        break;
      }
    }

    // Get details elements
    const nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];


    if (currentToggle) {
      const currentDetails = this._slots.details[parseInt(currentToggle.dataset.index)];

      // Remove Current Item's active attributes
      currentToggle.setAttribute("aria-selected", "false");

      // Remove Current Detail's attributes
      currentDetails.setAttribute("aria-hidden", "true");
      currentDetails.hidden = true;

      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: currentToggle,
          details: currentDetails
        }
      });
    }

    // Add active attributes to Next Item
    nextToggle.setAttribute("aria-selected", "true");

    // Add active attributes to Next Details
    nextDetails.setAttribute("aria-hidden", "false");
    nextDetails.hidden = false;

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails
      }
    });

    // Set focus to pane if this isn't initialization
    if (typeof e.pfeInitializing === "undefined") {
      const firstFocusableElement = nextDetails.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }
}

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
