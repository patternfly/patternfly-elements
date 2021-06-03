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

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observer() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    };
  }

  static get properties() {
    return {
      autobuild: {
        title: "Autobuild",
        type: Boolean,
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean,
      },
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section",
      },
      color: {
        title: "Color",
        type: String,
        values: ["darkest"],
      },
      // @TODO: Deprecated in 2.0
      oldAutobuild: {
        alias: "autobuild",
        attr: "pfe-c-autobuild",
      },
      // @TODO: Deprecated in 2.0
      oldHorizontal: {
        alias: "horizontal",
        attr: "pfe-c-horizontal",
      },
      // @TODO: Deprecated in 2.0
      oldColor: {
        alias: "color",
        attr: "pfe-color",
      },
    };
  }

  get header() {
    if (!this.horizontal) return this.shadowRoot.querySelector("pfe-accordion-header");

    return this.getSlot(["heading", "pfe-jump-links-nav--heading"])[0];
  }

  get panel() {
    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      this.removeAttribute("hidden");
      return document.querySelector(`[scrolltarget=${this.id}]`);
    } else {
      this.id = this.randomId;
      const panels = document.querySelectorAll(PfeJumpLinksPanel.tag);
      if (panels.length === 1) {
        this.removeAttribute("hidden");
        panels[0].setAttribute("scrolltarget", this.id);
        return panels[0];
      } else if (panels.length > 1) {
        this.warn(
          `Cannot locate which panel is connected to this navigation element.${
            this.id ? ` Please add scrolltarget="${this.id}" to the appropriate panel.` : ""
          }`
        );
      } else {
        this.warn(
          `Cannot locate any panels on this page. Please add a ${PfeJumpLinksPanel.tag} element around the content you want to target.`
        );
      }
    }

    // Hide the navigation if no content can be found
    this.setAttribute("hidden", "");
    return;
  }

  get links() {
    return this._menuContainer.querySelectorAll("a");
  }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType,
    });

    this.isBuilding = false;

    this.build = this.build.bind(this);
    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._init = this._init.bind(this);

    this._reportHeight = this._reportHeight.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    // Do not try to render navigation in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Templated elements in the shadow DOM
    this._menuContainer = this.shadowRoot.querySelector("#container");

    this._init();

    document.addEventListener("pfe-jump-links-panel", (evt) => {
      this.active(evt.detail.activeNavItem);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();
    
    document.removeEventListener(PfeJumpLinksPanel.events.change, this._init);
    document.removeEventListener("pfe-jump-links-panel", (evt) => {
      this.active(evt.detail.activeNavItem);
    });
  }

  build(data) {
    this.isBuilding = true;
    let sections = data;

    if (!sections) {
      // Can't build the navigation dynamically without a panel
      if (!this.panel) return;

      // Get the sections from the panel object by class name
      // @TODO: add support for h-tags if no classes exist
      sections = this.panel.querySelectorAll(`.pfe-jump-links-panel__section`);
    }

    // Can't build the navigation dynamically without panel sections defined
    if (!sections) return;

    // Validations complete, start the build
    let child;
    let wrapper = this._buildWrapper();
    let currentWrapper = wrapper;
    let previousWrapper = currentWrapper;

    // Build markup for the navigation
    for (let i = 0; i < sections.length; i++) {
      const sectionHeading = sections[i];
      let is_subsection = sectionHeading.classList.contains("sub-section");
      let has_subsection = sectionHeading.classList.contains("has-sub-section");

      // Get ID for the navigation
      let id = sectionHeading.id;
      if (!id) {
        let spacer = sectionHeading.previousElementSibling;
        if (spacer && spacer.classList.contains("pfe-jump-links__section--spacer") && spacer.id) {
          id = spacer.id;
        } else {
          sectionHeading.id = this.randomId.replace("pfe-", "pfe-jump-links--");
          id = sectionHeading.id;
        }
      }

      // Build the li tag; the child item
      child = this._buildItem(
        {
          target: id,
          content: sectionHeading.getAttribute("nav-label") || sectionHeading.innerHTML,
          subsection: is_subsection,
        },
        is_subsection
      );

      // Add the item to the list
      currentWrapper.appendChild(child);

      if (has_subsection) {
        previousWrapper = currentWrapper;
        currentWrapper = this._buildWrapper("sub-nav");
        child.appendChild(currentWrapper);
      }

      // If the next item exists and is a sub-section, reset the ul build to the previous one
      if (sections[i + 1] && !sections[i + 1].classList.contains("sub-section")) {
        currentWrapper = previousWrapper || wrapper;
      }
    }

    this._menuContainer.innerHTML = wrapper.outerHTML.toString();

    this.isBuilding = false;
  }

  closeAccordion() {
    // @TODO
    // Create JSON tokens for media query breakpoints
    if (window.matchMedia("(min-width: 992px)").matches) {
      return;
    }
    const accordion = this.shadowRoot.querySelector("pfe-accordion");
    setTimeout(() => {
      Promise.all([customElements.whenDefined("pfe-accordion")]).then(() => {
        accordion.collapseAll();
      });
    }, 750);
  }

  rebuild() {
    // If the build is happening, wait until it is complete
    if (!this.isBuilding) {
      setTimeout(rebuild, 100);
    } else this.build();
  }

  active(item) {
    let idx;
    let items = [...this.shadowRoot.querySelectorAll(".pfe-jump-links-nav__item")];

    if (typeof item === "number") {
      idx = item;
    } else {
      idx = items.findIndex(item);
    }

    let is_subsection = items[idx].classList.contains("sub-section");
    let has_subsection = items[idx].classList.contains("has-sub-section");

    items[idx].setAttribute("active", "");
    if (is_subsection) {
      items[idx].parentNode.parentNode.parentNode.setAttribute("active", "");
      items[idx].parentNode.parentNode.parentNode.classList.add("expand");
    } else if (has_subsection) {
      items[idx].parentNode.setAttribute("active", "");
      items[idx].parentNode.classList.add("expand");
    } else {
      items[idx].parentNode.setAttribute("active", "");
    }
  }

  inactive(item) {
    let idx;
    let items = [...this.shadowRoot.querySelectorAll(".pfe-jump-links-nav__item")];

    if (typeof item === "number") {
      idx = item;
    } else {
      idx = items.findIndex(item);
    }

    let is_subsection = items[idx].classList.contains("sub-section");
    let has_subsection = items[idx].classList.contains("has-sub-section");

    items[idx].removeAttribute("active");

    if (is_subsection) {
      items[idx].parentNode.parentNode.parentNode.removeAttribute("active");
      items[idx].parentNode.parentNode.parentNode.classList.remove("expand");
    } else if (has_subsection) {
      items[idx].parentNode.removeAttribute("active");
      items[idx].parentNode.classList.remove("expand");
    } else {
      items[idx].parentNode.removeAttribute("active");
    }
  }

  _buildItem(data, isSubSection = false) {
    let item = document.createElement("li");
    item.className = "pfe-jump-links-nav__item";

    let link = document.createElement("a");
    link.className = "pfe-jump-links-nav__link";
    link.href = `#${data.target}`;
    link.setAttribute("data-target", data.target);
    link.innerHTML = data.content;

    if (data.subsection) link.classList.add("has-sub-section");
    if (isSubSection) link.classList.add("sub-section");

    item.appendChild(link);
    return item;
  }

  _buildWrapper(className = "pfe-jump-links-nav") {
    let wrapper = document.createElement("ul");
    wrapper.className = className;
    return wrapper;
  }

  // Run this if the component is _not_ set to autobuild
  _isValidLightDom() {
    if (!this.hasLightDOM()) {
      this.warn(
        `This component requires an unordered list in the light DOM to render; alternatively, add the attribute \`autobuild\` attribute to dynamically generate the list.`
      );
      return false;
    }

    if (
      (this.hasSlot(["logo", "pfe-jump-links-nav--logo"]) || this.hasSlot(["link", "pfe-jump-links-nav--link"])) &&
      !this.horizontal
    ) {
      this.warn(`The logo and link slots are NOT supported in vertical jump links.`);
    }

    if (this.children[1].tagName !== "UL") {
      if (!this.horizontal && !this.autobuild) {
        this.warn(`The top-level list of links MUST be a <ul>`);
      }

      return false;
    }

    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const styles = window.getComputedStyle(this);

    let height = styles.getPropertyValue("height");
    if (window.matchMedia("(min-width: 992px)").matches) {
      height = "0px";
    }

    // Set it on the panel or the document
    if (this.panel) this.panel.style.setProperty(cssVarName, height);
    else document.documentElement.style.setProperty(cssVarName, height);
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // Check that the light DOM is there and accurate
    if (!this.autobuild && this._isValidLightDom()) {
      const menu = this.querySelector("ul");

      // If the class is not already on the list wrapper
      if (!menu.classList.contains("pfe-jump-links-nav")) {
        menu.classList.add("pfe-jump-links-nav");
      }

      // Move the menu into the shadow DOM
      this._menuContainer.innerHTML = menu.outerHTML.toString();

      // Build the label for screen readers
      let label = document.createElement("h2");
      label.className = "sr-only";
      label.setAttribute("hidden", "");
      label.innerText = this.srText;

      this.shadowRoot.querySelector("nav").prepend(label);
    } else {
      // Try to build the navigation based on the panel
      this.build();
    }

    this._reportHeight();

    // Attach the event listeners
    [...this.links].forEach((link) => {
      link.addEventListener("click", () => {
        this.active(link);
        this.closeAccordion();
      });
    });

    if (this.autobuild) {
      document.addEventListener(PfeJumpLinksPanel.events.change, this._init);
    }

    // Trigger the mutation observer
    if (window.ShadyCSS) {
      this._observer.observe(this, PfeJumpLinksNav.observer);
    }
  }
}

export default PfeJumpLinksNav;
