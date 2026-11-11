import { LitElement, html, isServer, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import './pf-v6-card-body.js';

import style from './pf-v6-card.css';

export type CardVariant = 'default' | 'secondary';
export type CardSize = 'compact' | 'large';
export type CardSelection = 'single' | 'multiple';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'label',
  'select',
  'textarea',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
].join(', ');

/** Registry of single-selection cards, keyed by their `name` attribute. */
const cardGroups = new Map<string, Set<PfV6Card>>();

/**
 * A **card** is a container for information about a single subject. A card MAY
 * combine a header, title, subtitle, actions, bodies, expandable content, and a
 * footer. Selectable cards MUST have an accessible name for screen readers;
 * each card control exposes its ARIA state.
 *
 * @summary Gives a preview of information in a small layout
 *
 * @slot - Card body content as block elements. Use `pf-v6-card-body` for body sections; wrap inline text in a block element so it receives body spacing.
 * @slot header - Header content such as an image, a brand, or an inline heading (inline or block elements). Selectable and clickable cards need an accessible name from `accessible-label`, a heading, or image `alt` text.
 * @slot title - The card title as inline text in a heading element (`<h2>`–`<h6>`) so it appears in the document outline.
 * @slot subtitle - Short inline text displayed beneath the title.
 * @slot actions - Interactive controls such as buttons, links, or inputs. Avoid other interactive content in actionable-only and selectable-only cards; screen reader users must be able to reach each control.
 * @slot footer - Inline text or inline elements such as links or actions.
 * @slot expandable-content - Block elements revealed when the card is expanded, typically one or more `pf-v6-card-body` elements.
 *
 * @fires {Event} change - Fires before a user-driven selection change.
 *        Carries no detail object; read `selected` from the card.
 *        Not fired for programmatic changes to `selected`.
 *        Cancelable: call `preventDefault()` to reject the change.
 * @fires {Event} expand - Fires before an expandable card expands.
 *        Carries no detail object.
 *        Cancelable: call `preventDefault()` to prevent expansion.
 * @fires {Event} collapse - Fires before an expandable card collapses.
 *        Carries no detail object.
 *        Cancelable: call `preventDefault()` to prevent collapse.
 *
 * @csspart header - The card header container
 * @csspart actions - The card header actions container
 * @csspart footer - The card footer container
 * @csspart toggle - The expandable card toggle button
 *
 * @cssprop {<color>} --pf-v6-c-card--BackgroundColor - Card background color
 * @cssprop {<color>} --pf-v6-c-card--BorderColor - Card border color
 * @cssprop --pf-v6-c-card--BorderStyle - Card border style
 * @cssprop {<length>} --pf-v6-c-card--BorderWidth - Card border width
 * @cssprop {<length>} --pf-v6-c-card--BorderRadius - Card border radius
 * @cssprop --pf-v6-c-card--BoxShadow - Card box shadow; defaults to none, matching patternfly.org
 * @cssprop {<length>} --pf-v6-c-card--first-child--PaddingBlockStart - Block-start padding of the first section; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingBlockEnd - Block-end padding of each section; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingInlineEnd - Inline-end padding of each section; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingInlineStart - Inline-start padding of each section; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--c-divider--child--PaddingBlockStart - Space after a divider between sections; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card__title--not--last-child--PaddingBlockEnd - Block-end padding of the title; defaults to `--pf-t--global--spacer--md`
 * @cssprop {<color>} --pf-v6-c-card__title-text--Color - Title text color; defaults to `--pf-t--global--text--color--regular`
 * @cssprop --pf-v6-c-card__title-text--FontFamily - Title font family; defaults to `--pf-t--global--font--family--heading`
 * @cssprop {<length>} --pf-v6-c-card__title-text--FontSize - Title font size; defaults to `--pf-t--global--font--size--heading--xs`
 * @cssprop {<integer>} --pf-v6-c-card__title-text--FontWeight - Title font weight; defaults to `--pf-t--global--font--weight--heading--default`
 * @cssprop {<number>} --pf-v6-c-card__title-text--LineHeight - Title line height; defaults to `--pf-t--global--font--line-height--heading`
 * @cssprop --pf-v6-c-card__title-text--OverflowWrap - Title overflow-wrap behavior
 * @cssprop {<length>} --pf-v6-c-card__body--FontSize - Body font size; defaults to `--pf-t--global--font--size--body--default`
 * @cssprop {<color>} --pf-v6-c-card__body--Color - Body text color; defaults to `--pf-t--global--text--color--regular`
 * @cssprop {<length>} --pf-v6-c-card__footer--FontSize - Footer font size; defaults to `--pf-t--global--font--size--body--default`
 * @cssprop {<color>} --pf-v6-c-card__footer--Color - Footer text color; defaults to `--pf-t--global--text--color--subtle`
 * @cssprop {<length>} --pf-v6-c-card__actions--PaddingInlineStart - Inline-start padding of the actions container; defaults to `--pf-t--global--spacer--md`
 * @cssprop {<length>} --pf-v6-c-card__actions--Gap - Gap between header actions; defaults to `--pf-t--global--spacer--gap--action-to-action--default`
 * @cssprop {<length>} --pf-v6-c-card__actions--MarginBlockStart - Block-start margin of the actions container
 * @cssprop {<length>} --pf-v6-c-card__actions--MarginBlockEnd - Block-end margin of the actions container
 * @cssprop {<length>} --pf-v6-c-card__header--m-wrap--RowGap - Row gap when the header wraps
 * @cssprop {<length>} --pf-v6-c-card__header--m-wrap--ColumnGap - Column gap when the header wraps
 * @cssprop {<length>} --pf-v6-c-card__header-toggle--MarginBlockStart - Toggle block-start margin
 * @cssprop {<length>} --pf-v6-c-card__header-toggle--MarginInlineEnd - Toggle inline-end margin
 * @cssprop {<length>} --pf-v6-c-card__header-toggle--MarginBlockEnd - Toggle block-end margin
 * @cssprop {<length>} --pf-v6-c-card__header-toggle--MarginInlineStart - Toggle inline-start margin
 * @cssprop {<time>} --pf-v6-c-card__header-toggle-icon--TransitionDuration - Toggle icon transition duration
 * @cssprop --pf-v6-c-card__header-toggle-icon--TransitionTimingFunction - Toggle icon transition timing function
 * @cssprop {<angle>} --pf-v6-c-card--m-expanded__header-toggle-icon--Rotate - Toggle icon rotation when expanded
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--BorderColor - Border color of selectable and clickable cards
 * @cssprop {<length>} --pf-v6-c-card--m-selectable--BorderWidth - Border width of selectable and clickable cards
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--hover--BorderColor - Border color on hover
 * @cssprop {<length>} --pf-v6-c-card--m-selectable--hover--BorderWidth - Border width on hover
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--focus--BorderColor - Border color on focus
 * @cssprop {<length>} --pf-v6-c-card--m-selectable--focus--BorderWidth - Border width on focus
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-selected--BorderColor - Border color when selected
 * @cssprop {<length>} --pf-v6-c-card--m-selectable--m-selected--BorderWidth - Border width when selected
 * @cssprop {<color>} --pf-v6-c-card--m-clickable--m-current--BorderColor - Border color of the current clickable card
 * @cssprop {<length>} --pf-v6-c-card--m-clickable--m-current--BorderWidth - Border width of the current clickable card
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-disabled--BackgroundColor - Background color of a disabled selectable card
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-disabled--BorderColor - Border color of a disabled selectable card
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-disabled__title-text--Color - Title color of a disabled selectable card
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-disabled__body--Color - Body color of a disabled selectable card
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-disabled__footer--Color - Footer color of a disabled selectable card
 * @cssprop {<length>} --pf-v6-c-card--m-compact--first-child--PaddingBlockStart - First section block-start padding when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact--child--PaddingBlockEnd - Section block-end padding when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact--child--PaddingInlineEnd - Section inline-end padding when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact--child--PaddingInlineStart - Section inline-start padding when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact--c-divider--child--PaddingBlockStart - Space after a divider when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact__title--not--last-child--PaddingBlockEnd - Title block-end padding when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact__title-text--FontSize - Title font size when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact__body--FontSize - Body font size when compact
 * @cssprop {<length>} --pf-v6-c-card--m-compact__footer--FontSize - Footer font size when compact
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg--first-child--PaddingBlockStart - First section block-start padding when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg--child--PaddingBlockEnd - Section block-end padding when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg--child--PaddingInlineEnd - Section inline-end padding when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg--child--PaddingInlineStart - Section inline-start padding when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg--c-divider--child--PaddingBlockStart - Space after a divider when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg__title--not--last-child--PaddingBlockEnd - Title block-end padding when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg__title-text--FontSize - Title font size when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg__body--FontSize - Body font size when large
 * @cssprop {<length>} --pf-v6-c-card--m-display-lg__footer--FontSize - Footer font size when large
 * @cssprop {<color>} --pf-v6-c-card--m-secondary--BackgroundColor - Background color of a secondary card
 * @cssprop {<color>} --pf-v6-c-card--m-plain--BackgroundColor - Background color of a plain card
 * @cssprop {<color>} --pf-v6-c-card--m-plain--BorderColor - Border color of a plain card
 * @cssprop --pf-v6-c-card--m-plain--BoxShadow - Box shadow of a plain card
 * @cssprop {<length>} --pf-v6-c-card--m-full-height--Height - Height of a full-height card
 * @cssprop {<color>} --pf-v6-c-card--m-as-tile--BackgroundColor - Background color of a card used as a tile
 * @cssprop {<color>} --pf-v6-c-card--m-as-tile--BorderColor - Border color of a card used as a tile
 * @cssprop {<color>} --pf-v6-c-card--m-glass--BackgroundColor - Background color of a glass card
 * @cssprop {<color>} --pf-v6-c-card--m-glass--BorderColor - Border color of a glass card
 * @cssprop {<length>} --pf-v6-c-card--m-glass--BorderWidth - Border width of a glass card
 * @cssprop --pf-v6-c-card--m-glass--BoxShadow - Box shadow of a glass card
 * @cssprop --pf-v6-c-card--m-glass--BackdropFilter - Backdrop filter of a glass card
 * @cssprop {<length>} --pf-v6-c-card__header--m-toggle-right--toggle--MarginInlineEnd - Toggle inline-end margin when right-aligned
 * @cssprop {<length>} --pf-v6-c-card__header--m-toggle-right--toggle--MarginInlineStart - Toggle inline-start margin when right-aligned
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--AccentColor - Accent color of the selectable control
 * @cssprop {<color>} --pf-v6-c-card--m-selectable--m-selected--focus--BorderColor - Border color of a focused selected card
 * @cssprop {<length>} --pf-v6-c-card--m-selectable--m-selected--focus--BorderWidth - Border width of a focused selected card
 */
@customElement('pf-v6-card')
export class PfV6Card extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  static readonly formAssociated = true;

  /** Visual variant of the card. */
  @property({ reflect: true }) variant?: CardVariant;

  /** Controls the spacing and typography of the card. */
  @property({ reflect: true }) size?: CardSize;

  /** Allows the card to take up the full height of its parent. */
  @property({ type: Boolean, reflect: true, attribute: 'full-height' }) fullHeight = false;

  /** Removes the card background and border. */
  @property({ type: Boolean, reflect: true }) plain = false;

  /** Applies glass styling to the card. */
  @property({ type: Boolean, reflect: true }) glass = false;

  /** Renders a checkbox or radio control, making the card selectable. */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /**
   * Makes the whole card a button or link. When combined with `selectable`,
   * renders no overlay control, enables interactive content, and applies
   * clickable styling. Actionable-only cards MUST NOT contain other
   * interactive content; the overlay covers it for pointer users.
   */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /** Whether a selectable card is selected. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Whether a clickable card is the currently clicked card. */
  @property({ type: Boolean, reflect: true }) clicked = false;

  /**
   * Disables the card's own control. Slotted interactive content is not
   * disabled; authors MUST disable or remove it from the tab order themselves.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Renders a toggle in the header which reveals the expandable content. */
  @property({ type: Boolean, reflect: true }) expandable = false;

  /** Whether an expandable card is expanded. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Aligns the expandable toggle at the end of the header. */
  @property({ type: Boolean, reflect: true, attribute: 'toggle-right' }) toggleRight = false;

  /** Allows header content to wrap onto multiple rows. */
  @property({ type: Boolean, reflect: true, attribute: 'header-wrap' }) headerWrap = false;

  /** Removes the offset from header actions. */
  @property({ type: Boolean, reflect: true, attribute: 'no-offset' }) noOffset = false;

  /** Hides the visible selectable control, for cards used as tiles. */
  @property({ type: Boolean, reflect: true, attribute: 'hide-input' }) hideInput = false;

  /** Selects a checkbox (`multiple`) or radio (`single`) control. */
  @property() selection: CardSelection = 'multiple';

  /**
   * Accessible name for the selectable, clickable, or expandable control.
   * When omitted, the text of the `title` slot, a heading in the `header`
   * slot, or the `alt` text of an image in the `header` slot is used.
   * This MUST be set when none of those sources provides text.
   */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Name of the form control, also used to group single-selection cards. */
  @property() name?: string;

  /** Value submitted when a selectable card is selected. Defaults to `on`. */
  @property() value?: string;

  /** When set on a clickable card, renders an anchor instead of a button. */
  @property() href?: string;

  /** Target for the clickable card's anchor. */
  @property() target?: string;

  #internals = InternalsController.of(this);

  #slots = new SlotController(
    this,
    null,
    'header',
    'title',
    'subtitle',
    'actions',
    'footer',
    'expandable-content',
  );

  #initialSelected = false;

  #initialExpanded = false;

  #groupKey: string | null = null;

  #label = '';

  #tabbable = true;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.#initialSelected = this.selected;
      this.#initialExpanded = this.expanded;
      this.#syncGroup();
      this.addEventListener('click', this.#onHostClick);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (!isServer) {
      this.removeEventListener('click', this.#onHostClick);
      if (this.#groupKey) {
        cardGroups.get(this.#groupKey)?.delete(this);
        this.#groupKey = null;
      }
    }
  }

  /** @internal */
  formResetCallback(): void {
    this.selected = this.#initialSelected;
    this.expanded = this.#initialExpanded;
    this.requestUpdate();
  }

  /**
   * @internal
   * @param disabled - Whether the containing form is disabled
   */
  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  override willUpdate(): void {
    this.#updateFormValue();
  }

  override updated(changed: PropertyValues<this>): void {
    if (isServer) {
      return;
    }

    this.#syncGroup();

    if (this.selectable || this.clickable || this.expandable) {
      const label = this.#deriveLabel();
      if (label !== this.#label) {
        this.#label = label;
        this.requestUpdate();
      }
    }

    if (this.selectable && this.selection === 'single' && this.name
        && (changed.has('selected')
          || changed.has('disabled')
          || changed.has('name')
          || changed.has('selection'))) {
      this.#updateGroupTabbability();
    }

    if (changed.has('selected') && this.selected && this.selection === 'single') {
      this.#unselectSiblings();
    }
  }

  override render(): TemplateResult<1> {
    const hasVisibleHeaderContent =
      !this.#slots.isEmpty('header')
      || !this.#slots.isEmpty('title')
      || !this.#slots.isEmpty('subtitle')
      || !this.#slots.isEmpty('actions')
      || (this.selectable && !this.hideInput)
      || this.expandable;

    const hasHeaderContent = hasVisibleHeaderContent || this.selectable || this.clickable;

    const hasTopContent =
      !this.#slots.isEmpty('header')
      || !this.#slots.isEmpty('actions')
      || (this.selectable && !this.hideInput)
      || this.expandable;

    return html`
      <div id="header" part="header" ?hidden=${!hasHeaderContent} ?data-bare=${!hasVisibleHeaderContent}>
        <div id="top">
          ${!this.expandable || this.toggleRight ? nothing : this.#renderToggle()}
          <div id="main">
            <slot name="header"></slot>
          </div>
          <div id="actions"
               part="actions"
               ?hidden=${this.#slots.isEmpty('actions') && !this.selectable && !this.clickable}>
            <slot name="actions"></slot>
            ${!this.selectable && !this.clickable ? nothing : this.#renderInteractiveControl()}
          </div>
          ${!this.expandable || !this.toggleRight ? nothing : this.#renderToggle()}
        </div>
        <div id="title"
             ?data-offset=${hasTopContent}
             ?hidden=${this.#slots.isEmpty('title') && this.#slots.isEmpty('subtitle')}>
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>
      </div>
      <slot id="body"></slot>
      <slot name="expandable-content"
            id="expandable-content"
            ?hidden=${!this.expanded || this.#slots.isEmpty('expandable-content')}></slot>
      <div id="footer" part="footer" ?hidden=${this.#slots.isEmpty('footer')}>
        <slot name="footer"></slot>
      </div>
    `;
  }

  #renderToggle(): TemplateResult {
    return html`
      <button id="toggle"
              type="button"
              part="toggle"
              aria-expanded=${this.expanded ? 'true' : 'false'}
              aria-controls="expandable-content"
              aria-label=${ifDefined(this.#label || undefined)}
              ?disabled=${this.disabled}
              @click=${this.#onToggleClick}>
        <span id="toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
            <path d="M8 10.5 3.5 6h9z"></path>
          </svg>
        </span>
      </button>
    `;
  }

  #renderInteractiveControl(): TemplateResult {
    if (this.selectable) {
      const isGrouped = this.selection === 'single' && !!this.name;
      const tabIndex = isGrouped ? (this.disabled || !this.#tabbable ? -1 : 0) : undefined;
      // TODO: replace the native <input> with <pf-v6-checkbox> / <pf-v6-radio> once
      // they ship (PRs #2608, #2882), for visual parity with React's Checkbox and
      // Radio components.
      return html`
        <input id="selectable-control"
               type=${this.selection === 'single' ? 'radio' : 'checkbox'}
               .checked=${this.selected}
               ?disabled=${this.disabled}
               name=${ifDefined(this.name)}
               value=${ifDefined(this.value)}
               tabindex=${ifDefined(tabIndex)}
               aria-label=${ifDefined(this.#label || undefined)}
               @change=${this.#onControlChange}
               @keydown=${this.#onControlKeydown}>
      `;
    }

    if (this.href) {
      return html`
        <a id="clickable-control"
           href=${ifDefined(this.href)}
           target=${ifDefined(this.target)}
           tabindex=${this.disabled ? -1 : nothing}
           aria-disabled=${this.disabled ? 'true' : nothing}
           aria-label=${ifDefined(this.#label || undefined)}></a>
      `;
    }

    return html`
      <button id="clickable-control"
              type="button"
              ?disabled=${this.disabled}
              aria-label=${ifDefined(this.#label || undefined)}></button>
    `;
  }

  #deriveLabel(): string {
    const title = this.querySelector('[slot="title"]');
    const header = this.querySelector('[slot="header"]');
    let heading = header?.querySelector('h1, h2, h3, h4, h5, h6');
    if (header?.matches('h1, h2, h3, h4, h5, h6')) {
      heading = header;
    }
    let image = header?.querySelector('img[alt]');
    if (header?.matches('img[alt]')) {
      image = header;
    }
    return this.accessibleLabel
      || title?.textContent?.trim()
      || heading?.textContent?.trim()
      || image?.getAttribute('alt')?.trim()
      || header?.getAttribute('aria-label')?.trim()
      || header?.textContent?.trim()
      || '';
  }

  #syncGroup(): void {
    const isGroupedSelection = this.selectable && this.selection === 'single';
    const key = isGroupedSelection ? this.name ?? null : null;

    if (key === this.#groupKey) {
      return;
    }

    if (this.#groupKey) {
      const previous = cardGroups.get(this.#groupKey);
      previous?.delete(this);
      if (previous?.size === 0) {
        cardGroups.delete(this.#groupKey);
      }
    }

    this.#groupKey = key;

    if (key) {
      let group = cardGroups.get(key);
      if (!group) {
        cardGroups.set(key, group = new Set());
      }
      group.add(this);
    }
  }

  #updateGroupTabbability(): void {
    const group = this.#siblings().filter(card => !card.disabled);
    const tabbable = group.find(card => card.selected) ?? group[0];

    for (const card of group) {
      const shouldBeTabbable = card === tabbable;
      if (shouldBeTabbable !== card.#tabbable) {
        card.#tabbable = shouldBeTabbable;
        card.requestUpdate();
      }
    }
  }

  #siblings(): PfV6Card[] {
    const { name } = this;
    if (!name) {
      return [];
    }
    const root = this.getRootNode();
    const form = this.closest('form');
    return [...(cardGroups.get(name) ?? [])].filter(card =>
      card.name === name
      && card.getRootNode() === root
      && card.closest('form') === form);
  }

  #updateFormValue(): void {
    this.#internals.setFormValue(this.selectable && this.selected ? (this.value ?? 'on') : null);
  }

  #unselectSiblings(): void {
    for (const sibling of this.#siblings()) {
      if (sibling !== this && sibling.selected) {
        sibling.selected = false;
        sibling.#updateFormValue();
      }
    }
  }

  #setSelected(value: boolean): boolean {
    if (this.disabled || value === this.selected) {
      return true;
    }

    const previous = this.selected;
    let previouslySelected: PfV6Card | undefined;
    if (value && this.selection === 'single') {
      previouslySelected = this.#siblings().find(card => card !== this && card.selected);
    }

    this.selected = value;
    if (value && this.selection === 'single') {
      this.#unselectSiblings();
    }
    this.#updateFormValue();

    if (!this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))) {
      this.selected = previous;
      this.#updateFormValue();
      if (previouslySelected) {
        previouslySelected.selected = true;
        previouslySelected.#updateFormValue();
      }
      return false;
    }

    return true;
  }

  #selectAndFocus(): void {
    this.#setSelected(true);
    this.shadowRoot?.querySelector<HTMLElement>('#selectable-control')?.focus();
  }

  #focusSibling(direction: 1 | -1, event: KeyboardEvent): void {
    const siblings = this.#siblings().filter(card => !card.disabled);
    if (siblings.length < 2) {
      return;
    }

    siblings.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

    const index = siblings.indexOf(this);
    const next = siblings[(index + direction + siblings.length) % siblings.length];

    if (next) {
      event.preventDefault();
      next.#selectAndFocus();
    }
  }

  #focusSiblingEdge(edge: 'first' | 'last', event: KeyboardEvent): void {
    const siblings = this.#siblings().filter(card => !card.disabled);
    if (siblings.length < 1) {
      return;
    }

    siblings.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

    const target = edge === 'first' ? siblings[0] : siblings.at(-1);

    if (target) {
      event.preventDefault();
      target.#selectAndFocus();
    }
  }

  #onHostClick = (event: MouseEvent): void => {
    if (!this.selectable || this.disabled || event.defaultPrevented) {
      return;
    }

    const clickedInteractiveContent = event.composedPath().some(node =>
      node !== this
      && node instanceof HTMLElement
      && node.matches(INTERACTIVE_SELECTOR));

    if (!clickedInteractiveContent) {
      this.#setSelected(!this.selected);
    }
  };

  #onControlChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!this.#setSelected(input.checked)) {
      input.checked = this.selected;
    }
  }

  #onControlKeydown(event: KeyboardEvent): void {
    if (this.selection !== 'single') {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.#focusSibling(1, event);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.#focusSibling(-1, event);
        break;
      case 'Home':
        this.#focusSiblingEdge('first', event);
        break;
      case 'End':
        this.#focusSiblingEdge('last', event);
        break;
    }
  }

  #onToggleClick(): void {
    if (this.disabled || !this.expandable) {
      return;
    }

    const next = !this.expanded;
    const event = new Event(next ? 'expand' : 'collapse', {
      bubbles: true,
      cancelable: true,
    });

    if (this.dispatchEvent(event)) {
      this.expanded = next;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-card': PfV6Card;
  }
}
