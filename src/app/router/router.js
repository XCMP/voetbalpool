(function(_events) {

  VP.Router = Backbone.Router.extend({

    playersView: null,
    addPlayerView: null,

    routes: {
      '': 'log',
      'list/:viewid': 'handleRouteList',
      'add/:viewid': 'handleRouteAdd'
    },

    log: function () {
      console.log('caught');
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

    listPoolPlayers: function () {
      if (this.playersView == null) {
        var poolPlayersCollection = new VP.Collections.PoolPlayers();
        this.playersView = new VP.Views.PoolPlayers({
          collection: poolPlayersCollection
        });
      } else {
        this.playersView.collection.fetch();
      }
    },

    addPoolPlayer: function () {
      if (this.addPlayerView == null) {
        var poolPlayer = new VP.Models.PoolPlayer({});
        this.addPlayerView = new VP.Views.AddPoolPlayer(poolPlayer);
      }
      this.addPlayerView.render();
    }  

  });

})(VP.Events);