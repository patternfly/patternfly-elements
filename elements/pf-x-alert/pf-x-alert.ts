/* eslint-disable @typescript-eslint/no-namespace */
import { Alert } from '@patternfly/react-core/dist/esm/components/Alert/Alert';

import { define } from 'preactement';
define('pf-x-alert', () => Alert, {
  attributes: ['variant', 'title', 'is-expandable', 'is-plain'],
});

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'pf-x-alert': PfXAlertAttributes;
    }
  }
}

interface PfXAlertAttributes extends preact.JSX.HTMLAttributes<HTMLElement> {
  variant?: string;
}
