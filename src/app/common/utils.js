VP.utils = {

  /**
   * input  DD-MM-YYYY
   * output MM/DD/YYYY
  */
  ddmmyyyyToDate: function(dateString) {
    if (dateString == undefined || dateString.length == 0) {
      return null;
    }

    var parts = dateString.split('-');
    if (parts.length == 3) { 
      return this.pad(parts[1], 2) + '/' + this.pad(parts[0],2) + '/' + this.pad(parts[2], 4);
    } else {
      return '00/00/0000'; // invalid date
    }
  },

  MonthTextArray: ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'], 
  getMonthYearText: function(yyyymm) {
    var yearMonthArray = yyyymm.split('-');
    var year = yearMonthArray[0];
    var monthIndex = parseInt(yearMonthArray[1], 10) - 1;
    return this.MonthTextArray[monthIndex] + ' ' + year;
  },

  /**
   * input  DD-MM-YYYY HH:MM
   * output MM/DD/YYYY HH:MM
  */
  ddmmyyyyhhmmToDateTime: function(dateString) {
    if (dateString == undefined || dateString.length == 0) {
      return null;
    }

    var parts = dateString.split(/[\s,-]+/);
    if (parts.length == 4) { 
      return this.pad(parts[1], 2) + '/' + this.pad(parts[0],2) + '/' + this.pad(parts[2], 4) + ' ' + parts[3];
    } else {
      return '00/00/0000 00:00'; // invalid date time
    }
  },

  getCurrentPeriod: function() {
    var period = {};
    var currentDate = new Date();
    period.year = currentDate.getFullYear();
    period.month = this.pad(currentDate.getMonth() + 1, 2);
    return period;
  },

  getCurrentPeriodAsString: function() {
    var period = {};
    var currentDate = new Date();
    period.year = currentDate.getFullYear();
    period.month = this.pad(currentDate.getMonth() + 1, 2);
    return period.year+'-'+period.month;
  },

  getPeriod: function(periodString) {
    var period = {};
    var periodArray = periodString.split('-');
    period.year = periodArray[0];
    period.month = periodArray[1];
    return period;
  },

  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  /**
   * input example: 09/21/1974
   */
  calculateAge: function(jsonDate) {
    if (jsonDate) {
      var ageDifMs = Date.now() - new Date(jsonDate);
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return '-';
    }
  },
  
  showModalWindow: function(data) {
    var modalWindow = new VP.Views.ModalWindow({
        header: data.header,
        content: data.content,
        back: data.back
      }).render();
    },

  showConfirmDialog: function(data) {
    var modalWindow = new VP.Views.ModalWindow({
        confirmDialog: true,
        header: data.header,
        content: data.content,
        yes: data.yes,
        no: data.no
      }).render();
    },

  formDataToJSON: function($form) {
    var o = {};
    var a = $form.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  },

  displayFieldError: function(errorObject) {
    var $divFieldContainer = this.getFieldContainer(errorObject.path);
    this.removeFieldError($divFieldContainer);
    $divFieldContainer.addClass('error');
    $divFieldContainer.append('<span class=\'errorMessage\'>'+errorObject.message+'</span>');
  },

  removeFieldErrors: function() {
    var _this = this;
    $('div.error').each(function(i, el) {
      _this.removeFieldError($(el));
    })
  },

  removeFieldError: function($divFieldContainer) {
    $divFieldContainer.removeClass('error');
    $divFieldContainer.find('span[class=\'errorMessage\']').last().remove();
  },

  removeFieldErrorByName: function(fieldName) {
    var $divFieldContainer = this.getFieldContainer(fieldName);
    this.removeFieldError($divFieldContainer);
  },

  getFieldContainer: function(fieldName) {
    return $('[field*=\'' + fieldName + '\']');
    // return $('[field=\'' + fieldName + '\']');
  }

};