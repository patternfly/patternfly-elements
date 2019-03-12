$K.add('service', 'message', {
    init: function(app)
    {
        this.app = app;

        // defaults
        this.defaults = {
            name: false,
            delay: 7, // seconds
            message: '',
            position: 'right', // left, centered, line
            positions: ['is-left', 'is-right', 'is-center', 'is-centered', 'is-line'],
            type: false,
            types: ['is-error', 'is-success', 'is-focus', 'is-black'],
            selector: 'kube-message'
        };

        // animation
        this.currentAnimation = [];
        this.animation = {
            line: ['slideInDown', 'slideOutUp'],
            centered: ['slideInDown', 'slideOutUp'],
            left: ['slideInLeft', 'slideOutLeft'],
            right: ['slideInRight', 'slideOutRight']
        };

        // local
        this.$message = false;
        this.timeout = false;
    },
    // public
    stop: function()
    {
        clearTimeout(this.timeout);

        $K.dom('#' + this.params.selector).remove();

        this.$message = false;
        this.$doc.off('.kube.message');
    },
    show: function(params)
    {
        this._buildDefaults(params);

        // stop
        this.stop();

        // build
        this._build();
        this._open();
    },
    hide: function(params)
    {
        this._buildDefaults(params);
        this._close();
    },
    // private
    _broadcast: function(message)
    {
        this.app.broadcast('message.' + message, this);

        if (this.params.name)
        {
            this.app.broadcast('message.' + this.params.name + '.' + message, this);
        }
    },
    _buildDefaults: function(data)
    {
         this.params = $K.extend({}, this.defaults, data);
    },
	_buildAnimation: function()
	{
        this.currentAnimation = this.animation[this.params.position];
	},
	_buildClose: function()
	{
        this.$message.on('click.kube.message', this._close.bind(this));
	},
	_buildType: function()
	{
        if (this.params.type)
        {
            this.$message.removeClass(this.params.types.join(' '));
            this.$message.addClass(this.params.type);
        }
	},
	_buildPosition: function()
	{
        this.$message.removeClass(this.params.positions.join(' '));
        this.$message.addClass('is-' + this.params.position);
	},
	_buildMessage: function()
	{
    	this.$message.html(this.params.message);
	},
	_build: function()
	{
        this.$message = $K.dom('<div>');
        this.$message.attr('id', this.params.selector);
        this.$message.addClass('message is-hidden');

        this.$body.append(this.$message);
	},
    _handleKeyboard: function(e)
	{
		if (e.which === 27) this._close();
	},
    _open: function()
    {
        this._broadcast('open');
        this._buildClose();
        this._buildType();
        this._buildPosition();
        this._buildAnimation();
        this._buildMessage();

        this.animate.run(this.$message, this.currentAnimation[0], this._opened.bind(this));
    },
    _close: function(e)
    {
        if (this.$message)
        {
            this._broadcast('close');
            this.animate.run(this.$message, this.currentAnimation[1], this._closed.bind(this));
        }
    },
    _opened: function()
    {
        this.$doc.on('keyup.kube.message', this._handleKeyboard.bind(this));
        this.timeout = setTimeout(this._close.bind(this), this.params.delay * 1000);

        this._broadcast('opened');
    },
    _closed: function()
    {
        this.stop();
        this._broadcast('closed');
    }
});