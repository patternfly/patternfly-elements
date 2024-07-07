import type { PfeDevServerInternalConfig } from './pfe-dev-server.js';

import Router, { type Middleware } from '@koa/router';

import { makeDemoEnv } from '../../environment.js';
import { deslugify } from '../../config.js';

type PfeMiddleware = (config: PfeDevServerInternalConfig) => Middleware;

/**
 * The environment file contains information from the serverside
 * which is useful on the client side, for example the list of all elements
 * or a list of all icons. Typically, the information in the environment file
 * is data which requires access to the filesystem.
 * @see environment.js
 * @param config normalized PFE dev server config
 */
const environmentMiddleware: PfeMiddleware = config => async ctx => {
  ctx.body = await makeDemoEnv(config.rootDir);
  ctx.type = 'application/javascript';
};

/**
 * Redirects pfe-core files to their typescript sources, in the case where
 * the request is relative to the `@patternfly/elements` monorepo root
 * FROM `core/pfe-core/controllers/thingy.js`
 *  TO: `core/pfe-core/controllers/thingy.ts`
 */
const coreMiddleware: PfeMiddleware = () => ctx =>
  ctx.redirect(`/core/pfe-core/${ctx.params.splatPath}.ts`);

/**
 * Invalidate the browser cache for element css / js / html subresources on every request
 * in order that the user always receive the file on disk
 */
const cacheBustingMiddleware: PfeMiddleware = () => async function(ctx, next) {
  ctx.response.etag = performance.now().toString();
  return next();
};

/**
 * Loads the typescript sources for element declaration source requests
 * This is useful when the typescript build runs in parallel.
 * FROM: `components/jazz-hands/*.js`
 *   TO: `elements/pf-jazz-hands/*.ts`
 * @param config normalized PFE dev server config
 */
const elementDeclarationTypeScriptMiddleware: PfeMiddleware = config => async ctx => {
  const { unprefixedElementSlug, moduleName } = ctx.params;
  const tagName = deslugify(unprefixedElementSlug);
  return ctx.redirect(`/${config.elementsDir}/${tagName}/${moduleName}.ts`);
};

/**
 * Redirects to lightdom shim files, in the element definition dir
 * FROM: `components/jazz-hands/pf-jazz-hands-lightdom.css`
 *   TO: `elements/pf-jazz-hands/pf-jazz-hands-lightdom.css`
 * @param config normalized PFE dev server config
 */
const lightdomShimMiddleware: PfeMiddleware = config => (ctx, next) => {
  const { unprefixedElementSlug, sheetName, suffix } = ctx.params;
  const tagName = deslugify(unprefixedElementSlug);
  const redirect = `/${config.elementsDir}/${tagName}/${sheetName}-lightdom${suffix ?? ''}.css`;
  if (ctx.path !== redirect) {
    return ctx.redirect(redirect);
  } else {
    return next();
  }
};

/**
 * Redirects to subresources in /demo/ from pretty urls
 * FROM: `components/jazz-hands/demo/**\/*`
 *   TO: `elements/pf-jazz-hands/demo/*.*`
 * @param config normalized PFE dev server config
 */
const demoSubresourceMiddleware: PfeMiddleware = config => (ctx, next) => {
  const { unprefixedElementSlug, fileName, ext } = ctx.params;
  const tagName = deslugify(unprefixedElementSlug);
  const redirect = `/${config.elementsDir}/${tagName}/demo/${fileName}.${ext}`;
  if (ctx.path !== redirect) {
    return ctx.redirect(redirect);
  } else {
    return next();
  }
};

/**
 * Creates a router Koa middleware for PFE dev server
 * @param config Normalized dev server options
 */
export function pfeDevServerRouterMiddleware(
  config: PfeDevServerInternalConfig,
): Router.Middleware {
  const { elementsDir, site: { componentSubpath } } = config;
  const router = new Router();
  return router
      .get('/tools/pfe-tools/environment.js(.js)?',
           environmentMiddleware(config))
      .get(`/core/pfe-core/:splatPath*.js`,
           coreMiddleware(config))
      .get(`/${elementsDir}/:tagName/:splat.(css|html|js)`,
           cacheBustingMiddleware(config))
      .get(`/${componentSubpath}/:unprefixedElementSlug/:moduleName*.js`,
           elementDeclarationTypeScriptMiddleware(config))
      .get(`/${componentSubpath}/:unprefixedElementSlug/{demo/}?:sheetName-lightdom{:suffix}?.css`,
           lightdomShimMiddleware(config))
      .get(`/${componentSubpath}/:unprefixedElementSlug/demo/{:demoName/}?:fileName.:ext`,
           demoSubresourceMiddleware(config))
      .routes();
}
