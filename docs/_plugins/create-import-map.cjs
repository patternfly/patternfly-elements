module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedAsyncShortcode('generateImportMap', async content => {
    const { Generator } = await import('@jspm/generator');

    const generator = new Generator({
      defaultProvider: 'jspm.io',
      env: ['production', 'browser', 'module'],
    });

    const pins = await generator.addMappings(content);

    const html = await generator.htmlInject(content, {
      pins,
      esModuleShims: true,
      whitespace: true,
    });

    return html;
  });
};

