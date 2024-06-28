import type { Context, Next } from 'koa';
import type { Plugin } from '@web/dev-server-core';
import type { PfeDevServerConfigOptions } from '../config.js';

import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';

import { fileURLToPath } from 'node:url';

import Router from '@koa/router';
import nunjucks, { type Environment } from 'nunjucks';

import { makeDemoEnv } from '../../environment.js';
import { Manifest } from '../../custom-elements-manifest/lib/Manifest.js';
import { deslugify, type PfeConfig } from '../../config.js';

type PfeDevServerInternalConfig = Required<PfeDevServerConfigOptions> & {
  site: Required<PfeConfig['site']>;
};

function isPFEManifest(x: Manifest) {
  return x.packageJson?.name === '@patternfly/elements';
}

async function isDir(path: string) {
  try {
    const s = await stat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
}

/** cludge to ensure the dev server starts up only after the manifests are generated */
async function getManifests(config: PfeDevServerInternalConfig) {
  let count = 0;
  let manifests = Manifest.getAll(config.rootDir);
  while (count < 1000 && manifests.find(isPFEManifest)?.manifest === null) {
    await new Promise(r => setTimeout(r, 50));
    count++;
    manifests = Manifest.getAll(config.rootDir);
  }
  return manifests;
}

/**
 * Renders the demo page for a given url
 */
async function renderURL(
  ctx: Context,
  env: Environment,
  config: PfeDevServerInternalConfig,
): Promise<string> {
  const url = new URL(ctx.request.url, `http://${ctx.request.headers.host}`);
  const manifests = await getManifests(config);
  const demos = manifests
      .flatMap(manifest =>
        manifest
            .getTagNames()
            .flatMap(tagName =>
              manifest.getDemoMetadata(tagName, config as PfeDevServerInternalConfig)));
  const demo = demos.find(x => x.permalink === url.pathname);
  const manifest = demo?.manifest;

  if (!manifest || !demo || !demo.filePath || !existsSync(demo.filePath)) {
    return env.render('index.html', { context: ctx, options: config, demos });
  } else {
    const templateContent = await readFile(demo.filePath, 'utf8');
    return env.render('index.html', {
      context: ctx,
      options: config,
      demo,
      demos,
      templateContent,
      manifest,
    });
  }
}

/** Render the demo page whenever there's a trailing slash */
function nunjucksMiddleware(config: PfeDevServerInternalConfig) {
  const env = nunjucks.configure(join(dirname(fileURLToPath(import.meta.url)), 'templates'));
  return async function(ctx: Context, next: Next) {
    const { method, path } = ctx;
    if (config.loadDemo && !(method !== 'HEAD' && method !== 'GET' || path.includes('.'))) {
      ctx.cwd = process.cwd();
      ctx.type = 'html';
      ctx.status = 200;
      ctx.body = await renderURL(ctx, env, config);
    }
    return next();
  };
}

function getRouter(options: PfeDevServerInternalConfig) {
  const { elementsDir, tagPrefix } = options;
  const { componentSubpath } = options.site;
  const router = new Router()

      // PFE TOOLING
      .get('/tools/pfe-tools/environment.js(.js)?', async ctx => {
        ctx.body = await makeDemoEnv(options.rootDir);
        ctx.type = 'application/javascript';
      })

      // Redirect `core/pfe-core/controllers/thingy.js` to `core/pfe-core/controllers/thingy.ts` for requests not previously handled
      .get(`/core/pfe-core/:splatPath*.js`, async ctx => {
        ctx.redirect(`/core/pfe-core/${ctx.params.splatPath}.ts`);
      })

      // COMPONENTS DIR => ELEMENTS DIR REDIRECTS
      // Redirect `components/jazz-hands/demo/**/*.js|css` to `components/pf-jazz-hands/demo/**/*.js|css`
      .get(`/${componentSubpath}/:element/demo/:splat*/:fileName.:ext`, async (ctx, next) => {
        const { element, splat, fileName, ext } = ctx.params;
        const prefixedElement = deslugify(element);
        if (!element.includes(tagPrefix)) {
          if (splat) {
            ctx.redirect(`/${elementsDir}/${prefixedElement}/demo/${splat}/${fileName}.${ext}`);
          } else {
            ctx.redirect(`/${elementsDir}/${prefixedElement}/demo/${fileName}.${ext}`);
          }
        } else {
          return next();
        }
      })

      // Redirect `components/jazz-hands/*` to `components/pf-jazz-hands/*` for requests not previously handled
      .get(`/${componentSubpath}/:element/:splatPath*`, async (ctx, next) => {
        const { element, splatPath } = ctx.params;
        const prefixedElement = deslugify(element);
        // if we are passing a folder ie (/elements/pf-jazz-hands/demo/) redirect to the elements dir with splat.
        if (await isDir(new URL(`/${elementsDir}/${prefixedElement}`, import.meta.url).href)) {
          ctx.redirect(`/${elementsDir}/${prefixedElement}/${splatPath}`);
        }
        // If the splat exits and is a lightdom.css | lightdom-shim.css file redirect to the splat path
        if (splatPath && splatPath.includes('lightdom')) {
          ctx.redirect(`/${elementsDir}/${prefixedElement}/${splatPath}`);
        } else {
          return next();
        }
      })

      // TODO: Discovery to see if this redirect is still needed.
      // Redirect `components/jazz-hands/*.js` to `elements/pf-jazz-hands/*.ts`
      .get(`/${componentSubpath}/:element/:splatPath*.js`, async ctx => {
        const { element, splatPath } = ctx.params;
        const prefixedElement = deslugify(element);
        ctx.redirect(`/${elementsDir}/${prefixedElement}/${splatPath}.ts`);
      })

      // SET ETAG
      .get(`/${elementsDir}/:element/:splatPath*.(css|js)`, async function(ctx, next) {
        ctx.response.etag = performance.now().toString();
        return next();
      });

  return router.routes();
}

/**
 * Generate HTML for each component by rendering a nunjucks template
 * Watch repository source files and reload the page when they change
 */
export function pfeDevServerPlugin(config: PfeDevServerInternalConfig): Plugin {
  return {
    name: 'pfe-dev-server',
    async serverStart({ app }) {
      app.use(nunjucksMiddleware(config));
      app.use(getRouter(config));
    },
  };
}
