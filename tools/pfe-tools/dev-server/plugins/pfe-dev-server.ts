import type { Plugin } from '@web/dev-server-core';
import type { PfeDevServerConfigOptions } from '../config.js';
import type { SiteOptions } from '../../config.js';

import { pfeDevServerRouterMiddleware } from './dev-server-router.js';
import { pfeDevServerTemplateMiddleware } from './dev-server-templates.js';

type PfeDevServerInternalConfig = Required<PfeDevServerConfigOptions> & {
  site: Required<SiteOptions>;
};

/**
 * PFE dev server plugin generates a component dev server for patternfly tools projects
 * @see config.ts for information on the .pfe.config.js file
 * - Generates HTML for each component by rendering a nunjucks template
 * - redirect demo html files to pretty URLs
 * - Watch repository source files and reload the page when they change
 * @param config Normalized PFE dev server config
 */
export function pfeDevServerPlugin(config: PfeDevServerInternalConfig): Plugin {
  return {
    name: 'pfe-dev-server',
    async serverStart({ app }) {
      app.use(pfeDevServerTemplateMiddleware(config));
      app.use(pfeDevServerRouterMiddleware(config));
    },
  };
}
