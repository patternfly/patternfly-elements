{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  <pf-v5-clipboard-copy value="This is editable"></pf-v5-clipboard-copy>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Read-only
  {% htmlexample %}
  <pf-v5-clipboard-copy readonly value="This is read-only"></pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Expanded
  {% htmlexample %}
  <pf-v5-clipboard-copy expandable>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Read-only expanded
  {% htmlexample %}
  <pf-v5-clipboard-copy expandable readonly>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Read-only expanded by default
  {% htmlexample %}
  <pf-v5-clipboard-copy expandable readonly expanded>
    <p>Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.</p>
    <p>asodifna osdif</p>
  </pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### JSON object (pre-formatted code)
  {% htmlexample %}
  <pf-v5-clipboard-copy code expandable expanded>
    { "menu": {
      "id": "file",
      "value": "File",
      "popup": {
        "menuitem": [
          {"value": "New", "onclick": "CreateNewDoc()"},
          {"value": "Open", "onclick": "OpenDoc()"},
          {"value": "Close", "onclick": "CloseDoc()"}
        ]
      }
    }}
  </pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact
  {% htmlexample %}
  <pf-v5-clipboard-copy inline compact>2.3.4-2-redhat</pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact code
  {% htmlexample %}
  <pf-v5-clipboard-copy inline compact code>2.3.4-2-redhat</pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact with additional action
  {% htmlexample %}
  <pf-v5-clipboard-copy inline compact>2.3.4-2-redhat
    <pf-v5-button slot="actions" label="Action" plain variant="primary">
      <pf-v5-icon icon="play"></pf-v5-icon>
    </pf-v5-button>
  </pf-v5-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact in sentence
  #### Basic
  {% htmlexample %}
  <p>Lorem ipsum <pf-v5-clipboard-copy inline compact>2.3.4-2-redhat</pf-v5-clipboard-copy></p>
  {% endhtmlexample %}

  #### Long copy string
  {% htmlexample %}
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <pf-v5-clipboard-copy inline compact>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-v5-clipboard-copy> 
  Mauris luctus, libero nec dapibus ultricies, urna purus pretium mauris, 
  ullamcorper pharetra lacus nibh vitae enim.</p>
  {% endhtmlexample %}

  #### Long copy string in block
  {% htmlexample %}
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <pf-v5-clipboard-copy compact block>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-v5-clipboard-copy> 
    Mauris luctus, libero nec dapibus ultricies, urna purus pretium mauris, 
    ullamcorper pharetra lacus nibh vitae enim.
  </p>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
