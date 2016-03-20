(function(_config) {

  VP.Collections.Predictions = Backbone.Collection.extend({

    model: VP.Models.Prediction,

    url: function() {
      return _config.BACKEND_HOSTNAME_PORT + '/vp/predictions/' + this.period.year + '/' + this.period.month;
    },

    initialize: function() {
      this.period = VP.Data.selectedYearMonth;
    },

    setInitPeriod: function() {
      this.period = VP.Data.selectedYearMonth;
    },

    setPeriod: function() {
      this.period = VP.Data.selectedYearMonth;
    }

  });

})(VP.Config);