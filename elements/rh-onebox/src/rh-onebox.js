import Rhelement from '../rhelement/rhelement.js';
import '../../whatwg-fetch/fetch.js';

const repeat = (strings, ...expressions) => {
  const arr = [];
  for (let i = 0; strings[i] || expressions[i]; ++i ) {
    const string = strings[i];
    let expression = expressions[i];
    if (expression instanceof Array) expression = expression.join('\n');
    if (string) arr.push(string);
    if (expression) arr.push(expression);
  }
  return arr.join('\n');
}

const template = document.createElement('template');
const bindTemplate = data => {
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        border: 1px solid #ececec;
        background-color: #f7f7f7;
      }

      :host([expanded]) .description,
      :host([expanded]) .product_links {
        display: block;
      }

      .content {
        padding: 0 16px;
      }

      .info_links {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .info_links li {
        width: 50%;
      }

      .info_links li a {
        padding: 16px;
      }

      .description {
        display: none;
        order: 1;
      }

      .product_links {
        display: none;
        order: 2;
      }

      .expander {
        position: relative;
        text-align: center;
        border-top: 1px solid #ececec;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      :host([expanded]) .expander {
        border-bottom: 1px solid #ececec;
      }

      #expandButton {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 30px;
        height: 30px;
        top: -15px;
        left: calc(50% - 15px);
        background: white;
        border: 1px solid #ececec;
        border-radius: 50%;
      }

      .caret {
        width: 0;
        height: 0;
        margin-bottom: -2px;
        border-top: 5px solid #333;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }

      :host([expanded]) .caret {
        margin-bottom: 0;
        border-top: none;
        border-bottom: 5px solid #333;
      }

      @media (min-width: 768px) {
        :host {
          background-color: transparent;
        }

        .expander {
          display: none;
        }

        .description,
        .product_links {
          display: block;
        }

        .description {
          order: 0;
        }
      }
    </style>
    <h2 class="content">${data.product}</h2>
    <p class="description content">${data.description}</p>
    ${data.links.info && repeat`
      <div class="content">
        <ul class="info_links">
          ${data.links.info.map(link => `
            <li>
              <a href="${link.link}">
                <div>
                  <div class="icon"></div>
                  ${link.text}
                </div>
              </a>
            </li>
          `)}
        </ul>
      </div>
    `}
    <div class="expander content">
      <button id="expandButton">
        <span class="caret"></span>
      </button>
      About ${data.product}
    </div>
    ${data.links.knowledgebase && repeat`
      <div class="product_links content">
        <h4>Browse Product Knowledge</h4>
        <ul>
        ${data.links.knowledgebase.map(link => `
          <li><a href="${link.link}">${link.text}</a></li>
        `)}
        </ul>
      </div>
    `}
  `;
}

class RhOnebox extends Rhelement {
  static get observedAttributes() {
    return ['source', 'term'];
  }

  constructor(elementName, config) {
    super(elementName);

    // if (!config.template) {
    //   console.warn('A hyperHTML template needs to be provided in the constructor');
    // }

    // this.config = config;
    // this.htmlTemplate = config.template;
    this.config = {
      arrayName: 'rules',
      matchArrayName: 'keywords'
    };
    // this.htmlTemplate = template;
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
      // return;
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
    bindTemplate(dataObj);

    if (window.ShadyCSS) {
      ShadyCSS.prepareTemplate(template, 'rh-onebox');
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

window.customElements.define('rh-onebox', RhOnebox);
export default RhOnebox;
