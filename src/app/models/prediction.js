(function() {

  VP.Models.Prediction = VP.Models.Base.extend({

    url: function() {
      return this.urlRoot + '/vp/predictions';
    },

    defaults: {
      poolplayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})();