/* eslint-disable no-console */
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

async function getBundle({ glob, workspace }) {
  const tar = require('tar');
  const { copyFile } = require('fs').promises;
  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');

  // Create or fetch artifacts
  await singleFileBuild({ outfile: `${workspace}/pfe.min.js` });
  await copyFile(`${workspace}/core/pfe-styles/pfe.min.css`, `${workspace}/pfe.min.css`);

  const globber = await glob.create('pfe.min.*');
  const files = (await globber.glob() ?? []).map(path => path.replace(workspace, ''));

  const file = 'pfe.min.tgz';

  const onentry = x => console.log(x.header.path);

  console.log(`Creating ${file} with`, files.join('\n'), '\n');

  await tar.c({ gzip: true, file }, files);

  console.log('Tarball contents:');

  await Promise.resolve(tar.t({ file, onentry }));

  return file;
}

module.exports = async function({ github, glob, tags, workspace }) {
  const { readFile } = require('fs').promises;

  const { execaCommand } = await import('execa');

  const bundleFileName = await getBundle({ github, glob, workspace });

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  for (const tag of tags.split(',').map(x => x.trim())) {
    const response = await backoff(() =>
      github.rest.repos.getReleaseByTag({ owner, repo, tag }));

    const release = response.data;

    const params = { owner, release_id: release.id, repo };

    // Upload the all-repo bundle to the release
    if (!release.assets?.some(x => x.name === bundleFileName)) {
      const data = await readFile(`${workspace}/${bundleFileName}`);
      console.log(`Uploading ${bundleFileName}`);
      await github.rest.repos.uploadReleaseAsset({ ...params, name: bundleFileName, data });
    }

    // Download the package tarball from NPM
    const { all } = await execaCommand(`npm pack ${tag}`, { all: true });
    const [name] = all.match(/^(?:npm )?[\w-.]+\.tgz$/mg) ?? [];

    if (name) {
      // Upload the NPM tarball to the release
      console.log(`Uploading ${name}`);
      if (!release.assets?.some(x => x.name === name)) {
        const data = await readFile(`${workspace}/${name}`);
        console.log(`Uploading ${name}`);
        await github.rest.repos.uploadReleaseAsset({ ...params, name, data });
      }
    } else {
      console.log(all);
      throw new Error(`Could not get NPM tarball for ${tag}`);
    }
  }
};

