import type { Config } from '@custom-elements-manifest/analyzer';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { jsdocDescriptionDefaultPlugin } from './custom-elements-manifest/jsdoc-description-default.js';
import { dedentDescriptionsPlugin } from './custom-elements-manifest/dedent-descriptions.js';
import { deprecatedDescriptionInlineTagPlugin } from './custom-elements-manifest/deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './custom-elements-manifest/sanitize-events.js';
import { summaryPlugin } from './custom-elements-manifest/summary.js';
import { ecmaPrivateClassMembersPlugin } from './custom-elements-manifest/ecma-private-class-members.js';
import { versionStaticFieldPlugin } from './custom-elements-manifest/version-static-field.js';

/**
 * PFE Default custom-elements-manifest analyzer config
 */
export function pfeCustomElementsManifestConfig(options?: Config): Config {
  return {
    globs: options?.globs ?? ['src/**/*.ts'],
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
      ecmaPrivateClassMembersPlugin(),
      versionStaticFieldPlugin(),

      ...options?.plugins ?? [],
    ],
  };
}
