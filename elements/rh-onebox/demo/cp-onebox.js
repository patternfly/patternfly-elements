import RhOnebox from '../rh-onebox.js';
import { html } from '../../../lit-html/lit-html.js';

const htmlTemplate = (data) => html`
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
        background-color: initial;
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
  ${data.links.info && html`
    <div class="content">
      <ul class="info_links">
        ${data.links.info.map(link => html`
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
  ${data.links.knowledgebase && html`
    <div class="product_links content">
      <h4>Browse Product Knowledge</h4>
      <ul>
      ${data.links.knowledgebase.map(link => html`
        <li><a href="${link.link}">${link.text}</a></li>
      `)}
      </ul>
    </div>
  `}
`;

class CpOnebox extends RhOnebox {
  constructor() {
    super('cp-onebox', {
      template: htmlTemplate,
      arrayName: 'rules',
      matchArrayName: 'keywords'
    });

    this.expandButton = null;
    this.expanded = false;
    this.expandButtonHandler = this.expandButtonHandler.bind(this);
  }

  render() {
    super.render();

    this.expandButton = this.shadowRoot.querySelector('#expandButton');
    this.expandButton.addEventListener('click', this.expandButtonHandler);
  }

  expandButtonHandler() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }
  }
}

window.customElements.define('cp-onebox', CpOnebox);
