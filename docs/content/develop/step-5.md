+++
title = "Publishing Releases"
description = ""
weight = 10
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++


## Release Tag, Docs, & Storybook Updates


### I. Get the latest from master locally, clean up



1. `git status`
    1. Check where you are
2. `git checkout master && git fetch origin && git pull origin`
    2. Grab master from origin
3. `npm run clean`
    3. Wipes node_modules directory and deletes any components not in master
    4. what this does:
    5. rm -rf node_modules package-lock.json
    6. rm -rf node_modules
4. `git reset --hard && git clean -df`
    7. Remove any non-committed files, crufty directories
5. `npm install`
    8. Installs all dependencies fresh
6. `git checkout -b temp`
    9. Create temp branch


### III. Update (changelog_) _and docs



7. `git log --oneline --decorate --no-merges v$(node -e 'console.log(require("./lerna.json").version)')..`
    10. See the diffs of what was merged between now & the last release
    11. Or look at PR merged list with "last-updated" sort order: \
[https://github.com/patternfly/patternfly-elements/pulls?q=is%3Apr+is%3Aclosed+sort%3Aupdated-desc](https://github.com/patternfly/patternfly-elements/pulls?q=is%3Apr+is%3Aclosed+sort%3Aupdated-desc)
8. Update the file `CHANGELOG-prerelease.md` and save
9. <span style="text-decoration:underline;">Search</span> for release tag string in /docs/layout directory i.e. "prerelease.19" and update to release number \

<img src="/version_storybook.png" width="450"/>

10. `git add * && git commit -m "chore(bump): bump version in docs"`
    12. Commit changes, don't push


### IV. Create release branch & tag

1. `npm run release`

    This script will do the following:

    1. Create release branch
    2. Create compiled assets and commit them
    3. Uses [lerna](https://lerna.js.org) to guess at what the next release will be
        1. **Choose "custom prerelease" (for now)**
        2. It bumps the version numbers inside the package.json files in the components (currently all components are bumped, will fix)
    4. Pushes the branch
    5. Pushes independent tags for each component and pushes to NPM
    6. Remove compiled assets
    7. Returns you to the master branch


### V. Github Updates



1. Create a PR
2. Get someone to review 
3. Merge the release branch [pull request](https://github.com/patternfly/patternfly-elements/pulls) into master.  Note: this must be a regular merge.  _Do not squash!_
4. **Add release notes to the [tag](https://github.com/patternfly/patternfly-elements/releases) in Github**


### VI. Deploy storybook & docs (must do this after PR is merged)



1. `git checkout master && git fetch origin && git pull origin`
    1. Grab the latest from master, which now has the new release
2. `npm run build`
3. Need to test the docs first?
    2. `cd /docs`
    3. `hugo server`
4. `npm run deploy-docs`
    4. Create compiled assets
    5. Builds & deploys storybook to [https://patternfly.org/patternfly-elements/demo](https://patternfly.org/patternfly-elements/demo)
    6. Deploys docs to github pages [https://patternfly.github.io/patternfly-elements](https://patternfly.github.io/patternfly-elements)
        1. (use incognito to check & see if version number is bumped)


### VII. Send [patternfly-elements-announce@redhat.com](mailto:patternfly-elements-announce@redhat.com) email

```
Greetings! 

There is a new release tag for PatternFly Elements,  [v1.0.0-prerelease.36](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.36), which includes



*  You can preview the new components on the [storybook demo page.](https://patternfly.github.io/patternfly-elements/demo/?knob-Theme=light&knob-Count=5&selectedKind=Accordion&selectedStory=pfe-accordion&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs)  

… other details

Thanks for your continued support of the project!  #usetheplatform

---

[https://www.redhat.com/mailman/private/patternfly-elements-announce](https://www.redhat.com/mailman/private/patternfly-elements-announce)

```

<hr/>

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
