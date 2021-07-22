import PFElement from "../../pfelement/dist/pfelement.js";

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  childList: true,
};

/**
 * Debounce helper function
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func Function to be debounced
 * @param {number} delay How long until it will be run
 * @param {boolean} immediate Whether it should be run at the start instead of the end of the debounce
 */
function debounce(func, delay, immediate = false) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) func.apply(context, args);
  };
}

// @todo Add functions to open a specific item by index or ID
class PfePrimaryDetail extends PFElement {
  static get tag() {
    return "pfe-primary-detail";
  }

  static get meta() {
    return {
      title: "Primary detail",
      description: "Reworks title/description content into a vertical-tabs like interface.",
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
      shownTab: `${this.tag}:shown-tab`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      // Set aria-orientation (doesn't change)
      orientation: {
        title: "Orientation",
        type: String,
        attr: "aria-orientation",
        default: "vertical",
      },
      // Set aria role (doesn't change)
      role: {
        type: String,
        default: "tablist",
      },
      // The min-width of the _component_ where it has a desktop layout
      breakpointWidth: {
        type: Number,
        default: 800,
      },
      // Read only: Displays the id of an open 'detailNav' element
      active: {
        type: String,
      },
      // Read only: Displays what breakpoint is currently being used
      breakpoint: {
        type: String,
        values: ["compact", "desktop"],
      },
    };
  }

  static get slots() {
    return {
      // Content that shows above the navigation column
      detailsNavHeader: {
        title: "Details Nav Header",
        type: "array",
        namedSlot: true,
      },
      // Column of headings to expland the related contents
      detailsNav: {
        title: "Details Nav",
        type: "array",
        namedSlot: true,
      },
      // Content that shows below the navigation column
      detailsNavFooter: {
        title: "Details Nav Footer",
        type: "array",
        namedSlot: true,
      },
      // Content content that is shown when it's corresponding "Details Nav" item is active
      details: {
        title: "Details",
        type: "array",
        namedSlot: true,
      },
    };
  }

  constructor() {
    super(PfePrimaryDetail, { type: PfePrimaryDetail.PfeType });
    this.isIE = !!window.MSInputMethodContext && !!document.documentMode;

    // Make sure 'this' is set to the instance of the component in child methods
    this._handleHideShow = this._handleHideShow.bind(this);
    this._initDetailsNav = this._initDetailsNav.bind(this);
    this._initDetail = this._initDetail.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._keyboardControls = this._keyboardControls.bind(this);
    this._setBreakpoint = this._setBreakpoint.bind(this);
    this._setDetailsNavVisibility = this._setDetailsNavVisibility.bind(this);

    // Place to store references to the slotted elements
    this._slots = {
      detailsNav: null,
      details: null,
      detailsNavHeader: null,
      detailsNavFooter: null,
    };

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    // Commonly used shadow DOM elements
    this._detailsNav = this.shadowRoot.getElementById("details-nav");
    this._detailsWrapper = this.shadowRoot.getElementById("details-wrapper");
    this._detailsWrapperHeader = this.shadowRoot.getElementById("details-wrapper__header");
    this._detailsWrapperHeading = this.shadowRoot.getElementById("details-wrapper__heading");
    this._detailsBackButton = this.shadowRoot.getElementById("details-wrapper__back");

    this._debouncedSetBreakpoint = null;

    // @todo: decide if we need this anymore
    // Store all focusable element types in variable
    this._focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  }

  connectedCallback() {
    super.connectedCallback();

    // Add appropriate markup and behaviors if DOM is ready
    if (this.hasLightDOM()) {
      this._processLightDom();
    }

    // Lower debounce delay for automated testing
    const debounceDelay = this.hasAttribute("automated-testing") ? 0 : 100;

    this._debouncedSetBreakpoint = debounce(this._setBreakpoint, debounceDelay);
    window.addEventListener("resize", this._debouncedSetBreakpoint);

    // Process the light DOM on any update
    this._observer.observe(this, lightDomObserverConfig);

    // @todo Translate
    // @todo: (KS) decide if we need to keep this with new approach
    // this._detailsBackButton.innerText = "Close tab";
    // this._detailsBackButton.addEventListener("click", this.closeAll);

    // A11y: add keydown event listener to activate keyboard controls
    this.addEventListener("keydown", this._keyboardControls);
  }

  disconnectedCallback() {
    this._observer.disconnect();

    window.removeEventListener("resize", this._debouncedSetBreakpoint);

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }

    // Remove keydown event listener if component disconnects
    this.removeEventListener("keydown", this._keyboardControls);
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    // @todo Drop this quick exit, it's causing issues in components that are copied into a shadow root
    // Don't re-init anything that's been initialized already
    if (detailNavElement.dataset.index && detailNavElement.id) {
      // Make sure the data-index attribute is up to date in case order has changed
      detailNavElement.dataset.index = index;
      return;
    }

    const createToggleButton = detailNavElement.tagName !== "BUTTON";
    let toggle = null;

    if (createToggleButton) {
      // @todo const?
      let attr = detailNavElement.attributes;
      toggle = document.createElement("button");

      toggle.innerHTML = detailNavElement.innerHTML;
      toggle.setAttribute("role", "tab");

      // list of attributes that we DO NOT want to pass to our shadow DOM.
      const denyListAttributes = ["style", "role"];

      // Copy over attributes from original element that aren't in denyList
      [...attr].forEach((detailNavElement) => {
        if (!denyListAttributes.includes(detailNavElement.name)) {
          toggle.setAttribute(detailNavElement.name, detailNavElement.value);
        }
      });

      // Keeping track of tagName which is used in mobile layout to maintain heading order
      toggle.dataset.wasTag = detailNavElement.tagName;

      // If the detailNavElement does not have a ID, set a unique ID
      if (!detailNavElement.id) {
        toggle.setAttribute("id", `pfe-detail-toggle-${Math.random().toString(36).substr(2, 9)}`);
      }
    } else {
      toggle = detailNavElement;
    }

    // If the detailNavElement does not have a ID, set a unique ID
    if (!detailNavElement.id) {
      detailNavElement.setAttribute("id", `pfe-detail-toggle-${Math.random().toString(36).substr(2, 9)}`);
    }

    toggle.addEventListener("click", this._handleHideShow);
    toggle.dataset.index = index;

    // Store a reference to our new detailsNav item
    this._slots.detailsNav[index] = toggle;

    if (createToggleButton) {
      detailNavElement.replaceWith(toggle);

      // @todo: (KS) figure out how to set these attrs on the toggles when page loads
      if (this.breakpoint === "compact") {
        toggle.removeAttribute("tabindex");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  }

  /**
   * Process detail wrapper elements
   * @param {object} detail DOM Object of detail wrapper
   * @param {integer} index The index of the item when detail wrappers are queried
   */
  _initDetail(detail, index) {
    detail.dataset.index = index;

    // If the toggle does not have a ID, set a unique ID
    if (!detail.hasAttribute("id")) {
      detail.setAttribute("id", `pfe-detail-${Math.random().toString(36).substr(2, 9)}`);
    }

    detail.setAttribute("role", "tabpanel");
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
  }

  /**
   * Evaluate whether component is smaller than breakpoint
   * Then manage state of component and manage active/inactive elements
   */
  _setBreakpoint() {
    // @todo: (KS) add features to check and ensure aria attributes are correct when the screen is resized, run the addActiveAttr and addCloseAttr functions after the user resizes the screen

    const breakpointWas = this.breakpoint;
    const breakpointIs = this.offsetWidth < this.breakpointWidth ? "compact" : "desktop";

    this.breakpoint = breakpointIs;

    // If we've switched breakpoints or one wasn't set
    if (breakpointWas !== "desktop" && breakpointIs === "desktop") {
      // Desktop should never have nothing selected, default to first item if nothing is selected
      if (!this.active) {
        this._handleHideShow({ target: this._slots.detailsNav[0] });
      }

      // Make sure the left column items are visible
      this._setDetailsNavVisibility(true);
    } else if (breakpointWas !== "compact" && breakpointIs === "compact") {
      // Hide the left column if it is out of view
      if (this.active) {
        this._setDetailsNavVisibility(false);
      }

      // @todo wut is this doing
      this._slots.detailsNav[0].removeAttribute("tabindex");
    }
  }

  /**
   * Utility function to hide elements in details nav
   * @param {boolean} visible True to show nav elements, false to hide
   */
  _setDetailsNavVisibility(visibile) {
    // Manage detailsNav elements hidden attribute
    for (let index = 0; index < this._slots.detailsNav.length; index++) {
      const detailNavItem = this._slots.detailsNav[index];
      detailNavItem.hidden = !visibile;
    }

    // Manage detailsNavHeader elements hidden attribute
    for (let index = 0; index < this._slots.detailsNavHeader.length; index++) {
      const detailNavItem = this._slots.detailsNavHeader[index];
      detailNavItem.hidden = !visibile;
    }

    // Manage detailsNavFooter elements hidden attribute
    for (let index = 0; index < this._slots.detailsNavFooter.length; index++) {
      const detailNavItem = this._slots.detailsNavFooter[index];
      detailNavItem.hidden = !visibile;
    }
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
      detailsNavFooter: this.getSlot("details-nav--footer"),
    };

    if (this._slots.detailsNav.length !== this._slots.details.length) {
      this.error(
        `The number of item headings does not match the number of item details. Found ${this._slots.detailsNav.length} item headings & ${this._slots.details.length} item details.`
      );
      return;
    }

    // Get active detailNavItem and corresponding details, if we have active elements
    const activeDetailNavId = this.active;
    let activeDetailId = null;
    if (activeDetailNavId) {
      activeDetailId = document.getElementById(activeDetailNavId).getAttribute("aria-controls");
    }

    // Setup left sidebar navigation
    this._slots.detailsNav.forEach((toggle, index) => {
      this._initDetailsNav(toggle, index);
    });

    // Setup item detail elements
    this._slots.details.forEach((detail, index) => {
      this._initDetail(detail, index);
      // Make sure all inactive detailNav and detail elements have closed attributes
      if (detail.id !== activeDetailId) {
        this._addCloseAttributes(this._slots.detailsNav[index], detail);
      }
    });

    this._setBreakpoint();

    // Desktop layout requires that something is active, if nothing is active make first item active
    if (!this.active && this.breakpoint === "desktop") {
      this._handleHideShow({ target: this._slots.detailsNav[0] });
    }
  } // end _processLightDom()

  /**
   * Add the appropriate active/open attributes
   * @param {Object} toggle DOM element in the details-nav slot
   * @param {Object} detail Optional, DOM element in the details slot
   */
  _addActiveAttributes(toggle, detail) {
    // Get detail element if one isn't set
    if (!detail) {
      detail = document.getElementById(toggle.getAttribute("aria-controls"));
    }

    toggle.setAttribute("aria-selected", "true");
    toggle.removeAttribute("tabindex");

    detail.hidden = false;
    detail.removeAttribute("aria-hidden");

    if (this.breakpoint === "compact") {
      toggle.removeAttribute("tabindex");
      toggle.setAttribute("aria-expanded", "true");
      this._detailsBackButton.append(this._detailsWrapperHeading);

    }
  }

  /**
   * Set appropriate inactive/closed attributes
   * @param {Object} toggle DOM element in the details-nav slot
   * @param {Object} detail Optional, DOM element in the details slot
   */
  _addCloseAttributes(toggle, detail) {
    if (!detail) {
      detail = document.getElementById(toggle.getAttribute("aria-controls"));
    }

    /**
     * A11y note:
     * tabindex = -1 removes element from the tab sequence, set when tab is not selected
     * so that only the active tab (selected tab) is in the tab sequence.
     * @see https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
     */
    toggle.setAttribute("tabindex", "-1");
    toggle.setAttribute("aria-selected", "false");

    detail.hidden = true;
    detail.setAttribute("aria-hidden", "true");

    if (this.breakpoint === "compact") {
      console.log("compact and closed");
      toggle.removeAttribute("tabindex");
      toggle.setAttribute("aria-expanded", "false");
    }
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
    else if (nextToggle.getAttribute("aria-selected") === "true" && nextToggle.id === this.active) {
      return;
    }

    const nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];
    const currentToggle = document.getElementById(this.active);

    // Update attribute to show which toggle is active
    this.setAttribute("active", nextToggle.id);

    // Create the appropriate heading for the top of the content column
    let newHeading = null;
    if (nextToggle.dataset.wasTag && nextToggle.dataset.wasTag.substr(0, 1) === "H") {
      newHeading = document.createElement(nextToggle.dataset.wasTag);
    } else {
      newHeading = document.createElement("strong");
    }
    newHeading.innerText = nextToggle.innerText;
    newHeading.id = this._detailsWrapperHeading.id;
    // Replace old heading
    this._detailsWrapperHeading.replaceWith(newHeading);
    this._detailsWrapperHeading = newHeading;

    // Shut previously active detail
    if (currentToggle) {
      const currentDetails = this._slots.details[parseInt(currentToggle.dataset.index)];

      this._addCloseAttributes(currentToggle, currentDetails);

      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: currentToggle,
          details: currentDetails,
        },
      });
    }

    // Add active attributes to Next Item
    this._addActiveAttributes(nextToggle, nextDetails);

    // At compact make sure elements in left sidebar are hidden, otherwise make sure they're shown
    if (this.getAttribute("breakpoint") === "compact" && this.active) {
      this._setDetailsNavVisibility(false);
    } else {
      this._setDetailsNavVisibility(true);
    }

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails,
      },
    });
  } // end _handleHideShow()

  /**
   * Closes the open toggle and details
   */
  closeAll() {
    this._setDetailsNavVisibility(true);

    if (this.active) {
      const detailNav = document.getElementById(this.active);
      const details = document.getElementById(detailNav.getAttribute("aria-controls"));
      this._addCloseAttributes(detailNav, details);
      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: detailNav,
          details: details,
        },
      });
    }

    this.removeAttribute("active");
  }

  /**
   * Check if active element is a tab toggle
   * @param {object} element Target slotted element
   */
  _isToggle(element) {
    return element.getAttribute("slot") === "details-nav";
  }

  /**
   * Check if active element is a tab panel
   * @param {object} element Target slotted element
   */
  _isPanel(element) {
    return element.getAttribute("slot") === "details";
  }

  /**
   * Get the corresponding active tab panel for the active tab toggle
   * @return {object} DOM Element for active panel
   */
  _getActivePanel() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement);

    return toggles[newIndex % toggles.length].nextElementSibling;
  }

  /**
   * Get previous toggle in relation to the active toggle
   * @return {object} DOM Element for toggle before the active one
   */
  _getPrevToggle() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement) - 1;

    return toggles[(newIndex + toggles.length) % toggles.length];
  }

  /**
   * Get currently active toggle
   * @return {object} DOM Element for active toggle
   */
  _getActiveToggle() {
    return document.getElementById(this.active);
  }

  /**
   * Get next toggle in list order from currently focused
   * @return {object} DOM Element for element after active toggle
   */
  _getNextToggle() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement) + 1;

    return toggles[newIndex % toggles.length];
  }

  /**
   * Manual user activation vertical tab
   * @param {event} Target event
   */
  _keyboardControls(event) {
    const currentElement = event.target;

    if (!this._isToggle(currentElement)) {
      return;
    }

    let newToggle;

    switch (event.key) {
      // case "Tab":
      // Tab (Default tab behavior)
      /// When focus moves into the tab list, places focus on the active tab element
      /// When the focus is in the tab list, move focus away from active tab element to next element in tab order which is the tabpanel element
      /// When focus is moved outside of the tab list focus moves to the next focusable item in the DOM order

      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        event.preventDefault(); // Prevent scrolling
        // Up Arrow/Left Arrow
        /// When tab has focus:
        /// Moves focus to the next tab
        /// If focus is on the last tab, moves focus to the first tab
        newToggle = this._getPrevToggle();
        break;

      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        event.preventDefault(); // Prevent scrolling
        // Down Arrow/Right Arrow
        /// When tab has focus:
        /// Moves focus to previous tab
        /// If focus is on the first tab, moves to the last tab
        /// Activates the newly focused tab

        newToggle = this._getNextToggle();
        break;

      case "Home":
        event.preventDefault(); // Prevent scrolling
        // Home
        //// When a tab has focus, moves focus to the first tab

        newToggle = this._slots.detailsNav[0];
        break;

      case "End":
        event.preventDefault(); // Prevent scrolling
        // End
        /// When a tab has focus, moves focus to the last tab

        newToggle = this._slots.detailsNav[this._slots.detailsNav.length - 1];
        break;

      case "Escape":
        // Only closing all at compact sizes since something should always be selected at non-compact
        if (this.getAttribute("breakpoint") === "compact") {
          this.closeAll();
        }
        break;
      default:
        return;
    }

    if (newToggle) newToggle.focus();
  } // end _keyboardControls()
} // end Class

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
