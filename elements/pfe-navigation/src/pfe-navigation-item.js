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
        bento: {
          attributes: {
            width: "19px",
            height: "19px",
            viewBox: "-1 -1 20 20",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          },
          svg: `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
    </g>`
        },
        globe: {
          attributes: {
            width: "21px",
            height: "21px",
            viewBox: "-1 -1 22 22",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          },
          svg: `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icon">
            <circle id="Oval" cx="9.5" cy="9.5" r="9.5"></circle>
            <ellipse id="Oval" cx="9.5" cy="9.5" rx="4.75" ry="9.5"></ellipse>
            <path d="M9.5,0 L9.5,19" id="Path"></path>
            <path d="M1,14 L18,14" id="Path"></path>
            <path d="M0,9.5 L19,9.5" id="Path"></path>
            <path d="M1,5 L18,5" id="Path"></path>
        </g>
    </g>`
        },
        menu: {
          attributes: {
            width: "23px",
            height: "18px",
            viewBox: "-1 -1 24 19",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          },
          svg: `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icon">
            <rect id="Rectangle" x="0.5" y="14.5" width="22" height="3"></rect>
            <rect id="Rectangle" x="0.5" y="7.5" width="22" height="3"></rect>
            <rect id="Rectangle" x="0.5" y="0.5" width="22" height="3"></rect>
        </g>
    </g>`
        },
        search: {
          attributes: {
            width: "20px",
            height: "20px",
            viewBox: "-1 -1 21 21",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          },
          svg: `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icon">
            <path d="M12,13 L18,19" id="Path" stroke-linecap="round"></path>
            <ellipse id="Oval" cx="7" cy="7.5" rx="7" ry="7.5"></ellipse>
        </g>
    </g>`
        },
        user: {
          attributes: {
            width: "21px",
            height: "20px",
            viewBox: "0 0 21 20",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          },
          svg: `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g id="Icon">
            <path d="M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19" id="Path"></path>
            <circle id="Oval" cx="9.5" cy="4.75" r="4.75"></circle>
        </g>
    </g>`
        }
    };
  }

  static get observedAttributes() {
    return [
      "pfe-icon"
    ];
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

    this.runCount = 0;

    this._readyEvent = new CustomEvent(`${this.tag}:ready`);

    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);

    this.ready = false;

    ["trigger", "tray"].forEach((slot) => {
      this[slot] = {
        slotName: `${this.tag}--${slot}`,
        className: `${this.tag}__${slot}`,
        light:   this.querySelector(`[slot="${this.tag}--${slot}"]`),
        shadow:  this.shadowRoot.querySelector(`.${this.tag}__${slot}`),
        content: []
      };
    });

    // If this is not contained by a navigation element, release it for rendering
    if(!this.closest("pfe-navigation")) {
      this.ready = true;
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

      // Add the icon to the trigger if the property has been set
      if(this.hasAttribute("pfe-icon")) {
        const iconName = this.getAttribute("pfe-icon");
        // If an icon string is returned and that string is part of the stored SVGs
        if(iconName && this._pfeClass.iconSVG[iconName]) {
          let iconSlot = this.trigger.shadow.querySelector(`.${this.tag}__icon`);
          if(iconSlot) {
            iconSlot.append(this._buildSVG(iconName));
          }
        }
      }
    }

    // Remove the hidden attribute from the light DOM element
    if(this.tray.light) {
      this.tray.light.removeAttribute("hidden");

      // Initialize expanded to false
      this.expanded = false;

      // Get the container element from the template
      this.tray.container = this.shadowRoot.querySelector(`.${this.tag}__container`);

      // Convert pfe-navigation-item--tray-region into classes for styling
      // Get all elements inside the container
      if(this.tray.container) {
        const trayRegions = [...this.tray.container.children];
        // Pull out the aside and footer elements
        for (let i = 0; i < trayRegions.length; i++) {
          switch (trayRegions[i].getAttribute(`${this.tag}--tray-region`)) {
            case "aside":
              trayRegions[i].classList.add(`${this.tag}__tray--aside`);
              break;
            case "footer":
              trayRegions[i].classList.add(`${this.tag}__tray--footer`);
              break;
            default:
              trayRegions[i].classList.add(`${this.tag}__tray--main`);
              break;
          }

          // Remove the region definitions from the children elements
          trayRegions[i].removeAttribute(`${this.tag}--tray-region`);
        }
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

  _sortContent(lightDOM) {
    for (let i = 0; i < lightDOM.length; i++) {
      const child = lightDOM[i];
      // Check first for slot names
      switch (child.getAttribute("slot")) {
        case this.trigger.slotName:
          this.trigger.content.push(child);
          break;
        case this.tray.slotName:
          this.tray.content.push(child);
          break;
        default:
          // If it's the first child the tag is a link
          // assign it to the trigger
          // but only if the trigger does not already exist
          if(i === 0 && child.tagName === "A" && !this.trigger.content.length) {
            this.trigger.content.push(child);
          }
          else if(!this.tray.content.length) {
            this.tray.content.push(child);
          }
          break;
      }
    }
  }

  _buildSVG(icon, className = "") {
    const attributes = this._pfeClass.iconSVG[icon].attributes;
    const code = this._pfeClass.iconSVG[icon].svg;
    let svg;
    if(code) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      if(attributes) {
        Object.entries(attributes).forEach((attr) => {
          svg.setAttribute(attr[0], attr[1]);
        });
      }
      // Add an icon class to the svg
      if(className) {
        svg.classList.add(className);
      }
      svg.innerHTML = code;
    }
    return svg;
  }

  _clickHandler(event) {
    console.log(event.target);
    console.log(this.trigger);
    if (event.target.parentElement === this.trigger.shadow) {
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
