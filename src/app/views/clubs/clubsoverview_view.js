(function() {

  VP.Views.ClubsOverview = Backbone.View.extend({

    className: 'list',
    template: Handlebars.templates['clubsoverview.hbs'],

    initialize: function() {
      this.listenTo(this.collection, 'sync', this.randomizeOrderAndRender);
      this.collection.fetch();
    },

    randomizeOrderAndRender: function() {
      this.collection.reset(this.collection.shuffle(), {silent:true});
      this.render();
    },

    render: function() {
      this.$el.html(this.template({
        clubs: this.collection.toJSON()
      }));
      return this;
    }

  });

})();