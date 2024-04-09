import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param url
 * @example making a compat helper
 *          ```javascript
 *          // eslint.config.js
 *          const compat = makeCompat(import.meta.url);
 *          export default [
 *            compat.extends('some-legacy-config'),
 *          ];
 *          ```
 */
export function makeCompat(url) {
  // mimic CommonJS variables -- not needed if using CommonJS
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return new FlatCompat({
    baseDirectory: __dirname,
  });
}

/**
 * Shallow object assign
 * @param obj
 * @example combining objects
 *          ```javascript
 *          const files = ['*.ts'];
 *          const fresh = filelessConfigs.map(assign({ files }));
 *          ```
 */
export const assign = obj => target => ({
  ...target,
  ...obj,
});

export const States = {
  OFF: 'off',
  WARNING: 'warn',
  ERROR: 'error',
  ALWAYS: 'always',
  NEVER: 'never',
  IGNORE: 'ignore',
};

