(function(_config) {

  VP.Models.Game = Backbone.Model.extend({

    urlRoot: _config.BACKEND_HOSTNAME_PORT + '/vp/games',
    idAttribute: '_id',

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

})(VP.Config);