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

  /**
   * input  DD-MM-YYYY HH:MM
   * output MM/DD/YYYY HH:MM+00:00
  */
  ddmmyyyyhhmmToDateTimeTimezone: function(dateString) {
    var parts = dateString.split(/[\s,-]+/);
    var timezoneOffsetString = this.getTimezoneOffsetString(parts.slice(0, 3));
    return this.pad(parts[2], 4)
        + '-' + this.pad(parts[1], 2)
        + '-' + this.pad(parts[0], 2)
        + 'T' + parts[3]
        + ':00'
        + timezoneOffsetString;
  },

  getTimezoneOffsetString: function(parts) {
    var now = new Date(this.pad(parts[2], 4) + '-' + this.pad(parts[1], 2) + '-' + this.pad(parts[0],2)),
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-';
    return  dif + this.pad(tzo / 60) + ':' + this.pad(tzo % 60);
  },

  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  pad: function(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
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
    new VP.Views.ModalWindow({
        header: data.header,
        content: data.content,
        back: data.back
      }).render();
    },

  showConfirmDialog: function(data) {
    new VP.Views.ModalWindow({
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

  handleErrors: function(response) {
    if (response.response.code === 11000) {
      this.displayFieldError({
        path: 'general',
        message: this.getDuplicateErrorMessage(response.response.errmsg)
      });
    } else {
      _.each(response.response.errors, function(errorObject) {
        // check for casting error
        if (errorObject.name === 'CastError' && errorObject.kind === 'Date') {
          errorObject.message = 'Geen geldige datum opgegeven.';
        }
        this.displayFieldError(errorObject);
      }, this);
    }
  },

  duplicateErrorMessages: {
    'clubs': 'Dit team bestaat al.',
    'games': 'Deze wedstrijd bestaat al.',
    'poolplayers': 'Deze deelnemer bestaat al.',
    'predictions': 'Deze deelnemer heeft al een voorspelling voor deze wedstrijd.'
  },

  getDuplicateErrorMessage: function(errmsg) {
    return _.find(this.duplicateErrorMessages, function(message, key) {
      if (errmsg.indexOf(key) > -1) {
        return key;
      }
    });
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
    return $('[field=\'' + fieldName + '\']');
  },

  lineColorClasses: [
    {
      color: 'red',
      fill: 'rgba(0, 0, 0, 0)'
    },
    {
      color: 'green',
      fill: 'rgba(0, 0, 0, 0)'
    },
    {
      color: 'blue',
      fill: 'rgba(0, 0, 0, 0)'
    },
    {
      color: 'orange',
      fill: 'rgba(0, 0, 0, 0)'
    },
    {
      color: 'black',
      fill: 'rgba(0, 0, 0, 0)'
    }
  ],
  getColor: function(index) {
    return this.lineColorClasses[index].color;
  },
  getFillColor: function(index) {
    return this.lineColorClasses[index].fill;
  }

};