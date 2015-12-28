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
      this.collection.fetch();
    },

    selectPoolPlayer: function(ev) {
      // TODO refactor???
      var $clickedPlayer = $(ev.currentTarget);

      if (this.$selectedPlayer === null) {
        this.setSelectedPoolPlayer($clickedPlayer);
        this.setButtons();
        return;
      }

      if ($clickedPlayer.data('id') === this.$selectedPlayer.data('id')) {
        this.removeSelectedPoolPlayer();
        this.setButtons();
        return;
      }
    
      this.removeSelectedPoolPlayer();
      this.setSelectedPoolPlayer($clickedPlayer);
      this.setButtons();
    },

    removeSelectedPoolPlayer: function() {
      if (this.$selectedPlayer) {
        this.$selectedPlayer.removeClass('selected');
        this.$selectedPlayer = null;
      }
    },

    setSelectedPoolPlayer: function($clickedPlayer) {
        $clickedPlayer.addClass('selected');
        this.$selectedPlayer = $clickedPlayer;
    },

    render: function() {
      this.$el.html(this.template({
        poolplayers: this.collection.toJSON(),
        active: this.$selectedPlayer === null? 'disabled':''
      }));
      return this;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedPlayer === null? true:false);
      });
    }

  });

})(VP.Events);