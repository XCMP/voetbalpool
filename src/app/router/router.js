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
        console.log('route ' + viewid + ' not handled');
      }
    },

    handleRouteAdd: function (viewid) {
      if (viewid == 'poolplayer') {
        this.addPoolPlayer();
      } else {
        console.log('route ' + viewid + ' not handled');
      }
    },

    listPoolPlayers: function () {
      console.log('list pool players in router');
      if (this.playersView == null) {
        var poolPlayersCollection = new VP.Collections.PoolPlayers();
        this.playersView = new VP.Views.PoolPlayers({
          collection: poolPlayersCollection
        });
      } else {
        this.playersView.render();
      }
    },

    addPoolPlayer: function () {
      console.log('add pool player in router');
      if (this.addPlayerView == null) {
        var poolPlayer = new VP.Models.PoolPlayer({});
        this.addPlayerView = new VP.Views.AddPoolPlayer(poolPlayer);
      }
      this.addPlayerView.render();
    }  

  });

})(VP.Events);