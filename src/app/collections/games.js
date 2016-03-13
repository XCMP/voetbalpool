(function(_config) {

  VP.Collections.Games = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      var url = _config.BACKEND_HOSTNAME_PORT + '/vp/games';
      if (this.period) {
        return url + '/' + this.period.year + '/' + this.period.month;
      }
      return url;
    },

    initialize: function(options) {
      if (!options) {
        this.period = VP.Data.selectedYearMonth;
      }
    },

    setPeriod: function(periodString) {
      this.period = VP.Data.selectedYearMonth;
    }

  });

})(VP.Config);