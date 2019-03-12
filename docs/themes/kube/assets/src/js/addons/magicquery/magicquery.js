(function($K)
{
    $K.add('module', 'magicquery', {
        init: function(app, context)
        {
            this.app = app;
            this.response = app.response;

            // defaults
            var defaults = {
                url: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },
        // public
        start: function()
        {
            this.$element.on('click.kube.magicquery', this._send.bind(this));
        },
        stop: function()
        {
            this._enable();
            this.$element.off('.kube.magicquery');
        },

        // private
        _disable: function()
        {
            this.$element.attr('disabled', true);
        },
        _enable: function()
        {
            this.$element.removeAttr('disabled');
        },
        _send: function(e)
        {
            e.preventDefault();
            this._disable();

            $K.ajax.post({
    			url: this.params.url,
    			success: this._parse.bind(this)
    		});
        },
        _parse: function(data)
        {
            this._enable();

            var json = this.response.parse(data);
            if (json)
            {
    			this.app.broadcast('magicquery.success', this, json);
    		}
        },
    });
})(Kube);