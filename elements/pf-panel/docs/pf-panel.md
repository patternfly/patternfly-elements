{% renderOverview %}
<pf-panel>
  <p>Main content</p>
</pf-panel>
{% endrenderOverview %}

{% band header="Usage" %}

<h3>Header</h3>
<pf-panel>
  <h3 slot="header">Header content</h3>
  <p>Main content</p>
</pf-panel>

```html
<pf-panel>
  <h3 slot="header">Header content</h3>
  <p>Main content</p>
</pf-panel>
```

<h3>Header</h3>
<pf-panel>
  <p>Main content</p>
  <p slot="footer">Footer content</p>
</pf-panel>

```html
<pf-panel>
  <p>Main content</p>
  <p slot="footer">Footer content</p>
</pf-panel>
```

<h3>Header and footer</h3>
<pf-panel>
  <h3 slot="header">Header content</h3>
  <p>Main content</p>
  <p slot="footer">Footer content</p>
</pf-panel>

```html
<pf-panel>
  <h3 slot="header">Header content</h3>
  <p>Main content</p>
  <p slot="footer">Footer content</p>
</pf-panel>
```

<h3>Raised</h3>
<pf-panel variant="raised">
  <p>Main content</p>
</pf-panel>

```html
<pf-panel variant="raised">
  <p>Main content</p>
</pf-panel>
```

<h3>Bordered</h3>
<pf-panel variant="bordered">
  <p>Main content</p>
</pf-panel>

```html
<pf-panel variant="bordered">
  <p>Main content</p>
</pf-panel>
```

<h3>Scrollable</h3>
<pf-panel scrollable>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
</pf-panel>

```html
<pf-panel scrollable>
  <p>
    Long content...
  </p>
</pf-panel>
```

<h3>Scrollable with header and footer</h3>
<pf-panel scrollable>
<h3 slot="header">Header content</h3>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
  <p>
  A couple of years ago the Computer Science Club at Bishop's University
  ran into a problem. Our student run computer lab was running
  unlicensed copies of a propriety operating system. The computers also
  had many unlicensed programs installed. It was a big mess. At that
  time we had to make an ethical decision. We had to decide whether we
  wanted to continue breaking the law or not. We decided against running
  software for which we didn't have licenses as it could lead to the lab
  being closed.
  </p>
  <p slot="footer">Footer content</p>
</pf-panel>

```html
<pf-panel scrollable>
  <h3 slot="header">Header content</h3>
  <p>
    Long content...
  </p>
  <p slot="footer">Footer content</p>
</pf-panel>
```

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
