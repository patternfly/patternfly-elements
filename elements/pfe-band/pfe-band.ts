import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-band.scss';

/**
 * Band is a container component that provides a set of slots in which to render banded content.
 *
 * @slot header
 *       This slot renders at the top of the container and generally contains the title, headline, and/or subheadline content.
 *       Other possible candidates include a set of social sharing links or tags that describe the content below.
 *       The template is automatically wrapping this slot in a `header` tag.
 *       Recommend using h-level or p tags inside this slot.
 * @slot
 *       This unnamed slot should contain the bulk of the content in this element.
 *       The template is automatically wrapping all content within an `article` tag.
 * @slot footer
 *       This slot is typically used for calls-to-action or footnotes and is pushed to the bottom of the container.
 *       Recommended tags include `pfe-cta`.
 *       The template is automatically wrapping this slot in a `footer` tag.
 * @slot aside
 *       This slot is for content that should be rendered to the right or left of the default slot on desktop.
 *       Asides often contain `pfe-card` or interest forms which provide users a little more information or context for the band.
 *       The template is automatically wrapping this slot in an `aside` tag.
 *
 * @slot {@deprecated} pfe-band--header - (deprecated) same as `header`
 * @slot {@deprecated} pfe-band--footer - (deprecated) same as `footer`
 * @slot {@deprecated} pfe-band--aside - (deprecated) same as `aside`
 *
 * @csspart base Container for all elements in shadowroot.
 * @csspart header Container for the slotted header elements.
 * @csspart body Container for the slotted content.
 * @csspart wrapper Container for header and body elements (only available when `asideHeight = "full"`).
 * @csspart aside Container for the slotted aside elements.
 * @csspart footer Container for the slotted footer elements.
 *
 * @cssprop --pfe-band--layout - Applied to `.pfe-band__container`
 * @cssprop --pfe-band_header--layout - Applied to `.pfe-band__header`
 * @cssprop --pfe-band_body--layout - Applied to `.pfe-band__body`
 * @cssprop --pfe-band_footer--layout - Applied to `.pfe-band__footer`
 * @cssprop --pfe-band_aside--layout - Applied to `.pfe-band__aside`
 */
@customElement('pfe-band') @pfelement()
export class PfeBand extends LitElement {
  static readonly styles = [style];

  /**
   * Optional background image applied to the entire band container.
   * Alignment of this image can be managed using the `--pfe-band--BackgroundPosition` variable which is set to `center center` by default.
   */
  @observed
  @property({ attribute: 'img-src', reflect: true }) imgSrc = '';

  /**
   * Your theme will influence these colors so check there first if you are seeing inconsistencies.
   */
  @property({ reflect: true })
    color: 'accent'|'base'|'complement'|'darker'|'darkest'|'lightest' = 'base';

  /**
   * This influences where the aside is rendered at the desktop view and are indicated relative to the body content.
   */
  @property({ attribute: 'aside-desktop', reflect: true }) asideDesktop: 'right'|'left' = 'right';

  /**
   * This influences the position of the aside in the mobile view as well as where in the DOM the aside markup is rendered.
   *
   * These names are relative to the body content.
   */
  @property({ attribute: 'aside-mobile', reflect: true }) asideMobile: 'top'|'bottom' = 'bottom';

  /**
   * This influences the height of the aside region relative to the body content.
   *
   * A `full` height starts at the top of the band and spans the header, body, and footer regions.
   * A `body` height spans the body and footer regions only with the header region sitting above it in the rendered view.
   */
  @property({ attribute: 'aside-height', reflect: true }) asideHeight: 'full'|'body' = 'body';

  /**
   * Optionally adjusts the padding on the container.
   */
  @property({ reflect: true }) size?: 'small';

  /** Default grid on for the light DOM regions (header, body, footer, aside) */
  @property({ attribute: 'use-grid', type: Boolean, reflect: true }) useGrid = false;

  get asidePosition() {
    return {
      desktop: this.asideDesktop,
      mobile: this.asideMobile,
      height: this.asideHeight,
    };
  }

  private slots = new SlotController(this, {
    slots: ['header', null, 'footer', 'aside'],
    deprecations: {
      header: 'pfe-band--header',
      aside: 'pfe-band--aside',
      footer: 'pfe-band--footer',
    }
  });

  render() {
    const { asideHeight, asidePosition } = this;

    const hasSlottedBody = this.slots.hasSlotted();
    const hasSlottedHeader = this.slots.hasSlotted('header', 'pfe-band--header');
    const hasSlottedAside = this.slots.hasSlotted('aside', 'pfe-band--aside');
    const hasSlottedFooter = this.slots.hasSlotted('footer', 'pfe-band--footer');

    const showTopAside =
      hasSlottedAside &&
      asidePosition.mobile === 'top';

    const showBottomAside =
      asideHeight !== 'full' &&
      hasSlottedAside &&
      asidePosition.mobile !== 'top';

    const showFullBottomAside =
      asideHeight === 'full' &&
      hasSlottedAside &&
      asidePosition.mobile !== 'top';

    const slotTemplate = html`
      <aside class="pfe-band__aside" part="aside">
        <slot name="aside"></slot>
        <slot name="pfe-band--aside"></slot>
      </aside>`;

    const content = html`${!hasSlottedHeader ? '' : html`
      <header class="pfe-band__header" part="header">
        <slot name="header"></slot>
        <slot name="pfe-band--header"></slot>
      </header>`}
      <article class="pfe-band__body" part="body">
        <slot></slot>
      </article>
      ${!showBottomAside ? '' : slotTemplate}
      ${!hasSlottedFooter ? '' : html`
      <footer class="pfe-band__footer" part="footer">
        <slot name="footer"></slot>
        <slot name="pfe-band--footer"></slot>
      </footer>`}
    `;

    const maybeWrapped =
        this.asideHeight !== 'full' ? content
      : html`<div class="pfe-band__wrapper" part="wrapper">${content}</div>`;

    return html`
      <section class="pfe-band__container ${classMap({
        'has-header': hasSlottedHeader,
        'has-body': hasSlottedBody,
        'has-aside': hasSlottedAside,
        'has-footer': hasSlottedFooter,
      })}" part="base">
        ${!showTopAside ? '' : slotTemplate}
        ${maybeWrapped}
        ${!showFullBottomAside ? '' : slotTemplate}
      </section>
    `;
  }

  /** Update the background image */
  protected _imgSrcChanged(_oldVal: string, newVal: string) {
    // Set the image as the background image
    this.style.backgroundImage = newVal ? `url('${newVal}')` : ``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-band': PfeBand;
  }
}
