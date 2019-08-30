import PFElement from "../pfelement/pfelement.js";
import PfeCollapse from "../pfe-collapse/pfe-collapse.js";
import PfeIcon from "../pfe-icon/pfe-icon.js";

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

  }

  _makeFooterLinkSections(section) {
    section.buttonText = section.querySelector('h2').innerHTML;
    section.list = section.querySelector('ul').outerHTML;
    // Add ARIA-labelledby from the ul and h2
    console.log(this.shadowRoot.querySelector('.pfe-footer-links'));
  }

  _mqHandler() {
    const panels = [...this.shadowRoot.querySelectorAll('pfe-collapse-panel')];
    const toggles = [...this.shadowRoot.querySelectorAll('pfe-collapse-toggle')];

    if (this.mq.matches) {
      if (this._initialLoad) {
        panels.forEach(panel => panel.setAttribute('pfe-animation', 'false'));
      }

      panels.forEach(panel => panel.expanded = true);
      toggles.forEach(toggle => toggle.setAttribute('disabled', 'disabled'));

      if (this._initialLoad) {
        panels.forEach(panel => panel.removeAttribute('pfe-animation'));
        this._initialLoad = false;
      }
    } else {
      panels.forEach(panel => panel.expanded = false);
      toggles.forEach(toggle => toggle.removeAttribute('disabled'));
    }
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeFooter);

export default PfeFooter;
