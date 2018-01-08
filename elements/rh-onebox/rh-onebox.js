import Rhelement from '../rhelement/rhelement.js';
import '../../whatwg-fetch/fetch.js';

class RhOnebox extends Rhelement {
  static get observedAttributes() {
    return ['source', 'term'];
  }

  constructor(elementName, config) {
    super(elementName);

    if (!config.template) {
      console.warn('A template needs to be provided in the constructor');
    }

    this.config = config;
    this.htmlTemplate = config.template;
    this.loading = false;
    this.successHandler = this.successHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'source':
        this.source = newValue;
        this.getData(this.source);
        break;

      case 'term':
        this.term = newValue;
        break;
    }
  }

  getData(source) {
    if (!this.htmlTemplate) {
      return;
    }

    this.loading = true;

    return fetch(source)
      .then(res => res.json(), error => this.errorHandler)
      .then(this.successHandler)
      .then(() => this.loading = false);
  }

  successHandler(data) {
    this.data = data;
    this.render()
  }

  errorHandler(error) {
    console.log(error);
  }

  findMatch() {
    let match;

    this.data[this.config.arrayName].forEach(obj => {
      obj[this.config.matchArrayName].forEach(keyword => {
          if (keyword.toLowerCase() === this.term.toLowerCase().trim()) {
            match = obj;
          }
      });
    });

    return match;
  }

  render(data) {
    const dataObj = this.findMatch();
    const template = this.htmlTemplate(dataObj);

    if (window.ShadyCSS) {
      ShadyCSS.prepareTemplate(template, 'rh-onebox');
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

export default RhOnebox;
