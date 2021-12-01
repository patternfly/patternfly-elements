function alphabetically(a, b) {
  if (a.data.title < b.data.title)
    return -1;

  if (a.data.title > b.data.title)
    return 1;

  return 0;
}

const byOrder = (a, b) => a.data.order - b.data.order;

module.exports = {
  configFunction(eleventyConfig, options) {
    for (const tag of options?.tags ?? []) {
      eleventyConfig.addCollection(tag, collection =>
        collection
          .getFilteredByTag(tag)
          .sort(options.order === 'alphabetical' ? alphabetically : byOrder));
    }
  },
};
