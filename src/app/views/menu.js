(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    events: {
      'click li.poolplayer' : 'showPoolPlayers',
      'click li'            : 'setMenuItemActive'
    },

    initialize: function() {
    },

    showPoolPlayers: function(ev) {
      this.setMenuItemActive($(ev.currentTarget));
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    setMenuItemActive: function(ev) {
      this.removeMenuItemActive();
      $(ev.currentTarget).addClass('active');
    },

    removeMenuItemActive: function() {
      $('li').each(function(i, el) {
        $(el).removeClass('active');
      });
    }

  });

})(VP.Events);