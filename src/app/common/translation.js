VP.Translation = {

  DAYS: [
    ['Mon', 'ma'],
    ['Tue', 'di'],
    ['Wed', 'wo'],
    ['Thu', 'do'],
    ['Fri', 'vr'],
    ['Sat', 'za'],
    ['Sun', 'zo']
  ],

  MONTHS: [
    ['Jan', 'jan'],
    ['Feb', 'feb'],
    ['Mar', 'maa'],
    ['Apr', 'apr'],
    ['May', 'mei'],
    ['Jun', 'jun'],
    ['Jul', 'jul'],
    ['Aug', 'aug'],
    ['Sep', 'sep'],
    ['Oct', 'okt'],
    ['Nov', 'nov'],
    ['Dec', 'dec']
  ],

  translate: function(date) {
    this.DAYS.some(function (d) {
      if (date.indexOf(d[0]) >= 0) {
        date = date.replace(d[0], d[1]);
        return true;
      }
    });

    this.MONTHS.some(function(d) {
      if (date.indexOf(d[0]) >= 0) {
        date = date.replace(d[0], d[1]);
        return true;
      }
    });
    return date;
  }

};