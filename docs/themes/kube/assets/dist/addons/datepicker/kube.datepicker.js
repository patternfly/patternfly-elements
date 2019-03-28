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