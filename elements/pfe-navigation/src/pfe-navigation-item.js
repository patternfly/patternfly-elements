import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

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

  static get observedAttributes() {
    return ["pfe-icon", "pfe-full-width"];
  }

  static get cascadingAttributes() {
    return {
      "pfe-full-width": ".pfe-navigation-item__tray"
    };
  }

  get hasIcon() {
    return this.hasAttribute("pfe-icon");
  }

  get iconName() {
    return this.getAttribute("pfe-icon");
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(isExpanded) {
    isExpanded = Boolean(isExpanded);

    this.setAttribute("aria-expanded", isExpanded);

    if (isExpanded) {
      if (this.iconName === "web-mobile-menu" && this._icon) this._icon.setAttribute("icon", "web-plus");
      if (this.tray) this.tray.removeAttribute("hidden");
    } else {
      if (this.iconName === "web-mobile-menu" && this._icon) this._icon.setAttribute("icon", "web-mobile-menu");
      if (this.tray) this.tray.setAttribute("hidden", "");
    }
  }

  get visible() {
    return !this.hasAttribute("hidden");
  }

  set visible(isVisible) {
    isVisible = Boolean(isVisible);

    if (isVisible) this.removeAttribute("hidden");
    else this.setAttribute("hidden", "");
  }

  get isModal() {
    return this.hasAttribute("pfe-c-use-modal");
  }

  set isModal(setToModal) {
    setToModal = Boolean(setToModal);
    if (setToModal) this.setAttribute("pfe-c-use-modal", "");
    else this.removeAttribute("pfe-c-use-modal");
  }

  open(event) {
    if (event) event.preventDefault();

    // Close the other active item(s) unless it's this item's parent
    if (this.navigationWrapper) {
      this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
        let stayOpen = item === this.parent;
        if (!stayOpen) item.close();
        return stayOpen;
      });

      // Open that item and add it to the active array
      this.navigationWrapper._activeNavigationItems.push(this);

      this.expanded = true;
      this.navigationWrapper.overlay = true;
    }

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  close(event) {
    if (event) event.preventDefault();

    // Close the children elements
    this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
      let close = this.nestedItems && this.nestedItems.includes(item);
      if (close) item.close();
      return !close && item !== this;
    });

    this.expanded = false;

    // Clear the overlay
    this.navigationWrapper.overlay = this.navigationWrapper._activeNavigationItems.length > 0;

    this.focus();

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  toggle(event) {
    if (event && this.tray) event.preventDefault();

    if (!this.tray && this.link) {
      this.link.click();
      return;
    }

    if (this.visible && !this.expanded) {
      this.open(event);
    } else {
      this.close(event);
    }
  }

  constructor() {
    super(PfeNavigationItem);

    this._handlersAdded = false;

    // States
    this.expanded = false;

    // Objects
    this.trigger = null;
    this.tray = null;

    // Lists
    this.nestedItems = [];

    // Shadow elements
    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._label = this.shadowRoot.querySelector(`.${this.tag}__trigger--label`);
    this._icon = this.shadowRoot.querySelector("pfe-icon");
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);

    // Externally accessible events
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);

    // Initializers
    this._init__trigger = this._init__trigger.bind(this);
    this._init__tray = this._init__tray.bind(this);

    this._observer = new MutationObserver(this._init__trigger);

    // Event handlers
    // this._keydownHandler = this._keydownHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Set up the tray before the trigger because it uses logic about if the tray exists
    this._init__tray();
    this._init__trigger();

    // Make sure the item is initialized to closed
    this.expanded = false;

    // Add a slotchange listeners to the lightDOM elements
    if (this.trigger) this.trigger.addEventListener("slotchange", this._init__trigger);
    if (this.tray) this.tray.addEventListener("slotchange", this._init__tray);

    // Attach an observer for dynamically injected content
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  disconnectedCallback() {
    if (this.trigger) this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.tray.removeEventListener("slotchange", this._init);

      this.removeEventListener("keyup", this._exit);

      this._trigger.removeEventListener("click", this.toggle);
      this._trigger.removeEventListener("keyup", this._keyupHandler);
    }

    this._observer.disconnect();
  }

  _init__trigger() {
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Get the trigger light dom
    this.trigger = this.querySelector(`:not([slot="tray"])`);

    // Check for a link
    if (this.trigger) {
      let children = this.trigger.children;

      // Treat slots a little differently
      if (this.trigger.tagName === "SLOT") {
        children = this.trigger.assignedElements();
      }

      if (children.length > 0) {
        let link = this.trigger.querySelector("a[href]:not([href^='#']");

        // If this is a direct link, no tray
        // set the mark-up to a link
        if (!this.tray && link) {
          // If this is a direct link, pass the click event from this to the light DOM link
          // doing this to preserve any analytics attached to the original links
          this.link = link;

          // Remove focus from the link so it can't be directly accessed
          link.setAttribute("tabindex", "-1");
          this._label.innerHTML = link.textContent.trim();
        }

        // Set the label equal to the trigger's light DOM content
        this._label.innerHTML = [...children].map(child => child.textContent.trim()).join(" ");
      } else {
        // Set the label equal to the trigger's text content
        this._label.innerHTML = this.trigger.textContent.trim();
      }
    }

    // If it has an icon, it's a utility item
    if (this.hasIcon) {
      this.setAttribute("is-utility", "");
    }

    if (!this.has_slot("tray")) {
      this._init__handlers();
    }

    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true
        });
        return true;
      }, 0);
    }
  }

  _init__tray() {
    // Get the LightDOM trigger & tray content
    this.tray = this.querySelector(`[slot="tray"]`);

    //-- Check for any nested navigation items
    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(this.tag)]);
      let array = [];

      // Search the tray for nested default slots
      // if (!window.ShadyCSS) { // @TODO, this is causing an issue
      [...this.tray.querySelectorAll("slot:not([name])")].forEach(slot => {
        [...slot.assignedElements()].forEach(node => {
          array = array.concat([...node.querySelectorAll(`${this.tag}`)]);
        });
      });
      // }

      this.nestedItems = this.nestedItems.concat(
        array.filter(el => {
          return !this.nestedItems.includes(el);
        })
      );
    }

    this._init__handlers();
  }

  _init__handlers() {
    if (this._handlersAdded) {
      return;
    }

    // Modal has it's own events
    if (!this.isModal) {
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this.toggle);

      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keyup", this._exit);

      // Handles activation of the trigger element
      this._trigger.addEventListener("keyup", this._keyupHandler);
    }

    this._handlersAdded = true;
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
      case "Enter":
      case 13:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
    }
  }

  // Note: Escape will always exit the entire menu
  _exit(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Esc":
      case "Escape":
      case 27:
        this.close(event);
        break;
    }
  }
}

export default PfeNavigationItem;
