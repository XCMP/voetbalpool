(function(_utils) {

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

})(VP.utils);