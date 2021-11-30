const elementsPackages = require('../_data/elementsPackages.cjs');

const { EleventyRenderPlugin } = require('@11ty/eleventy');

let elements;

function getTagName(url) {
  const [, , tagName] = url.match(/\/(\w+)\/(\w+)/);
  return `pfe-${tagName}`;
}

// it's an 11ty api
/* eslint-disable no-invalid-this */

async function getDocsPage(tagName) {
  // NB: I think this is new with 11ty 1.0.0. Maybe it's the pagination value? Not sure how bad of an abuse this is
  if (this.ctx._?.constructor?.name === 'DocsPage') {
    return this.ctx._;
  }
  elements ??= await elementsPackages();
  tagName ??= getTagName(this.page.url);
  return elements.get(tagName);
}

// TODO: programmable package scopes, etc
module.exports = function configFunction(eleventyConfig) {
  // add `renderTemplate` filter
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addWatchTarget('tools/pfe-tools/11ty/*.js');

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
