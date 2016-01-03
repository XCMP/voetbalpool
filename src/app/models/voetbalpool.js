(function(_utils) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    urlRoot: '/vp/poolplayer',
    idAttribute: '_id',

    defaults: {
      name: null,
      notes: null,
      birthday: null
    },

    initialize: function() {
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
    idAttribute: '_id',

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
    idAttribute: '_id',

    defaults: {
      poolPlayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})(VP.utils);