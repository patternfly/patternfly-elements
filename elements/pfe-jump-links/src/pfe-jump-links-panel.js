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
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;

    // Fire a rebuild if necessary
    if (this.nav && this.nav.autobuild) this.nav.rebuild();

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
    if (!this.sections) {
      return;
    }
    this.sections.forEach(section => {
      let parentDiv = section.parentNode;
      let html = document.createElement("div");
      parentDiv.insertBefore(html, section);
      let spacer = section.previousElementSibling;
      spacer.classList.add("pfe-jump-links__section--spacer");
      spacer.id = section.id;
      section.removeAttribute("id");

      // Note: Since we can't be sure this element will be a
      // direct child of the jump-links panel, we're inlining styles
      const offset =
        this.cssVariable("pfe-jump-links-panel__section--spacer") ||
        this.cssVariable("pfe-navigation--Height--actual") +
          this.cssVariable("pfe-jump-links--nav-height") +
          this.cssVariable("jump-links-nav--nudge");
      spacer.style.display = "block";
      spacer.style.marginTop = `calc(${offset} * -1)`;
      spacer.style.height = offset;
      spacer.style.width = 0;
      spacer.style.position = "relative";
    });
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);

    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      this.menu_links = this.nav.links;
    });
  }

  _handleResize() {
    if (this.nav) this.nav._reportHeight();
    this.sectionMargin = this.offset;
    this.customVar = this.cssVariable(`${this.tag}--offset`) || 200;
  }

  _makeActive(link) {
    if (!(link > this.menu_links.length)) {
      let activeLink = this.menu_links.item(link);
      if (activeLink) {
        // Check if this is a subnav or has subsections
        if (activeLink.classList.contains("sub-section")) {
          activeLink.setAttribute("active", "");
          activeLink.parentNode.parentNode.parentNode.setAttribute("active", "");
          activeLink.parentNode.parentNode.parentNode.classList.add("expand");
        } else if (activeLink.classList.contains("has-sub-section")) {
          activeLink.setAttribute("active", "");
          activeLink.parentNode.setAttribute("active", "");
          activeLink.parentNode.classList.add("expand");
        } else {
          activeLink.setAttribute("active", "");
          activeLink.parentNode.setAttribute("active", "");
        }

        // let activeLink2 = this.menu_links.querySelector("[active]");
        this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
          detail: {
            activeNavItem: activeLink
          }
        });
      }
    }
  }

  _removeActive(link) {
    let oldLink = this.menu_links[link];
    if (oldLink) {
      if (oldLink.classList.contains("sub-section")) {
        oldLink.parentNode.parentNode.parentNode.classList.remove("expand");
      }
      oldLink.removeAttribute("active");
      oldLink.parentNode.removeAttribute("active");
    }
  }

  _removeAllActive() {
    if (!Object.keys) {
      Object.keys = function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Object.keys called on a non-object");
        var k = [],
          p;
        for (p in obj) if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
        return k;
      };
      Object.keys.forEach = Array.forEach;
    }
    [...Array(this.sections.length).keys()].forEach(link => {
      this._removeActive(link);
    });
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.nav && this.nav.autobuild) {
      this._init();
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav.rebuild();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }
  }

  _scrollCallback() {
    let current;

    // Check list of links to make sure we have them (if not, get them)
    if (this.menu_links.length <= 0) {
      this.menu_links = [...this.nav.links];
    }

    // Make an array from the node list
    const sectionArr = [...this.sections];

    // Get all the sections that match this point in the scroll
    const matches = sectionArr
      .filter(section => {
        const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return (
          section.offsetTop - this.offsetValue >= window.scrollY && section.offsetTop <= window.scrollY + viewHeight
        );
      })
      .reverse();

    this._observer.disconnect();

    // If the multi-select flag is set on the navigation
    // capture all the visible elements
    if (this.nav.multiSelect) {
      current = matches;

      if (this.currentActive) {
        this.currentActive.forEach(activeItem => {
          if (current.length > 0 && !current.includes(activeItem)) {
            this._removeActive(sectionArr.indexOf(activeItem));
          }
        });
      }
      // Set the list as the currently active items
      this.currentActive = current || [];
      if (current)
        current.forEach(item => {
          this._makeActive(sectionArr.indexOf(item));
        });
    } else {
      // Identify the last one queried as the current section
      current = sectionArr.indexOf(matches[0]);

      // If that section isn't already active,
      // remove active from the other links and make it active
      if (current !== this.currentActive) {
        this._removeAllActive();
        this.currentActive = current;
        this._makeActive(current);
      }
    }

    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
  }
}

export default PfeJumpLinksPanel;
