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

    getUniqueLogosJSON: function() {
      return _.chain(this.collection.models)
              .map(function(o) {
                return o.attributes.logoFilename;
              })
              .uniq()
              .toJSON();
    },

    render: function() {
      this.$el.html(this.template(this.getUniqueLogosJSON()));
      return this;
    }

  });

})();