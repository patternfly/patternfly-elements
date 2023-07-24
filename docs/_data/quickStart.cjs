module.exports = async function() {
  const { Generator } = await import('@jspm/generator');
  const { readFile } = await import('node:fs/promises');
  const { join } = await import('node:path');

  const generator = new Generator({
    defaultProvider: 'jspm',
    env: ['production', 'browser', 'module']
  });

  const data = await readFile(join(__dirname, '..', 'quick-start.md'), 'utf8');

  const pins = await generator.addMappings(data);

  const html = await generator.htmlInject('', { pins, esModuleShims: true, whitespace: true });

  return html;
};
