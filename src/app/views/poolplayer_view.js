(function() {

  VP.Views.PoolPlayer = Backbone.View.extend({

    model: VP.Models.PoolPlayer,
    tagName:  'tr',
    template: Handlebars.templates['poolplayer.hbs'],

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      console.log('rendering... a poolplayer');
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})();