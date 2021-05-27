import PFElement from "../../pfelement/dist/pfelement.js";

const pfeJumpLinksNavObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

const pfeJumpLinksPanelObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

class PfeJumpLinks extends PFElement {
  static get tag() {
    return "pfe-jump-links";
  }

  get schemaUrl() {
    return "pfe-jump-links.json";
  }

  get templateUrl() {
    return "pfe-jump-links.html";
  }

  get styleUrl() {
    return "pfe-jump-links.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }
}

class PfeJumpLinksNav extends PFElement {
  static get tag() {
    return "pfe-jump-links-nav";
  }

  get schemaUrl() {
    return "pfe-jump-links-nav.json";
  }

  get templateUrl() {
    return "pfe-jump-links-nav.html";
  }

  get styleUrl() {
    return "pfe-jump-links-nav.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });

    this._buildNav = this._buildNav.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._observer = new MutationObserver(this._mutationCallback);
    this._reportHeight = this._reportHeight.bind(this);
    this.panel =
      document.querySelector(`[scrolltarget=${this.id}]`) ||
      document.querySelector(`[pfe-c-scrolltarget=${this.id}]`);

    window.addEventListener("resize", () => {});
  }

  connectedCallback() {
    super.connectedCallback();
    //Check that the light DOM is there
    if (this.hasAttribute("autobuild")) {
      this._buildNav();
    } else {
      //Check that the light DOM is valid
      if (this._isValidLightDom()) {
        const menu = this.querySelector("ul");
        menu.classList.add("pfe-jump-links-nav");
        this._menuContainer.innerHTML = menu.outerHTML;

        if (this.hasAttribute("sr-text")) {
          let div = document.createElement("div");
          div.innerHTML = `<h2 class="sr-only" hidden>${this.getAttribute(
            "sr-text"
          )}</h2>`;

          this.shadowRoot.querySelector("nav").prepend(div);
        }

        let html = "";
        if (this.querySelector("[slot='pfe-jump-links-nav--heading']")) {
          html = this.querySelector(
            "[slot='pfe-jump-links-nav--heading']"
          ).cloneNode(true);
        }
        if (
          !(
            this.hasAttribute("horizontal") ||
            this.hasAttribute("pfe-c-horizontal")
          ) &&
          html !== ""
        ) {
          this.shadowRoot
            .querySelector("pfe-accordion-header")
            .appendChild(html);
        } else {
          const heading = document.createElement("h3");
          heading.id = "pfe-jump-links-nav--heading";

          this.shadowRoot
            .querySelector("pfe-accordion-header")
            .appendChild(heading);
          this.shadowRoot.querySelector(
            "#pfe-jump-links-nav--heading"
          ).innerHTML = "Jump to section";
        }
      }
    }
    this._reportHeight();

    this._observer.observe(this, pfeJumpLinksNavObserverConfig);

    this.panel =
      document.querySelector(`[scrolltarget="${this.id}"]`) ||
      document.querySelector(`[pfe-c-scrolltarget="${this.id}"]`);

    this.panel.addEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this.panel.removeEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    const buildLinkList = () => {
      let linkList = ``;
      if (!this.panel) {
        this.panel =
          document.querySelector(`[scrolltarget="${this.id}"]`) ||
          document.querySelector(`[pfe-c-scrolltarget="${this.id}"]`);
      }

      let panelSections = this.panel.querySelectorAll(
        ".pfe-jump-links-panel__section"
      );

      for (let i = 0; i < panelSections.length; i++) {
        let arr = [...panelSections];
        let section = arr[i];
        let text = section.innerHTML;

        // If a custom label was provided, use that instead
        if (section.hasAttribute("nav-label")) {
          text = section.getAttribute("nav-label");
        }

        if (section.classList.contains("has-sub-section")) {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link has-sub-section"
              href="#${section.id}"
              data-target="${section.id}">
                ${text}
            </a>
            <ul class="sub-nav">
        `;
          linkList += linkListItem;
        } else if (section.classList.contains("sub-section")) {
          let linkSubItem = `
        <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link sub-section"
              href="#${section.id}"
              data-target="${section.id}">
                ${text}
            </a>
        </li>`;
          if (!arr[i + 1].classList.contains("sub-section")) {
            linkSubItem += `</ul></li>`;
          }
          linkList += linkSubItem;
        } else {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link"
              href="#${section.id}"
              data-target="${section.id}">
                ${text}
            </a>
          </li>
        `;
          linkList += linkListItem;
        }
      }
      return linkList;
    };

    let html = `
      <ul class="pfe-jump-links-nav">
        ${buildLinkList()}
    `;
    this.shadowRoot.querySelector("#container").innerHTML = html;
    let heading = document.createElement("h3");
    heading.innerHTML = "Jump to section";
    this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.hasAttribute("autobuild")) {
      const menu = this.querySelector("ul");
      this._menuContainer.innerHTML = menu.outerHTML;
    } else if (this.hasAttribute("autobuild")) {
      this._buildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksNavObserverConfig);
    }
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(
        `${PfeJumpLinks.tag}: You must have a <ul> tag in the light DOM`
      );
      return false;
    }
    if (
      (this.shadowRoot.querySelector("[slot='logo']") ||
        this.shadowRoot.querySelector("[slot='link']")) &&
      !(
        this.hasAttribute("pfe-c-horizontal") || this.hasAttribute("horizontal")
      )
    ) {
      console.warn(
        `${PfeJumpLinks.tag}: logo and link slots NOT supported in vertical jump links`
      );
    }
    if (this.children[1].tagName !== "UL") {
      if (
        !(
          this.hasAttribute("pfe-c-horizontal") ||
          this.hasAttribute("horizontal")
        )
      ) {
        console.warn(
          `${PfeJumpLinks.tag}: The top-level list of links MUST be a <ul>`
        );
      }

      return false;
    }

    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const height = this.clientHeight + "px";
    this.panel.style.setProperty(cssVarName, height);
  }
}

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get schemaUrl() {
    return "pfe-jump-links-panel.json";
  }

  get templateUrl() {
    return "pfe-jump-links-panel.html";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`
    };
  }

  get offsetValue() {
    return this.sectionMargin || this.customVar || 0;
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-c-offset", "offset"];
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this.debounce = this.debounce.bind(this);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = 0;
    this.current = -1;
    window.addEventListener("resize", this._handleResize);
  }

  connectedCallback() {
    super.connectedCallback();

    this.scrollTarget =
      this.getAttribute("pfe-c-scrolltarget") ||
      this.getAttribute("scrolltarget");

    this.nav = this._getNav();

    this._init();

    this.sectionMargin =
      this.getAttribute("pfe-c-offset") || this.getAttribute("offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset");
    if (
      this.nav &&
      (this.nav.hasAttribute("pfe-c-autobuild") ||
        this.nav.hasAttribute("autobuild"))
    ) {
      this.nav._rebuildNav();
    }

    this._makeActive(this.currentActive);

    this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
  }

  disconnectedCallback() {
    this._observer.disconnect();
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
    window.removeEventListener("resize", this._handleResize);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    switch (attr) {
      case "pfe-c-offset":
      case "offset":
        this.sectionMargin = newVal;
        break;
    }
  }

  _init() {
    window.addEventListener("scroll", this.debounce("_scrollCallback", 100));
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.querySelectorAll("a");
    }
  }

  _handleResize() {
    this.nav._reportHeight();
    this.sectionMargin =
      this.getAttribute("pfe-c-offset") || this.getAttribute("offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset");
  }

  _getNav() {
    return document.querySelector(`pfe-jump-links-nav#${this.scrollTarget}`);
  }

  _makeActive(link) {
    if (this.menu_links[link]) {
      // Check if this is a subnav or has subsections
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.parentNode.parentNode.setAttribute(
          "active",
          ""
        );
        this.menu_links[link].parentNode.parentNode.parentNode.classList.add(
          "expand"
        );
      } else if (this.menu_links[link].classList.contains("has-sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
        this.menu_links[link].parentNode.classList.add("expand");
      } else {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
      }

      let activeLink = this.JumpLinksNav.querySelector("[active]");
      this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
        detail: {
          activeNavItem: activeLink
        }
      });
    }
  }

  _removeActive(link) {
    if (this.menu_links[link]) {
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].parentNode.parentNode.parentNode.classList.remove(
          "expand"
        );
      }
      this.menu_links[link].removeAttribute("active");
      this.menu_links[link].parentNode.removeAttribute("active");
    }
  }

  _removeAllActive() {
    if (!Object.keys) {
      Object.keys = function(obj) {
        if (obj !== Object(obj))
          throw new TypeError("Object.keys called on a non-object");
        var k = [],
          p;
        for (p in obj)
          if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
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

    //If we didn't get nav in the constructor, grab it now
    if (!this.nav) {
      this.nav = document.querySelector(
        `pfe-jump-links-nav#${this.scrollTarget}`
      );
    }
    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.nav.hasAttribute("autobuild")) {
      this._init();
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav._rebuildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
    }
  }

  debounce(method, delay) {
    clearTimeout(this[method]._tId);
    this[method]._tId = setTimeout(() => {
      this[method]();
    }, delay);
  }

  _scrollCallback() {
    let sections;
    let menu_links;
    //Check sections to make sure we have them (if not, get them)
    if (!this.sections || typeof this.sections === "undefined") {
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    } else {
      sections = this.sections;
    }

    //Check list of links to make sure we have them (if not, get them)
    if (this.menu_links.length < 1 || !this.menu_links) {
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll("a");
      menu_links = this.menu_links;
    }

    // Make an array from the node list
    const sectionArr = [...sections];

    // Get all the sections that match this point in the scroll
    const matches = sectionArr.filter(section => {
      return (
        section.getBoundingClientRect().top > this.offsetValue &&
        section.getBoundingClientRect().bottom < window.innerHeight
      );
    });

    console.log(matches);

    // Don't change anything if no items were found
    if (matches.length === 0) return;

    // Identify the first one queried as the current section
    let current = matches[0];

    // If there is more than 1 match, check it's distance from the top
    // whichever is within 200px, that is our current.
    if (matches.length > 1) {
      const close = matches.filter(
        section => section.getBoundingClientRect().top <= 200
      );
      // If 1 or more items are found, use the last one.
      if (close.length > 0) current = close[close.length - 1];
    }

    console.log(current);

    if (current) {
      const currentIdx = sectionArr.indexOf(current);

      console.log({ currentIdx, currentActive: this.currentActive });

      // If that section isn't already active,
      // remove active from the other links and make it active
      if (currentIdx !== this.currentActive) {
        this._removeAllActive();
        this.currentActive = currentIdx;
        this._makeActive(currentIdx);
      }
    }
  }
}

PFElement.create(PfeJumpLinks);
PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

export default PfeJumpLinks;
