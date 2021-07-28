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

checkoutMaster() {
  log "checkout master branch & pull"
  git checkout master || exit 1
  git pull origin master || exit 1
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

resetMaster() {
  log "resetting master branch to origin/master"
  git checkout master || exit 1
  git reset --hard origin/master || exit 1
}

npmPublish() {
  log "publishing newly versioned elements to NPM"
  git checkout $TAG_NAME || exit 1
  npm run lerna publish from-git || exit 1
  git checkout .
}

gitRelease() {
  log "creating a git release"
  if command -v gh > /dev/null; then
    log "GitHub CLI found, creating a release for $RELEASE_BRANCH."
    RELEASE_NOTES=""

    # If the release notes tool is installed, grep the changelog for the details
    if command -v parse-changelog > /dev/null; then
      RELEASE_NOTES=$(parse-changelog CHANGELOG-1.x.md $RELEASE_BRANCH)
      gh release create v$RELEASE_BRANCH --notes $RELEASE_NOTES
    fi
  else
    log
    log "Follow this link to create a new release from this tag ($RELEASE_BRANCH)."
    log
    log "  https://github.com/patternfly/patternfly-elements/releases/new?tag=$RELEASE_BRANCH"
    log
    log "Note, if you install the GitHub CLI (https://cli.github.com/) then this step will be automated in the future."
  fi
}

handlePR() {
  if command -v gh > /dev/null; then
    log "GitHub CLI found, creating a pull request for version bumps."
    git checkout $RELEASE_BRANCH
    gh pr create --title "chore: version bumps from $RELEASE_BRANCH" --assignee @me --label release --project Workflow --web
  else
    log
    log "FINAL STEP:"
    log "Follow this link to create a pull request, merging the release branch ($RELEASE_BRANCH) into master."
    log
    log "  https://github.com/patternfly/patternfly-elements/compare/$RELEASE_BRANCH?expand=1"
  fi
}

goodbye() {
  log "Returning you to the master branch."
  git checkout master
}

checkDir
cleanWorkspace
checkoutMaster
bumpVersion
createBranch
npmInstall
npmBuild
commitIgnoredFiles
gitTag
removeIgnoredFiles
pushToOrigin
resetMaster
npmPublish
gitRelease
handlePR
goodbye
