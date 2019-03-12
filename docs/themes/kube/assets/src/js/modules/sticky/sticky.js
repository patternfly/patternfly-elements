(function($K)
{
    $K.add('module', 'sticky', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;

            // defaults
            var defaults = {
                offset: 0 // string in pixels
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },
        start: function()
        {
            this.offsetTop = this._getOffsetTop();

    	    this._load();
    	    this.$win.on('scroll.kube.sticky', this._load.bind(this));
    	},
    	stop: function()
    	{
        	this.$win.off('scroll.kube.sticky');
        	this.$element.removeClass('fixed').css('top', '');
    	},
        // private
    	_load: function()
    	{
    		return (this._isFix()) ? this._setFixed() : this._setUnfixed();
    	},
    	_isFix: function()
    	{
            return (this.$win.scrollTop() > (this.offsetTop + parseInt(this.params.offset, 10)));
    	},
    	_setFixed: function()
    	{
    		this.$element.addClass('is-fixed').css('top', this.params.offset);
    		this.app.broadcast('sticky.fixed', this);
    	},
    	_setUnfixed: function()
    	{
    		this.$element.removeClass('is-fixed').css('top', '');
    		this.app.broadcast('sticky.unfixed', this);
        },
    	_getOffsetTop: function()
    	{
        	return this.$element.offset().top;
    	}
    });
})(Kube);