(function(_events, _utils) {

  VP.Views.Predictions = Backbone.View.extend({

    template: Handlebars.templates['predictions.hbs'],

    $selectedPrediction: null,
    confirmationView: null,

    events: {
      // 'click tr.Prediction': 'selectPrediction',
      // 'click button.js_button_add': 'renderAddPrediction',
      // 'click button.js_button_update': 'renderUpdatePrediction',
      // 'click button.js_button_delete': 'confirmDeletePrediction'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.fetch();
    },

    selectPrediction: function(ev) {
      // var $clickedPrediction = $(ev.currentTarget);

      // // no Prediction selcted
      // if (this.$selectedPrediction === null) {
      //   this.setSelectedPrediction($clickedPrediction);
      //   this.setButtons();
      //   return;
      // }

      // // same Prediction already selcted
      // if ($clickedPrediction.data('id') === this.$selectedPrediction.data('id')) {
      //   this.removeSelectedPrediction();
      //   this.setButtons();
      //   return;
      // }
    
      // // select an other Prediction
      // this.removeSelectedPrediction();
      // this.setSelectedPrediction($clickedPrediction);
      // this.setButtons();
    },

    setSelectedPrediction: function($clickedPrediction) {
      // $clickedPrediction.addClass('selected');
      // this.$selectedPrediction = $clickedPrediction;
    },

    removeSelectedPrediction: function() {
      // if (this.$selectedPrediction) {
      //   this.$selectedPrediction.removeClass('selected');
      //   this.$selectedPrediction = null;
      // }
    },

    confirmDeletePrediction: function() {
      // var id = this.$selectedPrediction.data('id');
      // var model = this.collection.get(id);
      // this.confirmationView = _utils.showConfirmDialog({
      //   header: 'Wedstrijd verwijderen',
      //   content: this.deleteTemplate({model: model.toJSON()}),
      //   yes: _.bind(this.deletePrediction, this)
      // });
    },

    deletePrediction: function() {
      // var id = this.$selectedPrediction.data('id');
      // var model = this.collection.get(id);
      // model.destroy();
      // this.collection.remove(model);
    },

    renderAddPrediction: function() {
      // VP.router.navigate('add/Prediction',  {trigger: true});
    },

    renderUpdatePrediction: function() {
      // var id = this.$selectedPrediction.data('id');
      // VP.router.navigate('update/Prediction/'+id,  {trigger: true});
    },

    render: function() {
      this.$el.html(this.template({
        Predictions: this.collection.toJSON(),
        activate: this.$selectedPrediction === null? 'disabled':''
      }));
      return this;
    },

    setButtons: function() {
      // var self = this;
      // $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
      //   $(selector).prop("disabled", self.$selectedPrediction === null? true:false);
      // });
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);