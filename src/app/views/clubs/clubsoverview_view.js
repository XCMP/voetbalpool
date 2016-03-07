(function (_events, _utils) {

  VP.Views.ClubsOverview = Backbone.View.extend({

    template: Handlebars.templates['clubsoverview.hbs'],

    initialize: function () {
      this.listenTo(this.collection, 'sync', this.randomizeOrderAndRender);
      this.collection.fetch();
    },

    randomizeOrderAndRender: function () {
      this.collection.reset(this.collection.shuffle(), {silent:true});
      this.render();
    },

    render: function () {
      this.$el.html(this.template({
        clubs: this.collection.toJSON()
      }));
      return this;
    }

  });

})(VP.Events, VP.utils);