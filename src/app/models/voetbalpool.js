(function(_utils) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/poolplayer',
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

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/club',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoBase64Url: null
    },

    getName: function() {
      return this.get('name');
    },

    getLogoUrl: function() {
      return this.get('logoBase64Url');
    }

  });

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

    getGame: function() {
      return this.get('homeTeam').name + ' - ' + this.get('awayTeam').name;
    },

    getMatchDay: function() {
      return this.get('matchDay');
    },

    getFormattedMatchDay: function() {
      return this.get('formattedMatchDay');
    },


  });

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

})(VP.utils);