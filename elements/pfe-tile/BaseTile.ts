import { LitElement, html } from 'lit';


export abstract class BaseTile extends LitElement {
  override render() {
    return html`
      <div part="header">
        <div part="icon">
          <slot name="icon"></slot>
        </div>
        <div part="title">
          <slot></slot>
        </div>
      </div>
      <div part="body">
        <slot name="body"></slot>
      </div>
    `;
  }
}
