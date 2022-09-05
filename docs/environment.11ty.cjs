module.exports = class Environment {
  data = { permalink: '/tools/environment.js' };

  async render() {
    const { makeDemoEnv } = await import('@patternfly/pfe-tools/esbuild-plugins/pfe-env.js');
    return makeDemoEnv();
  }
};
