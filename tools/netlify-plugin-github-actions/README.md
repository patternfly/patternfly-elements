# Netlify Plugin GitHub Actions Webhook

Trigger a GitHub Actions workflow when a Netlify build succeeds.

## Inputs

| name       | description                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| owner      | Github repository owner (scope). e.g. for `https://github.com/actions/netlify`, the `owner` is `"actions"` |
| repository | Github repository name. e.g. for `https://github.com/actions/netlify`, the `repository` is `"netlify"`     |
| workflowId | Name of the workflow file e.g. `"visual-regression.yml"` or the workflow id number e.g. `42`               |

## Example `netlify.toml`

```toml
[[plugins]]
  package = "/tools/netlify-plugin-github-actions"

  [plugins.inputs]
    owner = "patternfly"
    repository = "patternfly-elements"
    workflowId = "visual-regression.yml"
```

## Outputs

The body of the webhook contains the following inputs.
Use them in your github workflow by reading from `${{ github.event.inputs.deployPrimeUrl }}`, for example.

| input               | description                                                                                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| branch              | The git branch the netlify build ran on                                                                                                                                                                                                 |
| head                | Name of the head branch netlify received from a Git provider.                                                                                                                                                                           |
| issueNumber         | The PR number for the deploy preview, if applicable                                                                                                                                                                                     |
| netlifyBuildContext | Name of the netlify build’s deploy context. It can be `production`, `deploy-preview` or `branch-deploy`.                                                                                                                                |
| netlifyBuildId      | Unique ID for the netlify build; for example: `5d4aeac2ccabf517d2f219b8`.                                                                                                                                                               |
| url                 | This URL represents the main address to your site. It can be either a Netlify subdomain or your own custom domain if you set one; for example, <https://petsof.netlify.app> or <https://www.petsofnetlify.com>.                         |
| deployUrl           | This URL represents the unique URL for an individual deploy. It starts with a unique ID that identifies the deploy; for example, <https://5b243e66dd6a547b4fee73ae--petsof.netlify.app>.                                                |
| deployPrimeUrl      | This URL represents the primary URL for an individual deploy, or a group of them, like branch deploys and Deploy Previews; for example, <https://feature-branch--petsof.netlify.app> or <https://deploy-preview-1--petsof.netlify.app>. |

## Example Workflow

```yml
name: Visual Regression Tests
on:
  workflow_dispatch:
    inputs:
      deployPrimeUrl:
        description: Origin to test, e.g. https://deploy-preview-1804--patternfly-elements.netlify.app/
        required: true

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
      - run: npm ci --prefer-offline
      - name: Visual Regression Tests
        run: npx playwright test
        env:
          VISUAL_REGRESSION_ORIGIN: ${{ github.event.inputs.deployPrimeUrl }}

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Lighthouse CI Action
        uses: treosh/lighthouse-ci-action@v8
        with:
          configPath: .lighthouserc.yml
          uploadArtifacts: true # save results as an action artifacts
          urls:
            ${{ github.event.inputs.deployPrimeUrl }}
            ${{ github.event.inputs.deployPrimeUrl }}/core/styles/demo/
```
