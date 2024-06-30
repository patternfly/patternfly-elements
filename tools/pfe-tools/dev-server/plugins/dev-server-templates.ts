import type { PfeDevServerInternalConfig } from './pfe-dev-server.js';
import type { DemoRecord } from '../../custom-elements-manifest/lib/Manifest.js';
import type { Context, Next } from 'koa';

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import nunjucks from 'nunjucks';

import { Manifest } from '../../custom-elements-manifest/lib/Manifest.js';

function isPFEManifest(x: Manifest) {
  return x.packageJson?.name === '@patternfly/elements';
}

/**
 * cludge to ensure the dev server starts up only after the manifests are generated
 * @param config Normalized dev server options
 */
async function waitForManifestFileThenReadIt(config: PfeDevServerInternalConfig) {
  let count = 0;
  let manifests = Manifest.getAll(config.rootDir);
  while (count < 1000 && manifests.find(isPFEManifest)?.manifest === null) {
    await new Promise(r => setTimeout(r, 50));
    count++;
    manifests = Manifest.getAll(config.rootDir);
  }
  return manifests;
}

async function getDemos(config: PfeDevServerInternalConfig) {
  const manifests = await waitForManifestFileThenReadIt(config);
  return manifests
      .flatMap(manifest =>
        manifest
            .getTagNames()
            .flatMap(tagName =>
              manifest.getDemoMetadata(tagName, config as PfeDevServerInternalConfig)));
}

async function getTemplateContent(demo?: DemoRecord) {
  if (typeof demo?.filePath === 'string') {
    return readFile(demo.filePath, 'utf8');
  } else {
    return undefined;
  }
}

/**
 * Render the demo page whenever there's a trailing slash
 * @param config Normalized dev server options
 */
export function pfeDevServerTemplateMiddleware(config: PfeDevServerInternalConfig) {
  const env = nunjucks.configure(join(dirname(fileURLToPath(import.meta.url)), 'templates'));
  return async function(ctx: Context, next: Next) {
    const { method, path } = ctx;
    if (config.loadDemo && !(method !== 'HEAD' && method !== 'GET' || path.includes('.'))) {
      const url = new URL(ctx.request.url, `http://${ctx.request.headers.host}`);
      const demos = await getDemos(config);
      const demo = demos.find(x => x.permalink === url.pathname);
      const manifest = demo?.manifest;
      const templateContent = await getTemplateContent(demo);
      ctx.cwd = process.cwd();
      ctx.type = 'html';
      ctx.status = 200;
      ctx.body = env.render('index.html', {
        context: ctx,
        options: config,
        demo,
        demos,
        manifest,
        templateContent,
      });
    }
    return next();
  };
}


