const fs = require('fs');
const path = require('path');

/**
 * Generate a map of files per package which should be copied to the site dir
 * @param {object} [options]
 * @param {string} [options.prefix='pf-v5'] element prefix e.g. 'pf-v5' for 'pf-v5-button'
 */
function getFilesToCopy(options) {
  const cwd = process.cwd();
  const prefix = `${(options?.prefix ?? 'pf').replace(/-$/, '')}-`;

  const hasCore = fs.existsSync(path.join(cwd, 'core'));

  if (!hasCore) {
    return null;
  }

  const files = {
    [path.join(cwd, 'node_modules/element-internals-polyfill')]: 'element-internals-polyfill',
  };

  const corePkgs = fs.readdirSync(path.join(cwd, 'core'));

  Object.assign(files, Object.fromEntries(corePkgs.map(dir => [
    `core/${dir}`,
    `core/${dir.replace(prefix, '')}`,
  ])));

  return files;
}

const DEMO_PATHS_RE =
  // eslint-disable-next-line @stylistic/max-len
  /(?<attr>href|src)="\/(?<workspace>elements|core)\/pf-v5-(?<unprefixed>.*)\/(?<filename>.*)\.(?<extension>[.\w]+)"/g;

/**
 * Replace paths in demo files from the dev SPA's format to 11ty's format
 * @param {string} content demo file
 */
function demoPaths(content) {
  if (this.outputPath.match(/(components|core|tools)\/.*\/demo\/index\.html$/)) {
    return content.replace(DEMO_PATHS_RE, (...args) => {
      const [{ attr, workspace, unprefixed, filename, extension }] = args.reverse();
      return `${attr}="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.${extension}"`;
    });
  } else {
    return content;
  }
}

module.exports = {
  configFunction(eleventyConfig, options) {
    eleventyConfig.addPassthroughCopy('docs/images/favicon.ico');
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');
    eleventyConfig.addPassthroughCopy({
      'node_modules/@rhds/elements': '/assets/@rhds',
    });
    eleventyConfig.addPassthroughCopy({
      'node_modules/@patternfly/icons/': '/assets/@patternfly/icons/',
    });
    eleventyConfig.addPassthroughCopy({
      'elements': '/assets/@patternfly/elements',
    });
    eleventyConfig.addPassthroughCopy({
      './core/pfe-core': '/assets/@patternfly/pfe-core',
    });
    eleventyConfig.addPassthroughCopy({
      'tools/pfe-tools': '/assets/@patternfly/pfe-tools',
    });
    eleventyConfig.addPassthroughCopy('brand/**/*');

    // Copy static assets (screenshots, demo images/css/js) from element folders
    // to the site with the tag prefix stripped from the directory name.
    // Markdown and HTML are handled by 11ty templates; this covers everything else.
    const prefix = `${(options?.prefix ?? 'pf').replace(/-$/, '')}-`;
    for (const dir of fs.readdirSync(path.join(process.cwd(), 'elements'))) {
      const slug = dir.replace(prefix, '');
      const screenshot = path.join('elements', dir, 'docs', 'screenshot.png');
      if (fs.existsSync(screenshot)) {
        eleventyConfig.addPassthroughCopy({
          [screenshot]: `/components/${slug}/docs/screenshot.png`,
        });
      }
      const demoDir = path.join(process.cwd(), 'elements', dir, 'demo');
      if (fs.existsSync(demoDir)) {
        const assets =
          fs.readdirSync(demoDir, { recursive: true })
              .filter(f => !String(f).endsWith('.html'));
        for (const asset of assets) {
          const src = path.join('elements', dir, 'demo', String(asset));
          eleventyConfig.addPassthroughCopy({
            [src]: `/components/${slug}/demo/${asset}`,
          });
        }
      }
    }

    const filesToCopy = getFilesToCopy(options);

    if (filesToCopy) {
      eleventyConfig.addPassthroughCopy(filesToCopy);
    }

    // The demo files are written primarily for the dev SPA (`npm start`),
    // so here we transform the paths found in those files to match the docs site's file structure
    eleventyConfig.addTransform('demo-paths', demoPaths);
  },
};
