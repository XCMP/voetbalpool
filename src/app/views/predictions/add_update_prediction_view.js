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
        _.each(response.response.errors, function(errorObject) {
          _utils.displayFieldError(errorObject);
        });
      } else {
        this.toPredictionList();
      }
    },

    handleErrors: function(object, response, options) {
      console.log('error');
    },

    render: function() {
      this.$el.html(this.template({
        poolplayers: this.poolplayers.toJSON(),
        games: this.games.toJSON(),
        model: this.model.toJSON()
      }));
      this.setPoolPlayerSelectOptions('poolplayer');
      this.setGameSelectOptions('game');
      return this;
    },

    setPoolPlayerSelectOptions: function(field) {
      var poolPlayerModel = this.model.get(field);
      if (poolPlayerModel) {
        var poolPlayerId = poolPlayerModel._id;
      }
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
      var gameModel = this.model.get(field);
      if (gameModel) {
        var gameId = gameModel._id;
      }
      var gameSelect = this.getGameSelectView(field, gameId);
      this.$('span.' + field).html(gameSelect);
    },

    getGameSelectView: function(name, selected) {
      var games = new VP.Collections.Games({});
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