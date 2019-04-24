+++
title = "Tagging and Publishing Releases"
description = ""
weight = 9
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

## The release script

These instructions describe how to create a new release of PatternFly Elements.
They are intended for core maintainers who have admin rights to the
[@patternfly][pforg] org on npm.

To tag and publish a new release, run:

```
npm run release
```

Here's a summary of what to expect the release script to do:

 - ask you a question about what version bump type to perform (major, minor, etc)
 - do a fresh npm install
 - do a build
 - create a new branch (ex: `release/v1.0.0`)
 - create a new tag (ex: `v1.0.0`)
 - publish all elements npm (you will be prompted `Y/n` before this happens)
 - create a pull request for the reelase branch
   - the PR will be created automatically if you have [hub][hub] installed, otherwise a link to create the PR will be printed in the terminal
   - the purpose of the pull request is to bring the new version numbers back into `master`

### Version bumps & prereleases

The types of version bumps are more-or-less straightforward.  The least intuitive one is if you want to bump a prerelease version, for example from `1.0.0-prerelease.2` to `1.0.0-prerelease.3`.  In that case only, choose *Custom Prerelease*.

## (Legacy) The Hard Way

Before the release script (above) was created, we published releases using the manual steps below.  They're kept here mostly for posterity, and possibly to make the [release script](https://github.com/patternfly/patternfly-elements/blob/master/scripts/release.sh) more understandable.

To roll a new release, use the following steps:

1. Start in the root directory of the patternfly-elements project.
2. Check out the master branch and pull down the latest: 
    - `git reset --hard && git clean -df && git checkout master && git fetch origin && git pull`
3. To have lerna bump the verions, run: `npm run lerna version -- --no-git-tag-version --no-push --preid prerelease`.
    - Choose the appropriate version bump type for the release you're publishing:
        - if bumping a prerelease version (example: from 1.0.0-prerelease.2 to 1.0.0-prerelease.3), choose *Custom Prerelease*
4. Assign that version to this variable for use below: `$NEW_VERSION="1.0.0-prerelease.3"`.
5. Create a new branch: `git checkout -b release/$NEW_VERSION` (example: release/1.0.0-prerelease.3).
5. Run a fresh install, build all the assets, and then force add those assets for the tag release:
    - `npm install && npm run build && git add elements/*/*.{js,map,css} -f`
6. Commit the updates: `git commit -am "$NEW_VERSION"`
7. Roll the tag: `git tag "v$NEW_VERSION"`
8. Remove the bundle files:
    - `for e in elements/*; do find $e -maxdepth 1 \( -not -name "gulpfile.js" -not -name "rollup.config.js" \) \( -name "*.js" -or -name "*.css" -or -name "*.map" \) -exec git rm -f {} \; ;done`
9. Commit: `git commit -am "Remove bundles from $NEW_VERSION"`
10. Push up to origin: `git push origin release/$NEW_VERSION -u`
11. Push up the tag: `git push --tags`
12. Checkout master and reset:
    - `git checkout master`
    - `git reset --hard origin/master`
13. [Create a pull request](https://github.com/patternfly/patternfly-elements/compare) for the branch you just created.
14. Delete branch after merging pull request:
    - `git branch -D release/$NEW_VERSION`
15. To publish to npm (you will have to have the right credentials to do this):
    - Checkout the tag release you just rolled: `git checkout v$NEW_VERSION`
    - From that code, run the lerna publishing task: `npm run lerna publish from-git`

[pforg]: https://www.npmjs.com/org/patternfly
[hub]: https://hub.github.com
