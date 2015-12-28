(function(_events) {

  VP.Views.PoolPlayers = Backbone.View.extend({

    el: '.content',
    tagName:  'table',
    template: Handlebars.templates['poolplayers.hbs'],

    $selectedPoolPlayer: null,

    events: {
      'click tr.poolplayer': 'selectPoolPlayer'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    selectPoolPlayer: function(ev) {
      // TODO refactor???
      var $clickedPoolPlayer = $(ev.currentTarget);

      // no pool player selcted
      if (this.$selectedPoolPlayer === null) {
        this.setSelectedPoolPlayer($clickedPoolPlayer);
        this.setButtons();
        return;
      }

      // same pool player already selcted
      if ($clickedPoolPlayer.data('id') === this.$selectedPoolPlayer.data('id')) {
        this.removeSelectedPoolPlayer();
        this.setButtons();
        return;
      }
    
      // select an other pool player
      this.removeSelectedPoolPlayer();
      this.setSelectedPoolPlayer($clickedPoolPlayer);
      this.setButtons();
    },

    removeSelectedPoolPlayer: function() {
      if (this.$selectedPoolPlayer) {
        this.$selectedPoolPlayer.removeClass('selected');
        this.$selectedPoolPlayer = null;
      }
    },

    setSelectedPoolPlayer: function($clickedPoolPlayer) {
        $clickedPoolPlayer.addClass('selected');
        this.$selectedPoolPlayer = $clickedPoolPlayer;
    },

    render: function() {
      this.$el.html(this.template({
        poolplayers: this.collection.toJSON(),
        active: this.$selectedPoolPlayer === null? 'disabled':''
      }));
      return this;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedPoolPlayer === null? true:false);
      });
    }

  });

})(VP.Events);