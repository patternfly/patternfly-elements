import type { Config } from '@custom-elements-manifest/analyzer';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { dedentDescriptionsPlugin } from './dedent-descriptions.js';
import { demosPlugin } from './demos.js';
import { deprecatedDescriptionInlineTagPlugin } from './deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './sanitize-events.js';
import { summaryPlugin } from './summary.js';
import { ecmaPrivateClassMembersPlugin } from './ecma-private-class-members.js';
import { versionStaticFieldPlugin } from './version-static-field.js';
import { getPfeConfig, type PfeConfig } from '../config.js';

import Chalk from 'chalk';

type Options = Config
  & Pick<PfeConfig, 'sourceControlURLPrefix' | 'demoURLPrefix'>
  & { rootDir?: string };

/**
 * PFE Default custom-elements-manifest analyzer config
 * @param options plugin options
 * @deprecated this config relies on an old version of cem-a, roll your own
 */
export function pfeCustomElementsManifestConfig(options?: Options): Config {
  // eslint-disable-next-line no-console
  console.log(`${Chalk.yellow(`pfeCustomElementsManifestConfig is ${Chalk.bold('deprecated')}`)}`);
  const config = getPfeConfig(options?.rootDir);
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
      moduleFileExtensionsPlugin(),
      moduleFileExtensionsPlugin({ from: 'src/', to: '' }),
      sanitizeEventsPlugin(),
      deprecatedDescriptionInlineTagPlugin(),
      dedentDescriptionsPlugin(),
      summaryPlugin(),
      demosPlugin({ ...options, demoURLPrefix, sourceControlURLPrefix }),
      ecmaPrivateClassMembersPlugin(),
      versionStaticFieldPlugin(),

      ...options?.plugins ?? [],
    ],
  };
}
