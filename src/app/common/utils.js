VP.utils = {

  formattedDate: function(dateObject) {
    return this.pad(dateObject.getDate(), 2)  + '-' + this.pad((dateObject.getMonth()+1), 2) + '-' + dateObject.getFullYear();
  },

  // input DD-MM-YYY: output MM/DD/YYYY
  toDate: function(dateString) {
    var parts = dateString.split('-');
    return this.pad(parts[1], 2) + '/' + this.pad(parts[0],2) + '/' + this.pad(parts[2], 4);
  },

  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  /**
   * example: YYYY-MM-DDT00:00:00.000Z
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
        yes: data.yes
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

  displayErrorMessage: function(errorMessage) {
    var $form = $('form');
    $form.find('span[class=\'errorMessage\']').first().text(errorMessage);
  },

  displayFieldError: function(errorObject) {
    var $divFieldContainer = $('[field=\''+errorObject.fieldName+'\']');
    this.removeError($divFieldContainer);
    $divFieldContainer.addClass('error');
    $divFieldContainer.append('<span class=\'errorMessage\'>'+errorObject.errorMessage+'</span>');
  },

  removeFieldError: function($divFieldContainer) {
    $divFieldContainer.removeClass('error');
    $divFieldContainer.find('span[class=\'errorMessage\']').last().remove();
  }

};