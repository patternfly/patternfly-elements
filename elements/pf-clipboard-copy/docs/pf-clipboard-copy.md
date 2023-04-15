{% renderOverview %}
  <div class="pf-clipboard-example">
    <pf-clipboard-copy value="This is editable"></pf-clipboard-copy>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  <div class="pf-clipboard-example">
    <h3>Read-only</h3>
    <div class="example-preview">
    <pf-clipboard-copy readonly value="This is read-only"></pf-clipboard-copy>
    </div>
  </div>
  
  ```html
  <pf-clipboard-copy readonly value="This is read-only"></pf-clipboard-copy>
  ```  

  <div class="pf-clipboard-example">
    <h3>Expanded</h3>
    <div class="example-preview">
    <pf-clipboard-copy expandable>
      Got a lot of text here, need to see all of it?
      Click that arrow on the left side and check out the resulting expansion.
    </pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy expandable>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-clipboard-copy>
  ```

  <div class="pf-clipboard-example">
    <h3>Read-only expanded</h3>
    <div class="example-preview">
    <pf-clipboard-copy expandable readonly>
      Got a lot of text here, need to see all of it?
      Click that arrow on the left side and check out the resulting expansion.
    </pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy expandable readonly>
    Got a lot of text here, need to see all of it?
    Click that arrow on the left side and check out the resulting expansion.
  </pf-clipboard-copy>
  ```

  <div class="pf-clipboard-example">
    <h3>Read-only expanded by default</h3>
    <div class="example-preview">
    <pf-clipboard-copy expandable readonly expanded>
      <p>Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.</p>
      <p>asodifna osdif</p>
    </pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy expandable readonly expanded>
    <p>Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.</p>
    <p>asodifna osdif</p>
  </pf-clipboard-copy>
  ```

  <div class="pf-clipboard-example">
    <h3>JSON object (pre-formatted code)</h3>
    <div class="example-preview">
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
    </div>
  </div>

  ```html
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
  ```

  <div class="pf-clipboard-example">
    <h3>Inline compact</h3>
    <div class="example-preview">
    <pf-clipboard-copy inline compact>2.3.4-2-redhat</pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy inline compact>2.3.4-2-redhat</pf-clipboard-copy>
  ``` 

  <div class="pf-clipboard-example">
    <h3>Inline compact code</h3>
    <div class="example-preview">
    <pf-clipboard-copy inline compact code>2.3.4-2-redhat</pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy inline compact code>2.3.4-2-redhat</pf-clipboard-copy>
  ``` 

  <div class="pf-clipboard-example">
    <h3>Inline compact with additional action</h3>
    <div class="example-preview">
    <pf-clipboard-copy inline compact>2.3.4-2-redhat
      <pf-button slot="actions" label="Action" plain variant="primary">
        <pf-icon icon="play"></pf-icon>
      </pf-button>
    </pf-clipboard-copy>
    </div>
  </div>

  ```html
  <pf-clipboard-copy inline compact>2.3.4-2-redhat
    <pf-button slot="actions" label="Action" plain variant="primary">
      <pf-icon icon="play"></pf-icon>
    </pf-button>
  </pf-clipboard-copy>
  ```

  <div class="pf-clipboard-example">
    <hgroup>
      <h3>Inline compact in sentence</h3>
    </hgroup>
    <div class="example-preview">
      <h4>Basic</h4>
      <p>Lorem ipsum <pf-clipboard-copy inline compact>2.3.4-2-redhat</pf-clipboard-copy></p>
      <h4>Long copy string</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <pf-clipboard-copy inline compact>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-clipboard-copy> Mauris luctus, libero nec dapibus ultricies, urna purus pretium mauris, ullamcorper pharetra lacus nibh vitae enim.</p>
      <h4>Long copy string in block</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <pf-clipboard-copy compact block>https://app.openshift.io/path/sub-path/sub-sub-path/?runtime=quarkus/12345678901234567890/abcdefghijklmnopqrstuvwxyz1234567890</pf-clipboard-copy> Mauris luctus, libero nec dapibus ultricies, urna purus pretium mauris, ullamcorper pharetra lacus nibh vitae enim.
      </p>
    </div>
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
