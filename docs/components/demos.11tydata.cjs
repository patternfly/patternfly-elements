const { dirname } = require('path');
module.exports = {
  templateEngineOverride: 'njk',
  permalink: '{{ demo.permalink }}',
  pagination: {
    data: 'demos',
    alias: 'demo',
    size: 1,
    // somehow the main pf-icon demo is being printed twice.
    // so we'll group by tag name, and only take the first of each.
    before: demos => Object.values(Object.groupBy(demos
        .filter(demo => demo.permalink?.includes(demo.tagName))
        .map(demo => {
          if (demo.filePath?.endsWith(`${demo.tagName}.html`)) {
            return {
              ...demo,
              permalink: `${dirname(demo.permalink)}/`,
            };
          } else {
            return demo;
          }
        }), demo => demo.tagName)).map(([x]) => x),
  },
};
