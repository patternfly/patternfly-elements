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

    // A11y Features: add keydown event listener to activate keyboard controls
    this.addEventListener("keydown", this._a11yKeyBoardControls);
  }

  disconnectedCallback() {
    this._observer.disconnect();

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
    toggle.setAttribute("aria-hidden", "true");

    // Add active tab state to tab that is active on page load
    if (toggle.hasAttribute("aria-selected") && toggle.getAttribute("aria-selected") === "true") {
      toggle.setAttribute("tabindex", "0");
      toggle.setAttribute("aria-hidden", "false");
    }

    toggle.addEventListener("click", this._handleHideShow);

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
    detail.setAttribute("tabindex", "-1");
    detail.setAttribute("aria-hidden", "true");

    // Add active tab panel state to tab panel that is active on page load
    if (detail.hasAttribute("aria-hidden") && detail.getAttribute("aria-hidden") === "false") {
      detail.setAttribute("tabindex", "0");
      detail.setAttribute("aria-hidden", "false");
      detail.classList.add("a11y-visible");
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

    // Set inital aria attributes state for details-nav--footer
    // Set details-nav--footer to be hidden from screen-readers by default and remove from tab order
    this._slots.detailsNavFooter.forEach((element) => {
      element.setAttribute("tabindex", "-1");
      element.setAttribute("aria-hidden", "true");
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
    nextDetails.classList.add("a11y-visible");


    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails
      }
    });
  } // end _handleHideShow()

  /**
   * A11y features
   * @todo (KS): figure out how to fix the tab order for the footer region in the tabs
   */

  // Check if active element is a tab toggle
  _isToggle(element) {
    return element.getAttribute("slot") === "details-nav";
  }

  // Might need in the future
  // Check if active element is a tab panel
  _isPanel(element) {
    console.log(element.getAttribute("slot") === "details");
    return element.getAttribute("slot") === "details";
  }

  // Get all tab toggles
  _getAllToggles() {
    return this._slots.detailsNav;
  }

  // Get all tab panels as an array
  _getAllPanels() {
    return this._slots.details;
  }

  // Get the corresponding active tab panel for the active tab toggle
  _getPanelForToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement);

    return toggles[newIndex % toggles.length].nextElementSibling;
  }

  // Get last item in active tab panel
  _getLastItem() {
    const panels = this._getAllPanels();
    const activePanel = this._getPanelForToggle();
    const activePanelChildren = [...activePanel.children];

    return activePanelChildren[activePanelChildren.length - 1];
  }

  // Get previous toggle in relation to the active toggle
  _getPrevToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) - 1;

    return toggles[(newIndex + toggles.length) % toggles.length];
  }

  // Get next toggle in relation to the active toggl
  _getNextToggle() {
    const toggles = this._getAllToggles();
    let newIndex = toggles.findIndex(toggle => toggle === document.activeElement) + 1;

    return toggles[newIndex % toggles.length];
  }

  // Get first toggle in the toggle list
  _getFirstToggle() {
    const firstToggle = this._getAllToggles;

    return firstToggle[0];
  }

  // Get last toggle in the toggle list
  _getLastToggle() {
    const lastToggle = this._getAllToggles;

    return lastToggle[lastToggle.length - 1];
  }

  // Manual user activation vertical tab
  _a11yKeyBoardControls(event) {
    const currentToggle = event.target;
    // const tabFooter = this.shadowRoot.querySelector('slot[name="details-nav--footer"]');
    const tabFooterLightDom = document.querySelector("[slot='details-nav--footer']");

    // const tabFooterLightDom = this.getSlot("details-nav--footer");
    // console.log(tabFooterLightDom);
    // console.log(tabFooter);

    if (!this._isToggle(currentToggle)) {
      return;
    }

    let newToggle;
    let activePanel;

    switch (event.key) {
      // case "Tab":
      // Tab (Default tab behavior)
      /// When focus moves into the tab list, places focus on the active tab element
      /// When the focus is in the tab list, move focus away from active tab element to next element in tab order which is the tabpanel element
      /// When focus is moved outside of the tab list focus moves to the next focusable item in the DOM order

      case "Tab":
        activePanel = this._getPanelForToggle();

        if (event.shiftKey) {
          activePanel.setAttribute("tabindex", "0");
          activePanel.setAttribute("aria-hidden", "false");
          activePanel.classList.add("a11y-visible");
        }

        if (activePanel) {
          const lastItem = this._getLastItem();

          if (event.shiftKey) {
            return;
          }

          lastItem.addEventListener("focusout", event => {
            // Set aria attributes for details-nav--footer to active state
            // Set details-nav--footer to be visible to screen-readers and add it to the tab order
            // debugger;
            tabFooterLightDom.setAttribute("tabindex", "0");
            tabFooterLightDom.setAttribute("aria-hidden", "false");

            tabFooterLightDom.focus();
            // @todo figure out visil issue with adding these attrs to the active tab panel (ul gets visibly hidden)
            activePanel.setAttribute("tabindex", "-1");
            activePanel.setAttribute("aria-hidden", "true");
          });
        }
        // End tab feature so it does not conflict with the arrow keys feature
        return;

        // newToggle = currentToggle;
        // console.log(newToggle);
        break;

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
