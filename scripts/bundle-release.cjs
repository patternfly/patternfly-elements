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

module.exports = async function({ github, glob, tag, workspace }) {
  const tar = require('tar');
  const { readFile, copyFile } = require('fs').promises;

  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');
  const { execaCommand } = await import('execa');

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  console.log({ owner, repo, tag });

  const response = await backoff(() => github.rest.repos.getReleaseByTag({ owner, repo, tag }));

  const release = response.data;

  console.log(release);

  const params = { owner, release_id: release.id, repo };

  if (!release.assets?.some(x => x.name === 'pfe.min.tgz')) {
    // Create or fetch artifacts
    await singleFileBuild({ outfile: `${workspace}/pfe.min.js` });
    await copyFile(`${workspace}/core/pfe-styles/pfe.min.css`, `${workspace}/pfe.min.css`);

    const globber = await glob.create('pfe.min.*');
    const files = await globber.glob() ?? [];

    const name = 'pfe.min.tgz';

    console.log('Creating tarball for', files.join(', '));
    await tar.c({ gzip: true, file: name }, files);

    const data = await readFile(`${workspace}/${name}`);

    // Upload the all-repo bundle to the release
    console.log(`Uploading ${name}`);
    await github.rest.repos.uploadReleaseAsset({ ...params, name, data });
  }

  // download the tarball that was published to NPM
  const { all } = await execaCommand(`npm pack ${tag}`, { all: true });
  console.log(all);

  const match = all.match(/^[\w-.]+\.tgz$/g);

  // Upload the NPM tarball to the release
  if (match) {
    const [name] = match;
    if (!release.assets?.some(x => x.name === name)) {
      const data = await readFile(`${workspace}/${name}`);
      console.log(`Uploading ${name}`);
      await github.rest.repos.uploadReleaseAsset({ ...params, name, data });
    }
  }
};
