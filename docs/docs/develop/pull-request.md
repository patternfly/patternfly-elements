---
layout: layout-basic.html
title: Open a pull request
order: 8
tags:
  - develop
---

::: section header
# {{ title }}
:::

::: section
1. Create a PR using the template provided, ensure all fields are filled out to the best of your ability.
2. If you used the discovery template, please copy that content as necessary into the README.md for that component.
3. Confirm that your component has all attributes and slots documented clearly in the schema and the README file.
4. Update the commit log with a stub for your PR: `- [](https://github.com/patternfly/patternfly-elements/commit/) <name of commit> (#<PR number>)`.  **Please take the time to get the commit hash for the previous item in the list if one exists.**  You can find this by going to [https://github.com/patternfly/patternfly-elements/commits/master](https://github.com/patternfly/patternfly-elements/commits/master) or running `git log --pretty="%H - %s" -n 5` on the master branch.
5. Ensure someone has run through browser testing on all the listed environments in the PR template.  IE11 doesn't have to be pixel-perfect but it should be readable and usable to the best of our abilities.
6. Find someone to code review your branch.
7. Once approved and all tests are passing, run a squash merge following [conventional commit standards](https://www.conventionalcommits.org) into master.
:::