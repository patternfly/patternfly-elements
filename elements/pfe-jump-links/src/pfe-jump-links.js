import PFElement from "../../pfelement/dist/pfelement.js";

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

  // static get events() {
  //   return {
  //   };
  // }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}
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

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });

    this._buildNav = this._buildNav.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._observer = new MutationObserver(this._mutationCallback);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    //Check that the light DOM is there
    if (this.hasAttribute("autobuild")) {
      this._buildNav();
    } else {
      //Check that the light DOM is valid
      if (this._isValidLightDom()) {
        const menu = this.querySelector("ul");
        this._menuContainer.innerHTML = menu.outerHTML;
      }
    }

    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });

    this.panel = document.querySelector(`[scrolltarget="${this.id}"]`);

    this.panel.addEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
  }

  disconnectedCallback() {
    this.removeEventListener("click");
    this.removeEventListener(PfeJumpLinksPanel.events.change, _eventCallback);
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    let html = "";
    html += `<h2 hidden id="site-nav-heading" class="sr-only">Page navigation</h2>`;
    html += `<h4 class="heading" slot="heading">Jump to section</h4>`;
    html += `<ul class="pfe-jump-links-nav">`;
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
          <li>
            <a
              class="pfe-jump-links-nav__item has-sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
            <ul class="sub-nav">
        `;
        html += linkListItem;
      } else if (arr[i].classList.contains("sub-section")) {
        let linkSubItem = `
        <li>
            <a
              class="pfe-jump-links-nav__item sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
        </li>`;
        if (!arr[i + 1].classList.contains("sub-section")) {
          linkSubItem += `</ul></li>`;
        }
        html += linkSubItem;
      } else {
        let linkListItem = `
          <li>
            <a
              class="pfe-jump-links-nav__item"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
          </li>
        `;
        html += linkListItem;
      }
    }
    this.shadowRoot.querySelector("#container").innerHTML = html;
  }

  _mutationCallback() {
    if (!this.hasAttribute("autobuild")) {
      const menu = this.querySelector("ul");
      this._menuContainer.innerHTML = menu.outerHTML;
    }
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(
        `${PfeJumpLinks.tag}: You must have a <ul> tag in the light DOM`
      );
      return false;
    }

    if (this.children[1].tagName !== "UL") {
      console.warn(
        `${PfeJumpLinks.tag}: The top-level list of links MUST be a <ul>`
      );

      return false;
    }

    return true;
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
      change: `${this.tag}:change`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = null;
    this.sectionMargin = 200;
    this.currentActive = 0;
    this.current = -1;
    this.nav = this._getNav();
  }

  connectedCallback() {
    super.connectedCallback();
    this._init();
    this.nav._rebuildNav();
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);
    this.scrollTarget = this.getAttribute("scrolltarget");
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.querySelectorAll(
        ".pfe-jump-links-nav__item"
      );
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
      this.dispatchEvent(
        new CustomEvent(`pfe-jump-links-panel:active-nav-item`, {
          detail: {
            activeNavItem: activeLink
          },
          bubbles: true
        })
      );
    }
  }

  _removeActive(link) {
    if (this.menu_links[link]) {
      //@TODO Should add logic here that doesn't remove active attribute
      // when ones of its children is the active link

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
    [...Array(this.sections.length).keys()].forEach(link => {
      this._removeActive(link);
    });
  }

  _mutationCallback() {
    //If we didn't get nav in the constructor, grab it now
    if (!this.nav) {
      this.nav = document.querySelector(
        `pfe-jump-links-nav#${this.getAttribute("scrolltarget")}`
      );
    }
    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.nav.hasAttribute("autobuild")) {
      this._init();
      //@TODO change this to emit an event that nav is subscribed to
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav._rebuildNav();
    }
  }

  _scrollCallback() {
    let sections;
    let menu_links;
    let sectionMargin;

    //Check sections to make sure we have them (if not, get them)
    if (!this.sections || typeof this.sections === "undefined") {
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    } else {
      sections = this.sections;
    }
    //Check list of links to make sure we have them (if not, get them)
    if (this.menu_links.length < 1 || !this.menu_links) {
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll(
        ".pfe-jump-links-nav__item"
      );
      menu_links = this.menu_links;
    }

    //@TODO read value from an attribute so devs can customize
    // margin from the top of the window
    if (!this.sectionMargin) {
      sectionMargin = 200;
    } else {
      sectionMargin = this.sectionMargin;
    }

    // Make an array from the node list
    const sectionArr = [...sections];
    // Get all the sections that match this point in the scroll
    const matches = sectionArr
      .filter(section => window.scrollY >= section.offsetTop - sectionMargin)
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
