#!/bin/bash

#######################################################################
#                     PUBLISH PFELEMENTS TO NPM!                      #
#######################################################################

PRERELEASE_PREFIX="prerelease"
OLD_VERSION=""
NEW_VERSION=""
TAG_NAME=""
RELEASE_BRANCH=""

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
  git status --untracked-files=no --porcelain || exit 1
}

checkoutMaster() {
  git checkout master || exit 1
  git pull origin master || exit 1

}

#    - Choose the appropriate version bump type for the release you’re publishing.
#    - if bumping a prerelease version (example: from 1.0.0-prerelease.2 to 1.0.0-prerelease.3), choose Custom Prerelease
bumpVersion() {
  OLD_VERSION=$(node -e "console.log(require('./lerna.json').version)")
  ./node_modules/.bin/lerna version -- --no-git-tag-version --no-push --preid="$PRERELEASE_PREFIX" || exit 1
  NEW_VERSION=$(node -e "console.log(require('./lerna.json').version)")
}

createBranch() {
  TAG_NAME="v$NEW_VERSION"
  RELEASE_BRANCH="release/$TAG_NAME"
  git co -b $RELEASE_BRANCH || exit 1
}

npmInstall() {
  npm install || exit 1
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
  git checkout $TAG_NAME
  # npm run lerna publish from-git
  echo 'lerna publish to npm'
}

goodbye() {
  echo "Returning you to the master branch."
  git checkout master
  echo " 15. create a PR for the branch you just created"
  echo " 16. delete branch after merging PR"
}



checkDir
cleanWorkspace
#checkoutMaster
bumpVersion
createBranch
npmInstall
commitIgnoredFiles
gitTag
removeIgnoredFiles
pushToOrigin
resetMaster
npmPublish
goodbye
