import { pfeCustomElementsManifestConfig } from '@patternfly/pfe-tools/custom-elements-manifest.js';

export default pfeCustomElementsManifestConfig({
  globs: ['<%= tagPrefix %>-*.ts', 'Base*.ts'],
});
