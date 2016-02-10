(function(_utils) {

  VP.Collections.Predictions = Backbone.Collection.extend({

    model: VP.Models.Prediction,

    url: function() {
      return 'http://localhost:3001/vp/predictions/' + this.period.year + '/' + this.period.month;
    },

    initialize: function() {
      this.period = _utils.getCurrentPeriod();
    },

    comparator: function(model) {
      // sort by matchday descending
      return new Date(model.get('game').matchDay).getTime() * -1;
    },

    setInitPeriod: function() {
      this.period = _utils.getCurrentPeriod();
    },

    setPeriod: function(periodString) {
      this.period = _utils.getPeriod(periodString);
    }

  });

})(VP.utils);