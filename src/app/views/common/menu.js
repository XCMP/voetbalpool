(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    template: Handlebars.templates['menu.hbs'],

    events: {
      'click li.score'       : 'showScore',
      'click li.games'       : 'showGames',
      'click li.predictions' : 'showPredictions',
      'click li.poolplayers' : 'showPoolPlayers',
      'click li.clubs'       : 'showClubs'
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