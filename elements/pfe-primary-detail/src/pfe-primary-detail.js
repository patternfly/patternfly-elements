import PFElement from "../../pfelement/dist/pfelement.js";

// list of attributes that we DO NOT want to pass
// to our shadow DOM. For example, the style attribute
// could ruin our encapsulated styles in the shadow DOM
const denyListAttributes = ["style"];

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  childList: true
};

// @todo Add functions to open a specific item by index or ID
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

    this._handleHideShow = this._handleHideShow.bind(this);
    this._initDetailsNav = this._initDetailsNav.bind(this);
    this._initDetail = this._initDetail.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._a11yKeyBoardControls = this._a11yKeyBoardControls.bind(this);

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

    // this._focusElements = null;
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
    this._handleHideShow({ target: this._slots.detailsNav[0] });

    // A11y Features:
    this.addEventListener("keydown", this._a11yKeyBoardControls);
  }

  disconnectedCallback() {
    this._observer.disconnect();

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }

    this.removeEventListener("keydown", this._a11yKeyBoardControls);
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    // Don't re-init anything that's been initialized already
    if (detailNavElement.tagName === "BUTTON" && detailNavElement.dataset.index && detailNavElement.id) {
      // Make sure the data-index attribute is up to date in case order has changed
      detailNavElement.dataset.index = index;
      return;
    }

    let attr = detailNavElement.attributes;
    const toggle = document.createElement("button");

    toggle.innerHTML = detailNavElement.innerHTML;

    // Copy over attributes from original element that aren't in denyList
    [...attr].forEach(detailNavElement => {
      if (!denyListAttributes.includes(detailNavElement.name)) {
        toggle.setAttribute(detailNavElement.name, detailNavElement.value);
      }
    });

    // Set data-index attribute
    toggle.dataset.index = index;

    // If the detailNavElement does not have a ID, set a unique ID
    if (!detailNavElement.id) {
      toggle.setAttribute(
        "id",
        `pfe-detail-toggle-${Math.random()
          .toString(36)
          .substr(2, 9)}`
      );
    }

    toggle.setAttribute("role", "tab");
    toggle.setAttribute("aria-selected", "false");
    toggle.setAttribute("tabindex", "-1");
    toggle.classList.add("a11y-toggle");

    toggle.addEventListener("click", this._handleHideShow);

    // A11y Features:
    // toggle.addEventListener("keydown", this._a11yKeyBoardControls);
    this._slots.detailsNav[index] = toggle;
    detailNavElement.replaceWith(toggle);
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
      /**
        A11y note:
        tabindex = 0 ensures the tabpanel is in the tab sequence, helps AT move to panel content, helps ensure correct behaviour (especially when the tabpanel does NOT contain any focusable elements)

        @resource:
        https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
      */
      detail.setAttribute("tabindex", "0");
      detail.classList.add("a11y-panel");
    }

    // Swing back to detailsNav to add aria-controls, now that details have an Id
    if (!this._slots.detailsNav[index].hasAttribute("aria-controls") && detail.id) {
      this._slots.detailsNav[index].setAttribute("aria-controls", detail.id);
    }

    // Leave a reliable indicator that this has been initialized so we don't do it again
    detail.dataset.processed = true;

    // A11y hide shadowRoot details-nav
    this.shadowRoot.querySelector("#details-wrapper").setAttribute("aria-hidden", true);
    this.shadowRoot.querySelector("#details-wrapper").setAttribute("tabindex", "-1");
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
  } // end _processLightDom()

  /**
   * Handles changes in state
   * @param {object} e Event object
   */
  _handleHideShow(e) {
    const nextToggle = e.target;
    const key = e.key;

    if (typeof nextToggle === "undefined") {
      return;
    }
    // If the clicked toggle is already open, no need to do anything
    else if (nextToggle.hasAttribute("aria-selected") && nextToggle.getAttribute("aria-selected") === "true") {
      return;
    }

    const currentToggle = this._slots.detailsNav.find(
      toggle => toggle.hasAttribute("aria-selected") && toggle.getAttribute("aria-selected") === "true"
    );

    // Get details elements
    const nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];

    if (currentToggle) {
      const currentDetails = this._slots.details[parseInt(currentToggle.dataset.index)];

      // Remove Current Item's active attributes
      currentToggle.setAttribute("aria-selected", "false");
      /**
        A11y note:
        tabindex = -1 removes element from the tab sequence, set when tab is not selected so that only the active tab (selected tab) is in the tab sequence, when HTML button is used for tab you do not need to set tabindex = 0 on the button when it is active so the attribute should just be removed when the button is active

        when any other HTML element is used such as a heading you will need to explicitly add tabindex = 0

        @resource:
        https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
      */
      currentToggle.setAttribute("tabindex", "-1");

      // Remove Current Detail's attributes
      currentDetails.setAttribute("aria-hidden", "true");

      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: currentToggle,
          details: currentDetails
        }
      });
    }

    // Add active attributes to Next Item
    nextToggle.setAttribute("aria-selected", "true");
    nextToggle.removeAttribute("tabindex", "-1");
    // Explicitly set tabindex 0 bc heading is being used instead of button to fix IE11 issues
    nextToggle.setAttribute("tabindex", "0");

    // Add inactive attributes to Next Details
    nextDetails.setAttribute("aria-hidden", "false");

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails
      }
    });
  } // end _handleHideShow()

  /**
   * A11y features
   */
  _isToggle(element) {
    return element.classList.contains("a11y-toggle");
  }

  _isPanel(element) {
    return element.classList.contains("a11y-panel");
  }

  _allToggles() {
    return [...this.querySelectorAll(".a11y-toggle")];
  }

  _allPanels() {
    console.log([...this.querySelectorAll(".a11y-panel")]);
    return [...this.querySelectorAll(".a11y-panel")];
  }

  _panelForToggle(toggle) {
    const next = toggle.nextElementSibling;

    if (!next) {
      return;
    }

    if (!next.classList.contains("a11y-panel")) {
      console.error(`${PfePrimaryDetail.tag}: Sibling element to a tab toggle needs to be a tabpanel`);
      return;
    }

    return next;
  }

  _prevToggle() {
    const toggles = this._allToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) - 1;

    return toggles[(newIndex + toggles.length) % toggles.length];
  }

  _nextToggle() {
    const toggles = this._allToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) + 1;

    return toggles[newIndex % toggles.length];
  }

  _firstToggle() {
    const firstToggle = this._allToggles;

    return firstToggle[0];
  }

  _lastToggle() {
    const lastToggle = this._allToggles;

    return lastToggle[lastToggle.length - 1];
  }

  // Manual user activation vertical tab
  _a11yKeyBoardControls(event) {
    const currentToggle = event.target;

    if (!this._isToggle(currentToggle)) {
      return;
    }

    let newToggle;

    switch (event.key) {
      // case "Tab":
      // Tab (Default tab behavior)
      /// When focus moves into the tab list, places focus on the active tab element
      /// When the focus is in the tab list, move focus to next element in tab order which is the tabpanel element
      /// When focus is moved outside of the tab list focus moves to the next focusable item in the DOM order

      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        // Up Arrow/Left Arrow
        /// When tab has focus:
        /// Moves focus to the next tab
        /// If focus is on the last tab, moves focus to the first tab

        newToggle = this._prevToggle();
        break;

      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        // Down Arrow/Right Arrow
        /// When tab has focus:
        /// Moves focus to previous tab
        /// If focus is on the first tab, moves to the last tab
        /// Activates the newly focused tab

        newToggle = this._nextToggle();
        break;

      case "Home":
        // Home
        //// When a tab has focus, moves focus to the first tab

        newToggle = this._firstToggle();
        break;

      case "End":
        // End
        /// When a tab has focus, moves focus to the last tab

        newToggle = this._lastToggle();
        break;

      default:
        return;
    }

    console.log(newToggle);

    newToggle.focus();
  } // end _a11yKeyBoardControls()
} // end Class

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
