(function($K)
{
    $K.add('module', 'slider', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;
            this.$doc = app.$doc;

            // defaults
            var defaults = {
                min: 0,
                max: 100,
                step: 1,
                value: 0,
                target: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();

            // local
            this.isTicks = false;
        },

        // public
        start: function()
        {
            this._buildTrack();
            this._buildFill();
            this._buildHandle();
            this._buildTicks();

            this.update();

            this.$win.on('resize.kube.slider', this._resize.bind(this));
            this.$element.on('mousedown.kube.slider touchstart.kube.slider', this._handleDown.bind(this));
    	},
    	stop: function()
    	{
            this.$win.off('.kube.slider');
            this.$doc.off('.kube.slider');
            this.$element.off('.kube.slider');
    	},
        update: function(value)
        {
            this.value = (value) ? value : this.params.value;
            this.value = (this.value < this.params.min) ? this.params.min : this.value;

            this.handleWidth = this.$handle.width();
            this.trackWidth = this.$track.width();
            this.maxHandlePosition = this.trackWidth - this.handleWidth;
            this.fixPosition = this.handleWidth / 2;
            this.position = this._getPositionFromValue(this.value);

            this._setPosition(this.position);
            this._setTarget();
        },
    	// private
    	_resize: function()
    	{
            this._buildTicks();
            this.update(this.value);
    	},
    	_isDisabled: function()
    	{
            return (this.$element.hasClass('is-disabled') || this.$element.attr('disabled'));
    	},
    	_buildTrack: function()
    	{
        	this.$track =  $K.dom('<div />');
        	this.$track.addClass('slider-track');

        	this.$element.prepend(this.$track);
    	},
    	_buildFill: function()
    	{
        	this.$fill =  $K.dom('<div />');
        	this.$fill.addClass('slider-fill');

        	this.$track.append(this.$fill);
        },
    	_buildHandle: function()
    	{
        	this.$handle =  $K.dom('<div />');
        	this.$handle.addClass('slider-handle');

        	this.$track.append(this.$handle);
        },
    	_buildTicks: function()
    	{
            this.$ticks = this.$element.find('.slider-ticks span');

            var size = this.$ticks.length;
            this.isTicks = (size !== 0)

        	if (!this.isTicks) return;

            var handleWidth = this.$handle.width();
        	var width = this.$element.width() - handleWidth;
            var fix = handleWidth/2;
            var step = width/(size-1);
            var start = fix;

            this.$ticks.each(function(node, i)
            {
                var $node = $K.dom(node);
                var left = start + step * i;

                $node.css({ 'left': left + 'px', 'width': step + 'px', 'text-indent': '-' + (step-fix) + 'px' });
            });
    	},
    	_handleDown: function(e)
    	{
            e.preventDefault();

            if (this._isDisabled()) return;

            this.$doc.on('mousemove.kube.slider touchmove.kube.slider', this._handleMove.bind(this));
            this.$doc.on('mouseup.kube.slider touchend.kube.slider', this._handleEnd.bind(this));

            var pos = (e.touches && e.touches.length > 0) ? e.changedTouches[0].clientX : e.clientX;
            var trackPos = this.$track.offset().left;
            var setPos = (pos - trackPos - this.fixPosition);

            this._setPosition(setPos);
            this._setTarget();

    	},
    	_handleMove: function(e)
    	{
            e.preventDefault();
            var pos = (e.touches && e.touches.length > 0) ? e.changedTouches[0].clientX : e.clientX;
            var trackPos = this.$track.offset().left;
            var setPos = (pos - trackPos - this.fixPosition);

            this._setPosition(setPos);
            this._setTarget();
        },
    	_handleEnd: function(e)
    	{
            e.preventDefault();
            this.$doc.off('.kube.slider');
        },
    	_setPosition: function(pos)
    	{
        	pos = this._getEdge(pos, 0, this.maxHandlePosition);

            var value = this._getValueFromPosition(pos);
            var newPos = this._getPositionFromValue(value);

            // update ui
            this.$fill.css('width', (newPos + this.fixPosition) + 'px');
            this.$handle.css('left', newPos + 'px');

            // update globals
            this.position = newPos;
            this.value = value;

    	},
    	_setTarget: function()
    	{
        	this.app.broadcast('slider.set',  this, this.value);
            if (this.$target.length === 0) return;

            var tag = this.$target.get().tagName;

            if (tag === 'INPUT' || tag === 'SELECT') this.$target.val(this.value);
            else this.$target.text(this.value);
    	},
        _getPositionFromValue: function(value)
        {
            var percentage = (value - this.params.min)/(this.params.max - this.params.min);
            return pos = (!Number.isNaN(percentage)) ? percentage * this.maxHandlePosition : 0;
        },
        _getValueFromPosition: function(pos)
        {
            var percentage = ((pos) / (this.maxHandlePosition || 1));
            var value = this.params.step * Math.round(percentage * (this.params.max - this.params.min) / this.params.step) + this.params.min;

            return Number((value).toFixed((this.params.step + '').replace('.', '').length - 1));
        },
        _getEdge: function(pos, min, max)
        {
            if (pos < min) return min;
            if (pos > max) return max;

            return pos;
        }
    });
})(Kube);