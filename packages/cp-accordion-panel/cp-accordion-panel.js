const accordionPanelTemplate = document.createElement('template');
accordionPanelTemplate.innerHTML = `
  <style>:host {
  display: none;
  overflow: hidden;
  background: white;
  will-change: height; }

:host([expanded]) {
  display: block; }

:host(.animating) {
  display: block;
  transition: height 0.3s ease-in-out; }

.container {
  border: 2px solid #f7f7f7;
  border-top: none;
  padding: 20px;
  padding-top: 5px; }</style>

  <div tabindex="-1" role="tabpanel">
    <div class="container">
      <slot></slot>
    </div>
  </div>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(accordionPanelTemplate, 'cp-accordion-panel');
}

class CpAccordionPanel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(accordionPanelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }
  }
}

window.customElements.define('cp-accordion-panel', CpAccordionPanel)
