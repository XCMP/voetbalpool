(function(_utils) {

  VP.Views.PoolPlayers = Backbone.View.extend({

    className: 'list poolplayers',
    template: Handlebars.templates['poolplayers.hbs'],
    deleteTemplate: Handlebars.templates['poolplayer_delete.hbs'],

    $selectedPoolPlayer: null,
    confirmationView: null,

    events: {
      'click tr.poolplayer': 'selectPoolPlayer',
      'click button.js_button_add': 'renderAddPoolPlayer',
      'click button.js_button_update': 'renderUpdatePoolPlayer',
      'click button.js_button_delete': 'confirmDeletePoolPlayer',
      'click button.js_button_prediction': 'renderAddPrediction'
    },

    initialize: function() {
      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'remove', this.render);
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

    renderAddPrediction: function() {
      VP.router.navigate('add/prediction?type=poolplayer&id=' + this.$selectedPoolPlayer.data('id') + '&returnTo=poolplayers',  {trigger: true});
    },

    renderUpdatePoolPlayer: function() {
      var id = this.$selectedPoolPlayer.data('id');
      VP.router.navigate('update/poolplayer/'+id,  {trigger: true});
    },

    confirmDeletePoolPlayer: function() {
      var id = this.$selectedPoolPlayer.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showConfirmDialog({
        header: 'Speler verwijderen',
        content: this.deleteTemplate({model: model.toJSON()}),
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
        poolplayers: this.collection.toJSON()
      }));
      return this;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete', '.js_button_prediction']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedPoolPlayer === null? true:false);
      });
    }

  });

})(VP.utils);