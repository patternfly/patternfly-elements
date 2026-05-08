import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

import style from './pf-v6-avatar.css';

/** Size variants for the avatar. */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export class PfV6AvatarLoadEvent extends Event {
  constructor(public originalEvent: Event) {
    super('load', { bubbles: true });
  }
}

/**
 * An **avatar** is a visual used to represent a user. It may contain an image
 * or a placeholder graphic.
 * @summary Displays a user's avatar image
 * @fires {PfV6AvatarLoadEvent} load - when the avatar image loads
 * @cssprop {<length>} --pf-v6-c-avatar--Width - Width of the avatar
 * @cssprop {<length>} --pf-v6-c-avatar--Height - Height of the avatar
 * @cssprop {<length>} --pf-v6-c-avatar--BorderRadius - Border radius of the avatar
 * @cssprop {<color>} --pf-v6-c-avatar--BorderColor - Border color of the avatar
 * @cssprop {<length>} --pf-v6-c-avatar--BorderWidth - Border width of the avatar
 * @cssprop {<length>} --pf-v6-c-avatar--m-sm--Width - Width when size is `sm`
 * @cssprop {<length>} --pf-v6-c-avatar--m-sm--Height - Height when size is `sm`
 * @cssprop {<length>} --pf-v6-c-avatar--m-md--Width - Width when size is `md`
 * @cssprop {<length>} --pf-v6-c-avatar--m-md--Height - Height when size is `md`
 * @cssprop {<length>} --pf-v6-c-avatar--m-lg--Width - Width when size is `lg`
 * @cssprop {<length>} --pf-v6-c-avatar--m-lg--Height - Height when size is `lg`
 * @cssprop {<length>} --pf-v6-c-avatar--m-xl--Width - Width when size is `xl`
 * @cssprop {<length>} --pf-v6-c-avatar--m-xl--Height - Height when size is `xl`
 * @cssprop {<color>} --pf-v6-c-avatar--m-bordered--BorderColor - Border color when bordered
 * @cssprop {<length>} --pf-v6-c-avatar--m-bordered--BorderWidth - Border width when bordered
 */
@customElement('pf-v6-avatar')
export class PfV6Avatar extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** The URL to the user's custom avatar image. */
  @property() src?: string;

  /** The alt text for the avatar image. */
  @property({ reflect: true }) alt?: string;

  /** Size of the avatar */
  @property({ reflect: true }) size?: AvatarSize;

  /** Whether to display a border around the avatar */
  @property({ type: Boolean, reflect: true }) bordered = false;

  override render(): TemplateResult<1> {
    return this.src != null ? html`
      <img id="img"
           alt="${this.alt ?? ''}"
           src=${this.src}
           @load="${this.#onLoad}">
    ` : html`
      <svg id="placeholder"
           aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 36 36">
        <rect width="36" height="36" fill="var(--_placeholder-bg)"/>
        <path d="M30.5 36c-.4-3.9-1.3-9-2.9-11-1.1-1.4-2.3-2.2-3.5-2.6s-1.8-.6-6.3-.6-6.1.7-6.1.7c-1.2.4-2.4 1.2-3.4 2.6C6.7 27 5.8 32.2 5.4 36h25.1zM17.7 20.1c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4z"
              fill="var(--_placeholder-fg)"/>
      </svg>
    `;
  }

  #onLoad(event: Event) {
    this.dispatchEvent(new PfV6AvatarLoadEvent(event));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-avatar': PfV6Avatar;
  }
}
