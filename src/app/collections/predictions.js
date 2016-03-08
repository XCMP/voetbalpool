(function() {

  VP.Collections.Predictions = Backbone.Collection.extend({

    model: VP.Models.Prediction,

    url: function () {
      return 'http://localhost:3001/vp/predictions/' + this.period.year + '/' + this.period.month;
    },

    initialize: function () {
      this.period = VP.Data.selectedYearMonth;
    },

    comparator: function (model) {
      // sort by matchday ascending
      return new Date(model.get('game').matchDay).getTime();
    },

    setInitPeriod: function () {
      this.period = VP.Data.selectedYearMonth;
    },

    setPeriod: function () {
      this.period = VP.Data.selectedYearMonth;
    }

  });

})();