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

  await singleFileBuild({ outfile });

  const params = {
    owner,
    release_id: release.id,
    repo
  };

  await copyFile(`${cwd}/core/pfe-styles/pfe.min.css`, `${cwd}/pfe.min.css`);

  const globber = await glob.create('pfe.min.*');
  const files = await globber.glob();

  // eslint-disable-next-line
  console.log('creating tarball for', files);

  await tar.c({ gzip: true, file: 'pfe.min.tgz' }, files);

  // upload the bundle to each release
  await github.rest.repos.uploadReleaseAsset({
    ...params,
    name: 'pfe.min.tgz',
    data: await readFile(`${cwd}/pfe.min.tgz`),
  });

  const { packageName } = tag.match(/^(?<packageName>@[-\w]+[/]{1}[-\w]+)@(.*)$/)?.groups ?? {};

  if (!packageName) {
    // eslint-disable-next-line
    console.log(release);
    throw new Error('No Package found');
  }

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
};
