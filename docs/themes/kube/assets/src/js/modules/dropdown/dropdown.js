(function($K)
{
    $K.add('module', 'dropdown', {
        init: function(app, context)
        {
            this.app = app;
            this.$doc = app.$doc;
            this.$win = app.$win;
            this.$body = app.$body;
            this.utils = app.utils;
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

            // local
            this.animationOpen = 'slideDown';
            this.animationClose = 'slideUp';
        },
        // public
        start: function()
        {
            this.$element.on('click.kube.dropdown', this.toggle.bind(this));
        },
        stop: function()
        {
            this.animate.clear(this.$target);
            this.$target.hide();

            this.$element.off('.kube.dropdown');
            this.$doc.off('.kube.dropdown');
            this.$win.off('.kube.dropdown');
        },
        toggle: function(e)
        {
            return (this.$target.isOpened()) ? this.close(e) : this.open(e);
        },
        open: function(e)
        {
            if (this.$target.isOpened()) return;
            if (e)
            {
                e.stopPropagation();
                e.preventDefault();
            }

            this.$doc.off('.kube.dropdown');
            this.$win.off('.kube.dropdown');

            // hide all
            this.$body.find('.dropdown').each(function(node)
            {
                var $el = $K.dom(node);

                this.animate.remove($el);
                $el.hide();

            }.bind(this));

            this._openCaret();
            this._setPosition();

            this.$element.addClass('dropdown-in');
            this.app.broadcast('dropdown.open', this);
            this.animate.run(this.$target, this.animationOpen, this._opened.bind(this));
        },
        close: function(e)
        {
            if (this.$target.isClosed()) return;
            if (e)
            {
                var el = e.target;
                var $el = $K.dom(el);
                var isClickable = (el.tagName === 'A' || el.tagName === 'BUTTON');
                if (!isClickable || el === this.$element.get() || (el.tagName === 'A' && $el.hasClass('is-active')))
                {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }

            this.app.broadcast('dropdown.close', this);
            this.animate.run(this.$target, this.animationClose, this._closed.bind(this));
        },

        // private
    	_getElementPosition: function()
    	{
        	return (this.$element.closest('.is-fixed').length !== 0) ? this.$element.position() : this.$element.offset();
    	},
    	_getPlacement: function()
    	{
        	var pos = this._getElementPosition();
        	var height = parseFloat(this.$element.css('height')) + pos.top + parseFloat(this.$target.css('height'));
    		return (this.$doc.height() < height) ? 'top' : 'bottom';
    	},
    	_setPosition: function()
    	{
        	var elHeight = parseFloat(this.$element.css('height'));
            var pos = this._getElementPosition();
            var top = pos.top + elHeight;
            var left = pos.left;
            var height = parseFloat(this.$target.css('height'));
            var placement = this._getPlacement();
            var width = parseFloat(this.$target.css('width'));
            var borderWidth = parseFloat(this.$element.css('border-left-width')) + parseFloat(this.$element.css('border-right-width'));
            var leftFix = (this.$win.width() < (left + width)) ? (width - this.$element.width() - borderWidth) : 0;

            if (placement === 'top')
            {
                 top = top - height - elHeight;
                 this.animationOpen = 'show';
                 this.animationClose = 'hide';
            }
            else
            {
                 this.animationOpen = 'slideDown';
                 this.animationClose = 'slideUp';
            }

            this.$target.css({ 'top': top + 'px', 'left': (left - leftFix) + 'px' });
    	},
        _handleKeyboard: function(e)
    	{
    		if (e.which === 27) this.close();
    	},
        _opened: function()
        {
            this.$doc.on('keyup.kube.dropdown', this._handleKeyboard.bind(this));
            this.$doc.on('click.kube.dropdown touchstart.kube.dropdown', this.close.bind(this));
    		this.$doc.on('scroll.kube.dropdown', this._setPosition.bind(this));
    		this.$win.on('resize.kube.dropdown', this._setPosition.bind(this));

            this.app.broadcast('dropdown.opened', this);
        },
        _closed: function()
        {
            this.$doc.off('.kube.dropdown');
            this.$win.off('.kube.dropdown');

            this._closeCaret();
            this.$element.removeClass('dropdown-in');
            this.app.broadcast('dropdown.closed', this);
        },
        _openCaret: function()
        {
            var $caret = this.$element.find('.caret');
            $caret.removeClass('is-down').addClass('is-left');
        },
        _closeCaret: function()
        {
            var $caret = this.$element.find('.caret');
            $caret.removeClass('is-left').addClass('is-down');
        }
    });
})(Kube);