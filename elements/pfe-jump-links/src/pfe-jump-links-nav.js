// Import polyfills: NodeList.prototype.forEach
import "./polyfills--pfe-jump-links-nav.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksPanel from "./pfe-jump-links-panel.js";

class PfeJumpLinksNav extends PFElement {
  static get tag() {
    return "pfe-jump-links-nav";
  }

  get templateUrl() {
    return "pfe-jump-links-nav.html";
  }

  get styleUrl() {
    return "pfe-jump-links-nav.scss";
  }

  static get events() {
    return {
      upgrade: `${this.tag}:upgraded`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      autobuild: {
        title: "Autobuild",
        type: Boolean
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean
      },
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["darkest"]
      },
      // @TODO: Deprecated in 2.0
      oldAutobuild: {
        alias: "autobuild",
        attr: "pfe-c-autobuild"
      },
      // @TODO: Deprecated in 2.0
      oldHorizontal: {
        alias: "horizontal",
        attr: "pfe-c-horizontal"
      },
      // @TODO: Deprecated in 2.0
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      }
    };
  }

  static get observerSettings() {
    return {
      childList: true,
      subtree: true,
      characterData: true
    };
  }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType
    });

    // Global pointer to the associated panel
    // If this is empty, we know that no panel exists for this nav
    this.panel = undefined;

    // Debouncer state for buildNav()
    this._buildingNav = false;

    // Global definition for link elements in the ShadowDOM
    this.links;
    this.activeLinks = [];

    // Public API
    this.getLinkById = this.getLinkById.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.setActive = this.setActive.bind(this);
    this.isActive = this.isActive.bind(this);
    this.removeActive = this.removeActive.bind(this);
    this.removeAllActive = this.removeAllActive.bind(this);
    this.upgradeA11y = this.upgradeA11y.bind(this);
    this.upgradeA11yListItem = this.upgradeA11yListItem.bind(this);

    //-- Internal-only methods
    this._connectToPanel = this._connectToPanel.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._buildNav = this._buildNav.bind(this);
    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._copyListToShadow = this._copyListToShadow.bind(this);
    // this._reportHeight = this._reportHeight.bind(this);
    this._init = this._init.bind(this);

    // Event handlers
    this._clickHandler = this._clickHandler.bind(this);
    this._activeItemHandler = this._activeItemHandler.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the navigation
    this._init();

    document.body.addEventListener(PfeJumpLinksPanel.events.activeNavItem, this._activeItemHandler);

    // Trigger the mutation observer
    if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);

    this.emitEvent(PfeJumpLinksNav.events.upgrade, {
      detail: {
        nav: this
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);

    if (this.panel) {
      this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._init);
      this.panel.removeEventListener(PfeJumpLinksPanel.events.activeNavItem, () => {});
    }

    this.links.forEach(link => {
      link.removeEventListener("click", this._clickHandler);
    });
  }

  getLinkById(id) {
    if (!id) return;

    let link;

    const links = this.shadowRoot.querySelectorAll("#container li > a");
    if (!links) return;

    links.forEach(item => {
      if (item.hash === `#${id}`) link = item;
    });

    if (!link) {
      this.warn(`No link was found with #${id} in the navigation links.`);
      return;
    }

    return link;
  }

  closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  rebuild(navset) {
    // Capture sections from the panel if not provided
    // This is helpful for when this is used as an API
    // re: document.querySelector("pfe-jump-links-nav").rebuild();
    if (!navset) navset = this.panel.sectionRefs;

    this._buildNav(navset);
  }

  setActive(link) {
    if (!link) return;

    const listItem = link.closest("li");
    let parent = listItem.closest("li");

    listItem.setAttribute("active", "");

    if (listItem.classList.contains("has-sub-section")) {
      // @TODO: This goes on the ul tag Cassondra!!
      listItem.setAttribute("aria-expanded", "true");
    }

    if (parent && listItem.classList.contains("sub-section")) {
      parent.setAttribute("active", "");
      // @TODO: This goes on the ul tag Cassondra!!
      parent.setAttribute("aria-expanded", "true");
      listItem.tabindex = "0";
    }

    console.log(listItem);
  }

  isActive(link) {
    if (!link) return false;
    const listItem = link.closest("li");
    return listItem.hasAttribute("active");
  }

  removeActive(link) {
    if (!link) return;

    const listItem = link.closest("li");
    let parent = listItem.closest("li");

    if (listItem.classList.contains("sub-section")) {
      // Only remove status from parent if all children are removed
      const parentLink = parent.querySelector(":scope > a");
      if (this.isActive(parentLink)) {
        let activeChildren = false;
        parent.querySelectorAll("ul > li > a").forEach(link => {
          if (this.isActive(link)) activeChildren = true;
        });

        // If none of the children are active, remove the active settings
        if (!activeChildren) {
          parent.removeAttribute("active");
          parent.setAttribute("aria-expanded", "false");
        }
      }
    } else if (listItem.classList.contains("has-sub-section")) {
      listItem.setAttribute("aria-expanded", "false");
    }

    listItem.removeAttribute("active");
  }

  removeAllActive() {
    this.activeLinks.forEach(link => this.removeActive(link));
  }

  // @TODO: add a link to the WCAG page about role="tree"
  upgradeA11yListItem(item, isSubSection = false) {
    // Create the link to the section
    const link = item.querySelector("a");
    link.classList.add("pfe-jump-links-nav__link");

    item.className = "pfe-jump-links-nav__item"; // Goes on the li tag
    // List items get a role of "treeitem"
    item.role = "treeitem";
    // List items that are visible should be focusable
    item.tabindex = "0";

    if (isSubSection) {
      item.classList.add("sub-section");

      // Subsections are not visible and thus should not be focusable
      link.tabindex = "-1";
    }

    // If active links is initiated before the nav is upgrade, active the link
    if (this.activeLinks.length > 0 && this.activeLinks.includes(link)) this.setActive(link);

    // Build out the nested group
    let nested = item.querySelector(":scope > ul");
    if (nested) {
      nested.role = "group";

      const children = nested.querySelectorAll(":scope > li");
      if (children.length > 0) {
        item.classList.add("has-sub-section");
        item.setAttribute("aria-expanded", "false");
        children.forEach(child => this.upgradeA11yListItem(child, true));
      }
    }
  }

  upgradeA11y() {
    // Turn off the observer while we update the DOM
    if (window.ShadyCSS && !this.autobuild) this._observer.disconnect();

    // Get the light DOM
    const parentList = this.querySelector("ul") || this.querySelector("ol");
    if (!parentList) return;

    // Loop through the markup and apply the appropriate tags
    parentList.classList.add("pfe-jump-links-nav");
    // Note: only the first UL gets the tree role
    parentList.role = "tree";

    // Check to see if there is a heading tag preceeding this list
    const label = parentList.closest("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]");
    if (label) parentList.setAttribute("aria-labelledby", label.id);

    // Iterate over each list item that is a direct child of the parentList
    const listItems = parentList.querySelectorAll(":scope > li");
    listItems.forEach(item => this.upgradeA11yListItem(item));

    // Trigger the mutation observer
    if (window.ShadyCSS && !this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  /**
   * Connect the nav to it's associated panel after upgrade
   */
  _connectToPanel(evt) {
    // If a panel is already defined
    if (this.panel) {
      // Stop listening for the panel
      document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);

      // Return without additional parsing
      return;
    }

    // If the target does not match the id of this nav
    if (!(evt.detail && evt.detail.panel && evt.detail.panel.scrolltarget === this.id)) {
      // Return but don't remove the event
      return;
    }

    this.panel = evt.detail.panel;

    // Stop listening for the panel
    document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);

    // Stop the panel from listening for the nav upgrade, prevents duplication
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this.panel._connectToNav);

    // Set up a pointer to this nav element in the panel if it doesn't already exist
    if (!this.panel.nav) this.panel.nav = this;

    // Fire rebuild if autobuild is set
    if (this.autobuild) this.rebuild();
  }

  /*
   * Build out a list item with the correct attributes and markup
   * reference: https://www.w3.org/WAI/GL/wiki/Using_ARIA_trees
   */
  _buildItem(data) {
    let item = document.createElement("li");

    // Create the link to the section
    let link = document.createElement("a");
    link.href = `#${data.id}`;
    link.textContent = data.label;

    // Add the link to the list
    item.appendChild(link);

    if (data.children.length > 0) {
      // Build out the nested group
      let nested = document.createElement("ul");
      data.children.forEach(child => {
        nested.appendChild(this._buildItem(child));
      });

      item.appendChild(nested);
    }

    return item;
  }

  _buildNav(set = []) {
    return new Promise((resolve, reject) => {
      // Add debouncer to prevent this function being run more than once
      // at the same time. Prevents IE from being stuck in infinite loop
      if (this._buildingNav) reject(`Navigation is actively being built already.`);

      // Flag that the nav is being actively built/rebuilt
      this._buildingNav = true;

      // Create the list
      let wrapper = document.createElement("ul");
      wrapper.setAttribute("aria-labelledby", `${this.id}--heading`);

      if (set.length > 0) set.forEach(item => wrapper.appendChild(this._buildItem(item)));

      // Turn off the observer while we update the DOM
      if (window.ShadyCSS && !this.autobuild) this._observer.disconnect();

      this.innerHTML = wrapper.outerHTML;

      // Trigger the mutation observer
      if (window.ShadyCSS && !this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);

      // Reset debouncer to allow buildNav() to run on the next cycle
      this._buildingNav = false;

      resolve(this);
    });
  }

  _isValidLightDom() {
    if (!this.hasLightDOM() || !(this.querySelector("ul") || this.querySelector("ol"))) {
      this.warn(`You must have a <ul> or <ol> tag in the light DOM or use the autobuild attribute`);
      return false;
    }

    if (
      (this.hasSlot("logo") ||
        this.hasSlot(`${this.tag}--logo`) ||
        this.hasSlot("link") ||
        this.hasSlot(`${this.tag}--link`)) &&
      !this.horizontal
    ) {
      this.warn(`logo and link slots are NOT supported in vertical jump links`);
    }

    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return true;
  }

  _copyListToShadow() {
    return new Promise((resolve, reject) => {
      const menu = this.querySelector("ul") || this.querySelector("ol");

      if (!menu) reject(`No menu elements (ul or ol) could be foundin the light DOM.`);

      // Upgrade the accessibility of the light DOM provided
      // including attaching appropriate classes
      this.upgradeA11y();

      // Copy the menu into the shadow DOM
      this.shadowRoot.querySelector("#container").innerHTML = menu.outerHTML;

      // Return a NodeList of the links
      resolve(this.shadowRoot.querySelectorAll("#container li > a"));
    });
  }

  _init() {
    if (!this.panel) {
      // Note: We need the panel connection even if we're not using autobuild to determine where to scroll on click
      document.body.addEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);
      return;
    }

    // If this is a manually build component but it doesn't have valid light DOM, return
    // Note: The _isValidLightDOM function throws the necessary warnings, no warnings needed here
    if (!this.autobuild && !this._isValidLightDom()) return;

    // Capture the light DOM list
    // Fire the build navigation and when it is done, fetch the links
    if (this.autobuild) this._buildNav(this.panel.sectionRefs);

    this._copyListToShadow().then(links => {
      // Create a global pointer for this
      this.links = links;
      // Attach event listeners to each link in the shadow DOM
      links.forEach(link => link.addEventListener("click", this._clickHandler));
    });

    // If this is a horizontal nav, store the height in a variable
    // @TODO: This needs to be set on the panel not the nav element
    if (this.horizontal) this.cssVariable(`${this.tag}--Height--actual`, this.clientHeight);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    // Fire scroll event to the section referenced
    if (!evt || !evt.target || !evt.target.hash) return;

    const id = evt.target.hash.slice(1);

    if (!this.panel) return;

    const entry = this.panel.sectionRefs[id];
    if (!entry) {
      this.warn(`A corresponding panel was not found for #${id}`);
      return;
    }

    /* JavaScript MediaQueryList Interface */
    let behavior = "smooth";
    if (window.matchMedia("(prefers-reduced-motion)").matches) behavior = "auto";

    // Set up the scroll animation
    window.scrollTo({
      top: entry.ref.getBoundingClientRect().top + window.pageYOffset - this.panel.offsetValue,
      behavior: behavior
    });
    // entry.ref.scrollIntoView({
    //     behavior: behavior
    // });

    // @TODO: Create JSON tokens for media query breakpoints
    // If the window is less than 992px, escape (do nothing)
    if (window.matchMedia("(min-width: 992px)").matches) return;

    // Close the accordion after 750ms
    setTimeout(this.closeAccordion, 750);
  }

  _activeItemHandler(evt) {
    // @TODO Use this array to highlight all visible items
    const ids = evt.detail.activeIds;

    // Capture the first item in the set
    const firstId = ids[0];

    this.removeAllActive();

    // Reset the activeLinks array
    this.activeLinks = [];
    let link = this.getLinkById(firstId);
    if (link) {
      this.activeLinks.push(link);
      this.setActive(link);
    }
  }
}

export default PfeJumpLinksNav;
