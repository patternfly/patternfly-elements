{% renderOverview %}
  ### Default
  <pfe-codeblock code-language="html">
    <pre codeblock-container>
      <code>
&lt;h1&gt;example html&lt;/h1&gt;
&lt;p&gt;some paragraph text&lt;/p&gt;
      </code>
    </pre>
  </pfe-codeblock>

  ### With a dark theme
  <pfe-codeblock code-language="css" code-theme="dark" code-line-numbers>
    <pre codeblock-container>
      <code>
h1 {
  font-size: 36px;
}
h3 {
  margin-top: 0.83em;
  font-weight: 500;
}
.header-ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
      </code>
    </pre>
  </pfe-codeblock>
{% endrenderOverview %}

{% band header="Usage" %}
### Default
<pfe-codeblock>
  <pre codeblock-container>
    <code>
&lt;h1&gt;example html&lt;/h1&gt;
&lt;p&gt;some paragraph text&lt;/p&gt;
    </code>
  </pre>
</pfe-codeblock>

```html
<pfe-codeblock>
  <pre codeblock-container>
    <code>
&lt;h1&gt;example html&lt;/h1&gt;
&lt;p&gt;some paragraph text&lt;/p&gt;
    </code>
  </pre>
</pfe-codeblock>
```

### Specify a coding language
<pfe-codeblock code-language="javascript">
  <pre codeblock-container>
    <code>
const example="javascript";
let test=null;
    </code>
  </pre>
</pfe-codeblock>

```html
<pfe-codeblock code-language="javascript">
  <pre codeblock-container>
    <code>
const example="javascript";
let test=null;
    </code>
  </pre>
</pfe-codeblock>
```

### Add line numbers
<pfe-codeblock code-language="css" code-line-numbers>
  <pre codeblock-container>
    <code>
h1 {
  font-size: 36px;
}
h3 {
  margin-top: 0.83em;
  font-weight: 500;
}
.header-ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
    </code>
  </pre>
</pfe-codeblock>

```html
<pfe-codeblock code-language="css" code-line-numbers>
  <pre codeblock-container>
    <code>
h1 {
  font-size: 36px;
}
h3 {
  margin-top: 0.83em;
  font-weight: 500;
}
.header-ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
    </code>
  </pre>
</pfe-codeblock>
```

### Start at a specific line number
<pfe-codeblock code-language="css" code-line-numbers code-line-number-start="30">
  <pre codeblock-container>
    <code>
h1 {
  font-size: 36px;
}
h3 {
  margin-top: 0.83em;
  font-weight: 500;
}
.header-ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
    </code>
  </pre>
</pfe-codeblock>

```html
<pfe-codeblock code-language="css" code-line-numbers code-line-number-start="30">
  <pre codeblock-container>
    <code>
h1 {
  font-size: 36px;
}
h3 {
  margin-top: 0.83em;
  font-weight: 500;
}
.header-ctas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
    </code>
  </pre>
</pfe-codeblock>
```

### Use the dark theme
<pfe-codeblock code-language="javascript" code-theme="dark">
  <pre codeblock-container>
    <code>
const example="javascript";
let test=null;
    </code>
  </pre>
</pfe-codeblock>

```html
<pfe-codeblock code-language="javascript" code-theme="dark">
  <pre codeblock-container>
    <code>
const example="javascript";
let test=null;
    </code>
  </pre>
</pfe-codeblock>
```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
