import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { pfelement, bound, initializer } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-cta.scss';

export interface CtaData {
  href?: string;
  text?: string;
  title?: string;
  color?: string;
  type?: string;
}

function isSupportedContent(el: Element|null): el is HTMLAnchorElement|HTMLButtonElement {
  const supportedTags = ['a', 'button']; // add input later
  return !!el && supportedTags.some(tag =>
    el.tagName.toLowerCase() === tag);
}

const CONTENT = new WeakMap<Element, boolean>();
function contentInitialized(el: Element|null): boolean {
  return !!el && !!CONTENT.get(el);
}

export class CtaSelectEvent extends Event {
  /** @summary The CTA Data for the event */
  public data: CtaData;
  constructor(
    cta: PfeCta,
    /** @summary The originating event */
    public originEvent: Event
  ) {
    super('select', { bubbles: true });
    this.data = cta.data;
  }
}

/**
 * Call to action stands out from regular hypertext links, and is used for linking users to webpages.
 *
 * @slot - We expect an anchor tag, `<a>` with an `href`, to be the first child inside `pfe-cta` element. Less preferred but allowed for specific use-cases include: `<button>` (note however that the `button` tag is not supported for the default CTA styles).
 *
 * @fires {CtaSelectEvent} select - This event is fired when a link is clicked and serves as a way to capture click events if necessary.
 * @fires {CustomEvent<CtaData & { originEvent: Event }>} pfe-cta:select - This event is fired when a link is clicked and serves as a way to capture click events if necessary. {@deprecated Use `select`}
 *
 * @cssprop --pfe-cta--Padding {@default .6rem 0}
 * @cssprop --pfe-cta--BorderRadius {@default 0}
 * @cssprop --pfe-cta--BackgroundColor {@default transparent}
 * @cssprop --pfe-cta--BackgroundColor--hover {@default transparent}
 * @cssprop --pfe-cta--BackgroundColor--focus {@default transparent}
 * @cssprop --pfe-cta--BorderColor {@default transparent}
 * @cssprop --pfe-cta--BorderColor--hover {@default transparent}
 * @cssprop --pfe-cta--BorderColor--focus {@default transparent}
 * @cssprop --pfe-cta--Color {@default var(--pfe-theme--color--link, #06c)}
 * @cssprop --pfe-cta--Color--hover {@default var(--pfe-theme--color--link--hover, #003366)}
 * @cssprop --pfe-cta--Color--focus {@default var(--pfe-theme--color--link--focus, #003366)}
 * @cssprop --pfe-cta--TextDecoration {@default none}
 * @cssprop --pfe-cta--TextDecoration--hover {@default none}
 * @cssprop --pfe-cta--TextDecoration--focus {@default none}
 * @cssprop --pfe-cta--LineHeight {@default var(--pfe-theme--line-height, 1.5)}
 * @cssprop --pfe-cta--FontFamily {@default var(--pfe-theme--font-family--heading, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif)}
 * @cssprop --pfe-cta--FontWeight {@default var(--pfe-theme--font-weight--bold, 700)}
 * @cssprop --pfe-cta__inner--BorderColor {@default transparent} inner border
 * @cssprop --pfe-cta__inner--BorderColor--focus {@default transparent} inner border
 * @cssprop --pfe-cta__arrow--Display {@default inline} arrow element
 * @cssprop --pfe-cta__arrow--Padding {@default 0 .125rem 0 .375rem} arrow element
 * @cssprop --pfe-cta__arrow--MarginLeft {@default calc(var(--pfe-theme--content-spacer, 24px) \* 0.25)} arrow element
 */
@customElement('pfe-cta') @pfelement()
export class PfeCta extends LitElement {
  static readonly styles = [style]

  /**
   * Indicates the importance of this call-to-action in the context of the page.
   * Will also influence how the call-to-action is styled.
   */
  @property({ reflect: true }) priority?: 'primary'|'secondary';

  /** Color */
  @property({ reflect: true }) color?: 'accent'|'base'|'complement'|'lightest';

  /**
   * `priority="secondary"` has a `wind` variant (`variant="wind"`) that can be applied to change the style of the secondary call-to-action.
   *
   * ```html
   * <pfe-cta priority="secondary" variant="wind">
   *   <a href="#">Wind variant</a>
   * </pfe-cta>
   * ```
   */
  @property({ reflect: true }) variant?: 'wind';

  @state() data: CtaData = {};

  /** The slotted `<a>` or `<button>` element */
  public cta: HTMLAnchorElement|HTMLButtonElement|null = null;

  /** true while the initializer method is running - to prevent double-execution */
  private initializing = false;

  private logger = new Logger(this);

  private get isDefault(): boolean {
    return !this.hasAttribute('priority');
  }

  render() {
    return html`
      <span class="pfe-cta--wrapper">
        <slot @slotchange="${this._init}"></slot>${!this.isDefault ? '' : svg`
          <svg class="pfe-cta--arrow" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.56 31.56" focusable="false" width="1em">
            <path d="M15.78 0l-3.1 3.1 10.5 10.49H0v4.38h23.18l-10.5 10.49 3.1 3.1 15.78-15.78L15.78 0z" />
          </svg>`}
        <span class="pfe-cta--inner"></span>
      </span>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._clickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the focus state listeners
    if (this.cta) {
      this.cta.removeEventListener('focus', this._focusHandler);
      this.cta.removeEventListener('blur', this._blurHandler);
      this.cta.removeEventListener('click', this._clickHandler as EventListener);
      this.cta.removeEventListener('keyup', this._keyupHandler);
    }
  }

  // Initialize the component
  @initializer({ observe: false }) private async _init() {
    await this.updateComplete;
    const content = this.firstElementChild;

    if (contentInitialized(content) || this.initializing)
      return;

    this.initializing = true;

    // If the first child does not exist or that child is not a supported tag
    if (!isSupportedContent(content))
      return this.logger.warn(`The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)`);
    else if (
      content.tagName.toLowerCase() === 'button' &&
      this.priority == null &&
      this.getAttribute('aria-disabled') !== 'true'
    )
      return this.logger.warn(`Button tag is not supported semantically by the default link styles`);

    // Capture the first child as the CTA element
    this.cta = content;

    this.data = {
      href: (this.cta as HTMLAnchorElement).href,
      text: (this.cta as HTMLAnchorElement).text,
      title: this.cta.title,
      color: this.color,
      type: this.priority,
    };

    // Append the variant to the data type
    if (this.variant)
      this.data.type = `${this.data.type} ${this.variant}`;

    // Override type if set to disabled
    if (this.getAttribute('aria-disabled'))
      this.data.type = 'disabled';

    // Watch the light DOM link for focus and blur events
    this.cta.addEventListener('focus', this._focusHandler);
    this.cta.addEventListener('blur', this._blurHandler);

    // Attach the click listener
    this.cta.addEventListener('click', this._clickHandler as EventListener);
    this.cta.addEventListener('keyup', this._keyupHandler);

    CONTENT.set(this.cta, true);
    this.initializing = false;
  }

  // On focus, add a focus class
  @bound private _focusHandler() {
    this.classList.add('focus-within');
  }

  // On focus out, remove the focus class
  @bound private _blurHandler() {
    this.classList.remove('focus-within');
  }

  // On enter press, trigger click event
  @bound private _keyupHandler(event: Event) {
    const { key } = event as KeyboardEvent;
    switch (key) {
      case 'Enter':
        this._clickHandler(event);
    }
  }

  // On click, trigger click event
  @bound private _clickHandler(originEvent: Event) {
    this.dispatchEvent(new CtaSelectEvent(this, originEvent));
    this.dispatchEvent(pfeEvent('pfe-cta:select', Object.assign(this.data, { originEvent })));
  }
}

 declare global {
   interface HTMLElementTagNameMap {
     'pfe-cta': PfeCta;
   }
 }
