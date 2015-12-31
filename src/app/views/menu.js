(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    router: null,
    events: {
      'click li.poolplayer' : 'showPoolPlayers',
      'click li'            : 'setMenuItemActive_temp'
    },

    initialize: function(options) {
      this.router = options.router
    },

    showPoolPlayers: function(ev) {
      this.setMenuItemActive($(ev.currentTarget));
      this.router.navigate('list/poolplayers',  {trigger: true});
    },

    setMenuItemActive_temp: function(ev) {
      this.setMenuItemActive($(ev.currentTarget));
    },

    setMenuItemActive: function($el) {
      this.removeMenuItemActive();
      $el.addClass('active');
    },

    removeMenuItemActive: function() {
      $('li').each(function(i, el) {
        $(el).removeClass('active');
      });
    }

  });

})(VP.Events);