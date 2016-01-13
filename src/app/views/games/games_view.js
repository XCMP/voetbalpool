(function(_events, _utils) {

  VP.Views.Games = Backbone.View.extend({

    template: Handlebars.templates['games.hbs'],

    $selectedGame: null,
    confirmationView: null,

    events: {
      'click tr.game': 'selectGame',
      // 'click button.js_button_add': 'renderAddPoolPlayer',
      // 'click button.js_button_update': 'renderUpdatePoolPlayer',
      // 'click button.js_button_delete': 'confirmDeletePoolPlayer'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.fetch();
    },

    selectGame: function(ev) {
      var $clickedGame = $(ev.currentTarget);

      // no pool player selcted
      if (this.$selectedGame === null) {
        this.setSelectedGame($clickedGame);
        this.setButtons();
        return;
      }

      // same pool player already selcted
      if ($clickedGame.data('id') === this.$selectedGame.data('id')) {
        this.removeSelectedGame();
        this.setButtons();
        return;
      }
    
      // select an other pool player
      this.removeSelectedGame();
      this.setSelectedGame($clickedGame);
      this.setButtons();
    },

    setSelectedGame: function($clickedGame) {
      $clickedGame.addClass('selected');
      this.$selectedGame = $clickedGame;
    },

    removeSelectedGame: function() {
      if (this.$selectedGame) {
        this.$selectedGame.removeClass('selected');
        this.$selectedGame = null;
      }
    },

    render: function() {
      this.$el.html(this.template({
        games: this.collection.toJSON(),
        activate: this.$selectedGame === null? 'disabled':''
      }));
      return this;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedGame === null? true:false);
      });
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);