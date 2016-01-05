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
      // this.listenTo(this.model, 'error', this.saveError);
      _.bindAll(this, "handleErrors", "handleResult");
    },

    saveAddPoolPlayer: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      formData.birthday = _utils.toDate(formData.birthday);
      var options = {
        success: this.handleResult,
        error: this.handleErrors,
      };
      var result = this.model.save(formData, options);
    },

    toPoolPlayerList: function() {
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    handleResult: function(object, response, options) {
      // console.log('succes', object);
      // console.log('succes', response.response.errorsu);
      // console.log('succes', options);
      _utils.removeFieldErrors();
      if (response.error) {
        _.each(response.response.errors, function(errorObject) {
          console.log(errorObject);
          _utils.displayFieldError(errorObject);
        });
      } else {

      }
    },

    handleErrors: function(object, response, options) {
      console.log('error');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})(VP.utils);