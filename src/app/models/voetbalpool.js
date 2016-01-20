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
      model.formattedBirthday = _utils.formatDate(model.birthday);
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

    parse: function(model, xhr) {
      model.formattedMatchDay = moment(new Date(model.matchDay)).format('ddd DD MMM YYYY HH:mm');
      model.formattedMatchDayEdit = moment(new Date(model.matchDay)).format('DD-MM-YYYY HH:mm');
      return model;
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
      poolPlayer: null,
      game: null,
      homeTeamGoals: null,
      awayTeamGoals: null,
      score: null
    }

  });

})(VP.utils);