import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeCodeBlock } from '@patternfly/elements/pfe-code-block/pfe-code-block.js';

const element = html`
  <pfe-code-block id="code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo0oooo00ooo
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pfe-clipboard slot="actions" copy-from="#code"></pfe-clipboard>
  </pfe-code-block>
`;

const expandElement = html`
  <pfe-code-block id="expandable-code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pfe-clipboard slot="actions" copy-from="#expandable-code"></pfe-clipboard>
  </pfe-code-block>
`;

const expandElementByDefault = html`
  <pfe-code-block id="expandable-code-expanded" expanded>
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pfe-clipboard slot="actions" copy-from="#expandable-code-expanded"></pfe-clipboard>
  </pfe-code-block>
`;

describe('<pfe-code-block>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeCodeBlock>(element);
    const klass = customElements.get('pfe-code-block');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeCodeBlock);
  });

  it('should not show a "Show more" button by default', async function() {
    const el = await createFixture <PfeCodeBlock>(element);
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.hidden).to.be.true;
  });

  it('should show a "Show more" button if content is present in the expandable-code slot', async function() {
    const expandEl = await createFixture<PfeCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expect(expandButton).to.not.be.null;
  });

  it('should expand the code block when the "Show more" button is clicked', async function() {
    const expandEl = await createFixture<PfeCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandEl.hasAttribute('expanded')).to.be.true;
    expect(expandButton?.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should toggle the "Show more" button text to "Show less" when the button is clicked', async function() {
    const expandEl = await createFixture<PfeCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });

  it('should be expanded by default if the expanded attribute is present on render', async function() {
    const expandByDefaultEl = await createFixture<PfeCodeBlock>(expandElementByDefault);
    const expandButton = expandByDefaultEl.shadowRoot?.querySelector('button');
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });
});
