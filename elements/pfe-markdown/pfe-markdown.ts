import { LitElement, html } from 'lit';
import { bound, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { customElement, property } from 'lit/decorators.js';

import { marked } from 'marked';

import style from './pfe-markdown.scss';

/**
 * Markdown takes markdown as input and displays it as HTML.
 * This element uses the [marked.js library](https://marked.js.org/#/README.md#README.md) to convert the markdown to HTML.
 */
@customElement('pfe-markdown') @pfelement()
export class PfeMarkdown extends LitElement {
  static readonly styles = [style];

  /** Set to render markdown */
  @observed
  @property({ attribute: false }) markdown: string|null = null;

  private _markdownRender: HTMLElement|null = null;
  private _markdownContainer: HTMLElement|null = null;
  private _observerConfig: MutationObserverInit = { childList: true, subtree: true };
  private observer = new MutationObserver(this.onMutation);

  connectedCallback() {
    super.connectedCallback();
    this._markdownRender = document.createElement('div');
    this._markdownRender.setAttribute('pfe-markdown-render', '');
    this.appendChild(this._markdownRender);
  }

  render() {
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  @bound private onMutation() {
    if (!this._markdownContainer?.textContent) {
      if (this._markdownRender) {
        this._markdownRender.innerHTML = '';
      }
    } else {
      this.markdown = this._markdownContainer.textContent;
    }
  }

  private onSlotChange() {
    if (!this._markdownContainer) {
      this._markdownContainer = this.querySelector('[pfe-markdown-container]');
      if (this._markdownContainer) {
        this._markdownContainer.style.display = 'none';
      }
      this._init();
    }
  }

  private _init() {
    if (this._markdownContainer?.textContent) {
      this.markdown = this._markdownContainer.textContent;
    }

    if (this._markdownContainer) {
      this.observer.observe(this._markdownContainer, this._observerConfig);
    }
  }

  // pulled from https://github.com/PolymerElements/marked-element/blob/master/marked-element.js#L340
  private _unindent(text: string): string {
    if (!text) {
      return text;
    }

    const lines = text.replace(/\t/g, '  ').split('\n');
    const indent = lines.reduce((prev, line) => {
      // Completely ignore blank lines.
      if (/^\s*$/.test(line)) {
        return prev;
      }

      const [{ length: lineIndent = 0 } = {}] = line.match(/^(\s*)/) ?? [];

      if (prev === null) {
        return lineIndent;
      }

      return lineIndent < prev ? lineIndent : prev;
    }, 0);

    return lines.map(l => l.substr(indent)).join('\n');
  }

  protected _markdownChanged(_: string|null, text: string|null) {
    if (text) {
      this.renderMarkdown(this._unindent(text));
    }
  }

  private renderMarkdown(text: string|null) {
    if (this._markdownRender) {
      this._markdownRender.innerHTML = marked(text ?? '');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-markdown': PfeMarkdown;
  }
}
