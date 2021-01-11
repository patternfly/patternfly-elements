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
    this._menuDropdownMd = this.shadowRoot.getElementById(`${this.tag}__menu-wrapper`);
    this._secondaryLinksWrapper = this.shadowRoot.getElementById(`${this.tag}__secondary-links-wrapper`);
    this._searchToggle = this.shadowRoot.getElementById("secondary-links__button--search");
    this._searchSlot = this.shadowRoot.getElementById("search-slot");
    this._searchSpotXs = this.shadowRoot.getElementById(`${this.tag}__search-wrapper--xs`);
    this._searchSpotMd = this.shadowRoot.getElementById(`${this.tag}__search-wrapper--md`);
    this._allRedHatToggle = this.shadowRoot.getElementById("secondary-links__button--all-red-hat");
    this._allRedHatToggleBack = this.shadowRoot.getElementById(`${this.tag}__all-red-hat-toggle--back`);
    this._customLinksSlot = this.shadowRoot.getElementById(`${this.tag}--custom-links`);
    this._siteSwitcherWrapperOuter = this.shadowRoot.querySelector(`.${this.tag}__all-red-hat-wrapper`);
    this._siteSwitcherWrapper = this.shadowRoot.querySelector(`.${this.tag}__all-red-hat-wrapper__inner`);
    this._siteSwitchLoadingIndicator = this.shadowRoot.querySelector("#site-loading");
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._stickyHandler = this._stickyHandler.bind(this);

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
    this.getToggleElement = this.getToggleElement.bind(this);
    this.getDropdownElement = this.getDropdownElement.bind(this);
    this._isDevelopment = this._isDevelopment.bind(this);
    this._getParentToggleAndDropdown = this._getParentToggleAndDropdown.bind(this);
    this._changeNavigationState = this._changeNavigationState.bind(this);
    this.isMobileMenuButtonVisible = this.isMobileMenuButtonVisible.bind(this);
    this.isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed.bind(this);
    this._processSearchSlotChange = this._processSearchSlotChange.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._toggleMobileMenu = this._toggleMobileMenu.bind(this);
    this._toggleSearch = this._toggleSearch.bind(this);
    this._toggleAllRedHat = this._toggleAllRedHat.bind(this);
    this._allRedHatToggleBackClickHandler = this._allRedHatToggleBackClickHandler.bind(this);
    this._dropdownItemToggle = this._dropdownItemToggle.bind(this);
    this._addMenuBreakpoints = this._addMenuBreakpoints.bind(this);
    this._collapseMainMenu = this._collapseMainMenu.bind(this);
    this._collapseSecondaryLinks = this._collapseSecondaryLinks.bind(this);
    this._moveSearchSlot = this._moveSearchSlot.bind(this);
    this._postResizeAdjustments = this._postResizeAdjustments.bind(this);
    this._generalKeyboardListener = this._generalKeyboardListener.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._tabKeyEventListener = this._tabKeyEventListener.bind(this);

    // Handle updates to slotted search content
    this._searchSlot.addEventListener("slotchange", this._processSearchSlotChange);

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    // close All Red Hat menu and go back to mobile menu
    this._allRedHatToggleBack.addEventListener("click", this._allRedHatToggleBackClickHandler);

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

    const preResizeAdjustments = () => {
      this.classList.add("pfe-navigation--is-resizing");
    };
    this._debouncedPreResizeAdjustments = debounce(preResizeAdjustments, 150, true);
    window.addEventListener("resize", this._debouncedPreResizeAdjustments);
    this._debouncedPostResizeAdjustments = debounce(this._postResizeAdjustments, 150);
    window.addEventListener("resize", this._debouncedPostResizeAdjustments, { passive: true });
    this._wasMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    this._wasSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed();

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // If the nav is set to sticky, run the sticky handler and attach scroll event to window
    if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    // Make sure pfe-navigation or a parent is a header/role=banner element
    if (!this.hasAttribute("role") && this.getAttribute("role") !== "banner") {
      const closestHeader = this.closest('header, [role="banner"]');
      if (!closestHeader) {
        this.setAttribute("role", "banner");
        if (this._isDevelopment()) {
          console.log(`${this.tag}: Added role=banner to ${this.tag}`);
        }
      }
    }
  } // end connectedCallback()

  disconnectedCallback() {
    this._observer.disconnect();

    // @todo Remove all listeners to be thorough!
    window.removeEventListener("resize", this._debouncedPreResizeAdjustments);
    window.removeEventListener("resize", this._debouncedPostResizeAdjustments);
    this._slot.removeEventListener("slotchange", this._processSearchSlotChange);
    this._overlay.removeEventListener("click", this._overlayClickHandler);
    this._mobileToggle.removeEventListener("click", this._toggleMobileMenu);
    this._searchToggle.removeEventListener("click", this._toggleSearch);
    this._allRedHatToggle.removeEventListener("click", this._toggleAllRedHat);
    this._allRedHatToggleBack.removeEventListener("click", this._allRedHatToggleBackClickHandler);
    this.removeEventListener("keydown", this._generalKeyboardListener);
    this.removeEventListener("keydown", this._tabKeyEventListener);

    if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      window.removeEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    // log focused element - for development only
    // @todo: change anon function to be a property on the object so we can refer to it when we add the listener and remove it
    // this.shadowRoot.removeEventListener(
    //   "focusin",
    //   function(event) {
    //     console.log("focused: ", event.target);
    //   },
    //   true
    // );

    // Remove dropdown listeners
    const dropdownButtons = this.shadowRoot.querySelectorAll(".pfe-navigation__menu-link--has-dropdown");
    for (let index = 0; index < dropdownButtons.length; index++) {
      const dropdownButton = dropdownButtons[index];
      dropdownButton.removeEventListener("click", this._dropdownItemToggle);
    }
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return document.domain === "localhost" || this.hasAttribute("debug");
  }

  /**
   * Utility function to return DOM Object for a toggle, since it may be in the parent or shadow DOM
   * @param {string} toggleId Id of toggle to retrieve
   * @return {object} DOM Object of desired toggle
   */
  getToggleElement(toggleId) {
    if (toggleId.startsWith("pfe-navigation__custom-link--")) {
      return this.querySelector(`#${toggleId}`);
    } else {
      return this.shadowRoot.getElementById(toggleId);
    }
  }

  /**
   * Utility function to return DOM Object for a dropdown, since it may be in the parent or shadow DOM
   * @param {string} dropdownId Id of dropdown to retrieve
   * @return {object} DOM Object of desired dropdown
   */
  getDropdownElement(dropdownId) {
    if (dropdownId.startsWith("pfe-navigation__custom-dropdown--")) {
      return this.querySelector(`#${dropdownId}`);
    } else {
      return this.shadowRoot.getElementById(dropdownId);
    }
  }

  /**
   * Utility function that is used to display more console logging in non-prod env to debug focus state
   * for development only, should remove for final product
   * @param {boolean} debugFocus Optional. console log focused element
   */
  // @todo: decide if we should keep this debug feature in final product
  _isDebugFocus(debugFocus = false) {
    return debugFocus;
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
   * Utility function to set height of a dropdown
   * Depends on a dropdown having 2 wrappers and the parameter should be the outer wrapper
   * @param {object} dropdownWrapper DOM Object of dropdown wrapper
   */
  _setDropdownHeight(dropdownWrapper) {
    const dropdownHeight = dropdownWrapper.children[0].offsetHeight;
    if (typeof dropdownHeight === "number") {
      dropdownWrapper.style.setProperty("height", `${dropdownHeight}px`);
    } else {
      dropdownWrapper.style.setProperty("height", "auto");
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
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;

    if (toggleElement) {
      toggleId = toggleElement.getAttribute("id");
    }
    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.getAttribute("id");
    }
    if (debugNavigationState) {
      console.log("_addOpenDropdownAttributes", toggleId, dropdownWrapper.getAttribute("id"));
    }

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "true");
      toggleElement.setAttribute("aria-controls", dropdownWrapperId);

      // Main menu specific actions
      if (toggleId.startsWith("main-menu__")) {
        toggleElement.parentElement.classList.add("pfe-navigation__menu-item--open");
      }
    }

    if (dropdownWrapper) {
      dropdownWrapper.setAttribute("aria-hidden", "false");
      dropdownWrapper.classList.remove("pfe-navigation__dropdown-wrapper--invisible");

      // Setting up CSS transforms by setting height with JS
      let setHeight = false;

      // No animations at desktop, and for expanding elements in mobile menu dropdown
      if (toggleId) {
        if (
          this.isSecondaryLinksSectionCollapsed() &&
          (toggleId.startsWith("main-menu__button--") || toggleId.startsWith("pfe-navigation__custom-link--"))
        ) {
          setHeight = true;
        } else if (this.isMobileMenuButtonVisible() && toggleId.startsWith("main-menu__button--")) {
          setHeight = true;
        }
      }

      if (setHeight) {
        this._setDropdownHeight(dropdownWrapper);
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
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;

    if (toggleElement) {
      toggleId = toggleElement.getAttribute("id");
    }
    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.getAttribute("id");
    }
    if (debugNavigationState) {
      console.log("_closeDropdown", toggleId, dropdownWrapper.getAttribute("id"), invisibleDelay);
    }
    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "false");
      toggleElement.setAttribute("aria-controls", dropdownWrapperId);
      // Main menu specific code
      if (toggleId.startsWith("main-menu")) {
        toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
      }
    }

    // Handle dropdown wrapper
    if (dropdownWrapper) {
      dropdownWrapper.style.removeProperty("height");
      dropdownWrapper.setAttribute("aria-hidden", "true");

      if (invisibleDelay) {
        // Sometimes need a delay visibility: hidden so animation can finish
        window.setTimeout(
          () => dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible"),
          invisibleDelay // Should be slightly longer than the animation time
        );
      } else {
        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
      }
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
      // Ran into a circumstance where these elements didn't exist... ? Don't know how that's possible.
      if (this._menuDropdownXs) {
        this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown");
      }
      if (this._menuDropdownMd) {
        this._menuDropdownMd.classList.remove("pfe-navigation__mobile-dropdown");
      }
    }
  }

  /**
   * Get the dropdownId based on the toggleId
   * @param {string} toggleId ID of a toggle button
   * @return {string} ID of the corresponding dropdown
   */
  _getDropdownId(toggleId) {
    if (toggleId === "mobile__button") {
      if (this._currentMobileDropdown) {
        return this._currentMobileDropdown.getAttribute("id");
      }
    }
    if (toggleId.startsWith("main-menu")) {
      return this.shadowRoot.getElementById(toggleId).parentElement.dataset.dropdownId;
    }
    if (toggleId.startsWith("secondary-links")) {
      switch (toggleId) {
        case "secondary-links__button--search":
          return "pfe-navigation__search-wrapper--md";
        case "secondary-links__button--all-red-hat":
          return "secondary-links__dropdown--all-red-hat";
      }
    }

    const toggleElement = this.getToggleElement(toggleId);
    if (toggleElement && toggleElement.hasAttribute("aria-controls")) {
      return toggleElement.getAttribute("aria-controls");
    }
    console.error(`${this.tag}: Could not find corresponding dropdown for #${toggleId}`);
  }

  /**
   * Figure out if a toggle is a child of a dropdown, returns DOM Objects for the parent
   * @param {string} toggleId Id attribute of toggle
   * @return {array|false} An array with the DOM object of the toggle and the dropdown, in that order, false if it's not a child
   */
  _getParentToggleAndDropdown(toggleId) {
    if (toggleId.startsWith("main-menu") && this.isMobileMenuButtonVisible()) {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    if (this.isSecondaryLinksSectionCollapsed() && toggleId === "secondary-links__button--all-red-hat") {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    if (this.isSecondaryLinksSectionCollapsed() && toggleId.startsWith("pfe-navigation__custom-link--")) {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    return false;
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
    const toggleElementToToggle = this.getToggleElement(toggleId);

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

      this._addCloseDropdownAttributes(
        toggleElement,
        dropdownWrapper,
        // Only delay close attributes if secondary links are collapsed
        this.isSecondaryLinksSectionCollapsed() ? 300 : 0,
        debugNavigationState
      );

      // If we're backing out close child dropdown, but not parent
      let closed = false;
      if (backOut) {
        const parentToggleAndDropdown = this._getParentToggleAndDropdown(toggleIdToClose);
        if (parentToggleAndDropdown) {
          _openDropdown(parentToggleAndDropdown[0], parentToggleAndDropdown[1]);
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
      const parentToggleAndDropdown = this._getParentToggleAndDropdown(toggleId);
      // Don't close a parent dropdown if we're opening the child
      if (!parentToggleAndDropdown || parentToggleAndDropdown[0].getAttribute("id") !== currentlyOpenToggleId) {
        const openToggle = this.getToggleElement(currentlyOpenToggleId);
        const openDropdownId = this._getDropdownId(currentlyOpenToggleId);
        _closeDropdown(openToggle, this.getDropdownElement(openDropdownId));
      }
    }

    if (toState !== "close" && toState !== "open") {
      console.error(`${this.tag}: toState param was set to ${toState}, can only be 'close' or 'open'`);
    }

    // Update the element we came to update
    if (toState === "close") {
      _closeDropdown(toggleElementToToggle, this.getDropdownElement(dropdownId));
    } else if (toState === "open") {
      _openDropdown(toggleElementToToggle, this.getDropdownElement(dropdownId));
    }

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    shadowDomOuterWrapper.setAttribute(`${this.tag}-open-toggle`, this.getAttribute(`${this.tag}-open-toggle`));
    return toState === "open";
  } // end _changeNavigationState

  /**
   * Add a class to component wrapper if we have a search slot
   */
  _processSearchSlotChange() {
    if (this.hasSlot("pfe-navigation--search")) {
      this.classList.add("pfe-navigation--has-search");
    } else {
      this.classList.remove("pfe-navigation--has-search");
    }
  }

  /**
   * Creates HTML for icon in a secondary link
   * @param {string} icon Name of icon from pfe-icon
   * @return {object} DOM Object for pfe-icon
   */
  _createPfeIcon(icon) {
    const iconElement = document.createElement("pfe-icon");
    iconElement.setAttribute("icon", icon);
    iconElement.setAttribute("pfe-size", "sm");
    iconElement.setAttribute("aria-hidden", "true");
    return iconElement;
  }

  /**
   * Update alert count on a custom dropdown
   * @param {object} pfeNavigationDropdown DOM Object for the dropdown we need to update
   */
  _updateAlerts(pfeNavigationDropdown) {
    const toggle = pfeNavigationDropdown.parentElement.parentElement.querySelector(".pfe-navigation__custom-link");
    let alertsContainer = toggle.querySelector(".custom-link__alert-count");
    if (pfeNavigationDropdown.hasAttribute("pfe-alerts")) {
      if (!alertsContainer) {
        alertsContainer = document.createElement("div");
        alertsContainer.classList.add("custom-link__alert-count");
        alertsContainer.innerText = pfeNavigationDropdown.getAttribute("pfe-alerts");
        toggle.querySelector(".custom-link__icon-wrapper").append(alertsContainer);
      } else {
        alertsContainer.innerText = pfeNavigationDropdown.getAttribute("pfe-alerts");
      }
    } else if (alertsContainer) {
      alertsContainer.innerText = "";
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
    const cancelLightDomProcessingTags = ["PFE-NAVIGATION", "PFE-ICON", "PFE-NAVIGATION-DROPDOWN"];

    if (mutationList) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        const oneXSlotsNotIn2x = ["skip", "logo", "trigger", "tray"];

        if (mutationItem.type === "characterData") {
          // Process text changes
          cancelLightDomProcessing = false;
        }
        // Slotted tags and their children shouldn't cause lightDomProcessing
        // Unless it's a slot from 1.x that we're not using anymore
        else if (
          !mutationItem.target.hasAttribute("slot") ||
          oneXSlotsNotIn2x.includes(mutationItem.target.getAttribute("slot"))
        ) {
          const slottedParent = mutationItem.target.closest("[slot]");
          if (!slottedParent || oneXSlotsNotIn2x.includes(slottedParent.getAttribute("slot"))) {
            if (!cancelLightDomProcessingTags.includes(mutationItem.target.tagName)) {
              // If it's a pfe- attribute, assume we don't need to process the light dom
              if (mutationItem.attributeName) {
                cancelLightDomProcessing = false;
              }
              if (mutationItem.type === "childList") {
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
      if (this._isDevelopment()) {
        // Leaving this so we spot when the shadowDOM is being replaced when it shouldn't be
        // But don't want it firing in prod
        console.log(`${this.tag} Cancelled light DOM processing`, mutationList);
      }
      return;
    }

    // Begins the wholesale replacement of the shadowDOM -------------------------------
    if (this._isDevelopment()) {
      // Leaving this so we spot when the shadowDOM is being replaced when it shouldn't be
      // But don't want it firing in prod
      console.log(`${this.tag} _processLightDom: replacing shadow DOM`, mutationList);

      // set to true to log focused element, set to false to stop logging focused element, for development only, should remove for final product
      // @todo: change anon function to be a property on the object so we can refer to it when we add the listener and remove it
      // if (this._isDebugFocus(false)) {
      //   // log focused element
      //   this.shadowRoot.addEventListener(
      //     "focusin",
      //     function(event) {
      //       console.log("focused: ", event.target);
      //     },
      //     true
      //   );
      // }
    }
    // @todo look into only replacing markup that changed via mutationList
    // @todo Clone Node breaks event listeners, might need to think on this, we'll need to be able to maintain the lightDOM
    const shadowWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const shadowMenuWrapper = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    const newShadowMenuWrapper = document.createElement("nav");
    const shadowLogo = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");

    ///
    // @note v1.x markup:
    // Address skip links, put them at the beginning of the document
    // @todo Could check if mutationList is set, and if a mutation has occured in the skip links
    ///
    const htmlBody = document.querySelector("body");
    const skipLinks = this.querySelectorAll('[slot="skip"]');
    if (skipLinks) {
      // Wrapper used to make sure we don't duplicate skip links
      const skipLinksWrapper = document.createElement("div");
      skipLinksWrapper.id = "pfe-navigation__1x-skip-links";
      for (let index = 0; index < skipLinks.length; index++) {
        skipLinks[index].removeAttribute("slot");

        // Add visually-hidden to the link tags so we can show them when focused on with CSS
        if (skipLinks[index].tagName === "A") {
          skipLinks[index].classList.add("visually-hidden");
        } else {
          const theRealSkipLinks = skipLinks[index].querySelectorAll("a");
          for (let j = 0; j < theRealSkipLinks.length; j++) {
            theRealSkipLinks[j].classList.add("visually-hidden");
          }
        }
        skipLinksWrapper.append(skipLinks[index]);
      }

      // If we already have an oldSkipLinks, replace it
      const oldSkipLinksWrapper = document.getElementById("pfe-navigation__1x-skip-links");
      if (oldSkipLinksWrapper) {
        oldSkipLinksWrapper.replaceWith(skipLinksWrapper);
      } else {
        // Put skip links as the first thing after the body tag
        htmlBody.prepend(skipLinksWrapper);
      }
    }

    ///
    // Add the logo to the correct part of the shadowDom
    ///
    let lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    if (lightLogo) {
      if (shadowLogo) {
        shadowWrapper.replaceChild(lightLogo.cloneNode(true), shadowLogo);
      } else {
        shadowWrapper.prepend(lightLogo.cloneNode(true));
      }
    } else {
      // @note v1.x markup:
      // Address logo
      const logoLink = this.querySelector('[slot="logo"]');
      if (logoLink) {
        const logoLinkCopy = logoLink.cloneNode(true);
        const logoLinkWrapper = document.createElement("div");
        logoLinkWrapper.classList.add("pfe-navigation__logo-wrapper");
        logoLinkWrapper.setAttribute("id", "pfe-navigation__logo-wrapper");

        logoLinkCopy.removeAttribute("slot");
        logoLinkCopy.classList.add("pfe-navigation__logo-link");
        logoLinkWrapper.prepend(logoLinkCopy);

        // Add it to the shadow DOM
        const oldShadowLogoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
        if (oldShadowLogoWrapper) {
          oldShadowLogoWrapper.replaceWith(logoLinkWrapper);
        } else {
          shadowWrapper.prepend(logoLinkWrapper);
        }
      } else {
        console.error(`${this.tag}: Cannot find a logo in the component tag.`);
      }
    }

    ///
    // Add the menu to the correct part of the shadowDom
    ///
    let lightMenu = this.querySelector("#pfe-navigation__menu");
    let hasOneXMenuMarkup = false;
    const pfeNavigationMain = this.querySelector("pfe-navigation-main");
    if (pfeNavigationMain || this.querySelector("pfe-navigation-item")) {
      hasOneXMenuMarkup = true;
    }

    // @note v1.x markup:
    // Add selectors needed for the menu to behave well in 2.x
    if (!lightMenu) {
      if (pfeNavigationMain) {
        lightMenu = this.querySelector("pfe-navigation-main > ul");
        if (lightMenu && lightMenu.id !== "pfe-navigation__menu") {
          lightMenu.id = "pfe-navigation__menu";
          lightMenu.classList.add("pfe-navigation__menu");

          // Add necessary classes to li
          for (let index = 0; index < lightMenu.children.length; index++) {
            lightMenu.children[index].classList.add("pfe-navigation__menu-item");
          }
        }

        // Add necessary classes to top level links
        const oneXTopLevelLinks = lightMenu.querySelectorAll('[slot="trigger"] a');
        for (let index = 0; index < oneXTopLevelLinks.length; index++) {
          oneXTopLevelLinks[index].classList.add("pfe-navigation__menu-link");
        }
      }
    }

    ///
    // @note v1.x markup:
    // Address secondary links by adding
    ///
    let oneXSecondaryLinks = [];
    if (hasOneXMenuMarkup) {
      for (let index = 0; index < this.children.length; index++) {
        const pfeNavigationChild = this.children[index];
        if (pfeNavigationChild.tagName === "PFE-NAVIGATION-ITEM") {
          const trigger = pfeNavigationChild.querySelector('[slot="trigger"]');
          const triggerLink = trigger.querySelector("a");
          const tray = pfeNavigationChild.querySelector('[slot="tray"]');
          const shadowTrigger = triggerLink.cloneNode(true);
          if (tray) {
            const dropdown = document.createElement("pfe-navigation-dropdown");
            dropdown.setAttribute("pfe-width", "full");
            dropdown.setAttribute("pfe-icon", trigger.getAttribute("pfe-icon"));
            dropdown.setAttribute("pfe-name", triggerLink.innerHTML);
          } else {
            shadowTrigger.classList.add("pfe-navigation__custom-link");
            shadowTrigger.innerHTML = triggerLink.innerHTML;
            shadowTrigger.prepend(this._createPfeIcon(pfeNavigationChild.getAttribute("pfe-icon")));
            oneXSecondaryLinks.push(shadowTrigger);
          }
        }
      }
    }
    for (let index = 0; index < oneXSecondaryLinks.length; index++) {
      const liWrapper = document.createElement("li");
      liWrapper.setAttribute("slot", "pfe-navigation--custom-links");
      liWrapper.append(oneXSecondaryLinks[index]);
      this.append(liWrapper);
    }

    ///
    // Process Main Menu
    ///
    if (lightMenu) {
      //--------------------------------------------------
      // Begin best time to manipulate DOM in nav
      // Modify elements when they're in the shadow vars before they get appended to the shadow DOM
      //--------------------------------------------------

      // Add attributres we need on the shadow DOM menu wrapper
      newShadowMenuWrapper.setAttribute("id", "pfe-navigation__menu-wrapper");
      newShadowMenuWrapper.classList.add("pfe-navigation__menu-wrapper");

      // Copy light DOM menu into new wrapper, to be put in shadow DOM after manipulations
      newShadowMenuWrapper.append(lightMenu.cloneNode(true));

      // @note v1.x markup:
      // Address menu items by adding class hooks we need to import into shadowDom
      // and classes we need to maintain appropriate styles
      if (hasOneXMenuMarkup) {
        // Remove pfe-navigation-item tag, but keep the important children elements
        const pfeNavigationItems = newShadowMenuWrapper.querySelectorAll("pfe-navigation-item");
        for (let index = 0; index < pfeNavigationItems.length; index++) {
          const pfeNavigationItem = pfeNavigationItems[index];

          const menuListItem = pfeNavigationItem.closest("li");
          menuListItem.classList.add("pfe-navigation__menu-item");
          // Address menu toggle
          const menuItemLink = pfeNavigationItem.querySelector('[slot="trigger"] a');
          menuItemLink.classList.add("pfe-navigation__menu-link");
          menuListItem.prepend(menuItemLink);

          // Address menu dropdown
          const menuItemDropdown = pfeNavigationItem.querySelector(".pfe-navigation-grid");
          menuItemDropdown.classList.add("pfe-navigation__dropdown");
          menuListItem.append(menuItemDropdown);

          // Remove the rest
          menuListItem.removeChild(pfeNavigationItem);
        }
      }

      // Add menu dropdown toggle behavior
      const dropdowns = newShadowMenuWrapper.querySelectorAll(".pfe-navigation__dropdown");
      for (let index = 0; index < dropdowns.length; index++) {
        const dropdown = dropdowns[index];
        let dropdownLink = dropdown.parentElement.querySelector(".pfe-navigation__menu-link");

        // Convert dropdown links into buttons
        const dropdownButton = document.createElement("button");

        // Move over or add important attributes and content
        dropdownButton.setAttribute("class", dropdownLink.getAttribute("class"));
        dropdownButton.classList.add("pfe-navigation__menu-link--has-dropdown");
        // set aria-expanded to false initially bc they will be closed on page load
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
        dropdownButton.parentElement.dataset.buttonId = dropdownButtonId;

        // Create wrapper for dropdown and give it appropriate classes and attributes
        const dropdownWrapper = document.createElement("div");

        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
        if (dropdown.classList.contains("pfe-navigation__dropdown--single-column")) {
          dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--single-column");
        }
        dropdownWrapper.setAttribute("id", dropdownId);
        // set aria-hidden to true initially bc the content is hidden on page load
        dropdownWrapper.setAttribute("aria-hidden", "true");

        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
        dropdownWrapper.append(dropdown);
        dropdownButton.parentElement.append(dropdownWrapper);
        dropdownButton.parentElement.dataset.dropdownId = dropdownId;
        dropdownButton.setAttribute("aria-controls", dropdownId);
      }

      // Process Custom Dropdowns in secondary links area
      const pfeNavigationDropdowns = this.querySelectorAll("pfe-navigation-dropdown");
      for (let index = 0; index < pfeNavigationDropdowns.length; index++) {
        const pfeNavigationDropdown = pfeNavigationDropdowns[index];
        if (pfeNavigationDropdown.parentElement.getAttribute("slot") === "pfe-navigation--custom-links") {
          const requiredAttributes = ["pfe-name", "pfe-icon"];
          const attributeValues = {};
          for (let index = 0; index < requiredAttributes.length; index++) {
            const attribute = requiredAttributes[index];
            if (!pfeNavigationDropdown.hasAttribute(attribute)) {
              console.error(
                `${this.tag}: a pfe-navigation-dropdown in the custom-links slot is missing the attribute ${attribute}, which is required for this section`
              );
            } else {
              attributeValues[attribute] = pfeNavigationDropdown.getAttribute(attribute);
            }
          }
          if (requiredAttributes.length === Object.keys(attributeValues).length) {
            // Create toggle button
            const toggle = document.createElement("button");
            const iconWrapper = document.createElement("div");
            const toggleMachineName = this._createMachineName(attributeValues["pfe-name"]);
            const dropdownWrapper = document.createElement("div");
            const toggleAndDropdownWrapper = pfeNavigationDropdown.parentElement;
            const toggleId = `pfe-navigation__custom-link--${toggleMachineName}`;
            const dropdownId = `pfe-navigation__custom-dropdown--${toggleMachineName}`;

            toggle.innerText = attributeValues["pfe-name"];
            toggle.classList.add("pfe-navigation__custom-link");
            toggle.setAttribute("id", toggleId);
            toggle.addEventListener("click", this._dropdownItemToggle);

            iconWrapper.classList.add("custom-link__icon-wrapper");
            iconWrapper.prepend(this._createPfeIcon(attributeValues["pfe-icon"]));
            toggle.prepend(iconWrapper);

            // Add Dropdown attributes
            dropdownWrapper.setAttribute("id", dropdownId);
            dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
            dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
            dropdownWrapper.append(pfeNavigationDropdown);
            pfeNavigationDropdown.classList.add("pfe-navigation__dropdown");
            this._addCloseDropdownAttributes(toggle);

            if (pfeNavigationDropdown.hasAttribute("pfe-width")) {
              switch (pfeNavigationDropdown.getAttribute("pfe-width")) {
                case "single":
                  dropdownWrapper.classList.add("pfe-navigation__custom-dropdown--single-column");
                  toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper--single-column");
                  break;
                case "full":
                  dropdownWrapper.classList.add("pfe-navigation__custom-dropdown--full");
                  toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper--full");
                  break;
              }
            }

            // For some reason setting this earlier causes the value to be null in the DOM
            toggle.setAttribute("aria-controls", dropdownId);
            // Adding closed dropdown attributes
            this._addCloseDropdownAttributes(toggle, dropdownWrapper);

            // Add the toggle to DOM
            toggleAndDropdownWrapper.prepend(toggle);
            toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper");
            toggleAndDropdownWrapper.append(dropdownWrapper);

            // Deal with alerts on dropdown
            this._updateAlerts(pfeNavigationDropdown);

            // Set up observer to catch any updates to the alerts attribute
            const observerCallback = mutationList => {
              // Call updateAlerts for update targets (should only be 1 per update)
              for (let index = 0; index < mutationList.length; index++) {
                this._updateAlerts(mutationList[index].target);
              }
            };

            const alertsObserver = new MutationObserver(observerCallback);
            alertsObserver.observe(pfeNavigationDropdown, { attributeFilter: ["pfe-alerts"] });
          }
        } else {
          // @todo Process custom dropdowns for menus, need to figure out how that'll work
        }
      }
    }
    //--------------------------------------------------
    // End best time to manipulate DOM in nav
    //--------------------------------------------------

    // Replace the menu in the shadow DOM
    shadowMenuWrapper.parentElement.replaceChild(newShadowMenuWrapper, shadowMenuWrapper);

    // Re-set pointers to commonly used elements that just got paved over
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");

    // Add menu burger behavior
    this._mobileToggle.addEventListener("click", this._toggleMobileMenu);

    // Add search toggle behavior
    this._searchToggle.addEventListener("click", this._toggleSearch);

    // Add All Red Hat toggle behavior
    this._allRedHatToggle.addEventListener("click", this._toggleAllRedHat);

    // General keyboard listener attached to the entire component
    // @todo/bug: figure out why this event listener only fires once you have tabbed into the menu but not if you have just clicked open menu items with a mouse click on Firefox - functions properly on Chrome
    this.addEventListener("keydown", this._generalKeyboardListener);

    // Get all focusable elements inside of nav
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContentShadowDom = this.shadowRoot.querySelectorAll(focusableElements);
    // Get the last focusable element
    const lastFocusableElement = focusableContentShadowDom[focusableContentShadowDom.length - 1];

    // Tab key listener attached to the last focusable element in the component
    lastFocusableElement.addEventListener("keydown", this._tabKeyEventListener);

    // Give all dropdowns closed attributes by default
    const dropdownWrappers = this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper");
    if (dropdownWrappers) {
      for (let index = 0; index < dropdownWrappers.length; index++) {
        const dropdownWrapper = dropdownWrappers[index];
        this._addCloseDropdownAttributes(dropdownWrapper);
      }
    }

    // Set initial on page load aria settings on all original buttons and their dropdowns
    this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
    this._addCloseDropdownAttributes(this._searchToggle, this._searchSpotMd);
    this._addCloseDropdownAttributes(this._allRedHatToggle, this._siteSwitcherWrapperOuter);

    this._setCurrentMobileDropdown();

    // Make sure search slot is in the right spot, based on breakpoint
    this._moveSearchSlot();
    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    // Timeout lets these run a little later
    window.setTimeout(this._addMenuBreakpoints, 0);

    // Some cleanup and state management for after render
    const postProcessLightDom = () => {
      if (this.isMobileMenuButtonVisible() && !this.isOpen("mobile__button")) {
        this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
      }
    };

    window.setTimeout(postProcessLightDom, 10);
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
   */
  _addMenuBreakpoints() {
    let mainMenuRightBoundary = null;
    let secondaryLinksLeftBoundary = null;

    // Calculate space needed for logo
    if (this.logoSpaceNeeded === null) {
      const logoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
      if (logoWrapper) {
        const logoBoundingRect = logoWrapper.getBoundingClientRect();
        this.logoSpaceNeeded = Math.ceil(logoBoundingRect.right);
      }
    }

    // Calculate space needed for logo and main menu
    if (this.menuBreakpoints.mainMenu === null && !this.isMobileMenuButtonVisible()) {
      const navigation = this.shadowRoot.getElementById("pfe-navigation__menu");
      if (navigation) {
        const navigationBoundingRect = navigation.getBoundingClientRect();

        // Gets the length from the left edge of the screen to the right side of the navigation
        mainMenuRightBoundary = Math.ceil(navigationBoundingRect.right);
      }
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
      mainMenuBreakpoint.addEventListener("change", this._collapseMainMenu);
    }

    if (this.logoSpaceNeeded && secondaryLinksLeftBoundary) {
      // 60px is the width of the menu burger + some extra space
      this.menuBreakpoints.secondaryLinks = this.logoSpaceNeeded + secondaryLinksLeftBoundary + 60;

      const secondaryLinksBreakpoint = window.matchMedia(`(max-width: ${this.menuBreakpoints.secondaryLinks}px)`);
      secondaryLinksBreakpoint.addEventListener("change", this._collapseSecondaryLinks);
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
    const oldMobileDropdown = this._currentMobileDropdown;
    this._setCurrentMobileDropdown();
    const isMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    const isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed();
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    // const openToggle = openToggleId ? this.getToggleElement(openToggleId) : null;
    const openDropdownId = openToggleId ? this._getDropdownId(openToggleId) : null;
    const openDropdown = openDropdownId ? this.getDropdownElement(openDropdownId) : null;

    // If we went from mobile/tablet to desktop
    if (this._wasMobileMenuButtonVisible && !isMobileMenuButtonVisible) {
      this._removeDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);

      // Need to hide the overlay because it's not a dropdown at desktop
      if (this.isOpen("mobile__button")) {
        this._overlay.hidden = true;
      }

      if (this.isOpen("mobile__button")) {
        this.removeAttribute("pfe-navigation-open-toggle");
      }

      // If we haven't been able to yet, calculate the breakpoints
      if (this.menuBreakpoints.mainMenu === null) {
        this._addMenuBreakpoints();
      }

      // Nothing should have a height set in JS at desktop
      if (openDropdown) {
        openDropdown.style.removeProperty("height");
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
      // Add JS height to "All Red Hat Dropdown" if it's open
      const allRedHatDropdown = this.shadowRoot.getElementById(
        this._getDropdownId("secondary-links__button--all-red-hat")
      );
      if (allRedHatDropdown && this.isOpen("secondary-links__button--all-red-hat")) {
        this._addOpenDropdownAttributes(this._allRedHatToggle, allRedHatDropdown);
      }

      // Manage any items that have heights set in JS
      if (openToggleId) {
        if (openToggleId.startsWith("main-menu__button--")) {
          this._setDropdownHeight(openDropdown);
        } else if (openToggleId.startsWith("pfe-navigation__custom-link--")) {
          openDropdown.style.removeProperty("height");
        }
      }
    }
    // If we went from desktop/tablet to mobile
    else if (!this._wasSecondaryLinksSectionCollapsed && isSecondaryLinksSectionCollapsed) {
      // Remove height from All Red Hat at mobile since it's a slide over and not a dropdown
      const allRedHatDropdown = this.shadowRoot.getElementById(
        this._getDropdownId("secondary-links__button--all-red-hat")
      );
      if (allRedHatDropdown) {
        allRedHatDropdown.style.removeProperty("height");
      }

      // Manage any items that have heights set in JS
      if (openToggleId) {
        if (
          openToggleId.startsWith("main-menu__button--") ||
          openToggleId.startsWith("pfe-navigation__custom-link--")
        ) {
          this._setDropdownHeight(openDropdown);
        }
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
  _toggleMobileMenu(event) {
    if (!this.isOpen("mobile__button")) {
      this._changeNavigationState("mobile__button", "open");
    } else {
      this._changeNavigationState("mobile__button", "close");
    }
  }

  _toggleSearch(event) {
    this._changeNavigationState("secondary-links__button--search");
  }

  _toggleAllRedHat(event) {
    this._changeNavigationState("secondary-links__button--all-red-hat");
    if (this.isOpen("mobile__button")) {
      // if this is the mobile menu and the All Red Hat Toggle is clicked set focus to Back to Menu Button inside of All Red Hat Menu
      this._allRedHatToggleBack.focus();
    }
  }

  _dropdownItemToggle(event) {
    event.preventDefault();
    const dropdownItem = event.target;
    const toggleId = dropdownItem.getAttribute("id");
    this._changeNavigationState(toggleId);
  }

  /**
   * Default Keydown Keyboard event handler
   * @param {object} event
   */
  _generalKeyboardListener(event) {
    // @note: changed to event.key bc event.which is deprecated
    // see @resource: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
    const key = event.key;

    // @todo: add || keycode number
    if (key === "Escape") {
      const currentlyOpenToggleId = this.getAttribute(`${this.tag}-open-toggle`);
      const openToggle = this.getDropdownElement(currentlyOpenToggleId);
      const mobileMenuToggle = this.shadowRoot.querySelector("#mobile__button");

      event.preventDefault();
      event.stopPropagation();

      if (this.isSecondaryLinksSectionCollapsed()) {
        // Mobile
        // close mobile menu
        this._changeNavigationState("mobile__button", "close");
        // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
        mobileMenuToggle.focus();
      } else if (this.isMobileMenuButtonVisible()) {
        // Tablet-ish
        // if it's a child of main menu (e.g. currentlyOpenToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
        // Else close currentlyOpenToggleId -- desktop menu
        if (currentlyOpenToggleId.startsWith("main-menu")) {
          this._changeNavigationState("mobile__button", "close");
          // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
          mobileMenuToggle.focus();
        } else {
          this._changeNavigationState(currentlyOpenToggleId, "close");
          // Set the focus back onto the trigger toggle only when escape is pressed
          openToggle.focus();
        }
      } else {
        // Desktop
        // close desktop menu
        this._changeNavigationState(currentlyOpenToggleId, "close");
        // Set the focus back onto the trigger toggle only when escape is pressed
        openToggle.focus();
      }
    }
  }

  /**
   * Back to Menu Event Handler
   * close All Red Hat Menu and Goes back to Main Mobile Menu and sets focus back to All Red Hat Toggle
   */
  _allRedHatToggleBackClickHandler() {
    this._changeNavigationState("mobile__button", "open");
    this._allRedHatToggle.focus();
  }

  /**
   * Overlay Event Handler
   * close menu when overlay is clicked
   */
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

  /**
   * Sticky Handler
   * turn nav into sticky nav
   */
  _stickyHandler() {
    if (window.pageYOffset >= this.top) {
      this.classList.add("pfe-sticky");
    } else {
      this.classList.remove("pfe-sticky");
    }
  }

  /**
   * Tab Key Handler
   * Close all menus when nav loses keyboard focus
   */
  _tabKeyEventListener(event) {
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);

    // event.which for cross-browser compatibility
    const charCode = event.which || event.keyCode;

    if (charCode === 9) {
      if (event.shiftKey) {
        return false;
      } else {
        if (openToggleId === null) {
          return;
        } else {
          this._changeNavigationState(openToggleId, "close");
        }

        return true;
      }
    }
  }

  /**
   * All Red Hat Site Switcher XMLHttpRequest API Request
   * requests API content when All Red Hat button is clicked
   */
  _requestSiteSwitcher() {
    // @todo Since this is only a mock, only run this code when we're in dev
    if (this._isDevelopment()) {
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
}

PFElement.create(PfeNavigation);

class PfeNavigationDropdown extends PFElement {
  static get tag() {
    return "pfe-navigation-dropdown";
  }

  get schemaUrl() {
    return "pfe-navigation-dropdown.json";
  }

  get templateUrl() {
    return "pfe-navigation-dropdown.html";
  }

  get styleUrl() {
    return "pfe-navigation-dropdown.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {}

  constructor() {
    super(PfeNavigationDropdown, { type: PfeNavigationDropdown.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeNavigationDropdown.events.change, this._changeHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeNavigationDropdown.events.change, this._changeHandler);
  }

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return document.domain === "localhost";
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _changeHandler(event) {
    this.emitEvent(PfeNavigationDropdown.events.change, {
      detail: {}
    });
  }
}

PFElement.create(PfeNavigationDropdown);

export default PfeNavigation;
