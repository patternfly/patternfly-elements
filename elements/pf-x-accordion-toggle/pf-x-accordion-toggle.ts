/* eslint-disable @typescript-eslint/no-namespace */
import { AccordionToggle } from '@patternfly/react-core';

import { define } from 'preactement';
define('pf-x-accordion-toggle', () => AccordionToggle, {
  attributes: ['is-expanded', 'component', 'id'],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-accordion-toggle': PfXAccordionToggleAttributes;
    }
  }
}

interface PfXAccordionToggleAttributes extends preact.JSX.HTMLAttributes<HTMLElement> {
  'is-expanded'?: boolean;
  component?: string;
  id?: string;
}
