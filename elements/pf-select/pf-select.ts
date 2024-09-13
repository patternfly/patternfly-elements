import type { PfChipGroup } from '../pf-chip/pf-chip-group.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import type { TemplateResult } from 'lit';

import { LitElement, html, isServer } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

import { PfOption } from './pf-option.js';
import { type PfChip, PfChipRemoveEvent } from '../pf-chip/pf-chip.js';

import styles from './pf-select.css';

export class PfSelectChangeEvent extends Event {
  constructor() {
    super('change', { bubbles: true });
  }
}

/**
 * A select list enables users to select one or more items from a list.
 *
 * A select component consists of a toggle control to open and close a menu of actions or links.
 * Selects differ from dropdowns in that they persist selection,
 * whereas dropdowns are typically used to present a list of actions or links.
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 * @slot placeholder - placeholder text for the select. Overrides the `placeholder` attribute.
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 * @cssprop [--pf-c-select__toggle--PaddingTop=var(--pf-global--spacer--form-element, 0.375rem)]
 * @cssprop [--pf-c-select__toggle--PaddingRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle--PaddingBottom=var(--pf-global--spacer--form-element, 0.375rem)]
 * @cssprop [--pf-c-select__toggle--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle--MinWidth=var(--pf-global--target-size--MinWidth, 44px)]
 * @cssprop [--pf-c-select__toggle--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-select__toggle--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-select__toggle--LineHeight=var(--pf-global--LineHeight--md, 1.5)]
 * @cssprop [--pf-c-select__toggle--BackgroundColor=var(--pf-global--BackgroundColor--100, #fff)]
 * @cssprop [--pf-c-select__toggle--before--BorderTopWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-select__toggle--before--BorderRightWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-select__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-select__toggle--before--BorderLeftWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-select__toggle--before--BorderWidth=initial]
 * @cssprop [--pf-c-select__toggle--before--BorderTopColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-select__toggle--before--BorderRightColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-select__toggle--before--BorderBottomColor=var(--pf-global--BorderColor--200, #8a8d90)]
 * @cssprop [--pf-c-select__toggle--before--BorderLeftColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-select__toggle--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__toggle--hover--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-select__toggle--focus--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-select__toggle--focus--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select__toggle--active--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-select__toggle--active--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-select__toggle--m-expanded--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select__toggle--disabled--BackgroundColor=var(--pf-global--disabled-color--300, #f0f0f0)]
 * @cssprop [--pf-c-select__toggle--m-plain--before--BorderColor=transparent]
 * @cssprop [--pf-c-select__toggle--m-placeholder--Color=transparent]
 * @cssprop [--pf-c-select--m-invalid__toggle--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-invalid__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select--m-invalid__toggle--hover--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-invalid__toggle--focus--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-invalid__toggle--active--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-invalid__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-invalid__toggle-status-icon--Color=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-select--m-success__toggle--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-success__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select--m-success__toggle--hover--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-success__toggle--focus--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-success__toggle--active--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-success__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-success__toggle-status-icon--Color=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-select--m-warning__toggle--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select--m-warning__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-select--m-warning__toggle--hover--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select--m-warning__toggle--focus--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select--m-warning__toggle--active--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select--m-warning__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select--m-warning__toggle-status-icon--Color=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-select__toggle-wrapper--not-last-child--MarginRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-select__toggle-wrapper--MaxWidth=calc(100% - var(--pf-global--spacer--lg, 1.5rem))]
 * @cssprop [--pf-c-select__toggle-wrapper--c-chip-group--MarginTop=0.3125rem]
 * @cssprop [--pf-c-select__toggle-wrapper--c-chip-group--MarginBottom=0.3125rem]
 * @cssprop [--pf-c-select__toggle-typeahead--FlexBasis=10em]
 * @cssprop [--pf-c-select__toggle-typeahead--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__toggle-typeahead--BorderTop=var(--pf-global--BorderWidth--sm, 1px) solid transparent]
 * @cssprop [--pf-c-select__toggle-typeahead--BorderRight=none]
 * @cssprop [--pf-c-select__toggle-typeahead--BorderLeft=none]
 * @cssprop [--pf-c-select__toggle-typeahead--MinWidth=7.5rem]
 * @cssprop [--pf-c-select__toggle-typeahead--focus--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--md))]
 * @cssprop [--pf-c-select__toggle--m-placeholder__toggle-text--Color=var(--pf-global--Color--dark-200, #6a6e73)]
 * @cssprop [--pf-c-select__toggle-icon--toggle-text--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-select__toggle-badge--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle-status-icon--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-select__toggle-status-icon--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__toggle-arrow--MarginLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__toggle-arrow--MarginRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle-arrow--with-clear--MarginLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle-arrow--m-top--m-expanded__toggle-arrow--Rotate=180deg]
 * @cssprop [--pf-c-select--m-plain__toggle-arrow--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select--m-plain--hover__toggle-arrow--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__toggle-clear--PaddingRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle-clear--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__toggle-clear--toggle-button--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__toggle-button--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__menu--BackgroundColor=var(--pf-global--BackgroundColor--light-100, #fff)]
 * @cssprop [--pf-c-select__menu--BoxShadow=var(--pf-global--BoxShadow--md, 0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06))]
 * @cssprop [--pf-c-select__menu--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu--PaddingBottom=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu--Top=calc(100% + var(--pf-global--spacer--xs, 0.25rem))]
 * @cssprop [--pf-c-select__menu--ZIndex=var(--pf-global--ZIndex--sm, 200)]
 * @cssprop [--pf-c-select__menu--Width=auto]
 * @cssprop [--pf-c-select__menu--MinWidth=100%]
 * @cssprop [--pf-c-select__menu--m-top--TranslateY=calc(-100% - var(--pf-global--spacer--xs, 0.25rem))]
 * @cssprop [--pf-c-select__list-item--m-loading--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-item--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-item--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-item--m-selected--PaddingRight=var(--pf-global--spacer--2xl, 3rem)]
 * @cssprop [--pf-c-select__menu-item--PaddingBottom=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-item--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-item--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-select__menu-item--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-select__menu-item--LineHeight=var(--pf-global--LineHeight--md, 1.5)]
 * @cssprop [--pf-c-select__menu-item--Color=var(--pf-global--Color--dark-100, #151515)]
 * @cssprop [--pf-c-select__menu-item--disabled--Color=var(--pf-global--Color--dark-200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item--Width=100%]
 * @cssprop [--pf-c-select__menu-item--hover--BackgroundColor=var(--pf-global--BackgroundColor--light-300, #f0f0f0)]
 * @cssprop [--pf-c-select__menu-item--focus--BackgroundColor=var(--pf-global--BackgroundColor--light-300, #f0f0f0)]
 * @cssprop [--pf-c-select__menu-item--disabled--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__menu-item--m-link--Width=auto]
 * @cssprop [--pf-c-select__menu-item--m-link--hover--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__menu-item--m-link--focus--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__menu-item--m-action--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item--m-action--hover--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__menu-item--m-action--focus--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__menu-item--m-action--disabled--Color=var(--pf-global--disabled-color--200, #d2d2d2)]
 * @cssprop [--pf-c-select__menu-item--m-action--Width=auto]
 * @cssprop [--pf-c-select__menu-item--m-action--FontSize=var(--pf-global--icon--FontSize--sm, 0.625rem)]
 * @cssprop [--pf-c-select__menu-item--m-action--hover--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__menu-item--m-action--focus--BackgroundColor=transparent]
 * @cssprop [--pf-c-select__menu-item--hover__menu-item--m-action--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item--m-favorite-action--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item--m-favorite-action--hover--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__menu-item--m-favorite-action--focus--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-select__menu-wrapper--m-favorite__menu-item--m-favorite-action--Color=var(--pf-global--palette--gold-400, #f0ab00)]
 * @cssprop [--pf-c-select__menu-wrapper--m-favorite__menu-item--m-favorite-action--hover--Color=var(--pf-global--palette--gold-500, #c58c00)]
 * @cssprop [--pf-c-select__menu-wrapper--m-favorite__menu-item--m-favorite-action--focus--Color=var(--pf-global--palette--gold-500, #c58c00)]
 * @cssprop [--pf-c-select__menu-item--m-load--Color=var(--pf-global--link--Color, #06c)]
 * @cssprop [--pf-c-select__menu-item-icon--Color=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-select__menu-item-icon--FontSize=var(--pf-global--icon--FontSize--sm, 0.625rem)]
 * @cssprop [--pf-c-select__menu-item-icon--Right=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-item-icon--Top=50%]
 * @cssprop [--pf-c-select__menu-item-icon--TranslateY=-50%]
 * @cssprop [--pf-c-select__menu-item-action-icon--MinHeight=calc(var(--pf-c-select__menu-item--FontSize) * var(--pf-c-select__menu-item--LineHeight))]
 * @cssprop [--pf-c-select__menu-item--match--FontWeight=var(--pf-global--FontWeight--bold, 700)]
 * @cssprop [--pf-c-select__menu-search--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-search--PaddingRight=var(--pf-c-select__menu-item--PaddingRight)]
 * @cssprop [--pf-c-select__menu-search--PaddingBottom=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-search--PaddingLeft=var(--pf-c-select__menu-item--PaddingLeft)]
 * @cssprop [--pf-c-select__menu-group--menu-group--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-group-title--PaddingTop=var(--pf-c-select__menu-item--PaddingTop)]
 * @cssprop [--pf-c-select__menu-group-title--PaddingRight=var(--pf-c-select__menu-item--PaddingRight)]
 * @cssprop [--pf-c-select__menu-group-title--PaddingBottom=var(--pf-c-select__menu-item--PaddingBottom)]
 * @cssprop [--pf-c-select__menu-group-title--PaddingLeft=var(--pf-c-select__menu-item--PaddingLeft)]
 * @cssprop [--pf-c-select__menu-group-title--FontSize=var(--pf-global--FontSize--xs, 0.75rem)]
 * @cssprop [--pf-c-select__menu-group-title--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-select__menu-group-title--Color=var(--pf-global--Color--dark-200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item-count--MarginLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-item-count--FontSize=var(--pf-global--FontSize--sm, 0.875rem)]
 * @cssprop [--pf-c-select__menu-item-count--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item--disabled__menu-item-count--Color=var(--pf-global--Color--dark-200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item-description--FontSize=var(--pf-global--FontSize--xs, 0.75rem)]
 * @cssprop [--pf-c-select__menu-item-description--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-select__menu-item-description--PaddingRight=var(--pf-c-select__menu-item--PaddingRight)]
 * @cssprop [--pf-c-select__menu-item-main--PaddingRight=var(--pf-c-select__menu-item--PaddingRight)]
 * @cssprop [--pf-c-select__menu-item--m-selected__menu-item-main--PaddingRight=var(--pf-c-select__menu-item--m-selected--PaddingRight)]
 * @cssprop [--pf-c-select__menu-footer--BoxShadow=var(--pf-global--BoxShadow--sm-top, 0 -0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16))]
 * @cssprop [--pf-c-select__menu-footer--PaddingTop=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-footer--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-footer--PaddingBottom=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-footer--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-select__menu-footer--MarginTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select__menu-footer--MarginBottom=calc(var(--pf-global--spacer--sm, 0.5rem) * -1)]
 * @cssprop [--pf-c-select-menu--c-divider--MarginTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-select-menu--c-divider--MarginBottom=var(--pf-global--spacer--sm, 0.5rem)]
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Variant of rendered Select */
  @property() variant: 'single' | 'checkbox' | 'typeahead' | 'typeaheadmulti' = 'single';

  /** Accessible label for the select */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Accessible label for chip group used to describe chips */
  @property({
    attribute: 'accessible-current-selections-label',
  }) accessibleCurrentSelectionsLabel = 'Current selections';

  /** Multi listbox button text */
  @property({ attribute: 'items-selected-text' }) itemsSelectedText = 'items selected';

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the select listbox is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * Enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  /** Current form value */
  @property() value?: string;

  /** Placeholder entry. Overridden by the `placeholder` slot */
  @property() placeholder?: string;

  /**
   * Indicates initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * Default is `bottom`.
   */
  @property({ reflect: true }) position: Placement = 'bottom';

  /** Flag indicating if selection badge should be hidden for checkbox variant,default false */
  @property({
    attribute: 'checkbox-selection-badge-hidden',
    type: Boolean,
  }) checkboxSelectionBadgeHidden = false;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;

  @query('#toggle-input') private _toggleInput?: HTMLInputElement;

  @query('#toggle-button') private _toggleButton?: HTMLButtonElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfOption;

  #isNotPlaceholderOption = (option: PfOption) => option !== this._placeholder;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #combobox = ComboboxController.of(this, {
    multi: this.variant === 'typeaheadmulti' || this.variant === 'checkbox',
    getItems: () => this.options,
    getFallbackLabel: () => this.accessibleLabel
                         || this.#internals.computedLabelText
                         || this.placeholder
                         || this.#slots.getSlotted('placeholder').map(x => x.textContent).join(''),
    getListboxElement: () => this._listbox ?? null,
    getToggleButton: () => this._toggleButton ?? null,
    getComboboxInput: () => this._toggleInput ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden),
    isItem: item => item instanceof PfOption,
    setItemActive: (item, active) => item.active = active,
    setItemSelected: (item, selected) => item.selected = selected,
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: PfOption | PfOption[]) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

  get selected(): PfOption[] {
    return this.#combobox.selected;
  }

  /** List of options */
  get options(): PfOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this._placeholder,
        ...Array.from(this.querySelectorAll('pf-option')),
      ].filter((x): x is PfOption => !!x && !x.hidden);
    }
  }

  /** Whether select has badge for number of selected items */
  get #hasBadge() {
    // NOTE: revisit this in v5
    return this.variant === 'checkbox' && !this.checkboxSelectionBadgeHidden;
  }

  get #buttonLabel(): string {
    const { selected } = this.#combobox;
    switch (this.variant) {
      case 'typeaheadmulti':
        return `${selected?.length ?? 0} ${this.itemsSelectedText}`;
      case 'checkbox':
        return this.#computePlaceholderText()
          || 'Options';
      default:
        return (selected ? this.value : '')
          || this.#computePlaceholderText()
          || 'Select a value';
    }
  }

  override render(): TemplateResult<1> {
    const { disabled, expanded, variant, placeholder } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { height, width } = this.getBoundingClientRect?.() || {};
    const hasBadge = this.#hasBadge;
    const selectedOptions = this.#combobox.selected ?? [];
    const typeahead = variant.startsWith('typeahead');
    const checkboxes = variant === 'checkbox';
    const badge = hasBadge && 'badge';
    const hasSelection = !!(Array.isArray(this.selected) ? this.selected.length : this.selected);
    const hideLightDomItems = typeahead && !ComboboxController.supportsCrossRootActiveDescendant;
    const placeholderIsInert = !placeholder && this.#slots.isEmpty('placeholder');

    return html`
      <div id="outer"
           style="${styleMap(styles)}"
           class="${classMap({ disabled, typeahead, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}">
        <div id="toggle">
          ${!(typeahead && selectedOptions.length < 1) ? '' : html`
          <pf-chip-group label="${this.accessibleCurrentSelectionsLabel}">
            ${repeat(selectedOptions, opt => opt.id, opt => html`
            <pf-chip id="chip-${opt.textContent}"
                     .readonly="${this.disabled}"
                     @remove="${this.#onChipRemove.bind(this, opt)}">${opt.textContent}</pf-chip>`)}
          </pf-chip-group>`}
          ${!typeahead ? '' : html`
          <input id="toggle-input"
                 ?hidden="${!typeahead}"
                 ?disabled="${disabled}"
                 placeholder="${placeholder || this.#buttonLabel}">`}
          <button id="toggle-button">
            <span id="button-text" style="display: contents;">
              <span id="toggle-text"
                    class="${classMap({ 'visually-hidden': !!typeahead, badge })}">${this.#buttonLabel}</span>${!hasBadge ? '' : html`
              <span id="toggle-badge">
                <pf-badge number="${selectedOptions.length}">${selectedOptions.length}</pf-badge>
              </span>`}
            </span>
            <svg viewBox="0 0 320 512"
                 fill="currentColor"
                 aria-hidden="true">
              <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
            </svg>
          </button>
        </div>
        <div id="listbox-container"
             ?hidden="${!expanded}"
             style="${styleMap({
               marginTop: `${height || 0}px`,
               width: width ? `${width}px` : 'auto',
             })}">
          <div id="listbox" class="${classMap({ checkboxes })}">
            <pf-option id="placeholder"
                       disabled
                       ?inert="${placeholderIsInert}"
                       aria-hidden="${ifDefined(placeholderIsInert ? undefined : String(!!hasSelection))}"
                       ?hidden="${!placeholder && this.#slots.isEmpty('placeholder')}"
            ><slot name="placeholder">${placeholder ?? ''}</slot></pf-option>
            ${this.#combobox.renderItemsToShadowRoot()}
            <slot ?hidden="${hideLightDomItems}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  @observes('disabled')
  private disabledChanged() {
    this.#combobox.disabled = this.disabled;
  }

  @observes('expanded')
  private async expandedChanged(old: boolean, expanded: boolean) {
    if (this.dispatchEvent(new Event(this.expanded ? 'close' : 'open'))) {
      if (expanded) {
        this.#doExpand();
      } else {
        this.#doCollapse();
      }
    }
  }

  @observes('selected')
  private async selectedChanged(_: PfOption[], selected: PfOption[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    switch (this.variant) {
      case 'single':
        this.hide();
        this._toggleButton?.focus();
        break;
      case 'typeahead':
        this._toggleInput!.value = this.value;
    }
  }

  @observes('variant')
  private async variantChanged() {
    this.#combobox.hostDisconnected();
    this.#combobox.multi = this.variant === 'typeaheadmulti' || this.variant === 'checkbox';
    this.#combobox.hostConnected();
    if (this.variant === 'checkbox') {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
  }

  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSelectChangeEvent());
  }

  @observes('variant')
  @observes('value')
  private focusChips(): void {
    // whether select has removable chips for selected items
    // NOTE: revisit this in v5
    // reset input if chip has been added
    const hasChips = this.variant === 'typeaheadmulti';
    if (hasChips && this._toggleInput?.value) {
      const chip =
        this.shadowRoot?.querySelector(`pf-chip#chip-${this._toggleInput?.value}`) as PfChip;
      if (chip && this._chipGroup) {
        this._chipGroup.focusOnChip(chip);
        this._toggleInput.value = '';
      }
    }
  }

  async #doExpand() {
    try {
      await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
      return true;
    } catch {
      return false;
    }
  }

  async #doCollapse() {
    try {
      await this.#float.hide();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * handles chip's remove button clicking
   * @param event remove event
   * @param opt pf-option
   */
  #onChipRemove(opt: PfOption, event: Event) {
    if (event instanceof PfChipRemoveEvent) {
      opt.selected = false;
      this._toggleInput?.focus();
    }
  }

  #computePlaceholderText() {
    return this.placeholder
      || this.querySelector?.<HTMLSlotElement>('[slot=placeholder]')
          ?.assignedNodes()
          ?.reduce((acc, node) => `${acc}${node.textContent}`, '')
          ?.trim()
      || this.#combobox.items
          .filter(this.#isNotPlaceholderOption)
          .at(0)
          ?.value
      || '';
  }

  /**
   * Opens the dropdown
   */
  async show(): Promise<void> {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes listbox
   */
  async hide(): Promise<void> {
    this.expanded = false;
    await this.updateComplete;
  }

  /**
   * toggles popup based on current state
   */
  async toggle(): Promise<void> {
    if (this.expanded) {
      await this.hide();
    } else {
      await this.show();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}

