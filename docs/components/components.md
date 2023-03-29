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

<header class="band">
  <h1>{{element.title}}</h1>
</header>

{% renderFile element.docsTemplatePath, element %}
