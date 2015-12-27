(function(_events) {

  VP.Views.Menu = Backbone.View.extend({

    el: '.menu',
    router: null,
    events: {
      'click li.poolplayer' : 'showPoolPlayers'
    },

    initialize: function(options) {
      this.router = options.router
    },

    showPoolPlayers: function() {
      this.router.navigate('list/poolplayers',  {trigger: true});
    },

  });

})(VP.Events);