(function($K)
{
    $K.add('module', 'upload', {
        init: function(app, context)
        {
            this.app = app;
            this.utils = app.utils;
            this.animate = app.animate;
            this.response = app.response;
            this.progress = app.progress;

            // defaults
            var defaults = {
                size: 120, // pixels
                url: false,
                urlRemove: false,
                param: false,
                type: false, // image, file
                multiple: false,
                placeholder: 'Drop files here or click to upload',
                progress: false,
                target: false,
                append: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();

            // local
            this.statusMap = ['hover', 'error', 'success', 'drop'];

        },
        // public
        start: function()
        {
            this._buildBox();
            this._buildInput();
            this._buildCount();
            this._buildType();
            this._buildPlaceholder();
            this._buildSize();
            this._buildMultiple();
            this._buildItems();
            this._buildEvents();

    	},
    	stop: function()
    	{
        	this.$box.remove();
            this.$element.off('.kube.upload');
    	},

    	// private
    	_buildBox: function()
    	{
            if (this.params.type === 'image')
            {
                this.$box = this.$element.find('.upload-item');
            }
            else
            {
                this.$box = this.$element;
            }
    	},
    	_buildInput: function()
    	{
        	this.$input = $K.dom('<input>');
        	this.$input.attr('type', 'file');
        	this.$input.attr('name', this._getParamName());
        	this.$input.hide();

        	this.$element.before(this.$input);
    	},
    	_buildCount: function()
    	{
        	this.$inputCount = $K.dom('<input>');
        	this.$inputCount.attr('type', 'hidden');
        	this.$inputCount.attr('name', this._getParamName() + '-count');
        	this.$inputCount.val(0);

        	this.$element.before(this.$inputCount);
    	},
    	_buildType: function()
    	{
        	this.isBox = this.$element.hasClass('upload');
    	},
    	_buildPlaceholder: function()
    	{
        	if (this.isBox)
        	{
            	var $placeholder = $K.dom('<span>');
            	$placeholder.addClass('upload-placeholder');
            	$placeholder.html(this.params.placeholder);

            	this.$element.append($placeholder);
        	}
    	},
    	_buildSize: function()
    	{
        	if (this.isBox)
        	{
            	this.$box.css({
                	height: this.params.size + 'px'
                });
            }
            else if (this.params.type === 'image')
            {
                this.$box.css({
                    width: this.params.size + 'px',
                    height: this.params.size + 'px'
                });
            }
    	},
    	_buildMultiple: function()
    	{
            this.isMultiple = this.params.multiple;
            if (this.isMultiple)
            {
                this.$input.attr('multiple', 'true');
            }
    	},
        _buildItems: function()
        {
            if (!this.params.type) return;

            var isFile = (this.params.type === 'file');
            var $target = (isFile) ? this.$target : this.$element;
            var fn = (isFile) ? '_removeFile' : '_removeImage';

            var $closes = $target.find('.close');
            $closes.on('click', this[fn].bind(this));

            if (!isFile)
            {
                $closes.closest('.upload-item').addClass('is-uploaded');
            }

            this.$inputCount.val($closes.length);
        },
        _buildEvents: function()
        {
            this.$input.on('change.redactor.upload', this._change.bind(this));
            this.$box.on('click.redactor.upload', this._click.bind(this));
            this.$box.on('drop.redactor.upload', this._drop.bind(this));
            this.$box.on('dragover.redactor.upload', this._dragover.bind(this));
            this.$box.on('dragleave.redactor.upload', this._dragleave.bind(this));
        },


        // Events
        _click: function(e)
        {
            e.preventDefault();

            var $el = $K.dom(e.target);
            if ($el.hasClass('close')) return;

            this.$input.click();
        },
        _change: function(e)
        {
            this.app.broadcast('upload.start', this);
            this._send(e, this.$input.get().files);
        },
        _drop: function(e)
        {
            e.preventDefault();

            this._clearStatuses();
            this._setStatus('drop');

            this.app.broadcast('upload.start', this);
            this._send(e);
        },
        _dragover: function(e)
        {
            e.preventDefault();
            this._setStatus('hover');

            return false;
        },
        _dragleave: function(e)
        {
            e.preventDefault();
            this._removeStatus('hover');

            return false;
        },

        // Count
        _upCount: function()
        {
            var val = this.$inputCount.val();
            val++;

            this.$inputCount.val(val);
        },
        _downCount: function()
        {
            var val = this.$inputCount.val();
            val--;
            val = (val < 0) ? 0 : val;

            this.$inputCount.val(val);
        },
        _clearCount: function()
        {
            this.$inputCount.val(0);
        },

        // Name
        _getParamName: function()
        {
            return (this.params.param) ? this.params.param : 'file';
        },
        _getHiddenName: function()
        {
            var name = this._getParamName();
            return (this.isMultiple) ? name + '-uploaded[]' : name + '-uploaded';
        },

        // Status
        _clearStatuses: function()
        {
            this.$box.removeClass('is-upload-' + this.statusMap.join(' is-upload-'));
        },
        _setStatus: function(status)
        {
            this.$box.addClass('is-upload-' + status);
        },
        _removeStatus: function(status)
        {
            this.$box.removeClass('is-upload-' + status);
        },


        // Target
        _clearTarget: function()
        {
            var $items = this.$target.find('.upload-item');
            $items.each(function(node)
            {
                var $node = $K.dom(node);
                this._removeFileRequest($node.attr('data-id'));
            }.bind(this));

            this._clearCount();
            this.$target.html('');
        },
        _clearBox: function()
        {
            var $items = this.$target.find('.upload-item');
            $items.each(function(node)
            {
                var $node = $K.dom(node);
                this._removeFileRequest($node.attr('data-id'));
            }.bind(this));

            this._clearCount();
            this.$target.html('');
        },


        // Remove
        _removeFile: function(e)
        {
        	e.preventDefault();

        	var $el = $K.dom(e.target);
        	var $item = $el.closest('.upload-item');
        	var id = $item.attr('data-id');

            this.animate.run($item, 'fadeOut', function()
        	{
            	$item.remove();
            	this._downCount();
                this._removeFileRequest(id);

                // clear target
                if (this.$target.find('.upload-item').length === 0)
                {
                    this.$target.html('');
                }

        	}.bind(this))
        },
        _removeImage: function(e)
        {
        	e.preventDefault();

        	var $el = $K.dom(e.target);
        	var $item = $el.closest('.upload-item');
        	var id = $item.attr('data-id');


        	if (this.isMultiple)
        	{
                this.animate.run($item, 'fadeOut', function()
            	{
                	$item.remove();
                	this._downCount();
                    this._removeFileRequest(id);

            	}.bind(this))
        	}
        	else
        	{
            	var $img = $item.find('img');

            	$el.hide();
                this.animate.run($img, 'fadeOut', function()
            	{
                	this.$box.html('');
                	this.$box.removeClass('is-uploaded');
                	this._clearCount();
                    this._removeFileRequest(id);

            	}.bind(this))
        	}
        },
        _removeFileRequest: function(id)
        {
            if (this.params.urlRemove)
        	{
                $K.ajax.post({
                    url: this.params.urlRemove,
                    data: { id: id }
                });
            }
        },


        // Send
        _send: function(e, files)
        {
            e = e.originalEvent || e;

            files = (files) ? files : e.dataTransfer.files;

            var data = new FormData();
            var name = this._getParamName();

            data = this._buildData(name, files, data);

            if (this.params.append)
            {
			    data = this.utils.extendData(data, this.params.append);
            }

            this._sendData(data, files, e);
        },
        _sendData: function(data, files, e)
        {
            if (this.params.progress) this.progress.show();

            $K.ajax.post({
                url: this.params.url,
                data: data,
                before: function(xhr)
                {
                    return this.app.broadcast('upload.beforeSend', this, xhr);

                }.bind(this),
                success: function(response)
                {
                    this._complete(response, e);
                }.bind(this)
            });
        },
        _buildData: function(name, files, data)
        {
            for (var i = 0; i < files.length; i++)
            {
                data.append(name + '[]', files[i]);
            }

            return data;
        },
        _complete: function (response, e)
        {
            this._clearStatuses();

            if (this.params.progress) this.progress.hide();

            // error
            var json = (Array.isArray(response)) ? response[0] : response;

            if (typeof json.type !== 'undefined' && json.type === 'error')
            {
                this._setStatus('error');
                this.response.parse(response);
                this.app.broadcast('upload.error', this, response);
            }
            // complete
            else
            {
                this._setStatus('success');

                switch (this.params.type)
                {
                    case 'image':
                        this._completeBoxImage(response);
                        break;
                    case 'file':
                        this._completeBoxFile(response);
                        break;
                    default:
                        this._completeBoxUpload(response);
                }

                this.app.broadcast('upload.complete', this, response);
                setTimeout(this._clearStatuses.bind(this), 500);
            }
        },
        _completeBoxUpload: function(response)
        {
            this.response.parse(response);
        },
        _completeBoxImage: function(response)
        {
            for (var key in response)
            {
                // img
                var $img = $K.dom('<img>');
                $img.attr('src', response[key].url);

                // close
                var $close = $K.dom('<span>');
                $close.addClass('close');
                $close.on('click', this._removeImage.bind(this));

                // hidden
                var $hidden = $K.dom('<input>');
                $hidden.attr('type', 'hidden');
                $hidden.attr('name', this._getHiddenName());
                $hidden.val(response[key].id);

                // item
                var $item = $K.dom('<div>');
                $item.addClass('upload-item is-uploaded');
                $item.attr('data-id', response[key].id);

                if (this.isMultiple)
                {
                    // append
                    $item.append($close);
                    $item.append($img);
                    $item.append($hidden);

                    this.$box.last().before($item);
                }
                // single
                else
                {
                    var $lastImg = this.$box.find('img');
                    if ($lastImg.length !== 0)
                    {
                        this._removeFileRequest(this.$box.attr('data-id'));
                    }

                    this.$box.html('');
                    this.$box.attr('data-id', response[key].id);
                    this.$box.append($close);
                    this.$box.append($img);
                    this.$box.append($hidden);

                    return;
                }
            }
        },
        _completeBoxFile: function(response)
        {
            if (!this.isMultiple) this._clearTarget();

            for (var key in response)
            {
                // item
                var $item = $K.dom('<div>');
                $item.addClass('upload-item');
                $item.attr('data-id', response[key].id);

                // file
                var $file = $K.dom('<span>');
                $file.html(response[key].name);

                // close
                var $close = $K.dom('<span>');
                $close.addClass('close');
                $close.on('click', this._removeFile.bind(this));

                // hidden
                var $hidden = $K.dom('<input>');
                $hidden.attr('type', 'hidden');
                $hidden.attr('name', this._getHiddenName());
                $hidden.val(response[key].id);

                // size
                if (typeof response[key].size !== 'undefined')
                {
                    var $size = $K.dom('<em>');
                    $size.html(response[key].size);

                    $file.append($size);
                }

                // append
                $item.append($close);
                $item.append($file);
                $item.append($hidden);

                // target
                this.$target.append($item);
                this._upCount();
            }
        }
    });
})(Kube);