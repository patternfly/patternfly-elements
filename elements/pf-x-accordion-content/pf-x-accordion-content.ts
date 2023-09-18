/* eslint-disable @typescript-eslint/no-namespace */
import { AccordionContent } from '@patternfly/react-core';

import { define } from 'preactement';
define('pf-x-accordion-content', () => AccordionContent, {
  attributes: ['is-hidden', 'component', 'id'],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-accordion-content': PfXAccordionContentAttributes;
    }
  }
}

interface PfXAccordionContentAttributes extends preact.JSX.HTMLAttributes<HTMLElement> {
  'is-hidden'?: boolean;
  component?: string;
}
