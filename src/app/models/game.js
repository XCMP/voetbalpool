(function() {

  VP.Models.Game = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/game',
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

})();