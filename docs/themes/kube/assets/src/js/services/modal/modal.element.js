$K.add('class', 'modal.element', {
    mixing: ['dom'],
    init: function(app, template)
    {
        this.app = app;
        this.opts = app.opts;
        this.$win = app.$win;

        // init
        this._init(template);
    },

    // get
    getForm: function()
    {
        return this.find('form');
    },
    getHeader: function()
    {
        return this.$modalHeader;
    },
    getBody: function()
    {
        return this.$modalBody;
    },
    getFooter: function()
    {
        return this.$modalFooter;
    },

    // set
    setTitle: function(title)
    {
        if (title) this.$modalHeader.html(title);
    },
    setWidth: function(width)
    {
        width = (parseInt(width) >= this.$win.width()) ? '96%' : width;

        this.css('max-width', width);
    },
    setHeight: function(height)
    {
        if (height !== false) this.$modalBody.css('height', height);
    },

    // update
    updatePosition: function()
    {
        var width = this.width();
        this.css({ 'left': '50%', 'margin-left': '-' + (width/2) + 'px' });

        var windowHeight = this.$win.height();
        var height = this.height();
        var marginTop = (windowHeight/2 - height/2);

        if (height < windowHeight && marginTop !== 0)
        {
            this.css('margin-top', marginTop + 'px');
        }
    },

    // is
    isCloseNode: function(el)
    {
        return (el === this.$modalClose.get());
    },

    // private
    _init: function(template)
    {
        this._build();
        this._buildClose();
        this._buildHeader();
        this._buildBody();
        this._buildFooter();
        this._buildTemplate(template);
    },
    _build: function()
    {
        this.parse('<div>');
        this.addClass('modal');
        this.attr('dir', this.opts.direction);
    },
    _buildClose: function()
    {
        this.$modalClose = $K.dom('<span>');
        this.$modalClose.addClass('close');

        this.append(this.$modalClose);
    },
    _buildHeader: function()
    {
        this.$modalHeader = $K.dom('<div>');
        this.$modalHeader.addClass('modal-header');

        this.append(this.$modalHeader);
    },
    _buildBody: function()
    {
        this.$modalBody = $K.dom('<div>');
        this.$modalBody.addClass('modal-body');

        this.append(this.$modalBody);
    },
    _buildFooter: function()
    {
        this.$modalFooter = $K.dom('<div>');
        this.$modalFooter.addClass('modal-footer');

        this.append(this.$modalFooter);
    },
    _buildTemplate: function(template)
    {
        this.$modalBody.html(template);
    }
});