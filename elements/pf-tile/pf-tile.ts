import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tile.css';

export type StackedSize = (
  | 'md'
  | 'lg'
);

/**
 * A **tile** component is a form of selection that can be used in place of a
 * radio button and is commonly used in forms. A tile appears visually similar to a
 * [selectable card](../card/). However, tiles are used specifically when the user is selecting
 * a static option, whereas a selectable card triggers an action or opens a quickstart
 * or sidebar to provide additional information.
 * @alias Tile
 * @attr {'boolean'} selected       - selected variant
 * @attr {'md'|'lg'|null} stacked   - stacked variant
 */
@customElement('pf-tile')
export class PfTile extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true }) stacked?: StackedSize;

  override render(): TemplateResult<1> {
    return html`
      <div part="header">
        <!-- container for the icon -->
        <div part="icon">
          <!-- Icon expects a \`<pf-icon>\` or \`<svg>\` -->
          <slot id="icon" name="icon"></slot>
        </div>
        <!-- container for the title -->
        <div part="title">
          <!-- the title of the tile should be a heading -->
          <slot id="title" name="title"></slot>
        </div>
      </div>
      <!-- container for the body content -->
      <div part="body">
        <!-- The content should be a paragraph -->
        <slot id="body"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tile': PfTile;
  }
}
