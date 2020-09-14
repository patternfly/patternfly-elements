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
    return this.classList.contains("is-expanded");
  }

  set expanded(isExpanded) {
    isExpanded = Boolean(isExpanded);

    if (isExpanded) {
      this.classList.add("is-expanded");

      if (this.iconName === "web-mobile-menu") {
        if (this._icon) this._icon.setAttribute("icon", "web-plus");
      }

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
      this.classList.remove("is-expanded");

      if (this.iconName === "web-mobile-menu") {
        if (this._icon) this._icon.setAttribute("icon", "web-mobile-menu");
      }

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

  get visible() {
    return !this.hasAttribute("hidden");
  }

  set visible(isVisible) {
    isVisible = Boolean(isVisible);

    if (isVisible) {
      this.removeAttribute("hidden");
    } else {
      this.setAttribute("hidden", "");
    }
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
    if (event) event.preventDefault();

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
    this.directLink = null;
    this.linkUrl = null;

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

    // Event handlers
    this._keydownHandler = this._keydownHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Set up the tray before the trigger because it uses logic about if the tray exists
    this._init__tray();
    this._init__trigger();

    // Add a slotchange listeners to the lightDOM elements
    if (this.trigger) this.trigger.addEventListener("slotchange", this._init__trigger);
    if (this.tray) this.tray.addEventListener("slotchange", this._init__tray);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.tray.removeEventListener("slotchange", this._init);

      this.removeEventListener("keydown", this._keydownHandler);
      this.removeEventListener("keyup", this._exit);

      this._trigger.removeEventListener("click", this.toggle);
      this._trigger.removeEventListener("keyup", this._keyupHandler);
    }
  }

  _init__trigger() {
    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);

    // Check the light dom for the link
    if (this.trigger) {
      let children = [...this.trigger.children];

      // Treat slots a little differently
      if (this.trigger.tagName === "SLOT") {
        children = [...this.trigger.assignedElements()];
      }

      if (children.length > 0) {
        let isLink = children[0].tagName === "A";
        let isModal = children[0].tagName === "PFE-MODAL";

        // If this is a direct link, no tray
        // set the mark-up to a link
        if (!this.tray && isLink) {
          // Set the label equal to the trigger's content
          this._label.innerHTML = children[0].textContent.trim();
          // Attach the link
          this._label.href = children[0].href;

          // Remove focus from the link
          children[0].setAttribute("tabindex", "-1");
          this.trigger.setAttribute("tabindex", "0");
          this.trigger.addEventListener("click", event => children[0].click(event));
        } else if (!this.tray && isModal) {
          let modalLink = children[0].querySelector("[slot='pfe-modal--trigger']");
          // If this is a modal, treat it a bit differently
          // Attach the onclick event to the link
          children[0].addEventListener("click", event => children[0].open());
          // Hide the modal's trigger
          modalLink.setAttribute("hidden", "");
          // Set the label equal to the trigger's content
          this._label.innerHTML = modalLink.textContent.trim();
        } else {
          // Set the label equal to the trigger's content
          this._label.innerHTML = this.trigger.textContent.trim();
        }
      } else {
        // Set the label equal to the trigger's content
        this._label.innerHTML = this.trigger.textContent.trim();
      }
    }

    // If it has an icon, it's a utility item
    if (this.hasIcon && !this.hasAttribute("is-menu-dropdown")) {
      this.setAttribute("is-utility", "");
    }
  }

  _init__tray() {
    // Get the LightDOM trigger & tray content
    this.tray = this.querySelector(`[slot="tray"]`);

    //-- Check for any nested navigation items
    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(`${this.tag}`)]);
      let array = [];

      // Search the tray for nested slots
      if (!window.ShadyCSS) {
        [...this.tray.querySelectorAll("slot")].forEach(slot => {
          [...slot.assignedElements()].forEach(node => {
            array = array.concat([...node.querySelectorAll(`${this.tag}`)]);
          });
        });
      }

      this.nestedItems = this.nestedItems.concat(
        array.filter(el => {
          return !this.nestedItems.includes(el);
        })
      );

      this._init__handlers();
    }
  }

  _init__handlers() {
    if (this._handlersAdded) {
      return;
    }

    // Add the trigger to the flow
    this._trigger.setAttribute("tabindex", "0");
    // Remove the direct link from the flow
    if (this.directLink) {
      this.directLink.setAttribute("tabindex", "-1");
    }

    // Toggle the navigation when the trigger is clicked
    this._trigger.addEventListener("click", this.toggle);

    // Attaching to the parent element allows the exit key to work inside the tray too
    this.addEventListener("keyup", this._exit);
    this.addEventListener("keydown", this._keydownHandler);

    this._trigger.addEventListener("keyup", this._keyupHandler);
    this._handlersAdded = true;
  }

  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          event.preventDefault();
        }
        break;
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
      case "Enter":
      case 13:
        if (!["A"].includes(clicked.tagName)) {
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
