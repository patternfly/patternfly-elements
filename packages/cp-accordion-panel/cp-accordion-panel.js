const accordionPanelTemplate = document.createElement('template');
accordionPanelTemplate.innerHTML = `
  <style>:host {
  display: none;
  overflow: hidden;
  padding: 20px;
  padding-top: 5px;
  border: 2px solid #f7f7f7;
  border-top: none;
  animation: slideout 0.75s; }

:host([expanded]) {
  display: block; }

@keyframes slideout {
  0% {
    opacity: 0;
    max-height: 0; }
  1% {
    opacity: 1; }
  100% {
    max-height: 40em; } }</style>

  <div tabindex="-1" role="tabpanel">
    <slot></slot>
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
