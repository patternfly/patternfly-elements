module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedAsyncShortcode('generateImportMap', async content => {
    const { generate } = await import('@pwrs/mappa');

    const deps = {};
    const specifierRe = /['"]([^'"]+)['"]/g;
    for (const [, spec] of content.matchAll(specifierRe)) {
      if (!spec.startsWith('.') && !spec.startsWith('/')) {
        const name = spec.startsWith('@') ?
          spec.split('/').slice(0, 2).join('/') :
          spec.split('/')[0];
        deps[name] = '*';
      }
    }

    const map = await generate({ dependencies: deps }, { cdn: 'esm.sh' });

    const script = `<script type="importmap">\n${JSON.stringify(map, null, 2)}\n</script>`;
    return content.replace(/<script\b[^>]*type=["']module["'][^>]*>[\s\S]*?<\/script>/g, found =>
      `${script}\n${found}`);
  });
};
