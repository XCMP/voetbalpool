(function(_utils) {

  VP.Views.AddUpdatePrediction = Backbone.View.extend({

    template: Handlebars.templates['add_update_prediction.hbs'],
    events: {
      'submit form': 'saveAddPrediction',
      'click button.js_button_back': 'returnTo'
    },

    initialize: function(options) {
      this.returnTo = options.returnTo;
      this.poolplayers = new VP.Collections.PoolPlayers();
      this.poolplayers.fetch();
      this.games = new VP.Collections.Games({});
      this.games.fetch();
      this.render();
      _.bindAll(this, 'handleResult');
    },

    saveAddPrediction: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      var options = {
        success: this.handleResult
      };
      var result = this.model.save(formData, options);
    },

    returnTo: function() {
      VP.router.navigate('list/'+(this.returnTo? this.returnTo:'predictions'), {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _utils.handleErrors(response);
      } else {
        VP.router.navigate('list/'+(this.returnTo? this.returnTo:'predictions'), {trigger: true});
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
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
    }

  });

})(VP.utils);