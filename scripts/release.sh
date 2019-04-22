#!/bin/bash

#######################################################################
#                     PUBLISH PFELEMENTS TO NPM!                      #
#######################################################################

PRERELEASE_PREFIX="prerelease"
OLD_VERSION=""
NEW_VERSION=""
TAG_NAME=""
RELEASE_BRANCH=""

trap ctrl_c INT

ctrl_c() {
  echo "ctrl-c detected"
  exit 1
}

checkDir() {
  if [[ -f ./package.json ]]; then
    if grep '"@patternfly/patternfly-elements"' package.json >/dev/null; then
      return
    fi
  fi

  echo "Error: publish must be run from the root directory.  Use \`npm run publish-elements\`"
  exit 1
}

cleanWorkspace() {
  git status --untracked-files=no --porcelain > /dev/null || exit 1
}

checkoutMaster() {
  git checkout master || exit 1
  git pull origin master || exit 1
}

bumpVersion() {
  OLD_VERSION=$(node -e "console.log(require('./lerna.json').version)")
  ./node_modules/.bin/lerna version --no-git-tag-version --no-push --preid="$PRERELEASE_PREFIX" || exit 1
  NEW_VERSION=$(node -e "console.log(require('./lerna.json').version)")
}

createBranch() {
  TAG_NAME="v$NEW_VERSION"
  RELEASE_BRANCH="release/$TAG_NAME"
  git co -b $RELEASE_BRANCH || exit 1
}

npmInstall() {
  npm ci || exit 1
}

commitIgnoredFiles() {
  git add elements/*/*.{js,map,css} -f || exit 1
  git commit -am "v$NEW_VERSION" || exit 1
}

gitTag() {
  git tag $TAG_NAME || exit 1
}

removeIgnoredFiles() {
   for e in elements/*; do find $e -maxdepth 1 \( -not -name "gulpfile.js" -not -name "rollup.config.js" \) \( -name "*.js" -or -name "*.css" -or -name "*.map" \) -exec git rm -f {} \; ;done
   git commit -am "remove bundles from $NEW_VERSION" || exit 1
}

pushToOrigin() {
  git push origin $RELEASE_BRANCH -u || exit 1
  git push --tags || exit 1
}

resetMaster() {
  git checkout master || exit 1
  git reset --hard origin/master || exit 1
}

npmPublish() {
  git checkout $TAG_NAME || exit 1
  npm run lerna publish from-git || exit 1
  git checkout .
}

handlePR() {
  if command -v hub > /dev/null; then
    echo "Hub installation found, creating a PR."
    hub pull-request --browse --message "version bumps from release $RELEASE_BRANCH"
  else
    echo
    echo "FINAL STEP:"
    echo "Follow this link to create a pull request, merging the release branch ($RELEASE_BRANCH) into master."
    echo
    echo "  https://github.com/patternfly/patternfly-elements/compare/$RELEASE_BRANCH?expand=1"
    echo
    echo "Note, if you install Hub (https://hub.github.com/) then this step will be automated in the future."
  fi
}

goodbye() {
  echo "Returning you to the master branch."
  git checkout master
}

checkDir
cleanWorkspace
checkoutMaster
bumpVersion
createBranch
npmInstall
commitIgnoredFiles
gitTag
removeIgnoredFiles
pushToOrigin
resetMaster
npmPublish
handlePR
goodbye
