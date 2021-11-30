module.exports = async function elementsPackages() {
  const { getPackageData } = await import('@patternfly/pfe-tools/11ty');
  return getPackageData('elements', 'components');
};
