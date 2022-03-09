module.exports = async function({ github, glob, workspace, context }) {
  const tar = require('tar');
  const { readFile, copyFile } = require('fs').promises;

  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');
  const { execaCommand } = await import('execa');

  const { payload } = context;
  const { release } = payload;

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  const tag = release.tag_name;

  // repo root
  const cwd = `${workspace}`;
  const outfile = `${cwd}/pfe.min.js`;

  const params = { owner, release_id: release.id, repo };

  if (!release.assets.some(x => x.name === 'pfe.min.tgz')) {
    // Create or fetch artifacts
    await singleFileBuild({ outfile });
    await copyFile(`${cwd}/core/pfe-styles/pfe.min.css`, `${cwd}/pfe.min.css`);

    const globber = await glob.create('pfe.min.*');
    const files = await globber.glob() ?? [];

    console.log('Creating tarball for', files.join(', ')); // eslint-disable-line
    await tar.c({ gzip: true, file: 'pfe.min.tgz' }, files);

    // Upload the all-repo bundle to the release
    await github.rest.repos.uploadReleaseAsset({
      ...params,
      name: 'pfe.min.tgz',
      data: await readFile(`${cwd}/pfe.min.tgz`),
    });
  }

  // download the tarball that was published to NPM
  const { stdout } = await execaCommand(`npm pack ${tag}`);

  const match = stdout.match(/^[\w-.]+\.tgz$/g);

  // Upload the NPM tarball to the release
  if (match) {
    const [name] = match;
    if (!release.assets.some(x => x.name === name)) {
      await github.rest.repos.uploadReleaseAsset({
        ...params,
        name,
        data: await readFile(`${cwd}/${name}`),
      });
    }
  }
};
