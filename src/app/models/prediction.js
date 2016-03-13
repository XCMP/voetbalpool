(function(_config) {

  VP.Models.Prediction = Backbone.Model.extend({

    urlRoot: _config.BACKEND_HOSTNAME_PORT + '/vp/predictions',
    idAttribute: '_id',

    defaults: {
      poolplayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})(VP.Config);