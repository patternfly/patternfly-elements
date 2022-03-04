module.exports = async function({ github, workspace, publishedPackages }) {
  const { readFile } = require('fs').promises;
  const { singleFileBuild } = await import('../tools/pfe-tools/esbuild.js');
  const { execaCommand } = await import('execa');

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  // repo root
  const cwd = `${workspace}`;
  const outfile = `${cwd}/pfe.min.js`;

  await singleFileBuild({ outfile });

  for (const { name: packageName, version } of publishedPackages) {
    // get the tag for the release for this package
    const tag = `${packageName}@${version}`;
    const { id } = await github.rest.repos.getReleaseByTag({ owner, repo, tag });

    // make a tarball for the package
    // this was already published to npm in the changesets action
    const { stdout } = await execaCommand(`npm run pack -w ${name}`);
    const [name] = stdout.match(/^[\w-.]+\.tgz$/g);

    const params = { name, owner, release_id: id, repo };

    // upload the bundle to each release
    await github.rest.repos.uploadReleaseAsset({ ...params, data: await readFile(outfile) });

    // upload the package tarball to the release
    if (name) {
      await github.rest.repos.uploadReleaseAsset({
        ...params,
        data: await readFile(`${cwd}/${name}`)
      });
    }
  }
};
