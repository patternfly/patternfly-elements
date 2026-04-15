<script type="module">
  const CLASS_KEY = 'html-lit-react-snippets';
  const LS_KEY = `${CLASS_KEY}-index`;
  document.addEventListener('expand', async function(event) {
    const PfTabs = await customElements.whenDefined('pf-tabs');
    if (PfTabs.isExpandEvent(event)) {
      const tabs = event.tab.closest('pf-tabs');
      if (tabs.classList.contains(CLASS_KEY)) {
        await tabs.updateComplete;
        localStorage.setItem(LS_KEY, tabs.activeIndex);
        update();
      }
    }
  });
  async function update() {
    for (const tabs of document.querySelectorAll(`pf-tabs.${CLASS_KEY}`)) {
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
