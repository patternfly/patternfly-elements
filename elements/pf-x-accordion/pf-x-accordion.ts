/* eslint-disable @typescript-eslint/no-namespace */
import { Accordion } from '@patternfly/react-core';

import { define } from 'preactement';
define('pf-x-accordion', () => Accordion, {
  attributes: [],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-accordion': PfXAccordionAttributes;
    }
  }
}

type PfXAccordionAttributes = preact.JSX.HTMLAttributes<HTMLElement>
