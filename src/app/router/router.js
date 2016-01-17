(function(_events) {

  VP.Router = Backbone.Router.extend({

    poolplayersView: null,
    addPoolplayerView: null,
    updatePoolplayerView: null,
    gamesView: null,
    clubsOverviewView: null,
    menuView: null,

    routes: {
      ''                       : 'index',
      'list/:viewid'           : 'handleRouteList',
      'add/:viewid'            : 'handleRouteAdd',
      'update/:viewid/:modelid': 'handleRouteUpdate'
    },

    index: function() {
      this.renderMenu();
      this.renderClubsOverview();
    },

    handleRouteList: function (viewid) {
      if (viewid == 'poolplayers') {
        this.listPoolPlayers();
        this.renderMenu('poolplayers');
      } else if (viewid == 'games') {
        this.listGames();
        this.renderMenu('games');
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

    renderMenu: function(activeMenuItem) {
      if (this.menuView === null) {
        this.menuView = new VP.Views.Menu({});
      }
      this.menuView.setMenuItemActive(activeMenuItem);
    },

    renderClubsOverview: function() {
      if (this.clubsOverviewView !== null) {
        this.clubsOverviewView.close();
        this.clubsOverviewView = null;
      }
      if (this.clubsOverviewView == null) {
        var clubsCollection = new VP.Collections.Clubs();
        this.clubsOverviewView = new VP.Views.ClubsOverview({
          collection: clubsCollection
        });
        $('div.content').html(this.clubsOverviewView.render().$el);
      } else {
        this.clubsOverviewView.collection.fetch();
      }
    }


  });

})(VP.Events);