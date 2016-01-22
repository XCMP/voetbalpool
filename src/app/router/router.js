(function(_events) {

  VP.Router = Backbone.Router.extend({

    poolplayersView: null,
    addPoolplayerView: null,
    updatePoolplayerView: null,

    gamesView: null,
    addGameView: null,
    updateGameView: null,

    clubsOverviewView: null,
    clubsView: null,

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
      } else if (viewid == 'clubs') {
        this.listClubs();
        this.renderMenu('clubs');
      } else {
        console.log('list route ' + viewid + ' not handled');
      }
    },

    handleRouteAdd: function (viewid) {
      if (viewid == 'poolplayer') {
        this.addPoolPlayer();
        this.renderMenu('poolplayers');
      } else if (viewid == 'game') {
        this.addGame();
        this.renderMenu('games');
      } else {
        console.log('add route ' + viewid + ' not handled');
      }
    },

    handleRouteUpdate: function (viewid, modelid) {
      if (viewid == 'poolplayer') {
        this.updatePoolPlayer(modelid);
        this.renderMenu('poolplayers');
      } else if (viewid == 'game') {
        this.updateGame(modelid);
        this.renderMenu('games');
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

    addGame: function () {
      if (this.addGameView !== null) {
        this.addGameView.close();
        this.addGameView = null;
      }
      var game = new VP.Models.Game({});
      if (this.addGameView == null) {
        this.addGameView = new VP.Views.AddUpdateGame({
          model: game
        });
      }      
      $('div.content').html(this.addGameView.render().$el);
    },
    
    updateGame: function (modelid) {
      if (this.updateGameView !== null) {
        this.updateGameView.close();
        this.updateGameView = null;
      }
      var game = new VP.Models.Game({_id:modelid});
      game.fetch().done(function() {
        if (this.updateGameView == null) {
          this.updateGameView = new VP.Views.AddUpdateGame({
            model:game
          });
        }
        $('div.content').html(this.updateGameView.render().$el);
      });
    },

    listClubs: function () {
      if (this.clubsView !== null) {
        this.clubsView.close();
        this.clubsView = null;
      }

      if (this.clubsView == null) {
        var clubsCollection = new VP.Collections.Clubs();
        this.clubView = new VP.Views.Clubs({
          collection: clubsCollection
        });
        $('div.content').html(this.clubView.render().$el);
      } else {
        this.clubsView.collection.fetch();
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