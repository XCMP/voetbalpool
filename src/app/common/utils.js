VP.utils = {

  formattedDate: function(dateObject) {
    return this.pad(dateObject.getDate(), 2)  + '-' + this.pad((dateObject.getMonth()+1), 2) + '-' + dateObject.getFullYear();
  },

  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  calculateAge: function(jsonDate) {
      if (jsonDate) {
        var ageDifMs = Date.now() - new Date(jsonDate);
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      } else {
        return '-';
      }
    }

};