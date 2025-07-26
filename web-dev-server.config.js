import {
  pfeDevServerConfig,
  getPatternflyIconNodemodulesImports,
} from '@patternfly/pfe-tools/dev-server/config.js';
import { makeDemoEnv } from '@patternfly/pfe-tools/environment.js';

import { writeFile, mkdir } from 'node:fs/promises';

await mkdir(new URL('./_site/tools', import.meta.url), { recursive: true });
await writeFile(
  new URL('./_site/tools/environment.js', import.meta.url),
  await makeDemoEnv(process.cwd()),
  'utf-8',
);

export default pfeDevServerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  importMapOptions: {
    providers: {
      'zero-md': 'nodemodules',
      '@patternfly/icons': 'nodemodules',
      '@patternfly/elements': 'monorepotypescript',
      '@patternfly/pfe-tools': 'monorepotypescript',
      '@patternfly/pfe-core': 'monorepotypescript',
    },
    inputMap: {
      imports: {
        '@patternfly/icons/': './node_modules/@patternfly/icons/',
        '@patternfly/pfe-tools/environment.js': './_site/tools/environment.js',
      },
    },
  },
});
