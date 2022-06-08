function alphabetically(a, b) {
  return (
      a.data.title < b.data.title ? -1
    : a.data.title > b.data.title ? 1
    : 0
  );
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
