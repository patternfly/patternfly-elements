import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

import style from './pf-avatar.css';

export class PfAvatarLoadEvent extends Event {
  constructor(public originalEvent: Event) {
    super('load', { bubbles: true });
  }
}

/**
 * An **avatar** is a visual used to represent a user. It may contain an image or a placeholder graphic.
 * @summary For displaying a user's avatar image
 * @fires {PfAvatarLoadEvent} load - when the avatar loads
 * @cssprop [--pf-c-avatar--Width=24px]
 * @cssprop [--pf-c-avatar--Height=24px]
 * @cssprop [--pf-c-avatar--BorderRadius=var(--pf-global--BorderRadius--lg, 128px)]
 * @cssprop [--pf-c-avatar--BorderWidth=0]
 * @cssprop [--pf-c-avatar--BorderColor=var(--pf-global--BorderColor--dark-100, #d2d2d2)]
 * @cssprop [--pf-c-avatar--m-dark--BorderColor=var(--pf-global--palette--black-700, #4f5255)]
 * @cssprop [--pf-c-avatar--m-sm--Width=24px]
 * @cssprop [--pf-c-avatar--m-sm--Height=24px]
 * @cssprop [--pf-c-avatar--m-md--Width=36px]
 * @cssprop [--pf-c-avatar--m-md--Height=36px]
 * @cssprop [--pf-c-avatar--m-lg--Width=72px]
 * @cssprop [--pf-c-avatar--m-lg--Height=72px]
 * @cssprop [--pf-c-avatar--m-xl--Width=28px]
 * @cssprop [--pf-c-avatar--m-xl--Height=28px]
 */
@customElement('pf-avatar')
export class PfAvatar extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** The URL to the user's custom avatar image. */
  @property() src?: string;

  /** The alt text for the avatar image. */
  @property({ reflect: true }) alt?: string = 'Avatar image';

  /** Size of the Avatar */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  /** Whether to display a border around the avatar */
  @property({ reflect: true }) border?: 'light' | 'dark';

  /** Whether or not the Avatar image is dark */
  @property({ type: Boolean, reflect: true }) dark = false;

  render(): TemplateResult<1> {
    return this.src != null ? html`
      <img id="img"
           alt="${this.alt ?? ''}"
           src=${this.src}
           @load="${this.#onLoad}">
    ` : this.dark ? html`
      <svg xmlns="http://www.w3.org/2000/svg"
           style="enable-background:new 0 0 36 36"
           viewBox="0 0 36 36">
        <style>.st1,.st2{fill-rule:evenodd;clip-rule:evenodd;fill:#6a6e73}.st2{fill:#4f5255}</style><path d="M0 0h36v36H0z" style="fill:#212427"/>
        <path d="M30.5 36c-.4-3.9-1.3-9-2.9-11-1.1-1.4-2.3-2.2-3.5-2.6s-1.8-.6-6.3-.6-6.1.7-6.1.7c-1.2.4-2.4 1.2-3.4 2.6C6.7 27 5.8 32.2 5.4 36h25.1zM17.7 20.1c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4z" class="st1"/><path d="M13.3 36v-6.7c-2 .4-2.9 1.4-3.1 3.5l-.1 3.2h3.2zM22.7 36v-6.7c2 .4 2.9 1.4 3.1 3.5l.1 3.2h-3.2z" class="st2"/>
      </svg>
    ` : html`
      <svg xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 36 36" viewBox="0 0 36 36">
        <style>.st2{fill:#b8bbbe}</style><path d="M0 0h36v36H0z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#f0f0f0"/>
        <path d="M17.7 20.1c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#d2d2d2"/><path d="M13.3 36v-6.7c-2 .4-2.9 1.4-3.1 3.5l-.1 3.2h3.2z" class="st2"/>
        <path d="m10.1 36 .1-3.2c.2-2.1 1.1-3.1 3.1-3.5V36h9.4v-6.7c2 .4 2.9 1.4 3.1 3.5l.1 3.2h4.7c-.4-3.9-1.3-9-2.9-11-1.1-1.4-2.3-2.2-3.5-2.6s-1.8-.6-6.3-.6-6.1.7-6.1.7c-1.2.4-2.4 1.2-3.4 2.6-1.7 1.9-2.6 7.1-3 10.9h4.7z" style="fill:#d2d2d2"/><path d="m25.9 36-.1-3.2c-.2-2.1-1.1-3.1-3.1-3.5V36h3.2z" class="st2"/>
      </svg>
      `;
  }

  #onLoad(event: Event) {
    this.dispatchEvent(new PfAvatarLoadEvent(event));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-avatar': PfAvatar;
  }
}
