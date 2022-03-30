const { EleventyRenderPlugin } = require('@11ty/eleventy');

let elements;

function getTagName(url) {
  const [, , tagName] = url.match(/\/(\w+)\/(\w+)/);
  return `pfe-${tagName}`;
}

async function elementsPackages() {
  const { getPackageData } = await import('@patternfly/pfe-tools/11ty');
  return getPackageData('elements', 'components');
}

async function corePackages() {
  const { getPackageData } = await import('@patternfly/pfe-tools/11ty');
  return getPackageData('core');
}

// it's an 11ty api
/* eslint-disable no-invalid-this */

async function getDocsPage(tagName) {
  // NB: I think this is new with 11ty 1.0.0. Maybe it's the pagination value? Not sure how bad of an abuse this is
  if (this.ctx._?.constructor?.name === 'DocsPage') {
    return this.ctx._;
  } else {
    elements ??= await elementsPackages();
    tagName ??= getTagName(this.page.url);
    return elements.get(tagName);
  }
}

// TODO: programmable package scopes, etc
module.exports = function configFunction(eleventyConfig) {
  // add `renderTemplate` filter
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('elementsPackages', elementsPackages);
  eleventyConfig.addGlobalData('corePackages', corePackages);
  eleventyConfig.addGlobalData('core', async function core() {
    return [...new Set((await corePackages()).values())]
      .sort((a, b) => a.package.name > b.package.name ? 1 : -1);
  });
  eleventyConfig.addGlobalData('elements', async function elements() {
    return [...new Set((await elementsPackages()).values())]
      .sort((a, b) => a.tagName > b.tagName ? 1 : -1);
  });

  const toolsFiles = require.resolve('@patternfly/pfe-tools/11ty').replace('index.js', '**/*.{js,njk}');
  eleventyConfig.addWatchTarget(toolsFiles);

  // copied from DocsPage
  eleventyConfig.addPairedAsyncShortcode('band', async function(content, kwargs) {
    const { renderBand } = await import('@patternfly/pfe-tools/11ty');
    return renderBand(content, kwargs);
  });

  for (const shortCode of [
    'renderAttributes',
    'renderCssCustomProperties',
    'renderCssParts',
    'renderEvents',
    'renderMethods',
    'renderOverview',
    'renderProperties',
    'renderSlots',
  ]) {
    eleventyConfig.addPairedAsyncShortcode(shortCode, async function(content, kwargs) {
      const page = await getDocsPage.call(this, kwargs?.for);
      return page[shortCode](content, kwargs);
    });
  }
};
