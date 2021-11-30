const elementsPackages = require('./elementsPackages.cjs');

module.exports = async function elements(eleventyData) {
  return [...new Set((eleventyData.elementsPackages ?? await elementsPackages(eleventyData)).values())]
    .sort((a, b) => a.tagName > b.tagName ? 1 : -1);
};
