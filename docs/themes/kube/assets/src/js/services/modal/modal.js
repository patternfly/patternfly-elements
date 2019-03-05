$K.add('service', 'modal', {
    init: function(app)
    {
        this.app = app;

        // defaults
        this.defaults = {
            target: false,
            name: false,
            url: false,
            title: false,
            width: '600px',
            height: false,
            handle: false,
            commands: false
        };

        // local
        this.$box = false;
        this.$modal = false;

	},
	// public
    stop: function()
    {
        if (this.$box)
        {
            this.$box.remove();
            this.$box = false;
            this.$modal = false;

            this.$doc.off('.kube.modal');
            this.$win.off('.kube.modal');
        }

        if (this.$overlay)
        {
            this.$overlay.remove();
        }
    },
	open: function(params)
	{
        this._buildDefaults(params);

        if (this.params.url)
        {
            this._openUrl();
        }
        else if (this.params.target)
        {
            this._openTarget();
        }
    },
    close: function()
	{
        this._close();
	},
    resize: function()
    {
        this.$modal.setWidth(this.params.width);
        this.$modal.updatePosition();
    },

    // private
    _broadcast: function(message)
    {
        this.app.broadcast('modal.' + message, this, this.$modal, this.$modalForm);

        if (this.params.name)
        {
            this.app.broadcast('modal.' + this.params.name + '.' + message, this, this.$modal, this.$modalForm);
        }
    },
    _isOpened: function()
    {
        return (this.$modal && this.$modal.hasClass('is-open'));
    },
    _openUrl: function()
    {
        $K.ajax.post({
            url: this.params.url,
            success: this._doOpen.bind(this)
        });
    },
    _openTarget: function()
    {
        var template = $K.dom(this.params.target).clone().html();
        this._doOpen(template);
    },
    _doOpen: function(template)
    {
        this.stop();

        if (!this._isDesktop())
        {
            document.activeElement.blur();
        }


        this._createModal(template);

        this._buildModalBox();
        this._buildOverlay();
        this._buildModal();
        this._buildModalForm();
        this._buildModalCommands();

        this.$modal.updatePosition();
        this._broadcast('open');

        this.animate.run(this.$box, 'fadeIn', this._opened.bind(this));
        this.animate.run(this.$overlay, 'fadeIn');
    },
    _opened: function()
    {
        this.$modal.addClass('is-open');
        this.$box.on('mousedown.kube.modal', this._close.bind(this));
        this.$doc.on('keyup.kube.modal', this._handleEscape.bind(this));
        this.$win.on('resize.kube.modal', this.resize.bind(this));
        this.$modal.getBody().find('input[type=text],input[type=url],input[type=email]').on('keydown.kube.modal', this._handleEnter.bind(this));

        this._broadcast('opened');
    },
    _close: function(e)
    {
        if (!this.$box || !this._isOpened()) return;

        if (e)
        {
            if (!this._needToClose(e.target))
            {
                return;
            }

            e.stopPropagation();
            e.preventDefault();
        }

        this._broadcast('close');

        this.animate.run(this.$box, 'fadeOut', this._closed.bind(this));
        this.animate.run(this.$overlay, 'fadeOut');
    },
    _closed: function()
    {
        this.$modal.removeClass('is-open');
        this.$box.off('.kube.modal');
        this.$doc.off('.kube.modal');
        this.$win.off('.kube.modal');

        this._broadcast('closed');
    },
    _createModal: function(template)
    {
        this.$modal = $K.create('class.modal.element', this.app, template);
    },
    _buildDefaults: function(data)
    {
         this.params = $K.extend({}, this.defaults, data);
    },
    _buildModalBox: function()
    {
        this.$box = $K.dom('<div>');
        this.$box.attr('id', 'kube-modal');
        this.$box.addClass('modal-box is-hidden');
        this.$box.html('');
        this.$body.append(this.$box);
    },
    _buildOverlay: function()
    {
        this.$overlay = $K.dom('#kube-overlay');
        if (this.$overlay.length === 0)
        {
            this.$overlay = $K.dom('<div>');
            this.$overlay.attr('id', 'kube-overlay');
            this.$overlay.addClass('overlay is-hidden');
            this.$body.prepend(this.$overlay);
        }
    },
    _buildModal: function()
    {
        this.$box.append(this.$modal);

        this.$modal.setTitle(this.params.title);
        this.$modal.setHeight(this.params.height);
        this.$modal.setWidth(this.params.width);
    },
    _buildModalCommands: function()
    {
        if (this.params.commands)
        {
            var commands = this.params.commands;
            var $footer = this.$modal.getFooter();
            for (var key in commands)
            {
                var $btn = $K.dom('<button>');

                $btn.html(commands[key].title);
                $btn.attr('data-command', key);

                if (typeof commands[key].classname !== 'undefined')
                {
                    $btn.addClass(commands[key].classname);
                }

                if (typeof commands[key].close !== 'undefined')
                {
                    $btn.attr('data-action', 'close');
                    $btn.on('click', this._close.bind(this));
                }
                else
                {
                    $btn.on('click', this._handleCommand.bind(this));
                }

                $footer.append($btn);
            }
        }
    },
    _buildModalForm: function()
    {
        this.$modalForm = $K.create('modal.form', this.app, this.$modal.getForm());
    },
    _needToClose: function(el)
    {
        var $target = $K.dom(el);
        if ($target.attr('data-action') === 'close' || this.$modal.isCloseNode(el) || $target.closest('.modal').length === 0)
        {
            return true;
        }

        return false;
    },
    _handleCommand: function(e)
    {
        var $btn = $K.dom(e.target).closest('button');
        var command = $btn.attr('data-command');

        if (command !== 'cancel') e.preventDefault();

        this._broadcast(command);
    },
    _handleEnter: function(e)
    {
        if (e.which === 13)
        {
            if (this.params.handle)
            {
                e.preventDefault();
                this._broadcast(this.params.handle);
            }
        }
    },
    _handleEscape: function(e)
    {
        if (e.which === 27) this._close();
    },
    _isDesktop: function()
    {
        return !/(iPhone|iPod|iPad|Android)/.test(navigator.userAgent);
    }
});
