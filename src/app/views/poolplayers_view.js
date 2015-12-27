(function(_events) {

  VP.Views.PoolPlayers = Backbone.View.extend({

    el: '.content',
    tagName:  'table',
    template: Handlebars.templates['poolplayers.hbs'],

    $selectedPlayer: null,

    events: {
      'click tr.poolplayer': 'selectPoolPlayer'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      // this.collection.on('add', this.render, this);
      this.collection.fetch();
    },

    selectPoolPlayer: function(ev) {
      this.removeSelection();
      var $el = $(ev.currentTarget);
      $el.addClass('selected');
      this.$selectedPlayer = $el;
    },

    removeSelection: function() {
      if (this.$selectedPlayer) {
        this.$selectedPlayer.removeClass('selected');
        this.$selectedPlayer = null;
      }
    },

    render: function() {
      this.$el.html(this.template({
        poolplayers: this.collection.toJSON()
      }));
      return this;
    }

  });

})(VP.Events);