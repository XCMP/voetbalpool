(function(_config) {

  VP.Collections.Games = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      const url = _config.BACKEND_HOSTNAME_PORT + '/vp/games';
      const period = VP.Data.months.getSelectedPeriod();
      if (period) {
        return url + '/' + period.year + '/' + period.month;
      }
      return url;
    }

  });

  VP.Collections.FutureGames = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      return _config.BACKEND_HOSTNAME_PORT + '/vp/games';
    }

  });

})(VP.Config);