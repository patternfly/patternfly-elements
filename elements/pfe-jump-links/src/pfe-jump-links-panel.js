import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get templateUrl() {
    return "pfe-jump-links-panel.html";
  }

  get styleUrl() {
    return "pfe-jump-links-panel.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`,
      upgrade: `${this.tag}:upgraded`
    };
  }

  get offsetValue() {
    return this.sectionMargin || parseInt(this.customVar, 10);
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      offset: {
        title: "Offset",
        type: Number,
        observer: "_offsetChanged"
      },
      scrolltarget: {
        title: "Scroll target",
        type: String
      },
      // @TODO: Deprecated in 1.0
      oldOffset: {
        alias: "offset",
        attr: "pfe-c-offset"
      },
      // @TODO: Deprecated in 1.0
      oldScrolltarget: {
        alias: "scrolltarget",
        attr: "pfe-c-scrolltarget"
      }
    };
  }

  static get observerSettings() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    };
  }

  get nav() {
    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.scrolltarget) {
      return document.querySelector(`pfe-jump-links-nav#${this.scrolltarget}`);
    } else {
      const navs = document.querySelectorAll("pfe-jump-links-nav");
      if (navs.length === 1) {
        return navs.item(0);
      } else if (navs.length > 1) {
        this.warn(
          `Cannot locate a navigation element that is connected to this panel.${
            this.id ? ` Please add id="${this.scrolltarget}" to the appropriate navigation.` : ""
          }`
        );
      } else {
        this.warn(`Cannot locate any navigation elements on this page. Please add a "pfe-jump-links-nav" element.`);
      }
    }

    return;
  }

  // get sections() {
  //   return this.querySelectorAll(".pfe-jump-links-panel__section");
  // }

  get customVar() {
    return this.cssVariable(`${this.tag}--offset`) || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.activeItems = [];
    this.sections = [];

    // this._slot = this.shadowRoot.querySelector("slot");

    this._init = this._init.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);
    this._scrollCallback = this._scrollCallback.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    this.sectionMargin = this.offset;

    this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
      detail: {
        sections: this.sections
      }
    });

    // Set up the mutation observer to watch the Jump links panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener("scroll", this._scrollCallback);
  }

  _offsetChanged(oldVal, newVal) {
    this.sectionMargin = newVal;
  }

  _makeSpacers() {
    if (!this.sections) return;

    this.sections.forEach(section => {
      let parentDiv = section.parentNode;
      let spacer = document.createElement("div");

      // Insert the spacer before the section heading
      parentDiv.insertBefore(spacer, section);

      // let spacer = section.previousElementSibling;
      spacer.classList.add("pfe-jump-links__section--spacer");

      // Move the ID from the section to the new spacer, store a reference
      let sectionId = section.id;
      spacer.id = sectionId;
      section.removeAttribute("id");
      section.setAttribute("ref-id", sectionId);
    });
  }

  _init() {
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

    if (this.sections) this._makeSpacers();

    // If sections exist, emit an event announcing the panel change
    if (this.sections)
      this.emitEvent(PfeJumpLinksPanel.events.change, {
        detail: {
          sections: this.sections
        }
      });

    // Attach the scroll listener
    window.addEventListener("scroll", this._scrollCallback);
  }

  _scrollCallback() {
    // Get all the sections that match this point in the scroll
    let matches = [];
    let hasChange = false;
    let ids = [];
    this.sections.forEach(section => {
      let positionTop = parseInt(section.getBoundingClientRect().top) - this.offsetValue;
      let positionBottom = parseInt(section.getBoundingClientRect().bottom) - this.offsetValue;
      if (window.scrollY <= positionTop && window.scrollY + window.innerHeight >= positionBottom) {
        matches.push(section);
        hasChange = !this.activeItems.includes(section);
        ids.push(section.id || section.getAttribute("ref-id"));
      }
    });

    this.activeItems = matches;

    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeIds: ids
      }
    });
  }
}

export default PfeJumpLinksPanel;
