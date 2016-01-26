(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    template: Handlebars.templates['menu.hbs'],

    events: {
      'click li.poolplayers' : 'showPoolPlayers',
      'click li.games'       : 'showGames',
      'click li.clubs'       : 'showClubs',
      'click li.predictions' : 'showPredictions'
    },

    initialize: function() {
      this.render();
    },

    showPoolPlayers: function(ev) {
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    showGames: function(ev) {
      VP.router.navigate('list/games',  {trigger: true});
    },

    showClubs: function(ev) {
      VP.router.navigate('list/clubs',  {trigger: true});
    },

    showPredictions: function(ev) {
      VP.router.navigate('list/predictions',  {trigger: true});
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

})(VP.Events);