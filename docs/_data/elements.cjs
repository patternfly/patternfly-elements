const { readdir, stat } = require('fs/promises');
const { join } = require('path');

const exists = path => stat(path).then(() => true).catch(() => false);

const cwd = process.cwd();

function toConfig(workspace) {
  return async function(acc, packageName) {
    const unprefixed = packageName.replace('pfe-', '')
    const docsPath = workspace === 'elements' ? 'components' : workspace;
    const docsScriptPath = join(cwd, 'docs', docsPath, unprefixed, 'demo', `${packageName}.js`);
    const docsDemoPath = join(cwd, 'docs', docsPath, unprefixed, 'demo', `${packageName}.html`);
    const docsModulePath = join('/', docsPath, unprefixed, `${packageName}.js`);
    const packagePath = join(cwd, workspace, packageName);
    const module = await exists(join(packagePath, `${packageName}.js`)) ? docsModulePath : undefined;
    const demo = await exists(join(packagePath, 'demo', `${packageName}.html`)) ? docsDemoPath : undefined;
    const script = await exists(join(packagePath, 'demo', `${packageName}.js`)) ? docsScriptPath : undefined;
    return Object.assign(await acc, { [packageName]: { module, demo, script, docsPath, } });
  };
}

module.exports = async function elements() {
  const elements = await readdir(join(cwd, 'elements'));
  const core = await readdir(join(cwd, 'core'));

  const corePackages = await core.reduce(toConfig('core'), Promise.resolve({}));
  const elementsPackages = await elements.reduce(toConfig('elements'), Promise.resolve({}));

  // https://www.11ty.dev/docs/pagination/#paging-an-object
  // maybe page over an object that also informs if there's demo js?
  return {
    ...corePackages,
    ...elementsPackages,
  };
};
