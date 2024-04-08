import js from '@eslint/js';

import TYPESCRIPT_CONFIG from './configs/typescript.js';
import TEST_CONFIG from './configs/tests.js';
import PFE_CONFIG from './configs/pfe.js';
import HTML_CONFIG from './configs/html.js';
import NODE_CONFIG from './configs/node.js';
import JSON_CONFIG from './configs/json.js';

import { compat } from './lib.js';

export default [
  js.configs.recommended,
  ...compat.extends('plugin:lit-a11y/recommended'),
  ...PFE_CONFIG,
  ...HTML_CONFIG,
  ...NODE_CONFIG,
  ...TYPESCRIPT_CONFIG,
  ...TEST_CONFIG,
  ...JSON_CONFIG,
];
