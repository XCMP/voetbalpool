(function(_utils) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    url: function() {
      return '/vp/poolplayer/' + this.id;
    },

    defaults: {
      name: null,
      notes: null,
      birthday: null
    },

    initialize: function(model) {
    },

    parse: function(model, xhr) {
      model.age = _utils.calculateAge(model.birthday);
      return model;
    },

    getName: function() {
      return this.get('name');
    }

  });

  VP.Models.Game = Backbone.Model.extend({

    url: function() {
      return '/vp/game/' + this.id;
    },

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

    url: function() {
      return '/vp/prediction/' + this.id;
    },

    defaults: {
      poolPlayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})(VP.utils);