(function(_config) {

  VP.Collections.Predictions = Backbone.Collection.extend({

    model: VP.Models.Prediction,

    url: function() {
      const period = VP.Data.months.getSelectedPeriod();
      return _config.BACKEND_HOSTNAME_PORT + '/vp/predictions/' + period.year + '/' + period.month;
    }

  });

})(VP.Config);