import PFElement from "../../pfelement/dist/pfelement.js";

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
        title: "Navigation label",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["lightest", "lighter", "darkest"],
        default: "lightest"
      },
      hideLabel: {
        title: "Hide label",
        type: Boolean
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

  get logo() {
    return this.hasSlot("logo") || this.hasSlot(`${this.tag}--logo`);
  }

  get cta() {
    this.hasSlot("link") || this.hasSlot(`${this.tag}--link`);
  }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });

    // Global pointer to the associated panel
    // If this is empty, we know that no panel exists for this nav
    this.panel;

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
    this.connectPanel = this.connectPanel.bind(this);

    //-- Internal-only methods
    this._buildItem = this._buildItem.bind(this);
    this._buildNav = this._buildNav.bind(this);
    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._copyListToShadow = this._copyListToShadow.bind(this);
    // this._reportHeight = this._reportHeight.bind(this);
    this._init = this._init.bind(this);

    // Event handlers
    this._clickHandler = this._clickHandler.bind(this);
    this._upgradePanelHandler = this._upgradePanelHandler.bind(this);
    this._activeItemHandler = this._activeItemHandler.bind(this);
    this._observer = new MutationObserver(this._init);

    // Note: We need the panel connection even if we're not using autobuild to determine where to scroll on click
    document.body.addEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Start listening for if the panel has changed
    // @TODO: add a specialized handler for the change event
    document.body.addEventListener("pfe-jump-links-panel:change", this._init);

    // If the active item changes, fire the handler
    document.body.addEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the navigation
    this._init();

    // Trigger the mutation observer
    if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);

    // Let the document know that the navigation element is upgraded
    // @TODO: If the panel is already connected, should we still emit this event?
    this.emitEvent(PfeJumpLinksNav.events.upgrade, {
      detail: {
        nav: this
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);
    document.body.removeEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
    document.body.removeEventListener("pfe-jump-links-panel:change", this._init);

    this.links.forEach(link => link.removeEventListener("click", this._clickHandler));
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
    if (!navset) {
      if (this.panel.tagName === "pfe-jump-links-panel") navset = this.panel.sectionRefs;
      else return;
    }

    this._buildNav(navset);
  }

  setActive(link) {
    if (!link) return;

    const listItem = link.closest("li");
    let parent = listItem.closest("li");

    listItem.setAttribute("active", "");

    if (listItem.classList.contains("has-sub-section")) {
      listItem.querySelector(":scope > ul").setAttribute("aria-expanded", "true");
    }

    if (parent && listItem.classList.contains("sub-section")) {
      parent.setAttribute("active", "");
      parent.closest("ul").setAttribute("aria-expanded", "true");
      listItem.tabindex = "0";
    }
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
   * Note: this no longer has to be `pfe-jump-links-panel`
   */
  connectPanel(panel) {
    this.panel = panel;

    // If the panel does not have a scrolltarget attribute, go ahead and add it
    if (!this.panel.hasAttribute("scrolltarget")) this.panel.setAttribute("scrolltarget", this.id);

    // Set up a pointer to this nav element in the panel if it doesn't already exist
    if (!this.panel.nav) this.panel.nav = this;

    // Fire rebuild if autobuild is set
    if (this.autobuild) this.rebuild();
  }

  /**
   * Process the upgrade panel custom event to connect the panel to this navigation element
   */
  _upgradePanelHandler(evt) {
    if (!evt && !evt.detail) return;

    let panel = evt.detail.panel;

    // If the target does not match the id of this nav
    // Return but don't remove the event
    if (!(panel && panel.scrolltarget === this.id)) return;

    // Wire up the panel to this element
    this.connectPanel(panel);

    // Stop listening for the panel
    document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Stop the panel from listening for the nav upgrade (prevents duplication)
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this.panel._connectToNav);
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

    return item;
  }

  _buildList(items, id = null) {
    if (items.length <= 0) return;

    let wrapper = document.createElement("ul");
    if (id) wrapper.setAttribute("aria-labelledby", id);

    // Loop through each item
    items.forEach(item => {
      // Pass the data object to the item builder
      let result = this._buildItem(item.data);

      // If there are children, set the result to the new list
      // Otherwise, the result is the new list item
      if (item.children && item.children.length > 0) {
        // Pass the children array to a nested list call
        let nested = this._buildList(item.children);
        result.appendChild(nested);
      }

      wrapper.appendChild(result);
    });

    return wrapper;
  }

  /*
   * Build out a navigation element based on data from the panel object
   */
  _buildNav(set = []) {
    return new Promise((resolve, reject) => {
      // Add debouncer to prevent this function being run more than once
      // at the same time. Prevents IE from being stuck in infinite loop
      if (this._buildingNav) reject(`Navigation is currently being built.`);

      // Flag that the nav is being actively built/rebuilt
      this._buildingNav = true;

      let items = [];
      Object.keys(set).forEach((key, idx, keys) => {
        let data = set[key];

        if (data.childOf) {
          let lastItem = items[items.length - 1];
          if (lastItem) lastItem.children.push({data, children: []});
        } else {
          items.push({
            data,
            children: []
          });
        }
      });

      // Create the list
      let wrapper = this._buildList(items, `${this.id}--heading`);

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

  /*
   * Validate the light DOM provided for the manually coded navigation
   */
  _isValidLightDom() {
    if (!this.hasLightDOM() || !(this.querySelector("ul") || this.querySelector("ol"))) {
      this.warn(`You must have a <ul> or <ol> tag in the light DOM or use the autobuild attribute.`);
      return false;
    }

    if ((this.logo || this.cta) && !this.horizontal) {
      this.warn(`logo and link slots are %cnot%c supported in vertical jump links`, "font-style: italic", "");
    }

    return true;
  }

  /*
   * Copy the light DOM list to the shadow DOM for control of styling
   */
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

  /*
   * Initialize the navigation element
   */
  _init() {
    // If this is a manually build component but it doesn't have valid light DOM, return
    // Note: The _isValidLightDOM function throws the necessary warnings, no warnings needed here
    if (!this.autobuild && !this._isValidLightDom()) return;

    // Capture the light DOM content from the panel
    // passing that to the build navigation method to render the markup
    if (this.autobuild) {
      if (this.panel) this._buildNav(this.panel.sectionRefs);
      else return;
    }

    // Copy the light DOM to the shadow DOM
    // Returns a NodeList of links in the shadow DOM navigation
    this._copyListToShadow().then(links => {
      // Attach event listeners to each link in the shadow DOM
      links.forEach(link => link.addEventListener("click", this._clickHandler));

      // Create a global pointer for the link elements
      this.links = links;

      // If the upgrade was successful, remove the hidden attribute
      if (links.length > 0) this.removeAttribute("hidden");
    });

    // If this is a horizontal nav, store the height in a variable
    if (this.horizontal) {
      this.cssVariable(`${this.tag}--Height--actual`, `${this.clientHeight}px`, document.body);
      // If the panel is connected, refire the offset value to update the CSS variable
      if (this.panel) {
        this.panel.offsetValue;
        this.panel._buildSectionContainers();
      }
    }
  }

  /*
   * Handle on click events
   */
  _clickHandler(evt) {
    let entry;

    // If there are no attached panels, let the default click behavior do it's thing
    if (!this.panel) return;

    // Fire scroll event to the section referenced
    if (!evt || !evt.path || !evt.path[0] || !evt.path[0].hash) return;

    const id = evt.path[0].hash;
    const key = id.replace(/^#/, "");

    if (!id) return;

    const refs = this.panel.sectionRefs;

    const capture = Object.values(refs).filter(data => data.id === key);
    if (capture.length === 1) entry = capture[0].ref;

    if (!entry) entry = this.panel.querySelector(id) || this.panel.shadowRoot.querySelector(id);

    if (!entry) {
      this.warn(`A corresponding panel was not found for ${id}`);
      return;
    }

    evt.preventDefault();

    /* JavaScript MediaQueryList Interface */
    let behavior = "smooth";
    if (window.matchMedia("(prefers-reduced-motion)").matches) behavior = "auto";

    // Set up the scroll animation
    window.scrollTo({
      top: entry.getBoundingClientRect().top + window.pageYOffset - this.panel.offsetValue,
      behavior: behavior
    });

    // @TODO: Create JSON tokens for media query breakpoints
    // If the window is less than 992px, escape (do nothing)
    if (window.matchMedia("(min-width: 992px)").matches) return;

    // Close the accordion after 750ms
    setTimeout(this.closeAccordion, 750);
  }

  /*
   * Sets a navigation item to active when event surfaced from panel
   */
  _activeItemHandler(evt) {
    // This this is an autobuild component and the nav is in progress, wait before moving forward
    if (this.autobuild && !this._buildingNav) setTimeout(() => {

      // @TODO Use this array to highlight all visible items
      const ids = evt.detail.activeIds;

      // If the array is empty, clear active state
      if (!ids || ids.length === 0) return;

      // Capture the first item in the set
      const firstId = ids[0];

      if (!firstId) return;

      // Get the link by ID
      const link = this.getLinkById(firstId);

      if (!link) return;

      // If this is already an active link, do nothing
      if (this.activeLinks.filter(active => active === link).length > 0) return;

      // If a link is active, unset it and clear the array
      if (this.activeLinks.length > 0) this.removeAllActive();

      // Set the activeLinks array to the new link element
      // Activate the link
      this.setActive(link);

      let ref = this.panel.getRefById(firstId);
      if (ref.childOf) {
        let parent = this.getLinkById(ref.childOf);
        this.setActive(parent);
        this.activeLinks = [parent, link];
        return;
      }

      this.activeLinks = [link];
    }, 100);
  }
}

export default PfeJumpLinksNav;
