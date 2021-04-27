// -- @TODO Set icons to hide if they all fail to load, else set them to preserve space

// Import polyfills: filter, matches, closest, includes, path
import "./polyfills--pfe-navigation.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";
import PfeNavigationMain from "./pfe-navigation-main.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";

const observerAttributes = {
  childList: true,
  subtree: true,
  characterData: true
};

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  //-- Key values map to slot names, accepts an array for [min, max] breakpoint
  //-- leave off 'px', if slot name includes a dash, quote the key
  get breakpoints() {
    // If only one value exists in the array, it starts at that size and goes up
    return {
      main: [1200], // horizontal from 1200px +
      search: [768], // visible from 768px +
      "mobile-search": [0, 767],
      language: [768],
      "mobile-language": [0, 767],
      login: [768],
      "mobile-login": [0, 767],
      "site-switcher": [0]
    };
  }

  set breakpoints(obj) {
    return obj;
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(state) {
    if (state) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");

      // This prevents background scroll while nav is open
      // document.body.style.overflow = "hidden";

      this._wrapper.setAttribute("aria-expanded", "true");
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");

      // Allow background to scroll again
      // document.body.style.overflow = "auto";

      this._wrapper.setAttribute("aria-expanded", "false");
    }
  }

<<<<<<< HEAD
  get horizontal() {
    return this.hasAttribute("horizontal");
  }

  set horizontal(bool) {
    bool = Boolean(bool);

    if (bool) {
      this.setAttribute("horizontal", "");
      if (this._desktop) this._desktop.removeAttribute("hidden");
      if (this._mobile) this._mobile.setAttribute("hidden", "");
    } else {
      this.removeAttribute("horizontal");
      if (this._desktop) this._desktop.setAttribute("hidden", "");
      if (this._mobile) this._mobile.removeAttribute("hidden");
    }
  }

  get isSticky() {
    return this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false";
  }

  static get observedAttributes() {
    return ["pfe-full-width", "pfe-sticky", "pfe-close-on-click"];
  }

=======
  static get properties() {
    return {
      fullWidth: {
        title: "Full Width",
        type: Boolean,
        cascade: ["pfe-navigation-item"]
      },
      pfeFullWidth: {
        type: Boolean,
        cascade: ["pfe-navigation-item"],
        prefix: false,
        alias: "fullWidth"
      }
    };
  }

>>>>>>> 4454e8389b7d09ecd2cf1501cb3fda6e61f94020
  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setVisibility = this._setVisibility.bind(this);

    // -- handlers
    this._resizeHandler = this._resizeHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);

    this._accordionEventMap = this._accordionEventMap.bind(this);

    this._observer = new MutationObserver(this._init);

    this._desktop = this.shadowRoot.querySelector(`.${this.tag}__main--horizontal`);
    this._mobile = this.shadowRoot.querySelector(`.${this.tag}__main--dropdown`);
    this._mobileTemplate = this.shadowRoot.querySelector("#accordion-item");

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._wrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._menuItem = this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-menu-dropdown]`);

    this._slots = {
      skip: this.shadowRoot.querySelector(`.${this.tag}__skip`),
      language: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-language]`),
      login: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-login]`)
    };

    // Initialize
    this._navigationItems = [];
    this.overlay = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // Wait until the item and main navigation are defined
    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
<<<<<<< HEAD
      // Watch for screen resizing, don't wrap this in a timeout because it
      // adds a very obvious delay in rendering that is a bad user experience
      window.addEventListener("resize", this._resizeHandler);
=======
      // If this element contains light DOM, initialize it
      if (this.hasLightDOM()) {
        // If only one value exists in the array, it starts at that size and goes up
        this.breakpoints = {
          main: [0, 1023], // visible from 0 - 1200px
          search: [640], // visible from 768px +
          "mobile-search": [0, 639],
          language: [640],
          "mobile-language": [0, 639],
          login: [640],
          "mobile-login": [0, 639]
        };

        // Kick off the initialization of the light DOM elements
        this._init();
>>>>>>> 4454e8389b7d09ecd2cf1501cb3fda6e61f94020

      // If this element contains light DOM, set up the observer
      if (!this.children.length) {
        console.error(
          `${this.tag}: does not have any light DOM elements. Please check documentation for requirements.`
        );

        // Attach an observer for dynamically injected content
        this._observer.observe(this, observerAttributes);
      } else {
        this._init();
      }
    });

    // make sure we close all of the nav items and hide the overlay
    // when it's clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);

    // Listen for open and close events - change event?
    this.addEventListener(PfeNavigationItem.events.open, this._overlayClickHandler);
    this.addEventListener(PfeNavigationItem.events.close, this._overlayClickHandler);
  }

  // TODO come back to this
  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if (this.isSticky) {
      window.removeEventListener("scroll", this._stickyHandler);
    }

    this.removeEventListener(PfeAccordion.events.change, this._accordionEventMap);

    if (this.has_slot("skip")) {
      [...this.querySelectorAll("[slot=skip] a")].map(link => link.removeEventListener("focus", this._focusHandler));
      [...this.querySelectorAll("[slot=skip] a")].map(link => link.removeEventListener("blur", this._blurHandler));
    }

    this._observer.disconnect();
  }

  _resizeHandler(event) {
    // Set the visibility of items
    this._setVisibility(this.offsetWidth);

    // Check what the active item is
    this._navigationItems.forEach(item => {
      // If the item is open but not visible, update it to hidden
      if (item.expanded && !item.visible) {
        item.expanded = false;
      } else if (item.expanded && item.parent && item.parent.visible) {
        // if the parent is the mobile menu item and the size of the window is within
        // the main breakpoint, make sure that the mobile menu is expanded
        if (item.parent === this._menuItem && window.innerWidth <= this.breakpoints.main[1]) {
          item.parent.expanded = true; // Ensure the parent is open
        }
      }
    });

    // update the reported height
    this._reportHeight();
  }

  _stickyHandler() {
    if (this.isSticky) {
      if (window.pageYOffset >= this.top) {
        this.classList.add("is-sticky");
      } else {
        this.classList.remove("is-sticky");
      }
    }
  }

  _setVisibility(width) {
    // Cast the width as a number
    console.log(width); // IE check TODO delete
    width = Number.parseInt(width);

    // Iterate over the breakpoints object
    Object.keys(this.breakpoints).forEach(label => {
      let bps = this.breakpoints[label];
      // First item in the array is the min-width
      let start = Number.parseInt(bps[0]);
      // Second item in the array is the max-width
      let end = Number.parseInt(bps[1]);

      // Throw a warning if more than 2 items are in the array
      if (bps.length > 2)
        console.warn(`${this.tag}: Breakpoints must be provided with an array of 1 or 2 items. See documentation.`);

      //  Initialize the visibility boolean to false
      let isVisible = false;

      // If the slot exists, set attribute based on supported breakpoints
      if (!Number.isNaN(start) && this.has_slots(label)) {
        // Iterate over each node in the slot
        this.slots[label].nodes.forEach(node => {
          // If the browser width falls between the start & end points
          if (width >= start && (!end || (end && width <= end))) {
            isVisible = true;
          }

          switch (label) {
            case "main":
              // "isVisible" maps to the horizontal state of the main tag
              this.querySelector(`${PfeNavigationMain.tag}`).horizontal = isVisible;
              this._menuItem.setAttribute("horizontal", "");

              if (!isVisible) {
                this._menuItem.close();
                this._menuItem.removeAttribute("horizontal");
              }
              break;
            case (label.match(/^mobile/) || {}).input:
              const desktopVersion = this._slots[label.slice(7)];
              const shadowVersion = this.shadowRoot.querySelector(`[is-${label.slice(7)}]`);

              if (desktopVersion) {
                if (desktopVersion.tagName === PfeNavigationItem.tag.toUpperCase()) {
                  desktopVersion.visible = !isVisible;
                } else if (isVisible) {
                  // If this is visible, hide the desktop counterpart
                  desktopVersion.setAttribute("hidden", "");
                } else {
                  // If this is hidden, reveal the desktop counterpart
                  desktopVersion.removeAttribute("hidden");
                }
              }
            // ^ Do not use break here because we want to run default as well
            default:
              // If it's a navigation item, use the built in setters
              if (node.tagName === PfeNavigationItem.tag.toUpperCase()) {
                node.visible = isVisible;
              }
              // Otherwise, this is raw mark-up and we need to toggle it using the hidden attribute
              else if (isVisible) {
                // Preferably toggle it from the shadow version only
                if (shadowVersion) {
                  shadowVersion.removeAttribute("hidden");
                }
                // Remove hidden from the node either way
                node.removeAttribute("hidden");
              } else {
                // If it's not visible, add the hidden attribute
                // Preferably toggle it from the shadow version only
                if (shadowVersion) {
                  node.removeAttribute("hidden");
                  shadowVersion.setAttribute("hidden", "");
                } else {
                  node.setAttribute("hidden", "");
                }
              }
              break;
          }
        });
      }
    });
  }

  _init() {
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    // was: navItems
    this._navigationItems = [...this.querySelectorAll(`${PfeNavigationItem.tag}`)];

    // Get any nav items contained in the shadow DOM
    if (this.shadowRoot.querySelectorAll(`${PfeNavigationItem.tag}`)) {
      this._navigationItems = this._navigationItems.concat([
        ...this.shadowRoot.querySelectorAll(`${PfeNavigationItem.tag}`)
      ]);
    }

    // Build the mobile accordion
    this._buildMobileAccordion();

    // Then set the visibility of the slots
    this._setVisibility(this.offsetWidth);

    // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
    if (this.isSticky) {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", this._stickyHandler);
    }

    // Listen for clicks on the overlay element
    if (this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      this._overlay.addEventListener("click", this._overlayClickHandler);
    }

    // report the height of this pfe-navigation element
    this._reportHeight();

    // Watch the light DOM link for focus and blur events
    if (this.has_slot("skip")) {
      [...this.querySelectorAll("[slot=skip] a")].map(link => link.addEventListener("focus", this._focusHandler));
      [...this.querySelectorAll("[slot=skip] a")].map(link => link.addEventListener("blur", this._blurHandler));
    }

    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, observerAttributes);
        return true;
      }, 0);
    }
  }

  _buildMobileAccordion() {
    let fragment = new DocumentFragment();

    // For each nested navigation item, tag it with context
    [...this.querySelectorAll(PfeNavigationItem.tag)].forEach(item => {
      let randomID = this.randomId;

      // Build the accordion for mobile by cloning the template
      let clone = this._mobileTemplate.content.cloneNode(true);

      // Build the header
      let header = clone.querySelector("pfe-accordion-header");
      // Create an ID for the navigation item and the header if it doesn't exist
      if (!item.id) {
        item.id = randomID;
        header.setAttribute("connected-to", randomID);
      } else {
        header.setAttribute("connected-to", item.id);
      }

      // Clone the trigger, the slot itself typically has the h-level tag
      let trigger = item.querySelector(":not([slot='tray'])").cloneNode(true);
      // Remove the slot attribute
      trigger.removeAttribute("slot");

      // TODO - build a mutation observer to watch the header and panels separately?
      header.appendChild(trigger);

      //-- Build the panel

      // Capture the tray element
      const tray = item.querySelector("[slot=tray]");
      let panel = clone.querySelector("pfe-accordion-panel");
      if (tray) {
        panel.innerHTML = tray.innerHTML;
      } else {
        header.setAttribute("is-direct-link", "");
      }

      // Attach the header to the clone
      clone.appendChild(header);

      if (tray) {
        // Attach the panel to the clone
        clone.appendChild(panel);
      }

      // Attach the clone to the fragment
      fragment.appendChild(clone);
    });

    // Attach the accordion items once
    this._mobile.appendChild(fragment);

    this.addEventListener(PfeAccordion.events.change, this._accordionEventMap);
  }

  // Clicking on the accordion should map to a click on a nav item
  _accordionEventMap(event) {
    if (event.detail) {
      let accordionItem = event.detail.el;
      let navItemId = accordionItem ? accordionItem.getAttribute("connected-to") : null;
      let navItem = navItemId ? this._navigationItems.find(item => item.id === navItemId) : null;
      if (navItem) navItem.toggle(event);
      else console.warn(`A ${PfeNavigationItem.tag} with id ${navItemId} could not be found.`);
    }
  }

  // Close everything when the overlay is clicked
  _overlayClickHandler(event) {
    this._navigationItems.map(item => {
      if (item.isVisible && item.expanded) item.close();
    });
    // Close the overlay
    this.overlay = false;
  }

  /**
   * Set a global CSS variable reporting the height of this navigation item.
   * Used to position sticky subnavigation items under this.
   *
   * The name of the global CSS variable is `--pfe-navigation--Height--actual`.
   */
  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const height = this.clientHeight + "px";
    document.body.style.setProperty(cssVarName, height);
  }

  // On skip focus, add a focus class
  _focusHandler(event) {
    this._slots.skip.classList.add("focus-within");
  }

  // On skip focus out, remove the focus class
  _blurHandler(event) {
    this._slots.skip.classList.remove("focus-within");
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
