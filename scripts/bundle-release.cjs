const sleep = ms => new Promise(r => setTimeout(r, ms));

/** Wait exponentially longer, by seconds, each time we fail to fetch the release */
async function backoff(fn, retries = 0, max = 10) {
  try {
    return await fn();
  } catch (e) {
    if (retries > max) {
      throw e;
    }

    await sleep(2 ** retries * 1000);

    return backoff(fn, retries + 1);
  }
}

async function checkoutRef(ref) {
  const { execaCommand } = await import('execa');
  await execaCommand('git config advice.detachedHead false');
  const { stdout } = await execaCommand(`git checkout ${ref}`);
  return stdout;
}

async function getBundle({ core, glob, workspace }) {
  const { execaCommand } = await import('execa');
  await execaCommand(`npm i --prefer-offline --no-scripts`);
  await execaCommand(`npm run build -w @patternfly/pfe-tools -w @patternfly/pfe-styles`);
  await copyFile(`${workspace}/core/pfe-styles/pfe.min.css`, `${workspace}/pfe.min.css`);

  const tar = require('tar');
  const { copyFile } = require('fs').promises;
  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');

  // Create or fetch artifacts
  await singleFileBuild({ outfile: `${workspace}/pfe.min.js` });

  const globber = await glob.create('pfe.min.*');
  const files = (await globber.glob() ?? []).map(path => path.replace(workspace, ''));

  const file = 'pfe.min.tgz';

  core.debug(`Creating ${file} with`, files.join('\n'), '\n');

  await tar.c({ gzip: true, file }, files);

  core.debug('Tarball contents:');

  await Promise.resolve(tar.t({ file, onentry: x => core.debug(x.header.path) }));

  return file;
}

module.exports = async function({ core, github, glob, tags = '', workspace }) {
  const { readFile } = require('fs').promises;
  const { execaCommand } = await import('execa');

  tags = tags.split(',').map(x => x.trim());

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  const results = await Promise.allSettled(tags.map(async tag => {
    const response = await backoff(() =>
      github.rest.repos.getReleaseByTag({ owner, repo, tag }));

    const release = response.data;

    const params = { owner, release_id: release.id, repo };

    core.info(`Checking out ${tag}`);

    await checkoutRef(tag);
    const bundleFileName = await getBundle({ core, github, glob, workspace });

    // Delete any existing asset with that name
    for (const { id, name } of release.assets ?? []) {
      if (name === bundleFileName) {
        await github.rest.repos.deleteReleaseAsset({ owner, repo, asset_id: id });
      }
    }

    // Upload the all-repo bundle to the release
    const data = await readFile(`${workspace}/${bundleFileName}`);
    core.info(`Uploading ${bundleFileName}`);
    await github.rest.repos.uploadReleaseAsset({ ...params, name: bundleFileName, data });

    // Download the package tarball from NPM
    const { all } = await execaCommand(`npm pack ${tag}`, { all: true });
    const [name] = all.match(/^(?:npm )?[\w-.]+\.tgz$/mg) ?? [];

    if (name) {
      // Upload the NPM tarball to the release
      core.info(`Uploading ${name}`);
      if (!release.assets?.some(x => x.name === name)) {
        const data = await readFile(`${workspace}/${name}`);
        core.info(`Uploading ${name}`);
        await github.rest.repos.uploadReleaseAsset({ ...params, name, data });
      }
    } else {
      core.error(all);
      throw new Error(`Could not get NPM tarball for ${tag}`);
    }
  }));

  for (const { status, reason } of results) {
    if (status === 'rejected') {
      core.error(reason);
    }
  }
};

