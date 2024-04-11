import tseslint from 'typescript-eslint';

export { States, makeCompat, assign } from './lib.js';

import TYPESCRIPT_CONFIG from '@patternfly/eslint-config-elements/configs/typescript.js';
import TEST_CONFIG from '@patternfly/eslint-config-elements/configs/tests.js';
import PFE_CONFIG from '@patternfly/eslint-config-elements/configs/pfe.js';
import NODE_CONFIG from '@patternfly/eslint-config-elements/configs/node.js';
import JSON_CONFIG from '@patternfly/eslint-config-elements/configs/json.js';
import HTML_CONFIG from '@patternfly/eslint-config-elements/configs/html.js';

export default tseslint.config(
  {
    name: '@patternfly/elements/ignores',
    ignores: [
      '**/*.(patch|txt|sh|tsbuildinfo)',
      '**/*.(yaml|yml|toml)',
      '**/*.(png|jpg|svg|css|ico|woff|woff2)',
      '**/*.js.map',
      '.wireit',
      'custom-elements.json',
      '**/custom-elements.json',
      'package-lock.json',
      '**/package-lock.json',
      'node_modules',
      '**/node_modules/**/*',
    ],
  },

  ...PFE_CONFIG,
  ...NODE_CONFIG,
  ...TEST_CONFIG,
  ...JSON_CONFIG,
  ...TYPESCRIPT_CONFIG,
  ...HTML_CONFIG,
);
