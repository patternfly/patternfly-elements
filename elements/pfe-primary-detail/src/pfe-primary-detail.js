import PFElement from "../../pfelement/dist/pfelement.js";

// list of attributes that we DO NOT want to pass
// to our shadow DOM. For example, the style attribute
// could ruin our encapsulated styles in the shadow DOM
const denyListAttributes = ["style"];

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  childList: true
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
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
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
      },
      breakpointWidth: {
        type: Number,
        default: 800
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
    this.closeAll = this.closeAll.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._a11yKeyBoardControls = this._a11yKeyBoardControls.bind(this);
    this._a11yFocusStyleHandler = this._a11yFocusStyleHandler.bind(this);
    this._setBreakpoint = this._setBreakpoint.bind(this);

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
    this._detailsWrapperHeader = this.shadowRoot.getElementById("details-wrapper__header");
    this._detailsWrapperHeading = this.shadowRoot.getElementById("details-wrapper__heading");
    this._detailsBackButton = this.shadowRoot.getElementById("details-wrapper__back");

    this._debouncedSetBreakpoint = null;

    // Store all focusable element types in variable
    this._focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  }

  connectedCallback() {
    super.connectedCallback();

    // Add appropriate markup and behaviors if DOM is ready
    if (this.hasLightDOM()) {
      this._processLightDom();
    }

    this._debouncedSetBreakpoint = debounce(this._setBreakpoint, 100);
    window.addEventListener("resize", this._debouncedSetBreakpoint);

    // Process the light DOM on any update
    this._observer.observe(this, lightDomObserverConfig);

    // @todo Translate
    this._detailsBackButton.innerText = "Back";
    this._detailsBackButton.addEventListener("click", this.closeAll);

    // A11y Features: add keydown event listener to activate keyboard controls
    this.addEventListener("keydown", this._a11yKeyBoardControls);

    // A11y Features: add class to all focusable elements for focus indicator styles
    this._a11yFocusStyleHandler();
  }

  disconnectedCallback() {
    this._observer.disconnect();

    window.removeEventListener(this._debouncedSetBreakpoint);

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }

    // Remove keydown event listener if component disconnects
    this.removeEventListener("keydown", this._a11yKeyBoardControls);
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    // Don't re-init anything that's been initialized already
    if (detailNavElement.dataset.index && detailNavElement.id) {
      // Make sure the data-index attribute is up to date in case order has changed
      detailNavElement.dataset.index = index;
      return;
    }

    const createToggleButton = detailNavElement.tagName !== "BUTTON";
    let toggle = null;

    if (createToggleButton) {
      let attr = detailNavElement.attributes;
      toggle = document.createElement("button");

      toggle.innerHTML = detailNavElement.innerHTML;

      // Copy over attributes from original element that aren't in denyList
      [...attr].forEach(detailNavElement => {
        if (!denyListAttributes.includes(detailNavElement.name)) {
          toggle.setAttribute(detailNavElement.name, detailNavElement.value);
        }
      });

      toggle.dataset.wasTag = detailNavElement.tagName;
      toggle.setAttribute("role", "tab");
      toggle.setAttribute("aria-selected", "false");
      toggle.setAttribute("tabindex", "-1");
      toggle.setAttribute("aria-hidden", "true");

      // If the detailNavElement does not have a ID, set a unique ID
      if (!detailNavElement.id) {
        toggle.setAttribute(
          "id",
          `pfe-detail-toggle-${Math.random()
            .toString(36)
            .substr(2, 9)}`
        );
      }
    } else {
      toggle = detailNavElement;
    }

    // Add active tab state to tab that is active on page load
    if (toggle.hasAttribute("aria-selected") && toggle.getAttribute("aria-selected") === "true") {
      toggle.setAttribute("tabindex", "0");
      toggle.setAttribute("aria-hidden", "false");
    }

    toggle.addEventListener("click", this._handleHideShow);
    this._slots.detailsNav[index] = toggle;
    toggle.dataset.index = index;

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
    detail.setAttribute("tabindex", "-1");
    detail.setAttribute("aria-hidden", "true");

    // Add active tab panel state to tab panel that is active on page load
    if (detail.hasAttribute("aria-hidden") && detail.getAttribute("aria-hidden") === "false") {
      detail.setAttribute("tabindex", "0");
      detail.setAttribute("aria-hidden", "false");
    }

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
   * Evaluate whether component is smaller than breakpoint and set or unset
   */
  _setBreakpoint() {
    if (this.offsetWidth < this.breakpointWidth) {
      this.setAttribute("breakpoint", "compact");
    } else {
      this.removeAttribute("breakpoint");

      // Desktop should never have nothing selected, default to first item if nothing is selected
      if (!this.getAttribute("active")) {
        this._handleHideShow({ target: this._slots.detailsNav[0] });
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

    this._setBreakpoint();
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

    // Update attribute to show which toggle is active
    this.setAttribute("active", nextToggle.id);

    // Create the appropriate heading for what's open and replace the old heading
    let newHeading = null;
    if (nextToggle.dataset.wasTag && nextToggle.dataset.wasTag.substr(0, 1) === "H") {
      newHeading = document.createElement(nextToggle.dataset.wasTag);
    } else {
      newHeading = document.createElement("strong");
    }
    newHeading.innerText = nextToggle.innerText;
    newHeading.id = this._detailsWrapperHeading.id;
    this._detailsWrapperHeading.replaceWith(newHeading);
    this._detailsWrapperHeading = newHeading;

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
      // Set current toggle's attribute to inactive state
      currentToggle.setAttribute("tabindex", "-1");
      currentToggle.setAttribute("aria-hidden", "true");

      // Set Current Detail's attributes to inactive state
      currentDetails.setAttribute("tabindex", "-1");
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

    /**
      A11y note:
      tabindex = 0 ensures the tabpanel is in the tab sequence, helps AT move to panel content, helps ensure correct behaviour (especially when the tabpanel does NOT contain any focusable elements)

      @resource:
      https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
    */
    // Explicitly set tabindex 0 bc heading is being used instead of button to fix IE11 issues
    nextToggle.setAttribute("tabindex", "0");
    nextToggle.setAttribute("aria-hidden", "false");

    // Add inactive attributes to Next Details
    nextDetails.setAttribute("tabindex", "0");
    nextDetails.setAttribute("aria-hidden", "false");

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails
      }
    });
  } // end _handleHideShow()

  /**
   * Closes the open toggle and details
   */
  closeAll() {
    const activeToggle = this.querySelector('[aria-selected="true"]');
    const activeDetails = document.getElementById(activeToggle.getAttribute("aria-controls"));

    activeToggle.setAttribute("aria-selected", "false");
    // @todo Consider focused instead of focus-styles
    activeToggle.classList.remove("focus-styles");

    activeDetails.setAttribute("aria-hidden", "true");
    this.removeAttribute("active");
  }

  /**
   * A11y features:
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
   * Get all tab toggles
   */
  _getAllToggles() {
    return this._slots.detailsNav;
  }

  /**
   * Get all tab panels as an array
   */
  _getAllPanels() {
    return this._slots.details;
  }

  /**
   * Get the corresponding active tab panel for the active tab toggle
   */
  _getActivePanel() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement);

    return toggles[newIndex % toggles.length].nextElementSibling;
  }

  /**
   * Get last item in active tab panel
   */
  _getLastItem() {
    const panels = this._getAllPanels();
    const activePanel = this._getActivePanel();
    const activePanelChildren = [...activePanel.children];

    return activePanelChildren[activePanelChildren.length - 1];
  }

  /**
   * Get previous toggle in relation to the active toggle
   */
  _getPrevToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) - 1;

    return toggles[(newIndex + toggles.length) % toggles.length];
  }

  /**
   * Get currently active toggle
   */
  _getActiveToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement);

    return toggles[newIndex % toggles.length];
  }

  /**
   * Get next toggle in relation to the active toggle
   */
  _getNextToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) + 1;

    return toggles[newIndex % toggles.length];
  }

  /**
   * Get first toggle in the toggle list
   */
  _getFirstToggle() {
    const firstToggle = this._getAllToggles;

    return firstToggle[0];
  }

  /**
   * Get last toggle in the toggle list
   */
  _getLastToggle() {
    const lastToggle = this._getAllToggles;

    return lastToggle[lastToggle.length - 1];
  }

  /**
   * Focus styles class
   * Add class to focusable elements in order to style with the :focus/:hover psuedo selectors
   */
  _a11yFocusStyleHandler() {
    const componentFocusableElements = this.querySelectorAll(this._focusableElements);

    componentFocusableElements.forEach(element => {
      element.classList.add("focus-styles");
    });
  }

  /**
   * Manual user activation vertical tab
   * @param {event} Target event
   */
  _a11yKeyBoardControls(event) {
    // @todo Add Escape control for compact sizes
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
        // Down Arrow/Right Arrow
        /// When tab has focus:
        /// Moves focus to previous tab
        /// If focus is on the first tab, moves to the last tab
        /// Activates the newly focused tab

        newToggle = this._getNextToggle();
        break;

      case "Home":
        // Home
        //// When a tab has focus, moves focus to the first tab

        newToggle = this._getFirstToggle();
        break;

      case "End":
        // End
        /// When a tab has focus, moves focus to the last tab

        newToggle = this._getLastToggle();
        break;

      default:
        return;
    }

    newToggle.focus();
  } // end _a11yKeyBoardControls()
} // end Class

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
