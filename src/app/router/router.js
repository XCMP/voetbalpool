(function(_events) {

  VP.Router = Backbone.Router.extend({

    poolplayersView: null,
    addPoolplayerView: null,
    updatePoolplayerView: null,
    gamesView: null,

    routes: {
      'list/:viewid'           : 'handleRouteList',
      'add/:viewid'            : 'handleRouteAdd',
      'update/:viewid/:modelid': 'handleRouteUpdate'
    },

    handleRouteList: function (viewid) {
      if (viewid == 'poolplayers') {
        this.listPoolPlayers();
      } else if (viewid == 'games') {
        this.listGames();
      } else {
        console.log('list route ' + viewid + ' not handled');
      }
    },

    handleRouteAdd: function (viewid) {
      if (viewid == 'poolplayer') {
        this.addPoolPlayer();
      } else {
        console.log('add route ' + viewid + ' not handled');
      }
    },

    handleRouteUpdate: function (viewid, modelid) {
      if (viewid == 'poolplayer') {
        this.updatePoolPlayer(modelid);
      } else {
        console.log('update route ' + viewid + ' not handled');
      }
    },

    listPoolPlayers: function () {
      if (this.poolplayersView !== null) {
        this.poolplayersView.close();
        this.poolplayersView = null;
      }

      if (this.poolplayersView == null) {
        var poolPlayersCollection = new VP.Collections.PoolPlayers();
        this.poolplayersView = new VP.Views.PoolPlayers({
          collection: poolPlayersCollection
        });
        $('div.content').html(this.poolplayersView.render().$el);
      } else {
        this.poolplayersView.collection.fetch();
      }
    },

    addPoolPlayer: function () {
      if (this.addPoolplayerView !== null) {
        this.addPoolplayerView.close();
        this.addPoolplayerView = null;
      }
      var poolPlayer = new VP.Models.PoolPlayer({});
      if (this.addPoolplayerView == null) {
        this.addPoolplayerView = new VP.Views.AddUpdatePoolPlayer({
          model: poolPlayer
        });
      }
      $('div.content').html(this.addPoolplayerView.render().$el);
    },

    updatePoolPlayer: function (modelid) {
      if (this.updatePoolplayerView !== null) {
        this.updatePoolplayerView.close();
        this.updatePoolplayerView = null;
      }
      var poolplayer = new VP.Models.PoolPlayer({_id:modelid});
      poolplayer.fetch().done(function() {
        if (this.updatePoolplayerView == null) {
          this.updatePoolplayerView = new VP.Views.AddUpdatePoolPlayer({
            model:poolplayer
          });
        }
      $('div.content').html(this.updatePoolplayerView.render().$el);
      });
    },

    listGames: function () {
      if (this.gamesView !== null) {
        this.gamesView.close();
        this.gamesView = null;
      }

      if (this.gamesView == null) {
        var gamesCollection = new VP.Collections.Games();
        this.gamesView = new VP.Views.Games({
          collection: gamesCollection
        });
        $('div.content').html(this.gamesView.render().$el);
      } else {
        this.gamesView.collection.fetch();
      }
    },


  });

})(VP.Events);