import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

(async function() {
  const IN_DIR = fileURLToPath(new URL('../node_modules/@patternfly/icons/', import.meta.url));
  const OUT_DIR = fileURLToPath(new URL('../elements/pf-icon/icons/', import.meta.url));
  await cp(IN_DIR, OUT_DIR, { recursive: true });
})();
