(function() {

  VP.Collections.Games = Backbone.Collection.extend({

    model: VP.Models.Game,

    url: function() {
      const url = '/api/vp/games';
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
      return '/api/vp/games';
    }

  });

})();