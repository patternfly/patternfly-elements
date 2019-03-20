import PFElement from "../pfelement/pfelement.js";

class PfePagination extends PFElement {
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
