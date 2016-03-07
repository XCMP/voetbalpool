(function (_events, _utils) {

  VP.Views.GameSelect = Backbone.View.extend({

    tagName: 'span',
    template: Handlebars.templates['game_select.hbs'],

    events: {
    },

    initialize: function (options) {
      this.name = options.name;
      this.selected = options.selected;
      this.listenTo(this.collection, 'sync', this.render);
      this.collection.fetch();
    },

    render: function () {
      var game = this.getSelectedGame();
      this.$el.html(this.template({
        name: this.name,
        games: this.collection.toJSON(),
        selected: game ? game.toJSON() : null
      }));
      return this;
    },

    getSelectedGame: function () {
      if (this.selected) {
        var game = this.collection.get(this.selected);
        game.set('selected', true);
        return game;
      }
    }

  });

})(VP.Events, VP.utils);