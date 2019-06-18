(function($K)
{
    $K.add('module', 'toggle', {
        init: function(app, context)
        {
            this.app = app;
            this.animate = app.animate;

            // defaults
            var defaults = {
                target: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();
        },
        // public
        start: function()
        {
            this.$element.on('click.kube.toggle', this.toggle.bind(this));
        },
        stop: function()
        {
            this.$element.off('.kube.toggle');
        },
        toggle: function(e)
        {
            return (this.$target.isOpened()) ? this.close(e) : this.open(e);
        },
        open: function(e)
        {
            if (this.$target.isOpened()) return;
            if (e) e.preventDefault();

            this.app.broadcast('toggle.open', this);
            this.animate.run(this.$target, 'slideDown', this._opened.bind(this));
        },
        close: function(e)
        {
            if (this.$target.isClosed()) return;
            if (e) e.preventDefault();

            this.app.broadcast('toggle.close', this);
            this.animate.run(this.$target, 'slideUp', this._closed.bind(this));
        },

        // private
        _opened: function()
        {
            this.app.broadcast('toggle.opened', this);
        },
        _closed: function()
        {
            this.app.broadcast('toggle.closed', this);
        }
    });
})(Kube);