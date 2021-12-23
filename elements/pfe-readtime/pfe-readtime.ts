import type { PropertyValues } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { bound, initializer, observed, pfelement } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-readtime.scss';

export type SupportedLang = (
  | 'en'
  | 'ko'
  | 'zh'
  | 'fr'
  | 'ja'
  | 'de'
  | 'it'
  | 'pt-br'
  | 'es'
);

function isQueryable(x: Node): x is Document|ShadowRoot {
  return x instanceof Document || x instanceof ShadowRoot;
}

function getEstimatedWPM(language: string): number {
  switch (language) {
    case 'en': // 228 wpm
    case 'ko': // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
      return 228;
    case 'zh': // 158 wpm
      return 158;
    case 'fr': // 195 wpm
      return 195;
    case 'ja': // 193 wpm
      return 193;
    case 'de':
      return 179;
    case 'it': // 188 wpm
      return 188;
    case 'pt-br': // 181 wpm
      return 181;
    case 'es':
      return 218;
    default:
      return 228;
  }
}

/**
 *
 * This component takes in the word count of a given section and does a calculation on that number to return an estimated read time based on language. The words-per-minute values were sourced from [this article](https://irisreading.com/average-reading-speed-in-various-languages) with the data originating from [this research](https://iovs.arvojournals.org/article.aspx?articleid=2166061). For more information, see the [Readtime calculation information](#readtime-calculation).
 */
@customElement('pfe-readtime') @pfelement()
export class PfeReadtime extends LitElement {
  static readonly styles = [style];

  /**
   * Allows you to manually set the number of words to use in the readtime calculations. Example: `word-count="2500"` will set the component to use 2500 words in it's calculations.
   */
  @property({ type: Number, reflect: true, attribute: 'word-count' }) wordCount = 0;

  /**
   * Is the attribute used to store the average words per minute readtime for each supported country. For more information on these you can read [https://irisreading.com/average-reading-speed-in-various-languages](https://irisreading.com/average-reading-speed-in-various-languages) and [https://iovs.arvojournals.org/article.aspx?articleid=216606](https://iovs.arvojournals.org/article.aspx?articleid=216606).
   */
  @property({ type: Number, reflect: true }) wpm?: number = getEstimatedWPM(this.lang);

  /**
   * Rather than use the light DOM region to provide the string template, you can also pass in the value via this attribute. Note that %t will be replaced with the computed readtime.
   * Template for printing the Readtime
   * Translatable string for printing out the readtime in a readable format.
   * Use %t as a stand-in for the calculated value.
   */
  @property({ attribute: 'template', reflect: true })
    templateString = this.textContent?.trim() || '%t-minute readtime';

  /**
   * By default the component will look to the language specified on the html tag but it can also accept an override via this attribute on a component level.
   */
  @observed
  @property({ reflect: true })
    lang: string = document.documentElement.lang || 'en';

  /**
   * Specify the selector of the content you want to capture the word-count from.  Whatever you enter into this attribute will be found using `document.querySelector(<for attribute value>)`.
   */
  @observed
  @property({ type: String, reflect: true }) for?: string;

  @state() private content?: Node;

  @state() private readString = '';

  private _readtime = 0;

  /**
   * Number of minutes readtime, estimated
   * @attr {number} readtime
   */
  get readtime() {
    return this._readtime;
  }

  connectedCallback() {
    super.connectedCallback();
    this._forChanged(undefined, this.for);
    this._langChanged(undefined, this.lang);
  }

  update(changed: PropertyValues<this>) {
    if (changed.has('wpm') || changed.has('wordCount') || changed.has('templateString')) {
      this._updateReadtime();
    }
    super.update(changed);
  }

  render() {
    return html`
      <span class="pfe-readtime__text">${this.readString}</span>
    `;
  }

  @bound protected _forChanged(oldVal?: string, newVal?: string) {
    if (newVal === oldVal) {
      return;
    }

    if (!newVal) {
      return;
    }
    const root = this.getRootNode();
    if (!isQueryable(root)) {
      return;
    }

    const target = root.querySelector(newVal) ?? root.querySelector(`#${newVal}`);

    if (target) {
      this.content = target;

      if (target.hasAttribute('word-count')) {
        const wcAttr = target.getAttribute('word-count');
        if (Number(wcAttr) >= 0) {
          this.wordCount = Number(wcAttr);
        }
      } else if (target.textContent?.trim()) {
        this.wordCount = target.textContent.split(/\b\w+\b/).length;
      }

      this._updateReadtime();
    }
  }

  private _updateReadtime() {
    this._readtime =
        !this.wpm ? 0
      : Math.floor(this.wordCount / this.wpm) || 0;

    this.setAttribute('readtime', this._readtime.toString());

    this.readString =
        this.readtime <= 0 ? ''
      : this.templateString?.match(/%t/) ? this.templateString.replace('%t', `${this.readtime}`)
      : `${this.readtime}${this.templateString}`;

    this.hidden = !this.readString;
  }

  @bound protected _langChanged(oldVal?: string, newVal?: string) {
    if (newVal === oldVal ?? newVal == null) {
      return;
    }
    this.wpm = getEstimatedWPM(newVal);
  }

  @initializer() protected onMutation(records?: MutationRecord[]) {
    if (records) {
      if (records.some(x =>
        [...x.addedNodes].some(y =>
          y.nodeType === Node.TEXT_NODE)) && this.textContent) {
        this.templateString = this.textContent;
      }
      this._updateReadtime();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-readtime': PfeReadtime;
  }
}
