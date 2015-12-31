(function(_utils) {

  VP.Views.AddPoolPlayer = Backbone.View.extend({

    el: '.content',
    model: new VP.Models.PoolPlayer(),
    template: Handlebars.templates['addpoolplayer.hbs'],
    events: {
      'submit form': 'saveAddPoolPlayer',
      'click button.js_button_back': 'toPoolPlayerList'
    },

    initialize: function() {
      // this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'destroy', this.remove);
    },

    saveAddPoolPlayer: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      this.model.save(formData);
    },

    toPoolPlayerList: function() {
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})(VP.utils);