const sleep = ms => new Promise(res => setTimeout(res, ms));

/** exponential back-off function to await results while avoiding rate limits */
async function backoff(fn, depth = 0) {
  try {
    return await fn();
  } catch (e) {
    if (depth > 7) {
      throw e;
    } else {
      await sleep(2 ** depth * 10);
      return backoff(fn, depth + 1);
    }
  }
}

module.exports = async function({ github, glob, workspace, publishedPackages }) {
  const tar = require('tar');
  const { readFile, copyFile } = require('fs').promises;

  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');
  const { execaCommand } = await import('execa');

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  // repo root
  const cwd = `${workspace}`;
  const outfile = `${cwd}/pfe.min.js`;

  await singleFileBuild({ outfile });

  async function getRelease({ owner, repo, tag }) {
    const release = await github.request(`GET /repos/{owner}/{repo}/releases/tags/{tag}`, { owner, repo, tag });
    if (!release.id) {
      throw new Error(`Could not find release for tag: ${tag}`);
    }
  }

  for (const { name: packageName, version } of publishedPackages) {
    // get the tag for the release for this package
    const tag = `${packageName}@${version}`;

    // wait until the release is created
    const release = await backoff(() => getRelease({ owner, repo, tag }));

    const params = {
      owner,
      release_id: release.id,
      repo
    };

    await copyFile(`${cwd}/core/pfe-styles/pfe.min.css`, `${cwd}/pfe.min.css`);

    const globber = await glob.create('pfe.min.*');
    const files = await globber.glob();

    console.log('creating tarball for', files);

    await tar.c({ gzip: true, file: 'pfe.min.tgz' }, files);

    // upload the bundle to each release
    await github.rest.repos.uploadReleaseAsset({
      ...params,
      name: 'pfe.min.tgz',
      data: await readFile(`${cwd}/pfe.min.tgz`),
    });

    // make a tarball for the package
    // this was already published to npm in the changesets action
    const { stdout } = await execaCommand(`npm run pack -w ${packageName}`);
    const match = stdout.match(/^[\w-.]+\.tgz$/g);

    // upload the package tarball to the release
    if (match) {
      const [name] = match;
      await github.rest.repos.uploadReleaseAsset({
        ...params,
        name,
        data: await readFile(`${cwd}/${name}`),
      });
    }
  }
};
