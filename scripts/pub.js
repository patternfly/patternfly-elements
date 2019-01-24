const shell = require("shelljs");
const inquirer = require("inquirer");
const lerna_version = require("@lerna/version/lib/prompt-version");

const cmds = {
  git_status: "git status --untracked-files=no --porcelain",
  reset: "git checkout master && git reset --hard origin/master",
  lerna_version: version => `npm run lerna version -- --no-push ${version}`
};

async function main() {
  await assertCleanRepo();
  await checkOutMaster();
  await bumpVersion();
  await createBranch();
  await pushBranch();
  await resetMaster();
  await offerPR();
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
  console.log("time to bump the version");
  // Choose the appropriate version bump type for the release you’re publishing.
  // use inquirer to provide a more straightforward choice than Lerna offers
  // if bumping a prerelease version (example: from 1.0.0-prerelease.2 to 1.0.0-prerelease.3), choose Custom Prerelease

  const prompt = await lerna_version(() => "prerelease");

  const version = await prompt({
    version: require("../lerna.json").version,
    prereleaseId: "prerelease"
  });

  console.log(version);

  const version_bump = shell.exec(cmds.lerna_version(version), {
    silent: false
  });
  // const version_bump = shell.exec(cmds.lerna_version, { silent: false });

  // const answer = await inquirer.prompt([
  //   {
  //     name: "type",
  //     type: "list",
  //     message: "What type of release is this?",
  //     choices: [
  //       { value: patch, name: `Patch (${patch})` },
  //       { value: minor, name: `Minor (${minor})` },
  //       { value: major, name: `Major (${major})` },
  //       { value: prepatch, name: `Prepatch (${prepatch})` },
  //       { value: preminor, name: `Preminor (${preminor})` },
  //       { value: premajor, name: `Premajor (${premajor})` },
  //       { value: "PRERELEASE", name: "Custom Prerelease" },
  //       { value: "CUSTOM", name: "Custom Version" }
  //     ]
  //   }
  // ]);

  // console.log(answer);
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
 * Push the new branch.
 */
async function pushBranch() {
  console.log("let us push the branch!");
  // git push origin release/1.0.0-prerelease.3 -u
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
 * Done!
 */
function done() {
  console.log("all done!");
  console.log("TODO: display a link to the release page on github");
  console.log("TODO: figure out how to automate changelog");
}

main();
