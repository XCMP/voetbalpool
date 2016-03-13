(function() {

  VP.Models.Game = VP.Models.Base.extend({

    url: function() {
      return this.urlRoot + '/vp/games';
    },

    defaults: {
      matchDay: null,
      homeTeam: null,
      awayTeam: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      notes: null
    },

    parse: function(model, xhr) {
      model.played = (model.homeTeamGoals !== null && model.awayTeamGoals !== null);
      return model;
    }

  });

})();