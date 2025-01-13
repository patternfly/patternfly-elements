import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { state } from 'lit/decorators/state.js';

import { provide } from '@lit/context';
import { thRoleContext } from './context.js';

import { PfTh, RequestSortEvent } from './pf-th.js';
import { PfTd } from './pf-td.js';
import { PfTr, RequestExpandEvent } from './pf-tr.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';

const rowQuery = [
  ':scope > pf-tbody:not([expandable]) > pf-tr',
  ':scope > pf-tbody > pf-tr[expandable]',
  ':scope > pf-tr',
  ':scope > pf-tr[expandable]',
].join();

/**
 * A **table** is used to display large data sets that can be easily laid out in a simple grid with column headers.
 * @slot
 *       The default slot can hold an optional `pf-caption` element and a combination of `pf-tr`, `pf-thead`, or `pf-tbody` elements.
 * @cssprop {<color>} [--pf-c-table--BackgroundColor=#fff]
 *          Table background color
 *
 * @cssprop {<color>} [--pf-c-table--BorderColor=#d2d2d2]
 *          Table border color
 *
 * @cssprop {<dimension>} [--pf-c-table--border-width--base=1px]
 *          Table border base width
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--FontSize=0.875rem]
 *          Table caption font size
 *
 * @cssprop {<color>} [--pf-c-table-caption--Color=#6a6e73]
 *          Table caption color
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--PaddingTop=1rem]
 *          Table caption top padding
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--PaddingRight=1.5rem]
 *          Table caption right padding
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--PaddingBottom=1rem]
 *          Table caption bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--PaddingLeft=1.5rem]
 *          Table caption left padding
 *
 * @cssprop {<length>} [--pf-c-table-caption--xl--PaddingRight=1rem]
 *          Table XL caption right padding
 *
 * @cssprop {<dimension>} [--pf-c-table-caption--xl--PaddingLeft=1rem]
 *          Table XL caption left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--thead--cell--FontSize=0.875rem]
 *          Table head cell font size
 *
 * @cssprop {<number>} [--pf-c-table--thead--cell--FontWeight=700]
 *          Table head cell font weight
 *
 * @cssprop {<dimension>} [--pf-c-table--tbody--cell--PaddingTop=1.5rem]
 *          Table body cell padding top
 *
 * @cssprop {<dimension>} [--pf-c-table--tbody--cell--PaddingBottom=1.5rem]
 *          Table body cell padding bottom
 *
 * @cssprop {<color>} [--pf-c-table--tr--BoxShadow--top--base=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Table row top base box shadow
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--Padding--base=1rem]
 *          Table cell base padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--FontSize=1rem]
 *          Table cell font size
 *
 * @cssprop {<number>} [--pf-c-table--cell--FontWeight=400]
 *          Table cell font weight
 *
 * @cssprop {<color>} [--pf-c-table--cell--Color=#151515]
 *          Table cell color
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingTop=1rem]
 *          Table cell top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingRight=1rem]
 *          Table cell right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingBottom=1rem]
 *          Table cell bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingLeft=1rem]
 *          Table cell left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--first-last-child--PaddingLeft=1rem]
 *          Table cell last child left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--first-last-child--PaddingRight=1rem]
 *          Table cell last child right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--first-last-child--xl--PaddingLeft=1.5rem]
 *          Table XL cell last child left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--first-last-child--xl--PaddingRight=1.5rem]
 *          Table XL cell last child right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--tr--m-first-cell-offset-reset--cell--PaddingLeft=1rem]
 *          Table row first cell offset reset cell left padding
 *
 * @cssprop {<length>} [--pf-c-table--cell--MinWidth=0]
 *          Table cell min width
 *
 * @cssprop {<length>} [--pf-c-table--cell--MaxWidth=none]
 *          Table cell max width
 *
 * @cssprop {<length>} [--pf-c-table--cell--Width=auto]
 *          Table cell width
 *
 * @cssprop {<overflow>} [--pf-c-table--cell--Overflow=visible]
 *          Table cell overflow
 *
 * @cssprop {<>} [--pf-c-table--cell--TextOverflow=clip]
 *          Table cell text overflow
 *
 * @cssprop {<>} [--pf-c-table--cell--WhiteSpace=normal]
 *          Table cell white space
 *
 * @cssprop {<>} [--pf-c-table--cell--WordBreak=normal]
 *          Table cell word break
 *
 * @cssprop {<length>} [--pf-c-table--cell--m-border-right--before--BorderRightWidth=1px]
 *          Table cell before right border width
 *
 * @cssprop {<color>} [--pf-c-table--cell--m-border-right--before--BorderRightColor=#d2d2d2]
 *          Table cell before right border color
 *
 * @cssprop {<length>} [--pf-c-table--cell--m-border-left--before--BorderLeftWidth=1px]
 *          Table cell before left border width
 *
 * @cssprop {<color>} [--pf-c-table--cell--m-border-left--before--BorderLeftColor=#d2d2d2]
 *          Table cell before left border color
 *
 * @cssprop {<length>} [--pf-c-table--cell--m-help--MinWidth=11ch]
 *          Help cell minimum width
 *
 * @cssprop {<length>} [--pf-c-table--m-truncate--cell--MaxWidth=1px]
 *          Help cell maximum width
 *
 * @cssprop {<calc-sum>} [--pf-c-table--m-truncate--cell--MinWidth=calc(5ch + 1rem + 1rem)]
 *          Truncated cell minimum width
 *
 * @cssprop {<>} [--pf-c-table--cell--hidden-visible--Display=grid]
 *          Cell visible display
 *
 * @cssprop {<calc-product>} [--pf-c-table__toggle--c-button--MarginTop=calc(0.375rem * -1)]
 *          Toggle button top margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__toggle--c-button--MarginBottom=calc(0.375rem * -1)]
 *          Toggle button bottom margin
 *
 * @cssprop {<>} [--pf-c-table__toggle--c-button__toggle-icon--Rotate=270deg]
 *          Toggle button icon rotation
 *
 * @cssprop {<>} [--pf-c-table__toggle--c-button__toggle-icon--Transition=.2s ease-in 0s]
 *          Toggle button icon transition
 *
 * @cssprop {<>} [--pf-c-table__toggle--c-button--m-expanded__toggle-icon--Rotate=360deg]
 *          Expanded toggle button icon rotation
 *
 * @cssprop {<color>} [--pf-c-table__button--BackgroundColor=transparent]
 *          Button background color
 *
 * @cssprop {<color>} [--pf-c-table__button--Color=#151515]
 *          Button color
 *
 * @cssprop {<color>} [--pf-c-table__button--hover--Color=#151515]
 *          Button hover color
 *
 * @cssprop {<color>} [--pf-c-table__button--focus--Color=#151515]
 *          Button focus color
 *
 * @cssprop {<color>} [--pf-c-table__button--active--Color=#151515]
 *          Button active color
 *
 * @cssprop {<calc-sum>} [--pf-c-table__button--OutlineOffset=calc(3px * -1)]
 *          Button outline offset
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__toggle--PaddingTop=0]
 *          Compact toggle top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__toggle--PaddingBottom=0]
 *          Compacy toggle bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table__check--input--MarginTop=0.25rem]
 *          Check input top margin
 *
 * @cssprop {<dimension>} [--pf-c-table__check--input--FontSize=1rem]
 *          Check input font size
 *
 * @cssprop {<color>} [--pf-c-table--cell--m-favorite--Color=#d2d2d2]
 *          Favorite cell color
 *
 * @cssprop {<color>} [--pf-c-table__favorite--c-button--Color=#d2d2d2]
 *          Favorite button color
 *
 * @cssprop {<dimension>} [--pf-c-table__favorite--c-button--FontSize=0.875rem]
 *          Favorite button font size
 *
 * @cssprop {<calc-product>} [--pf-c-table__favorite--c-button--MarginTop=calc(0.375rem * -1)]
 *          Favorite button top margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__favorite--c-button--MarginRight=calc(1rem * -1)]
 *          Favorite button right margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__favorite--c-button--MarginBottom=calc(0.375rem * -1)]
 *          Favorite button bottom margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__favorite--c-button--MarginLeft=calc(1rem * -1)]
 *          Favorite button left margin
 *
 * @cssprop {<color>} [--pf-c-table__favorite--m-favorited--c-button--Color=#f0ab00]
 *          Favorited button color
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-favorite__button__text--Color=#6a6e73]
 *          Favorite sort button text color
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-favorite__button--hover__text--Color=#151515]
 *          Favorite sort button hover text color
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-favorite__button--focus__text--Color=#151515]
 *          Favorite sort button focus text color
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-favorite__button--active__text--Color=#151515]
 *          Favorite sort button active text color
 *
 * @cssprop {<calc-product>} [--pf-c-table__draggable--c-button--MarginTop=calc(0.375rem * -1)]
 *          Draggable button top margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__draggable--c-button--MarginRight=calc(1rem * -1)]
 *          Draggable button right margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__draggable--c-button--MarginBottom=calc(0.375rem * -1)]
 *          Draggable button bottom margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__draggable--c-button--MarginLeft=calc(1rem * -1)]
 *          Draggable button left margin
 *
 * @cssprop {<dimension>} [--pf-c-table__tr--m-ghost-row--Opacity=.4]
 *          Ghost row opacity
 *
 * @cssprop {<color>} [--pf-c-table__tr--m-ghost-row--BackgroundColor=#fff]
 *          Ghost row background color
 *
 * @cssprop {<dimension>} [--pf-c-table__action--PaddingTop=0]
 *          Action top padding
 *
 * @cssprop {<dimension>} [--pf-c-table__action--PaddingRight=0]
 *          Action right padding
 *
 * @cssprop {<dimension>} [--pf-c-table__action--PaddingBottom=0]
 *          Action bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table__action--PaddingLeft=0]
 *          Action left padding
 *
 * @cssprop {<dimension>} [--pf-c-table__inline-edit-action--PaddingTop=0]
 *          Inline edit action top padding
 *
 * @cssprop {<dimension>} [--pf-c-table__inline-edit-action--PaddingRight=0]
 *          Inline edit action right padding
 *
 * @cssprop {<dimension>} [--pf-c-table__inline-edit-action--PaddingBottom=0]
 *          Inline edit action bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table__inline-edit-action--PaddingLeft=0]
 *          Inline edit action left padding
 *
 * @cssprop {<>} [--pf-c-table__expandable-row--Transition=all 250ms cubic-bezier(.42, 0, .58, 1)]
 *          Expandable row transition
 *
 * @cssprop {<length>} [--pf-c-table__expandable-row--MaxHeight=28.125rem]
 *          Expandable row max height
 *
 * @cssprop {<>} [--pf-c-table__expandable-row-content--Transition=all 250ms cubic-bezier(.42, 0, .58, 1)]
 *          Expandable row content transition
 *
 * @cssprop {<dimension>} [--pf-c-table__expandable-row-content--PaddingTop=1.5rem]
 *          Expandable row content top padding
 *
 * @cssprop {<dimension>} [--pf-c-table__expandable-row-content--PaddingBottom=1.5rem]
 *          Expandable row content bottom padding
 *
 * @cssprop {<calc-product>} [--pf-c-table__expandable-row--after--Top=calc(1px * -1)]
 *          Expandable row after top
 *
 * @cssprop {<calc-product>} [--pf-c-table__expandable-row--after--Bottom=calc(1px * -1)]
 *          Expandable row after bottom
 *
 * @cssprop {<length>} [--pf-c-table__expandable-row--after--border-width--base=3px]
 *          Expandable row after base border width
 *
 * @cssprop {<length>} [--pf-c-table__expandable-row--after--BorderLeftWidth=0]
 *          Expandable row after left border width
 *
 * @cssprop {<color>} [--pf-c-table__expandable-row--after--BorderColor=#06c]
 *          Expandable row after border color
 *
 * @cssprop {<dimension>} [--pf-c-table__icon-inline--MarginRight=0.5rem]
 *          Inline icon right margin
 *
 * @cssprop {<calc-sum>} [--pf-c-table__sort--MinWidth=calc(6ch + 1rem + 1rem + 1rem)]
 *          Sort button minimum width
 *
 * @cssprop {<dimension>} [--pf-c-table__sort__button--PaddingTop=0.375rem]
 *          Sort button top padding
 *
 * @cssprop {<dimension>} [--pf-c-table__sort__button--PaddingRight=0.5rem]
 *          Sort button right padding
 *
 * @cssprop {<dimension>} [--pf-c-table__sort__button--PaddingBottom=0.375rem]
 *          Sort button bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table__sort__button--PaddingLeft=0.5rem]
 *          Sort button left padding
 *
 * @cssprop {<calc-product>} [--pf-c-table__sort__button--MarginTop=calc(0.375rem * -1)]
 *          Sort button top margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__sort__button--MarginBottom=calc(0.375rem * -1)]
 *          Sort button bottom margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__sort__button--MarginLeft=calc(0.5rem * -1)]
 *          Sort button left margin
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--Color=#151515]
 *          Sort button color
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-selected__button--Color=#06c]
 *          Selected sort button color
 *
 * @cssprop {<length>} [--pf-c-table__sort--m-help--MinWidth=15ch]
 *          Help button minimum width
 *
 * @cssprop {<color>} [--pf-c-table__sort__button__text--Color=currentcolor]
 *          Sort button text color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--hover__text--Color=currencolor]
 *          Sort button hover text color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--focus__text--Color=currentcolor]
 *          Sort button focus text color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--active__text--Color=currentcolor]
 *          Sort button active text color
 *
 * @cssprop {<color>} [--pf-c-table__sort-indicator--Color=#d2d2d2]
 *          Sort inidcator color
 *
 * @cssprop {<calc-sum>} [--pf-c-table__sort-indicator--MarginLeft=calc(6ch + 1rem + 1rem + 1rem)]
 *          Sort inidcator left margin
 *
 * @cssprop {<color>} [--pf-c-table__sort--m-selected__sort-indicator--Color=#06c]
 *          Selected sort inidcator color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--hover__sort-indicator--Color=#151515]
 *          Sort button hover sort indicator color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--active__sort-indicator--Color=#151515]
 *          Sort button hover active sort indicator color
 *
 * @cssprop {<color>} [--pf-c-table__sort__button--focus__sort-indicator--Color=#151515]
 *          Sort button hover focus sort indicator color
 *
 * @cssprop {<length>} [--pf-c-table--th--m-help--MinWidth=11ch]
 *          Header cell help minimum width
 *
 * @cssprop {<dimension>} [--pf-c-table__column-help--MarginLeft=0.25rem]
 *          Help column left magin
 *
 * @cssprop {<dimension>} [--pf-c-table__column-help--TranslateY=0.125rem]
 *          Help column translate y axis
 *
 * @cssprop {<calc-product>} [--pf-c-table__column-help--c-button--MarginTop=calc(0.375rem * -1)]
 *          Help column button top margin
 *
 * @cssprop {<calc-product>} [--pf-c-table__column-help--c-button--MarginBottom=calc(0.375rem * -1)]
 *          Help column button bottom margin
 *
 * @cssprop {<dimension>} [--pf-c-table__column-help--c-button--PaddingRight=0.5rem]
 *          Help column button right padding
 *
 * @cssprop {<dimension>} [--pf-c-table__column-help--c-button--PaddingLeft=0.5rem]
 *          Help column button left margin
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--Color=#06c]
 *          Compound expansion toggle button color
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--hover--Color=#004080]
 *          Compound expansion hover toggle button color
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--focus--Color=#004080]
 *          Compound expansion focus toggle button color
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--active--Color=#004080]
 *          Compound expansion active toggle button color
 *
 * @cssprop {<length>} [--pf-c-table__compound-expansion-toggle__button--before--border-width--base=1px]
 *          Compound expansion toggle button before border width
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--before--BorderColor=#d2d2d2]
 *          Compound expansion toggle button before border color
 *
 * @cssprop {<length>} [--pf-c-table__compound-expansion-toggle__button--before--BorderRightWidth=0]
 *          Compound expansion toggle button before right border width
 *
 * @cssprop {<length>} [--pf-c-table__compound-expansion-toggle__button--before--BorderLeftWidth=0]
 *          Compound expansion toggle button before left border width
 *
 * @cssprop {<calc-product>} [--pf-c-table__compound-expansion-toggle__button--before--Bottom=calc(1px * -1)]
 *          Compound expansion toggle button before bottom
 *
 * @cssprop {<calc-product>} [--pf-c-table__compound-expansion-toggle__button--before--Left=calc(1px * -1)]
 *          Compound expansion toggle button before left
 *
 * @cssprop {<length>} [--pf-c-table__compound-expansion-toggle__button--after--border-width--base=3px]
 *          Compound expansion toggle button after base border width
 *
 * @cssprop {<color>} [--pf-c-table__compound-expansion-toggle__button--after--BorderColor=#06c]
 *          Compound expansion toggle button after border color
 *
 * @cssprop {<length>} [--pf-c-table__compound-expansion-toggle__button--after--BorderTopWidth=0]
 *          Compound expansion toggle button after top border width
 *
 * @cssprop {<calc-sum>} [--pf-c-table__compound-expansion-toggle__button--after--Top=calc(1px * -1)]
 *          Compound expansion toggle button after top
 *
 * @cssprop {<calc-sum>} [--pf-c-table__compound-expansion-toggle__button--after--Left=calc(1px * -1)]
 *          Compound expansion toggle button after left
 *
 * @cssprop {<calc-sum>} [--pf-c-table--m-compact-th--PaddingTop=calc(0.5rem + 0.25rem)]
 *          Compact header cell top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact-th--PaddingBottom=0.5rem]
 *          Compact header cell bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--PaddingTop=0.5rem]
 *          Compact cell top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--PaddingRight=0.5rem]
 *          Compact cell right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--PaddingBottom=0.5rem]
 *          Compact cell bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--PaddingLeft=0.5rem]
 *          Compact cell left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--first-last-child--PaddingLeft=1rem]
 *          Compact cell first child left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--first-last-child--PaddingRight=1rem]
 *          Compact XLcell first child right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--first-last-child--xl--PaddingLeft=1.5rem]
 *          Compact cell first child XL left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--cell--first-last-child--xl--PaddingRight=1.5rem]
 *          Compact cell first child XL right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact--FontSize=0.875rem]
 *          Compact font size
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__expandable-row-content--PaddingTop=1.5rem]
 *          Compact expandable row content top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__expandable-row-content--PaddingRight=1.5rem]
 *          Compact expandable row content right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__expandable-row-content--PaddingBottom=1.5rem]
 *          Compact expandable row content bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table--m-compact__expandable-row-content--PaddingLeft=1.5rem]
 *          Compact expandable row content left padding
 *
 * @cssprop {<dimension>} [--pf-c-table--nested--first-last-child--PaddingRight=1rem]
 *          Nested first child right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--nested--first-last-child--PaddingLeft=1rem]
 *          Nested first child left padding
 *
 * @cssprop {<color>} [--pf-c-table__expandable-row--m-expanded--BorderBottomColor=#d2d2d2]
 *          Expandable row expanded bottom border color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--BoxShadow--top=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Hoverable table row top box shadow
 *
 * @cssprop {<dimension>} [--pf-c-table--tr--m-hoverable--BackgroundColor=transparent]
 *          Hoverable table row background color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Hoverable table row box shadow
 *
 * @cssprop {<calc-sum>} [--pf-c-table--tr--m-hoverable--OutlineOffset=calc(-1 * 0.25rem)]
 *          Hoverable table row outline offset
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--hover--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table row hover box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--hover--BackgroundColor=#fff]
 *          Hoverable table row hover background color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--focus--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table row focus box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--focus--BackgroundColor=#fff]
 *          Hoverable table row focus background color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--active--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table row active box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--active--BackgroundColor=#fff]
 *          Hoverable table row active background color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-hoverable--m-selected--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16) inset, 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table row selected box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--BoxShadow--top=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Selected table row top box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--BackgroundColor=#fff]
 *          Selected table row background color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Selected table row box shadow
 *
 * @cssprop {<calc-sum>} [--pf-c-table--tr--m-selected--OutlineOffset=calc(-1 * 0.25rem)]
 *          Selected table row outline offset
 *
 * @cssprop {<length>} [--pf-c-table--tr--m-selected--after--BorderLeftWidth=3px]
 *          Selected table row after left border width
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--after--BorderLeftColor=#06c]
 *          Selected table row after left border color
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--m-selected--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table row box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--hover--m-selected--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16) inset, 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table row hover box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tr--m-selected--tr--m-selected--hover--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table row hover box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--BoxShadow--top=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Hoverable table body top box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Hoverable table body box shadow
 *
 * @cssprop {<dimension>} [--pf-c-table--tbody--m-hoverable--BackgroundColor=transparent]
 *          Hoverable table body background color
 *
 * @cssprop {<calc-sum>} [--pf-c-table--tbody--m-hoverable--OutlineOffset=calc(-1 * 0.25rem)]
 *          Hoverable table body outline offset
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--hover--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table body hover box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--hover--BackgroundColor=#fff]
 *          Hoverable table body hover background color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--focus--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table body focus box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--focus--BackgroundColor=#fff]
 *          Hoverable table body focus background color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--active--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table body active box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--active--BackgroundColor=#fff]
 *          Hoverable table body active background color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--m-expanded--BorderColor=#73bcf7]
 *          Hoverable table body expanded border color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-hoverable--m-selected--hover--tr--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16) inset, 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Hoverable table body selected table row box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--BackgroundColor=#fff]
 *          Selected table body background color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--BoxShadow--top=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Selected table body top box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)]
 *          Selected table body box shadow
 *
 * @cssprop {<calc-product>} [--pf-c-table--tbody--m-selected--OutlineOffset=calc(-1 * 0.25rem)]
 *          Selected table body outline offset
 *
 * @cssprop {<length>} [--pf-c-table--tbody--m-selected--after--BorderLeftWidth=3px]
 *          Selected table body after left border width
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--after--BorderLeftColor=#06c]
 *          Selected table body after left border color
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--m-selected--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table body selected box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--hover--tbody--m-selected--BoxShadow=0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16) inset, 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table body hover selected box shadow
 *
 * @cssprop {<color>} [--pf-c-table--tbody--m-selected--tbody--m-selected--hover--BoxShadow=0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08), 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16)]
 *          Selected table body hover box shadow
 *
 * @cssprop {<dimension>} [--pf-c-table--thead--m-nested-column-header--button--OutlineOffset=-0.1875rem]
 *          Table head nested column header button outline offset
 *
 * @cssprop {<dimension>} [--pf-c-table--thead--m-nested-column-header--tr--PaddingTop=0.25rem]
 *          Table head nested column header row top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--thead--m-nested-column-header--tr--PaddingBottom=0.25rem]
 *          Table head nested column header row bottom padding
 *
 * @cssprop {<color>} [--pf-c-table__subhead--Color=#6a6e73]
 *          Subhead color
 *
 * @cssprop {<color>} [--pf-c-table--m-striped__tr--BackgroundColor=#fafafa]
 *          Striped row background color
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingTop=1rem]
 *          Cell top padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingRight=1rem]
 *          Cell right padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingBottom=1rem]
 *          Cell bottom padding
 *
 * @cssprop {<dimension>} [--pf-c-table--cell--PaddingLeft=1rem]
 *          Cell left padding
 *
 * @cssprop {<calc-sum>} [--pf-c-table__favorite--c-button--MarginTop=calc(0.375rem * -1)]
 *          Favorite button top margin
 *
 * @cssprop {<calc-sum>} [--pf-c-table__favorite--c-button--MarginRight=calc(1rem * -1)]
 *          Favorite button right margin
 *
 * @cssprop {<calc-sum>} [--pf-c-table__favorite--c-button--MarginBottom=calc(0.375rem * -1)]
 *          Favorite button bottom margin
 *
 * @cssprop {<calc-sum>} [--pf-c-table__favorite--c-button--MarginLeft=calc(1rem * -1)]
 *          Favorite button left margin
 *
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  get rows(): NodeListOf<PfTr> {
    return this.querySelectorAll?.<PfTr>(rowQuery);
  }

  @state() private columns = 0;

  @provide({ context: thRoleContext }) private thRowContext = 'rowheader';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'table');
    this.#onSlotchange();
  }

  render(): TemplateResult<1> {
    const hasExpandableRow = !!this.querySelector?.('pf-tr[expandable]');
    const coeffRows = hasExpandableRow ? '1' : '0';
    return html`
      <slot @slotchange="${this.#onSlotchange}"
            @request-expand="${this.#onRequestExpand}"
            @request-sort="${this.#onRequestSort}"
            style="${styleMap({
              '--_pf-table--expandable-rows': coeffRows,
              '--_pf-table--number-of-columns': this.columns,
            })}"
      ></slot>
    `;
  }

  #onRequestExpand(event: Event) {
    if (event instanceof RequestExpandEvent
        && !event.defaultPrevented) {
      event.stopPropagation();
      if (event.target instanceof PfTr) {
        event.target.expanded = !!event.target.expandable && !event.target.expanded;
      } else if (event.target instanceof PfTd && event.row) {
        event.row.expanded = event.compoundExpanded;
        for (const cell of event.row.querySelectorAll('pf-td')) {
          cell.expanded = event.compoundExpanded === cell.compoundExpand;
        }
      }
    }
  }

  #onSlotchange() {
    this.columns = this.querySelector?.('pf-tr')?.querySelectorAll('pf-th')?.length ?? 0;
    this.requestUpdate();
  }

  #onRequestSort(event: Event) {
    if (event instanceof RequestSortEvent) {
      for (const col of this.querySelectorAll<PfTh>('pf-th[sortable]')) {
        col.selected = col === event.target;
        if (col !== event.target) {
          col.removeAttribute('sort-direction');
        }
      }
      if (!event.defaultPrevented && event.target instanceof PfTh) {
        event.target.sortDirection = event.direction;
        this.#performSort(event.target, event.direction);
      }
    }
  }

  #performSort(header: PfTh, direction: 'asc' | 'desc') {
    const children = header.parentElement?.children;
    if (children) {
      const columnIndexToSort = [...children].indexOf(header);
      Array
          .from(this.rows, node => PfTable.getNodeContentForSort(columnIndexToSort, node))
          .sort((a, b) => PfTable.sortByContent(direction, a, b))
          .forEach(({ node }, index) => {
            const target = this.rows[index];
            if (this.rows[index] !== node) {
              const position: InsertPosition =
                direction === 'desc' ? 'afterend' : 'beforebegin';
              target.insertAdjacentElement(position, node);
            }
          });
    }
  }

  private static getNodeContentForSort(
    columnIndexToSort: number,
    node: Element,
  ) {
    const content = node.querySelector(`
      :scope > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1}),
      :scope > pf-tr > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1})
    `.trim())?.textContent?.trim()?.toLowerCase() ?? '';
    return { node, content };
  }

  private static sortByContent(
    direction: 'asc' | 'desc',
    a: { content: string },
    b: { content: string },
  ) {
    if (direction === 'asc') {
      return (a.content < b.content ? -1 : a.content > b.content ? 1 : 0);
    } else {
      return (b.content < a.content ? -1 : b.content > a.content ? 1 : 0);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
