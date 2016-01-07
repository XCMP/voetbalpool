(function(_events) {

  VP.Router = Backbone.Router.extend({

    playersView: null,
    addPlayerView: null,
    updatePlayerView: null,

    routes: {
      'list/:viewid'           : 'handleRouteList',
      'add/:viewid'            : 'handleRouteAdd',
      'update/:viewid/:modelid': 'handleRouteUpdate'
    },

    handleRouteList: function (viewid) {
      if (viewid == 'poolplayers') {
        this.listPoolPlayers();
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
      if (this.playersView !== null) {
        this.playersView.close();
        this.playersView = null;
      }

      if (this.playersView == null) {
        var poolPlayersCollection = new VP.Collections.PoolPlayers();
        this.playersView = new VP.Views.PoolPlayers({
          collection: poolPlayersCollection
        });
        $('div.content').html(this.playersView.render().$el);
      } else {
        this.playersView.collection.fetch();
      }
    },

    addPoolPlayer: function () {
      if (this.addPlayerView !== null) {
        this.addPlayerView.close();
        this.addPlayerView = null;
      }
      var poolPlayer = new VP.Models.PoolPlayer({});
      if (this.addPlayerView == null) {
        this.addPlayerView = new VP.Views.AddUpdatePoolPlayer({
          model: poolPlayer
        });
      }
      $('div.content').html(this.addPlayerView.render().$el);
    },

    updatePoolPlayer: function (modelid) {
      if (this.updatePlayerView !== null) {
        this.updatePlayerView.close();
        this.updatePlayerView = null;
      }
      var poolplayer = new VP.Models.PoolPlayer({_id:modelid});
      poolplayer.fetch().done(function() {
        if (this.updatePlayerView == null) {
          this.updatePlayerView = new VP.Views.AddUpdatePoolPlayer({
            model:poolplayer
          });
        }
      $('div.content').html(this.updatePlayerView.render().$el);
      });
    }  

  });

})(VP.Events);