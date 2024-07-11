import { pfeCustomElementsManifestConfig } from '@patternfly/pfe-tools/custom-elements-manifest/config.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// HACK: cem runs from `./elements` in a monorepo
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

export default pfeCustomElementsManifestConfig({
  rootDir,
  globs: [
    './*/pf-*.ts',
  ],
});
