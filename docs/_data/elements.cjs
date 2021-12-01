const { readdir, stat } = require('fs/promises');
const { join } = require('path');

const exists = path => stat(path).then(() => true).catch(() => false);

const cwd = process.cwd();

function toConfig(workspace) {
  return async function(acc, dirname) {
    const script = join(cwd, workspace, dirname, 'demo', `${dirname}.js`);
    const demo = join(cwd, workspace, dirname, 'demo', `${dirname}.html`);
    const modulePath = join('/', workspace, dirname, `${dirname}.js`);
    const packages = await acc;
    return Object.assign(packages, {
      [dirname]: {
        module: await exists(join(cwd, modulePath)) ? modulePath : undefined,
        demo: await exists(demo) ? demo : undefined,
        script: await exists(script) ? script : undefined,
      },
    });
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
