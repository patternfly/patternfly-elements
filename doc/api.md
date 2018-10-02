## Classes

<dl>
<dt><a href="#RhCard">RhCard</a></dt>
<dd><p>The class for <code>&lt;rh-card&gt;</code>.</p>
</dd>
<dt><a href="#RHElement">RHElement</a></dt>
<dd><p>RHElement base class.</p>
</dd>
</dl>

<a name="RhCard"></a>

## RhCard
The class for `<rh-card>`.

**Kind**: global class  

* [RhCard](#RhCard)
    * _instance_
        * [.styleUrl](#RhCard+styleUrl)
        * [.templateUrl](#RhCard+templateUrl)
    * _static_
        * [.tag](#RhCard.tag)

<a name="RhCard+styleUrl"></a>

### &lt;rh-card&gt;.styleUrl
The path to this element's SCSS or CSS file.

**Kind**: instance property of [<code>RhCard</code>](#RhCard)  
<a name="RhCard+templateUrl"></a>

### &lt;rh-card&gt;.templateUrl
The path to this element's HTML template.

**Kind**: instance property of [<code>RhCard</code>](#RhCard)  
<a name="RhCard.tag"></a>

### RhCard.tag
This element's HTML tag.

**Kind**: static property of [<code>RhCard</code>](#RhCard)  
<a name="RHElement"></a>

## RHElement
RHElement base class.

**Kind**: global class  

* [RHElement](#RHElement)
    * [new RHElement(rhClass)](#new_RHElement_new)
    * _instance_
        * [.rhType](#RHElement+rhType)
        * [._queueConnectedAction()](#RHElement+_queueConnectedAction)
    * _static_
        * [.RhTypes](#RHElement.RhTypes)
        * [.create()](#RHElement.create)

<a name="new_RHElement_new"></a>

### new RHElement(rhClass)

| Param | Type | Description |
| --- | --- | --- |
| rhClass | [<code>RHElement</code>](#RHElement) | A class that extends the RHElement base class. |

<a name="RHElement+rhType"></a>

### rhElement.rhType
**Kind**: instance property of [<code>RHElement</code>](#RHElement)  
<a name="RHElement+_queueConnectedAction"></a>

### rhElement._queueConnectedAction()
Queue up an action.  The action will be executed when the element is added to the DOM (ie, when the connectedCallback fires).

**Kind**: instance method of [<code>RHElement</code>](#RHElement)  
<a name="RHElement.RhTypes"></a>

### RHElement.RhTypes
The component types.

**Kind**: static property of [<code>RHElement</code>](#RHElement)  
<a name="RHElement.create"></a>

### RHElement.create()
Create and register a RHElement with the customElements registry.

**Kind**: static method of [<code>RHElement</code>](#RHElement)  
