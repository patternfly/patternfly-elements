import { LitElement, html, nothing } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import styles from './BaseCodeBlock.scss';

export abstract class BaseCodeBlock extends LitElement {
  static readonly styles = [styles];

  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean }) showExpandButton = false;
  @queryAssignedNodes({ slot: 'expandable-code', flatten: true }) expandableCodeNodes!: Array<Node>;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  override render() {
    return html`
      <div id="header">
        <div id="actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <div id="container">
        <pre><code><slot name="code"></slot><slot name="expandable-code" id="code-block-expand"></slot></code></pre>
        ${this.showExpandButton ? html`
          <button @click=${this.toggleExpand} aria-expanded=${this.expanded} aria-controls="code-block-expand">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
            ${!this.expanded ? 'Show more' : 'Show less'}
          </button>
        ` : nothing}
      </div>
    `;
  }

  updated() {
    this.showExpandButton = this.expandableCodeNodes.length ? true : false;
  }
}
