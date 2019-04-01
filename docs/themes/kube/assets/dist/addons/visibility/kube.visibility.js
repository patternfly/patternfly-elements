(function($K)
{
    $K.add('module', 'visibility', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;

            // defaults
            var defaults = {
                tolerance: 15 // px
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$win.on('scroll.kube.visibility resize.kube.visibility', this._check.bind(this));
            this._check();
    	},
    	stop: function()
    	{
            this.$win.off('.kube.visibility');
    	},

    	// private
        _check: function()
        {
            var docViewTop = this.$win.scrollTop();
            var docViewBottom = docViewTop + this.$win.height();
            var elemTop = this.$element.offset().top;
            var elemBottom = elemTop + this.$element.height();

            var check = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= (docViewBottom + this.params.tolerance)) &&  (elemTop >= docViewTop));
            if (check)
            {
                this.app.broadcast('visibility.visible', this, this.$element);
            }
            else
            {
                this.app.broadcast('visibility.invisible', this, this.$element);
            }
        }
    });
})(Kube);