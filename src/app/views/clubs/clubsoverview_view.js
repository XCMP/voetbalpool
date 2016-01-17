(function(_events, _utils) {

  VP.Views.ClubsOverview = Backbone.View.extend({

    template: Handlebars.templates['clubsoverview.hbs'],

    events: {
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template({
        clubs: this.collection.toJSON()
      }));
      return this;
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);