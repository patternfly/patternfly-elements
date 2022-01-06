const { readdir, stat } = require('fs/promises');
const { join } = require('path');
const { getDescription, getSummary } = require('../_plugins/filters/cem.cjs');

const exists = path => stat(path).then(() => true).catch(() => false);

const ifExists = async path => await exists(path) ? path : undefined;

const cwd = process.cwd();

const ALIASES = new Map([
  ['pfe-cta', 'Call to Action']
]);

const pretty = x => ALIASES.get(x) ?? x
  .replace('pfe-','' )
  .toLowerCase()
  .replace(/(?:^|[\s-/])\w/g, x => x.toUpperCase())
  .replace(/-/g, ' ');

function toConfig(manifests, workspace, category = workspace) {
  return async function(acc, pkg) {
    const slug = pkg.replace('pfe-', '');
    const packagePath = join(cwd, workspace, pkg);
    const module = await ifExists(join(packagePath, `${pkg}.js`));
    const demo = await ifExists(join(packagePath, 'demo', `${pkg}.html`));
    const script = await ifExists(join(packagePath, 'demo', `${pkg}.js`));
    const title = pretty(pkg);
    const docsPath = await ifExists(join(packagePath, 'docs', 'index.md'));
    const manifest = manifests[pkg];
    const description = manifest && getDescription(pkg, manifest);
    const summary = manifest && getSummary(pkg, manifest);
    return Object.assign(await acc, { [pkg]: {
      module,
      demo,
      script,
      description,
      summary,
      package: pkg,
      category,
      slug,
      docsPath,
      title,
    } });
  };
}

module.exports = async function elements({ manifests }) {
  const elements = await readdir(join(cwd, 'elements'));
  const core = await readdir(join(cwd, 'core'));

  const corePackages = await core.reduce(toConfig(manifests, 'core'), Promise.resolve({}));
  const elementsPackages = await elements.reduce(toConfig(manifests, 'elements', 'components'), Promise.resolve({}));

  // https://www.11ty.dev/docs/pagination/#paging-an-object
  // maybe page over an object that also informs if there's demo js?
  return {
    ...corePackages,
    ...elementsPackages,
  };
};
