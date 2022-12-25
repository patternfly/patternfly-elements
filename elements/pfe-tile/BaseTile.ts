import { LitElement, html } from 'lit';


/**
 * @slot icon           - Icon expects a `<pfe-icon>` or `<svg>`
 * @slot title          - the title of the tile should be a heading
 * @slot                - The content should be a paragraph
 *
 * @csspart icon        - container for the icon
 * @csspart title       - container for the title
 * @csspart body        - container for the body content
 */
export abstract class BaseTile extends LitElement {
  override render() {
    return html`
      <div part="header">
        <div part="icon">
          <slot id="icon" name="icon"></slot>
        </div>
        <div part="title">
          <slot id="title" name="title"></slot>
        </div>
      </div>
      <div part="body">
        <slot id="body"></slot>
      </div>
    `;
  }
}
