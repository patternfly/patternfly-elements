(function($K)
{
    $K.add('module', 'offcanvas', {
        init: function(app, context)
        {
            this.app = app;
            this.$doc = app.$doc;
            this.$body = app.$body;
            this.utils = app.utils;
            this.animate = app.animate;
            this.transition = app.transition;

            // defaults
            var defaults = {
                clickOutside: true,
                target: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();

            // build
            this._build();
        },
        start: function()
        {
            this.$element.on('click.kube.offcanvas', this.toggle.bind(this));
        },
        stop: function()
        {
            this._clear();
        },
        toggle: function(e)
        {
            return (this.$target.isOpened()) ? this.close(e) : this.open(e);
        },
        open: function(e)
        {
            if (e)
            {
                e.stopPropagation();
                e.preventDefault();
            }

            this._clear();

            this.$body.addClass('is-no-scroll-x');
            this.$target.addClass('is-offcanvas');

            this.targetWidth = this.$target.width();

            this._resize();
            this.app.broadcast('offcanvas.open', this);

            return (this.isSlide) ? this._openSlide() : this._openPush();
        },
        close: function(e)
        {
            if (this.eventScroll) return;
            if (e)
            {
                var $el = $K.dom(e.target);
                var el = $el.get();
                var isClickable = (el.tagName === 'A' ||el.tagName === 'BUTTON');
            	if (!isClickable || el === this.$element.get())
                {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }

            this.app.broadcast('offcanvas.close', this);

            return (this.isSlide) ? this._closeSlide() : this._closePush();
        },
        // private
        _build: function()
        {
            this.isSlide = !(this.$target.hasClass('is-offcanvas-push'));
            this.slideDirection = (this.$target.hasClass('is-offcanvas-right')) ? 'Right' : 'Left';
            this.pushSign = (this.slideDirection === 'Left') ? '' : '-';
            this.eventScroll = false;
        },
        _handleKeyboard: function(e)
    	{
    		if (e.which === 27) this.close();
    	},

        _openSlide: function()
        {
            this.animate.run(this.$target, 'slideIn' + this.slideDirection, this._opened.bind(this));
        },
        _openPush: function()
        {
            this.$target.show();
            this._pushBody(this.pushSign + this.targetWidth + 'px', this._opened.bind(this));
        },
        _opened: function()
        {
            this.$doc.on('touchmove.kube.offcanvas', function() { this.eventScroll = true; }.bind(this));
            this.$doc.on('touchstart.kube.offcanvas', function() { this.eventScroll = false; }.bind(this));
            this.$doc.on('keyup.kube.offcanvas', this._handleKeyboard.bind(this));

            if (this.params.clickOutside)
            {
                this.$doc.on('click.kube.offcanvas touchend.kube.offcanvas', this.close.bind(this));
            }

            this.app.broadcast('offcanvas.opened', this);
        },
        _closeSlide: function()
        {
            this.animate.run(this.$target, 'slideOut' + this.slideDirection, this._closed.bind(this));
        },
        _closePush: function()
        {
            this._pushBody('0', this._closed.bind(this));
        },
        _closed: function()
        {
            this.$doc.off('.kube.offcanvas');
            this.$body.removeClass('is-no-scroll-x');
            this.transition.remove(this.$body);
            this.$target.removeClass('is-offcanvas');
            this.$target.hide();

            this.app.broadcast('offcanvas.closed', this);
        },
        _pushBody: function(transform, callback)
        {
            var params = {
                classname: 'is-offcanvasTransition',
                css: { transform: 'translateX(' + transform + ')' },
                callback: callback
            };

            this.transition.run(this.$body, params, callback);
        },
        _resize: function()
        {
            var resize = function()
            {
                this.$target.height(this.$doc.height());
            }.bind(this);

            resize();
            this.$doc.on('resize.kube.offcanvas', resize);
        },
        _clear: function()
        {
            this.$doc.off('.kube.offcanvas');
            this.transition.remove(this.$body);

            $K.dom('.is-offcanvas').each(function(node)
            {
                var $el = $K.dom(node);

                this.animate.remove($el);

                $el.hide();
                $el.removeClass('is-offcanvas');

            }.bind(this));
        }
    });
})(Kube);