import { ComposedEvent } from '@patternfly/pfe-core';
import { cascades } from '@patternfly/pfe-core/decorators/cascades.js';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import { BaseAccordion } from './BaseAccordion.js';
import { PfeAccordionHeader } from './pfe-accordion-header.js';
import { PfeAccordionPanel } from './pfe-accordion-panel.js';

import style from './pfe-accordion.scss';

function isPfeAccordionPanel(el?: EventTarget|null): el is PfeAccordionPanel {
  return el instanceof Element && el.tagName.toLowerCase() === 'pfe-accordion-panel';
}

export class AccordionExpandEvent extends ComposedEvent {
  constructor(
    public toggle: PfeAccordionHeader,
    public panel: PfeAccordionPanel,
  ) {
    super('expand');
  }
}

export class AccordionCollapseEvent extends ComposedEvent {
  constructor(
    public toggle: PfeAccordionHeader,
    public panel: PfeAccordionPanel,
  ) {
    super('collapse');
  }
}

/**
 * Accordions toggle the visibility of sections of content.
 * They feature panels that consist of a section text label and a caret icon that collapses or expands to reveal more information.
 *
 * @summary Toggle the visibility of sections of content
 *
 * @fires {AccordionExpandEvent} expand - when a panel expands
 * @fires {AccordionCollapseEvent} collapse - when a panel collapses
 *
 * @fires {CustomEvent<{ toggle: PfeAccordionHeader, panel: PfeAccordionPanel }>} pfe-accordion:expand - when a panel expands {@deprecated Use `expand`}
 * @fires {CustomEvent<{ toggle: PfeAccordionHeader, panel: PfeAccordionPanel }>} pfe-accordion:collapse - when a panel collapses {@deprecated Use `collapse`}
 *
 * @slot
 *       Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.
 *
 * @cssproperty {[ <length> | <percentage> ]{1,4}}--pfe-accordion--Padding
 *              Applied to header and panel components
 *              {@default `var(--pfe-theme--container-padding, 1rem) calc(var(--pfe-theme--container-padding, 1rem) * 1.5)`}
 * @cssproperty {<color>} --pfe-accordion--BorderColor
 *              Color of the encompassing borders
 *              {@default `var(--pfe-theme--color--surface--border, #d2d2d2)`}
 * @cssproperty {<length>} --pfe-accordion--BorderWidth
 *              Width of the encompassing borders
 *              {@default `var(--pfe-theme--surface--border-width, 1px)`}
 * @cssproperty {<length>} --pfe-accordion--accent--width
 *              Width of the accent mark
 *              {@default `var(--pfe-theme--surface--border-width--active, 3px)`}
 * @cssproperty {<length>} --pfe-accordion--Width
 *              Maximum width for the accordion element
 *              {@default `100%`}
 * @cssproperty {<length>} --pfe-accordion--MaxWidth--content
 *              Maximum width for the content inside the accordion panel
 *              {@default `80ch`}
 * @cssproperty --pfe-accordion--BoxShadow
 *              Box shadow on the header and panel in closed state
 *              {@default `0 5px 4px transparent`}
 * @cssproperty {<number>} --pfe-accordion--ZIndex
 *              Accordion's z-index for the stack
 *              {@default `3`}
 * @cssproperty --pfe-accordion--FontSize--header
 *              Font-size for the accordion header text
 *              {@default `var(--pf-global--FontSize--xl, 1.25rem)`}
 * @cssproperty --pfe-accordion--FontWeight--header
 *              Font-weight for the accordion header text
 *              {@default `var(--pfe-theme--font-weight--normal, 400)`}
 * @cssproperty --pfe-accordion--TextAlign
 *              Text alignment for the accordion header text
 *              {@default `left`}
 * @cssproperty --pfe-accordion--BackgroundColor
 *              Background color for the accordion header and panel
 *              {@default `transparent`}
 * @cssproperty {<color>} --pfe-accordion--Color
 *              Text color for the accordion header and panel
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent
 *              Left accent line color for the accordion header and panel
 *              {@default `transparent`}
 * @cssproperty --pfe-accordion--BackgroundColor--active
 *              Background color when the accordion is active (hover, focus)
 *              {@default `var(--pfe-theme--color--surface--lighter, #f0f0f0)`}
 * @cssproperty --pfe-accordion--Color--active
 *              Text color when the accordion is active (hover, focus)
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent--active
 *              Color of the accent mark when the accordion is active (hover, focus)
 *              {@default `var(--pfe-theme--color--ui-accent, #06c)`}
 * @cssproperty --pfe-accordion--BackgroundColor--expanded
 *              Background color when the accordion is open
 *              {@default `var(--pfe-theme--color--surface--lightest, #fff)`}
 * @cssproperty --pfe-accordion--Color--expanded
 *              Text color when the accordion is open
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent--expanded
 *              Color of the accent mark when the accordion is open
 *              {@default `var(--pfe-theme--color--ui-accent, #06c)`}
 * @cssproperty --pfe-accordion--BoxShadow--expanded
 *              Box shadow when the accordion is open
 *              {@default `0 5px 4px rgba(140, 140, 140, 0.35)`}
 */
@customElement('pfe-accordion')
export class PfeAccordion extends BaseAccordion {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseAccordion.styles, style];

  @cascades('pfe-accordion-header', 'pfe-accordion-panel')
  @property({ type: String, reflect: true })
    bordered?: 'true'|'false';

  @cascades('pfe-accordion-header', 'pfe-accordion-panel')
  @property({ type: String, reflect: true })
    large?: 'true'|'false';

  _panelForHeader(header: PfeAccordionHeader) {
    const next = header.nextElementSibling;

    if (!next) {
      return;
    }

    if (!isPfeAccordionPanel(next)) {
      // this.logger.error('Sibling element to a header needs to be a panel');
      return;
    }

    return next;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion': PfeAccordion;
  }
}
