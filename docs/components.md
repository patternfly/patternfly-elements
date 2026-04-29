<script type="module">
  const CLASS_KEY = 'html-lit-react-snippets';
  const LS_KEY = `${CLASS_KEY}-index`;
  document.addEventListener('expand', async function(event) {
    const PfV5Tabs = await customElements.whenDefined('pf-v5-tabs');
    if (PfV5Tabs.isExpandEvent(event)) {
      const tabs = event.tab.closest('pf-v5-tabs');
      if (tabs.classList.contains(CLASS_KEY)) {
        await tabs.updateComplete;
        localStorage.setItem(LS_KEY, tabs.activeIndex);
        update();
      }
    }
  });
  async function update() {
    for (const tabs of document.querySelectorAll(`pf-v5-tabs.${CLASS_KEY}`)) {
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
