(function(_utils) {

  VP.Views.About = Backbone.View.extend({

    className: 'about',
    template: Handlebars.templates['about.hbs'],

    events: {
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template({}));
      return this;
    },

  });

})(VP.utils);