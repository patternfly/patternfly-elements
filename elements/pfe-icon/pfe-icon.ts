import type { ColorTheme } from '@patternfly/pfe-core';
import type { IconNameResolverFn } from './icon-set.js';

import { LitElement, html, svg } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { pfelement, bound, observed, colorContextConsumer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfeIconSet } from './icon-set.js';

import { addBuiltIns } from './builtin-icon-sets.js';

import style from './pfe-icon.scss';

export type IconColor = (
  | 'accent'
  | 'base'
  | 'complement'
  | 'critical'
  | 'darker'
  | 'darkest'
  | 'important'
  | 'info'
  | 'lightest'
  | 'moderate'
  | 'success'
);

const INSTANCES = new Set<PfeIcon>();

/** Ensure iconsets are registered before elements are upgraded */
function register(klass: typeof PfeIcon) {
  // Allow the user to supply their own icon sets via config.
  // See more in the pfe-icon README.md.
  window.PfeConfig ??= {};

  addBuiltIns({ PfeIcon: klass, config: window.PfeConfig });

  // Attach a listener for the registration of an icon set
  // Leaving this attached allows for the registered set to be updated
  document.body.addEventListener(`pfe-icon:add-icon-set`, () => {
    for (const el of INSTANCES) {
      el.updateIcon();
    }
  });
}

/**
 * Icon delivers icon elements that can be sized, colored, and circled.
 * Other icon sets can also be registered and added for use.
 *
 * @summary Delivers icon elements that can be sized, colored, and circled
 */
@customElement('pfe-icon') @register @pfelement()
export class PfeIcon extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param  iconName the name of the set, or the name of an icon from that set.
   */
  static getIconSet(iconName: string): { set?: PfeIconSet } {
    iconName ??= '';
    const [setName] = iconName.split('-');
    return {
      set: this._iconSets.get(setName),
    };
  }

  static addIconSet(name: string, path: string, resolveIconName?: IconNameResolverFn) {
    let resolveFunction = resolveIconName;

    const existingSet = this._iconSets.get(name);

    if (!resolveFunction && existingSet && typeof existingSet?.resolver === 'function') {
      resolveFunction = existingSet.resolver;
    } else if (resolveFunction && typeof resolveFunction !== 'function') {
      return Logger.warn(`[${'pfe-icon'}]: The third input to addIconSet should be a function that parses and returns the icon's filename.`);
    } else if (!resolveFunction) {
      return Logger.warn(`[${'pfe-icon'}]: The set ${name} needs a resolve function for the icon names.`);
    }


    // Register the icon set and set up the event indicating the change
    this._iconSets.set(name, new PfeIconSet(name, path, resolveFunction));

    document.body.dispatchEvent(
      new CustomEvent('pfe-icon:add-icon-set', {
        bubbles: false,
        detail: {
          set: this._iconSets.get(name),
        },
      })
    );
  }

  private static _iconSets = new Map<string, PfeIconSet>();

  /**
   * For example, `rh-leaf` loads a leaf icon from an icon set named "rh".
   */
  @observed
  @property({ type: String, reflect: true }) icon = '';

  /**
   * The default size is 1em, so icon size matches text size. `2x`, etc, are multiples of font size. `sm`, `md`, etc are fixed pixel-based sizes.
   */
  @property({ type: String, reflect: true }) size: 'xl'|'lg'|'md'|'sm'|'1x'|'2x'|'3x'|'4x' = 'xl';

  /**
   * The color variant to use. This draws from your theming layer to color the icon.
   * This will set icon color or background color (if circled is true).
   * Values:
   * - base
   * - lightest
   * - lighter
   * - darker
   * - darkest
   * - complement
   * - accent
   * - critical
   * - important
   * - moderate
   * - success
   * - info
   * - default
   */
  @property({ type: String, reflect: true }) color?: IconColor;

  @property({ type: String, reflect: true, attribute: 'on-fail' }) onFail?: 'collapse';

  /**
   * Whether to draw a circular background behind the icon.
   */
  @property({ type: Boolean, reflect: true }) circled = false;

  @property({ type: Boolean, reflect: true }) block = false;

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on?: ColorTheme;

  @state() private _iconHref = '';

  @state() private _filterId?: string;

  @query('svg image') private image?: SVGElement;

  get upgraded(): boolean {
    return this.image?.hasAttribute('href') ?? false;
  }

  connectedCallback() {
    super.connectedCallback();
    INSTANCES.add(this);
  }

  render() {
    return html`
      <div class="pfe-icon--fallback">
        <slot></slot>
      </div>
      ${svg`
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
          <filter id="${this._filterId}"
              color-interpolation-filters="sRGB"
              x="0" y="0"
              height="100%" width="100%">
            <feFlood result="COLOR" />
            <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
          </filter>
          <image href="${this._iconHref}"
              width="100%"
              height="100%"
              @load=${this._iconLoad}
              @error=${this._iconLoadError}
              style="${styleMap({
                filter: this._filterId && `url(#${this._filterId})`,
              })}"
          ></image>
        </svg>
      `}
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    INSTANCES.delete(this);
  }

  @bound private _iconLoad() {
    this.classList.remove('load-failed');
  }

  @bound private _iconLoadError() {
    this.classList.add('load-failed');
    this.classList.toggle('has-fallback', !!(
      this.children.length ||
      this.textContent?.trim().length
    ));
  }

  protected _iconChanged() {
    this.updateIcon();
  }

  @bound public updateIcon() {
    const { set } = PfeIcon.getIconSet(this.icon);
    if (set) {
      this._iconHref = set.resolveIconName(this.icon);
      // Sets the id attribute on the <filter> element and points the CSS `filter` at that id.
      // also sets the CSS filter property to point at the given id
      this._filterId = getRandomId('filter');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon': PfeIcon;
  }
}
