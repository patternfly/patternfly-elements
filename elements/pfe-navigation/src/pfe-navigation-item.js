import PFElement from "../pfelement/pfelement.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.classList.add("expanded");

      if (this.trigger) {
        this.trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.classList.remove("hide");
        this.tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.trigger) {
        this.trigger.removeAttribute("aria-expanded");
      }

      if (this.tray) {
        this.tray.classList.add("hide");
        this.tray.removeAttribute("aria-expanded");
      }
    }

    this.dispatchEvent(
      new CustomEvent(`${PfeNavigationItem.tag}:toggled`, {
        detail: { navigationItem: this, expanded: this.expanded },
        bubbles: true,
        composed: true
      })
    );
  }

  static get iconSVG() {
    return {
        bento:  "<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Icon' fill='#FFFFFF'><rect id='Rectangle' x='14' y='14' width='5' height='5'></rect><rect id='Rectangle' x='7' y='14' width='5' height='5'></rect><rect id='Rectangle' x='0' y='14' width='5' height='5'></rect><rect id='Rectangle' x='14' y='7' width='5' height='5'></rect><rect id='Rectangle' x='7' y='7' width='5' height='5'></rect><rect id='Rectangle' x='0' y='7' width='5' height='5'></rect><rect id='Rectangle' x='14' y='0' width='5' height='5'></rect><rect id='Rectangle' x='7' y='0' width='5' height='5'></rect><rect id='Rectangle' x='0' y='0' width='5' height='5'></rect></g></g>",
        globe:  "<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Icon' transform='translate(1.000000, 1.000000)' stroke='#FFFFFF'><circle id='Oval' cx='9.5' cy='9.5' r='9.5'></circle><ellipse id='Oval' cx='9.5' cy='9.5' rx='4.75' ry='9.5'></ellipse><path d='M9.5,0 L9.5,19' id='Path'></path><path d='M1,14 L18,14' id='Path'></path><path d='M0,9.5 L19,9.5' id='Path'></path><path d='M1,5 L18,5' id='Path'></path></g></g>",
        menu:   "<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Icon' fill='#FFFFFF' stroke='#FFFFFF'><rect id='Rectangle' x='0.5' y='14.5' width='22' height='3'></rect><rect id='Rectangle' x='0.5' y='7.5' width='22' height='3'></rect><rect id='Rectangle' x='0.5' y='0.5' width='22' height='3'></rect></g></g>",
        search: "<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Icon' transform='translate(1.000000, 1.000000)' stroke='#FFFFFF'><path d='M12,13 L18,19' id='Path' stroke-linecap='round'></path><ellipse id='Oval' cx='7' cy='7.5' rx='7' ry='7.5'></ellipse></g></g>",
        user:   "<g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='round'><g id='Icon' transform='translate(1.000000, 1.000000)' stroke='#FFFFFF'><path d='M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19' id='Path'></path><circle id='Oval' cx='9.5' cy='4.75' r='4.75'></circle></g></g>"
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });

    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Get the ShadowDOM tray wrapper from the template
    this.tray = this.shadowRoot.querySelector(".pfe-navigation-item--wrapper");
    // Attach a trigger property to the component with the trigger slot
    this.trigger = this.querySelector('[slot="pfe-navigation-item--trigger"]')
    // Attach a tray property to the component with the trigger slot
    this.lightDomTray = this.querySelector('[slot="pfe-navigation-item--tray"]');
    // Initialize expanded to false
    this.expanded = false;

    // If the role attribute has not been provided, attach it to the trigger
    if (this.tray && this.trigger && !this.trigger.hasAttribute("role")) {
      this.trigger.setAttribute("role", "button");
    }

    // If the light DOM tray has been provided, remove the hidden attributes
    if (this.lightDomTray) {
      this.lightDomTray.removeAttribute("hidden");
    }

    // Only attach event listeners if the tray exists
    if (this.tray) {
      // Attach an on click listener
      this.addEventListener("click", this._clickHandler);
      // Attach an on keydown listener
      this.addEventListener("keydown", this._keydownHandler);
    }

    // Copy the content of the trigger slot into the ShadowDOM
    const lightTrigger = this.querySelector('[slot="pfe-navigation-item--trigger"]');
    const shadowTrigger = this.shadowRoot.querySelector('[name="pfe-navigation-item--trigger"]')
    // If the slot and contents exist, append the fragment to the DOM
    if(lightTrigger && shadowTrigger) {
      lightTrigger.classList.add("pfe-navigation-item--text");
      lightTrigger.removeAttribute("slot");
      shadowTrigger.appendChild(lightTrigger);
    }

    // Add the icon to the trigger if the property has been set
    if(this.hasAttribute("pfe-icon")) {
      const iconName = this.getAttribute("pfe-icon");
      // If an icon string is returned and that string is part of the stored SVGs
      if(iconName && this._pfeClass.iconSVG[iconName]) {
        // Build the SVG into an object
        let svg = document.createElement("svg");
        svg.version = "1.1";
        svg.xmlns = "http://www.w3.org/2000/svg";
        svg["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
        // Add an icon class to the svg
        svg.classList.add("pfe-navigation-item--icon");
        svg.innerHTML = this._pfeClass.iconSVG[iconName];
        if(this.trigger) {
          this.trigger.insertBefore(svg, this.trigger.firstChild);
        }
      }
    }
  }

  disconnectedCallback() {
    if (this.tray) {
      this.removeEventListener("click", this._changeHandler);
      this.removeEventListener("keydown", this._keydownHandler);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _clickHandler(event) {
    event.preventDefault();
    debugger;
    console.log(event);
    if (event.target === this.trigger) {
      event.preventDefault();
      this.expanded = !this.expanded;
    }
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Spacebar":
      case " ":
        event.preventDefault();
        this.expanded = !this.expanded;
        break;
      case "Esc":
      case "Escape":
        event.preventDefault();
        this.expanded = false;
        if (this.trigger) {
          this.trigger.focus();
        }
        break;
      default:
        return;
    }
  }

  // Update the icon attribute and return the SVG
  _updateIcon(attr, oldValue, newValue){
    // Inject the icon into the trigger element
    switch (newValue.toLowerCase()) {
      case "search":
        // Get the search SVG
        return this.icon.search;
      case "globe":
        // Get the globe SVG
        return this.icon.globe;
      case "user":
        // Get the person SVG
        return this.icon.user;
      case "bento":
        // Get the person SVG
        return this.icon.bento;
    }
  }
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
