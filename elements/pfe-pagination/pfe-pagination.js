import PFElement from '../pfelement/pfelement.js';

/*
 * Copyright 2019 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfePagination extends PFElement {
  get html() {
    return `<style>:host {
  display: block; }

:host([hidden]) {
  display: none; }

:focus:not(:focus-visible) {
  outline: none; }

nav *, nav *::before, nav *::after {
  box-sizing: border-box; }

nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: baseline; }
  nav ul li {
    margin: 1px;
    display: flex; }
    nav ul li .ellipses {
      display: block;
      padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);
      line-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);
      min-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);
      min-width: calc( var(--pfe-theme--font-size, 16px) * 2.5); }
    nav ul li > a {
      display: block;
      padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);
      line-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);
      min-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);
      min-width: calc( var(--pfe-theme--font-size, 16px) * 2.5);
      border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;
      background: var(--pfe-theme--color--ui-subtle, #f3f3f3);
      color: var(--pfe-theme--color--ui-subtle--text, #333);
      text-align: center;
      text-decoration: none;
      vertical-align: middle; }
      nav ul li > a:hover, nav ul li > a:focus, nav ul li > a:active {
        background: var(--pfe-theme--color--ui-base, #0477a4);
        color: var(--pfe-theme--color--ui-base--text, #fff); }
      nav ul li > a[aria-current] {
        background: var(--pfe-theme--color--ui-complement, #464646);
        color: var(--pfe-theme--color--ui-complement--text, #fff); }
    nav ul li#next {
      order: 10; }

#jump {
  margin: 0 var(--pfe-theme--container-spacer, 1rem); }
  #jump a {
    color: var(--pfe-theme--color--ui-link, #06c);
    text-decoration: none; }
    #jump a:hover {
      color: var(--pfe-theme--color--ui-link--hover, #003366);
      text-decoration: underline; }
    #jump a:focus {
      color: var(--pfe-theme--color--ui-link--focus, #003366);
      text-decoration: underline; }

#currentPageInput {
  margin-right: calc(var(--pfe-theme--content-spacer, 1rem) * 0.5);
  padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);
  line-height: calc(var(--pfe-theme--font-size, 16px) * 2.5);
  min-height: calc(var(--pfe-theme--font-size, 16px) * 2.5);
  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #dfdfdf);
  box-shadow: var(--pfe-theme--box-shadow--input, );
  width: 4em;
  font-size: inherit; }</style>
<nav role="navigation" aria-label="Pagination">
  <ul>
    ${this.showJump ? `
      ${!this.showPages ? `
        <li><a href="#" id="previous">${this.previousText}</a></li>
        <li><a href="#" id="next">${this.nextText}</a></li>
      ` : ``}
      <li id="jump">
        <form>
          <input
            type="number"
            id="currentPageInput"
            value="${this.currentPage}"
            min="1"
            max="${this.totalPages}"> of
          <a href="#" id="lastPage" page="${this.totalPages}">${this.totalPages}</a>
        </form>
      </li>
    ` : ``}
    ${this.showPages ? `
      <li><a href="#" id="previous">${this.previousText}</a></li>
      ${this.pages.map(page => `
        <li>
          ${page.ellipsize ? `
            <div class="ellipses">${page.text}</div>
          ` : `
            <a
              href="#"
              class="page"
              page="${page.text}"
              aria-label="${page.ariaLabel}"
              ${this.currentPage == page.text ? ` aria-current="true"` : `` }>
              ${page.text}
            </a>
          `}
        </li>
      `).join("\n")}
      <li><a href="#" id="next">${this.nextText}</a></li>
    `: ``}
  </ul>
</nav>`;
  }

  static get tag() {
    return "pfe-pagination";
  }

  get templateUrl() {
    return "pfe-pagination.html";
  }

  get styleUrl() {
    return "pfe-pagination.scss";
  }

  get showPages() {
    return this.hasAttribute("show-pages");
  }

  get showJump() {
    return this.hasAttribute("show-jump");
  }

  get totalPages() {
    return Number(this.getAttribute("total-pages"));
  }

  get currentPage() {
    return Number(this.getAttribute("current-page"));
  }

  set currentPage(val) {
    let page = Number(val);

    if (page < 1) {
      page = 1;
    }

    if (page > this.totalPages) {
      page = this.totalPages;
    }

    this.setAttribute("current-page", page);

    this.dispatchEvent(
      new CustomEvent(`${PfePagination.tag}:page-change`, {
        detail: {
          page: page
        },
        bubbles: true
      })
    );
  }

  static get observedAttributes() {
    return ["total-pages", "show-jump", "show-pages", "current-page"];
  }

  constructor() {
    super(PfePagination, {
      delayRender: true
    });

    this.previousText = "Previous";
    this.nextText = "Next";
    this.pages = [];

    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this._childrenAvailable = this._childrenAvailable.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._isReady();

    this._observer = new MutationObserver(this._childrenAvailable);

    this._observer.observe(this, {
      childList: true
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _isReady() {
    if (this.firstChild) {
      if (this._observer) {
        this._observer.disconnect();
      }
      
      this._childrenAvailable();
    }
  }

  _childrenAvailable() {
    const previousControl = this.querySelector('[control="previous"]');
    const nextControl = this.querySelector('[control="next"]');

    this.previousText = previousControl.textContent || "Previous";
    this.nextText = nextControl.textContent || "Next";

    this._setup();
    this._rendered = true;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (!this._rendered) {
      return;
    }

    this._setup();
  }

  previousPage(event) {
    if (event) {
      event.preventDefault();
    }

    this.currentPage -= 1;
  }

  nextPage(event) {
    if (event) {
      event.preventDefault();
    }

    this.currentPage += 1;
  }

  _setup() {
    this.maxPagesShown = this.showJump && this.showPages ? 7 : 9;

    if (this.maxPagesShown > this.totalPages) {
      this.maxPagesShown = this.totalPages;
    }

    if (this.showPages) {
      const truncatePageNumbers = this.totalPages > this.maxPagesShown;
      const loopPages = truncatePageNumbers
        ? this.maxPagesShown
        : this.totalPages;
      const mean = Math.ceil(this.maxPagesShown / 2);
      const minMaxDistance = mean - 1;
      const ellipsizeStart = this.currentPage - minMaxDistance > 1;
      const ellipsizeEnd = this.currentPage + minMaxDistance < this.totalPages;

      this.pages = [];

      this.pages[0] = {
        ellipsize: false,
        ariaLabel: this._getAriaLabel(1),
        text: 1
      };

      for (var i = 1; i <= loopPages - 2; i++) {
        if (
          ((i === 1 && ellipsizeStart) ||
            (i === this.maxPagesShown - 2 && ellipsizeEnd)) &&
          truncatePageNumbers
        ) {
          this.pages[i] = {
            ellipsize: true,
            text: "..."
          };
        } else {
          let pageNumber = this.currentPage - minMaxDistance + i;

          if (!ellipsizeStart) {
            pageNumber = i + 1;
          }

          if (!ellipsizeEnd) {
            pageNumber = this.totalPages - (this.maxPagesShown - 1) + i;
          }

          this.pages[i] = {
            ellipsize: false,
            ariaLabel: this._getAriaLabel(pageNumber),
            text: pageNumber
          };
        }
      }

      this.pages[loopPages - 1] = {
        ellipsize: false,
        ariaLabel: this._getAriaLabel(this.totalPages),
        text: this.totalPages
      };
    }

    this.render();

    this.shadowRoot
      .querySelector("#previous")
      .addEventListener("click", this.previousPage);
    this.shadowRoot
      .querySelector("#next")
      .addEventListener("click", this.nextPage);

    if (this.showPages) {
      const pages = [...this.shadowRoot.querySelectorAll("a.page")];
      pages.forEach(page => {
        page.addEventListener("click", this._clickHandler);
      });
    }

    if (this.showJump) {
      const form = this.shadowRoot.querySelector("form");
      form.addEventListener("submit", this._submitHandler);

      const lastPage = this.shadowRoot.querySelector("#lastPage");
      lastPage.addEventListener("click", this._clickHandler);
    }
  }

  _clickHandler(event) {
    event.preventDefault();
    this.currentPage = event.currentTarget.getAttribute("page");
  }

  _submitHandler(event) {
    event.preventDefault();

    const currentPageInput = this.shadowRoot.querySelector("#currentPageInput");
    this.currentPage = currentPageInput.value;
  }

  _getAriaLabel(page) {
    return page === this.currentPage
      ? `Page ${page}, Current Page`
      : `Page ${page}`;
  }
}

PFElement.create(PfePagination);

export default PfePagination;
//# sourceMappingURL=pfe-pagination.js.map
