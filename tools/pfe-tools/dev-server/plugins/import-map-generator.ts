import type { Middleware } from 'koa';
import type { Plugin } from '@web/dev-server-core';
import type { GeneratorOptions, Provider } from '@jspm/generator';

import { readFile, stat } from 'node:fs/promises';

import { join } from 'node:path';

import { Generator } from '@jspm/generator';

import { glob } from 'glob';

export interface Options extends GeneratorOptions {
  resolveHtmlUrl?: (fileUrl: string, rootUrl: string) => string;
}

const exists = async (path: string) => {
  try {
    await stat(path); return true;
  } catch {
    return false;
  }
};

async function resolveMonorepoPackages() {
  const cwd = process.cwd();

  const { workspaces } = JSON.parse(await readFile(join(cwd, 'package.json'), 'utf-8'));

  const potentialPackageDirs =
    (await Promise.all((workspaces ?? []).map((x: string) =>
      glob(join(cwd, x))))).flat();

  const packages = new Map();

  for (const dir of [cwd, ...potentialPackageDirs]) {
    const pkgPath = join(dir, 'package.json');
    if (await exists(pkgPath)) {
      const { name } = JSON.parse(await readFile(pkgPath, 'utf-8'));
      packages.set(name, dir);
    }
  }

  return packages;
}

function getProvider(packages: Map<string, string>): Provider {
  return {
    async pkgToUrl({ name }) {
      const pkgPath = packages.get(name);
      if (!pkgPath) {
        throw new Error(`could not resolve ${name}`);
      }
      return `file://${pkgPath}/`;
    },
    // @ts-expect-error: types vs docs
    parseUrlPkg(url: string) {
      for (const [name, dir] of packages) {
        if (url.startsWith(dir)) {
          return {
            name,
            registry: 'monorepotypescript',
            version: '*',
          };
        }
      }
    },
    async resolveLatestTarget(target) {
      return { ...target, version: '*' };
    },
  };
}

function generatorMiddleware(generator: Generator, options?: Partial<Options>): Middleware {
  return async function injectMiddleware(ctx, next) {
    if (ctx.path.endsWith('.html') || ctx.path.endsWith('/')) {
      if (ctx.body?.length) {
        const rootUrl = `file://${process.cwd()}/`;
        const fileUrl = `${rootUrl.replace(/\/$/, '')}${ctx.url}`;
        const htmlUrl = options?.resolveHtmlUrl?.(fileUrl, rootUrl) ?? fileUrl;
        try {
          ctx.body = await generator.htmlInject(ctx.body, {
            htmlUrl,
            rootUrl,
            trace: true,
            whitespace: true,
            esModuleShims: true,
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    }
    return next();
  };
}

export function importMapGeneratorPlugin(options?: Partial<Options>): Plugin {
  return {
    name: 'import-map-inject',
    async serverStart(args) {
      const monorepotypescript = getProvider(await resolveMonorepoPackages());
      args.app.use(generatorMiddleware(new Generator({
        defaultProvider: 'nodemodules',
        env: ['development', 'production', 'browser', 'module'],
        providers: options?.providers,
        inputMap: options?.inputMap,
        customProviders: { monorepotypescript },
        resolutions: options?.resolutions,
      }), options));
    },
  };
}
