/* eslint-disable @typescript-eslint/no-namespace */
import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';

import { define } from 'preactement';
define('pf-x-button', () => Button, {
  attributes: ['variant', 'is-disabled', 'is-loading', 'is-danger'],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-button': PfXButtonAttributes;
    }
  }
}

interface PfXButtonAttributes extends preact.JSX.HTMLAttributes<HTMLElement> {
  variant?: string;
}
