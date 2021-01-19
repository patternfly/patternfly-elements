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
      activeNavItem: `${this.tag}:active-navItem`
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

  get sections() {
    return this.querySelectorAll(".pfe-jump-links-panel__section");
  }

  get customVar() {
    return this.cssVariable(`${this.tag}--offset`) || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.currentActive = null;

    this._slot = this.shadowRoot.querySelector("slot");

    this._init = this._init.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);
    this._isValidMarkup = this._isValidMarkup.bind(this);

    this._handleResize = this._handleResize.bind(this);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);

    this._observer = new MutationObserver(this._mutationCallback);
  }

  connectedCallback() {
    super.connectedCallback();

    this._makeSpacers();
    this._isValidMarkup();

    this._init();

    this.sectionMargin = this.offset;

    // Set up the mutation observer
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });

    // Attach the event listener for resize
    window.addEventListener("resize", this._handleResize);

    // Initialize if changes are made to slotted elements
    this._slot.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();
    this._slot.removeEventListener("slotchange", this._init);

    window.removeEventListener("scroll", this._scrollCallback);
    window.removeEventListener("resize", this._handleResize);
  }

  _offsetChanged(oldVal, newVal) {
    this.sectionMargin = newVal;
  }

  _isValidMarkup() {
    if (this.childElementCount === 1) {
      this.warn(
        "pfe-jump-links-panel must contain more than one child element. Having a top-level 'wrapper' will prevent appropriate styles from being applied."
      );
    }
  }

  _makeSpacers() {
    if (!this.sections) return;

    this.sections.forEach(section => {
      let parentDiv = section.parentNode;
      let html = document.createElement("div");
      parentDiv.insertBefore(html, section);
      let spacer = section.previousElementSibling;
      spacer.classList.add("pfe-jump-links__section--spacer");
      spacer.id = section.id;
      section.removeAttribute("id");
    });
  }

  _init() {
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      // Fire a rebuild if necessary
      if (this.nav && this.nav.autobuild) {
        this.nav.rebuild();
      }

      // Attach the scroll listener
      if (this.nav) window.addEventListener("scroll", this._scrollCallback);
    });
  }

  _handleResize() {
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      if (this.nav) this.nav._reportHeight();
    });
    this.sectionMargin = this.offset;
  }

  _mutationCallback() {
    if (window.ShadyCSS) this._observer.disconnect();

    this.emitEvent(PfeJumpLinksPanel.events.change);

    //If we want the nav to be built automatically, re-init panel
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      if (this.nav && this.nav.autobuild) this._init();
    });

    if (window.ShadyCSS)
      this._observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
  }

  _scrollCallback() {
    // Make an array from the node list
    const sectionArr = [...this.sections];
    // Get all the sections that match this point in the scroll
    const matches = sectionArr.filter(section => window.scrollY >= section.offsetTop - this.offsetValue).reverse();

    // If a match was not found, return
    if (matches.length <= 0) return;

    // Identify the last one queried as the current section
    // @TODO: this is where we can edit for multiple select
    const current = sectionArr.indexOf(matches[0]);

    // If that section isn't already active,
    // remove active from the other links and make it active
    if (current !== this.currentActive) {
      Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
        this.nav.setActive(current);
        this.currentActive = current;
      });

      this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
        detail: {
          activeNavItem: current
        }
      });
    }
  }
}

export default PfeJumpLinksPanel;
