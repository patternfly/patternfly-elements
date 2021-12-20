import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';

// If we don't do this, Prism will try to tokenize every `<pre class="language-*">` on the page,
// Which is not necessarily what we want, for example, on a docs site where syntax is pre-highlighted
// NB: this does however modify a global, so if the user is expecting that behaviour on a page which also
// uses this component, unexpected things may happen
// @ts-expect-error: https://github.com/PrismJS/prism/pull/1087
window.Prism ??= {}; window.Prism.manual = true;

import Prism from 'prismjs';
import 'prismjs';

import { styleMap } from 'lit/directives/style-map.js';

import style from './pfe-codeblock.scss';

/**
 * Render code in a styled and formatted way.
 * @slot - Used to pass in the `<pre codeblock-container>` and `<code>` elements.
 */
@customElement('pfe-codeblock') @pfelement()
export class PfeCodeblock extends LitElement {
  static readonly styles = [style];

  /**
   * Specify a code language for display. Possible values are:
   * - `markup` (default)
   * - `html`
   * - `xml`
   * - `svg`
   * - `mathml`
   * - `css`
   * - `clike`
   * - `javascript`
   * - `js`
 */
  @property({ attribute: 'code-language', reflect: true })
  codeLanguage: 'markup'|'html'|'xml'|'svg'|'mathml'|'css'|'clike'|'javascript'|'js' = 'markup';

  /** Optional boolean attribute that, when present, shows line numbers in the code block. */
  @property({ type: Boolean, attribute: 'code-line-numbers', reflect: true })
  codeLineNumbers = false;

  /**
   * Set the theme of the code block. Possible values are:
   * - `light` (default)
   * - `dark`
   */
  @property({ reflect: true, attribute: 'code-theme' }) codeTheme:'dark'|'light' = 'light';

  /** Set the line number start value */
  @property({ type: Number, attribute: 'code-line-number-start', reflect: true })
  codeLineNumberStart = 1

  /** String code source. Set to render the provided block */
  @observed
  @property({ attribute: false })
  codeblock = '';

  @state() private renderedCodeBlock = '';

  private _codeblockContainer: HTMLElement|null = null;

  // Add mutation observer to track text changes in the dom
  private _observer = new MutationObserver(() => {
    if (!this._codeblockContainer?.textContent) {
      this.renderedCodeBlock = '';
      return;
    }

    this.codeblock = this._codeblockContainer.textContent;
  });

  connectedCallback() {
    super.connectedCallback();
    // Hide dom element and init prism.js
    if (!this._codeblockContainer) {
      this._codeblockContainer = this.querySelector('[codeblock-container]');
      this._codeblockContainer?.style.setProperty('display', 'none');
      if (this._codeblockContainer?.textContent) {
        const tmpCodeblockObject = this.trimWhitespaceLines(this._codeblockContainer.textContent);
        this.codeblock = tmpCodeblockObject.stringValue;
      }

      if (this._codeblockContainer) {
        this._observer.observe(this._codeblockContainer, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    }
  }

  render() {
    return html`
      <slot></slot>
      <pre class="${this.appliedCssClass()}" style="${styleMap({
        counterReset: this.codeLineNumberStart !== 1 ? `linenumber ${this.codeLineNumberStart - 1}` : null,
      })}"><code codeblock-render class="${this.codePrismLanguage()}">${unsafeHTML(this.renderedCodeBlock)}</code></pre>
    `;
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  protected _codeblockChanged(_: string, text: string) {
    if (text) {
      this.updateCodeBlock();
    }
  }

  /** return class for line numbers */
  private lineNumberCssClass() {
    return this.codeLineNumbers ? ' line-numbers' : '';
  }

  /** return a valid prism.js language css class */
  private codePrismLanguage() {
    return `language-${this.codeLanguage}`;
  }

  /** return a prism.js language lib */
  private codePrismLanguageLoad() {
    return Prism.languages[this.codeLanguage];
  }

  /** return applied classes for pre */
  private appliedCssClass() {
    return this.codePrismLanguage() + this.lineNumberCssClass();
  }

  /** Accepts string and Returns trimed string and new line count */
  private trimWhitespaceLines(stringToTrim: string) {
    // return if nothing passed
    if (!stringToTrim) {
      return { stringValue: '', lineCount: 0 };
    }

    const returnValue = { stringValue: '', lineCount: 0 };

    const tmpTrimArray = stringToTrim.trim().split('\n');

    const tmpLineCount = tmpTrimArray.length;
    returnValue.stringValue = tmpTrimArray.join('\n');
    returnValue.lineCount = tmpLineCount;

    return returnValue;
  }

  private processLineNumbers(htmlStringToProcess: string) {
    // return if nothing passed
    if (!htmlStringToProcess) {
      return '';
    }


    let returnHtmlString = `${htmlStringToProcess}<span class="line-numbers-rows" aria-hidden="true">`;
    const lineStringObject = this.trimWhitespaceLines(htmlStringToProcess);
    for (let i = 0, len = lineStringObject.lineCount; i < len; i++) {
      returnHtmlString = `${returnHtmlString}<span></span>`;
    }

    returnHtmlString = `${returnHtmlString}</span>`;
    return returnHtmlString;
  }

  private updateCodeBlock() {
    this.renderedCodeBlock = Prism.highlight(
      this.codeblock,
      this.codePrismLanguageLoad(),
      this.codePrismLanguage()
    );

    if (this.codeLineNumbers) {
      const htmlString = this.processLineNumbers(this.renderedCodeBlock);
      this.renderedCodeBlock = htmlString;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-codeblock': PfeCodeblock;
  }
}
