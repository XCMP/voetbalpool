(function() {

  VP.Router = Backbone.Router.extend({

    menuView: null,
    currentView: null,

    routes: {
      ''                       : 'index',

      // specific routes
      'add/prediction?type=:type&id=:id&returnTo=:returnTo': 'handleRouteAddPredictionForType',
      'add/club?logoFilename=:logoFilename': 'handleRouteAddClubWithLogoFilename',

      // other routes
      'show/score'             : 'handleRouteShowScore',
      'show/about'             : 'handleRouteShowAbout',
      'list/:viewid'           : 'handleRouteList',
      'add/:viewid'            : 'handleRouteAdd',
      'update/:viewid/:modelid': 'handleRouteUpdate',
    },

    initialize: function() {
      Handlebars.registerPartial('month_select', Handlebars.templates['month_select.hbs']);
      new VP.Views.OffCanvasMenu();
      this.menuView = new VP.Views.Menu();
    },

    index: function() {
      this.renderClubsOverview();
    },

    handleRouteAddPredictionForType: function(type, id, returnTo) {
      this.clearPreviousView();

      this.addPrediction(type, id, returnTo);
      this.renderMenu('predictions');
    },

    handleRouteAddClubWithLogoFilename: function(logoFilename) {
      this.clearPreviousView();

      this.addClub(logoFilename);
      this.renderMenu('club');
    },

    handleRouteShowScore: function() {
      this.clearPreviousView();

      this.showScore();
      this.renderMenu('score');
    },

    handleRouteShowAbout: function() {
      this.clearPreviousView();

      this.showAbout();
      this.renderMenu('about');
    },

    handleRouteList: function(viewid) {
      this.clearPreviousView();

      if (viewid == 'poolplayers') {
        this.listPoolPlayers();
      } else if (viewid == 'games') {
        this.listGames();
      } else if (viewid == 'clubs') {
        this.listClubs();
      } else if (viewid == 'predictions') {
        this.listPredictions();
      } else {
        console.log('list route ' + viewid + ' not handled');
      }

      this.renderMenu(viewid);
    },

    handleRouteAdd: function(viewid) {
      this.clearPreviousView();

      if (viewid == 'poolplayer') {
        this.addPoolPlayer();
      } else if (viewid == 'game') {
        this.addGame();
      } else if (viewid == 'club') {
        this.addClub();
      } else if (viewid == 'prediction') {
        this.addPrediction();
      } else {
        console.log('add route ' + viewid + ' not handled');
      }

      this.renderMenu(viewid);
    },

    handleRouteUpdate: function(viewid, modelid) {
      this.clearPreviousView();

      if (viewid == 'poolplayer') {
        this.updatePoolPlayer(modelid);
      } else if (viewid == 'game') {
        this.updateGame(modelid);
      } else if (viewid == 'club') {
        this.updateClub(modelid);
      } else if (viewid == 'prediction') {
        this.updatePrediction(modelid);
      } else {
        console.log('update route ' + viewid + ' not handled');
      }

      this.renderMenu(viewid);
    },

    showScore: function() {
      this.currentView = new VP.Views.Score();
      $('div.content').html(this.currentView.$el);
    },

    showAbout: function() {
      this.currentView = new VP.Views.About();
      $('div.content').html(this.currentView.$el);
    },

    listPoolPlayers: function() {
      var poolPlayersCollection = new VP.Collections.PoolPlayers();
      this.currentView = new VP.Views.PoolPlayers({
        collection: poolPlayersCollection
      });
      $('div.content').html(this.currentView.$el);
    },

    addPoolPlayer: function() {
      var poolPlayer = new VP.Models.PoolPlayer({});
      this.currentView = new VP.Views.AddUpdatePoolPlayer({
        model: poolPlayer
      });
      $('div.content').html(this.currentView.$el);
    },

    updatePoolPlayer: function(modelid) {
      var poolplayer = new VP.Models.PoolPlayer({_id:modelid});
      poolplayer.fetch().done(function() {
        this.currentView = new VP.Views.AddUpdatePoolPlayer({
          model:poolplayer
        });
      $('div.content').html(this.currentView.$el);
      });
    },

    listGames: function() {
      var gamesCollection = new VP.Collections.Games();
      this.currentView = new VP.Views.Games({
        collection: gamesCollection
      });
      $('div.content').html(this.currentView.$el);
    },

    addGame: function() {
      var game = new VP.Models.Game({});
      this.currentView = new VP.Views.AddUpdateGame({
        model: game
      });
      $('div.content').html(this.currentView.$el);
    },
    
    updateGame: function(modelid) {
      var game = new VP.Models.Game({_id:modelid});
      game.fetch().done(function() {
        this.currentView = new VP.Views.AddUpdateGame({
          model: game
        });
        $('div.content').html(this.currentView.$el);
      });
    },

    listClubs: function() {
      var clubsCollection = new VP.Collections.Clubs();
      this.currentView = new VP.Views.Clubs({
        collection: clubsCollection
      });
      $('div.content').html(this.currentView.$el);
    },

    addClub: function(logoFilename) {
      var club = new VP.Models.Club({logoFilename: logoFilename});
      this.currentView = new VP.Views.AddUpdateClub({
        model: club
      });
      $('div.content').html(this.currentView.$el);
    },

    updateClub: function(modelid) {
      var club = new VP.Models.Club({_id:modelid});
      club.fetch().done(function() {
        this.currentView = new VP.Views.AddUpdateClub({
          model: club
        });
        $('div.content').html(this.currentView.$el);
      });
    },

    listPredictions: function() {
      var predictionsCollection = new VP.Collections.Predictions();
      this.currentView = new VP.Views.Predictions({
        collection: predictionsCollection
      });
      $('div.content').html(this.currentView.$el);
    },

    addPrediction: function(type, id, returnTo) {
      var prediction = new VP.Models.Prediction({});
      prediction.set(type, {_id: id});
      this.currentView = new VP.Views.AddUpdatePrediction({
        model: prediction,
        returnTo: returnTo
      });
      $('div.content').html(this.currentView.$el);
    },

    updatePrediction: function(modelid) {
      var prediction = new VP.Models.Prediction({_id:modelid});
      prediction.fetch().done(function() {
        this.currentView = new VP.Views.AddUpdatePrediction({
          model: prediction
        });
        $('div.content').html(this.currentView.$el);
      });
    },

    renderMenu: function(activeMenuItem) {
      this.menuView.setMenuItemActive(activeMenuItem);
    },

    renderClubsOverview: function() {
      var clubsCollection = new VP.Collections.Clubs();
      this.currentView = new VP.Views.ClubsOverview({
        collection: clubsCollection
      });
      $('div.content').html(this.currentView.$el);
    },

    clearPreviousView: function() {
      if (this.currentView !== null) {
        this.currentView.remove();
        this.currentView = null;
      }
    }

  });

})();