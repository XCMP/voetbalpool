(function() {

  VP.Collections.Predictions = Backbone.Collection.extend({

    model: VP.Models.Prediction,

    url: function() {
      const period = VP.Data.months.getSelectedPeriod();
      return '/api/vp/predictions/' + period.year + '/' + period.month;
    }

  });

})();