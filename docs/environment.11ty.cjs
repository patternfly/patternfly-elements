module.exports = class Environment {
  get data() {
    return { permalink: '/tools/environment.js' };
  }

  async render() {
    const { makeDemoEnv } = await import('@patternfly/pfe-tools/environment.js');
    return makeDemoEnv();
  }
};
