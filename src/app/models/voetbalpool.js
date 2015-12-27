(function() {

  VP.Models.PoolPlayer = Backbone.Model.extend({
    url: 'voetbalpool/poolplayer',
    defaults: {
      name: null,
      notes: null
    }
  });

  VP.Models.Game = Backbone.Model.extend({
    url: '/voetbalpool/game',
    defaults: {
      dateTime: null,
      homeTeam: null,
      awayTeam: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      notes: null
    }
  });

  VP.Models.Prediction = Backbone.Model.extend({
    url: '/voetbalpool/prediction',
    defaults: {
      poolPlayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }
  });

})();