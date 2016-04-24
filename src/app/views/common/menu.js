(function() {

  VP.Views.OffCanvasMenu = Backbone.View.extend({

    el: '.main',
    open: false,

    events: {
      'click .off-canvas-menu-button' : 'handleRenderingMenu',
      'click .menu li'                : 'handleCloseMenu'
    },

    initialize: function() {
      this.menuButton = $('.off-canvas-menu-button');
      this.menu = $('.menu');
    },

    handleRenderingMenu: function(ev) {
      if (this.open) {
        this.handleCloseMenu();
      } else {
        this.handleOpenMenu();
      }
    },

    handleOpenMenu: function(ev) {
      this.menuButton.hide();
      this.menu.show(200);
      this.menu.addClass('off-canvas');
      this.setGradient();
      this.open = true;
    },

    handleCloseMenu: function(ev) {
      if (this.menu.hasClass('off-canvas')) {
        this.menuButton.show();
        this.menu.hide();
        this.menu.removeClass('off-canvas');
        this.removeGradient();
        this.open = false;
      }
    },

    setGradient: function() {
      this.$el.wrap('<div class=\'overlay\'></div>');
      var self = this;
      $('.overlay').on('click', function(ev) {
        self.handleCloseMenu();
      });
    },

    removeGradient: function() {
      $('.overlay').off('click');
      this.$el.unwrap();
    }

  });

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    template: Handlebars.templates['menu.hbs'],

    events: {
      'click li.score'       : 'showScore',
      'click li.games'       : 'showGames',
      'click li.predictions' : 'showPredictions',
      'click li.poolplayers' : 'showPoolPlayers',
      'click li.clubs'       : 'showClubs',
      'click li.about'       : 'showAbout'
    },

    initialize: function() {
      this.render();
    },

    showScore: function(ev) {
      VP.router.navigate('show/score',  {trigger: true});
    },

    showGames: function(ev) {
      VP.router.navigate('list/games',  {trigger: true});
    },

    showPredictions: function(ev) {
      VP.router.navigate('list/predictions',  {trigger: true});
    },

    showPoolPlayers: function(ev) {
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    showClubs: function(ev) {
      VP.router.navigate('list/clubs',  {trigger: true});
    },

    showAbout: function(ev) {
      VP.router.navigate('show/about',  {trigger: true});
    },

    setMenuItemActive: function(menuItemClass) {
      this.removeMenuItemActive();
      this.$el.find('li.'+menuItemClass).addClass('active');
    },

    removeMenuItemActive: function() {
      $('li').each(function(i, el) {
        $(el).removeClass('active');
      });
    },

    render: function() {
      this.$el.html(this.template({
      }));
      return this;
    }

  });

})();