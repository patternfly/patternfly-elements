import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";
import "../../pfe-progress-indicator/dist/pfe-progress-indicator.js";

/**
 * Closest Polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

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

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  characterData: true,
  attributes: true,
  subtree: true,
  childList: true
};

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  static get observedAttributes() {
    return [`${this.tag}-open-toggle`];
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    // Set pointers to commonly used elements
    this._mobileToggle = this.shadowRoot.getElementById("mobile__button");
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    this._secondaryLinksWrapper = this.shadowRoot.getElementById("pfe-navigation__secondary-links-wrapper");
    this._searchToggle = this.shadowRoot.getElementById("secondary-links__button--search");
    this._searchSlot = this.shadowRoot.getElementById("search-slot");
    this._searchSpotXs = this.shadowRoot.getElementById("pfe-navigation__search-wrapper--xs");
    this._searchSpotMd = this.shadowRoot.getElementById("pfe-navigation__search-wrapper--md");
    this._allRedHatToggle = this.shadowRoot.getElementById("secondary-links__button--all-red-hat");
    this._customLinksSlot = this.shadowRoot.getElementById("pfe-navigation--custom-links");
    this._siteSwitcherWrapper = this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-wrapper__inner");
    this._siteSwitchLoadingIndicator = this.shadowRoot.querySelector("#site-loading");
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);

    // Set default breakpoints to null (falls back to CSS)
    this.menuBreakpoints = {
      secondaryLinks: null,
      mainMenu: null
    };

    // Initializing vars on the instance of this navigation element
    this.windowInnerWidth = null;
    this.mainMenuButtonVisible = null;
    this.secondaryLinksSectionCollapsed = null;
    this._debouncedPreResizeAdjustments = null;
    this._debouncedPostResizeAdjustments = null;
    this.logoSpaceNeeded = null;
    this._currentMobileDropdown = null;
    // Used to track previous state for resize adjustments
    this._wasMobileMenuButtonVisible = null;
    this._wasSecondaryLinksSectionCollapsed = null;

    // Ensure 'this' is tied to the component object in these member functions
    this.isOpen = this.isOpen.bind(this);
    this._changeNavigationState = this._changeNavigationState.bind(this);
    this.isMobileMenuButtonVisible = this.isMobileMenuButtonVisible.bind(this);
    this.isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed.bind(this);
    this._processSearchSlotChange = this._processSearchSlotChange.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._toggleMobileMenu = this._toggleMobileMenu.bind(this);
    this._toggleSearch = this._toggleSearch.bind(this);
    this._toggleAllRedHat = this._toggleAllRedHat.bind(this);
    this._dropdownItemToggle = this._dropdownItemToggle.bind(this);
    this._addMenuBreakpoints = this._addMenuBreakpoints.bind(this);
    this._collapseMainMenu = this._collapseMainMenu.bind(this);
    this._collapseSecondaryLinks = this._collapseSecondaryLinks.bind(this);
    this._getDropdownHeights = this._getDropdownHeights.bind(this);
    this._moveSearchSlot = this._moveSearchSlot.bind(this);
    this._postResizeAdjustments = this._postResizeAdjustments.bind(this);
    this._menuToggleKeyboardListener = this._menuToggleKeyboardListener.bind(this);
    this._generalKeyboardListener = this._generalKeyboardListener.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);

    // Handle updates to slotted search content
    this._searchSlot.addEventListener("slotchange", this._processSearchSlotChange);

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    // ensure we close the whole menu and hide the overlay when the overlay is clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._processLightDom();
    this._requestSiteSwitcher();

    this._observer.observe(this, lightDomObserverConfig);

    this.search = this.querySelector(`[slot="${this.tag}--search"]`);
    this.customlinks = this.querySelector(`[slot="${this.tag}--customlinks"]`);

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.customlinks.addEventListener("slotchange", this._init);

    const preResizeAdjustments = () => {
      this.classList.add("pfe-navigation--is-resizing");
    };
    this._debouncedPreResizeAdjustments = debounce(preResizeAdjustments, 150, true);
    window.addEventListener("resize", this._debouncedPreResizeAdjustments);
    this._debouncedPostResizeAdjustments = debounce(this._postResizeAdjustments, 150);
    window.addEventListener("resize", this._debouncedPostResizeAdjustments, { passive: true });
    this._wasMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    this._wasSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed();
  }

  disconnectedCallback() {
    // @todo Remove all listeners to be thorogh!
    window.removeEventListener("resize", this._debouncedPreResizeAdjustments);
    window.removeEventListener("resize", this._debouncedPostResizeAdjustments);
    this._slot.removeEventListener("slotchange", this._processSearchSlotChange);
    this._overlay.removeEventListener("click", this._overlayClickHandler);
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return document.domain === "localhost";
  }

  /**
   * Checks to see if anything in the menu, or if a specific part of it is open
   * @param {string} toggleId Optional. Check if specific part of menu is open, if blank will check if anything is open
   * @return {boolean}
   */
  isOpen(toggleId) {
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    if (openToggleId) {
      if (typeof toggleId === "undefined") {
        // Something is open, and a toggleId wasn't set
        return true;
      }
      if (openToggleId.startsWith("main-menu") && toggleId === "mobile__button") {
        return true;
      }
      if (
        openToggleId === "secondary-links__button--all-red-hat" &&
        toggleId === "mobile__button" &&
        this.isSecondaryLinksSectionCollapsed()
      ) {
        return true;
      }

      // Only checks for prefix so if main-menu is queried and main-menu__dropdown--Link-Name is open it still evaluates as true
      // This prevents the main-menu toggle shutting at mobile when a sub-section is opened
      return toggleId === openToggleId;
    }

    return false;
  }

  /**
   * Use for elements that stop being dropdowns
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {boolean} debugNavigationState
   */
  _removeDropdownAttributes(toggleElement, dropdownWrapper, debugNavigationState = false) {
    let toggleId = null;

    if (toggleElement) {
      toggleId = toggleElement.getAttribute("id");
      toggleElement.removeAttribute("aria-expanded");
      toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
    }

    if (debugNavigationState) {
      console.log("_removeDropdownAttributes", toggleId, dropdownWrapper.getAttribute("id"));
    }

    if (dropdownWrapper) {
      dropdownWrapper.removeAttribute("aria-hidden");
      dropdownWrapper.classList.remove("pfe-navigation__dropdown-wrapper--invisible");
      dropdownWrapper.style.removeProperty("height");
    }
  }

  /**
   * Sets attributes for an open element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {boolean} debugNavigationState
   */
  _addOpenDropdownAttributes(toggleElement, dropdownWrapper, debugNavigationState = false) {
    let toggleId = null;
    if (toggleElement) {
      toggleId = toggleElement.getAttribute("id");
    }
    if (debugNavigationState) {
      console.log("_addOpenDropdownAttributes", toggleId, dropdownWrapper.getAttribute("id"));
    }

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "true");

      // Main menu specific actions
      if (toggleId.startsWith("main-menu__")) {
        toggleElement.parentElement.classList.add("pfe-navigation__menu-item--open");
      }
    }

    if (dropdownWrapper) {
      dropdownWrapper.setAttribute("aria-hidden", "false");
      dropdownWrapper.classList.remove("pfe-navigation__dropdown-wrapper--invisible");

      // Updating height via JS so we can animate it for CSS transitions
      if (parseInt(dropdownWrapper.dataset.height) > 30) {
        dropdownWrapper.style.setProperty("height", `${dropdownWrapper.dataset.height}px`);
      }
    }
  }

  /**
   * Sets attributes for a closed element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {number} invisibleDelay Delay on visibility hidden style, in case we need to wait for an animation
   * @param {boolean} debugNavigationState
   */
  _addCloseDropdownAttributes(toggleElement, dropdownWrapper, invisibleDelay = 0, debugNavigationState = false) {
    let toggleId = null;
    if (toggleElement) {
      toggleId = toggleElement.getAttribute("id");
    }
    if (debugNavigationState) {
      console.log("_closeDropdown", toggleId, dropdownWrapper.getAttribute("id"));
    }
    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "false");
      // Main menu specific code
      if (toggleId.startsWith("main-menu")) {
        toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
      }
    }

    if (dropdownWrapper) {
      dropdownWrapper.style.removeProperty("height");
      // Sometimes need a delay visibility: hidden so animation can finish
      window.setTimeout(
        () => dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible"),
        invisibleDelay // Should be slightly longer than the animation time
      );
      dropdownWrapper.setAttribute("aria-hidden", "true");
    }
  }

  /**
   * Create dash delimited string with no special chars for use in HTML attributes
   * @param {string}
   * @return {string} String that can be used as a class or ID (no spaces or special chars)
   */
  _createMachineName(text) {
    return (
      text
        // Get rid of special characters
        .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
        // Get rid of extra space
        .trim()
        // Replace remaining single spaces between words with -
        .replace(/[\s\-]+/g, "-")
    );
  }

  /**
   * Figures out if secondary links are collapsed
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isSecondaryLinksSectionCollapsed(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (
      forceRecalculation ||
      this.secondaryLinksSectionCollapsed === null ||
      window.innerWidth !== this.windowInnerWidth
    ) {
      if (this._isDevelopment()) {
        console.log(`${this.tag}: isSecondaryLinksSectionCollapsed recalculated`);
      }
      this.secondaryLinksSectionCollapsed =
        window.getComputedStyle(this._secondaryLinksWrapper, false).flexDirection === "column";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this.windowInnerWidth) {
        this.windowInnerWidth = window.innerWidth;
        // Update the other layout state function, but avoid infinite loop :P
        this.isMobileMenuButtonVisible(true);
      }
    }
    return this.secondaryLinksSectionCollapsed;
  }

  /**
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isMobileMenuButtonVisible(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (forceRecalculation || this.mainMenuButtonVisible === null || window.innerWidth !== this.windowInnerWidth) {
      if (this._isDevelopment()) {
        console.log(`${this.tag}: isMobileMenuButtonVisible recalculated`);
      }
      this.mainMenuButtonVisible = window.getComputedStyle(this._mobileToggle, false).display !== "none";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this.windowInnerWidth) {
        this.windowInnerWidth = window.innerWidth;
        this.isSecondaryLinksSectionCollapsed(true);
      }
    }
    return this.mainMenuButtonVisible;
  }

  /**
   * Sets this._currentMobileDropdown depending on breakpoint
   */
  _setCurrentMobileDropdown() {
    if (this.isMobileMenuButtonVisible()) {
      if (this.isSecondaryLinksSectionCollapsed()) {
        this._currentMobileDropdown = this._menuDropdownXs;
        this._currentMobileDropdown.classList.add("pfe-navigation__mobile-dropdown");
        this._menuDropdownMd.classList.remove("pfe-navigation__mobile-dropdown");
      } else {
        this._currentMobileDropdown = this._menuDropdownMd;
        this._currentMobileDropdown.classList.add("pfe-navigation__mobile-dropdown");
        this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown");
      }
    } else {
      this._currentMobileDropdown = null;
      this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown");
      this._menuDropdownMd.classList.remove("pfe-navigation__mobile-dropdown");
    }
  }

  /**
   * Get the dropdownId based on the toggleId
   * @param {string} toggleId ID of a toggle button
   * @return {string} ID of the corresponding dropdown
   */
  _getDropdownId(toggleId) {
    let dropdownId = null;
    if (toggleId.startsWith("secondary-links")) {
      switch (toggleId) {
        case "secondary-links__button--search":
          dropdownId = "pfe-navigation__search-wrapper--md";
          break;
        case "secondary-links__button--all-red-hat":
          dropdownId = "secondary-links__dropdown--all-red-hat";
          break;
      }
    } else if (toggleId === "mobile__button") {
      if (this.isMobileMenuButtonVisible()) {
        dropdownId = this._currentMobileDropdown.getAttribute("id");
      } else {
        return null;
      }
    } else if (toggleId.startsWith("main-menu")) {
      dropdownId = this.shadowRoot.getElementById(toggleId).parentElement.dataset.dropdownId;
    }

    if (dropdownId) {
      return dropdownId;
    }
    console.error(`${this.tag}: Could not find corresponding dropdown for #${toggleId}`);
  }

  /**
   * Manages all dropdowns and ensures only one is open at a time
   * @param {string} toggleId Id to use in pfe-navigation-open-toggle param
   * @param {string} toState Optional, use to set the end state as 'open' or 'close', instead of toggling the current state
   * @return {boolean} True if the final state is open, false if closed
   */
  _changeNavigationState(toggleId, toState) {
    const debugNavigationState = false; // Should never be committed as true

    if (debugNavigationState) {
      console.log("_changeNavigationState", toggleId, toState);
    }
    const isOpen = this.isOpen(toggleId);
    // Set toState param to go to opposite of current state if toState isn't set
    if (typeof toState === "undefined") {
      toState = isOpen ? "close" : "open";
    }
    const dropdownId = this._getDropdownId(toggleId);
    const currentlyOpenToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    const shadowDomOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const toggleElementToToggle = this.shadowRoot.getElementById(toggleId);

    /**
     * Local utility function to open a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     */
    const _openDropdown = (toggleElement, dropdownWrapper) => {
      const toggleIdToOpen = toggleElement.getAttribute("id");
      if (debugNavigationState) {
        console.log("openDropdown", toggleIdToOpen, dropdownWrapper.getAttribute("id"));
      }

      this._addOpenDropdownAttributes(toggleElement, dropdownWrapper, debugNavigationState);

      this.setAttribute(`${this.tag}-open-toggle`, toggleIdToOpen);

      // Show overlay
      this._overlay.hidden = false;
    };

    /**
     * Local utility function to close a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     * @param {boolean} backOut If we're in a subdropdown, should we keep the parent one open, false will close all dropdowns
     */
    const _closeDropdown = (toggleElement, dropdownWrapper, backOut = true) => {
      const toggleIdToClose = toggleElement.getAttribute("id");
      if (debugNavigationState) {
        console.log("_closeDropdown", toggleIdToClose, dropdownWrapper.getAttribute("id"), backOut);
      }

      this._addCloseDropdownAttributes(toggleElement, dropdownWrapper, 300, debugNavigationState);

      let closed = false;
      if (backOut) {
        if (toggleIdToClose.startsWith("main-menu") && this.isMobileMenuButtonVisible()) {
          // Back out to main-menu
          _openDropdown(this._mobileToggle, this.shadowRoot.getElementById("mobile__dropdown"));
          closed = true;
        } else if (
          this.isSecondaryLinksSectionCollapsed() &&
          toggleIdToClose === "secondary-links__button--all-red-hat"
        ) {
          _openDropdown(this._mobileToggle, this.shadowRoot.getElementById("mobile__dropdown"));
          closed = true;
        }
      }

      // If we weren't able to back out, close everything by removing the open-toggle attribute
      if (!closed) {
        this.removeAttribute(`${this.tag}-open-toggle`, "");
        this._overlay.hidden = true;
      }
    };

    // Shut any open dropdowns before we open any other
    if (currentlyOpenToggleId) {
      const openToggle = this.shadowRoot.getElementById(currentlyOpenToggleId);

      // Figure out we have a parent/child dropdown relationship
      // Main Menu / Mobile Menu relationship
      const toggleIdStartsWithMainMenu = toggleId.startsWith("main-menu");
      const openingMainMenuAndMobileToggleOpen =
        toggleIdStartsWithMainMenu && currentlyOpenToggleId === "mobile__button";
      // All Red Hat is only a child 'dropdown' at mobile
      const openingAllRedHatAndIsMobileAndMobileToggleOpen =
        toggleId === "secondary-links__button--all-red-hat" &&
        this.isSecondaryLinksSectionCollapsed() &&
        currentlyOpenToggleId === "mobile__button";

      console.log(
        "Parent/Child dropdown situation?",
        openingMainMenuAndMobileToggleOpen,
        openingAllRedHatAndIsMobileAndMobileToggleOpen
      );

      // Don't close a parent dropdown if we're opening the child
      if (!openingMainMenuAndMobileToggleOpen && !openingAllRedHatAndIsMobileAndMobileToggleOpen) {
        const openDropdownId = this._getDropdownId(currentlyOpenToggleId);
        _closeDropdown(openToggle, this.shadowRoot.getElementById(openDropdownId));
      }
    }

    if (toState !== "close" && toState !== "open") {
      console.error(`${this.tag}: toState param was set to ${toState}, can only be 'close' or 'open'`);
    }

    // Update the element we came to update
    if (toState === "close") {
      _closeDropdown(toggleElementToToggle, this.shadowRoot.getElementById(dropdownId));
    } else if (toState === "open") {
      _openDropdown(toggleElementToToggle, this.shadowRoot.getElementById(dropdownId));
    }

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    shadowDomOuterWrapper.setAttribute(`${this.tag}-open-toggle`, this.getAttribute(`${this.tag}-open-toggle`));
    return toState === "open";
  } // end _changeNavigationState

  // Add a class to component wrapper if we have a search slot
  _processSearchSlotChange() {
    if (this.has_slot("pfe-navigation--search")) {
      this.classList.add("pfe-navigation--has-search");
    } else {
      this.classList.remove("pfe-navigation--has-search");
    }
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   * @param {array} mutationList Provided by mutation observer
   */
  // @todo: processLightDom seems to be firing twice, need to look into this and see whether that is okay or if it needs to be fixed, seems like it is not a good thing but not sure if it is avoidable or not
  _processLightDom(mutationList) {
    // If we're mutating because an attribute on the web component starting with pfe- changed, don't reprocess dom
    let cancelLightDomProcessing = true;
    let componentClassesChange = false;
    const cancelLightDomProcessingTags = ["PFE-NAVIGATION", "PFE-ICON"];

    if (mutationList) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        if (mutationItem.type === "characterData") {
          // Process text changes
          cancelLightDomProcessing = false;
        }
        // Slotted tags and their children shouldn't cause lightDomProcessing
        else if (!mutationItem.target.closest("[slot]") && !mutationItem.target.hasAttribute("slot")) {
          if (!cancelLightDomProcessingTags.includes(mutationItem.target.tagName)) {
            if (mutationItem.attributeName && !mutationItem.attributeName.startsWith("pfe-")) {
              // If it's a pfe- attribute, assume we don't need to process the light dom
              cancelLightDomProcessing = false;
            }
          } else if (
            mutationItem.target.tagName === "PFE-NAVIGATION" &&
            mutationItem.type === "attributes" &&
            mutationItem.attributeName === "class"
          ) {
            componentClassesChange = true;
          }
        }
      }
    } else {
      // If there isn't a mutationList it's because this is on connectedCallback
      cancelLightDomProcessing = false;
    }

    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Handle class updates to the parent component
    // Copying them to shadow DOM to avoid compound :host() selectors
    if (componentClassesChange) {
      const shadowDomOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
      shadowDomOuterWrapper.setAttribute("class", `pfe-navigation__wrapper ${this.getAttribute("class")}`);
    }

    if (cancelLightDomProcessing) {
      // Reconnecting mutationObserver for IE11 & Edge
      if (window.ShadyCSS) {
        this._observer.observe(this, lightDomObserverConfig);
      }
      return;
    }

    // Begins the wholesale replacement of the shadowDOM -------------------------------
    if (this._isDevelopment()) {
      // Leaving this so we spot when the shadowDOM is being replaced when it shouldn't be
      // But don't want it firing in prod
      console.log(`${this.tag} _processLightDom: replacing shadow DOM`, mutationList);
    }
    // @todo look into only replacing markup that changed via mutationList
    const shadowWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const shadowMenuWrapper = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    const newShadowMenuWrapper = document.createElement("nav");
    const shadowLogo = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
    const lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    const lightMenu = this.querySelector("#pfe-navigation__menu");

    // Add attributres we need on the shadow DOM menu wrapper
    newShadowMenuWrapper.setAttribute("id", "pfe-navigation__menu-wrapper");
    newShadowMenuWrapper.classList.add("pfe-navigation__menu-wrapper");

    // Add the logo to the correct part of the shadowDom
    if (lightLogo) {
      if (shadowLogo) {
        shadowWrapper.replaceChild(lightLogo.cloneNode(true), shadowLogo);
      } else {
        shadowWrapper.prepend(lightLogo.cloneNode(true));
      }
    }

    // Copy light DOM menu into new wrapper, to be put in shadow DOM after manipulations
    newShadowMenuWrapper.append(lightMenu.cloneNode(true));

    // Add menu dropdown toggle behavior
    const dropdowns = newShadowMenuWrapper.querySelectorAll(".pfe-navigation__dropdown");
    for (let index = 0; index < dropdowns.length; index++) {
      const dropdown = dropdowns[index];
      const dropdownLink = dropdown.parentElement.querySelector(".pfe-navigation__menu-link");

      // Convert dropdown links into buttons
      const dropdownButton = document.createElement("button");
      // Move over or add important attributes and content
      dropdownButton.setAttribute("class", dropdownLink.getAttribute("class"));
      dropdownButton.classList.add("pfe-navigation__menu-link--has-dropdown");
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownButton.innerHTML = dropdownLink.innerHTML;
      dropdownButton.dataset.machineName = this._createMachineName(dropdownLink.text);

      // Add dropdown behavior
      dropdownButton.addEventListener("click", this._dropdownItemToggle);
      dropdownLink.parentElement.replaceChild(dropdownButton, dropdownLink);

      // Set Id's for the button and dropdown and add their ID's to the parent li for easy access
      const dropdownButtonId = `main-menu__button--${dropdownButton.dataset.machineName}`;
      const dropdownId = `main-menu__dropdown--${dropdownButton.dataset.machineName}`;
      dropdownButton.setAttribute("id", dropdownButtonId);
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownButton.parentElement.dataset.buttonId = dropdownButtonId;

      // Create wrapper for dropdown and give it appropriate classes and attributes
      const dropdownWrapper = document.createElement("div");
      // Find other dropdowns by using the .dropdown-content class (such as Search/All Red Hat)
      // @todo: figure out if this is causing inconsistent toggling of aria-hidden
      // const otherDropDowns = this.shadowRoot.querySelector(".dropdown-content");

      dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
      if (dropdown.classList.contains("pfe-navigation__dropdown--single-column")) {
        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--single-column");
      }
      dropdownWrapper.setAttribute("id", dropdownId);
      dropdownWrapper.setAttribute("aria-hidden", "true");
      dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
      dropdownWrapper.append(dropdown);
      dropdownButton.parentElement.append(dropdownWrapper);
      dropdownButton.parentElement.dataset.dropdownId = dropdownId;
      dropdownButton.setAttribute("aria-controls", dropdownId);
    }

    // Replace the menu in the shadow DOM
    shadowMenuWrapper.parentElement.replaceChild(newShadowMenuWrapper, shadowMenuWrapper);

    // Re-set pointers to commonly used elements that just got paved over
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");

    // Add menu burger behavior
    this._mobileToggle.addEventListener("click", this._toggleMobileMenu);
    this._mobileToggle.addEventListener("keydown", this._menuToggleKeyboardListener);

    // Add search toggle behavior
    this._searchToggle.addEventListener("click", this._toggleSearch);

    // Add All Red Hat toggle behavior
    this._allRedHatToggle.addEventListener("click", this._toggleAllRedHat);

    // General keyboard listener attached to the entire component
    this.addEventListener("keydown", this._generalKeyboardListener);

    // Give all dropdowns aria-hidden since they're shut by default
    // @todo/note: this only adds aria-hidden to the main menu dropdown links and not the utility buttons (Search/All Red Hat), added aria-hidden attr in the pfe-nav shadow DOM template for now, need to figure out best way to do this dynamically
    this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper").setAttribute("aria-hidden", "true");

    // Give Search dropdown, All Red Hat Dropdown aria-hidden since they're shut by default
    // @todo: added this logic, uses .dropdown-content class on the dropdown content divs, need to verify that this logic is reasonable and if so add the notes to the documentation about the class
    // @todo: need to figure out best way to manage the dynamic setting of aria-hidden when custom link gets used as a dropdown instead by content editors and other dev teams
    // @todo/note: tried this method of dynamically setting the aria-hidden attr for other dropdowns but I was having an issue with inconsistent toggling of the aria-hidden attr for the search dropdown so commented it out for now, this code might be conflicting with logic elsewhere for aria-hidden?
    // this.shadowRoot.querySelectorAll(".dropdown-content").forEach(element => {
    //   element.setAttribute("aria-hidden", "true");
    //   // added this for local testing
    //   if (this._isDevelopment()) {
    //     console.log(`inside of forEach for .dropdown-content`);
    //     console.log(element);
    //   }
    // });
    this._setCurrentMobileDropdown();

    // Make sure search slot is in the right spot, based on breakpoint
    this._moveSearchSlot();
    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    // Timeout lets these run a little later
    window.setTimeout(this._addMenuBreakpoints, 0);
    window.setTimeout(this._getDropdownHeights, 0);

    // Some cleanup and state management for after render
    const postProcessLightDom = () => {
      if (this.isMobileMenuButtonVisible() && !this.isOpen("mobile__button")) {
        this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
      }
    };

    window.setTimeout(postProcessLightDom, 10);
  }

  /**
   * Caches the heights of the dropdowns for animation
   */
  _getDropdownHeights() {
    if (this._isDevelopment()) {
      console.log(`${this.tag}: _getDropdownHeights recalculated`);
    }
    const mainMenuDropdowns = this.shadowRoot.querySelectorAll(".pfe-navigation__dropdown");
    for (let index = 0; index < mainMenuDropdowns.length; index++) {
      const dropdown = mainMenuDropdowns[index];
      const dropdownHeight = dropdown.offsetHeight;
      dropdown.parentElement.dataset.height = dropdownHeight;
      // Update the height inline style of any open dropdown
      if (dropdown.parentElement.hasAttribute("style") && dropdown.parentElement.style.height) {
        dropdown.parentElement.style.height = `${dropdownHeight}px`;
      }
    }

    const otherDropdowns = [];

    // @todo Get Mobile menu height reliably so we can animate it
    // Get height of mobile menu if we're using a mobile menu
    // if (this.isMobileMenuButtonVisible()) {
    //   otherDropdowns.push(this.shadowRoot.querySelector(".pfe-navigation__outer-menu-wrapper__inner"));
    // }

    // Get height of secondary links if they're not in the mobile menu
    if (!this.isSecondaryLinksSectionCollapsed()) {
      otherDropdowns.push(this.querySelector('[slot="pfe-navigation--search"]'));
      otherDropdowns.push(this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-wrapper__inner"));
    }

    for (let index = 0; index < otherDropdowns.length; index++) {
      // @todo Not working yet These other dropdowns need style & JS logic love
      const dropdown = otherDropdowns[index];
      const dropdownHeight = dropdown.offsetHeight;
      dropdown.parentElement.dataset.height = dropdownHeight;
      // Update the height inline style of any open dropdown
      if (dropdown.parentElement.hasAttribute("style") && dropdown.parentElement.style.height) {
        dropdown.parentElement.style.height = `${dropdownHeight}px`;
      }
    }
  }

  /**
   * Behavior for main menu breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseMainMenu(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-main-menu");
    } else {
      this.classList.remove("pfe-navigation--collapse-main-menu");
    }
  }

  /**
   * Behavior for secondary links breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseSecondaryLinks(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-secondary-links");
    } else {
      this.classList.remove("pfe-navigation--collapse-secondary-links");
    }
  }

  /**
   * Calculate the points where the main menu and secondary links should be collapsed and adds them
   * @todo Run this if layout breaks nav-expand breakpoint and secondary-links-expand breakpoint
   * @todo Clear/update inline heights on resize
   */
  _addMenuBreakpoints() {
    let mainMenuRightBoundary = null;
    let secondaryLinksLeftBoundary = null;

    // Calculate space needed for logo
    if (this.logoSpaceNeeded === null) {
      const logoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
      const logoBoundingRect = logoWrapper.getBoundingClientRect();
      this.logoSpaceNeeded = Math.ceil(logoBoundingRect.right);
    }

    // Calculate space needed for logo and main menu
    if (this.menuBreakpoints.mainMenu === null && !this.isMobileMenuButtonVisible()) {
      const navigation = this.shadowRoot.getElementById("pfe-navigation__menu");
      const navigationBoundingRect = navigation.getBoundingClientRect();

      // Gets the length from the left edge of the screen to the right side of the navigation
      mainMenuRightBoundary = Math.ceil(navigationBoundingRect.right);
    }

    // Calculate space needed for right padding and secondary links
    if (this.menuBreakpoints.secondaryLinks === null && !this.isSecondaryLinksSectionCollapsed()) {
      let leftMostSecondaryLink = this._searchToggle;

      // @todo if Search isn't present, check for custom links, if that isn't present use All Red Hat

      const leftMostSecondaryLinkBoundingRect = leftMostSecondaryLink.getBoundingClientRect();
      // Gets the length from the right edge of the screen to the left side of the left most secondary link
      secondaryLinksLeftBoundary = window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);
    }

    // Get Main Menu Breakpoint
    if (mainMenuRightBoundary && secondaryLinksLeftBoundary && this.logoSpaceNeeded) {
      this.menuBreakpoints.mainMenu = mainMenuRightBoundary + secondaryLinksLeftBoundary;

      const mainMenuBreakpoint = window.matchMedia(`(max-width: ${this.menuBreakpoints.mainMenu}px)`);
      mainMenuBreakpoint.addListener(this._collapseMainMenu);
    }

    if (this.logoSpaceNeeded && secondaryLinksLeftBoundary) {
      // 60px is the width of the menu burger + some extra space
      this.menuBreakpoints.secondaryLinks = this.logoSpaceNeeded + secondaryLinksLeftBoundary + 60;

      const secondaryLinksBreakpoint = window.matchMedia(`(max-width: ${this.menuBreakpoints.secondaryLinks}px)`);
      secondaryLinksBreakpoint.addListener(this._collapseSecondaryLinks);
    }
  }

  /**
   * Depending on breakpoint we need to move the search slot to one of two places to make a logical tab order
   */
  _moveSearchSlot() {
    if (this.isSecondaryLinksSectionCollapsed()) {
      this._removeDropdownAttributes(null, this._searchSpotMd);
      if (this._searchSlot.parentElement !== this._searchSpotXs) {
        this._searchSpotXs.appendChild(this._searchSlot);
      }
    } else {
      if (this._searchSlot.parentElement !== this._searchSpotMd) {
        this._searchSpotMd.appendChild(this._searchSlot);
      }
      if (this.isOpen("secondary-links__button--search")) {
        this._addOpenDropdownAttributes(null, this._searchSpotMd);
      } else {
        this._addCloseDropdownAttributes(null, this._searchSpotMd);
      }
    }
  }

  /**
   * Adjustments to behaviors and DOM that need to be made after a resize event
   */
  _postResizeAdjustments() {
    this._getDropdownHeights();
    const oldMobileDropdown = this._currentMobileDropdown;
    this._setCurrentMobileDropdown();
    const isMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    const isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed();

    // If we went from mobile/tablet to desktop
    if (this._wasMobileMenuButtonVisible && !isMobileMenuButtonVisible) {
      this._removeDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);

      // Need to hide the overlay because it's not a dropdown at desktop
      if (this.isOpen("mobile__button")) {
        this._overlay.hidden = true;
      }

      // If we haven't been able to yet, calculate the breakpoints
      if (this.menuBreakpoints.mainMenu === null) {
        this._addMenuBreakpoints();
      }
    }
    // If we went from desktop to tablet/mobile
    else if (!this._wasMobileMenuButtonVisible && isMobileMenuButtonVisible) {
      if (this.isOpen("mobile__button")) {
        this._addOpenDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
        // Need to show the overlay if the mobile dropdown is open now that it's a dropdown again
        this._overlay.hidden = false;
      } else {
        this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
      }
    }

    // If the mobile dropdown has changed, remove the dropdown attributes from the old one
    if (this._currentMobileDropdown !== oldMobileDropdown && oldMobileDropdown !== null) {
      this._removeDropdownAttributes(null, oldMobileDropdown);
    }

    // Make sure search slot is in the right spot, based on breakpoint
    this._moveSearchSlot();

    // ! These lines need to be at the end of this function
    this.classList.remove("pfe-navigation--is-resizing");
    // Set layout state vars for next resize
    this._wasMobileMenuButtonVisible = isMobileMenuButtonVisible;
    this._wasSecondaryLinksSectionCollapsed = isSecondaryLinksSectionCollapsed;
  }

  /**
   * Event listeners for toggles
   */
  _toggleMobileMenu() {
    if (!this.isOpen("mobile__button")) {
      this._changeNavigationState("mobile__button", "open");
    } else {
      this._changeNavigationState("mobile__button", "close");
    }
  }

  _toggleSearch() {
    this._changeNavigationState("secondary-links__button--search");
  }

  _toggleAllRedHat() {
    this._changeNavigationState("secondary-links__button--all-red-hat");
  }

  _dropdownItemToggle(event) {
    event.preventDefault();
    const dropdownItem = event.target;
    const toggleId = dropdownItem.getAttribute("id");
    this._changeNavigationState(toggleId);
  }

  /**
   * Default Toggle Button Keyboard event handler
   * @param {object} event
   */
  _menuToggleKeyboardListener(event) {
    // const target = event.target;
    const keyCode = event.which;

    // RIGHT
    if (keyCode === 39) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // LEFT
    else if (keyCode === 37) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Left Button', $menuToggleButton);
      // menuToggleShut(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postShutCallback
      // );
    }
    // DOWN
    else if (keyCode === 40) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // UP
    else if (keyCode === 38) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Up Button', $menuToggleButton);
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // ESCAPE
    else if (keyCode === 27) {
      const currentlyOpenToggleId = this.getAttribute(`${this.tag}-open-toggle`);
      const openToggle = this.shadowRoot.getElementById(currentlyOpenToggleId);
      // console.log('pressed escape, toggle button', $menuToggleButton);
      event.preventDefault();
      event.stopPropagation();
      this._changeNavigationState("mobile__button", "close");
      // Set the focus back onto the trigger toggle only when escape is pressed
      // @todo figure out if this can be down without repetition of code
      openToggle.focus();
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // Space or Enter
    else if (keyCode === 13 || keyCode === 32) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleToggleState(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postOpenCallback,
      //   postShutCallback
      // );
    }
  }

  /**
   * Default Toggle Button Keyboard event handler
   * @param {object} event
   */
  _generalKeyboardListener(event) {
    const target = event.target;
    const keyCode = event.which;

    // RIGHT
    if (keyCode === 39) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // LEFT
    else if (keyCode === 37) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Left Button', $menuToggleButton);
      // menuToggleShut(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postShutCallback
      // );
    }
    // DOWN
    else if (keyCode === 40) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // UP
    else if (keyCode === 38) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Up Button', $menuToggleButton);
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // ESCAPE
    else if (keyCode === 27) {
      const currentlyOpenToggleId = this.getAttribute(`${this.tag}-open-toggle`);
      const openToggle = this.shadowRoot.getElementById(currentlyOpenToggleId);
      // console.log('pressed escape, toggle button', $menuToggleButton);
      event.preventDefault();
      event.stopPropagation();
      const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
      if (openToggleId) {
        this._changeNavigationState(openToggleId, "close");
        // Set the focus back onto the trigger toggle only when escape is pressed
        // @todo figure out if this can be down without repetition of code
        openToggle.focus();
      }
    }
    // Space or Enter
    else if (keyCode === 13 || keyCode === 32) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleToggleState(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postOpenCallback,
      //   postShutCallback
      // );
    }
  }

  // close menu when overlay is clicked
  _overlayClickHandler() {
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    this._changeNavigationState(openToggleId, "close");
    if (this.isSecondaryLinksSectionCollapsed()) {
      // Mobile
      // close mobile menu
      this._changeNavigationState("mobile__button", "close");
    } else if (this.isMobileMenuButtonVisible()) {
      // Tablet-ish
      // if it's a child of main menu (e.g. openToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
      // Else close openToggleId -- desktop menu
      if (openToggleId.startsWith("main-menu")) {
        this._changeNavigationState("mobile__button", "close");
      } else {
        this._changeNavigationState(openToggleId, "close");
      }
    } else {
      // Desktop
      // close desktop menu
      this._changeNavigationState(openToggleId, "close");
    }
  }

  _requestSiteSwitcher() {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // Hopping out to elements folder in case we're testing a component that isn't pfe-navigation
      xhr.open("GET", "../../pfe-navigation/mock/site-switcher.html");
      xhr.responseType = "text";

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.responseText);
        } else {
          resolve(xhr.responseText);
          this._siteSwitcherWrapper.innerHTML = xhr.responseText;
        }
      };

      xhr.onerror = err => {
        this._siteSwitchLoadingIndicator.setAttribute("hidden", true);
        reject(err, "Something went wrong.");
      };

      xhr.send();
    });
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
