// -- @TODO Set icons to hide if they all fail to load, else set them to preserve space

// Import polyfills: filter, matches, closest, includes, path
import "./polyfills--pfe-navigation.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";
import PfeNavigationMain from "./pfe-navigation-main.js";

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

  static get observedAttributes() {
    return ["pfe-full-width", "pfe-sticky", "pfe-close-on-click"];
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setVisibility = this._setVisibility.bind(this);

    // -- handlers
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);

    this._observer = new MutationObserver(this._init);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._wrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._menuItem = this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-menu-dropdown]`);

    this._slots = {
      skip: this.shadowRoot.querySelector(`.${this.tag}__skip`),
      language: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-language]`),
      login: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-login]`)
    };

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    this.overlay = false;

    // make sure we close all of the nav items and hide the overlay when
    // the mobile menu button is closed
    this._menuItem.shadowRoot
      .querySelector(`.${PfeNavigationItem.tag}__trigger`)
      .addEventListener("click", this._menuItemClickHandler);

    // make sure we close all of the nav items and hide the overlay
    // when it's clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Wait until the item and main navigation are defined
    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
      // Watch for screen resizing, don't wrap this in a timeout because it
      // adds a very obvious delay in rendering that is a bad user experience
      window.addEventListener("resize", this._resizeHandler);

      // If this element contains light DOM, set up the observer
      if (!this.children.length) {
        console.error(
          "This component does not have any light DOM children.  Please check documentation for requirements."
        );
      } else {
        this._init();
      }

      // Attach an observer for dynamically injected content
      this._observer.observe(this, observerAttributes);
    });
  }

  disconnectedCallback() {
    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if (this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      document.removeEventListener("click", this._outsideListener);
    }

    if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      window.removeEventListener("scroll", this._stickyHandler);
    }

    this._menuItem.shadowRoot
      .querySelector(`.${PfeNavigationItem.tag}__trigger`)
      .removeEventListener("click", this._menuItemClickHandler);
    this._overlay.removeEventListener("click", this._overlayClickHandler);

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
    this._activeNavigationItems.forEach(item => {
      // If the item is open but not visible, update it to hidden
      console.log({ expanded: item.expanded, visible: item.visible });
      if (item.expanded && !item.visible) {
        item.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter(i => i !== item);
      } else if (item.expanded && item.parent && item.parent.visible) {
        // if the parent is the mobile menu item and the size of the window is within
        // the main breakpoint, make sure that the mobile menu is expanded
        if (item.parent === this._menuItem && window.innerWidth <= this.breakpoints.main[1]) {
          item.parent.expanded = true; // Ensure the parent is open
          // If the parent item doesn't exist in the active array, add it
          if (!this._activeNavigationItems.includes(item.parent)) {
            this._activeNavigationItems.push(item.parent);
          }
        }
      }
    });

    console.log(this._activeNavigationItems);
    this.overlay = this._activeNavigationItems.length > 0;

    // update the reported height
    this._reportHeight();
  }

  _stickyHandler() {
    if (window.pageYOffset >= this.top) {
      this.classList.add("pfe-sticky");
    } else {
      this.classList.remove("pfe-sticky");
    }
  }

  _outsideListener(event) {
    // Check if the clicked element is the navigation object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the navigation element
    let isChild = event.target.closest(`${this.tag}`);
    let insideWrapper = event.target.tagName.includes("-")
      ? event.target.shadowRoot.querySelector(`${this.tag}`)
      : null;

    // Check states to determine if the navigation items should close
    if (!isSelf && !(isChild || insideWrapper)) {
      this._activeNavigationItems.map(item => item.close());
    }
  }

  _setVisibility(width) {
    // Cast the width as a number
    width = Number.parseInt(width);

    // Iterate over the breakpoints object
    Object.keys(this.breakpoints).forEach(label => {
      let bps = this.breakpoints[label];
      // First item in the array is the min-width
      let start = Number.parseInt(bps[0]);
      // Second item in the array is the max-width
      let end = Number.parseInt(bps[1]);

      if (bps.length > 2)
        console.warn(`${this.tag}: Breakpoints must be provided with an array of 1 or 2 items. See documentation.`);

      //  Initialize the visibility boolean to false
      let isVisible = false;

      // If the slot exists, set attribute based on supported breakpoints
      if (
        !Number.isNaN(start) &&
        this.slots &&
        this.slots[label] &&
        this.slots[label].nodes &&
        this.slots[label].nodes.length > 0
      ) {
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
                  if (isVisible) desktopVersion.close();
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
              // If it's a navigation item, use is visible logic
              if (node.tagName === PfeNavigationItem.tag.toUpperCase()) {
                if (!isVisible) node.close();
                node.visible = isVisible;
                // Remove item from active list
                this._activeNavigationItems = this._activeNavigationItems.filter(item => item !== node);
              } else if (isVisible) {
                // Otherwise if it's visible, remove the hidden attribute
                node.removeAttribute("hidden");
                // Preferably toggle it from the shadow version only
                if (shadowVersion) {
                  node.removeAttribute("hidden");
                  shadowVersion.removeAttribute("hidden");
                }
              } else {
                // If it's not visible, add the hidden attribute
                // Preferably toggle it from the shadow version only
                if (shadowVersion) {
                  node.removeAttribute("hidden");
                  shadowVersion.setAttribute("hidden", "");
                } else {
                  // If the shadow
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
    console.log("initialized");
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    this.navItems = [...this.querySelectorAll(`${PfeNavigationItem.tag}`)];

    // Add the menu element to the list of navigation items
    // do this manually because menu item is in the shadow dom
    if (this._menuItem) this.navItems.push(this._menuItem);

    // Attach a reference to the navigation container to the children
    this.navItems.forEach(item => (item.navigationWrapper = this));

    // Connect the shadow menu with the main component
    let mainNav = this.querySelector(`${PfeNavigationMain.tag}`);
    if (mainNav && mainNav.navItems) {
      mainNav.navItems.forEach(item => (item.parent = this._menuItem));
    }

    // Start by setting the visibility of the slots
    this._setVisibility(this.offsetWidth);

    // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
    if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", this._stickyHandler);
    }

    // Listen for clicks outside the navigation element
    if (this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      document.addEventListener("click", this._outsideListener);
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

  // TODO
  _menuItemClickHandler(event) {
    if (!event.currentTarget) {
      this._activeNavigationItems.map(item => item.close());
      this.overlay = false;
    }
  }

  _overlayClickHandler(event) {
    this._activeNavigationItems.map(item => item.close());
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
