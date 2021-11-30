const corePackages = require('./corePackages.cjs');

module.exports = async function core(eleventyData) {
  return [...new Set((eleventyData.corePackages ?? await corePackages(eleventyData)).values())]
    .sort((a, b) => a.package.name > b.package.name ? 1 : -1);
};
