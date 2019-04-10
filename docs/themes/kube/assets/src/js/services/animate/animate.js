$K.add('service', 'animate', {
    init: function(app)
    {
        this.app = app;

        // local
        this.animationOpt = true;
    },
    run: function(element, animation, callback)
    {
        return new $K.AnimatePlay(this.app, element, animation, callback, this.animationOpt);
    },
    remove: function(element)
    {
        this.$el = $K.dom(element);
        var effect = this.$el.attr('kube-animate-effect');

		this.$el.hide();
        this.$el.removeClass(effect);
        this.$el.off('animationend webkitAnimationEnd');
    }
});

$K.AnimatePlay = function(app, element, animation, callback, animationOpt)
{
    this.hidableEffects = ['fadeOut', 'flipOut', 'slideUp', 'zoomOut', 'slideOutUp', 'slideOutRight', 'slideOutLeft'];
    this.prefix = 'kube-';
    this.prefixes = ['', '-webkit-'];

    this.utils = app.utils;
    this.$el = $K.dom(element);
    this.$body = $K.dom('body');
    this.callback = callback;
    this.animation = (!animationOpt) ? this._buildAnimationOff(animation) : animation;

    this._setHeight();

    // animate
    if (this._isAnimate()) this._animate();
    else                   this._toggle();
};

$K.AnimatePlay.prototype = {
    _setHeight: function()
    {
        if (this.animation === 'slideUp' || this.animation === 'slideDown')
        {
            this.$el.height(this.$el.height());
        }
    },
	_buildAnimationOff: function(animation)
	{
        return (this._isHidable(animation)) ? 'hide' : 'show';
	},
	_isAnimate: function()
	{
    	return (this.animation !== 'show' && this.animation !== 'hide');
	},
	_isHidable: function(effect)
	{
    	return (this.hidableEffects.indexOf(effect) !== -1);
	},
	_clean: function()
	{
    	this.$body.removeClass('is-no-scroll-x');
		this.$el.removeClass(this.prefix + this.animation);
		this.$el.removeAttr('kube-animate-effect');
	},
    _toggle: function()
    {
		if (this.animation === 'show') this.$el.show();
		else                           this.$el.hide();

		if (typeof this.callback === 'function') this.callback(this);
    },
	_animate: function()
	{
        this.$body.addClass('is-no-scroll-x');
        this.$el.show();

	    this.$el.addClass(this.prefix + this.animation);
	    this.$el.attr('kube-animate-effect', this.prefix + this.animation);
		this._complete();
	},
	_complete: function()
	{

		this.$el.one('animationend webkitAnimationEnd', function(e)
		{
    		if (this.$el.hasClass(this.prefix + this.animation)) this._clean();
			if (this._isHidable(this.animation)) this.$el.hide();

			if (this.animation === 'slideUp' || this.animation === 'slideDown') this.$el.css('height', '');
			if (typeof this.callback === 'function') this.callback(this.$el);

		}.bind(this));
	}
};