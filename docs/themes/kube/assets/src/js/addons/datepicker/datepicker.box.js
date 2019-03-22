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