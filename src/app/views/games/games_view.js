(function (_events, _utils) {

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
      'click button.js_button_delete': 'confirmDeleteGame',
      'click button.js_button_prediction': 'renderAddPrediction'
    },

    initialize: function () {
      this.initMonths();

      this.listenTo(this.collection, 'sync', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.collection.fetch();
    },

    initMonths: function () {
      this.months = new VP.Collections.Months({});
      var self = this;
      this.months.fetch().done(
        function (){
          self.months.setPeriod(VP.Data.selectedYearMonth);
        }
      );
    },

    yearMonthSelected: function (ev) {
      var selectedYearMonth = ev.currentTarget.value
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
      this.collection.setPeriod();
      this.collection.fetch();
    },

    selectGame: function (ev) {
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

    setSelectedGame: function ($clickedGame) {
      $clickedGame.addClass('selected');
      this.$selectedGame = $clickedGame;
    },

    removeSelectedGame: function () {
      if (this.$selectedGame) {
        this.$selectedGame.removeClass('selected');
        this.$selectedGame = null;
      }
    },

    confirmDeleteGame: function () {
      var id = this.$selectedGame.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showConfirmDialog({
        header: 'Wedstrijd verwijderen',
        content: this.deleteTemplate({model: model.toJSON()}),
        yes: _.bind(this.deleteGame, this)
      });
    },

    deleteGame: function () {
      var id = this.$selectedGame.data('id');
      var model = this.collection.get(id);
      model.destroy();
      this.collection.remove(model);
    },

    renderAddGame: function () {
      VP.router.navigate('add/game',  {trigger: true});
    },

    renderAddPrediction: function () {
      VP.router.navigate('add/prediction?type=game&id=' + this.$selectedGame.data('id') + '&returnTo=games',  {trigger: true});
    },

    renderUpdateGame: function () {
      var id = this.$selectedGame.data('id');
      VP.router.navigate('update/game/'+id,  {trigger: true});
    },

    render: function () {
      console.log('render list');
      this.$el.html(this.template({
        months: this.months.toJSON(),
        games: this.collection.toJSON()
      }));
      return this;
    },

    setButtons: function () {
      var disablePredictionButton = this.predictionDisabled( this.$selectedGame? this.$selectedGame.attr('data-id') : null);
      $('.js_button_prediction').prop("disabled", disablePredictionButton);

      var disableButtons = this.$selectedGame? false : true;
      $(['.js_button_update', '.js_button_delete']).each(function (i, selector) {
        $(selector).prop("disabled", disableButtons);
      });
    },

    predictionDisabled: function (gameId) {
      if (gameId) {
        var matchDayTime = new Date(this.collection.get(gameId).get('matchDay')).getTime();
        return matchDayTime < Date.now();
      } else {
        return true;
      }
    }

  });

})(VP.Events, VP.utils);