(function() {

  VP.Models.Prediction = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/prediction',
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