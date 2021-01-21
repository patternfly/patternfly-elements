import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksNav from "./pfe-jump-links-nav.js";

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
    return this.offset || parseInt(this.customVar, 10) || 0;
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

  // get nav() {
  //   // Use the ID from the navigation to target the panel elements
  //   // Automatically if there's only one set of tags on the page
  //   if (this.scrolltarget) {
  //     return document.querySelector(`pfe-jump-links-nav#${this.scrolltarget}`);
  //   } else {
  //     const navs = document.querySelectorAll("pfe-jump-links-nav");
  //     if (navs.length === 1) {
  //       return navs.item(0);
  //     } else if (navs.length > 1) {
  //       this.warn(
  //         `Cannot locate a navigation element that is connected to this panel.${
  //           this.id ? ` Please add id="${this.scrolltarget}" to the appropriate navigation.` : ""
  //         }`
  //       );
  //     } else {
  //       this.warn(`Cannot locate any navigation elements on this page. Please add a "pfe-jump-links-nav" element.`);
  //     }
  //   }

  //   return;
  // }

  // get sections() {
  //   return this.querySelectorAll(".pfe-jump-links-panel__section");
  // }

  get customVar() {
    return this.cssVariable(`${this.tag}--offset`) || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.nav = undefined;

    this.visibleSections = [];
    this.sections = [];

    this._connectToNav = this._connectToNav.bind(this);
    this._init = this._init.bind(this);

    // this._makeSpacers = this._makeSpacers.bind(this);
    // this._scrollCallback = this._scrollCallback.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  /**
   * Connect the panel to it's associated navigation
   *
   * @async
   * @return
   */
  _connectToNav(evt) {
    if (!this.nav && evt.detail && evt.detail.nav) {
      // Capture the pointer from the event details
      let pointer = evt.detail.nav;
      // Validate that the id and scrolltarget match
      if (pointer.id === this.scrolltarget) {
        // Assign the pointer to the nav reference
        this.nav = pointer;

        // Stop the nav from listening for panel upgrade
        document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this.nav._connectToPanel);

        // If the nav does not have a pointer to this panel yet, add one
        if (!this.nav.panel) this.nav.panel = this;
      } else {
        // Escape without removing the event because the nav with the right id was not found
        return;
      }
    }

    // Stop listening for nav upgrade because a connection has been made
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);
  }

  connectedCallback() {
    super.connectedCallback();

    // Set up a listener for the paired navigation element
    document.body.addEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);

    this._init();

    // If sections exist, emit an event announcing the panel change
    // if (this.sections)
    //   this.emitEvent(PfeJumpLinksPanel.events.change, {
    //     detail: {
    //       sections: this.sections
    //     }
    //   });

    this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
      detail: {
        panel: this
      }
    });

    // Attach the scroll listener
    // window.addEventListener("scroll", this._scrollCallback);

    // Set up the mutation observer to watch the Jump links panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener("scroll", this._scrollCallback);
  }

  _makeSpacers() {
    if (!this.sections) return;

    // @TODO: I'm not sure this is accessible; maybe we use animate instead with offset there?
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

    if (!this.sections) {
      this.warn(`No elements in ${this.tag} included the required .${this.tag}__section class.`);
      // Escape at this point because we don't need to create spacers if no sections exist
      return;
    }

    // @Q? Do we need spacers if there is no offset?
    if (this.offsetValue && this.offsetValue > 0) this._makeSpacers();

    // @TODO: Handle reduce motion with smooth scroll
    // /* JavaScript MediaQueryList Interface */
    // var motionQuery = window.matchMedia("(prefers-reduced-motion)");
    // if (motionQuery.matches) {
    //   /* reduce motion */
    // }
    // motionQuery.addListener(handleReduceMotionChanged);
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
        hasChange = !this.visibleSections.includes(section);
        ids.push(section.id || section.getAttribute("ref-id"));
      }
    });

    this.visibleSections = matches;

    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeIds: ids
      }
    });
  }
}

export default PfeJumpLinksPanel;
