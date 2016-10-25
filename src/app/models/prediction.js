(function() {

  VP.Models.Prediction = Backbone.Model.extend({

    urlRoot: '/api/vp/predictions',
    idAttribute: '_id',

    defaults: {
      poolplayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})();