(function(_events, _utils) {

  VP.Views.Games = Backbone.View.extend({

    template: Handlebars.templates['games.hbs'],
    deleteTemplate: Handlebars.templates['game_delete.hbs'],

    $selectedGame: null,
    confirmationView: null,

    events: {
      'click tr.game': 'selectGame',
      'change .month_select': 'yearMonthSelected',
      'click button.js_button_add': 'renderAddGame',
      'click button.js_button_update': 'renderUpdateGame',
      'click button.js_button_delete': 'confirmDeleteGame'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.months = new VP.Collections.Months({});
      this.months.fetch();
      this.collection.fetch();
    },

    yearMonthSelected: function(ev) {
      var selectedYearMonth = ev.currentTarget.value
      this.months.setPeriod(selectedYearMonth);
      this.collection.setPeriod(selectedYearMonth);
      this.collection.fetch();
    },

    selectGame: function(ev) {
      var $clickedGame = $(ev.currentTarget);

      // no game selcted
      if (this.$selectedGame === null) {
        this.setSelectedGame($clickedGame);
        this.setButtons();
        return;
      }

      // same game already selcted
      if ($clickedGame.data('id') === this.$selectedGame.data('id')) {
        this.removeSelectedGame();
        this.setButtons();
        return;
      }
    
      // select an other game
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

    confirmDeleteGame: function() {
      var id = this.$selectedGame.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showConfirmDialog({
        header: 'Wedstrijd verwijderen',
        content: this.deleteTemplate({model: model.toJSON()}),
        yes: _.bind(this.deleteGame, this)
      });
    },

    deleteGame: function() {
      var id = this.$selectedGame.data('id');
      var model = this.collection.get(id);
      model.destroy();
      this.collection.remove(model);
    },

    renderAddGame: function() {
      VP.router.navigate('add/game',  {trigger: true});
    },

    renderUpdateGame: function() {
      var id = this.$selectedGame.data('id');
      VP.router.navigate('update/game/'+id,  {trigger: true});
    },

    render: function() {
      this.$el.html(this.template({
        months: this.months.toJSON(),
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