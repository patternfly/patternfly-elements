import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5CodeBlock } from '@patternfly/elements/pf-v5-code-block/pf-v5-code-block.js';

const element = html`
  <pf-v5-code-block id="code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo0oooo00ooo
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-v5-clipboard-copy slot="actions" copy-from="#code"></pf-v5-clipboard-copy>
  </pf-v5-code-block>
`;

const expandElement = html`
  <pf-v5-code-block id="expandable-code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-v5-clipboard-copy slot="actions" copy-from="#expandable-code"></pf-v5-clipboard-copy>
  </pf-v5-code-block>
`;

const expandElementByDefault = html`
  <pf-v5-code-block id="expandable-code-expanded" expanded>
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo</script><script type="application/openshift" data-expand>
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-v5-clipboard-copy slot="actions" copy-from="#expandable-code-expanded"></pf-v5-clipboard-copy>
  </pf-v5-code-block>
`;

describe('<pf-v5-code-block>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-code-block')).to.be.an.instanceof(PfV5CodeBlock);
  });

  it('should upgrade', async function() {
    const el = await createFixture <PfV5CodeBlock>(element);
    const klass = customElements.get('pf-v5-code-block');
    expect(el)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfV5CodeBlock);
  });

  it('should not show a "Show more" button by default', async function() {
    const el = await createFixture <PfV5CodeBlock>(element);
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.hidden).to.be.true;
  });

  it('should show a "Show more" button if content is present in the expandable-code slot', async function() {
    const expandEl = await createFixture<PfV5CodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expect(expandButton).to.not.be.null;
  });

  it('should expand the code block when the "Show more" button is clicked', async function() {
    const expandEl = await createFixture<PfV5CodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandEl.hasAttribute('expanded')).to.be.true;
    expect(expandButton?.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should toggle the "Show more" button text to "Show less" when the button is clicked', async function() {
    const expandEl = await createFixture<PfV5CodeBlock>(expandElement);
    const expandButton = expandEl.shadowRoot?.querySelector('button');
    expandButton?.click();
    await nextFrame();
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });

  it('should be expanded by default if the expanded attribute is present on render', async function() {
    const expandByDefaultEl = await createFixture<PfV5CodeBlock>(expandElementByDefault);
    const expandButton = expandByDefaultEl.shadowRoot?.querySelector('button');
    expect(expandButton?.textContent?.trim()).to.equal('Show less');
  });
});
