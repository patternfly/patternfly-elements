/* eslint-disable @typescript-eslint/no-namespace */
import { AccordionItem } from '@patternfly/react-core';

import { define } from 'preactement';
define('pf-x-accordion-item', () => AccordionItem, {
  attributes: [],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-accordion-item': PfXAccordionItemAttributes;
    }
  }
}

type PfXAccordionItemAttributes = preact.JSX.HTMLAttributes<HTMLElement>
