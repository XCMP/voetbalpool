(function(_utils) {

  VP.Views.AddUpdatePrediction = Backbone.View.extend({

    template: Handlebars.templates['add_update_prediction.hbs'],
    events: {
      'submit form': 'saveAddPrediction',
      'click button.js_button_back': 'toPredictionList'
    },

    initialize: function() {
      this.poolplayers = new VP.Collections.PoolPlayers();
      this.poolplayers.fetch();
      this.games = new VP.Collections.Games({});
      this.games.fetch();
      _.bindAll(this, "handleErrors", "handleResult");
    },

    saveAddPrediction: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      var options = {
        success: this.handleResult,
        error: this.handleErrors,
      };
      var result = this.model.save(formData, options);
    },

    toPredictionList: function() {
      VP.router.navigate('list/predictions', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        if (response.response.code === 11000) {
            _utils.displayFieldError({
              path: 'general',
              message: 'Deze speler heeft al een voorspelling voor deze wedstrijd'
            });
        } else {
          _.each(response.response.errors, function(errorObject) {
            _utils.displayFieldError(errorObject);
          });
        }
      } else {
        this.toPredictionList();
      }
    },

    handleErrors: function(object, response, options) {
      console.log('error');
    },

    render: function() {
      this.$el.html(this.template({
        model: this.model.toJSON()
      }));
      this.setPoolPlayerSelectOptions('poolplayer');
      this.setGameSelectOptions('game');
      return this;
    },

    setPoolPlayerSelectOptions: function(field) {
      var poolPlayerId = this.model.get(field);
      var poolPlayerSelect = this.getPoolPlayerSelectView(field, poolPlayerId);
      this.$('span.' + field).html(poolPlayerSelect);
    },

    getPoolPlayerSelectView: function(name, selected) {
      var poolPlayers = new VP.Collections.PoolPlayers({});
      var view = new VP.Views.PoolPlayerSelect({
        name: name,
        collection: poolPlayers,
        selected: selected
      });
      return view.$el;
    },

    setGameSelectOptions: function(field) {
      var gameId = this.model.get(field);
      var gameSelect = this.getGameSelectView(field, gameId);
      this.$('span.' + field).html(gameSelect);
    },

    getGameSelectView: function(name, selected) {
      var games = new VP.Collections.Games({all: true});
      var view = new VP.Views.GameSelect({
        name: name,
        collection: games,
        selected: selected
      });
      return view.$el;
    },

    close: function() {
      this.unbind();
      this.remove();
      this.model.unbind();
    }

  });

})(VP.utils);