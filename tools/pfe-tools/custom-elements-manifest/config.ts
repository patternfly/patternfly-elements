import type { Config } from '@custom-elements-manifest/analyzer';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { jsdocDescriptionDefaultPlugin } from './jsdoc-description-default.js';
import { dedentDescriptionsPlugin } from './dedent-descriptions.js';
import { demosPlugin } from './demos.js';
import { deprecatedDescriptionInlineTagPlugin } from './deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './sanitize-events.js';
import { summaryPlugin } from './summary.js';
import { ecmaPrivateClassMembersPlugin } from './ecma-private-class-members.js';
import { versionStaticFieldPlugin } from './version-static-field.js';
import { getPfeConfig, type PfeConfig } from '../config.js';

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
