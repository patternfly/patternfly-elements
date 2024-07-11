import { Octokit } from '@octokit/core';

/**
 * netlify plugin which posts a message to the associated github PR thread
 * @param {object} opts
 * @param {object} opts.netlifyConfig netlify project config
 * @param {object} opts.inputs owner, repository, and workflowId
 * @param {object} opts.utils octokit utils
 */
export async function onSuccess({ netlifyConfig, inputs, utils }) {
  const {
    BRANCH: branch,
    BUILD_ID: netlifyBuildId,
    CACHED_COMMIT_REF,
    COMMIT_REF: ref = CACHED_COMMIT_REF ?? branch,
    CONTEXT: netlifyBuildContext,
    DEPLOY_PRIME_URL: deployPrimeUrl,
    DEPLOY_URL: deployUrl,
    URL: url,
    GITHUB_PAT: auth,
    HEAD: head,
    REVIEW_ID: issueNumber,
  } = netlifyConfig.build.environment ?? {};

  const { owner, repository, workflowId } = inputs;

  const octokit = new Octokit({ auth });

  try {
    await octokit
        .request('POST /repos/{owner}/{repository}/actions/workflows/{workflowId}/dispatches', {
          owner,
          ref,
          repository,
          workflowId,
          inputs: {
            branch,
            head,
            issueNumber,
            netlifyBuildContext,
            netlifyBuildId,
            deployPrimeUrl,
            deployUrl,
            url,
          },
        });
  } catch (error) {
    if (error.status === 404) {
      utils.build.failPlugin(`${error.response.data.message}. See${error.response.data.documentation_url}`);
    } else {
      utils.build.failPlugin(error.message);
    }
  }
}
