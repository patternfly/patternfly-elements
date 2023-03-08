import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseCodeBlock } from './BaseCodeBlock.js';
import styles from './pf-code-block.css';

/**
 * A code block is a component that contains 2 or more lines of read-only code. The code in a code block can be copied to the clipboard.
 *
 * @slot code
 *       The slot to put the code in
 * @slot expandable-code
 *       The slot to put the code in that should be revealed when the "Show more" button is
 *       clicked to expand the code-block
 * @slot actions
 *       Contains the actions for the code-block. For example, copy to clipboard.
 * @attr {boolean} expanded {@default `false`}
 *       Indicates if the code-block has been expanded
 * @cssprop {<color>} --pf-c-code-block--BackgroundColor {@default `#f0f0f0`}
 * @cssprop {<length>} --pf-c-code-block__header--BorderBottomWidth {@default `1px`}
 * @cssprop {<color>} --pf-c-code-block__header--BorderBottomColor {@default `#d2d2d2`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingTop {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingRight {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingBottom {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingLeft {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__pre--FontSize {@default `0.875rem`}
 * @cssprop {<string>} --pf-c-code-block__pre--FontFamily {@default `"Liberation Mono", consolas, "SFMono-Regular", menlo, monaco, "Courier New", monospace`}
 */

@customElement('pf-code-block')
export class PfCodeBlock extends BaseCodeBlock {
  static readonly styles = [...BaseCodeBlock.styles, styles];

  @property({ type: Boolean, reflect: true }) expanded = false;

  #toggle() {
    this.expanded = !this.expanded;
  }

  get #expandedContent(): string {
    return this.querySelector('script[data-expand]')?.textContent ?? '';
  }

  override render() {
    const { expanded } = this;
    return html`
      <div id="header">
        <div id="actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <div id="container" class="${classMap({ expanded })}">
        <pre><code id="content">${this.content}</code><code id="code-block-expand"
          ?hidden="${!expanded}">${this.#expandedContent}</code></pre>
        <button ?hidden="${!this.#expandedContent}"
                @click=${this.#toggle}
                aria-expanded=${this.expanded}
                aria-controls="code-block-expand">
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
          ${!this.expanded ? 'Show more' : 'Show less'}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-code-block': PfCodeBlock;
  }
}
