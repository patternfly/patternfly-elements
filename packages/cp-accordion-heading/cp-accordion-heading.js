const accordionHeadingTemplate = document.createElement('template');
accordionHeadingTemplate.innerHTML = `
  <style>:host {
  display: block; }

:host(.animating) {
  transition: transform 0.3s ease-in-out; }

h2 {
  margin: 0;
  padding: 0;
  border: 1px solid white; }

button {
  margin: 0;
  border: none;
  font-size: 16px;
  line-height: 3;
  font-weight: normal;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0;
  background: none; }

button:focus {
  outline: 1px solid blue; }

[aria-expanded] {
  position: relative;
  display: block;
  margin-bottom: 0;
  line-height: 3;
  font-weight: normal;
  padding-left: 2.125em;
  background: #ededed; }

[aria-expanded="false"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 40%;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0.15em 0.15em 0 0;
  height: 0.35em;
  width: 0.35em;
  transform: rotate(45deg);
  margin-left: 1em;
  line-height: 3;
  text-align: center;
  transition: transform 0.15s; }

[aria-expanded="true"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 40%;
  display: block;
  width: 0.35em;
  height: 0.35em;
  border-style: solid;
  border-width: 0.15em 0.15em 0 0;
  margin-left: 1em;
  line-height: 3;
  text-align: center;
  transition: all 0.15s;
  transform: rotate(135deg); }</style>

  <h2>
    <button aria-expanded="false" role="tab">
      <slot></slot>
    </button>
  </h2>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(accordionHeadingTemplate, 'cp-accordion-heading');
}

class CpAccordionHeading extends HTMLElement {
  static get observedAttributes() {
    return ['aria-expanded'];
  }

  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(accordionHeadingTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }

    this.button = this.shadowRoot.querySelector('button');
    this.addEventListener('click', this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._clickHandler);
  }

  get expanded() {
    return this.hasAttribute('aria-expanded');
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute('aria-expanded', true);
      this.button.setAttribute('aria-expanded', true);
    } else {
      this.removeAttribute('aria-expanded');
      this.button.setAttribute('aria-expanded', false);
    }
  }

  _clickHandler(event) {
    this.expanded = !this.expanded;

    this.dispatchEvent(
      new CustomEvent('cp-accordion-change', {
        detail: { expanded: this.expanded },
        bubbles: true
      })
    );
  }
}

window.customElements.define('cp-accordion-heading', CpAccordionHeading);
