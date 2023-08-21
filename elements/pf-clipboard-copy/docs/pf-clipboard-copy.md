{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  <pf-clipboard-copy value="This is editable"></pf-clipboard-copy>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Read-only
  {% htmlexample %}
  <pf-clipboard-copy readonly value="This is read-only"></pf-clipboard-copy>
  {% endhtmlexample %}

  ### Expanded
  {% htmlexample %}
  <pf-clipboard-copy expandable>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-clipboard-copy>
  {% endhtmlexample %}

  ### Read-only expanded
  {% htmlexample %}
  <pf-clipboard-copy expandable readonly>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-clipboard-copy>
  {% endhtmlexample %}

  ### Read-only expanded by default
  {% htmlexample %}
  <pf-clipboard-copy expandable readonly expanded>
    <p>Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.</p>
    <p>asodifna osdif</p>
  </pf-clipboard-copy>
  {% endhtmlexample %}

  ### JSON object (pre-formatted code)
  {% htmlexample %}
  <pf-clipboard-copy code expandable expanded>
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
  </pf-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact
  {% htmlexample %}
  <pf-clipboard-copy inline compact>2.3.4-2-redhat</pf-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact code
  {% htmlexample %}
  <pf-clipboard-copy inline compact code>2.3.4-2-redhat</pf-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact with additional action
  {% htmlexample %}
  <pf-clipboard-copy inline compact>2.3.4-2-redhat
    <pf-button slot="actions" label="Action" plain variant="primary">
      <pf-icon icon="play"></pf-icon>
    </pf-button>
  </pf-clipboard-copy>
  {% endhtmlexample %}

  ### Inline compact in sentence
  #### Basic
  {% htmlexample %}
  <p>Lorem ipsum <pf-clipboard-copy inline compact>2.3.4-2-redhat</pf-clipboard-copy></p>
  {% endhtmlexample %}

  #### Long copy string
  {% htmlexample %}
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <pf-clipboard-copy inline compact>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-clipboard-copy> 
  Mauris luctus, libero nec dapibus ultricies, urna purus pretium mauris, 
  ullamcorper pharetra lacus nibh vitae enim.</p>
  {% endhtmlexample %}

  #### Long copy string in block
  {% htmlexample %}
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <pf-clipboard-copy compact block>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-clipboard-copy> 
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
