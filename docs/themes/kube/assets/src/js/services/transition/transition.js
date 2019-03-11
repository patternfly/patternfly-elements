$K.add('service', 'transition', {
    init: function(app)
    {
        this.transitionOpt = true;
    },
    run: function(element, params)
    {
        return new $K.TransitionPlay(params, element, this.transitionOpt);

    },
    remove: function(element)
    {
        this.$el = $K.dom(element);

    	var classname = this.$el.attr('kube-transition-class');
        if (classname)
        {
            this.$el.removeClass(classname);
            this.$el.removeAttr('kube-transition-class');
        }

    	var css = this.$el.attr('kube-transition-css');
        if (css)
        {
            var names = css.split(',');
            for (var i = 0; i < names.length; i++)
            {
                this.$el.css(names[i], '');
            }

            this.$el.removeAttr('kube-transition-css');
        }

        this.$el.off('transitionend webkitTransitionEnd');
    }
});


$K.TransitionPlay = function(params, element, transitionOpt)
{
    this.$el = $K.dom(element);
    this.params = params;

    this._transition();
};

$K.TransitionPlay.prototype = {
 	_transition: function()
	{
	    if (this.params.classname)
	    {
    	    this.$el.addClass(this.params.classname);
    	    this.$el.attr('kube-transition-class', this.params.classname);
        }

	    if (this.params.css)
	    {
    	    this.$el.css(this.params.css);

    	    var names = [];
    	    for (var key in this.params.css)
    	    {
        	    names.push(key);
    	    }

    	    this.$el.attr('kube-transition-css', names.join(','))
        }

		this._complete();
	},
	_complete: function()
	{
		this.$el.one('transitionend webkitTransitionEnd', function(e)
		{
			if (typeof this.params.callback === 'function') this.params.callback(this.$el);

		}.bind(this));
	}
};