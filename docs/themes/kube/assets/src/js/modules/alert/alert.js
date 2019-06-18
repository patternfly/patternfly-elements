(function($K)
{
    $K.add('module', 'alert', {
        init: function(app, context)
        {
            this.app = app;
            this.animate = app.animate;

            // context
            this.context = context;
            this.$element = context.getElement();
        },
        // events
        onclick: function(e, element, type)
        {
            if (type === 'close')
            {
                this.close(e);
            }
        },
        // public
        open: function(e)
        {
            if (this.$element.isOpened()) return;
            if (e) e.preventDefault();

            this.app.broadcast('alert.open', this);
            this.animate.run(this.$element, 'fadeIn', this._opened.bind(this));
        },
        close: function(e)
        {
            if (this.$element.isClosed()) return;
            if (e) e.preventDefault();

            this.app.broadcast('alert.close', this);
            this.animate.run(this.$element, 'fadeOut', this._closed.bind(this));
        },

        // private
        _opened: function()
        {
            this.app.broadcast('alert.opened', this);
        },
        _closed: function()
        {
            this.app.broadcast('alert.closed', this);
        }
    });
})(Kube);