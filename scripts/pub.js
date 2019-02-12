const shell = require("shelljs");
const inquirer = require("inquirer");
const semver = require("semver");
const lerna_version = require("@lerna/version/lib/prompt-version");
const fs = require("fs-extra");
const path = require("path");

const cmds = {
  git_status: "git status --untracked-files=no --porcelain",
  reset: "git checkout master && git reset --hard origin/master",
  lerna_version: version =>
    `npm run lerna version -- --no-git-tag-version --yes --no-push ${version}`,
  create_branch: version => `git checkout -b release/${version}`,
  push_branch: version => `git push origin release/${version} -u`,

  build: `npm install && npm run build && git add elements/*/*.{js,map,css} -f`
};

async function getVersion() {
  return (await fs.readJson(path.join(__dirname, "../lerna.json"))).version;
}

async function main() {
  // await assertCleanRepo();
  await checkOutMaster();
  await bumpVersion();
  await createBranch();
  await build();
  await commit;
  // git commit -am “$NEW_VERSION”
  // git tag $NEW_VERSION
  // Remove the bundle files: for e in elements/*; do git rm -f elements/$(basename $e)/$(basename $e).*; done
  // git commit -am “remove bundles from $NEW_VERSION”
  //
  //
  await pushBranch();
  await pushTags();
  await resetMaster();
  await offerPR();
  await npmPublish();
  done();
}

/**
 * Abort if the repository isn't clean.
 */
async function assertCleanRepo() {
  const git_status = shell.exec(cmds.git_status, { silent: true });

  if (git_status.stderr) {
    console.error(git_status.stderr);
    process.exit(1);
  }

  const is_clean = git_status.stdout.length === 0;

  if (!is_clean) {
    console.error(`Your repository has the following uncommitted changes:

${git_status.stdout}
Please commit or stash the changes before publishing.`);
    process.exit(1);
  }

  return true;
}

/**
 * Check out the master branch.
 */
async function checkOutMaster() {
  console.log("checking out master (disabled for testing)");
  // shell.exec(cmds.git_status, { silent: true });
}

/**
 * Update version with Lerna.
 */
async function bumpVersion() {
  // call Lerna's own version bump chooser.
  const prompt = await lerna_version(() => "prerelease");

  const version = await prompt({
    version: await getVersion(),
    prereleaseId: "prerelease"
  });

  shell.exec(cmds.lerna_version(version), {
    silent: false
  });
}

/**
 * Create branch for the PR.
 */
async function createBranch() {
  console.log("let's create a branch");
  // get the version from package.json
  // create a branch named “release/$NEW_VERSION” (example: “release/1.0.0-prerelease.3”)
}

/**
 * Run a build.  Includes npm install, build, and force-adding bundles.
 */
async function build() {
  shell.exec(cmds.build, { silent: false });
}

/**
 * Push the new branch.
 */
async function pushBranch() {
  console.log("let us push the branch!");
  // git push origin release/1.0.0-prerelease.3 -u
}

/**
 * Push the new branch.
 */
async function pushTags() {
  console.log("let us push the new tags!");
  // git push --tags
}

/**
 * Reset the master branch.  Master is still dirty because `lerna version` was
 * run on it.  Those changes were pushed in the 'releases/$VERSION' branch
 * though, so we an wipe them out safely.
 */
async function resetMaster() {
  console.log("master looks dirty let's reset it");
  // git checkout master
  // git reset --hard origin/master
}

/**
 * Offer a link to create a pull request with the new branch.
 */
async function offerPR() {
  console.log("wanna make a PR?");
  // create a PR for the branch you just created
  // delete branch after merging PR
}

/**
 * Publish to NPM.
 */
async function npmPublish() {
  console.log("publish to npm");
  // git checkout $NEW_VERSION
  // npm run lerna publish from-git
}

/**
 * Done!
 */
function done() {
  console.log("all done!");
  console.log("TODO: display a link to the release page on github");
  console.log("TODO: figure out how to automate changelog");
}

main();
