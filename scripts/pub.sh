#!/bin/bash

#######################################################################
#                     PUBLISH PFELEMENTS TO NPM!                      #
#######################################################################

PRERELEASE_PREFIX="prerelease"
OLD_VERSION=""
NEW_VERSION=""

# 1. go to the root dir
checkDir() {
  if [[ -f ./package.json ]]; then
    if grep '"@patternfly/patternfly-elements"' package.json >/dev/null; then
      echo "correct dir"
      return
    fi
  fi

  echo "Error: publish must be run from the root directory.  Use \`npm run publish-elements\`"
  exit 1
}
# 2. make sure working dir is completely clean and up to date with origin
cleanWorkspace() {
  echo 'hi'
  git status --untracked-files=no --porcelain
}
# 3. git checkout master
resetMaster() {
  git checkout master
  git pull origin master

}
# 4. npm run lerna version -- --no-git-tag-version --no-push --preid prerelease
#    - Choose the appropriate version bump type for the release you’re publishing.
#    - if bumping a prerelease version (example: from 1.0.0-prerelease.2 to 1.0.0-prerelease.3), choose Custom Prerelease
bumpVersion() {
  npm run lerna version -- --no-git-tag-version --no-push --preid="$PRERELEASE_PREFIX"
}
# 5. create a branch named “release/$NEW_VERSION” (example: “release/1.0.0-prerelease.3”)
# 6. npm install && npm run build && git add elements/*/*.{js,map,css} -f
# 7. git commit -am “$NEW_VERSION”
# 8. git tag “v$NEW_VERSION”
# 9. Remove the bundle files with this monstrosity:
#    - for e in elements/*; do find $e -maxdepth 1 \( -not -name "gulpfile.js" -not -name "rollup.config.js" \) \( -name "*.js" -or -name "*.css" -or -name "*.map" \) -exec git rm -f {} \; ;done
# 10. git commit -am “remove bundles from $NEW_VERSION”
# 11. git push origin release/$NEW_VERSION -u
# 12. git push --tags
# 13. git checkout master
# 14. git reset --hard origin/master
# 15. create a PR for the branch you just created
# 16. delete branch after merging PR
# 17. To publish to npm:
#    - git checkout v$NEW_VERSION
#    - npm run lerna publish from-git


checkDir
cleanWorkspace
