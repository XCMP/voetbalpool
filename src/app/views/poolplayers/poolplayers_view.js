(function(_events, _utils) {

  VP.Views.PoolPlayers = Backbone.View.extend({


    el: '.content',
    tagName:  'table',
    template: Handlebars.templates['poolplayers.hbs'],

    $selectedPoolPlayer: null,
    confirmationView: null,

    events: {
      'click tr.poolplayer': 'selectPoolPlayer',
      'click button.js_button_add': 'renderAddPoolPlayer',
      'click button.js_button_delete': 'confirmDeletePoolPlayer'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.fetch();
    },

    selectPoolPlayer: function(ev) {
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

    renderAddPoolPlayer: function() {
      VP.router.navigate('add/poolplayer',  {trigger: true});
    },

    confirmDeletePoolPlayer: function() {
      var id = this.$selectedPoolPlayer.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showModalWindow({
        header: 'Verwijderen',
        content: 'Weet je zeker dat je ' + model.getName() + ' wilt verwijderen?',
        yes: _.bind(this.deletePoolPlayer, this)
      });
    },

    deletePoolPlayer: function() {
      var id = this.$selectedPoolPlayer.data('id');
      var model = this.collection.get(id);
      model.destroy();
      this.collection.remove(model);
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
        activate: this.$selectedPoolPlayer === null? 'disabled':''
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

})(VP.Events, VP.utils);