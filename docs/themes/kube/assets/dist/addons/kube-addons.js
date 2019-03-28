(function($K)
{
    $K.add('module', 'autocomplete', {
        init: function(app, context)
        {
            this.app = app;
            this.$doc = app.$doc;
            this.$win = app.$win;
            this.$body = app.$body;
            this.animate = app.animate;

            // defaults
            var defaults = {
        		url: false,
        		min: 2,
        		labelClass: false,
        		target: false,
        		param: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();
        },
        start: function()
        {
            this._build();

    		this.timeout = null;
    		this.$element.on('keyup.kube.autocomplete', this._open.bind(this));
    	},
    	stop: function()
    	{
    		this.$box.remove();

            this.$element.off('.kube.autocomplete');
    		this.$doc.off('.kube.autocomplete');
    		this.$win.off('.kube.autocomplete');
    	},

    	// private
    	_build: function()
    	{
            this.$box = $K.dom('<div />');
            this.$box.addClass('autocomplete');
            this.$box.addClass('is-hidden');

            this.$body.append(this.$box);

            if (this.$target && !this._isInputTarget())
            {
                this.$target.addClass('autocomplete-labels');

                var $closes = this.$target.find('.close');
                $closes.on('click', this._removeLabel.bind(this));
            }
    	},
    	_open: function(e)
    	{
    		if (e) e.preventDefault();

    		clearTimeout(this.timeout);

    		var value = this.$element.val();
    		if (value.length >= this.params.min)
    		{
        		this._resize();
        		this.$win.on('resize.kube.autocomplete', this._resize.bind(this));
        		this.$doc.on('click.kube.autocomplete', this._close.bind(this));

    			this.$box.addClass('is-open');
    			this._listen(e);
    		}
    		else
    		{
    			this._close(e);
    		}
    	},
    	_close: function(e)
    	{
    		if (e) e.preventDefault();

    		this.$box.removeClass('is-open');
    		this.$box.addClass('is-hidden');

    		this.$doc.off('.kube.autocomplete');
    		this.$win.off('.kube.autocomplete');
        },
    	_getPlacement: function(pos, height)
    	{
            return ((this.$doc.height() - (pos.top + height)) < this.$box.height()) ? 'top' : 'bottom';
    	},
    	_resize: function()
    	{
        	this.$box.width(this.$element.width());
    	},
    	_getParamName: function()
    	{
            return (this.params.param) ? this.params.param : this.$element.attr('name');
    	},
    	_getTargetName: function()
    	{
        	var name = this.$target.attr('data-name');

            return (name) ? name : this.$target.attr('id');
    	},
    	_lookup: function()
    	{
    		var data = this._getParamName() + '=' + this.$element.val();

    		$K.ajax.post({
    			url: this.params.url,
    			data: data,
    			success: this._complete.bind(this)
    		});
    	},
    	_complete: function(json)
    	{
			this.$box.html('');

			if (json.length === 0) return this._close();

			for (var i = 0; i < json.length; i++)
			{
				var $item = $K.dom('<a>');
				$item.attr('href', '#');
				$item.attr('rel', json[i].id);

				$item.html(json[i].name);
				$item.on('click', this._set.bind(this));

				this.$box.append($item);
			}

            var pos = this.$element.offset();
			var height = this.$element.height();
			var width = this.$element.width();
    		var placement = this._getPlacement(pos, height);
			var top = (placement === 'top') ? (pos.top - this.$box.height() - height) : (pos.top + height);

			this.$box.css({ width: width + 'px', top: top + 'px', left: pos.left + 'px' });
			this.$box.removeClass('is-hidden');
    	},
    	_listen: function(e)
    	{
    		switch(e.which)
    		{
    			case 40: // down
    				e.preventDefault();
    				this._select('next');
    			break;

    			case 38: // up
    				e.preventDefault();
    				this._select('prev');
    			break;

    			case 13: // enter
    				e.preventDefault();
    				this._set();
    			break;

    			case 27: // esc
    				this._close(e);
    			break;

    			default:
    				this.timeout = setTimeout(this._lookup.bind(this), 300);
    			break;
    		}
    	},
    	_select: function(type)
    	{
    		var $links = this.$box.find('a');
    		var $active = this.$box.find('.is-active');

    		$links.removeClass('is-active');

            var $item = this._selectItem($active, $links, type);
    		$item.addClass('is-active');
    	},
    	_selectItem: function($active, $links, type)
    	{
        	var $item;
        	var isActive = ($active.length !== 0);
        	var size = (type === 'next') ? 0 : ($links.length - 1);

            if (isActive)
            {
                $item = $active[type]();
            }

            if (!isActive || !$item || $item.length === 0)
            {
                $item = $links.eq(size);
            }

            return $item;
    	},
    	_set: function(e)
    	{
    		var $active = this.$box.find('.is-active');

    		if (e)
    		{
    			e.preventDefault();
    			$active = $K.dom(e.target);
    		}

    		var id = $active.attr('rel');
            var value = $active.html();

            if (this.$target.length !== 0)
            {
                if (this._isInputTarget())
                {
                    this.$target.val(value);
                }
                else
                {
                    var $added = this.$target.find('[data-id="' + id + '"]');
                    if ($added.length === 0)
                    {
                        this._addLabel(id, value);
                    }
        		}

        		this.$element.val('');
    		}
    		else
    		{
        	    this.$element.val(value);
    		}

            this.$element.focus();

    		this.app.broadcast('autocomplete.set', this, value);
    		this._close();
    	},
    	_addLabel: function(id, name)
    	{
            var $label = $K.dom('<span>');
            $label.addClass('label');
            $label.attr('data-id', id);
            $label.text(name + ' ');

            if (this.params.labelClass)
            {
                $label.addClass(this.params.labelClass);
            }

            var $close = $K.dom('<span>');
            $close.addClass('close');
            $close.on('click', this._removeLabel.bind(this));

            var $input = $K.dom('<input>');
            $input.attr('type', 'hidden');
            $input.attr('name', this._getTargetName() + '[]');
            $input.val(name);

            $label.append($close);
            $label.append($input);

            this.$target.append($label);
    	},
    	_isInputTarget: function()
    	{
            return (this.$target.get().tagName === 'INPUT');
    	},
    	_removeLabel: function(e)
    	{
        	e.preventDefault();

        	var $el = $K.dom(e.target);
        	var $label = $el.closest('.label');

        	this.animate.run($label, 'fadeOut', function()
        	{
            	$label.remove();
        	}.bind(this))
    	}
    });
})(Kube);

(function($K)
{
    $K.add('module', 'combobox', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;

            // defaults
            var defaults = {
                placeholder: ''
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
    	},
    	start: function()
    	{
        	this._buildSource();
        	this._buildCaret();
        	this._buildEvent();
    	},
    	stop: function()
    	{
        	this.$sourceBox.after(this.$element);
        	this.$sourceBox.remove();

        	this.$element.off('.kube.combobox');
        	this.$win.off('.kube.combobox');
    	},

    	// private
    	_buildSource: function()
    	{
        	this.$sourceBox = $K.dom('<div>');
        	this.$sourceBox.addClass('combobox');

        	this.$source = $K.dom('<input>');
        	this.$source.attr('type', 'text');
        	this.$source.attr('placeholder', this.params.placeholder);

            this.$sourceBox.width(this.$element.width());
            this.$sourceBox.append(this.$source);

        	this.$element.after(this.$sourceBox);
        	this.$element.attr('class', '');
        	this.$element.attr('style', '');
        	this.$sourceBox.append(this.$element);

        	this.$win.on('resize.kube.combobox', this._resize.bind(this));
    	},
        _buildCaret: function()
        {
            this.$sourceCaret = $K.dom('<span>');
            this.$sourceCaret.addClass('combobox-caret');

            this.$sourceBox.append(this.$sourceCaret);
        },
        _buildEvent: function()
        {
            this.$element.on('change.kube.combobox', this._select.bind(this));
            this.$source.on('keyup.kube.combobox', this._type.bind(this));
        },
        _resize: function()
        {
            this.$sourceBox.width(this.$element.width());
        },
        _type: function(e)
        {
            var value = this.$source.val();

            this.app.broadcast('combobox.set', this, value);

            if (this.$sourceValue) this.$sourceValue.remove();
            if (value.trim() === '') return;

            this.$sourceValue = $K.dom('<option>');
            this.$sourceValue.attr('value', value);
            this.$sourceValue.attr('selected', true);
            this.$sourceValue.text(value);
            this.$sourceValue.addClass('is-hidden');

            this.$element.append(this.$sourceValue);
        },
        _select: function(e)
        {
            var el = e.target;
            var value = el.options[el.selectedIndex].text;

            if (this.$sourceValue) this.$sourceValue.remove();
            this.$source.val(value);

            this.app.broadcast('combobox.set', this, value);
        }
    });
})(Kube);
(function($K)
{
    var datepickerId = 0;

    $K.add('module', 'datepicker', {
        translations: {
      		en: {
            	"days": [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
            	"months": ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            	"months-short": ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        },
        init: function(app, context)
        {
            this.app = app;
            this.$doc = app.$doc;
            this.$win = app.$win;
            this.$body = app.$body;
            this.lang = app.lang;
            this.animate = app.animate;

            // defaults
            var defaults = {
        		year: false,
        		month: false,
        		day: false,
        		format: '%d.%m.%Y', // %d, %m, %F, %M, %Y
        		embed: false,
        		target: false,
        		selectYear: false,
        		sundayFirst: false,
                startDate: false, // string
    		    endDate: false, // string
        		animationOpen: 'slideDown',
            	animationClose: 'slideUp',
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();

            // local
            this.uuid = datepickerId++;
            this.namespace = '.kube.datepicker-' + this.uuid;
            this.dateRegexp = /^(.*?)(\/|\.|,|\s|\-)(.*?)(?:\/|\.|,|\s|\-)(.*?)$/;
    		this.value = '';
    		this.today = {};
    		this.current = {};
    		this.next = {};
    		this.prev = {};
    		this.selected = {};
        },

        // public
        start: function()
        {
            this.$element.attr('uuid', this.uuid);

            // start / end date
        	this._buildStartEndDate();

            // create datepicker
            this.$datepicker = $K.create('class.datepicker.box', this.app, this);
            this.$datepicker.build();

            // append
    		if (this.params.embed)
    		{
                this.build();
                this.update();

    			this.$datepicker.addClass('is-embed');
    			this.$element.append(this.$datepicker);
    		}
    		else
    		{
        		this.$datepicker.addClass('is-hidden');
    		    this.$body.append(this.$datepicker);
    		    this.$element.on('click' + this.namespace, this._open.bind(this));
    		}
    	},
        stop: function()
        {
    		this._disableEvents();

    		this.$datepicker.remove();

    		this.$element.off(this.namespace);
    		this.$element.removeClass('datepicker-in');
        },
    	build: function()
    	{
            this._buildValue();
        	this._buildTodayDate();
        	this._buildSelectedDate();
        	this._buildCurrentDate();
    	},
    	update: function()
    	{
        	this._buildPrevNextDate();

            this.$grid = $K.create('class.datepicker.grid', this.app, this);
        	this.$grid.build();

            this.$datepicker.setControls(this.prev, this.next);
            this.$datepicker.setMonth(this.lang.get('months')[this.current.month]);
            this.$datepicker.setYear(this.current.year);
            this.$datepicker.setGrid(this.$grid);
    	},

    	// SET
    	setDate: function(e)
    	{
        	e.preventDefault();

        	var $item = $K.dom(e.target);
        	if ($item.attr('data-disabled') === true) return this._close();

        	var obj = {
            	day: $item.attr('data-day'),
            	month: $item.attr('data-month'),
            	year: $item.attr('data-year')
            };

            var date = this._convertDateToFormat(obj);

            if (this.params.embed === false)
    		{
        		var $target = (this.$target.length !== 0) ? this.$target : this.$element;

                if ($target.get().tagName === 'INPUT')
                {
                    $target.val(date);
                }
      			else
      			{
          			$target.text(date);
          		}

    			this._close();
    		}

            this.app.broadcast('datepicker.set', this, date, obj);
    	},
    	setNextMonth: function(e)
    	{
    		e.preventDefault();

    		this.current = this.next;
    		this.update();
    	},
    	setPrevMonth: function(e)
    	{
    		e.preventDefault();

    		this.current = this.prev;
    		this.update();
    	},
    	setYear: function()
    	{
    		this.current.year = this.$datepicker.getYearFromSelect();
    		this.selected.day = false;

            this.$datepicker.setYear(this.current.year);

    		this.update();
    	},

    	// BUILD
        _buildValue: function()
    	{
        	var $target = (this.$target) ? this.$target : this.$element;

            this.value = ($target.get().tagName === 'INPUT') ? $target.val() : $target.text().trim();
    	},
    	_buildTodayDate: function()
    	{
        	var date = new Date();

        	this.today = {
        		year: date.getFullYear(),
        		month: parseInt(date.getMonth() + 1),
        		day: parseInt(date.getDate())
        	};
    	},
    	_buildSelectedDate: function()
    	{
            this.selected = this._parseDateString(this.value);

            // set from params
            if (this.value === '')
            {
  			    this.selected.year = (this.params.year) ? this.params.year : this.selected.year;
                this.selected.month = (this.params.month) ? parseInt(this.params.month) : this.selected.month;
   			    this.selected.day = false;
   			}
    	},
    	_buildCurrentDate: function()
    	{
        	this.current = this.selected;
    	},
    	_buildPrevNextDate: function()
    	{
   			// prev
    		var date = this._getPrevYearAndMonth(this.current.year, this.current.month);
    		this.prev = {
                year: date.year,
        		month: date.month
            };

            // next
    		var date = this._getNextYearAndMonth(this.current.year, this.current.month);
    		this.next = {
                year: date.year,
        		month: date.month
            };
    	},
    	_buildStartEndDate: function()
    	{
            this.params.startDate = (this.params.startDate) ? this._parseDateString(this.params.startDate) : false;
    		this.params.endDate = (this.params.endDate) ? this._parseDateString(this.params.endDate) : false;
    	},
    	_buildPosition: function()
    	{
    		this.position = {};

    		var pos = this.$element.offset();
    		var height = this.$element.innerHeight();
    		var width = this.$element.innerWidth();

    		var datepickerWidth = this.$datepicker.innerWidth();
    		var datepickerHeight = this.$datepicker.innerHeight();

    		var windowWidth = this.$win.width();
    		var documentHeight = this.$doc.height();

    		var right = 0;
    		var left = pos.left;
    		var top = pos.top + height + 1;

    		this.position.type = 'left';

    		if ((left + datepickerWidth) > windowWidth)
    		{
    			this.position.type = 'right';
    			right = (windowWidth - (left + width));
    		}

    		if ((top + datepickerHeight) > documentHeight)
    		{
    			this.params.animationOpen = 'show';
    			this.params.animationClose = 'hide';

    			top = (top - datepickerHeight - height - 2);
    		}

    		this.position.top = top;
    		this.position.left = left;
    		this.position.right = right;
    	},

    	// OPEN
    	_open: function(e)
    	{
        	if (e) e.preventDefault();

    		if (this._isOpened()) return;

            this._closeAll();
    		this.app.broadcast('datepicker.open', this);

    		this.build();
    		this.update();

    		this._buildPosition();
    		this._setPosition();

    		this.animate.run(this.$datepicker, this.params.animationOpen, this._opened.bind(this));
    	},
    	_opened: function()
    	{
    		this._enableEvents();
        	this.$element.addClass('datepicker-in');
    		this.$datepicker.addClass('is-open');
    		this.app.broadcast('datepicker.opened', this);
    	},
    	_isOpened: function()
    	{
        	return this.$datepicker.hasClass('is-open');
    	},

        // CLOSE
    	_close: function(e)
    	{
    		if (e && $K.dom(e.target).closest('.datepicker').length !== 0)
    		{
    			return;
    		}

    		if (!this._isOpened()) return;

    		this.app.broadcast('datepicker.close', this);
    		this.animate.run(this.$datepicker, this.params.animationClose, this._closed.bind(this));
    	},
    	_closed: function()
    	{
    		this._disableEvents();
            this.$datepicker.removeClass('is-open');
    		this.$element.removeClass('datepicker-in');
    		this.app.broadcast('datepicker.closed', this);
    	},
    	_closeAll: function()
    	{
    		$K.dom('.datepicker.is-open').each(function(node)
    		{
    			var $el = $K.dom(node);
    			var id = $el.attr('data-uuid');

    			this.$doc.off('.kube.datepicker-' + id);
    			this.$win.off('.kube.datepicker-' + id);

    			$el.removeClass('is-open');
    			$el.addClass('is-hidden');

    		}.bind(this));

    		$K.dom('.datepicker-in').removeClass('datepicker-in');
    	},

        // EVENTS
        _handleKeyboard: function(e)
    	{
    		if (e.which === 27) this._close();
    	},
    	_enableEvents: function()
    	{
        	this.$doc.on('keyup' + this.namespace, this._handleKeyboard.bind(this));
    		this.$doc.on('click' + this.namespace + ' touchstart' + this.namespace, this._close.bind(this));
    		this.$win.on('resize' + this.namespace, this._resizePosition.bind(this));
    	},
    	_disableEvents: function()
    	{
    		this.$doc.off(this.namespace);
    		this.$win.off(this.namespace);
    	},

    	// POSITION
        _resizePosition: function()
    	{
    		this._buildPosition();
    		this._setPosition();
    	},
    	_setPosition: function()
    	{
        	var left = 'auto';
        	var right = this.position.right + 'px';

    		if (this.position.type === 'left')
    		{
    			left = this.position.left + 'px',
    			right = 'auto';
    		}

 			this.$datepicker.css({ top: this.position.top + 'px', left: left, right: right });
    	},

    	// PARSE
    	_parseDateString: function(str)
    	{
    		var obj = {};
			var date = str.match(this.dateRegexp);
			var format = this.params.format.match(this.dateRegexp);

			obj.year = (date === null) ? this.today.year : parseInt(date[4]);

			if (format[1] === '%m' || format[1] === '%M' || format[1] === '%F')
			{
				obj.month = (date === null) ? this.today.month : this._parseMonth(format[1], date[1]);
				obj.day = (date === null) ? false : parseInt(date[3]);
			}
			else
			{
				obj.month = (date === null) ? this.today.month : this._parseMonth(format[3], date[3]);
				obj.day = (date === null) ? false : parseInt(date[1]);
			}

			obj.splitter = (date === null) ? '.' : date[2];

    		return obj;
    	},
    	_parseMonth: function(type, month)
    	{
        	var index = parseInt(month);

    		if (type === '%M') index = this.lang.get('months-short').indexOf(month);
    		else if (type === '%F') index = this.lang.get('months').indexOf(month);

    		return index;
    	},

    	// CONVERT
    	_convertDateToFormat: function(obj)
    	{
    		var formated = this.params.format.replace('%d', obj.day);
    		formated = formated.replace('%F', this.lang.get('months')[obj.month]);
    		formated = formated.replace('%m', this._addZero(obj.month));
    		formated = formated.replace('%M', this.lang.get('months-short')[obj.month]);
    		formated = formated.replace('%Y', obj.year);

    		return formated;
    	},
        _addZero: function(str)
    	{
    		str = Number(str);
    		return (str < 10) ? '0' + str : str;
    	},

    	// GET
        _getPrevYearAndMonth: function(year, month)
    	{
    		var date = {
        		year: year,
        		month: parseInt(month) - 1
    		};

    		if (date.month <= 0)
    		{
    			date.month = 12;
    			date.year--;
    		}

    		return date;
    	},
    	_getNextYearAndMonth: function(year, month)
    	{
    		var date = {
                year: year,
    		    month: parseInt(month) + 1
    		};

    		if (date.month > 12)
    		{
    			date.month = 1;
    			date.year++;
    		}

    		return date;
    	}
    });
})(Kube);
(function($K)
{
    $K.add('class', 'datepicker.box', {
        mixing: ['dom'],
        init: function(app, datepicker)
        {
            this.app = app;
            this.lang = app.lang;
            this.datepicker = datepicker;
            this.params = datepicker.params;
            this.namespace = datepicker.namespace;
            this.selected = datepicker.selected;
        },
        build: function()
        {
            this._buildBox();
            this._buildHead();
            this._buildControlPrev();
            this._buildMonthBox();
            this._buildControlNext();
            this._buildWeekdays();
            this._buildBody();
        },
        getYearFromSelect: function()
        {
            return Number(this.$yearSelect.val());
        },
        setMonth: function(month)
    	{
    		this.$month.html(month);
        },
        setYear: function(year)
        {
    		this.$yearValue.html(year);

    		if (this.params.selectYear && this.$yearSelect)
    		{
        		this.$yearSelect.val(year);
            }
    	},
    	setGrid: function($grid)
    	{
            this.$dbody.html('');
            this.$dbody.append($grid);
    	},
    	setControls: function(prev, next)
    	{
        	var buildDate = function(obj, d)
        	{
            	d = (d) ? d : obj.day;

            	return new Date(obj.year + '/' + obj.month + '/' + d);
        	}

    		if (this.params.startDate)
    		{
    			var datePrev = buildDate(prev, 31);
    			var start = buildDate(this.params.startDate);
    			var fn = (start.getTime() > datePrev.getTime()) ? 'hide' : 'show';

    			this.$prev[fn]();
    		}

    		if (this.params.endDate)
    		{
    			var dateNext = buildDate(next, 1);
    			var end = buildDate(this.params.endDate);
    			var fn = (end.getTime() < dateNext.getTime()) ? 'hide' : 'show';

                this.$next[fn]();
    		}
    	},
        // private
        _buildBox: function()
        {
            this.parse('<div>');
            this.addClass('datepicker');
        },
        _buildHead: function()
        {
    		this.$head = $K.dom('<div class="datepicker-head">');
    		this.append(this.$head);
        },
        _buildControlPrev: function()
        {
            this.$prev = $K.dom('<span class="datepicker-control datepicker-control-prev" />').html('&lt;');
    		this.$prev.on('click' + this.namespace, this.datepicker.setPrevMonth.bind(this.datepicker));
    		this.$head.append(this.$prev);
        },
        _buildControlNext: function()
        {
            this.$next = $K.dom('<span class="datepicker-control datepicker-control-next" />').html('&gt;');
    		this.$next.on('click' + this.namespace, this.datepicker.setNextMonth.bind(this.datepicker));
    		this.$head.append(this.$next);
        },
        _buildMonthBox: function()
        {
    		this.$monthBox = $K.dom('<div class="datepicker-month-box">');
    		this.$head.append(this.$monthBox);

            this._buildMonth();
            this._buildYear();
            this._buildYearSelect();
        },
        _buildMonth: function()
        {
    		this.$month = $K.dom('<span />');
            this.$monthBox.append(this.$month);
        },
        _buildYear: function()
        {
    		this.$year = $K.dom('<span />');
    		this.$yearValue = $K.dom('<span />');
            this.$year.append(this.$yearValue);

            this.$monthBox.append(this.$year);
        },
        _buildYearSelect: function()
        {
    		if (!this.params.selectYear) return;

    		var now = new Date();
    		var start = (this.params.startDate) ? this.params.startDate.year : (now.getFullYear() - 99);
    		var end = (this.params.endDate) ? this.params.endDate.year : now.getFullYear();

            if ((end - start) < 2)
    		{
    			return;
    		}

    		this.$yearSelect = $K.dom('<select />');
    		this.$year.append(this.$yearSelect);
    		this.$year.append('<span class="datepicker-select-year-caret" />');
    		this.$year.addClass('datepicker-select-year');

    		for (var i = start; i <= end; i++)
    		{
    			var $option = $K.dom('<option value="' + i + '">' + i + '</option>');
    			this.$yearSelect.append($option);
    		}

    		this.$yearSelect.on('change' + this.namespace, this.datepicker.setYear.bind(this.datepicker));

        },
        _buildWeekdays: function()
        {
    		this.$weekdays = $K.dom('<div class="datepicker-weekdays">');

    		var result = [];
    		if (this.params.sundayFirst)
    		{
    			var last = this.lang.get('days').slice(6);
    			result = this.lang.get('days').slice(0, 6);
    			result.unshift(last[0]);
    		}
    		else
    		{
    			result = this.lang.get('days');
    		}

            for (var i = 0; i < result.length; i++)
            {
    			var tr = $K.dom('<span>').html(result[i]);
    			this.$weekdays.append(tr);
    		}

    		this.append(this.$weekdays);
        },
        _buildBody: function()
        {
    		this.$dbody = $K.dom('<div class="datepicker-body">');
    		this.append(this.$dbody);
        }


    });
})(Kube);
(function($K)
{
    $K.add('class', 'datepicker.grid', {
        mixing: ['dom'],
        init: function(app, datepicker)
        {
            this.app = app;
            this.lang = app.lang;
            this.datepicker = datepicker;
            this.params = datepicker.params;
            this.namespace = datepicker.namespace;
            this.today = datepicker.today;
            this.selected = datepicker.selected;
            this.current = datepicker.current;
            this.prev = datepicker.prev;
            this.next = datepicker.next;

            // local
            this.daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        },
        build: function()
        {
            this.parse('<div class="datepicker-grid">');

            var daysInCurrentMonth = this._getDaysInCurrentMonth();
    		var daysInPrevMonth = this._getDaysInPrevMonth();
    		var daysInNextMonth = this._getDaysInNextMonth();

    		// start index
    		var d = new Date(this.current.year, this.current.month - 1, 1);
    		var startIndex = (this.params.sundayFirst) ? d.getDay() + 1 : ((!d.getDay()) ? 7 : d.getDay());

    		var daysPrevMonthStart = daysInPrevMonth - startIndex + 2;
    		var startCurrent = 8 - startIndex;

            var y = 1, c = 1, obj;
    		for (var z = 0; z < 6; z++)
    		{
    			var tr = $K.dom('<div class="datepicker-row">');

    			for (var i = 0; i < 7; i++)
    			{
    				if (z === 0)
    				{
    					var dayPrev = daysPrevMonthStart + i;
    					if (dayPrev > daysInPrevMonth)
    					{

    						// current day
    						obj = this._buildGridObj(i, y, this.current, false, false);
    						y++;
    					}
    					else
    					{
    						// prev day
    						obj = this._buildGridObj(i, dayPrev, this.prev, false, true);
    					}
    				}
    				else if (y > daysInCurrentMonth)
    				{
    					// next day
    					obj = this._buildGridObj(i, c, this.next, true, false);
    					c++;

    				}
    				else
    				{
    					// current day
    					obj = this._buildGridObj(i, y, this.current, false, false);
    					y++;
    				}

    				tr.append(this._buildGridDay(obj));
    			}

    			this.append(tr);
    		}
        },

        // private
    	_buildGridObj: function(i, day, date, next, prev)
    	{
            return {
				day: day,
				next: next,
				prev: prev,
				year: date.year,
				month: date.month,
				date: this._getGridDay(date.year, date.month, day),
				selected: this._isSelectedDate(date.year, date.month, day),
				today: this._isTodayDate(date.year, date.month, day),
				weekend: (i > 4),
				disabled: this._isDisabledDate(date.year, date.month, day)
			};
    	},
    	_buildGridDay: function(obj)
    	{
    		var td = $K.dom('<div class="datepicker-cell">');

    		if (obj.next || obj.prev)
    		{
    			td.addClass('is-out');
    		}

    		if (obj.selected) td.addClass('is-selected');
    		if (obj.today) td.addClass('is-today');
    		if (obj.weekend && this.params.weekend) td.addClass('is-weekend');
    		if (obj.disabled) td.addClass('is-disabled');

    		var $item = $K.dom('<a>');

    		$item.html(obj.day);
            $item.attr('href', '#');

            $item.attr('data-disabled', obj.disabled);
            $item.attr('data-date', obj.date);
            $item.attr('data-day', obj.day);
            $item.attr('data-month', obj.month);
            $item.attr('data-year', obj.year);

    		$item.on('click', this.datepicker.setDate.bind(this.datepicker));

    		return td.append($item);

    	},
    	_isSelectedDate: function(year, month, day)
    	{
    		return (this.selected.year === year && this.selected.month === month && this.selected.day === day);
    	},
    	_isTodayDate: function(year, month, day)
    	{
    		return (this.today.year === year && this.today.month === month && this.today.day === day);
    	},
    	_isDisabledDate: function(year, month, day)
    	{
    		var date = new Date(year + '/' + month + '/' + day);

    		if (this.params.startDate)
    		{
    			var dateStart = new Date(this.params.startDate.year + '/' + this.params.startDate.month + '/' + this.params.startDate.day);
    			if (date.getTime() < dateStart.getTime())
    			{
    				return true;
    			}
    		}

    		if (this.params.endDate)
    		{
    			var dateEnd = new Date(this.params.endDate.year + '/' + this.params.endDate.month + '/' + this.params.endDate.day);
    			if (date.getTime() > dateEnd.getTime())
    			{
    				return true;
    			}
    		}

    		return false;
    	},
    	_getGridDay: function(year, month, day)
    	{
    		return year + '-' + month + '-' + day;
    	},
    	_getDaysInCurrentMonth: function()
    	{
    		return this._getDaysInMonth(this.current.year, this.current.month);
    	},
    	_getDaysInPrevMonth: function()
    	{
    		return this._getDaysInMonth(this.prev.year, this.prev.month);
    	},
    	_getDaysInNextMonth: function()
    	{
    		return this._getDaysInMonth(this.next.year, this.next.month);
    	},
    	_getDaysInMonth: function (year, month)
    	{
    		return (((0 === (year%4)) && ((0 !== (year%100)) || (0 === (year%400)))) && (month === 1)) ? 29 : this.daysInMonth[month];
    	}
    });
})(Kube);
(function($K)
{
    $K.add('module', 'editable', {
        init: function(app, context)
        {
            this.app = app;

            // defaults
            var defaults = {
                classname: 'editable',
                focus: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$element.addClass(this.params.classname).attr('contenteditable', true);

            this._setFocus();
            this._setEvents();
    	},
    	stop: function()
    	{
            this.$element.removeClass(this.params.classname).removeAttr('contenteditable');
            this.$element.off('.kube.editable');
    	},
    	// private
    	_setEvents: function()
    	{
            this.$element.on('keydown.kube.editable', this._keydown.bind(this));
            this.$element.on('paste.kube.editable', this._paste.bind(this));
            this.$element.on('blur.kube.editable', this._blur.bind(this));
    	},
    	_setFocus: function()
    	{
            if (this.params.focus) this.$element.focus();
    	},
    	_checkEmpty: function()
    	{
            if (!this.$element.text().replace(" ", "").length)
            {
                this.$element.empty();
            }
    	},
    	_paste: function(e)
    	{
            e.preventDefault();

            var event = (e.originalEvent || e);

            var text = '';
            if (event.clipboardData)
            {
                text = event.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
            }
            else if (window.clipboardData)
            {
                text = window.clipboardData.getData('Text');
                document.selection.createRange().pasteHTML(text);
            }
    	},
    	_blur: function(e)
    	{
            this._checkEmpty();
    	},
    	_keydown: function(e)
    	{
        	// disable enter key
        	if (e.which === 13) e.preventDefault();
    	}
    });
})(Kube);
(function($K)
{
    $K.add('module', 'magicquery', {
        init: function(app, context)
        {
            this.app = app;
            this.response = app.response;

            // defaults
            var defaults = {
                url: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },
        // public
        start: function()
        {
            this.$element.on('click.kube.magicquery', this._send.bind(this));
        },
        stop: function()
        {
            this._enable();
            this.$element.off('.kube.magicquery');
        },

        // private
        _disable: function()
        {
            this.$element.attr('disabled', true);
        },
        _enable: function()
        {
            this.$element.removeAttr('disabled');
        },
        _send: function(e)
        {
            e.preventDefault();
            this._disable();

            $K.ajax.post({
    			url: this.params.url,
    			success: this._parse.bind(this)
    		});
        },
        _parse: function(data)
        {
            this._enable();

            var json = this.response.parse(data);
            if (json)
            {
    			this.app.broadcast('magicquery.success', this, json);
    		}
        },
    });
})(Kube);
(function($K)
{
    $K.add('module', 'number', {
        init: function(app, context)
        {
            this.app = app;

            // context
            this.context = context;
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$input = this.$element.find('input[type="number"]');
            this.$btnUp = this.$element.find('.is-up');
            this.$btnDown = this.$element.find('.is-down');

            this._buildStep();
            this._buildMin();
            this._buildMax();

            if (!this._isDisabled())
            {
                this.$btnUp.on('click.kube.number', this._increase.bind(this));
                this.$btnDown.on('click.kube.number', this._decrease.bind(this));
            }
    	},
    	stop: function()
    	{
            this.$btnUp.off('.kube.number');
            this.$btnDown.off('.kube.number');
    	},
    	// private
    	_buildStep: function()
    	{
            var step = this.$input.attr('step');
            this.step = (step) ? parseFloat(step) : 1;
    	},
    	_buildMin: function()
    	{
            var min = this.$input.attr('min');
            this.min = (min) ? parseFloat(min) : false;
    	},
    	_buildMax: function()
    	{
            var max = this.$input.attr('max');
            this.max = (max) ? parseFloat(max) : false;
    	},
    	_isDisabled: function()
    	{
        	return this.$input.attr('disabled');
    	},
    	_getValue: function()
    	{
        	var value = parseFloat(this.$input.val());
        	var min = (this.min === false) ? 0 : this.min;

        	return (isNaN(value)) ? min : value;
    	},
    	_increase: function(e)
    	{
        	if (e)
        	{
            	e.preventDefault();
            	e.stopPropagation();
        	}

            var oldValue = this._getValue();
            var newVal = (this.max !== false && oldValue >= this.max) ? oldValue : oldValue + this.step;

            this.$input.val(newVal);
        },
        _decrease: function(e)
        {
        	if (e)
        	{
            	e.preventDefault();
            	e.stopPropagation();
        	}

            var oldValue = this._getValue();
            var newVal = (this.min !== false && oldValue <= this.min) ? oldValue : oldValue - this.step;

            this.$input.val(newVal);
    	}
    });
})(Kube);
(function($K)
{
    $K.add('module', 'selector', {
        init: function(app, context)
        {
            this.app = app;

            // context
            this.context = context;
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$selector = this._buildSelector();
            this.$selector.on('change.kube.selector', this._toggle.bind(this));
        },
        stop: function()
        {
            this.$selector.off('.kube.selector');
    	},

    	// private
    	_isSelect: function()
    	{
        	return (this.$element.get().tagName === 'SELECT');
    	},
    	_isHashValue: function(value)
    	{
            return (value.search(/^#/) === 0);
    	},
    	_buildSelector: function()
    	{
            return (this._isSelect()) ? this.$element : this.$element.find('input[type="radio"]');
    	},
    	_getValue: function()
    	{
        	return (this._isSelect()) ? this.$selector.val() : this.$selector.filter(':checked').val();
    	},
    	_getBoxes: function()
    	{
        	var $boxes = $K.dom([]);
            var $targets = (this._isSelect()) ? this.$selector.find('option') : this.$selector;

            $targets.each(function(node)
            {
                if (this._isHashValue(node.value))
                {
                    $boxes.add($K.dom(node.value));
                }

            }.bind(this));

            return $boxes;
    	},
    	_toggle: function()
    	{
            var value = this._getValue();
            var $boxes = this._getBoxes();
            var $box = $K.dom(value);

            $boxes.addClass('is-hidden');
            $box.removeClass('is-hidden');

            this.app.broadcast('selector.opened', this, $box);
    	}
    });
})(Kube);
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
(function($K)
{
    $K.add('module', 'validate', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;
            this.progress = app.progress;
            this.response = app.response;

            // defaults
            var defaults = {
                errorClass: 'is-error',
                send: true,
                trigger: false,
                shortcut: false,
                progress: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },
        // public
        start: function()
        {
            this._disableDefaultValidation();
    		this._enableShortcut();

    		if (this.params.trigger)
    		{
        		this._startTrigger();
            }
            else
            {
        		this._startSubmit();
            }
    	},
        stop: function()
        {
    		this.enableButtons();
    		this.clear();

    		this.$element.off('.kube.validate');
    		this.$win.off('.kube.validate');

    		if (this.$trigger) this.$trigger.off('.');
        },
    	clear: function()
    	{
    		this.$element.find('.' + this.params.errorClass).each(this._clearError.bind(this));
    	},
    	disableButtons: function()
    	{
    		this.$element.find('button').attr('disabled', true);
    	},
    	enableButtons: function()
    	{
    		this.$element.find('button').removeAttr('disabled');
    	},

        // private
        _build: function(e)
        {
            e.preventDefault();

    		if (this.params.send) this._send();
            else this.app.broadcast('validate.send', this);

            return false;
        },
        _send: function()
        {
    		if (this.params.progress)
    		{
        		this.progress.show();
            }

    		this.disableButtons();
            this._saveCodeMirror();

    		this.app.broadcast('validate.send', this);

    		$K.ajax.post({
    			url: this.$element.attr('action'),
    			data: this.$element.serialize(),
    			success: this._parse.bind(this)
    		});

    		return false;
        },
        _parse: function(data)
        {
    		this.enableButtons();
    		this.clear();

    		if (this.params.progress)
    		{
                this.progress.hide();
    		}

            var json = this.response.parse(data);
            if (!json)
            {
                this.app.broadcast('validate.error', this, json);
            }
    		else if (typeof json.type !== 'undefined' && json.type === 'error')
    		{
    			this._setErrors(json.errors);
    			this.app.broadcast('validate.error', this, json.errors);
    		}
    		else
    		{
    			this.app.broadcast('validate.success', this, json);
    		}
        },
    	_setErrors: function(errors)
    	{
        	for (var name in errors)
        	{
                var text = errors[name];
                var $el = this.$element.find('[name=' + name + ']');
            	if ($el.length !== 0)
                {
        			$el.addClass(this.params.errorClass);
                    this._setFieldEvent($el, name);

        			if (text !== '')
        			{
            			this._showErrorText(name, text);
        			}
    			}
            }
    	},
    	_setFieldEvent: function($el, name)
    	{
        	var eventName = this._getFieldEventName($el);
    		$el.on(eventName + '.kube.validate', function()
    		{
        		this._clearError($el);
    		}.bind(this));
    	},
    	_showErrorText: function(name, text)
    	{
        	var $el = this.$element.find('#' + name + '-validation-error');
        	$el.addClass(this.params.errorClass);
        	$el.html(text);
        	$el.removeClass('is-hidden');
    	},
        _getFieldEventName: function($el)
        {
    		return ($el.get().tagName === 'SELECT' || $el.attr('type') === 'checkbox' || $el.attr('type') === 'radio') ? 'change' : 'keyup';
        },
    	_clearError: function(node)
    	{
        	var $el = $K.dom(node);
            var $errorEl = this.$element.find('#' + $el.attr('name') + '-validation-error');

    		$errorEl.removeClass(this.params.errorClass);
    		$errorEl.html('');
    		$errorEl.addClass('is-hidden');

    		$el.removeClass(this.params.errorClass).off('.kube.validate');
    	},
    	_saveCodeMirror: function()
    	{
            $K.dom('.CodeMirror').each(function(node)
    		{
    			node.CodeMirror.save();
    		});
    	},
    	_disableDefaultValidation: function()
    	{
    		this.$element.attr('novalidate', 'novalidate');
    	},
    	_enableShortcut: function()
    	{
    		if (!this.params.shortcut) return;

        	// ctrl + s or cmd + s
    		this.$win.on('keydown.kube.validate', this._handleShortcut.bind(this));
    	},
    	_handleShortcut: function(e)
    	{
    		if (((e.ctrlKey || e.metaKey) && e.which === 83))
    		{
    			e.preventDefault();
    			return this._send();
    		}

    		return true;
    	},
    	_startTrigger: function()
    	{
        	this.$trigger = $(this.opts.trigger);

    		this.$element.on('submit', function() { return false; });
    		this.$trigger.off('.kube.validate');
    		this.$trigger.on('click.kube.validate', this._build.bind(this));
    	},
    	_startSubmit: function()
    	{
    		this.$element.on('submit.kube.validate', this._build.bind(this));
    	}
    });
})(Kube);
(function($K)
{
    $K.add('module', 'visibility', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;

            // defaults
            var defaults = {
                tolerance: 15 // px
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$win.on('scroll.kube.visibility resize.kube.visibility', this._check.bind(this));
            this._check();
    	},
    	stop: function()
    	{
            this.$win.off('.kube.visibility');
    	},

    	// private
        _check: function()
        {
            var docViewTop = this.$win.scrollTop();
            var docViewBottom = docViewTop + this.$win.height();
            var elemTop = this.$element.offset().top;
            var elemBottom = elemTop + this.$element.height();

            var check = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= (docViewBottom + this.params.tolerance)) &&  (elemTop >= docViewTop));
            if (check)
            {
                this.app.broadcast('visibility.visible', this, this.$element);
            }
            else
            {
                this.app.broadcast('visibility.invisible', this, this.$element);
            }
        }
    });
})(Kube);