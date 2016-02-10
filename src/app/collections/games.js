(function(_utils) {

  VP.Collections.Games = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      if (this.period) {
        return 'http://localhost:3001/vp/games/' + this.period.year + '/' + this.period.month;
      } else {
        return 'http://localhost:3001/vp/games';
      }
    },

    initialize: function(options) {
      if (!options) {
        this.period = _utils.getCurrentPeriod();
      }
    },

    setPeriod: function(periodString) {
      this.period = _utils.getPeriod(periodString);
    }

  });

})(VP.utils);