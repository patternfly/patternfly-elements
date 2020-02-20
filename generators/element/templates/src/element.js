import PFElement from "<%= pfeElementLocation %>";

class <%= elementClassName %> extends PFElement {
  static get tag() {
    return "<%= elementName %>";
  }

  get styleUrl() {
<%_ if (useSass) { _%>
    return "<%= elementName %>.scss";
<%_ } else { _%>
    return "<%= elementName %>.css";
<%_ } _%>
  }

  get templateUrl() {
    return "<%= elementName %>.html";
  }

  get schemaUrl() {
    return "<%= elementName %>.json";
  }

<%_ if (events.length > 0) { _%>
  static get events() {
    return {<% for(let i = 0; i < events.length; i++) { %>
      <%= events[i] %>: `${this.tag}:<%= events[i] %>`<% if (i < (events.length - 1)) { %>,<% } } %>
    };
  }<% } %>

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.<%= _.capitalize(template_type) %>;
  }

<%_ if (attributes.length > 0) { _%>
  static get observedAttributes() {
    return [<% if (isPfelement) { %><%- _.join(attributes.map(item => `"pfe-${item}"`), ", ") %><% } else { %><%- _.join(attributes.map(item => `"${item}"`), ", ") %><% } %>];
  }
<%_ } else { _%>
  // static get observedAttributes() {
  //   return [];
  // }
<%_ } _%>

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.<%= _.capitalize(template_type) %>;
  }

  constructor() {
    super(<%= elementClassName %>, { type: <%= elementClassName %>.PfeType });
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this._<%= slots[i] %> = this.shadowRoot.querySelector(`.${this.tag}__<%= slots[i] %>`);
    <%_ } } _%>
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this.<%= slots[i] %> = this.querySelector(`[slot="${this.tag}--<%= slots[i] %>"]`);
    <%_ } _%>
    <%_ for(let i = 0; i < slots.length; i++) { %>
    // Add a slotchange listener to the lightDOM trigger
    // this.<%= slots[i] %>.addEventListener("slotchange", this._init);
    <%_ } _%>
    <%_ } _%>

    <%_ for(let i = 0; i < events.length; i++) { _%>
    this.addEventListener(<%= elementClassName %>.events.<%= events[i] %>, this._<%= events[i] %>Handler);
    <%_ } _%>
  }

  disconnectedCallback() {
    <%_ for(let i = 0; i < events.length; i++) { _%>
    this.removeEventListener(<%= elementClassName %>.events.<%= events[i] %>, this._<%= events[i] %>Handler);
    <%_ } _%>
  }

<%_ if (attributes.length > 0) { _%>
  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
<%_ } else { _%>
  // attributeChangedCallback(attr, oldValue, newValue) {}
<%_ } _%>

<%_ for(let i = 0; i < events.length; i++) { _%>
  _<%= events[i] %>Handler(event) {
    this.emitEvent(<%= elementClassName %>.events.<%= events[i] %>, {
      detail: {}
    });
  }
<%_ } _%>
}

PFElement.create(<%= elementClassName %>);

export default <%= elementClassName %>;
