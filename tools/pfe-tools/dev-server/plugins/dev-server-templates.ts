import type { PfeDevServerInternalConfig } from './pfe-dev-server.js';
import type { DemoRecord } from '../../custom-elements-manifest/lib/Manifest.js';
import type { Context, Next } from 'koa';

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import nunjucks from 'nunjucks';

import { Manifest } from '../../custom-elements-manifest/lib/Manifest.js';

const env = nunjucks.configure(join(dirname(fileURLToPath(import.meta.url)), 'templates'));
env.addFilter('log', x => (console.log(x), x)); // eslint-disable-line no-console
// TODO: regexing html is stupid
const MOD_STYLE_RE = /(<script type="module">.*<\/script>)|(<style>.*<\/style>)/g;
env.addFilter('noModulesOrStyles', x => x.replaceAll(MOD_STYLE_RE, ''));
env.addFilter('noElement', (x, tagName) => x.replaceAll(new RegExp(`<${tagName}>.*</${tagName}>`, 'gm'), ''));
env.addFilter('getSourceControlUrl', function(
  manifest: Manifest,
  sourceControlURLPrefix: string,
  cwd: string,
) {
  if (!manifest || !sourceControlURLPrefix) {
    return '';
  } else {
    return `${sourceControlURLPrefix.replace('tree/main/', '')}${(
      `tree/main${
        manifest.path.replace(cwd, '')
            .replace('/custom-elements.json', '/')}`
    )}`;
  }
});

async function getElementsPkgJson(config: PfeDevServerInternalConfig) {
  let dir = config.elementsDir;
  let pkgPath;
  while (dir !== config.rootDir && !pkgPath) {
    [pkgPath] = await glob('package.json', { cwd: dir, absolute: true });
    if (!pkgPath) {
      dir = dirname(dir);
    }
  }
  try {
    if (pkgPath) {
      return JSON.parse(await readFile(pkgPath, 'utf8'));
    }
  } catch {
    return;
  }
}

/**
 * cludge to ensure the dev server starts up only after the manifests are generated
 * @param config Normalized dev server options
 */
async function waitForManifestFileThenReadIt(config: PfeDevServerInternalConfig) {
  let count = 0;
  let manifests = Manifest.getAll(config.rootDir);
  while (count < 1000 && manifests.length < 0) {
    await new Promise(r => setTimeout(r, 50));
    count++;
    manifests = Manifest.getAll(config.rootDir);
  }
  return manifests;
}

function getDemos(config: PfeDevServerInternalConfig, manifests: Manifest[]) {
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

async function getManifest(
  config: PfeDevServerInternalConfig,
  manifests: Manifest[],
  demo?: DemoRecord,
) {
  const elementsPkgJson = await getElementsPkgJson(config);
  const manifest =
    demo?.manifest ?? manifests.find(x => x.packageJson?.name === elementsPkgJson.name);
  return manifest;
}

/**
 * Render the demo page whenever there's a trailing slash
 * @param config Normalized dev server options
 */
export function pfeDevServerTemplateMiddleware(config: PfeDevServerInternalConfig) {
  return async function(ctx: Context, next: Next): Promise<void> {
    const { method, path } = ctx;
    if (config.loadDemo && !(method !== 'HEAD' && method !== 'GET' || path.includes('.'))) {
      const manifests = await waitForManifestFileThenReadIt(config);
      const url = new URL(ctx.request.url, `http://${ctx.request.headers.host}`);
      const demos = getDemos(config, manifests);
      const demo = demos.find(x => x.permalink === url.pathname);
      const templateContent = await getTemplateContent(demo);
      const manifest = await getManifest(config, manifests, demo);
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


