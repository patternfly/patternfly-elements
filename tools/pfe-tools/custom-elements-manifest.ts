import type { Config } from '@custom-elements-manifest/analyzer';
import type { PfeConfig } from './config.js';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { jsdocDescriptionDefaultPlugin } from './custom-elements-manifest/jsdoc-description-default.js';
import { dedentDescriptionsPlugin } from './custom-elements-manifest/dedent-descriptions.js';
import { demosPlugin } from './custom-elements-manifest/demos.js';
import { deprecatedDescriptionInlineTagPlugin } from './custom-elements-manifest/deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './custom-elements-manifest/sanitize-events.js';
import { summaryPlugin } from './custom-elements-manifest/summary.js';
import { ecmaPrivateClassMembersPlugin } from './custom-elements-manifest/ecma-private-class-members.js';
import { versionStaticFieldPlugin } from './custom-elements-manifest/version-static-field.js';
import { getPfeConfig } from './config.js';

import Chalk from 'chalk';

type Options = Config & Pick<PfeConfig, 'sourceControlURLPrefix'|'demoURLPrefix'>;

/**
 * PFE Default custom-elements-manifest analyzer config
 * @deprecated
 */
export function pfeCustomElementsManifestConfig(options?: Options): Config {
  console.log(`${Chalk.yellow(`pfeCustomElementsManifestConfig is ${Chalk.bold('deprecated')}`)}`);
  const config = getPfeConfig();
  const { demoURLPrefix, sourceControlURLPrefix, dev } = { ...config, ...options ?? {} };
  return {
    globs: options?.globs ?? ['src/**/*.ts'],
    dev,
    exclude: [
      '**/*.{spec,test}.{js,ts}',
      '**/*.d.ts',
      '**/_temp',
      ...options?.exclude ?? [],
    ],
    litelement: true,
    plugins: [
      readonlyPlugin(),
      jsdocDescriptionDefaultPlugin(),
      moduleFileExtensionsPlugin(),
      moduleFileExtensionsPlugin({ from: 'src/', to: '' }),
      sanitizeEventsPlugin(),
      deprecatedDescriptionInlineTagPlugin(),
      dedentDescriptionsPlugin(),
      summaryPlugin(),
      demosPlugin({ demoURLPrefix, sourceControlURLPrefix }),
      ecmaPrivateClassMembersPlugin(),
      versionStaticFieldPlugin(),

      ...options?.plugins ?? [],
    ],
  };
}
