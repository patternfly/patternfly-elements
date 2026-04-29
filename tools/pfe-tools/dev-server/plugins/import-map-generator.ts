import type { Middleware } from 'koa';
import type { Plugin } from '@web/dev-server-core';

import { resolve } from '@pwrs/mappa';

export interface Options {
  resolveHtmlUrl?: (fileUrl: string, rootUrl: string) => string;
  providers?: Record<string, string>;
  inputMap?: { imports?: Record<string, string>; scopes?: Record<string, Record<string, string>> };
  resolutions?: Record<string, string>;
  ignore?: string[];
  typeScript?: boolean;
}

interface ImportMap {
  imports?: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

function importMapMiddleware(importMap: ImportMap): Middleware {
  return async function injectMiddleware(ctx, next) {
    await next();
    if ((ctx.path.endsWith('.html') || ctx.path.endsWith('/')) && ctx.body?.length) {
      const script = `<script type="importmap">\n${JSON.stringify(importMap, null, 2)}\n</script>`;
      ctx.body = (ctx.body as string).replace('</head>', `${script}\n</head>`);
    }
  };
}

export function importMapGeneratorPlugin(options?: Partial<Options>): Plugin {
  return {
    name: 'import-map-inject',
    async serverStart(args) {
      const importMap = await resolve('.', {
        conditions: ['development', 'production', 'browser', 'import', 'default'],
        inputMap: options?.inputMap,
      });
      args.app.use(importMapMiddleware(importMap));
    },
  };
}
