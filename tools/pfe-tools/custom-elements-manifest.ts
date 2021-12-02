import type { Config } from '@custom-elements-manifest/analyzer';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { cssCustomPropertiesDefaultPlugin } from './custom-elements-manifest/cssCustomPropertiesDefaultPlugin.js';
import { dedentDescriptionsPlugin } from './custom-elements-manifest/dedent-descriptions.js';
import { deprecatedDescriptionInlineTagPlugin } from './custom-elements-manifest/deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './custom-elements-manifest/sanitize-events.js';

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
      cssCustomPropertiesDefaultPlugin(),
      moduleFileExtensionsPlugin(),
      moduleFileExtensionsPlugin({ from: 'src/', to: '' }),
      sanitizeEventsPlugin(),
      deprecatedDescriptionInlineTagPlugin(),
      dedentDescriptionsPlugin(),

      ...options?.plugins ?? [],
    ],
  };
}
