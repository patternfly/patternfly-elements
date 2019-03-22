var Context = function(app, $el, name, id)
{
    this.app = app;
    this.opts = app.opts;

    // build
    this.moduleName = name;
    this.$element = this._buildElement($el);
    this.params = this._buildParams();
    this.name = this._buildName();
    this.$target = this._buildTarget();
};

Context.prototype = {
    // public
    getElement: function()
    {
        return this.$element;
    },
    getTarget: function()
    {
        return this.$target;
    },
    getParams: function(defaults)
    {
        return (defaults) ? $K.extend({}, defaults, this.params) : this.params;
    },
    getName: function()
    {
        return this.name;
    },
    // private
    _buildName: function()
    {
        return (this.params.name) ? this.params.name : this.$element.attr('id');
    },
    _buildParams: function()
    {
        return $K.create('service.options', this.app, 'element', this.$element);
    },
    _buildElement: function($el)
    {
        return new KubeElement(this.app, $el, this.moduleName);
    },
    _buildTarget: function()
    {
        return new Target(this.app, this.params.target, this.moduleName);
    }
};