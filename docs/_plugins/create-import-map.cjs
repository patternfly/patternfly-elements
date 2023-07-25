module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedAsyncShortcode('generateImportMap', async (content) => {
    const { Generator } = await import('@jspm/generator');

    const generator = new Generator({
      defaultProvider: 'jspm',
      env: ['production', 'browser', 'module']
    });

    const pins = await generator.addMappings(content);

    const html = await generator.htmlInject('', { pins, esModuleShims: true, whitespace: true });

    return html;
  });
}
