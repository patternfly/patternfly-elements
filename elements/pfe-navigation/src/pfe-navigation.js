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

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    // -- handlers
    this._toggledHandler = this._toggledHandler.bind(this);
    this._observerHandler = this._observerHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._closeAllNavigationItems = this._closeAllNavigationItems.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._observer = new MutationObserver(this._observerHandler);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(".pfe-navigation__overlay");
    this._mobileSlot = {
      menu: this.shadowRoot.querySelector(`slot[name="mobile-menu"]`),
      search: this.shadowRoot.querySelector(`slot[name="mobile-search"]`)
    };

    // Initialize active navigation item to null
    this._activeNavigationItem = null;
    // Set the state of this element to false until initialized
    this._initialized = false;
    // Initial height of the element is 0
    this.height = 0;
    // Initial position of this element from the top of the screen
    this.top    = this.getBoundingClientRect().top || 0;
    // Initialize light DOM and shadow DOM mobile slot objects
    this.mobileSlot = {};

  }

  connectedCallback() {
    super.connectedCallback();

    // If this element contains light DOM, initialize it
    if (this.children.length) {
      this.mobileSlot = {
        login: this.querySelector(`[slot="mobile-login"]`),
        language: this.querySelector(`[slot="mobile-language"]`)
      };

      // Kick off the initialization of the light DOM elements
      this._initialized = this._init();

      // Listen for the toggled event on the navigation children
      this.addEventListener("pfe-navigation-item:toggled", this._toggledHandler);
      // Watch for screen resizing
      window.addEventListener("resize", this._resizeHandler);
    } else {
      console.warn("This component does not have any light DOM children.  Please check documentation for requirements.");
    }
  }

  disconnectedCallback() {
    // Remove the custom listener for the toggled event
    this.removeEventListener("pfe-navigation-item:toggled", this._toggledHandler);

    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("scroll", this._stickyHandler);
    window.removeEventListener("resize", this._resizeHandler);
    document.removeEventListener("click", this._outsideListener);

    this._observer.disconnect();
  }

  _observerHandler(mutationsList) {
    // Reset the state to false, rerun the initializer
    this._initialized = false;
    this._initialized = this._init();
  }

  _resizeHandler(event) {
    // If there is currently an active navigation element
    if(this._activeNavigationItem !== null) {
      // Check if that active item is the mobile menu
      let isMenu = this._activeNavigationItem.getAttribute("pfe-icon") === "menu";
      // Check if the window size is greater than 996px
      let isDesktop = window.outerWidth >= 996;
      // If it's the menu item and we're at a desktop size, close the active item
      if(isDesktop && isMenu) {
        this._closeAllNavigationItems();
      }
    }
  }

  _toggledHandler(event) {
    // If there is no active navigation item at the moment, open the clicked element
    if (!this._activeNavigationItem && event.detail.navigationItem !== null) {
      this._activeNavigationItem = event.detail.navigationItem;
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");
      return;
    }

    // If the item clicked equals the currently active navigation item
    if (this._activeNavigationItem === event.detail.navigationItem) {
      if (this._activeNavigationItem !== null) {
        this._activeNavigationItem.expanded = false;
      }
      // Close the navigation item and remove the overlay
      this._activeNavigationItem = null;
      this._overlay.setAttribute("hidden", true);
      return;
    }

    // If no navigation item is provided
    if (event.detail.navigationItem === null) {
      // Close any open navigation items
      this._activeNavigationItem.expanded = false;
      // Set active to null and remove the overlay
      this._activeNavigationItem = null;
      this._overlay.setAttribute("hidden", true);
      return;
    }

    // Otherwise, close the navigation item, open the next one
    this._activeNavigationItem.expanded = false;
    this._activeNavigationItem = event.detail.navigationItem;
  }

  _stickyHandler() {
    if(window.pageYOffset >= this.top) {
      this.classList.add("sticky");
      this.style.setProperty("--pfe-navigation--Height", this.height + "px");
    } else {
      this.classList.remove("sticky");
      this.style.setProperty("--pfe-navigation--Height", this.getBoundingClientRect().top + this.height + "px");
    }
  }

  _outsideListener(event) {
    if ((event.target !== this && event.target.closest("pfe-navigation") === null) || event.path.length > 0 && event.path[0] === this._overlay) {
      this._closeAllNavigationItems();
    }
  }

  _closeAllNavigationItems() {
    this.dispatchEvent(
      new CustomEvent("pfe-navigation-item:toggled", {
        detail: {
          navigationItem: null,
          expanded: false
        },
        bubbles: true,
        composed: true
      })
    );
  }

  _init() {
    let ret = false;
    if(!this._initialized) {
      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

      // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
      if(this.hasAttribute("sticky") && this.getAttribute("sticky") != "false") {
        this.height = this.offsetHeight;

        // Run the sticky check on first page load
        this._stickyHandler();

        window.addEventListener("scroll", this._stickyHandler);
      }

      ret = this._setupMobileNav();

      document.addEventListener("click", this._outsideListener);

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
    if(!this._initialized) {
      const triggers = [
        ...this.querySelectorAll("pfe-navigation-main pfe-navigation-item > *:first-child")
      ];
      const fragment = document.createDocumentFragment();
      const accordion = document.createElement("pfe-accordion");
      const menuSlotMobile = this.querySelector(`[slot="menu-mobile"]`);

      // Set up the mobile search
      const searchClone = this.querySelector(`[slot="search"] > [slot="tray"]`).innerHTML;
      this._mobileSlot.search.innerHTML = searchClone;

      // Set up the mobile login and language links
      ["login", "language"].forEach(type => {
        let link = "#";
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
        this.shadowRoot.querySelector(`[connect-to="mobile-${type}"]`).setAttribute("href", link);
        this.shadowRoot.querySelector(`#pfe-navigation--mobile-${type}`).innerHTML = this.mobileSlot[type].innerText;
        // Hide the slot
        this.mobileSlot[type].setAttribute("hidden", true);
        this.mobileSlot[type].style.display = "none";
      });

      // Set up the mobile main menu
      triggers.forEach(trigger => {
        const clone = trigger.cloneNode(true);
        const header = document.createElement("pfe-accordion-header");
        const panel = document.createElement("pfe-accordion-panel");

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

      this._mobileSlot.menu.innerHTML = "";
      this._mobileSlot.menu.appendChild(fragment);
    }

    return true;
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

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(val) {
    val = Boolean(val);

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
        this.tray.setAttribute("hidden", true);
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", false);
      }
    }
  }

  constructor() {
    super(PfeNavigationItem);

    this.expanded = false;
    this.trigger = null;
    this.tray = null;
    this.linkUrl = null;

    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);
    this._icon = this.shadowRoot.querySelector(`.${this.tag}__trigger--icon`);

    this._init = this._init.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
    this._suppressLink = this._suppressLink.bind(this);
    this._navigateToUrl = this._navigateToUrl.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    
    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);
    this.tray = this.querySelector(`[slot="tray"]`);

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.trigger.addEventListener("slotchange", this._init);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  disconnectedCallback() {
    this._trigger.removeEventListener("click", this._clickHandler);
    this._trigger.removeEventListener("keydown", this._keydownHandler);
  }

  _init() {
    const link = this.trigger.querySelector("a");

    // If there is a tray element, add click events
    if (this.tray) {
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this._toggleMenu);
      // Turn off the fallback link
      if (link) {
        link.setAttribute("tabindex", "-1");
        link.addEventListener("click", this._suppressLink);
      }

      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keydown", this._keydownHandler);
    } else {
      this.linkUrl = link ? link.href : "#";
      this._trigger.addEventListener("click", this._navigateToUrl);
    }
  }

  _closeMenu(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggled`, {
        detail: {
          navigationItem: null,
          expanded: false
        },
        bubbles: true,
        composed: true
      })
    );
  }

  _suppressLink(event) {
    event.preventDefault();
  }

  _navigateToUrl(event) {
    event.preventDefault();
    window.location.href = this.linkUrl;
  }

  _toggleMenu(event) {
    event.preventDefault();
    this.expanded = !this.expanded;
    this._fireExpandToggledEvent();
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Spacebar":
      case "Enter":
      case " ":
        this._toggleMenu(event);
        break;
      case "Esc":
      case "Escape":
        this._closeMenu(event);
        break;
      default:
        return;
    }
  }

  _fireExpandToggledEvent() {
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggled`, {
        detail: {
          navigationItem: this,
          expanded: this.expanded,
          slot: this.getAttribute("slot"),
          content: this.tray
        },
        bubbles: true,
        composed: true
      })
    );
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
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;


