module.exports = {
  templateEngineOverride: 'njk',
  permalink: '{{ demo.permalink }}',
  pagination: {
    data: 'demos',
    alias: 'demo',
    size: 1,
    before: xs => xs.filter(x => x.permalink),
  },
};
