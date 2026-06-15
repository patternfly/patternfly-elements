import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

import style from './pf-v6-avatar.css';

/** Size variants for the avatar. */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * An **avatar** provides a visual representation of a user for navigation
 * headers, user lists, or comment threads. When `src` is set, it renders
 * the image; when omitted, it provides a placeholder silhouette. Authors
 * SHOULD set `alt` when the avatar conveys identity.
 *
 * @summary Displays a user's avatar image with optional placeholder
 *
 * @cssprop {<length>} --pf-v6-c-avatar--Width - Avatar width {@default 2.25rem}
 * @cssprop {<length>} --pf-v6-c-avatar--Height - Avatar height {@default 2.25rem}
 * @cssprop {<length>} --pf-v6-c-avatar--BorderRadius - Avatar border radius {@default 30em}
 * @cssprop {<color>} --pf-v6-c-avatar--BorderColor - Avatar border color {@default transparent}
 * @cssprop {<length>} --pf-v6-c-avatar--BorderWidth - Avatar border width {@default 0}
 * @cssprop {<color>} --pf-v6-c-avatar--m-bordered--BorderColor - Border color when bordered
 * @cssprop {<length>} --pf-v6-c-avatar--m-bordered--BorderWidth - Border width when bordered
 * @cssprop {<length>} --pf-v6-c-avatar--m-sm--Width - Width when size is sm {@default 1.5rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-sm--Height - Height when size is sm {@default 1.5rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-md--Width - Width when size is md {@default 2.25rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-md--Height - Height when size is md {@default 2.25rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-lg--Width - Width when size is lg {@default 4.5rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-lg--Height - Height when size is lg {@default 4.5rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-xl--Width - Width when size is xl {@default 8rem}
 * @cssprop {<length>} --pf-v6-c-avatar--m-xl--Height - Height when size is xl {@default 8rem}
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

  override render(): TemplateResult {
    const { alt, src } = this;
    return html`
      <img alt="${alt ?? ''}" src="${src}" ?hidden="${src == null}">
      <svg viewBox="0 0 36 36"
           role="presentation"
           ?hidden="${src != null}">
        <rect width="36" height="36" fill="var(--_placeholder-bg)"/>
        <path d="M30.5 36c-.4-3.9-1.3-9-2.9-11-1.1-1.4-2.3-2.2-3.5-2.6s-1.8-.6-6.3-.6-6.1.7-6.1.7c-1.2.4-2.4 1.2-3.4 2.6C6.7 27 5.8 32.2 5.4 36h25.1zM17.7 20.1c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4z"
              fill="var(--_placeholder-fg)"/>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-avatar': PfV6Avatar;
  }
}
