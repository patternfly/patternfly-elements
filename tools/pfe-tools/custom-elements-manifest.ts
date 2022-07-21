import type { Config } from '@custom-elements-manifest/analyzer';

import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { cssCustomPropertiesDefaultPlugin } from './custom-elements-manifest/cssCustomPropertiesDefaultPlugin.js';
import { dedentDescriptionsPlugin } from './custom-elements-manifest/dedent-descriptions.js';
import { demosPlugin } from './custom-elements-manifest/demos.js';
import { deprecatedDescriptionInlineTagPlugin } from './custom-elements-manifest/deprecated-description-inline-tag.js';
import { sanitizeEventsPlugin } from './custom-elements-manifest/sanitize-events.js';
import { summaryPlugin } from './custom-elements-manifest/summary.js';

interface Options extends Config {
  sourceControlURLPrefix?: string;
  demoURLPrefix?: string;
}

/**
 * PFE Default custom-elements-manifest analyzer config
 */
export function pfeCustomElementsManifestConfig(options?: Options): Config {
  const { demoURLPrefix, sourceControlURLPrefix, dev } = options ?? {};
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
      cssCustomPropertiesDefaultPlugin(),
      moduleFileExtensionsPlugin(),
      moduleFileExtensionsPlugin({ from: 'src/', to: '' }),
      sanitizeEventsPlugin(),
      deprecatedDescriptionInlineTagPlugin(),
      dedentDescriptionsPlugin(),
      summaryPlugin(),
      demosPlugin({ demoURLPrefix, sourceControlURLPrefix }),

      ...options?.plugins ?? [],
    ],
  };
}
