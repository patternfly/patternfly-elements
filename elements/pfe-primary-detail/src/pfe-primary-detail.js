import PFElement from "../../pfelement/dist/pfelement.js";

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

    // Make sure 'this' is set to the instance of the component in child methods
    this._handleHideShow = this._handleHideShow.bind(this);
    this._initDetailsNav = this._initDetailsNav.bind(this);
    this._initDetail = this._initDetail.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._keyboardControls = this._keyboardControls.bind(this);
    this._setBreakpoint = this._setBreakpoint.bind(this);
    this._setDetailsNavVisibility = this._setDetailsNavVisibility.bind(this);
    this._updateBackButtonState = this._updateBackButtonState.bind(this);
    this._manageWrapperAttributes = this._manageWrapperAttributes.bind(this);

    // Place to store references to the slotted elements
    this._slots = {
      detailsNav: null,
      details: null,
      detailsNavHeader: null,
      detailsNavFooter: null,
    };

    // Setup mutation observer to watch for content changes
    this._childObserver = new MutationObserver(this._processLightDom);
    this._attributesObserver = new MutationObserver(this._manageWrapperAttributes);

    // Commonly used shadow DOM elements
    this._wrapper = this.shadowRoot.getElementById("wrapper");
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
    this._childObserver.observe(this, { childList: true });
    this._attributesObserver.observe(this, { attributes: true, attributeFilter: ["active"] });

    this._detailsBackButton.addEventListener("click", this.closeAll);

    // A11y: add keydown event listener to activate keyboard controls
    this.addEventListener("keydown", this._keyboardControls);
  }

  disconnectedCallback() {
    this._childObserver.disconnect();
    this._attributesObserver.disconnect();

    window.removeEventListener("resize", this._debouncedSetBreakpoint);

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }

    // Remove keydown event listener if component disconnects
    this.removeEventListener("keydown", this._keyboardControls);
  }

  _manageWrapperAttributes() {
    if (this.hasAttribute("active")) {
      this._wrapper.classList.add("active");
    } else {
      this._wrapper.classList.remove("active");
    }
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    const createToggleButton = detailNavElement.tagName !== "BUTTON";
    let toggle = null;

    if (createToggleButton) {
      const attr = detailNavElement.attributes;
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
    // Set initial tabindex state for detail panel, -1 one when panel is inactive
    detail.setAttribute("tabindex", "-1");

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
    const breakpointWas = this.breakpoint;
    const breakpointIs = this.offsetWidth < this.breakpointWidth ? "compact" : "desktop";

    this.breakpoint = breakpointIs;

    // If nothing has been touched and we move to mobile, the details nav should be shown,
    // not the item that was opened by default so the desktop design would work
    if (this._wrapper.hasAttribute("data-pristine") && breakpointIs === "compact") {
      const activeToggle = this.active ? document.getElementById(this.active) : false;
      if (activeToggle) {
        this._addCloseAttributes(activeToggle);
        this.removeAttribute("active");
      }
    }

    // If the breakpoint changed we need to set all aria attributes since the UI design pattern changes
    if (breakpointWas !== breakpointIs) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        const detailNavItem = this._slots.detailsNav[index];
        if (detailNavItem.id === this.active) {
          this._addActiveAttributes(detailNavItem);
        } else {
          this._addCloseAttributes(detailNavItem);
        }
      }
    }

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
    }
  }

  /**
   * Utility function to hide elements in details nav
   * @param {boolean} visible True to show nav elements, false to hide
   */
  _setDetailsNavVisibility(visible) {
    const leftColumnSlots = ["detailsNav", "detailsNavHeader", "detailsNavFooter"];
    // Manage detailsNav elements hidden attribute
    for (let index = 0; index < leftColumnSlots.length; index++) {
      const slotName = leftColumnSlots[index];
      for (let j = 0; j < this._slots[slotName].length; j++) {
        const detailNavItem = this._slots[slotName][j];
        detailNavItem.hidden = !visible;
      }
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

    detail.hidden = false;
    detail.removeAttribute("aria-hidden");
    detail.removeAttribute("tabindex");

    if (this.breakpoint === "desktop") {
      // Ideal toggle markup at desktop
      // [aria-selected=true]:not([aria-expanded])
      toggle.setAttribute("aria-selected", "true");
      toggle.removeAttribute("aria-expanded");
    }
    // Compact layout
    else {
      // Ideal toggle markup at mobile
      // [aria-expanded=true]:not([aria-selected])
      toggle.setAttribute("aria-expanded", "true");
      toggle.removeAttribute("aria-selected");
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

    detail.hidden = true;
    /**
     * A11y note:
     * tabindex = -1 removes element from the tab sequence, set when tab is not selected
     * so that only the active tab (selected tab) is in the tab sequence.
     * @see https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
     */
    detail.setAttribute("tabindex", "-1");
    detail.setAttribute("aria-hidden", "true");

    if (this.breakpoint === "desktop") {
      // Ideal toggle markup at desktop
      // [aria-selected=false]:not([aria-expanded])
      toggle.setAttribute("aria-selected", "false");
      toggle.removeAttribute("aria-expanded");
    }
    // Compact layout
    else {
      // aria-expanded attr on toggle since mobile view UI is a drawer dropdown
      // Ideal toggle markup at mobile
      // [aria-expanded=false]:not([aria-selected])
      toggle.setAttribute("aria-expanded", "false");
      toggle.removeAttribute("aria-selected");
    }
  }

  /**
   * Manages the back button's state attributes
   */
  _updateBackButtonState() {
    // Element is hidden with CSS at desktop layout
    if (this.breakpoint === "compact") {
      if (this.active) {
        this._detailsBackButton.setAttribute("aria-expanded", "true");
      } else {
        this._detailsBackButton.setAttribute("aria-expanded", "false");
      }
    }
  }

  /**
   * Handles changes in state
   * @param {object} e Event object
   */
  _handleHideShow(e) {
    const nextToggle = e.target;

    // Detect if handleHideShow was called by an event listener or manually in code
    if (typeof e === "object" && Array.isArray(e.path)) {
      // If the user has interacted with the component remove the pristine attribute
      this._wrapper.removeAttribute("data-pristine");
    }

    if (typeof nextToggle === "undefined") {
      return;
    }
    // If the clicked toggle is already open, no need to do anything
    else if (nextToggle.getAttribute("aria-selected") === "true" && nextToggle.id === this.active) {
      return;
    }

    const nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];
    const previousToggle = this.active ? document.getElementById(this.active) : false;
    const currentToggle = document.getElementById(this.active);

    // Update attribute to show which toggle is active
    this.active = nextToggle.id;

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

    // Make sure the aria-controls attribute is set to the details wrapper
    this._detailsBackButton.setAttribute("aria-controls", nextDetails.id);

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
    if (this.getAttribute("breakpoint") === "compact") {
      if (this.active) {
        this._setDetailsNavVisibility(false);
        this._detailsBackButton.focus();
      } else {
        this._setDetailsNavVisibility(true);
        if (previousToggle) {
          previousToggle.focus();
        }
      }
    }

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails,
      },
    });

    this._updateBackButtonState();
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

      // Set focus back to toggle that was activated
      detailNav.focus();
      this.removeAttribute("active");
    }
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
  _getFocusedPanel() {
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
  _getFocusedToggle() {
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
