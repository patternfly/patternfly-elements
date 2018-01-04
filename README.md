# lerna-test

This is a test to see if we like [lerna][lerna] for managing RHElements packages instead of submodules.

## Quick-start

    git clone git@github.com:RHElements/lerna-test.git
    cd lerna-test
    npm install # this will take a while due to lerna bootstrap
    npm start

## Workflow

 - **npm start** <br> launch a demo server
 - **npm test** <br> run tests on ALL rhelements
 - **npm run build** <br> run build on ALL rhelements
 - **npm run bootstrap** <br> update ALL rhelements' dependencies and interlink them with [lerna bootstrap][lerna-bs]

[lerna]: https://github.com/lerna/lerna
[lerna-bs]: https://github.com/lerna/lerna#bootstrap
