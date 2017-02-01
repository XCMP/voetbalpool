VP.Data.months = {

  MONTH_TEXT_ARRAY: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  months: null,

  init: function() {
    this.months = this.getMonthsObjectArray();
  },

  setSelectedPeriod: function(periodAsString) {
    _.each(this.months, function(month) {
      month.selected = month.yyyymm === periodAsString;
    });
  },

  getSelectedPeriod: function() {
    return _.find(this.months, function(month) {
      return month.selected;
    });
  },

  getData: function() {
    return this.months;
  },

  getLastMonth: function() {
    return moment('2015-12', 'YYYY-MM');
  },

  getMonthsObjectArray: function() {
    const currentPeriod = this.getCurrentYearMonth();
    var date = this.getStartDate();
    const lastMonth = this.getLastMonth();
    const monthsData = [];
    do {
      const yearMonthString = date.format('YYYY-MM');
      const yearMonthObject = this.getPeriod(yearMonthString);
      monthsData.push({
        'yyyymm' : yearMonthString,
        'year': yearMonthObject.year,
        'month': yearMonthObject.month,
        'selected': yearMonthString === currentPeriod,
        'text' : this.getMonthYearText(yearMonthString)
      });
      date = this.subtractMonth(date);
    } while (lastMonth.diff(date) < 0);
    return monthsData;
  },

  getPeriod: function(periodString) {
    var period = {};
    var periodArray = periodString.split('-');
    period.year = periodArray[0];
    period.month = periodArray[1];
    return period;
  },

  getMonthYearText: function(yyyymm) {
    var yearMonthArray = yyyymm.split('-');
    var year = yearMonthArray[0];
    var monthIndex = parseInt(yearMonthArray[1], 10) - 1;
    return this.MONTH_TEXT_ARRAY[monthIndex] + ' ' + year;
  },

  getCurrentYearMonth: function () {
    return moment().format('YYYY-MM');
  },

  subtractMonth: function(date) {
    return date.add(-1 , 'M');
  },

  getStartDate: function () {
    return moment().add(+2, 'M');
  }

};