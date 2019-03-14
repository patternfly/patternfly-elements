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

      if (this.trigger.shadow) {
        this.trigger.shadow.setAttribute("aria-expanded", true);
      }

      if (this.tray.shadow) {
        this.tray.shadow.removeAttribute("hidden");
        this.tray.shadow.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.trigger.shadow) {
        this.trigger.shadow.removeAttribute("aria-expanded");
      }

      if (this.tray.shadow) {
        this.tray.shadow.setAttribute("hidden", true);
        this.tray.shadow.removeAttribute("aria-expanded");
      }
    }

    // this.dispatchEvent(
    //   new CustomEvent(`${PfeNavigationItem.tag}:toggled`, {
    //     detail: { navigationItem: this, expanded: this.expanded },
    //     bubbles: true,
    //     composed: true
    //   })
    // );
  }

  get iconSVG() {
    return {
      bento: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
          <title>Icon</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Icon">
                  <rect id="Rectangle" x="14" y="14" width="5" height="5"></rect>
                  <rect id="Rectangle" x="7" y="14" width="5" height="5"></rect>
                  <rect id="Rectangle" x="0" y="14" width="5" height="5"></rect>
                  <rect id="Rectangle" x="14" y="7" width="5" height="5"></rect>
                  <rect id="Rectangle" x="7" y="7" width="5" height="5"></rect>
                  <rect id="Rectangle" x="0" y="7" width="5" height="5"></rect>
                  <rect id="Rectangle" x="14" y="0" width="5" height="5"></rect>
                  <rect id="Rectangle" x="7" y="0" width="5" height="5"></rect>
                  <rect id="Rectangle" x="0" y="0" width="5" height="5"></rect>
              </g>
          </g>
      </svg>`,
      globe: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
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
      menu: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="23px" height="18px" viewBox="0 0 23 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
          <title>Icon</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Icon">
                  <rect id="Rectangle" x="0.5" y="14.5" width="22" height="3"></rect>
                  <rect id="Rectangle" x="0.5" y="7.5" width="22" height="3"></rect>
                  <rect id="Rectangle" x="0.5" y="0.5" width="22" height="3"></rect>
              </g>
          </g>
      </svg>`,
      search: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
          <title>Icon</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Icon">
                  <path d="M12,13 L18,19" id="Path" stroke-linecap="round"></path>
                  <ellipse id="Oval" cx="7" cy="7.5" rx="7" ry="7.5"></ellipse>
              </g>
          </g>
      </svg>`,
      user: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
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

  static get observedAttributes() {
    return ["pfe-icon"];
  }

  static get cascadingAttributes() {
    return {
      "pfe-icon": ".pfe-navigation-item__trigger"
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });

    // This context attribute will track the region of the navigation
    this.context = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);

    ["trigger", "tray"].forEach((slot) => {
      this[slot] = {
        light:   this.querySelector(`[slot="${slot}"]`),
        shadow:  this.shadowRoot.querySelector(`.${this.tag}__${slot}`)
      };
    });

    // If the trigger and tray slots have not been assigned
    if(!this.trigger.light) {
      // Get the first link and assign it to the trigger
      this.trigger.light = this.querySelector("a");
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if(this.trigger.light) {
      // If the role attribute has not been provided, attach it to the trigger
      if (!this.trigger.shadow.hasAttribute("role")) {
        this.trigger.shadow.setAttribute("role", "button");
      }

      // Attach an on click listener
      this.trigger.shadow.addEventListener("click", this._clickHandler);
      // Attach an on keydown listener
      this.trigger.shadow.addEventListener("keydown", this._keydownHandler);

      // Remove the hidden attribute from the light DOM element
      if(this.tray.light) {
        this.tray.light.removeAttribute("hidden");

        // Initialize expanded to false
        this.expanded = false;

        // Get all elements inside the container
        const trayRegions = [...this.tray.light.children];
        // Loop through all tray elements and attach the grid areas for them
        for (let i = 0; i < trayRegions.length; i++) {
          if (trayRegions[i].hasAttribute("tray-region")) {
            // Apply the grid area property to each region
            trayRegions[i].style.gridArea = trayRegions[i].getAttribute("tray-region");
            // Add additional border and padding properties to the footer
            if(trayRegions[i].getAttribute("tray-region") === "footer") {
              trayRegions[i].style.borderTop = "var(--pfe-navigation-item__tray--BorderTop)";
              trayRegions[i].style.paddingTop = "var(--pfe-navigation-item--Padding--vertical)";
            }
          }
        }

        // Position the tray underneath the trigger element
      }
    }
  }

  disconnectedCallback() {
    // When disconnecting, remove the listeners from the trigger
    if (this.trigger.shadow) {
      this.trigger.shadow.removeEventListener("click", this._changeHandler);
      this.trigger.shadow.removeEventListener("keydown", this._keydownHandler);
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
    // Check if the event is firing from the light DOM
    // or on one of the items in the shadow trigger
    let isLightLink = event.target === this.trigger.light;
    let isShadowChild = event.target.closest(".pfe-navigation-item__trigger") === this.trigger.shadow;
    if (isLightLink || isShadowChild) {
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
        if (this.trigger.shadow) {
          this.trigger.shadow.focus();
        }
        break;
      default:
        return;
    }
  }
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
