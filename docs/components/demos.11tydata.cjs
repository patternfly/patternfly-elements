module.exports = {
  templateEngineOverride: 'njk',
  permalink: '{{ demo.permalink }}',
  pagination: {
    data: 'demos',
    alias: 'demo',
    size: 1,
    before: demos => demos.filter(demo => demo.tagName === demo.primaryElementName),
  },
};
