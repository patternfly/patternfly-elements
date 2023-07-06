import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfCodeBlock } from '@patternfly/elements/pf-code-block/pf-code-block.js';

const element = html`
  <pf-code-block id="code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo0oooo00ooo
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-clipboard-copy slot="actions" copy-from="#code"></pf-clipboard-copy>
  </pf-code-block>
`;

const expandElement = html`
  <pf-code-block id="expandable-code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-clipboard-copy slot="actions" copy-from="#expandable-code"></pf-clipboard-copy>
  </pf-code-block>
`;

const expandElementByDefault = html`
  <pf-code-block id="expandable-code-expanded" expanded>
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-clipboard-copy slot="actions" copy-from="#expandable-code-expanded"></pf-clipboard-copy>
  </pf-code-block>
`;

describe('<pf-code-block>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-code-block')).to.be.an.instanceof(PfCodeBlock);
  });

  it('should upgrade', async function() {
    const el = await createFixture <PfCodeBlock>(element);
    const klass = customElements.get('pf-code-block');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfCodeBlock);
  });

  it('should not show a "Show more" button by default', async function() {
    const el = await createFixture <PfCodeBlock>(element);
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.hidden).to.be.true;
  });

  it('should show a "Show more" button if content is present in the expandable-code slot', async function() {
    const expandEl = await createFixture<PfCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expect(expandButton).to.not.be.null;
  });

  it('should expand the code block when the "Show more" button is clicked', async function() {
    const expandEl = await createFixture<PfCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandEl.hasAttribute('expanded')).to.be.true;
    expect(expandButton?.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should toggle the "Show more" button text to "Show less" when the button is clicked', async function() {
    const expandEl = await createFixture<PfCodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });

  it('should be expanded by default if the expanded attribute is present on render', async function() {
    const expandByDefaultEl = await createFixture<PfCodeBlock>(expandElementByDefault);
    const expandButton = expandByDefaultEl.shadowRoot?.querySelector('button');
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });
});
