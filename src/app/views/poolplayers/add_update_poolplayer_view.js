(function(_utils) {

  VP.Views.AddUpdatePoolPlayer = Backbone.View.extend({

    template: Handlebars.templates['add_update_poolplayer.hbs'],
    events: {
      'submit form': 'saveAddPoolPlayer',
      'click button.js_button_back': 'toPoolPlayerList'
    },

    initialize: function() {
      _.bindAll(this, "handleErrors", "handleResult");
    },

    saveAddPoolPlayer: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      formData.birthday = _utils.ddmmyyyyToDate(formData.birthday);
      var options = {
        success: this.handleResult,
        error: this.handleErrors,
      };
      var result = this.model.save(formData, options);
    },

    toPoolPlayerList: function() {
      VP.router.navigate('list/poolplayers', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _.each(response.response.errors, function(errorObject) {
          _utils.displayFieldError(errorObject);
        });
      } else {
        this.toPoolPlayerList();
      }
    },

    handleErrors: function(object, response, options) {
      console.log('error');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    close: function() {
      this.unbind();
      this.remove();
      this.model.unbind();
    }

  });

})(VP.utils);