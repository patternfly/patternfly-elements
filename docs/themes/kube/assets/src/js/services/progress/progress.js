$K.add('service', 'progress', {
    init: function(app)
    {
        this.app = app;
        this.$body = app.$body;

        // defaults
        this.defaults = {
            selector: 'kube-progress',
            target: false,
            value: 100
        }

        // local
        this.$progress = false;
        this.$progressBar = false;
    },
    // public
    stop: function()
    {
        this.$progress = false;
        this.$progressBar = false;

        $K.dom('#' + this.params.selector).remove();

        if (this.params.target)
        {
            var $target = $K.dom(this.params.target);
            $target.removeClass('is-relative');
        }
    },
    show: function(params)
    {
        this._buildDefaults(params);
        this._build();
    },
    hide: function(params)
    {
        if (this.$progress)
        {
            this._buildDefaults(params);
            this.animate.run(this.$progress, 'fadeOut', this.stop.bind(this));
        }
    },
    update: function(params)
    {
        this._buildDefaults(params);

        if (!this.$progress) this._build();
        this._setValue();
    },

    // private
    _buildDefaults: function(data)
    {
         this.params = $K.extend({}, this.defaults, data);
    },
    _build: function()
    {
        this.stop();

        this.$progress = $K.dom('<div>');
        this.$progress.attr('id', this.params.selector);
        this.$progress.addClass(this.params.selector);

        this.$progressBar = $K.dom('<span>');
        this.$progress.append(this.$progressBar);

        if (this.params.target)
        {
            var $target = $K.dom(this.params.target);
            if ($target.css('position') === 'static')
            {
                $target.addClass('is-relative');
            }

            $target.append(this.$progress);
        }
        else
        {
            this.$progress.addClass('is-fixed');
            this.$body.append(this.$progress);
        }
    },
    _setValue: function()
    {
        this.$progressBar.css('width', this.params.value + '%');
    }
});