---js
{
  layout: 'layout-basic.njk',
  templateEngineOverride: 'njk,md',
  tags: ['component'],
  permalink: '/components/{{ element.slug }}/index.html',
  package: '{{ element.package }}',
  description: '{{ element.description }}',
  pagination: {
    data: 'elements',
    size: 1,
    alias: 'element',
    before: xs => xs.filter(x => !!x.docsTemplatePath),
  }
}
---

<script type="module">
  const LS_KEY = 'html-lit-react-snippets-index';
  document.addEventListener('expand', async function(event) {
    const PfTabs = await customElements.whenDefined('pf-tabs');
    if (PfTabs.isExpandEvent(event)) {
      const tabs = event.target.closest('pf-tabs');
      await tabs.updateComplete;
      debugger;
      localStorage.setItem(LS_KEY, tabs.activeIndex);
      update();
    }
  });
  async function update() {
    for (const tabs of document.querySelectorAll('pf-tabs.html-lit-react-snippets')) {
      await tabs.updateComplete;
      tabs.activeIndex = parseInt(localStorage.getItem(LS_KEY) ?? '0');
    }
  }
  update();
</script>

<header class="band">
  <h1>{{element.title}}</h1>

  {{ element.description | safe}}

</header>

{% renderFile element.docsTemplatePath, element %}
