const path = require('path');

function innerMD(content = '') {
  const trimmed = content.trim();
  return trimmed && `\n\n\n${trimmed}\n\n\n`;
}

function type(content = '', { lang = 'ts' } = {}) {
  return content?.trim?.() &&
    `\n\n\`\`\`${lang}\n${content.trim()}\n\n\`\`\`\n\n`;
}

// TODO: Object.groupBy instead of reduce
function undeprecate(acc, x) {
  acc ??= {};
  acc.deprecated ??= [];
  acc.current ??= [];
  if (x.deprecated) {
    acc.deprecated.push(x);
  } else {
    acc.current.push(x);
  }
  return acc;
}

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = function(eleventyConfig) {
  /**
   * docs pages contain a #styling-hooks anchor as back compat for older versions of the page
   * to prevent this id from rendering more than once, we track the number of times each page
   * renders css custom properties.
   */
  const cssStylingHookIdTracker = new WeakSet();

  async function render(tpl, content, kwargs) {
    return eleventyConfig.javascriptFunctions.renderFile(
      path.join(process.cwd(), '/docs/_plugins/element-docs/templates/', tpl),
      { content, ...kwargs },
    );
  }

  /** Rebuild the site in watch mode when the templates for this plugin change */
  eleventyConfig.addWatchTarget('docs/_plugins/element-docs/templates/*.njk');

  eleventyConfig.addFilter('cemMdHeading', (header, length = 2) =>
    innerMD(`${Array.from({ length }, () => '#').join('')} ${header}`));

  eleventyConfig.addFilter('cemInnerMD', innerMD);

  eleventyConfig.addFilter('cemType', type);

  eleventyConfig.addPairedAsyncShortcode('band', async function(content, kwargs) {
    return render('band.njk', content, kwargs);
  });

  /**
   * Render the overview of a component page
   */
  eleventyConfig.addPairedAsyncShortcode('renderOverview', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const description = docsPage.manifest.getDescription(tagName);
    const header = kwargs.title ?? this.title;
    const { renderTitleInOverview = false } = this.options ?? {};
    const renderedTitle =
        !renderTitleInOverview ? ''
      : await render('band.njk', '', { level: 1, header });
    return `${renderedTitle}\n${await render('overview.njk', content, { description, ...kwargs })}`;
  });

  /**
   * Render the list of element attributes
   */
  eleventyConfig.addPairedAsyncShortcode('renderAttributes', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: attributes } = docsPage.manifest.getAttributes(tagName).reduce(undeprecate, {});
    return render('attributes.njk', content, { attributes, deprecated, ...kwargs });
  });

  /**
   * Render the list of element DOM properties
   * @deprecated: render your own templates. To be removed in version 3
   */
  eleventyConfig.addPairedAsyncShortcode('renderProperties', async function(content = '', kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: properties } = docsPage.manifest.getProperties(tagName).reduce(undeprecate, {});
    return render('properties.njk', content, { properties, deprecated, ...kwargs });
  });

  /**
   * Render a table of element CSS Custom Properties
   * @deprecated: render your own templates. To be removed in version 3
   */
  eleventyConfig.addPairedAsyncShortcode('renderCssCustomProperties', async function(content, kwargs = {}) {
    const hasStylingHooks = cssStylingHookIdTracker.has(this);
    cssStylingHookIdTracker.add(this);
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: cssProperties } = docsPage.manifest.getCssCustomProperties(tagName).reduce(undeprecate, {});
    return render('css-custom-properties.njk', content, { cssProperties, deprecated, hasStylingHooks, ...kwargs });
  });

  /**
   * Render the list of element CSS Shadow Parts
   * @deprecated: render your own templates. To be removed in version 3
   */
  eleventyConfig.addPairedAsyncShortcode('renderCssParts', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: parts } = docsPage.manifest.getCssParts(tagName).reduce(undeprecate, {});
    return render('css-shadow-parts.njk', content, { parts, deprecated, ...kwargs });
  });

  /**
   * Render the list of events for the element
   */
  eleventyConfig.addPairedAsyncShortcode('renderEvents', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: events } = docsPage.manifest.getEvents(tagName).reduce(undeprecate, {});
    return render('events.njk', content, { events, deprecated, ...kwargs });
  });

  /**
   * Render the installation instructions for the element
   */
  eleventyConfig.addPairedAsyncShortcode('renderInstallation', async function(content, kwargs = {}) {
    return `${await render('install.njk', content, kwargs)}`;
  });

  /**
   * Render the list of element methods
   */
  eleventyConfig.addPairedAsyncShortcode('renderMethods', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: methods } = docsPage.manifest.getMethods(tagName).reduce(undeprecate, {});
    return render('methods.njk', content, { methods, deprecated, ...kwargs });
  });

  /**
   * Render the list of the element's slots
   */
  eleventyConfig.addPairedAsyncShortcode('renderSlots', async function(content, kwargs = {}) {
    const docsPage = this.ctx._;
    const tagName = docsPage.packageTagName(kwargs);
    const { deprecated, current: slots } = docsPage.manifest.getSlots(tagName).reduce(undeprecate, {});
    return render('slots.njk', content, { slots, deprecated, ...kwargs });
  });
};
