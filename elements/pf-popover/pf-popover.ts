import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { LitElement, nothing, html, type PropertyValues, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { deprecation } from '@patternfly/pfe-core/decorators/deprecation.js';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent, StringListConverter } from '@patternfly/pfe-core/core.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-popover.css';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

type AlertSeverity = 'default' | 'info' | 'warning' | 'success' | 'danger';

export class PopoverHideEvent extends ComposedEvent {
  constructor() {
    super('hide');
  }
}

export class PopoverHiddenEvent extends ComposedEvent {
  constructor() {
    super('hidden');
  }
}

export class PopoverShowEvent extends ComposedEvent {
  constructor() {
    super('show');
  }
}

export class PopoverShownEvent extends ComposedEvent {
  constructor() {
    super('shown');
  }
}

/**
 * A **Popover** displays content in a non-modal dialog and adds contextual information or provides resources via text and links.
 * @summary Toggle the visibility of helpful or contextual information.
 * @alias Popover
 * @slot -
 *         The default slot holds invoking element.
 *         Typically this would be an icon, button, or other small sized element.
 * @slot heading
 *       This slot renders the content that will be displayed inside of the header of the popover.
 *       Typically this would be a heading element.
 * @slot icon
 *       This slot renders the icon that will be displayed inside the header of the popover,
 *       before the heading.
 * @slot body
 *       This slot renders the content that will be displayed inside of the body of the popover.
 * @slot footer
 *       This slot renders the content that will be displayed inside of the footer of the popover.
 * @csspart container - The component wrapper
 * @csspart content - The content wrapper
 * @csspart header - The header element; only visible if both an icon annd heading are provided.
 * @csspart heading - The heading element
 * @csspart icon - The header icon
 * @csspart close-button - The close button
 * @csspart body - The container for the body content
 * @csspart footer - The container for the footer content
 * @cssprop {<length>} [--pf-c-popover__arrow--Height=1.5625rem] Height of the arrow
 * @cssprop {<length>} [--pf-c-popover__arrow--Width=1.5625rem] Width of the arrow
 * @cssprop {<color>} [--pf-c-popover__title-text--Color=inherit] Heading font color
 * @cssprop {<color>} [--pf-c-popover__title-icon--Color=#151515] Heading icon font color
 * @cssprop {<color>} [--pf-c-popover__arrow--BackgroundColor=#fff] Arrow background color
 * @cssprop [--pf-c-popover__arrow--BoxShadow=0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)] Arrow box shadow
 * @cssprop [--pf-c-popover--BoxShadow=0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)] Popover box shadow
 * @cssprop {<length>} [--pf-c-tooltip__content--PaddingTop=1rem] Popover top padding
 * @cssprop {<length>} [--pf-c-tooltip__content--PaddingRight=1rem] Popover right padding
 * @cssprop {<length>} [--pf-c-tooltip__content--PaddingBottom=1rem]
 *          Popover bottom padding
 *
 * @cssprop {<length>} [--pf-c-tooltip__content--PaddingLeft=1rem]
 *          Popover left padding
 *
 * @cssprop {<number>} [--pf-c-popover--line-height=1.5]
 *          Popover line height
 *
 * @cssprop {<length>} [--pf-c-popover__content--FontSize=0.875rem]
 *          Popover font-size
 *
 * @cssprop {<color>} [--pf-c-popover__content--BackgroundColor=#fff]
 *          Popover background color
 *
 * @cssprop {<length>} [--pf-c-popover--MaxWidth=20.75rem]
 *          Popover max-width
 *
 * @cssprop {<length>} [--pf-c-popover--MinWidth=20.75rem]
 *          Popover min-width
 *
 * @cssprop {<number>} [--pf-c-popover--c-button--Right=`0]
 *          Close button right position
 *
 * @cssprop {<number>} [--pf-c-popover--c-button--Top=0]
 *          Close button top position
 *
 * @cssprop {<length>} [--pf-c-popover--c-button--sibling--PaddingRight=3rem]
 *          Padding between close button and its immediate sibling
 *
 * @cssprop {<length>} [--pf-c-popover__title-icon--MarginRight=0.5rem]
 *          Heading icon right margin
 *
 * @cssprop {<length>} [--pf-c-popover__title--FontSize=1rem]
 *          Header font-size
 *
 * @cssprop {<length>} [--pf-c-popover__title--MarginBottom=0.5rem]
 *          Header bottom margin
 *
 * @cssprop {<number>} [--pf-c-popover__title--LineHeight=1.5]
 *          Header line height
 *
 * @cssprop {<string>} [--pf-c-popover__title--FontFamily='RedHatDisplay', 'Overpass', overpass, helvetica, arial, sans-serif]
 *          Header font-family
 *
 * @cssprop {<length>} [--pf-c-popover__footer--MarginTop=1rem]
 *          Footer top margin
 *
 * @cssprop {<color>} [--pf-c-popover--m-default__title-text--Color=#003737]
 *          Default alert heading color
 *
 * @cssprop {<color>} [--pf-c-popover--m-default__title-icon--Color=#009596]
 *          Default alert icon color
 *
 * @cssprop {<color>} [--pf-c-popover--m-info__title-text--Color=#002952]
 *          Default alert heading color
 *
 * @cssprop {<color>} [--pf-c-popover--m-info__title-icon--Color=#2b9af3]
 *          Default alert icon color
 *
 * @cssprop {<color>} [--pf-c-popover--m-warning__title-text--Color=#795600]
 *          Default alert heading color
 *
 * @cssprop {<color>} [--pf-c-popover--m-warning__title-icon--Color=#f0ab00]
 *          Default alert icon color
 *
 * @cssprop {<color>} [--pf-c-popover--m-success__title-text--Color=#1e4f18]
 *          Default alert heading color
 *
 * @cssprop {<color>} [--pf-c-popover--m-success__title-icon--Color=#3e8635]
 *          Default alert icon color
 *
 * @cssprop {<color>} [--pf-c-popover--m-danger__title-text--Color=#a30000]
 *          Default alert heading color
 *
 * @cssprop {<color>} [--pf-c-popover--m-danger__title-icon--Color=#c9190b]
 *          Default alert icon color
 *
 */
@customElement('pf-popover')
export class PfPopover extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  private static instances = new Set<PfPopover>();

  private static alertIcons = new Map(Object.entries({
    default: 'bell',
    info: 'circle-info',
    success: 'circle-check',
    warning: 'triangle-exclamation',
    danger: 'circle-exclamation',
  } satisfies Record<AlertSeverity, string>) as [AlertSeverity, string][]);

  static {
    if (!isServer) {
      document.addEventListener('click', function(event) {
        for (const instance of PfPopover.instances) {
          if (!instance.noOutsideClick) {
            instance.#outsideClick(event);
          }
        }
      });
    }
  }

  /**
   * Indicates the initial popover position.
   * There are 12 options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`,
   * `bottom-start`, `bottom-end`, `left-start`, `left-end`,`right-start`, `right-end`.
   * The default is `top`.
   */
  @property({ reflect: true }) position: Placement = 'top';

  /**
   * The content rendered in the popover's heading.
   */
  @property({ reflect: true }) heading?: string;

  /**
   * The content rendered in the popover's body.
   */
  @property({ reflect: true }) body?: string;

  /**
   * The content rendered in the popover's footer.
   */
  @property({ reflect: true }) footer?: string;

  /**
   * The icon placed before the popover's heading.
   */
  @property({ reflect: true }) icon?: string;

  /**
   * The accessible label for the popover. This is required if the no heading is set.
   */
  @property({ reflect: true }) label?: string;

  /**
   * The distance to set between the popover and its trigger element.
   */
  @property({ type: Number, reflect: true }) distance?: number;

  /**
   * The flip order when flip is enabled and the initial position is not possible.
   * There are 12 options: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`,
   * `bottom-start`, `bottom-end`, `left-start`, `left-end`,`right-start`, `right-end`.
   * The default is [oppositePlacement], where only the opposite placement is tried.
   */
  @property({
    attribute: 'flip-behavior',
    converter: StringListConverter,
  }) flipBehavior?: Placement[];

  /**
   * Disable the flip behavior. The default is `false`.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-flip' }) noFlip = false;

  /**
   * The heading level to use for the popover's header. The default is `h6`.
   */
  @property({
    type: Number,
    reflect: true,
    attribute: 'heading-level',
  }) headingLevel?: HeadingLevel;

  /**
   * Indicates which icon set to use for the header's icon.
   * The default is `fas` (Font Awesome Free Solid).
   */
  @property({ reflect: true, attribute: 'icon-set' }) iconSet?: string;

  /**
   * Hide the close button. The default is `false`.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close' }) hideClose?: boolean;

  /**
   * Indicates the severity variant to use for the alert popover.
   * There are five options: `default`, `info`, `warning`, `success`, and `danger`.
   */
  @property({ reflect: true, attribute: 'alert-severity' }) alertSeverity?: AlertSeverity;

  /**
   * The accessible label for the popover's close button. The default is `Close popover`.
   */
  @property({ reflect: true, attribute: 'accessible-close-label' }) accessibleCloseLabel?: string;

  /**
   * @deprecated do not use the color-palette attribute, which was added by mistake. use context-providing containers (e.g. rh-card) instead
   */
  @deprecation({
    alias: 'accessible-close-label',
    attribute: 'close-label',
  }) closeButtonLabel?: string;

  /**
   * The text announced by the screen reader to indicate the popover's severity.
   * The default is `${alertSeverity} alert:`.
   */
  @property({ reflect: true, attribute: 'alert-severity-text' }) alertSeverityText?: string;

  /**
   * Don't hide the popover when clicking ouside of it.
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'no-outside-click',
  }) noOutsideClick?: boolean;

  /**
   * The ID of the element to attach the popover to.
   */
  @property({ reflect: true }) trigger?: string;

  @query('#popover') private _popover!: HTMLDialogElement;
  @query('#trigger') private _slottedTrigger?: HTMLElement | null;
  @query('#arrow') private _arrow!: HTMLDivElement;

  /** True before the show animation begins and after the hide animation ends */
  #hideDialog = true;

  #referenceTrigger?: HTMLElement | null = null;

  #float = new FloatingDOMController(this, {
    content: () => this._popover,
    arrow: () => this._arrow,
    invoker: () => this.#referenceTrigger || this._slottedTrigger,
  });

  #slots = new SlotController(this, null, 'icon', 'heading', 'body', 'footer');

  constructor() {
    super();
    if (!isServer) {
      this.addEventListener('keydown', this.#onKeydown);
    }
  }

  render(): TemplateResult<1> {
    const { alignment, anchor, styles } = this.#float;
    const hasFooter = this.#slots.hasSlotted('footer') || !!this.footer;
    const hasHeading = this.#slots.hasSlotted('heading') || !!this.heading;
    const hasIcon = this.#slots.hasSlotted('icon') || !!this.icon || !!this.alertSeverity;

    // https://github.com/asyncLiz/minify-html-literals/issues/37
    let headingContent = html`<h6>${this.heading ?? ''}</h6>`;
    switch (this.headingLevel) {
      case 2: headingContent = html`<h2>${this.heading ?? ''}</h2>`; break;
      case 3: headingContent = html`<h3>${this.heading ?? ''}</h3>`; break;
      case 4: headingContent = html`<h4>${this.heading ?? ''}</h4>`; break;
      case 5: headingContent = html`<h5>${this.heading ?? ''}</h5>`; break;
    }

    const headingSlotWithFallback = html`
      <slot id="heading" name="heading" part="heading" ?hidden=${!hasHeading}>${headingContent}</slot>
    `;

    const headerIcon = this.icon
      ?? PfPopover.alertIcons.get(this.alertSeverity as AlertSeverity)
      ?? '';

    return html`
      <div id="container"
           style="${styleMap(styles)}"
           class="${classMap({ [anchor]: !!anchor, [alignment]: !!alignment })}">
        <slot id="trigger"
              @slotchange="${this.#triggerChanged}"
              @keydown="${this.#onKeydown}"
              @click="${this.toggle}"></slot>
        <dialog id="popover"
                ?hidden="${this.#hideDialog}"
                aria-labelledby="heading"
                aria-describedby="body"
                aria-label=${ifDefined(this.label)}>
          <div id="arrow"></div>
          <div id="content" part="content">
            <pf-button id="close-button"
                       part="close-button"
                       plain
                       label="${this.accessibleCloseLabel ?? this.closeButtonLabel ?? 'Close popover'}"
                       @click="${this.hide}"
                       @keydown="${this.#onKeydown}"
                       ?hidden="${this.hideClose}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
              </svg>
            </pf-button>
            ${!(hasHeading && hasIcon) ? headingSlotWithFallback : html`
            <header part="header">
              <span part="icon">
                <slot name="icon">
                  <pf-icon icon="${headerIcon}"
                           set="${ifDefined(this.iconSet)}"
                           size="md"></pf-icon>
                </slot>
              </span>${!this.alertSeverity ? nothing : html`
              <span class="visually-hidden">${this.alertSeverityText ?? `${this.alertSeverity} alert:`}</span>`}
              ${headingSlotWithFallback}
            </header>`}
            <slot id="body" part="body" name="body">${this.body ?? ''}</slot>
            <footer part="footer" ?hidden=${!hasFooter}>
              <slot name="footer">${this.footer}</slot>
            </footer>
          </div>
        </dialog>
      </div>
    `;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    PfPopover.instances.delete(this);
    this.#referenceTrigger?.removeEventListener('click', this.toggle);
    this.#referenceTrigger?.removeEventListener('keydown', this.#onKeydown);
  }

  #getReferenceTrigger() {
    if (isServer || !this.trigger) {
      return null;
    } else {
      return (this.getRootNode() as Document | ShadowRoot).getElementById(this.trigger);
    }
  }

  #triggerChanged() {
    const oldReferenceTrigger = this.#referenceTrigger;
    this.#referenceTrigger = this.#getReferenceTrigger();
    if (oldReferenceTrigger !== this.#referenceTrigger) {
      oldReferenceTrigger?.removeEventListener('click', this.toggle);
      oldReferenceTrigger?.removeEventListener('keydown', this.#onKeydown);
      this.#referenceTrigger?.addEventListener('click', this.toggle);
      this.#referenceTrigger?.addEventListener('keydown', this.#onKeydown);
    }
  }

  #onKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this.hide();
        return;
      case 'Enter':
        if (event.target === this.#referenceTrigger || event.target === this._slottedTrigger) {
          event.preventDefault();
          this.show();
        }
        return;
    }
  };

  #outsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this) && !path.includes(this.#referenceTrigger as HTMLElement)) {
      this.hide();
    }
  }

  /**
   * Removes event listeners from the old trigger element and attaches
   * them to the new trigger element.
   * @param changed changed props
   */
  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('trigger')) {
      this.#triggerChanged();
    }
  }

  /**
   * Toggle the popover
   */
  @bound async toggle(): Promise<void> {
    if (this.#float.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Opens the popover
   */
  @bound async show(): Promise<void> {
    this.#hideDialog = false;
    this.requestUpdate();
    this.dispatchEvent(new PopoverShowEvent());
    await this.updateComplete;
    await this.#float.show({
      offset: this.distance ?? 25,
      placement: this.position,
      flip: !this.noFlip,
      fallbackPlacements: this.flipBehavior,
    });
    this._popover?.show();
    this.dispatchEvent(new PopoverShownEvent());
    PfPopover.instances.add(this);
  }

  /**
   * Closes the popover
   */
  @bound async hide(): Promise<void> {
    this.dispatchEvent(new PopoverHideEvent());
    await this.#float.hide();
    this._popover?.close();
    this.dispatchEvent(new PopoverHiddenEvent());
    PfPopover.instances.delete(this);
    this.#hideDialog = true;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-popover': PfPopover;
  }
}
