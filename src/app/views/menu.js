(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    template: Handlebars.templates['menu.hbs'],

    events: {
      'click li.poolplayers' : 'showPoolPlayers',
      'click li.games'       : 'showGames',
      'click li'             : 'setMenuItemActive'
    },

    initialize: function() {
      this.render();
    },

    showPoolPlayers: function(ev) {
      this.setMenuItemActive($(ev.currentTarget));
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    showGames: function(ev) {
      this.setMenuItemActive($(ev.currentTarget));
      VP.router.navigate('list/games',  {trigger: true});
    },

    setMenuItemActive: function(ev) {
      this.removeMenuItemActive();
      $(ev.currentTarget).addClass('active');
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