(function(_events, _utils) {

  VP.Views.Predictions = Backbone.View.extend({

    template: Handlebars.templates['predictions.hbs'],
    deleteTemplate: Handlebars.templates['prediction_delete.hbs'],

    $selectedPrediction: null,
    confirmationView: null,

    events: {
      'click tr.prediction': 'selectPrediction',
      'change .month_select': 'yearMonthSelected',
      'click button.js_button_add': 'renderAddPrediction',
      'click button.js_button_update': 'renderUpdatePrediction',
      'click button.js_button_delete': 'confirmDeletePrediction'
    },

    initialize: function() {
      this.initMonths();

      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.setInitPeriod();
      this.collection.fetch();
    },

    initMonths: function() {
      this.months = new VP.Collections.Months({});
      var self = this;
      this.months.fetch().done(
        function(){
          self.months.setPeriod(VP.Data.selectedYearMonth);
        }
      );
    },

    yearMonthSelected: function(ev) {
      var selectedYearMonth = ev.currentTarget.value
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
      this.collection.setPeriod();
      this.collection.fetch();
    },

    selectPrediction: function(ev) {
      var $clickedPrediction = $(ev.currentTarget);

      // no prediction selcted
      if (this.$selectedPrediction === null) {
        this.setSelectedPrediction($clickedPrediction);
        this.setButtons();
        return;
      }

      // same prediction already selcted
      if ($clickedPrediction.data('id') === this.$selectedPrediction.data('id')) {
        this.removeSelectedPrediction();
        this.setButtons();
        return;
      }
    
      // select an other prediction
      this.removeSelectedPrediction();
      this.setSelectedPrediction($clickedPrediction);
      this.setButtons();
    },

    setSelectedPrediction: function($clickedPrediction) {
      $clickedPrediction.addClass('selected');
      this.$selectedPrediction = $clickedPrediction;
    },

    removeSelectedPrediction: function() {
      if (this.$selectedPrediction) {
        this.$selectedPrediction.removeClass('selected');
        this.$selectedPrediction = null;
      }
    },

    confirmDeletePrediction: function() {
      var id = this.$selectedPrediction.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showConfirmDialog({
        header: 'Voorspelling verwijderen',
        content: this.deleteTemplate({model: model.toJSON()}),
        yes: _.bind(this.deletePrediction, this)
      });
    },

    deletePrediction: function() {
      var id = this.$selectedPrediction.data('id');
      var model = this.collection.get(id);
      model.destroy();
      this.collection.remove(model);
    },

    renderAddPrediction: function() {
      VP.router.navigate('add/prediction',  {trigger: true});
    },

    renderUpdatePrediction: function() {
      var id = this.$selectedPrediction.data('id');
      VP.router.navigate('update/prediction/'+id,  {trigger: true});
    },

    render: function() {
      var predictions = this.addGameIterationInfoPredictions(this.collection);
      this.$el.html(this.template({
        months: this.months.toJSON(),
        predictions: predictions.toJSON(),
        activate: this.$selectedPrediction === null? 'disabled':''
      }));
      return this;
    },

    addGameIterationInfoPredictions: function(predictions) {
      var previousGameId = null;
      _.each(predictions.models, function(prediction, j) {
        var gameId = prediction.get('game')._id;
        prediction.get('game').first = gameId !== previousGameId;
        if (gameId !== previousGameId) {
          previousGameId = gameId;
        }
      });
      return predictions;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedPrediction === null? true:false);
      });
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);