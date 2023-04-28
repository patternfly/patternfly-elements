import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server/config.js';

export const litcssOptions = {
  include: (/** @type{string[]}*/(/** @type{unknown}*/([
    /elements\/pf-[\w-]+\/[\w-]+\.css$/,
    /lib\/.*\.css$/,
  ]))),
  exclude: /lightdom/,
};

export default pfeDevServerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  litcssOptions,
  tsconfig: 'tsconfig.esbuild.json',
  middleware: [
    /** redirect requests for lightdom css to /elements */
    function(ctx, next) {
      const match = ctx.path.match(/^\/components\/(?<slug>[-\w]+)\/(?<path>.*)\.css$/);
      if (match) {
        const { slug, path } = /** @type{{ slug: string; path: string }} */ (match.groups);
        ctx.redirect(`/elements/pf-${slug}/${path}.css`);
      }
      return next();
    },
  ]
});
