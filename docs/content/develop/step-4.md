+++
title = "Publish"
description = ""
weight = 9
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

We've been publishing our PatternFly Elements to the [@patternfly organization](https://www.npmjs.com/org/patternfly) on npm.

To roll a new release, use the following steps:

1. Start in the root directory of the patternfly-elements project.
2. Check out the master branch and pull down the latest: `git checkout master && git pull`.
3. To have lerna bump the verions, run: `npm run lerna version -- --no-git-tag-version --no-push --preid prerelease`.
    - Choose the appropriate version bump type for the release you're publishing:
        - if bumping a prerelease version (example: from 1.0.0-prerelease.2 to 1.0.0-prerelease.3), choose *Custom Prerelease*
4. Assign that version to this variable for use below: `$NEW_VERSION: 1.0.0-prerelease.3`.
5. Create a new branch: `git checkout -b release/$NEW_VERSION` (example: release/1.0.0-prerelease.3).
5. Run a fresh install, build all the assets, and then force add those assets for the tag release:
    - `npm install && npm run build && git add elements/*/*.{js,map,css} -f`
6. Commit the updates: `git commit -am "$NEW_VERSION"`
7. Roll the tag: `git tag "v$NEW_VERSION"`
8. Remove the bundle files:
    - `for e in elements/*; do git rm -f elements/$(basename $e)/$(basename $e).{js,css,map}; done`
9. Commit: `git commit -am "Remove bundles from $NEW_VERSION"`
10. Push up to origin: `git push origin release/$NEW_VERSION -u`
11. Push up the tag: `git push --tags`
12. Checkout master and reset:
    - `git checkout master`
    - `git reset --hard origin/master`
13. Create a PR for the branch you just created: [https://github.com/patternfly/patternfly-elements/compare](https://github.com/patternfly/patternfly-elements/compare)
14. Delete branch after merging PR.
15. To publish to npm (you will have to have the right credentials to do this):
    - `git checkout v$NEW_VERSION`
    - `npm run lerna publish from-git`
