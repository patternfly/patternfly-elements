import PFElement from "../pfelement/pfelement.js";
import PfeAccordion from "../pfe-accordion/pfe-accordion.js";

if (!("path" in Event.prototype)) {
  Object.defineProperty(Event.prototype, "path", {
    get: function() {
      var path = [];
      var currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1)
        path.push(window);
      return path;
    }
  });
}

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

  closeAllNavigationItems() {
    this.dispatchEvent(
      new CustomEvent("pfe-navigation-item:close", {
        detail: {
          navigationItems: this._activeNavigationItems,
          expanded: false
        },
        bubbles: true,
        composed: true
      })
    );
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(state) {
    if (state) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");
      // This prevents background scroll while nav is open
      document.body.style.overflow = "hidden";
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");
      // Allow background to scroll again
      document.body.style.overflow = "auto";

    }
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setupMobileNav = this._setupMobileNav.bind(this);
    this._setupMobileSearch = this._setupMobileSearch.bind(this);
    this._setupMobileLinks = this._setupMobileLinks.bind(this);

    // -- handlers
    this._toggledHandler = this._toggledHandler.bind(this);
    this._closeAllNavigationItems = this._closeAllNavigationItems.bind(this);
    this._observerHandler = this._observerHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this.closeAllNavigationItems = this.closeAllNavigationItems.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._observer = new MutationObserver(this._observerHandler);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(".pfe-navigation__overlay");
    this._mobileSlot = {
      menu: this.shadowRoot.querySelector(`slot[name="mobile-menu"]`),
      search: this.shadowRoot.querySelector(`slot[name="mobile-search"]`)
    };

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    // Set the state of this element to false until initialized
    this.initialized = false;
    this.overlay = false;
    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;
    // Initialize light DOM and shadow DOM mobile slot objects
    this.mobileSlot = {};

  }

  connectedCallback() {
    super.connectedCallback();

    // If this element contains light DOM, initialize it
    if (this.children.length) {
      this.mobileSlot = {
        menu: this.querySelector(`[slot="menu-mobile"]`),
        login: this.querySelector(`[slot="mobile-login"]`),
        language: this.querySelector(`[slot="mobile-language"]`)
      };

      // Kick off the initialization of the light DOM elements
      this.initialized = this._init();

      // Listen for the toggled event on the navigation children
      this.addEventListener("pfe-navigation-item:open", this._toggledHandler);
      this.addEventListener("pfe-navigation-item:close", this._toggledHandler);

      // Watch for screen resizing
      window.addEventListener("resize", this._resizeHandler);
    } else {
      console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
    }
  }

  disconnectedCallback() {
    // Remove the custom listener for the toggled event
    this.removeEventListener("pfe-navigation-item:open", this._toggledHandler);
    this.removeEventListener("pfe-navigation-item:close", this._toggledHandler);

    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("scroll", this._stickyHandler);
    document.removeEventListener("click", this._outsideListener);

    this._observer.disconnect();
  }

  _observerHandler(mutationsList) {
    // Reset the state to false, rerun the initializer
    this.initialized = false;
    this.initialized = this._init();
  }

  _resizeHandler(event) {
    // If there is currently an active navigation element
    if(this._activeNavigationItems.length > 0) {
      let isMenu = false,
          isSwitcher = false,
          isUtility = false;
      // Check what the active item is
      this._activeNavigationItems.forEach(item => {
        isMenu = isMenu ? isMenu : item.getAttribute("pfe-icon") === "menu";
        isSwitcher = isSwitcher ? isSwitcher : item.getAttribute("slot") === "site-switcher";
        isUtility = isUtility ? isUtility : item.hasAttribute("pfe-icon");
      });

      // Check the window size
      let isDesktop = window.outerWidth >= 992;
      let isTablet = window.outerWidth < 992 && window.outerWidth >= 576;
      let isMobile = window.outerWidth < 576;
      
      // Check the logic for visible items on desktop, tablet, and mobile
      let desktopCheck = isDesktop && isMenu;
      let tabletCheck = isTablet && !isUtility;
      let mobileCheck = isMobile && !(isMenu || isSwitcher);

      // If any states are true, fire the close all event
      if(desktopCheck || tabletCheck || mobileCheck) {
        this.closeAllNavigationItems();
      }
    }
  }

  _closeAllNavigationItems() {
    // Close any open navigation items
    this._activeNavigationItems.map(item => {
      item.expanded = false
    });
  }

  _toggledHandler(event) {
    let newItem = event.detail.navigationItem;
    let currentItems = this._activeNavigationItems;

    // Checking various states
    let isSelf = currentItems.includes(newItem);
    let hasOpenItem = currentItems.length > 0;
    let hasNewItem = newItem !== null;
    let newIsOpen = event.detail.expanded;
    let siblingItem = null;
    
    // Check if the new item shares a parent with the current one
    if (hasOpenItem) {
      currentItems.map(item => {
        // Capture the state if the parents match and both aren't null
        if (hasNewItem && newItem.parentItem && item.parentItem && newItem.parentItem === item.parentItem) {
          siblingItem = item;
        }
      });
    }

    // Check if this item is inside another item or shares a parent node
    if (currentItems.includes(newItem.parentItem) || siblingItem) {
      // Expand the new item
      newItem.expanded = true;
      // If they share a parent, close the sibling
      if (siblingItem) {
        siblingItem.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter(item => item !== siblingItem);
      }
      // Set the active item to the new item
      this._activeNavigationItems.push(newItem);
      // Don't do anything with the overlay because these are nested items
      return;
    } else {
      // If there is no active navigation item at the moment, open the clicked element
      if (!hasOpenItem && hasNewItem && !newIsOpen) {
        this._activeNavigationItems.push(newItem);
        this.overlay = true;
        return;
      }

      // If the item clicked equals the currently active navigation item or no navigation item is provided
      // or if the current item is not null, close the item, open the next one
      if (isSelf || !hasNewItem || (hasOpenItem && hasNewItem)) {
        if (hasOpenItem && !isSelf) {
          this._closeAllNavigationItems();
        }

        if (hasNewItem && !isSelf) {
          this._activeNavigationItems.push(newItem);
        } else {
          // Reset active elements the navigation items and remove the overlay
          this._activeNavigationItems = [];
          this.overlay = false;
        }
        return;
      }

      // Otherwise, ensure active item is empty and overlay is hidden
      this._closeAllNavigationItems();
      this._activeNavigationItems = [];
      this.overlay = false;
    }
  }

  _stickyHandler() {
    if(window.pageYOffset >= this.top) {
      this.classList.add("sticky");
    } else {
      this.classList.remove("sticky");
    }
  }

  _outsideListener(event) {
    if ((event.target !== this && event.target.closest("pfe-navigation") === null) || event.path.length > 0 && event.path[0] === this._overlay) {
      this.closeAllNavigationItems();
    }
  }

  _init() {
    let ret = false;
    if(!this.initialized) {
      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

      // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
      if(this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
        // Run the sticky check on first page load
        this._stickyHandler();

        // Attach the scroll event to the window
        window.addEventListener("scroll", this._stickyHandler);
      }

      // Setup the mobile navigation region
      ret = this._setupMobileNav();

      // Listen for clicks outside the navigation element
      if(this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
        document.addEventListener("click", this._outsideListener);
      }

      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        setTimeout(() => {
          this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true
          });
        }, 0);
      }
    }

    return ret;
  }

  _setupMobileNav() {
    if(!this.initialized) {
      const triggers = [
        ...this.querySelectorAll("pfe-navigation-main pfe-navigation-item > *:first-child")
      ];

      // Create a new pfe-accordion element
      const fragment = document.createDocumentFragment();
      const accordion = document.createElement("pfe-accordion");

      // Set up the mobile search, look for the mobile search flag in the search slot
      this.mobileSlot.search = this.querySelector(`[slot="search"] [pfe-navigation--mobile-search]`);
      // If the slot exists, grab it's content and inject into the mobile slot in shadow DOM
      if (this.mobileSlot.search) {
        this._setupMobileSearch();
      }

      // Set up the mobile login and language links
      this._setupMobileLinks();

      // Set up the mobile main menu
      triggers.forEach(trigger => {
        const clone = trigger.cloneNode(true);
        const header = document.createElement("pfe-accordion-header");
        const panel = document.createElement("pfe-accordion-panel");

        // If the trigger is not assigned to a slot
        if (!trigger.hasAttribute("slot")) {
          header.innerHTML = clone.outerHTML;
        } else {
          header.innerHTML = trigger.outerHTML;
          header.children[0].removeAttribute("slot");
        }

        if (
          trigger.nextElementSibling &&
          trigger.nextElementSibling.getAttribute("slot") === "tray"
        ) {
          panel.innerHTML = trigger.nextElementSibling.innerHTML;
        } else {
          panel.innerHTML = "";
        }

        accordion.appendChild(header);
        accordion.appendChild(panel);
      });

      fragment.appendChild(accordion);

      // If there is at least 1 item in the accordion, add it to the menu
      if (accordion.childElementCount > 0) {
        // Add the fragment to the DOM
        // this._mobileSlot.menu.innerHTML = "";
        // this._mobileSlot.menu.appendChild(fragment);
      }
    }

    return true;
  }

  _setupMobileSearch() {
    // If the slot exists, grab it's content and inject into the mobile slot in shadow DOM
    const searchClone = this.mobileSlot.search.cloneNode(true);
    searchClone.removeAttribute("pfe-navigation--mobile-search");
    this._mobileSlot.search.innerHTML = searchClone.innerHTML;
  }

  _setupMobileLinks() {
    ["login", "language"].forEach(type => {
      let link = "";
      if(this.mobileSlot[type].hasAttribute("href")){
        // Store the link value in a variable
        link = this.mobileSlot[type].getAttribute("href");
      } else {
        // Find the link inside the slot
        if(this.mobileSlot[type].querySelector("a")) {
          link = this.mobileSlot[type].querySelector("a").getAttribute("href");
        }
      }

      // Get the element to attach the link to
      // this.shadowRoot.querySelector(`[connect-to="mobile-${type}"]`).setAttribute("href", link);
      // this.shadowRoot.querySelector(`#pfe-navigation--mobile-${type}`).innerHTML = this.mobileSlot[type].innerText;

      // Hide the slot
      // this.mobileSlot[type].setAttribute("hidden", "");
      // this.mobileSlot[type].style.display = "none";
    });
  }
}

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  // Used in the template to determine where to print the icon
  get hasIcon() {
    return this.hasAttribute("pfe-icon");
  }

  static get observedAttributes() {
    return ["pfe-icon"];
  }

  get nested() {
    return this.hasAttribute("is_nested");
  }

  set nested(val) {
    val = Boolean(val);

    console.log("Nested? " + val);

    if (val) {
      this.setAttribute("is_nested", "");
    } else {
      this.removeAttribute("is_nested");
    }
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    // console.log(val ? "open" : "close");
    // console.log(this);

    if (val) {
      this.classList.add("expanded");

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.removeAttribute("hidden");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", false);
      }

      if (this.tray) {
        this.tray.setAttribute("hidden", "");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", false);
      }
    }
  }

  openNavigationItem(event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {
          navigationItem: this,
          expanded: false,
          slot: this.getAttribute("slot"),
          content: this.tray
        },
        bubbles: true,
        composed: true
      })
    );
  }

  closeNavigationItem(event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {
          navigationItem: this,
          expanded: true,
          slot: this.getAttribute("slot"),
          content: this.tray
        },
        bubbles: true,
        composed: true
      })
    );
  }

  constructor() {
    super(PfeNavigationItem);

    this.nested = false;
    this.expanded = false;
    this.trigger = null;
    this.tray = null;
    this.parentItem = null;
    this.directLink = null;
    this.linkUrl = null;

    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);
    this._icon = this.shadowRoot.querySelector(`.${this.tag}__trigger--icon`);

    // Externally accessible events
    this.closeNavigationItem = this.closeNavigationItem.bind(this);
    this.openNavigationItem = this.openNavigationItem.bind(this);
    
    this._init = this._init.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
    this._keydownHandlerTrigger = this._keydownHandlerTrigger.bind(this);
    this._suppressLink = this._suppressLink.bind(this);
    this._navigateToUrl = this._navigateToUrl.bind(this);
    this._directLinkHandler = this._directLinkHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);
    this.tray = this.querySelector(`[slot="tray"]`);

    // Check for any nested navigation items
    this.nestedItems = [];
    
    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(`${this.tag}`)]);
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll("slot")].map(slot => {
        return slot.assignedElements().map(node => {
          return [...node.querySelectorAll(`${this.tag}`)];
        });
      }).flat(3));
    }

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.trigger.addEventListener("slotchange", this._init);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.removeEventListener("keydown", this._keydownHandler);

      this._trigger.removeEventListener("click", this._toggleMenu);
      this._trigger.removeEventListener("keydown", this._keydownHandlerTrigger);
      if (this.directLink) {
        this.directLink.removeEventListener("click", this._suppressLink);
      }
    } else {
      this._trigger.removeEventListener("click", this._navigateToUrl);
      this._trigger.removeEventListener("keydown", this._directLinkHandler);
    }
  }

  _init() {
    this.directLink = this.trigger.querySelector("a");

    // this.nestedItems.forEach(item => {
    //   // Store the parentItem on this node and note that it's a nested component
    //   item.parentItem = this;
    // });

    // If there is a tray element, add click events
    if (this.tray) {
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this._toggleMenu);
      // Assign the keyboard events to the light DOM trigger element
      this.trigger.addEventListener("keydown", this._keydownHandlerTrigger);

      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keydown", this._keydownHandler);

      // Turn off the fallback link
      if (this.directLink) {
        this.directLink.setAttribute("tabindex", "-1");
        this.directLink.addEventListener("click", this._suppressLink);
      }
    } else {
      this.linkUrl = this.directLink ? this.directLink.href : "#";
      this._trigger.addEventListener("click", this._navigateToUrl);
      this._trigger.addEventListener("keydown", this._directLinkHandler);
    }
  }

  _suppressLink(event) {
    event.preventDefault();
  }

  _navigateToUrl(event) {
    event.preventDefault();
    window.location.href = this.linkUrl;
  }

  _directLinkHandler(event) {
    switch (event.key) {
      case "Spacebar":
      case "Enter":
      case " ":
        this._navigateToUrl(event);
        break;
      default:
        return;
    }
  }

  _toggleMenu(event) {
    this.expanded = !this.expanded;

    if(this.expanded) {
      this.openNavigationItem(event);
    } else {
      this.closeNavigationItem(event);
    }
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Esc":
      case "Escape":
        this.closeNavigationItem(event);
        break;
      default:
        return;
    }
  }

  _keydownHandlerTrigger(event) {
    switch (event.key) {
      case "Spacebar":
      case "Enter":
      case " ":
        this._toggleMenu(event);
        break;
      case "Esc":
      case "Escape":
        this.closeNavigationItem(event);
        break;
      default:
        return;
    }
  }
}

class PfeNavigationMain extends PFElement {
  static get tag() {
    return "pfe-navigation-main";
  }

  get templateUrl() {
    return "pfe-navigation-main.html";
  }

  get styleUrl() {
    return "pfe-navigation-main.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationMain);
    this.navItems = this.querySelectorAll("pfe-navigation-item");
    this.first = this.navItems.item(0);
    this.last = this.navItems.item(this.navItems.length - 1);

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this.removeEventListener("slotchange", this._init);
  }

  _init() {
    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      item.nested = true;
    });

    // Tag the first and last navigation items for styling in mobile
    if (this.first) this.first.setAttribute("first", "");
    if (this.last) this.last.setAttribute("last", "");
  }
}

PFElement.create(PfeNavigation);
PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);

export default PfeNavigation;
