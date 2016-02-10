(function(_utils) {

  VP.Collections.Games = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      return 'http://localhost:3001/vp/games/' + this.period.year + '/' + this.period.month;
    },

    initialize: function() {
      this.period = _utils.getCurrentPeriod();
    },

    setPeriod: function(periodString) {
      this.period = _utils.getPeriod(periodString);
    }

  });

})(VP.utils);