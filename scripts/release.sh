#!/bin/bash
export FORCE_COLOR=true

#######################################################################
#                     PUBLISH PFELEMENTS TO NPM!                      #
#######################################################################

PRERELEASE_PREFIX="prerelease"
OLD_VERSION=""
NEW_VERSION=""
TAG_NAME=""
RELEASE_BRANCH=""

# abort script if any command fails
set -e
trap ctrl_c INT

ctrl_c() {
  echo "ctrl-c detected"
  exit 1
}

log() {
  echo "[RELEASE] $1"
}

checkDir() {
  log "verifying CWD is monorepo root"
  if [[ -f ./package.json ]]; then
    if grep '"@patternfly/patternfly-elements"' package.json >/dev/null; then
      log "CWD is monorepo root"
      return
    fi
  fi

  echo "Error: release must be run from the repository's root directory."
  exit 1
}

cleanWorkspace() {
  log "verifying clean workspace"
  [[ "$(git status --untracked-files=no --porcelain | wc -l | sed 's/ //g')" == 0 ]] || ( log "error: Release cannot continue because you have local changes.  Please commit or stash your changes and try again." && exit 1 )
}

checkoutMain() {
  log "checkout main branch & pull"
  git checkout main || exit 1
  git pull origin main || exit 1
}

bumpVersion() {
  log "bumping version"
  OLD_VERSION=$(node -e "console.log(require('./lerna.json').version)")
  ./node_modules/.bin/lerna version --include-merged-tags --no-git-tag-version --no-push --preid="$PRERELEASE_PREFIX" || exit 1
  NEW_VERSION=$(node -e "console.log(require('./lerna.json').version)")
}

createBranch() {
  log "creating release branch with new version numbers"
  TAG_NAME="v$NEW_VERSION"
  RELEASE_BRANCH="release/$TAG_NAME"
  git checkout -b $RELEASE_BRANCH || exit 1
}

npmInstall() {
  log "installing NPM dependencies"
  npm ci || exit 1
}

npmBuild() {
  log "build the repository"
  npm run build || exit 1
}

commitIgnoredFiles() {
  log "committing compiled bundles to release branch"
  git add elements/*/dist/ -f || exit 1
  git commit -am "v$NEW_VERSION" || exit 1
}

gitTag() {
  log "creating a git tag"
  # create an annotated tag (lerna only picks up on annotated tags)
  git tag -a -m "$TAG_NAME" $TAG_NAME || exit 1
}

removeIgnoredFiles() {
  log "removing the compiled bundles from release branch (they should only exist in the tag)"
   # for e in elements/*; do find $e -maxdepth 1 \( -not -name "gulpfile.js" -not -name "rollup.config.js" \) \( -name "*.js" -or -name "*.css" -or -name "*.map" \) -exec git rm -f {} \; ;done
   git rm -rf elements/*/dist
   git commit -am "remove bundles after $NEW_VERSION tag" || exit 1
}

pushToOrigin() {
  log "pushing release branch to origin"
  git push origin $RELEASE_BRANCH -u || exit 1
  log "pushing tags to origin"
  git push --tags || exit 1
}

resetMain() {
  log "resetting main branch to origin/main"
  git checkout main || exit 1
  git reset --hard origin/main || exit 1
}

npmPublish() {
  log "publishing newly versioned elements to NPM"
  git checkout $TAG_NAME || exit 1
  npm run lerna publish from-git || exit 1
  git checkout .
}

handlePR() {
  if command -v hub > /dev/null; then
    log "Hub installation found, creating a PR."
    git checkout $RELEASE_BRANCH
    hub pull-request --browse --message "version bumps from $RELEASE_BRANCH"
  else
    log
    log "FINAL STEP:"
    log "Follow this link to create a pull request, merging the release branch ($RELEASE_BRANCH) into main."
    log
    log "  https://github.com/patternfly/patternfly-elements/compare/$RELEASE_BRANCH?expand=1"
    log
    log "Note, if you install Hub (https://hub.github.com/) then this step will be automated in the future."
  fi
}

goodbye() {
  log "Returning you to the main branch."
  git checkout main
}

# Only let user run this from repo root
checkDir
# Fail for uncommitted changes
cleanWorkspace
# check out the main branch
checkoutMain
# Set a lerna version, without tagging or pushing, using a prerelease id
bumpVersion
# Create a new "release branch" based on the changes made (versions) in last step
# Set TAG_NAME to `v${version}`
createBranch
# Only now run the install (?!?!?!)
npmInstall
# Run the build scripts
npmBuild
# Commit the dist files to the release branch
commitIgnoredFiles
# Tag the release branch with TAG_NAME
gitTag
# Remove the dist files from release branch
# But they still exist on the tag
removeIgnoredFiles
# Push the release branch (no build artifacts)
# and the tags (has build artifacts)
# to the origin
pushToOrigin
# reset hard to main
resetMain
# checkout TAG_NAME and run lerna publish
npmPublish
# Open a PR to merge release branch into main
# Even though the packages are already published
handlePR
# Checkout main
goodbye
