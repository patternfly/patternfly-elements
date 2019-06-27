import PFElement from "../pfelement/pfelement.js";
import PfeAccordion from "../pfe-accordion/pfe-accordion.js";

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

  get iconSVG() {
    return {
      globe: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Icon</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Icon">
                  <circle id="Oval" cx="9.5" cy="9.5" r="9.5"></circle>
                  <ellipse id="Oval" cx="9.5" cy="9.5" rx="4.75" ry="9.5"></ellipse>
                  <path d="M9.5,0 L9.5,19" id="Path"></path>
                  <path d="M1,14 L18,14" id="Path"></path>
                  <path d="M0,9.5 L19,9.5" id="Path"></path>
                  <path d="M1,5 L18,5" id="Path"></path>
              </g>
          </g>
      </svg>`,
      user: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Icon</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <g id="Icon">
                  <path d="M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19" id="Path"></path>
                  <circle id="Oval" cx="9.5" cy="4.75" r="4.75"></circle>
              </g>
          </g>
      </svg>`
    };
  }

  constructor() {
    super(PfeNavigation);

    this._activeNavigationItem = null;

    this._toggledHandler = this._toggledHandler.bind(this);
    this._init = this._init.bind(this);

    // this._setupSearch = this._setupSearch.bind(this);
    
    this._observerHandler = this._observerHandler.bind(this);
    this._observer = new MutationObserver(this._observerHandler);

    this._initialized = false;

    this.addEventListener(
      `${PfeNavigationItem.tag}:toggled`,
      this._toggledHandler
    );
  }

  connectedCallback() {
    super.connectedCallback();

    this.overlay = this.shadowRoot.querySelector(".pfe-navigation__overlay");

    // Capture the utility slots from shadow
    this.searchSlot = this.querySelector(`[slot="search"]`);
    this.loginSlot = this.querySelector(`[slot="login"]`);
    this.languageSlot = this.querySelector(`[slot="language"]`);
    this.loginSlotMobile    = this.querySelector(`[slot="mobile-login"]`);
    this.languageSlotMobile = this.querySelector(`[slot="mobile-language"]`);

    // Capture mobile slots from shadow
    this._menuSlotMobile     = this.shadowRoot.querySelector(`slot[name="mobile-menu"]`);
    this._searchSlotMobile   = this.shadowRoot.querySelector(`slot[name="mobile-search"]`);

    // this.searchSlot.addEventListener("slotchange", this._setupSearch);
    // this.loginSlot.addEventListener("slotchange", this._setupLogin);
    // this.languageSlot.addEventListener("slotchange", this._setupLanguage);

    if (this.children.length) {
      this._initialized = this._init();
    }

    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
      // Do a thing once items and main are loaded?
      this._observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  }

  disconnectedCallback() {
    this.removeEventListener(
      `${PfeNavigationItem.tag}:toggled`,
      this._toggledHandler
    );

    this._observer.disconnect();
    // this.searchSlot.removeEventListener("slotchange", this._setupSearch);
  }

  _observerHandler(mutationsList) {
    // Reset the state to false, rerun the initializer
    this._initialized = false;
    this._initialized = this._init();
  }

  _toggledHandler(event) {
    if (!this._activeNavigationItem) {
      this._activeNavigationItem = event.detail.navigationItem;
      this.overlay.removeAttribute("hidden");
      return;
    }

    if (this._activeNavigationItem === event.detail.navigationItem) {
      this._activeNavigationItem = null;
      this.overlay.setAttribute("hidden", true);
      return;
    }

    this._activeNavigationItem.expanded = false;
    this._activeNavigationItem = event.detail.navigationItem;
  }

  _init() {
    let ret = false;
    if(!this._initialized) {
      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

      ret = this._setupMobileNav();

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

  // _setupSearch(event) {
  //   const searchInnerHTML = this.searchSlot.assignedNodes()[0].querySelector(`[slot="tray"] > *`);
  //   const searchInnerHTMLClone = searchInnerHTML.cloneNode(true);

  //   this._searchSlotMobile.appendChild(searchInnerHTMLClone);
  // }

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
      this._searchSlotMobile.innerHTML = searchClone;

      // Set up the mobile login
      let loginLink = "#";
      if(this.loginSlotMobile.hasAttribute("href")){
        // Store the link value in a variable
        loginLink = this.loginSlotMobile.getAttribute("href");
      } else {
        // Find the link inside the slot
        if(this.loginSlotMobile.querySelector("a")) {
          loginLink = this.loginSlotMobile.querySelector("a").getAttribute("href");
        }
      }
      // Get the element to attach the link to
      this.shadowRoot.querySelector(`[connect-to="mobile-login"]`).setAttribute("href", loginLink);


      // const loginClone = loginEl !== null ? loginEl.innerHTML : "";
      // this._loginSlotMobile.innerHTML = loginClone;
      // // Copy the icon to the slot
      // if(this.loginSlot.hasAttribute("pfe-icon")) {
      //   this._loginSlotMobile.setAttribute("pfe-icon", this.loginSlot.getAttribute("pfe-icon"));
      // }

      // Set up the mobile language
      // const languageEl = this.languageSlot ? this.languageSlot.querySelector(`[slot="trigger"]`) : null;
      // const languageClone = languageEl !== null ? languageEl.innerHTML : "";
      // this._languageSlotMobile.innerHTML = languageClone;
      // // Copy the icon to the slot
      // if(this.languageSlot.hasAttribute("pfe-icon")) {
      //   this._languageSlotMobile.setAttribute("pfe-icon", this.languageSlot.getAttribute("pfe-icon"));
      // }


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

      this._menuSlotMobile.innerHTML = "";
      this._menuSlotMobile.appendChild(fragment);
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

      if (this._tray) {
        this.tray.removeAttribute("hidden");
        this._tray.setAttribute("aria-expanded", true);
      }

      if (this._indicator) {
        this._indicator.classList.add("expanded");
      }
    } else {
      this.classList.remove("expanded");

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", false);
      }

      if (this._tray) {
        this.tray.setAttribute("hidden", true);
        this._tray.setAttribute("aria-expanded", false);
      }

      if (this._indicator) {
        this._indicator.classList.remove("expanded");
      }
    }
  }

  constructor() {
    super(PfeNavigationItem);

    this.expanded = false;
    this.trigger = null;
    this.tray = null;

    this._trigger = this.shadowRoot.querySelector(".pfe-navigation-item__trigger");;
    this._tray = this.shadowRoot.querySelector(".pfe-navigation-item__tray");;
    this._icon = this.shadowRoot.querySelector(".pfe-navigation-item__icon");
    this._indicator = this.shadowRoot.querySelector(".indicator");

    this._init = this._init.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    
    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    this.trigger = this.querySelector(`[slot="trigger"]`);
    this.tray = this.querySelector(`[slot="tray"]`);

    this.shadowRoot
      .querySelector(`slot[name="trigger"]`)
      .addEventListener("slotchange", this._init);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    // if (attr === "pfe-icon") {
    //   this._icon.innerHTML = this.iconSVG[newValue];
    // }
  }

  disconnectedCallback() {
    if (this._trigger) {
      this._trigger.removeEventListener("click", this._clickHandler);
      this._trigger.removeEventListener("keydown", this._keydownHandler);
    }
  }

  _init() {
    // If there is both a trigger and a tray element, add click events
    if (this._trigger && this._tray) {
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this._toggleMenu);

      // @TODO If the user clicks outside the navigation, it should close
      // this.addEventListener("blur", this._closeMenu);

      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keydown", this._keydownHandler);
    }
  }

  _closeMenu(event) {
    event.preventDefault();
    this.expanded = false;
    this._fireExpandToggledEvent();
  }

  _toggleMenu(event) {
    event.preventDefault();
    this.expanded = !this.expanded;
    this._fireExpandToggledEvent();
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Spacebar":
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
      new CustomEvent(`${PfeNavigationItem.tag}:toggled`, {
        detail: { navigationItem: this, expanded: this.expanded },
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
