VP.utils = {

  formattedDate: function(dateObject) {
    return this.pad(dateObject.getDate(), 2)  + '-' + this.pad((dateObject.getMonth()+1), 2) + '-' + dateObject.getFullYear();
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
      });
      modalWindow.confirmationView.render();
    }

};