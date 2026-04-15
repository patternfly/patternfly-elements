import type { Middleware } from 'koa';
import type { Plugin } from '@web/dev-server-core';
import type { GeneratorOptions, Provider } from '@jspm/generator';

import { readFile, stat } from 'node:fs/promises';

import { join } from 'node:path';

import { Generator } from '@jspm/generator';

import { glob } from 'node:fs/promises';

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

async function getPotentialPackageDirs(cwd: string, workspaces: string[]) {
  const potentialPackageDirs: string[] = [];
  await Promise.all(
    (workspaces ?? []).map(async (pattern: string) => {
      for await (const dir of glob(pattern, { cwd })) {
        potentialPackageDirs.push(dir);
      }
    })
  );
  return potentialPackageDirs;
}

async function resolveMonorepoPackages() {
  const cwd = process.cwd();

  const { workspaces } = JSON.parse(await readFile(join(cwd, 'package.json'), 'utf-8'));

  const potentialPackageDirs = await getPotentialPackageDirs(cwd, workspaces);
  const packages = new Map();

  for (const dir of ['.', ...potentialPackageDirs]) {
    const pkgDir = join(cwd, dir);
    const pkgJsonPath = join(pkgDir, 'package.json');
    if (await exists(pkgJsonPath)) {
      const { name } = JSON.parse(await readFile(pkgJsonPath, 'utf-8'));
      packages.set(name, pkgDir);
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

/**
 * @param options plugin options
 */
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
        ignore: options?.ignore,
        typeScript: options?.typeScript,
      }), options));
    },
  };
}
