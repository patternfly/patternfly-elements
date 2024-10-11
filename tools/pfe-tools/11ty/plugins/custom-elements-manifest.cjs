// @ts-check
const { join } = require('node:path');
const { existsSync } = require('node:fs');
const { glob } = require('glob');
const { stat, rm } = require('node:fs/promises');

const isDir = dir => stat(dir).then(x => x.isDirectory, () => false);

// TODO: programmable package scopes, etc
/**
 * @param {*} eleventyConfig
 * @param {import('./types').PluginOptions} pluginOpts
 */
module.exports = function configFunction(eleventyConfig, pluginOpts = {}) {
  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('demos', async function demos() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');
    const { getPfeConfig } = await import('../../config.js');
    const options = { ...getPfeConfig(), ...pluginOpts };
    const extraDemos = options?.extraDemos ?? [];

    // 1. get all packages
    // 2. get manifests per package
    // 3. get tagNames per manifest
    // 4. get demos per tagName
    // 5. generate demo record with tagName, slug, title, and filepath per demo
    return Manifest.getAll(options.rootDir)
        .flatMap(manifest => manifest.getTagNames()
            .flatMap(tagName => [...manifest.getDemoMetadata(tagName, options), ...extraDemos]));
  });

  eleventyConfig.addGlobalData('elements', async function elements() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');
    const { DocsPage } = await import('../DocsPage.js');
    const { getPfeConfig } = await import('../../config.js');
    const options = { ...getPfeConfig(), ...pluginOpts };
    const rootDir = options?.rootDir ?? process.cwd();

    // 1. get all packages
    // 2. get manifests from packages, construct manifest objects, associate packages
    // 3. get all tag names from each manifest. construct docs page for tag names w/ associates manifest and package
    return Manifest.getAll(rootDir)
        .flatMap(manifest =>
          Array.from(manifest.declarations.values(), decl => {
            const { tagName } = decl;
            const elementsDir = options.elementsDir ?? 'elements';
            const docsTemplatePath = join(process.cwd(), elementsDir, `${tagName}`, 'docs', `${tagName}.md`);
            return new DocsPage(manifest, {
              ...options,
              tagName,
              // only include the template if it exists
              ...Object.fromEntries(Object.entries({ docsTemplatePath }).filter(([, path]) =>
                existsSync(path))),
            });
          }));
  });

  // Netlify tends to turn html files into directories with index.html,
  // but 11ty already did that, so let's delete the html file.
  eleventyConfig.on('eleventy.after', async function({ runMode, dir }) {
    const { getPfeConfig } = await import('../../config.js');
    const options = { ...getPfeConfig(), ...pluginOpts };
    if (runMode === 'build') {
      const files = await glob(`${dir.output}/${options.site.componentSubpath}/*/demo/*`);
      const htmls = files.filter(x => x.endsWith('.html') && !x.endsWith('/index.html'));
      for (const file of htmls) {
        const dir = file.replace(/\.html$/, '');
        if (await isDir(dir)) {
          await rm(file);
        }
      }
    }
  });

  // 11ty turn elements/pf-jazz-hands/demo/special-name.html into
  //            components/jazz-hands/demo/special-name/index.html
  // Here, we rewrite the subresource links so they point to the right files.
  eleventyConfig.addTransform('reroute-special-demo-subresources', function(content) {
    if (this.inputPath.endsWith('/demos.html')) {
      const [, one, , three, four] = this.outputPath.split('/');
      if (one === 'components' && three === 'demo' && four !== 'index.html') {
        const cheerio = require('cheerio');
        const $ = cheerio.load(content);
        $('body link').each(function() {
          const href = $(this).attr('href');
          if (href && !href.startsWith('http')) {
            $(this).attr('href', join('..', href));
          }
        });
        $('body script, body img').each(function() {
          const src = $(this).attr('src');
          if (src && !src.startsWith('http')) {
            $(this).attr('src', join('..', src));
          }
        });
        return $.html();
      }
    }
    return content;
  });
};
