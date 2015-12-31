(function(_events) {

  VP.Router = Backbone.Router.extend({

    playersView: null,

    routes: {
      '': 'log',
      'list/:viewid': 'handleRouteAll'
    },

    log: function () {
      console.log('caught');
    },

    handleRouteAll: function (viewid) {

      if (viewid == 'poolplayers') {
        this.handlePoolPlayers();
      } else {
        console.log('route ' + viewid + ' not handled');
      }

    },

    handlePoolPlayers: function () {
      if (this.playersView == null) {
        var poolPlayersCollection = new VP.Collections.PoolPlayers();
        this.playersView = new VP.Views.PoolPlayers({
          collection: poolPlayersCollection
        });
      }
    }  

  });

})(VP.Events);