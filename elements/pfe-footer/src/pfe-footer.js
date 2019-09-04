import PFElement from "../pfelement/pfelement.js";
import PfeCollapse from "../pfe-collapse/pfe-collapse.js";
import PfeIcon from "../pfe-icon/pfe-icon.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeFooter extends PFElement {
  static get tag() {
    return "pfe-footer";
  }

  get templateUrl() {
    return "pfe-footer.html";
  }

  get styleUrl() {
    return "pfe-footer.scss";
  }

  // Used in the template
  get hasFooterLinks() {
    return this.querySelector('[pfe-footer-links]') !== null;
  }

  static get observedAttributes() {
    return ['aria-expanded'];
  }

  constructor() {
    super(PfeFooter, { delayRender: true });

    this._initialLoad = true;
    this._mqHandler = this._mqHandler.bind(this);
    this.mq = window.matchMedia('(min-width: 992px)');
    this.mq.addListener(this._mqHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    let footerLinkSections = [...this.querySelectorAll('[pfe-footer-links] section')];
    footerLinkSections.forEach(section => this._makeFooterLinkSections(section));
    this._sections = footerLinkSections;

    // Render shadowDOM
    this.render();
    this._mqHandler();

    // add ARIA-labelledby to panels
    const panelULs = [...this.shadowRoot.querySelectorAll('pfe-collapse-panel > ul')];
    panelULs.forEach((panelUL, index) => this._labelPanelUL(panelUL, index));

    // generate potential ID for info panel heading
    const infoHeadingGeneratedId = `${PfeFooter.tag}_info-${generateId()}`;
    // get info panel first-child
    this.infoHeading = this.querySelector('[slot="pfe-footer-info"] > *:first-child');
    // check if first-child is a heading
    let isHeaderTag = false;
    if (this.infoHeading) {
      switch (this.infoHeading.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          isHeaderTag = true;
          break;
      }
    }

    // if there's no assigned ID and the first-child is a heading
    if (!this.infoHeading.id && isHeaderTag) {
      this.infoHeading.id = infoHeadingGeneratedId;

    // if it's not a heading, give a warning
    } else if (!isHeaderTag) {
      console.warn(
        `${
          PfeFooter.tag
        }: The first child in the light DOM of [slot="pfe-footer-info"] must be a heading level tag (h1, h2, h3, h4, h5, or h6)`
      );
    }

    // add ARIA-labelledby to first UL in the info panel
    const infoUL = this.querySelector('[slot="pfe-footer-info"] > ul');
    this._labelInfoPanelUL(infoUL);
  }

  // labels panel UL with ID from heading (ARIA-labelledby)
  _labelPanelUL(panelUL, index) {
    const toggles = [...this.shadowRoot.querySelectorAll('pfe-collapse-toggle')];
    let relatedToggle = toggles[index];
    panelUL.setAttribute('aria-labelledby', relatedToggle.id);
  }

  // labels info panel UL with ID from heading (ARIA-labelledby)
  _labelInfoPanelUL(panelUL) {
    panelUL.setAttribute('aria-labelledby', this.infoHeading.id);
  }

  // used in pfe-footer.html to build link sections
  _makeFooterLinkSections(section) {
    section.buttonText = section.querySelector('h2').innerHTML;
    section.list = section.querySelector('ul').outerHTML;
  }

  _mqHandler() {
    const panels = [...this.shadowRoot.querySelectorAll('pfe-collapse-panel')];
    const toggles = [...this.shadowRoot.querySelectorAll('pfe-collapse-toggle')];

    // large screen devices
    if (this.mq.matches) {
      // prevent animation on initial load
      if (this._initialLoad) {
        panels.forEach(panel => panel.setAttribute('pfe-animation', 'false'));
      }

      // open all panels
      panels.forEach(panel => panel.expanded = true);
      toggles.forEach(toggle => {
        // set button as expanded
        toggle.expanded = true;
        // disable button
        toggle.setAttribute('disabled', 'disabled');
        toggle.setAttribute('aria-disabled', 'true'); // remove if pfe-collapse handles this in the future
      });

      // reset animation/allow animation after initial load
      if (this._initialLoad) {
        panels.forEach(panel => panel.removeAttribute('pfe-animation'));
        this._initialLoad = false;
      }

    // small screen devices
    } else {
      // close all panels
      panels.forEach(panel => panel.expanded = false);
      toggles.forEach(toggle => {
        // set button as collapsed
        toggle.expanded = false;
        // enable button
        toggle.removeAttribute('disabled');
        toggle.removeAttribute('aria-disabled'); // remove if pfe-collapse handles this in the future
      });
    }
  }
}

PFElement.create(PfeFooter);

export default PfeFooter;
