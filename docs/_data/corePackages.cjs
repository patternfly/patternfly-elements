module.exports = async function corePackages() {
  const { getPackageData } = await import('@patternfly/pfe-tools/11ty');
  return getPackageData('core');
};
