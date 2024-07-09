// @ts-check

/** @param {number} ms */
const sleep = ms => new Promise(r => setTimeout(r, ms));

const NPM_OUTPUT_FILENAME_RE = /^(?:[\s]+)?(?:npm )?(?<name>[-\w.]+\.tgz)$/mg;

/**
 * @param {import('@actions/exec')} exec
 * @param {string} command
 */
async function execCommand(exec, command) {
  const [cmd, ...args] = command.split(' ');

  let stdout = '';
  let stderr = '';

  const code = await exec.exec(cmd, args, {
    listeners: {
      stdout(data) {
        stdout += data.toString();
      },
      stderr(data) {
        stderr += data.toString();
      },
    },
  });

  if (code !== 0) {
    throw new Error(stderr);
  } else {
    return stdout;
  }
}

/**
 * Wait exponentially longer, by seconds, each time we fail to fetch the release
 * @template T
 * @param {(...args: any[]) => T} fn async function to be backed off
 * @param {number} retries current count of retries
 * @param {number} max Max number of retries
 * @returns {Promise<T>}
 */
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


/**
 * @param {object} params
 * @param {*} params.api
 * @param {string} params.workspace
 * @returns {Promise<string>} filename
 */
async function getBundle({ api, workspace }) {
  const { basename } = require('path');
  const { bundle } = await import('../scripts/bundle.js');

  // Create or fetch artifacts
  await bundle({ outfile: `${workspace}/pfe.min.js` });

  const globber = await api.glob.create('elements/pfe.min.*');
  const files = (await globber.glob() ?? []).map(path => basename(path));

  const file = 'pfe.min.tgz';

  api.core.info(`Creating ${file} with ${files.join(', ')}`);

  api.core.info(await execCommand(api.exec, `tar -czf ${file} ${files.join(' ')}`));

  try {
    api.core.info('Tarball contents:');
    api.core.info(await execCommand(api.exec, `tar -tf pfe.min.tgz`));
    return file;
  } catch {
    null;
  }
}


/**
 * @param {object} params
 * @param {API} params.api
 * @param {string} params.owner
 * @param {string} params.repo
 * @param {string} params.tag
 * @param {string} params.workspace
 * @param {string} params.name
 * @param {Release} params.release
 */
async function uploadAssetOverwriting({ api, owner, repo, tag, workspace, release, name }) {
  const { readFile } = require('fs').promises;

  // Delete any existing asset with that name
  for (const { id, name: existing } of release.assets ?? []) {
    if (name === existing) {
      api.core.info(`${name} exists for ${tag}, deleting`);
      await api.github.rest.repos.deleteReleaseAsset({ owner, repo, asset_id: id });
    }
  }

  // Upload the all-repo bundle to the release
  const data = await readFile(`${workspace}/${name}`);
  api.core.info(`Uploading ${name} to ${tag}`);
  await api.github.rest.repos.uploadReleaseAsset({
    tag,
    owner,
    repo,
    release_id: release.id,
    name,
    data,
  });
}

/**
 * @param {object} params
 * @param {import('@actions/core')} params.core
 * @param {import('@actions/exec')} params.exec
 * @param {import('@actions/glob')} params.glob
 * @param {import('@octokit/rest').Octokit} params.github
 * @param {string} params.owner
 * @param {string} params.repo
 * @param {string} params.tags
 * @param {string} params.workspace
 * @param {string} params.name
 * @param {Release} params.release
 */
module.exports = async function bundle({ tags = '', workspace, ...api }) {
  await execCommand(api.exec, 'git config advice.detachedHead false');

  api;

  const tagsList = tags.split(',').map(x => x.trim());

  // https://github.com/patternfly/patternfly-elements
  const owner = 'patternfly';
  const repo = 'patternfly-elements';

  const errors = [];

  for (const tag of tagsList) {
    try {
      api.core.info(`Bundling tag ${tag}`);

      api.core.info('Fetching release');
      const response = await backoff(async () =>
        await api.github.rest.repos.getReleaseByTag({ owner, repo, tag }));

      const release = response.data;

      api.core.debug(JSON.stringify(release ?? null, null, 2));

      const params = { api, owner, repo, release, tag, workspace };

      // Check out the requested tag, install it's dependencies, and build
      api.core.info(`Checking out ${tag}`);
      await execCommand(api.exec, `git checkout ${tag}`);
      api.core.info(`Installing dependencies for ${tag}`);
      await execCommand(api.exec, `npm ci --prefer-offline`);
      api.core.info(`Bundling Packages for ${tag}`);

      // Upload single-file bundle to release
      await uploadAssetOverwriting({ ...params, name: await getBundle({ api, workspace }) });

      // Download the package tarball from NPM
      const stdout = await execCommand(api.exec, `npm pack ${tag}`);

      // Multiple fallbacks for parsing `npm pack` output
      let name = NPM_OUTPUT_FILENAME_RE.exec(stdout)?.groups?.name;
      name ||= stdout.split('\n').pop().replace(/^npm /, '');
      name ||= `${tag.replace(/[@/]/g, '-')}.tgz`.replace(/^-/, '');

      // Upload the NPM tarball to the release
      if (name) {
        await uploadAssetOverwriting({ ...params, name });
      } else {
        throw new Error(`Could not get NPM tarball for ${tag}`);
      }
    } catch (error) {
      api.core.error(error);
      errors.push(error);
    }
  } if (errors.length) {
    api.core.setFailed(errors.join('\n\n'));
  }
};

