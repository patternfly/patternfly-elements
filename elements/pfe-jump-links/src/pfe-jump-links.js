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
    this.panel = document.querySelector(`[scrolltarget=${this.id}]`);
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

        let div = document.createElement("div");

        div.innerHTML = `<h2 class="sr-only" hidden>${this.getAttribute(
          "sr-text"
        )}</h2>`;

        if (this.getAttribute("sr-text")) {
          this.shadowRoot.querySelector("nav").prepend(div);
        }

        let html = "";
        if (this.querySelector(".pfe-jump-links-nav--heading")) {
          html = this.querySelector(".pfe-jump-links-nav--heading").cloneNode(
            true
          );
        }
        if (!this.hasAttribute("horizontal")) {
          if (html) {
            this.shadowRoot
              .querySelector("pfe-accordion-header")
              .appendChild(html);
          }
        } else {
          this.shadowRoot
            .querySelector("pfe-accordion-header")
            .appendChild(
              document.createElement("h3#pfe-jump-links-nav--heading")
            );
          this.shadowRoot.querySelector(
            "#pfe-jump-links-nav--heading"
          ).innerHTML = "Jump to section";
        }
      }
    }
    this._reportHeight();

    this._observer.observe(this, pfeJumpLinksNavObserverConfig);

    this.panel = document.querySelector(`[scrolltarget="${this.id}"]`);

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
    this.removeEventListener("click");
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    const buildLinkList = () => {
      let linkList = ``;
      if (!this.panel) {
        this.panel = document.querySelector(`[scrolltarget="${this.id}"]`);
      }
      let panelSections = this.panel.querySelectorAll(
        ".pfe-jump-links-panel__section"
      );

      for (let i = 0; i < panelSections.length; i++) {
        let arr = [...panelSections];
        if (arr[i].classList.contains("has-sub-section")) {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link has-sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
            <ul class="sub-nav">
        `;
          linkList += linkListItem;
        } else if (arr[i].classList.contains("sub-section")) {
          let linkSubItem = `
        <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
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
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
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
      (this.has_slot("logo") || this.has_slot("link")) &&
      !this.hasAttribute("horizontal")
    ) {
      console.warn(
        `${PfeJumpLinks.tag}: logo and link slots NOT supported in vertical jump links`
      );
    }
    if (this.children[1].tagName !== "UL") {
      if (!this.hasAttribute("horizontal")) {
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

  get styleUrl() {
    return "pfe-jump-links-panel.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = null;
    this.currentActive = 0;
    this.current = -1;
    this._getNav = this._getNav.bind(this);
    this.nav = this._getNav();
    this.offset = this.nav.getAttribute("offset") || 200;
  }

  connectedCallback() {
    if (!this.nav) {
      this.nav = this._getNav();
    }
    super.connectedCallback();
    this._init();

    if (this.nav && this.nav.hasAttribute("autobuild")) {
      this.nav._rebuildNav();
    }

    this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
  }

  disconnectedCallback() {
    this._observer.disconnect();
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);
    this.scrollTarget = this.getAttribute("scrolltarget");
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.querySelectorAll("a");
    }
  }

  _getNav() {
    return document.querySelector(
      `pfe-jump-links-nav#${this.getAttribute("scrolltarget")}`
    );
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
        `pfe-jump-links-nav#${this.getAttribute("scrolltarget")}`
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

  _scrollCallback() {
    let sections;
    let menu_links;
    let offset;
    if (Number.isInteger(parseInt(this.offset))) {
      offset = this.offset;
    } else {
      offset = 200;
    }

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
    const matches = sectionArr
      .filter(
        section =>
          // if (offset != 200) { console.log("offset is: ", offset); }
          // console.log("offset is: ", offset);
          // console.log("section.offsetTop is: ", section.offsetTop);
          // console.log("window.scrollY is: ", window.scrollY)
          window.scrollY >= section.offsetTop - offset
      )
      .reverse();

    //Identify the last one queried as the current section
    const current = sectionArr.indexOf(matches[0]);

    // If that section isn't already active,
    // remove active from the other links and make it active
    if (current !== this.currentActive) {
      this._removeAllActive();
      this.currentActive = current;
      this._makeActive(current);
    }
  }
}

PFElement.create(PfeJumpLinks);
PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

export default PfeJumpLinks;
